import React, { useEffect, useMemo, useState } from 'react';
import Header from '../components/Header.jsx';
import { Badge, Button, Wrap, cx } from '../components/ui.jsx';
import { GROUPS } from '../learn/topics.js';
import { bestScores, getProgress, loadSubjects } from '../storage.js';
import { go } from '../useHashRoute.js';

const hrs = (m) => (m >= 120 ? `${Math.floor(m / 60)}h ${m % 60 ? `${m % 60}m` : ''}`.trim() : `${m} min`);

export default function Subjects() {
  const [subjects, setSubjects] = useState(null);
  const [error, setError] = useState('');
  const best = useMemo(bestScores, []);

  useEffect(() => { loadSubjects().then(setSubjects).catch((e) => setError(e.message)); }, []);

  const totalQs = subjects?.reduce((a, s) => a + s.count, 0) ?? 0;
  const done = subjects?.filter((s) => best[s.id]).length ?? 0;

  return (
    <>
      <Header />
      <Wrap>
        <section className="my-5 rounded-2xl bg-gradient-to-br from-fuchsia-600 to-indigo-700 p-6 text-white">
          <h1 className="text-3xl font-bold">Subject-wise Tests</h1>
          <p className="mt-1 opacity-90">One test per subject with <b>every</b> MCQ of that subject – e.g. all {subjects?.find((s) => s.id === 's-cs-net')?.count ?? 140} Computer Networks questions in one sitting. Practise a topic until it is solid.</p>
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            <span className="rounded-xl bg-white/15 px-4 py-2"><b className="block text-xl">{subjects?.length ?? '…'}</b>subject tests</span>
            <span className="rounded-xl bg-white/15 px-4 py-2"><b className="block text-xl">{totalQs || '…'}</b>questions in total</span>
            <span className="rounded-xl bg-white/15 px-4 py-2"><b className="block text-xl">{done}</b>attempted</span>
            <span className="rounded-xl bg-white/15 px-4 py-2"><b className="block text-xl">1 min</b>per question · no negative marking</span>
          </div>
        </section>

        {error && <p className="text-red-600">{error}. Run <code>npm run build:tests</code> first.</p>}
        {!subjects && !error && <p className="text-slate-500">Loading…</p>}

        {subjects && Object.entries(GROUPS).map(([g, info]) => (
          <section key={g}>
            <h2 className="mb-0.5 mt-7 text-xl font-semibold">{info.name}</h2>
            <p className="mb-3 text-sm text-slate-500">{info.blurb}</p>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-3.5">
              {subjects.filter((s) => s.group === g).map((s) => {
                const b = best[s.id];
                const resume = !!getProgress(s.id);
                return (
                  <article key={s.id} className={cx('rounded-xl border bg-white p-4', b ? 'border-green-200' : 'border-slate-200')}>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold">{s.title}</h3>
                      {resume ? <Badge tone="warn">In progress</Badge> : b ? <Badge tone="ok">Best {b.score}/{b.total}</Badge> : <Badge>New</Badge>}
                    </div>
                    <p className="mb-3 mt-1.5 text-sm text-slate-500">{s.count} questions · {hrs(s.duration)}</p>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="primary" onClick={() => go(`instructions/${s.id}`)}>{resume ? 'Resume' : b ? 'Re-attempt' : 'Start test'}</Button>
                      {b && <Button onClick={() => go(`result/${s.id}/${b.at}`)}>Best result</Button>}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </Wrap>
    </>
  );
}
