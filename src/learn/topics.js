// Study topics shown in /learn. `id` matches content/<id>.md (or <id>.part*.md).
// `marks` = approx. questions per paper; `labels` = topic labels used in the mock tests (see scripts/build-tests.mjs).
export const EXAM_DATE = new Date('2026-11-07T00:00:00');
export const PLAN_START = new Date('2026-10-25T00:00:00');

export const GROUPS = {
  cs: { name: 'Part I · Computer Science', blurb: '100 questions – the bulk of your score' },
  tch: { name: 'Part II · Teaching Aptitude', blurb: '30 questions – the easiest marks to secure' },
  gen: { name: 'Part III · General Studies', blurb: '20 questions – GK, Environment, Maths, Reasoning' },
};

export const TOPICS = [
  { id: 'cs-logic', group: 'cs', title: 'Digital Logic & Number Systems', marks: 6, icon: '🔢', labels: ['Digital Logic & Number Systems'] },
  { id: 'cs-coa', group: 'cs', title: 'Computer Organization', marks: 6, icon: '🧮', labels: ['Computer Organization'] },
  { id: 'cs-micro', group: 'cs', title: 'Microprocessor & Microcontroller', marks: 5, icon: '🔌', labels: ['Microprocessor & Microcontroller'] },
  { id: 'cs-os', group: 'cs', title: 'Operating Systems', marks: 8, icon: '🖥️', labels: ['Operating Systems'] },
  { id: 'cs-dbms', group: 'cs', title: 'DBMS & SQL', marks: 8, icon: '🗄️', labels: ['DBMS & SQL'] },
  { id: 'cs-net', group: 'cs', title: 'Computer Networks', marks: 7, icon: '🌐', labels: ['Computer Networks'] },
  { id: 'cs-sec', group: 'cs', title: 'Security & Cyber Law', marks: 5, icon: '🔐', labels: ['Security & Cyber Law'] },
  { id: 'cs-oop', group: 'cs', title: 'OOP (C++ & Java)', marks: 7, icon: '🧩', labels: ['OOP (C++/Java)'] },
  { id: 'cs-ds', group: 'cs', title: 'Data Structures', marks: 8, icon: '🌳', labels: ['Data Structures'] },
  { id: 'cs-algo', group: 'cs', title: 'Algorithms (DAA)', marks: 6, icon: '⚙️', labels: ['Algorithms (DAA)'] },
  { id: 'cs-toc', group: 'cs', title: 'TOC & Compiler Design', marks: 6, icon: '📐', labels: ['TOC & Compiler Design'] },
  { id: 'cs-programming', group: 'cs', title: 'Python & C Programming', marks: 10, icon: '🐍', labels: ['Python', 'C Programming'] },
  { id: 'cs-web', group: 'cs', title: 'Web Technologies', marks: 5, icon: '🕸️', labels: ['Web Technologies'] },
  { id: 'cs-se', group: 'cs', title: 'Software Engineering', marks: 4, icon: '🛠️', labels: ['Software Engineering'] },
  { id: 'cs-iot', group: 'cs', title: 'IoT, Cloud, E-Commerce & ICT', marks: 5, icon: '☁️', labels: ['IoT, Cloud, E-Commerce & ICT'] },
  { id: 'cs-ai', group: 'cs', title: 'AI, ML, Image Processing & Graphics', marks: 4, icon: '🤖', labels: ['AI, ML & Image Processing'] },
  { id: 'tch-a', group: 'tch', title: 'Educational Psychology & Foundations', marks: 15, icon: '🧠', labels: ['Educational Psychology'] },
  { id: 'tch-b', group: 'tch', title: 'Teaching Methods, Assessment & ICT', marks: 15, icon: '👩‍🏫', labels: ['Teaching Methods & Assessment'] },
  { id: 'gk-evs', group: 'gen', title: 'GK (India & Bihar) & Environment', marks: 10, icon: '🌏', labels: ['General Knowledge', 'Environmental Science'] },
  { id: 'aptitude', group: 'gen', title: 'Maths Aptitude & Reasoning', marks: 10, icon: '➗', labels: ['Mathematical Aptitude', 'Logical Reasoning'] },
];

export const topicById = (id) => TOPICS.find((t) => t.id === id);
export const topicForLabel = (label) => TOPICS.find((t) => t.labels.includes(label));

// 13-day plan: day 0 = PLAN_START. Mock numbers refer to the practice tests.
export const PLAN = [
  { title: 'Hardware foundations', topics: ['cs-logic', 'cs-coa', 'cs-micro'], note: 'Short, formula-heavy topics: finish all three today.' },
  { title: 'Operating Systems', topics: ['cs-os'], note: 'Solve the Gantt-chart, page-replacement and Banker\'s examples by hand.' },
  { title: 'Databases', topics: ['cs-dbms'], note: 'Write SQL by hand; practise attribute closure and normal-form questions.' },
  { title: 'Data Structures & Algorithms', topics: ['cs-ds', 'cs-algo'], note: 'Trace traversals/sorts on paper; memorise complexity tables.', mock: 1 },
  { title: 'Networks & Security', topics: ['cs-net', 'cs-sec'], note: 'Subnetting, CRC/Hamming and RSA numerics appear every year.' },
  { title: 'Programming', topics: ['cs-oop', 'cs-programming'], note: 'Output-prediction questions: trace line by line.', mock: 2 },
  { title: 'TOC, Compilers & Web', topics: ['cs-toc', 'cs-web'], note: 'Closure-property tables and DFA/NFA state counts are high-yield.' },
  { title: 'Teaching Aptitude (full day)', topics: ['tch-a', 'tch-b'], note: '30 questions – theorists, methods, assessment, NEP 2020.', mock: 3 },
  { title: 'Remaining CS topics', topics: ['cs-se', 'cs-iot', 'cs-ai'], note: 'Lighter topics – finish early and pick up easy marks.' },
  { title: 'General Studies', topics: ['gk-evs', 'aptitude'], note: 'Bihar GK + Environment + quick maths/reasoning shortcuts.', mock: 4 },
  { title: 'Weak-area repair', topics: [], note: 'Open "Weak areas" below and re-read those chapters, then redo the wrong questions.', mock: 5 },
  { title: 'Full-length mocks + review', topics: [], note: 'Take two full mocks under exam timing, review every wrong answer.', mock: 6 },
  { title: 'Final revision', topics: [], note: 'Read only the Quick Revision Sheets. Sleep early.', revise: true },
  { title: 'Exam day – 7 Nov 2026', topics: [], note: 'Light skim of the revision sheet. Reach the centre early. No negative marking: attempt every question.', exam: true },
];
