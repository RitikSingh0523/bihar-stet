// Counts how often each syllabus keyword appears in the Learn notes (chapters) and in the question bank (stems+options+explanations).
import fs from 'node:fs';
const root = new URL('../', import.meta.url);

const notes = fs.readdirSync(new URL('content/', root)).filter((f) => f.endsWith('.md'))
  .map((f) => fs.readFileSync(new URL(`content/${f}`, root), 'utf8')).join('\n').toLowerCase();

const qs = [];
for (const d of fs.readdirSync(new URL('questionbank/raw/', root)))
  for (const f of fs.readdirSync(new URL(`questionbank/raw/${d}/`, root)))
    for (const x of JSON.parse(fs.readFileSync(new URL(`questionbank/raw/${d}/${f}`, root), 'utf8')))
      qs.push(`${x.q} ${x.options.join(' ')} ${x.exp}`.toLowerCase());
const bank = qs.join('\n');

const count = (hay, re) => (hay.match(re) || []).length;
const qcount = (re) => qs.filter((q) => re.test(q)).length;

const AREAS = {
  'Digital Logic': ['boolean algebra', 'k-map|karnaugh', 'flip-flop', 'counter', 'multiplexer', 'number system|base conversion', 'full adder'],
  'COA': ['micro-?operation', 'register transfer', 'instruction format', 'addressing mode', 'cache', 'memory hierarchy', 'i/o organi|dma', 'bus and memory transfer|common bus', 'shift micro|arithmetic micro|logic micro'],
  'Programming (C)': ['pointer', 'structure', 'union', 'file handling|fopen', 'function', 'array', 'storage class', 'recursion'],
  'Programming (C++/Java)': ['c\\+\\+', 'java', 'constructor', 'jvm', 'interface', 'exception', 'template', 'package'],
  'Programming (Python)': ['python', 'list comprehension', 'dictionary', 'file handling|open\\(', 'lambda', 'numpy|pandas'],
  'DSA': ['linked list', 'stack', 'queue', 'binary tree', 'graph', 'sorting', 'binary search', 'big-?o|asymptotic', 'dynamic programming', 'hashing'],
  'OS': ['process', 'thread', 'cpu scheduling|round robin', 'deadlock', 'paging', 'virtual memory', 'file system', 'semaphore', 'banker'],
  'DBMS': ['e-r model|er model|entity', 'relational algebra', '1nf', 'bcnf', 'sql', 'transaction', 'concurrency control', 'serializab', '2pl|two-phase'],
  'Networks': ['osi', 'tcp/ip', 'data link', 'ipv4', 'routing protocol|rip|ospf|bgp', 'tcp', 'udp', 'application layer|http|dns', 'subnet'],
  'Software Engineering': ['sdlc', 'requirement', 'design principle|coupling|cohesion', 'testing', 'project management|pert|cpm', 'cocomo', 'agile'],
  'OOP': ['encapsulation', 'inheritance', 'polymorphism', 'abstraction', 'class', 'object'],
  'Web': ['html', 'css', 'javascript', 'web application|three-tier|mvc|client-server', 'dom', 'http'],
  'TOC': ['regular expression', 'finite automat|dfa', 'context-free|cfg', 'turing machine', 'pumping lemma', 'pushdown|pda'],
  'Emerging tech & others': ['internet of things|iot', 'artificial intelligence', 'e-commerce', 'multimedia', 'cyber security|cybersecurity', 'cloud', 'machine learning', 'image processing|compression', 'blockchain'],
  'Beyond syllabus (kept from past papers)': ['8085|8086|8051', 'microcontroller', 'compiler|lexical|parsing', 'ieee-?754'],
};

console.log('keyword'.padEnd(46), 'notes'.padStart(6), 'MCQs'.padStart(6));
for (const [area, kws] of Object.entries(AREAS)) {
  console.log(`\n== ${area}`);
  for (const k of kws) {
    const re = new RegExp(k, 'g'), re1 = new RegExp(k);
    const n = count(notes, re), q = qcount(re1);
    console.log(`${(n < 3 || q < 3 ? '!! ' : '   ') + k}`.padEnd(46), String(n).padStart(6), String(q).padStart(6));
  }
}
console.log(`\ntotal MCQs in bank: ${qs.length}`);
