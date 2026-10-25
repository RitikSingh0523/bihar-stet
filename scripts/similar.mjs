// Fuzzy near-duplicate finder across all pools (stem + options token Jaccard).
import fs from 'node:fs';
import path from 'node:path';
const RAW = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, '$1')), '../questionbank/raw');
const TH = Number(process.argv[2] || 0.7);
const items = [];
for (const id of fs.readdirSync(RAW)) {
  const dir = path.join(RAW, id);
  fs.readdirSync(dir).filter((f) => f.endsWith('.json')).sort()
    .flatMap((f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')))
    .forEach((x, i) => items.push({ id, i, q: x.q, set: new Set((x.q + ' ' + x.options.join(' ')).toLowerCase().match(/[a-z0-9]+/g)) }));
}
let n = 0;
for (let a = 0; a < items.length; a++) for (let b = a + 1; b < items.length; b++) {
  const A = items[a], B = items[b]; let inter = 0;
  for (const t of A.set) if (B.set.has(t)) inter++;
  const j = inter / (A.set.size + B.set.size - inter);
  if (j >= TH) { n++; console.log(`${j.toFixed(2)} ${A.id}[${A.i}] ~ ${B.id}[${B.i}] | ${A.q.slice(0, 60).replace(/\n/g, ' ')} | ${B.q.slice(0, 60).replace(/\n/g, ' ')}`); }
}
console.log(`${n} similar pairs at >=${TH} among ${items.length}`);
