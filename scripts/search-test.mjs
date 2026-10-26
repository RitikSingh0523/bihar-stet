// Sanity test for src/learn/search.js against the real notes (node scripts/search-test.mjs).
// search.js imports Vite-only modules, so we load a trimmed copy with the pure functions only.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = new URL('../', import.meta.url);
const read = (p) => fs.readFileSync(new URL(p, root), 'utf8');

const trimmed = read('src/learn/search.js')
  .replace(/^import .*\n/gm, '')
  .replace(/let indexPromise[\s\S]*?\n\}\n\n\/\/ "exact/, '// "exact')
  .replace(/\nconst plain[\s\S]*?\n\n/, '\n');
const tmp = path.join(os.tmpdir(), 'search-copy.mjs');
fs.writeFileSync(tmp, trimmed);
const { search } = await import(pathToFileURL(tmp).href);

const plain = (md) => md.replace(/```[a-z]*\n?/g, ' ').replace(/[|*_`>#]/g, ' ').replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/\s+/g, ' ').trim();
const topics = [...read('src/learn/topics.js').matchAll(/id: '([a-z-]+)', group: '(\w+)', title: '([^']+)'/g)]
  .map((m) => ({ id: m[1], group: m[2], title: m[3], icon: '' }));
const docs = [];
for (const t of topics) {
  const files = fs.readdirSync(new URL('content/', root))
    .filter((f) => f === `${t.id}.md` || new RegExp(`^${t.id}\\.part\\d+\\.md$`).test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  const lines = files.map((f) => read(`content/${f}`)).join('\n\n').replace(/\r/g, '').split('\n');
  let fence = false, cur = null, h1 = false;
  const chs = [];
  for (const l of lines) {
    if (/^```/.test(l)) fence = !fence;
    if (!fence && /^# /.test(l) && !h1) { h1 = true; continue; }
    if (!fence && /^## /.test(l)) { cur = { title: l.slice(3), lines: [] }; chs.push(cur); continue; }
    if (cur) cur.lines.push(l);
  }
  chs.forEach((c, i) => {
    const text = plain(c.lines.join('\n'));
    docs.push({ topic: t, chIdx: i, chTitle: c.title, text, lower: text.toLowerCase(), titleLower: c.title.toLowerCase() });
  });
}
console.log('chapters indexed:', docs.length);

let failed = 0;
const expect = (q, test, group) => {
  const t0 = performance.now();
  const { terms, results } = search(docs, q, group);
  const ms = (performance.now() - t0).toFixed(1);
  const ok = test(results);
  if (!ok) failed++;
  console.log(`\n${ok ? 'PASS' : 'FAIL'} [${q}] terms=${JSON.stringify(terms)} -> ${results.length} chapters (${ms} ms)`);
  results.slice(0, 3).forEach((r) => console.log('   ', r.doc.topic.id, '>', r.doc.chTitle, '| hits', r.hits, '|', r.snippet.slice(0, 80)));
};

expect('page fault', (r) => r[0]?.doc.topic.id === 'cs-os');
expect('subnetting', (r) => r.some((x) => x.doc.topic.id === 'cs-net'));
expect('piaget', (r) => r[0]?.doc.topic.id.startsWith('tch'));
expect('fcfs scheduling', (r) => r.some((x) => x.doc.topic.id === 'cs-os'));
expect('"page table"', (r) => r.some((x) => x.doc.topic.id === 'cs-os'));
expect('subnet', (r) => r.some((x) => x.doc.topic.id === 'cs-net'));
expect('normalization bcnf', (r) => r[0]?.doc.topic.id === 'cs-dbms');
expect('rsa', (r) => r.some((x) => x.doc.topic.id === 'cs-sec') && !r.some((x) => x.doc.topic.id === 'cs-logic'));
expect('zzzzqq', (r) => r.length === 0);
expect('rsa', (r) => r.every((x) => x.doc.topic.group === 'tch') && r.length === 0, 'tch');
process.exitCode = failed ? 1 : 0;
console.log(failed ? `\n${failed} FAILED` : '\nall passed');
