import React, { useMemo } from 'react';
import Header from '../components/Header.jsx';
import { Badge, Button, Wrap, cx } from '../components/ui.jsx';
import { bestScores, getProgress } from '../storage.js';
import { go } from '../useHashRoute.js';

const TOTAL = 20;
const PATTERN = [
  ['Part I', 'Computer Science (226)', 100],
  ['Part II', 'Teaching Aptitude', 30],
  ['Part III', 'GK 5 · Environment 5 · Maths 5 · Reasoning 5', 20],
];
const STATS = [['150', 'Questions'], ['150', 'Marks'], ['150 min', 'Time'], ['No', 'Negative marking']];

export default function Home() {
  const best = useMemo(bestScores, []);
  const done = Object.keys(best).length;
  const avg = done ? Math.round(Object.values(best).reduce((a, b) => a + b.score, 0) / done) : 0;
  return (
    <>
      <Header />
      <Wrap>
        <section className="my-5 rounded-2xl bg-gradient-to-br from-brand to-violet-600 p-6 text-white">
          <h1 className="text-3xl font-bold">20 Full-Length Mock Tests</h1>
          <p className="mb-4 mt-1 opacity-90">Bihar STET Paper II · Class 11–12 · every paper is freshly written (no repeated questions) in the real exam pattern.</p>
          <div className="mb-4 flex flex-wrap gap-3">
            {STATS.map(([b, s]) => (
              <div key={s} className="min-w-28 rounded-xl bg-white/15 px-4 py-2">
                <b className="block text-xl">{b}</b><span className="text-xs opacity-90">{s}</span>
              </div>
            ))}
          </div>
          <table className="w-full rounded-xl bg-white/10 text-sm">
            <tbody>
              {PATTERN.map(([a, b, c]) => (
                <tr key={a} className="border-b border-white/15 last:border-0">
                  <td className="px-3 py-2 font-semibold">{a}</td><td className="px-3 py-2">{b}</td><td className="px-3 py-2 text-right">{c} Qs</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <button onClick={() => go('learn')} className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-left hover:border-emerald-400">
          <span><b className="text-emerald-900">📘 Preparing for 7 Nov?</b> <span className="text-sm text-emerald-800">Open Learn – concept notes for every topic, a day-by-day plan and quick revision sheets.</span></span>
          <span className="shrink-0 font-semibold text-emerald-700">Learn →</span>
        </button>

        <div className="mb-3 mt-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Choose a test</h2>
          <span className="text-sm text-slate-500">{done}/{TOTAL} completed{done ? ` · average best score ${avg}/150` : ''}</span>
        </div>

        <section className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
          {Array.from({ length: TOTAL }, (_, i) => i + 1).map((id) => {
            const b = best[id];
            const resume = !!getProgress(id);
            return (
              <article key={id} className={cx('rounded-xl border bg-white p-4', b ? 'border-green-200' : 'border-slate-200')}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Mock Test {id}</h3>
                  {resume ? <Badge tone="warn">In progress</Badge> : b ? <Badge tone="ok">Best {b.score}/150</Badge> : <Badge>New</Badge>}
                </div>
                <p className="mb-3 mt-1.5 text-sm text-slate-500">150 Qs · 150 min</p>
                <div className="flex gap-2">
                  <Button variant="primary" onClick={() => go(`instructions/${id}`)}>{resume ? 'Resume' : b ? 'Re-attempt' : 'Start'}</Button>
                  {b && <Button onClick={() => go(`result/${id}/${b.at}`)}>Best result</Button>}
                </div>
              </article>
            );
          })}
        </section>
      </Wrap>
    </>
  );
}
