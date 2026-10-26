// Assembles the per-topic question pools in ../questionbank/raw into 20 mock papers
// (public/tests/mock-XX.json). Mock m gets pool items [(m-1)*k, m*k) of every topic.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const RAW = path.resolve(here, '../questionbank/raw');
const OUT = path.resolve(here, '../public/tests');
const MOCKS = 20;

// [topic id, label, per-mock quota]
const SECTIONS = [
  { key: 'cs', name: 'Part I – Computer Science', short: 'Computer Science', topics: [
    ['cs-logic', 'Digital Logic & Number Systems', 6], ['cs-coa', 'Computer Organization', 6],
    ['cs-micro', 'Microprocessor & Microcontroller', 5], ['cs-os', 'Operating Systems', 8],
    ['cs-dbms', 'DBMS & SQL', 8], ['cs-net', 'Computer Networks', 7], ['cs-sec', 'Security & Cyber Law', 5],
    ['cs-oop', 'OOP (C++/Java)', 7], ['cs-ds', 'Data Structures', 8], ['cs-algo', 'Algorithms (DAA)', 6],
    ['cs-toc', 'TOC & Compiler Design', 6], ['cs-python', 'Python', 6], ['cs-c', 'C Programming', 4],
    ['cs-web', 'Web Technologies', 5], ['cs-se', 'Software Engineering', 4],
    ['cs-iot', 'IoT, Cloud, E-Commerce & ICT', 5], ['cs-ai', 'AI, ML & Image Processing', 4],
  ] },
  { key: 'tch', name: 'Part II – Teaching Aptitude', short: 'Teaching', topics: [
    ['tch-a', 'Educational Psychology', 15], ['tch-b', 'Teaching Methods & Assessment', 15],
  ] },
  { key: 'gen', name: 'Part III – General Studies', short: 'General', topics: [
    ['gk', 'General Knowledge', 5], ['evs', 'Environmental Science', 5],
    ['math', 'Mathematical Aptitude', 5], ['reason', 'Logical Reasoning', 5],
  ] },
];

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
function rng(seed) { // mulberry32
  return () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
function shuffle(arr, rand) { for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; } return arr; }

function loadPool(id) {
  const dir = path.join(RAW, id);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.json')).sort()
    .flatMap((f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')));
}

const pools = {}; const problems = []; const seen = new Map();
for (const s of SECTIONS) for (const [id, , k] of s.topics) {
  const pool = loadPool(id); pools[id] = pool;
  if (pool.length !== k * MOCKS) problems.push(`${id}: have ${pool.length}, need ${k * MOCKS}`);
  pool.forEach((x, i) => {
    if (!x.q || x.options?.length !== 4 || ![0, 1, 2, 3].includes(x.answer) || new Set(x.options.map((o) => o.trim())).size !== 4)
      problems.push(`${id}[${i}]: malformed/duplicate options: ${String(x.q).slice(0, 60)}`);
    const key = norm(x.q + " " + x.options.join(" ")); if (seen.has(key)) problems.push(`${id}[${i}] duplicates ${seen.get(key)}`); else seen.set(key, `${id}[${i}]`);
  });
}

fs.mkdirSync(OUT, { recursive: true });
let total = 0;
for (let m = 1; m <= MOCKS; m++) {
  const rand = rng(1000 + m * 7919);
  const sections = SECTIONS.map((s) => {
    let qs = [];
    for (const [id, label, k] of s.topics)
      qs.push(...pools[id].slice((m - 1) * k, m * k).map((x) => ({ q: x.q, options: x.options, answer: x.answer, exp: x.exp || '', topic: label })));
    if (s.key !== 'gen') shuffle(qs, rand); // general part keeps GK/EVS/Maths/Reasoning order like the real paper
    return { key: s.key, name: s.name, short: s.short, questions: qs };
  });
  const n = sections.reduce((a, s) => a + s.questions.length, 0); total += n;
  fs.writeFileSync(path.join(OUT, `mock-${String(m).padStart(2, '0')}.json`),
    JSON.stringify({ id: m, title: `Mock Test ${m}`, duration: 150, sections }));
}
// ---- Subject-wise tests: one test per topic pool, containing every question of that pool ----
const manifest = [];
for (const s of SECTIONS) for (const [id, label] of s.topics) {
  const qs = shuffle(pools[id].map((x) => ({ q: x.q, options: x.options, answer: x.answer, exp: x.exp || '', topic: label })), rng(77 + id.length * 131 + id.charCodeAt(id.length - 1)));
  const duration = qs.length; // 1 minute per question, as in the real paper
  const sid = `s-${id}`;
  fs.writeFileSync(path.join(OUT, `${sid}.json`), JSON.stringify({
    id: sid, title: `${label} – Subject Test`, duration,
    sections: [{ key: s.key, name: label, short: label, questions: qs }],
  }));
  manifest.push({ id: sid, title: label, group: s.key, count: qs.length, duration });
}
fs.writeFileSync(path.join(OUT, 'subjects.json'), JSON.stringify(manifest));
console.log(`Built ${manifest.length} subject tests, ${manifest.reduce((a, m) => a + m.count, 0)} questions.`);

console.log(`Built ${MOCKS} mocks, ${total} questions.`);
if (problems.length) { console.log(`\n${problems.length} PROBLEMS:`); problems.slice(0, 60).forEach((p) => console.log(' -', p)); process.exitCode = 1; }
