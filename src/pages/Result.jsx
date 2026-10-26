import React, { useEffect, useMemo, useState } from 'react';
import Header from '../components/Header.jsx';
import { Badge, Button, Wrap, cx } from '../components/ui.jsx';
import { getHistory, isSubjectId, loadTest } from '../storage.js';
import { go } from '../useHashRoute.js';

const mins = (s) => `${Math.floor(s / 60)}m ${s % 60}s`;
const H2 = 'mb-2 mt-6 text-xl font-semibold';

function Bars({ rows }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
      {rows.map(([label, score, total]) => (
        <div key={label} className="grid grid-cols-[minmax(120px,280px)_1fr_56px] items-center gap-3 py-1.5 text-sm">
          <span>{label}</span>
          <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
            <i className={cx('block h-full rounded-full', score / total < 0.4 ? 'bg-red-500' : 'bg-green-600')} style={{ width: `${(score / total) * 100}%` }} />
          </div>
          <b className="text-right">{score}/{total}</b>
        </div>
      ))}
    </div>
  );
}

const Chip = ({ on, ...p }) => (
  <button {...p} className={cx('cursor-pointer rounded-full border px-3.5 py-1 text-sm capitalize', on ? 'border-brand bg-brand text-white' : 'border-slate-200 bg-white')} />
);

export default function Result({ id, attemptId }) {
  const attempt = useMemo(() => {
    const list = getHistory().filter((a) => a.testId === id);
    return (attemptId && list.find((a) => a.at === attemptId)) || list[0];
  }, [id, attemptId]);
  const [test, setTest] = useState(null);
  const [filter, setFilter] = useState('all');
  const [secKey, setSecKey] = useState('all');

  useEffect(() => { loadTest(id).then(setTest).catch(() => {}); }, [id]);

  if (!attempt) {
    return (
      <>
        <Header />
        <Wrap><p className="my-4">No attempt found for this test.</p><Button onClick={() => go('home')}>Home</Button></Wrap>
      </>
    );
  }

  const pct = Math.round((attempt.score / attempt.total) * 100);
  const attempted = attempt.sections.reduce((a, s) => a + s.attempted, 0);
  const rows = [];
  if (test) {
    let off = 0;
    test.sections.forEach((s) => {
      s.questions.forEach((q, i) => {
        const a = attempt.answers[off + i];
        const status = a === null || a === undefined ? 'skipped' : a === q.answer ? 'correct' : 'wrong';
        rows.push({ n: off + i + 1, q, a, status, sec: s.key });
      });
      off += s.questions.length;
    });
  }
  const shown = rows.filter((r) => (filter === 'all' || r.status === filter) && (secKey === 'all' || r.sec === secKey));
  const mini = [
    [attempt.score, 'Correct'], [attempted - attempt.score, 'Wrong'], [attempt.total - attempted, 'Skipped'],
    [`${attempted ? Math.round((attempt.score / attempted) * 100) : 0}%`, 'Accuracy'],
  ];
  const BORDER = { correct: 'border-l-green-600', wrong: 'border-l-red-500', skipped: 'border-l-amber-500' };

  return (
    <>
      <Header />
      <Wrap>
        <h1 className="mb-1 mt-4 text-2xl font-bold">{attempt.title || `Mock Test ${id}`} – Result</h1>
        <p className="text-sm text-slate-500">Submitted {new Date(attempt.at).toLocaleString()} · Time taken {mins(attempt.timeTaken)}</p>

        <section className="mt-3 flex flex-wrap items-center gap-6 rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-baseline">
            <b className="text-5xl text-brand">{attempt.score}</b>
            <span className="ml-1.5 text-xl text-slate-500">/ {attempt.total}</span>
            <em className="ml-3.5 rounded-full bg-indigo-50 px-2.5 py-0.5 not-italic">{pct}%</em>
          </div>
          <div className="flex flex-wrap gap-6">
            {mini.map(([v, l]) => (
              <div key={l} className="text-center text-sm text-slate-500"><b className="block text-2xl text-slate-800">{v}</b>{l}</div>
            ))}
          </div>
        </section>

        <h2 className={H2}>Section-wise</h2>
        <Bars rows={attempt.sections.map((s) => [s.name, s.score, s.total])} />

        <h2 className={H2}>Topic-wise</h2>
        <Bars rows={Object.entries(attempt.topics).map(([t, v]) => [t, v.correct, v.total])} />

        <div className="mt-5 flex gap-2.5">
          <Button variant="primary" onClick={() => go(`instructions/${id}`)}>Re-attempt</Button>
          <Button onClick={() => go(isSubjectId(id) ? 'subjects' : 'home')}>{isSubjectId(id) ? 'All subject tests' : 'All tests'}</Button>
          {isSubjectId(id) && <Button onClick={() => go('learn')}>Revise in Learn</Button>}
        </div>

        <h2 className={H2}>Review answers &amp; explanations</h2>
        <div className="flex flex-wrap items-center gap-2.5">
          {['all', 'correct', 'wrong', 'skipped'].map((f) => <Chip key={f} on={filter === f} onClick={() => setFilter(f)}>{f}</Chip>)}
          {attempt.sections.length > 1 && <span className="h-5 w-px bg-slate-200" />}
          {attempt.sections.length > 1 && [['all', 'All parts'], ['cs', 'CS'], ['tch', 'Teaching'], ['gen', 'General']].map(([k, l]) => (
            <Chip key={k} on={secKey === k} onClick={() => setSecKey(k)}>{l}</Chip>
          ))}
        </div>
        {!test && <p className="mt-3">Loading questions…</p>}
        {shown.map((r) => (
          <article key={r.n} className={cx('mt-3 rounded-xl border border-l-[5px] border-slate-200 bg-white px-4 py-3.5', BORDER[r.status])}>
            <div className="mb-2 flex flex-wrap items-center gap-2.5">
              <b>Q{r.n}</b><Badge tone={r.status}>{r.status}</Badge><span className="text-sm text-slate-500">{r.q.topic}</span>
            </div>
            <div className="mb-3 whitespace-pre-wrap">{r.q.q}</div>
            <ul className="mb-2 space-y-1">
              {r.q.options.map((o, i) => (
                <li key={i} className={cx('whitespace-pre-wrap rounded-lg px-2.5 py-1.5', i === r.q.answer && 'bg-green-100', i === r.a && i !== r.q.answer && 'bg-red-100')}>
                  <span className="mr-2 font-bold text-slate-500">{'ABCD'[i]}</span>{o}
                  {i === r.a && <em className="ml-1 text-xs text-slate-500"> ← your answer</em>}
                </li>
              ))}
            </ul>
            {r.q.exp && <p className="mt-1.5 rounded-lg bg-indigo-50/60 px-3 py-2 text-sm"><b>Explanation:</b> {r.q.exp}</p>}
          </article>
        ))}
      </Wrap>
    </>
  );
}
