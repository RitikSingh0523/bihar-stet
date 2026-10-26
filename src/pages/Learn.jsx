import React, { useEffect, useMemo, useState } from 'react';
import Header from '../components/Header.jsx';
import LearnSearch from '../components/LearnSearch.jsx';
import { Badge, Button, Wrap, cx } from '../components/ui.jsx';
import { EXAM_DATE, GROUPS, PLAN, PLAN_START, TOPICS, topicById, topicForLabel } from '../learn/topics.js';
import { doneChapters, hasContent, loadTopic } from '../learn/content.js';
import { SYLLABUS } from '../learn/syllabus.js';
import { getHistory } from '../storage.js';
import { go } from '../useHashRoute.js';

const DAY = 86400000;
const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const fmtDate = (d) => d.toLocaleDateString(undefined, { day: 'numeric', month: 'short' });

// topics where the learner scored below 50% across all attempts (needs >= 3 questions seen)
function weakAreas() {
  const agg = {};
  for (const a of getHistory()) {
    for (const [label, v] of Object.entries(a.topics || {})) {
      const t = (agg[label] ||= { c: 0, n: 0 });
      t.c += v.correct; t.n += v.total;
    }
  }
  const byTopic = {};
  for (const [label, v] of Object.entries(agg)) {
    const t = topicForLabel(label);
    if (!t) continue;
    const b = (byTopic[t.id] ||= { c: 0, n: 0 });
    b.c += v.c; b.n += v.n;
  }
  return Object.entries(byTopic)
    .filter(([, v]) => v.n >= 3)
    .map(([id, v]) => ({ id, pct: Math.round((v.c / v.n) * 100) }))
    .filter((x) => x.pct < 60)
    .sort((a, b) => a.pct - b.pct);
}

export function useProgress() {
  const [prog, setProg] = useState({}); // id -> {done, total}
  useEffect(() => {
    let live = true;
    Promise.all(TOPICS.map(async (t) => {
      const c = await loadTopic(t.id);
      return [t.id, { done: Math.min(doneChapters(t.id).length, c?.chapters.length || 0), total: c?.chapters.length || 0 }];
    })).then((e) => live && setProg(Object.fromEntries(e)));
    return () => { live = false; };
  }, []);
  return prog;
}

