import React, { useEffect, useState } from 'react';
import Header from '../components/Header.jsx';
import { Button, QBox, Wrap } from '../components/ui.jsx';
import { clearProgress, getProgress, isSubjectId, loadTest } from '../storage.js';
import { go } from '../useHashRoute.js';

const LEGEND = [['notvisited', 'Not visited'], ['notanswered', 'Not answered'], ['answered', 'Answered'], ['marked', 'Marked for review'], ['marked ans', 'Answered & marked']];

export default function Instructions({ id }) {
  const saved = getProgress(id);
  const subject = isSubjectId(id);
  const [meta, setMeta] = useState(null);
  const back = subject ? 'subjects' : 'home';

  useEffect(() => {
    loadTest(id).then((t) => setMeta({
      title: t.title, duration: t.duration,
      n: t.sections.reduce((a, s) => a + s.questions.length, 0),
      parts: t.sections.map((s) => `${s.short} (${s.questions.length})`).join(', '),
    })).catch(() => setMeta(false));
  }, [id]);

  return (
    <>
      <Header />
      <Wrap narrow>
        <h1 className="mb-4 mt-4 text-2xl font-bold">{meta?.title || (subject ? 'Subject Test' : `Mock Test ${id}`)} – Instructions</h1>
        {meta === false && <p className="mb-4 text-red-600">Could not load this test. Run <code>npm run build:tests</code>.</p>}
        <ul className="mb-6 list-disc space-y-2.5 rounded-xl border border-slate-200 bg-white py-4 pl-9 pr-4">
          <li>
            Total <b>{meta ? meta.n : '…'} questions</b>, <b>{meta ? meta.n : '…'} marks</b>, duration <b>{meta ? meta.duration : '…'} minutes</b>.
            Each question carries 1 mark and <b>there is no negative marking</b>.
          </li>
          {subject
            ? <li>This is a subject test: every question of this subject is included, so it is longer than a normal paper. You can stop any time with <b>Submit</b> – unattempted questions simply score 0.</li>
            : <li>{meta ? meta.parts : 'Part I Computer Science (100), Part II Teaching Aptitude (30), Part III General (20)'}. You can move between parts freely.</li>}
          <li>The timer keeps running if you refresh or close the tab. The test is submitted automatically when time ends.</li>
          <li>Question palette colours:
            <div className="mt-2 flex flex-wrap gap-4 text-sm">
              {LEGEND.map(([s, l]) => <span key={s} className="flex items-center gap-1.5"><QBox state={s} size="sm" />{l}</span>)}
            </div>
          </li>
          <li>Use <b>Save &amp; Next</b> to record an answer. A question that is answered and also marked for review is still evaluated.</li>
        </ul>
        <div className="flex flex-wrap gap-2.5">
          <Button variant="primary" size="lg" disabled={!meta} onClick={() => go(`exam/${id}`)}>{saved ? 'Resume test' : 'Start test'}</Button>
          {saved && (
            <Button onClick={() => {
              if (confirm('Discard the saved progress and start over?')) { clearProgress(id); go(`exam/${id}`); }
            }}>Start fresh</Button>
          )}
          <Button onClick={() => go(back)}>Back</Button>
        </div>
      </Wrap>
    </>
  );
}
