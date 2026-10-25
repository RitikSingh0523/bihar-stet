import React, { useEffect, useState } from 'react';
import Header from '../components/Header.jsx';
import Markdown from '../components/Markdown.jsx';
import { Button, cx } from '../components/ui.jsx';
import { doneChapters, loadTopic, readMinutes, setChapterDone, wordCount } from '../learn/content.js';
import { topicById } from '../learn/topics.js';
import { go } from '../useHashRoute.js';

export default function Topic({ id, chapter }) {
  const meta = topicById(id);
  const [data, setData] = useState(undefined); // undefined = loading, null = missing
  const [done, setDone] = useState(() => doneChapters(id));
  const [menu, setMenu] = useState(false);
  const idx = Math.max(0, Number(chapter) || 0);

  useEffect(() => { loadTopic(id).then(setData); }, [id]);
  useEffect(() => { window.scrollTo(0, 0); setMenu(false); }, [id, idx]);

  if (!meta) return <><Header /><main className="p-6">Unknown topic. <a className="text-brand" href="#/learn">Back to Learn</a></main></>;
  if (data === undefined) return <><Header /><main className="p-6 text-slate-500">Loading notes…</main></>;
  if (!data) return <><Header /><main className="p-6">Notes for this topic are not available yet. <a className="text-brand" href="#/learn">Back to Learn</a></main></>;

  const ch = data.chapters[Math.min(idx, data.chapters.length - 1)];
  const n = data.chapters.length;
  const cur = Math.min(idx, n - 1);
  const isDone = done.includes(cur);
  const toggle = () => { setChapterDone(id, cur, !isDone); setDone(doneChapters(id)); };
  const open = (i) => go(`learn/${id}/${i}`);
  const finish = () => { if (!isDone) { setChapterDone(id, cur, true); setDone(doneChapters(id)); } open(cur + 1); };

  const toc = (
    <nav className="space-y-0.5">
      <button onClick={() => go(`learn/${id}`)} className="mb-2 block w-full cursor-pointer text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
        {done.length}/{n} chapters done
      </button>
      {data.chapters.map((c, i) => (
        <button key={i} onClick={() => open(i)}
          className={cx('flex w-full cursor-pointer items-start gap-2 rounded-lg px-2.5 py-1.5 text-left text-sm', i === cur ? 'bg-emerald-50 font-semibold text-emerald-800' : 'hover:bg-slate-100')}>
          <span className={cx('mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border text-[10px]', done.includes(i) ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-300')}>{done.includes(i) ? '✓' : ''}</span>
          <span>{c.title}</span>
        </button>
      ))}
    </nav>
  );

  return (
    <>
      <Header />
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 pb-16 pt-4 lg:grid-cols-[260px_1fr]">
        <aside className="hidden self-start lg:sticky lg:top-20 lg:block">
          <button onClick={() => go('learn')} className="mb-3 cursor-pointer text-sm text-brand">← All topics</button>
          <div className="mb-3 font-semibold">{meta.icon} {meta.title}</div>
          {toc}
        </aside>

        <main className="min-w-0">
          <div className="mb-3 flex items-center justify-between lg:hidden">
            <button onClick={() => go('learn')} className="cursor-pointer text-sm text-brand">← All topics</button>
            <Button size="sm" onClick={() => setMenu(!menu)}>Chapters ({cur + 1}/{n})</Button>
          </div>
          {menu && <div className="mb-4 rounded-xl border border-slate-200 bg-white p-3 lg:hidden">{toc}</div>}

          <article className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
            <p className="text-sm text-slate-500">{meta.title} · Chapter {cur + 1} of {n} · {readMinutes(wordCount(ch.body))} min read</p>
            <h1 className="mb-4 mt-1 text-2xl font-bold">{ch.title}</h1>
            {cur === 0 && data.intro && <div className="mb-4 rounded-lg bg-slate-50 p-3 text-sm"><Markdown>{data.intro}</Markdown></div>}
            <Markdown>{ch.body}</Markdown>
          </article>

          <div className="mt-4 flex flex-wrap items-center gap-2.5">
            <Button disabled={cur === 0} onClick={() => open(cur - 1)}>← Previous</Button>
            <Button onClick={toggle}>{isDone ? '✓ Completed (undo)' : 'Mark as done'}</Button>
            {cur < n - 1
              ? <Button variant="primary" className="sm:ml-auto" onClick={finish}>Done & next chapter →</Button>
              : <Button variant="primary" className="sm:ml-auto" onClick={() => { if (!isDone) toggle(); go('home'); }}>Finish · practise mocks →</Button>}
          </div>
        </main>
      </div>
    </>
  );
}
