// Full-text search over every chapter of every topic (client-side, no dependencies).
import { loadTopic } from './content.js';
import { TOPICS } from './topics.js';

let indexPromise = null;

const plain = (md) => md
  .replace(/```[a-z]*\n?/g, ' ')
  .replace(/[|*_`>#]/g, ' ')
  .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
  .replace(/\s+/g, ' ')
  .trim();

// Builds (once) a flat list of chapter documents.
export function buildIndex() {
  indexPromise ||= Promise.all(TOPICS.map(async (t) => {
    const data = await loadTopic(t.id);
    if (!data) return [];
    return data.chapters.map((c, i) => {
      const text = plain((i === 0 ? `${data.intro}\n` : '') + c.body);
      return { topic: t, chIdx: i, chTitle: c.title, text, lower: text.toLowerCase(), titleLower: c.title.toLowerCase() };
    });
  })).then((a) => a.flat());
  return indexPromise;
}

// "exact phrase" in quotes is kept together, everything else splits on whitespace.
export function parseQuery(q) {
  const terms = [];
  q.replace(/"([^"]+)"/g, (_, p) => { terms.push(p.trim().toLowerCase()); return ''; })
    .split(/\s+/).filter(Boolean).forEach((w) => terms.push(w.toLowerCase()));
  return [...new Set(terms.filter((t) => t.length > 0))];
}

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// A term matches at the start of a word (so "rsa" does not match "universal", but "subnet" matches "subnetting").
const WORD_START = '(?<![a-z0-9])';
export const termRegex = (needle, flags = 'g') => new RegExp(WORD_START + esc(needle), flags);
const countOf = (hay, needle) => (hay.match(termRegex(needle)) || []).length;

export function splitHighlight(text, terms) {
  if (!terms.length) return [{ t: text, hit: false }];
  const re = new RegExp(`${WORD_START}(${terms.map(esc).join('|')})`, 'gi');
  return text.split(re).filter(Boolean).map((t, i) => ({ t, hit: i % 2 === 1 }));
}

function snippet(doc, terms) {
  let at = -1;
  for (const t of terms) { const i = doc.lower.search(termRegex(t, '')); if (i >= 0 && (at < 0 || i < at)) at = i; }
  if (at < 0) return doc.text.slice(0, 160);
  let s = Math.max(0, at - 70), e = Math.min(doc.text.length, at + 130);
  if (s > 0) { const sp = doc.text.indexOf(' ', s); if (sp > 0 && sp < at) s = sp + 1; }
  if (e < doc.text.length) { const sp = doc.text.lastIndexOf(' ', e); if (sp > at) e = sp; }
  return `${s > 0 ? '… ' : ''}${doc.text.slice(s, e)}${e < doc.text.length ? ' …' : ''}`;
}

// All terms must appear (in title or body). Title hits weigh more.
export function search(index, query, group = 'all') {
  const terms = parseQuery(query);
  if (!terms.length) return { terms, results: [] };
  const results = [];
  for (const d of index) {
    if (group !== 'all' && d.topic.group !== group) continue;
    let score = 0, ok = true, hits = 0;
    for (const t of terms) {
      const inBody = countOf(d.lower, t), inTitle = countOf(d.titleLower, t);
      if (!inBody && !inTitle) { ok = false; break; }
      hits += inBody + inTitle;
      score += inTitle * 8 + Math.min(inBody, 12);
    }
    if (!ok) continue;
    if (terms.length > 1 && termRegex(terms.join(' '), '').test(d.lower)) score += 15;
    results.push({ doc: d, score, hits, snippet: snippet(d, terms) });
  }
  results.sort((a, b) => b.score - a.score);
  return { terms, results };
}