export default function Learn() {
  const prog = useProgress();
  const [q, setQ] = useState(() => sessionStorage.getItem('stet.learn.q') || '');
  useEffect(() => { sessionStorage.setItem('stet.learn.q', q); }, [q]);
  const today = startOfDay(new Date());
  const daysLeft = Math.ceil((startOfDay(EXAM_DATE) - today) / DAY);
  const planDay = Math.floor((today - startOfDay(PLAN_START)) / DAY);
  const weak = useMemo(weakAreas, []);

  const totals = Object.values(prog).reduce((a, p) => ({ d: a.d + p.done, t: a.t + p.total }), { d: 0, t: 0 });
  const pct = totals.t ? Math.round((totals.d / totals.t) * 100) : 0;

  return (
    <>
      <Header />
      <Wrap>
        <section className="my-5 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 p-6 text-white">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Learn · Exam preparation</h1>
              <p className="mt-1 opacity-90">Concept notes for every topic, a day-by-day plan and a last-night revision sheet.</p>
            </div>
            <div className="rounded-xl bg-white/15 px-5 py-3 text-center">
              <b className="block text-4xl">{daysLeft > 0 ? daysLeft : daysLeft === 0 ? 'Today' : '—'}</b>
              <span className="text-sm opacity-90">{daysLeft > 0 ? `day${daysLeft > 1 ? 's' : ''} to Bihar STET (7 Nov)` : daysLeft === 0 ? 'is exam day · all the best!' : 'exam date has passed'}</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="mb-1 flex justify-between text-sm"><span>Syllabus covered</span><b>{totals.d}/{totals.t} chapters · {pct}%</b></div>
            <div className="h-2.5 overflow-hidden rounded-full bg-white/25"><i className="block h-full rounded-full bg-white" style={{ width: `${pct}%` }} /></div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2.5">
            <Button className="!border-white !bg-white !text-teal-800" onClick={() => go('learn/revise')}>⚡ Quick revision sheets</Button>
            <Button className="!border-white/60 !bg-transparent !text-white" onClick={() => go('home')}>Practice mock tests</Button>
          </div>
        </section>

        <LearnSearch q={q} setQ={setQ} />

        {!q.trim() && <>
        {weak.length > 0 && (
          <section className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
            <h2 className="text-lg font-semibold text-red-800">Weak areas from your mock tests</h2>
            <p className="mb-2 text-sm text-red-700">Below 60% overall – revise these first.</p>
            <div className="flex flex-wrap gap-2">
              {weak.map((w) => (
                <button key={w.id} onClick={() => go(`learn/${w.id}`)} className="cursor-pointer rounded-full border border-red-300 bg-white px-3 py-1 text-sm hover:border-red-500">
                  {topicById(w.id).icon} {topicById(w.id).title} · <b>{w.pct}%</b>
                </button>
              ))}
            </div>
          </section>
        )}

        <details className="mb-2 mt-6 rounded-xl border border-slate-200 bg-white">
          <summary className="cursor-pointer select-none px-4 py-3 text-lg font-semibold">📋 Official syllabus – Computer Science (100 marks) · 15 units</summary>
          <div className="divide-y divide-slate-100 border-t border-slate-100">
            {SYLLABUS.map((u) => (
              <div key={u.unit} className="grid gap-1 px-4 py-3 sm:grid-cols-[210px_1fr]">
                <div>
                  <b>Unit {u.unit}: {u.title}</b>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {u.topics.map((id) => (
                      <button key={id} onClick={() => go(`learn/${id}`)} className="cursor-pointer rounded-full border border-emerald-300 bg-emerald-50 px-2 py-0.5 text-xs text-emerald-800 hover:border-emerald-500">
                        {topicById(id).icon} {topicById(id).title}
                      </button>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-slate-600">{u.items}</p>
              </div>
            ))}
          </div>
        </details>

        <h2 className="mb-2 mt-6 text-xl font-semibold">Study plan</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {PLAN.map((d, i) => {
            const date = new Date(startOfDay(PLAN_START).getTime() + i * DAY);
            const isToday = i === planDay, past = i < planDay;
            return (
              <article key={i} className={cx('rounded-xl border bg-white p-4', isToday ? 'border-emerald-500 ring-2 ring-emerald-200' : 'border-slate-200', past && 'opacity-70')}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Day {i + 1} · {d.title}</h3>
                  <span className="flex items-center gap-2 text-xs text-slate-500">{isToday && <Badge tone="ok">Today</Badge>}{fmtDate(date)}</span>
                </div>
                <p className="mt-1 text-sm text-slate-600">{d.note}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {d.topics.map((id) => {
                    const t = topicById(id), p = prog[id];
                    const done = p && p.total && p.done === p.total;
                    return (
                      <button key={id} onClick={() => go(`learn/${id}`)} className={cx('cursor-pointer rounded-full border px-2.5 py-0.5 text-xs', done ? 'border-green-300 bg-green-50 text-green-800' : 'border-slate-200 hover:border-brand')}>
                        {done ? '✓' : t.icon} {t.title}
                      </button>
                    );
                  })}
                  {d.mock && <button onClick={() => go(`instructions/${d.mock}`)} className="cursor-pointer rounded-full border border-brand bg-indigo-50 px-2.5 py-0.5 text-xs text-brand">📝 Take Mock {d.mock}</button>}
                  {d.revise && <button onClick={() => go('learn/revise')} className="cursor-pointer rounded-full border border-amber-400 bg-amber-50 px-2.5 py-0.5 text-xs text-amber-800">⚡ Revision sheets</button>}
                </div>
              </article>
            );
          })}
        </div>

        {Object.entries(GROUPS).map(([g, info]) => (
          <section key={g}>
            <h2 className="mb-0.5 mt-8 text-xl font-semibold">{info.name}</h2>
            <p className="mb-3 text-sm text-slate-500">{info.blurb}</p>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3.5">
              {TOPICS.filter((t) => t.group === g).map((t) => {
                const p = prog[t.id];
                const ready = hasContent(t.id);
                const frac = p?.total ? p.done / p.total : 0;
                return (
                  <button key={t.id} disabled={!ready} onClick={() => go(`learn/${t.id}`)}
                    className="cursor-pointer rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-brand hover:shadow-sm disabled:cursor-default disabled:opacity-50">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-2xl">{t.icon}</span>
                      <Badge>{t.marks} Qs / paper</Badge>
                    </div>
                    <h3 className="mt-1.5 font-semibold">{t.title}</h3>
                    <p className="text-xs text-slate-500">{ready ? `${p?.total ?? '…'} chapters · ${p?.done ?? 0} done` : 'Notes coming soon'}</p>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200"><i className="block h-full rounded-full bg-emerald-500" style={{ width: `${frac * 100}%` }} /></div>
                  </button>
                );
              })}
            </div>
          </section>
        ))}
        </>}
      </Wrap>
    </>
  );
}
