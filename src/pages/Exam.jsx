import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { addAttempt, clearProgress, getProgress, loadTest, saveProgress } from '../storage.js';
import { go } from '../useHashRoute.js';
import { Button, QBox, cx } from '../components/ui.jsx';

const fmt = (s) => {
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), x = s % 60;
  return [h, m, x].map((v) => String(v).padStart(2, '0')).join(':');
};

export function evaluate(test, answers) {
  const flat = test.sections.flatMap((s) => s.questions);
  let score = 0, off = 0;
  const topics = {};
  const sections = test.sections.map((s) => {
    let sc = 0, att = 0;
    s.questions.forEach((q, i) => {
      const a = answers[off + i];
      const t = (topics[q.topic] ||= { correct: 0, attempted: 0, total: 0 });
      t.total++;
      if (a !== null && a !== undefined) { att++; t.attempted++; }
      if (a === q.answer) { sc++; t.correct++; }
    });
    off += s.questions.length; score += sc;
    return { name: s.name, short: s.short, score: sc, attempted: att, total: s.questions.length };
  });
  return { score, total: flat.length, sections, topics };
}

export default function Exam({ id }) {
  const [test, setTest] = useState(null);
  const [error, setError] = useState('');
  const [st, setSt] = useState(null); // {answers, visited, marked, cur, startAt, endAt}
  const [now, setNow] = useState(Date.now());
  const [palette, setPalette] = useState(false);
  const submitted = useRef(false);

  useEffect(() => {
    loadTest(id).then((t) => {
      const n = t.sections.reduce((a, s) => a + s.questions.length, 0);
      const saved = getProgress(id);
      const fresh = saved && saved.answers?.length === n ? saved : null;
      const startAt = Date.now();
      setTest(t);
      setSt(fresh || {
        answers: Array(n).fill(null), visited: Array(n).fill(false), marked: Array(n).fill(false),
        cur: 0, startAt, endAt: startAt + t.duration * 60000,
      });
    }).catch((e) => setError(e.message));
  }, [id]);

  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);

  const flat = useMemo(() => (test ? test.sections.flatMap((s, si) => s.questions.map((q) => ({ ...q, si }))) : []), [test]);
  const starts = useMemo(() => {
    if (!test) return [];
    let o = 0; return test.sections.map((s) => { const r = o; o += s.questions.length; return r; });
  }, [test]);

  // persist progress, mark current as visited
  useEffect(() => {
    if (!st || !test || submitted.current) return;
    if (!st.visited[st.cur]) { const v = [...st.visited]; v[st.cur] = true; setSt({ ...st, visited: v }); return; }
    saveProgress(id, st);
  }, [st, test, id]);

  const submit = useCallback((auto = false) => {
    if (submitted.current || !st || !test) return;
    if (!auto && !confirm('Submit the test now? You cannot change answers afterwards.')) return;
    submitted.current = true;
    const at = Date.now();
    const r = evaluate(test, st.answers);
    addAttempt({
      testId: id, at, ...r, answers: st.answers,
      timeTaken: Math.min(Math.round((at - st.startAt) / 1000), test.duration * 60),
    });
    clearProgress(id);
    go(`result/${id}/${at}`);
  }, [st, test, id]);

  const left = st ? Math.max(0, Math.round((st.endAt - now) / 1000)) : 0;
  useEffect(() => { if (st && left === 0) submit(true); }, [left, st, submit]);

  if (error) return <main className="p-6"><p>{error}. Run <code>npm run build:tests</code> first.</p></main>;
  if (!test || !st) return <main className="p-6"><p>Loading test…</p></main>;

  const q = flat[st.cur];
  const set = (patch) => setSt((s) => ({ ...s, ...patch }));
  const upd = (key, i, val) => { const a = [...st[key]]; a[i] = val; return a; };
  const jump = (i) => { set({ cur: i }); setPalette(false); window.scrollTo(0, 0); };
  const next = () => jump(Math.min(st.cur + 1, flat.length - 1));
  const choose = (o) => set({ answers: upd('answers', st.cur, o) });
  const clear = () => set({ answers: upd('answers', st.cur, null) });
  const markNext = () => { set({ marked: upd('marked', st.cur, true), cur: Math.min(st.cur + 1, flat.length - 1) }); window.scrollTo(0, 0); };
  const unmark = () => set({ marked: upd('marked', st.cur, false) });

  const stateOf = (i) => {
    const a = st.answers[i] !== null, m = st.marked[i];
    if (m) return a ? 'marked ans' : 'marked';
    if (a) return 'answered';
    return st.visited[i] ? 'notanswered' : 'notvisited';
  };
  const count = (c) => flat.filter((_, i) => stateOf(i) === c).length;
  const sec = test.sections[q.si];

  return (
    <div className="flex min-h-screen flex-col">
      <div className="sticky top-0 z-10 flex items-center justify-between gap-2.5 border-b border-slate-200 bg-white px-4 py-2.5">
        <div><b>{test.title}</b> <span className="hidden text-sm text-slate-500 sm:inline">· Bihar STET Paper II</span></div>
        <div className={cx('rounded-lg px-3.5 py-1 text-xl font-bold tabular-nums', left < 600 ? 'bg-red-100 text-red-600' : 'bg-indigo-50')}>⏱ {fmt(left)}</div>
        <div className="flex gap-2">
          <Button size="sm" className="lg:hidden" onClick={() => setPalette(!palette)}>Palette</Button>
          <Button variant="danger" size="sm" onClick={() => submit(false)}>Submit</Button>
        </div>
      </div>

      <div className="flex gap-1 overflow-x-auto border-b border-slate-200 bg-white px-4">
        {test.sections.map((s, i) => (
          <button key={s.key} onClick={() => jump(starts[i])}
            className={cx('cursor-pointer whitespace-nowrap border-b-[3px] px-3.5 py-2.5 text-sm', q.si === i ? 'border-brand font-semibold text-brand' : 'border-transparent')}>
            {s.short} <small>({s.questions.length})</small>
          </button>
        ))}
      </div>

      <div className="mx-auto grid w-full max-w-[1300px] flex-1 grid-cols-1 gap-4 p-4 lg:grid-cols-[1fr_300px]">
        <section className="self-start rounded-xl border border-slate-200 bg-white p-5">
          <div className="mb-2.5 flex flex-wrap items-center gap-2.5">
            <b>Question {st.cur + 1}</b>
            <span className="text-sm text-slate-500">{sec.name} · {q.topic}</span>
          </div>
          <div className="mb-4 whitespace-pre-wrap text-[1.05rem]">{q.q}</div>
          <div className="grid gap-2.5">
            {q.options.map((o, i) => {
              const sel = st.answers[st.cur] === i;
              return (
                <label key={i} className={cx('flex cursor-pointer items-start gap-2.5 whitespace-pre-wrap rounded-xl border px-3 py-2.5 hover:border-brand', sel ? 'border-brand bg-indigo-50' : 'border-slate-200')}>
                  <input type="radio" className="mt-1.5" name={`q${st.cur}`} checked={sel} onChange={() => choose(i)} />
                  <span className="min-w-[18px] font-bold text-slate-500">{'ABCD'[i]}</span><span>{o}</span>
                </label>
              );
            })}
          </div>
          <div className="mt-5 flex flex-wrap gap-2.5 border-t border-slate-200 pt-4">
            <Button disabled={st.cur === 0} onClick={() => jump(st.cur - 1)}>← Previous</Button>
            <Button onClick={clear}>Clear</Button>
            {st.marked[st.cur]
              ? <Button onClick={unmark}>Unmark review</Button>
              : <Button variant="mark" onClick={markNext}>Mark for review &amp; Next</Button>}
            <Button variant="primary" className="sm:ml-auto" onClick={next}>Save &amp; Next →</Button>
          </div>
        </section>

        <aside className={cx(
          'self-start overflow-auto rounded-xl border border-slate-200 bg-white p-3.5',
          'lg:sticky lg:top-[118px] lg:block lg:max-h-[calc(100vh-134px)]',
          palette ? 'fixed bottom-0 right-0 top-[108px] z-20 block w-[min(320px,92vw)] shadow-2xl' : 'hidden',
        )}>
          <div className="flex flex-wrap gap-2.5 text-sm">
            {['answered', 'notanswered', 'notvisited', 'marked', 'marked ans'].map((s) => (
              <span key={s} className="flex items-center gap-1"><QBox state={s} size="sm" />{count(s)}</span>
            ))}
          </div>
          {test.sections.map((s, si) => (
            <div key={s.key}>
              <h4 className="mb-1.5 mt-4 text-sm text-slate-500">{s.name}</h4>
              <div className="grid grid-cols-6 gap-1.5">
                {s.questions.map((_, i) => {
                  const g = starts[si] + i;
                  return <QBox key={g} state={stateOf(g)} current={g === st.cur} onClick={() => jump(g)}>{g + 1}</QBox>;
                })}
              </div>
            </div>
          ))}
          <Button variant="danger" className="mt-4 w-full" onClick={() => submit(false)}>Submit test</Button>
        </aside>
      </div>
    </div>
  );
}
