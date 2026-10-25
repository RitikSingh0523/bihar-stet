// Lists markdown tables that GFM will not render (column-count mismatch or no blank line before the table).
import fs from 'node:fs';
const dir = new URL('../content/', import.meta.url);
const cols = (s) => s.trim().replace(/^\|/, '').replace(/\|$/, '').split(/(?<!\\)\|/).length;
const sep = /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?\s*$/;
let bad = 0;
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.md'))) {
  const L = fs.readFileSync(new URL(f, dir), 'utf8').split('\n');
  let fence = false;
  L.forEach((l, i) => {
    if (/^```/.test(l)) fence = !fence;
    if (fence || !l.includes('|') || !sep.test(l)) return;
    const hdr = L[i - 1] || '', before = L[i - 2] || '';
    let issue = '';
    if (!hdr.includes('|')) issue = 'no header row';
    else if (cols(hdr) !== cols(l)) issue = `columns header=${cols(hdr)} separator=${cols(l)}`;
    else if (before.trim() !== '' && !before.includes('|')) issue = 'no blank line before table';
    if (issue) { bad++; console.log(`${f}:${i + 1}  ${issue}  | ${hdr.slice(0, 80)}`); }
  });
}
console.log(`${bad} problem tables`);
