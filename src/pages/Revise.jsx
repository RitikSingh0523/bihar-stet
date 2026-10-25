import React, { useEffect, useState } from 'react';
import Header from '../components/Header.jsx';
import Markdown from '../components/Markdown.jsx';
import { Button, Wrap } from '../components/ui.jsx';
import { loadTopic } from '../learn/content.js';
import { GROUPS, TOPICS } from '../learn/topics.js';
import { go } from '../useHashRoute.js';

// Collects the "Quick Revision Sheet" chapter of every topic into one scrollable page.
export default function Revise() {
  const [sheets, setSheets] = useState(null);

  useEffect(() => {
    Promise.all(TOPICS.map(async (t) => {
      const d = await loadTopic(t.id);
      const ch = d?.chapters.find((c) => /quick revision/i.test(c.title)) || d?.chapters[d.chapters.length - 1];
      return ch ? { t, ch } : null;
    })).then((r) => setSheets(r.filter(Boolean)));
  }, []);

  return (
    <>
      <Header />
      <Wrap narrow>
        <div className="my-4 flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-2xl font-bold">⚡ Quick Revision Sheets</h1>
          <div className="flex gap-2 print:hidden">
            <Button size="sm" onClick={() => window.print()}>Print / Save PDF</Button>
            <Button size="sm" onClick={() => go('learn')}>← Learn</Button>
          </div>
        </div>
        <p className="mb-4 text-sm text-slate-500">One-line facts from every topic, grouped by paper part – for the night before the exam.</p>
        {!sheets && <p className="text-slate-500">Loading…</p>}
        {sheets && Object.entries(GROUPS).map(([g, info]) => (
          <section key={g}>
            <h2 className="mb-2 mt-6 text-lg font-semibold text-emerald-800">{info.name}</h2>
            {sheets.filter((s) => s.t.group === g).map(({ t, ch }) => (
              <article key={t.id} className="mb-4 break-inside-avoid rounded-xl border border-slate-200 bg-white p-4">
                <h3 className="mb-1 flex items-center justify-between font-semibold">
                  <span>{t.icon} {t.title}</span>
                  <button className="cursor-pointer text-xs text-brand print:hidden" onClick={() => go(`learn/${t.id}`)}>Open notes →</button>
                </h3>
                <Markdown>{ch.body}</Markdown>
              </article>
            ))}
          </section>
        ))}
      </Wrap>
    </>
  );
}
