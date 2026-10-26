// All progress lives in localStorage (no backend needed).
const K = { hist: 'stet.history.v1', prog: (id) => `stet.progress.v1.${id}` };
const read = (k, d) => {
  try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; }
};

export const getHistory = () => read(K.hist, []);
export const addAttempt = (a) => localStorage.setItem(K.hist, JSON.stringify([a, ...getHistory()]));
export const clearHistory = () => localStorage.removeItem(K.hist);
export const getProgress = (id) => read(K.prog(id), null);
export const saveProgress = (id, p) => localStorage.setItem(K.prog(id), JSON.stringify(p));
export const clearProgress = (id) => localStorage.removeItem(K.prog(id));

// Test ids: numbers (1-20) are full mocks, strings like "s-cs-net" are subject tests.
export const isSubjectId = (id) => typeof id === 'string' && id.startsWith('s-');
export const parseTestId = (raw) => (/^\d+$/.test(raw) ? Number(raw) : raw);

async function getJson(file) {
  const res = await fetch(`${import.meta.env.BASE_URL}tests/${file}.json`);
  if (!res.ok) throw new Error('Test not found');
  return res.json();
}

export const loadTest = (id) => getJson(isSubjectId(id) ? id : `mock-${String(id).padStart(2, '0')}`);
export const loadSubjects = () => getJson('subjects');

export function bestScores() {
  const best = {};
  for (const a of getHistory()) if (!best[a.testId] || a.score > best[a.testId].score) best[a.testId] = a;
  return best;
}
