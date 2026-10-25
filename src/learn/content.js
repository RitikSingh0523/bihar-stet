// Loads Markdown notes from /content and splits them into chapters (## headings).
const files = import.meta.glob('/content/*.md', { query: '?raw', import: 'default' });

const cache = {};

export async function loadTopic(id) {
  if (cache[id]) return cache[id];
  const keys = Object.keys(files)
    .filter((k) => k === `/content/${id}.md` || new RegExp(`^/content/${id}\\.part\\d+\\.md$`).test(k))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  if (!keys.length) return (cache[id] = null);
  const text = (await Promise.all(keys.map((k) => files[k]()))).join('\n\n');
  return (cache[id] = parse(text));
}

export const hasContent = (id) =>
  Object.keys(files).some((k) => k === `/content/${id}.md` || new RegExp(`^/content/${id}\\.part\\d+\\.md$`).test(k));

// -> { title, intro, chapters: [{ title, body }] }
export function parse(text) {
  const lines = text.replace(/\r/g, '').split('\n');
  let title = '', fence = false, cur = null;
  const intro = [], chapters = [];
  for (const line of lines) {
    if (/^```/.test(line)) fence = !fence;
    if (!fence && /^# /.test(line) && !title) { title = line.slice(2).trim(); continue; }
    if (!fence && /^## /.test(line)) { cur = { title: line.slice(3).trim(), lines: [] }; chapters.push(cur); continue; }
    (cur ? cur.lines : intro).push(line);
  }
  return {
    title,
    intro: intro.join('\n').trim(),
    chapters: chapters.map((c) => ({ title: c.title, body: c.lines.join('\n').trim() })),
  };
}

export const wordCount = (s) => (s.match(/\S+/g) || []).length;
export const readMinutes = (words) => Math.max(1, Math.round(words / 200));

// ---- progress (localStorage) ----
const KEY = 'stet.learn.v1';
const read = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };
export const getLearn = () => read();
export const doneChapters = (id) => read()[id]?.done || [];
export function setChapterDone(id, idx, on) {
  const all = read();
  const set = new Set(all[id]?.done || []);
  on ? set.add(idx) : set.delete(idx);
  all[id] = { ...(all[id] || {}), done: [...set].sort((a, b) => a - b) };
  localStorage.setItem(KEY, JSON.stringify(all));
}
