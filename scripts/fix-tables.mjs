// Inserts a blank line before markdown tables that directly follow a paragraph/list line (outside code fences).
import fs from 'node:fs';
const dir = new URL('../content/', import.meta.url);
const sep = /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?\s*$/;
let fixed = 0;
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.md'))) {
  const L = fs.readFileSync(new URL(f, dir), 'utf8').split('\n');
  const out = [];
  let fence = false;
  for (let i = 0; i < L.length; i++) {
    const l = L[i];
    if (/^```/.test(l)) fence = !fence;
    const isHeader = !fence && l.includes('|') && L[i + 1] && L[i + 1].includes('|') && sep.test(L[i + 1]) && !sep.test(l);
    if (isHeader) {
      const prev = out[out.length - 1];
      if (prev !== undefined && prev.trim() !== '' && !prev.includes('|')) { out.push(''); fixed++; }
    }
    out.push(l);
  }
  fs.writeFileSync(new URL(f, dir), out.join('\n'));
}
console.log(`inserted ${fixed} blank lines`);
