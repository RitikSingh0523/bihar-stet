// Verifies every study topic has notes that split into chapters ending with a Quick Revision Sheet.
import fs from 'node:fs';
const dir = new URL('../content/', import.meta.url);
const ids = fs.readFileSync(new URL('../src/learn/topics.js', import.meta.url), 'utf8').match(/id: '([a-z-]+)'/g).map((s) => s.slice(5, -1));
let bad = 0;
for (const id of ids) {
  const files = fs.readdirSync(dir).filter((f) => f === `${id}.md` || new RegExp(`^${id}\\.part\\d+\\.md$`).test(f)).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  const lines = files.map((f) => fs.readFileSync(new URL(f, dir), 'utf8')).join('\n\n').split('\n');
  let fence = false, h1 = 0, chapters = [];
  for (const l of lines) { if (/^```/.test(l)) fence = !fence; if (fence) continue; if (/^# /.test(l)) h1++; if (/^## /.test(l)) chapters.push(l.slice(3)); }
  const ok = files.length && h1 === 1 && chapters.length >= 5 && /quick revision/i.test(chapters.at(-1)) && !fence;
  if (!ok) bad++;
  console.log(`${ok ? 'ok ' : 'BAD'} ${id.padEnd(15)} files=${files.length} h1=${h1} chapters=${chapters.length} last="${chapters.at(-1)}" openFence=${fence}`);
}
process.exitCode = bad ? 1 : 0;
