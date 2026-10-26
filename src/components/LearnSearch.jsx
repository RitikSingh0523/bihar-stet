import React, { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import { buildIndex, search, splitHighlight } from '../learn/search.js';
import { GROUPS } from '../learn/topics.js';
import { cx } from './ui.jsx';
import { go } from '../useHashRoute.js';

const PAGE = 30;
const GROUP_CHIPS = [['all', 'All parts'], ['cs', 'Computer Science'], ['tch', 'Teaching'], ['gen', 'General']];

// Search box + results. Calls onActive(true) while a query is present so the parent can hide the rest of the page.
export default function LearnSearch({ q, setQ }) {
  const [index, setIndex] = useState(null);
  const [group, setGroup] = useState('all');
  const [shown, setShown] = useState(PAGE);
  const inputRef = useRef(null);
  const deferred = useDeferredValue(q);

  useEffect(() => { buildIndex().then(setIndex); }, []);
  useEffect(() => setShown(PAGE), [deferred, group]);
  useEffect(() => {
    const onKey = (e) => {
      const typing = /input|textarea/i.test(document.activeElement?.tagName || '');
      if ((e.key === '/' && !typing) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault(); inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const { terms, results } = useMemo(
    () => (index && deferred.trim() ? search(index, deferred, group) : { terms: [], results: [] }),
    [index, deferred, group],
  );
  const active = q.trim().length > 0;

  return (
    <section className="mb-5">
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
        <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)}
          placeholder={index ? 'Search all chapters… e.g. "page fault", subnetting, Piaget   (press / to focus)' : 'Loading notes…'}
          className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-10 text-base shadow-sm outline-none focus:border-brand focus:ring-2 focus:ring-indigo-200" />
        {active && (
          <button onClick={() => { setQ(''); inputRef.current?.focus(); }} aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-full px-2 text-slate-500 hover:bg-slate-100">✕</button>
        )}
      </div>

      {active && (
        <div className="mt-3">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {GROUP_CHIPS.map(([k, l]) => (
              <button key={k} onClick={() => setGroup(k)}
                className={cx('cursor-pointer rounded-full border px-3 py-1 text-sm', group === k ? 'border-brand bg-brand text-white' : 'border-slate-200 bg-white')}>{l}</button>
            ))}
            <span className="ml-auto text-sm text-slate-500">
              {!index ? 'Indexing…' : `${results.length} chapter${results.length === 1 ? '' : 's'} match`}
            </span>
          </div>

          {index && results.length === 0 && (
            <div className="rounded-xl border border-slate-200 bg-white p-6 text-center text-slate-500">
              No chapter contains all of: <b>{terms.join(', ')}</b>. Try fewer or shorter words.
            </div>
          )}

          <ul className="space-y-2.5">
            {results.slice(0, shown).map(({ doc, hits, snippet }) => (
              <li key={`${doc.topic.id}-${doc.chIdx}`}>
                <button onClick={() => go(`learn/${doc.topic.id}/${doc.chIdx}/${encodeURIComponent(q.trim())}`)}
                  className="block w-full cursor-pointer rounded-xl border border-slate-200 bg-white p-3.5 text-left transition hover:border-brand hover:shadow-sm">
                  <div className="flex flex-wrap items-center gap-x-2 text-xs text-slate-500">
                    <span>{doc.topic.icon} {doc.topic.title}</span>
                    <span>›</span><b className="text-sm text-slate-800">{splitHighlight(doc.chTitle, terms).map((p, i) => p.hit ? <mark key={i} className="rounded bg-yellow-200 px-0.5">{p.t}</mark> : p.t)}</b>
                    <span className="ml-auto">{hits} match{hits === 1 ? '' : 'es'} · {GROUPS[doc.topic.group].name.split('·')[0].trim()}</span>
                  </div>
                  <p className="mt-1.5 text-sm text-slate-700">
                    {splitHighlight(snippet, terms).map((p, i) => p.hit ? <mark key={i} className="rounded bg-yellow-200 px-0.5">{p.t}</mark> : <span key={i}>{p.t}</span>)}
                  </p>
                </button>
              </li>
            ))}
          </ul>
          {results.length > shown && (
            <button onClick={() => setShown(shown + PAGE)} className="mt-3 cursor-pointer rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm hover:border-brand">
              Show more ({results.length - shown} left)
            </button>
          )}
        </div>
      )}
    </section>
  );
}
