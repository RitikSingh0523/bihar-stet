import React from 'react';
import Header from '../components/Header.jsx';
import { Button, QBox, Wrap } from '../components/ui.jsx';
import { clearProgress, getProgress } from '../storage.js';
import { go } from '../useHashRoute.js';

const LEGEND = [['notvisited', 'Not visited'], ['notanswered', 'Not answered'], ['answered', 'Answered'], ['marked', 'Marked for review'], ['marked ans', 'Answered & marked']];

export default function Instructions({ id }) {
  const saved = getProgress(id);
  return (
    <>
      <Header />
      <Wrap narrow>
        <h1 className="mb-4 mt-4 text-2xl font-bold">Mock Test {id} – Instructions</h1>
        <ul className="mb-6 list-disc space-y-2.5 rounded-xl border border-slate-200 bg-white py-4 pl-9 pr-4">
          <li>Total <b>150 questions</b>, <b>150 marks</b>, duration <b>150 minutes</b>. Each question carries 1 mark and <b>there is no negative marking</b>.</li>
          <li>Part I Computer Science (100), Part II Teaching Aptitude (30), Part III General (20). You can move between parts freely.</li>
          <li>The timer keeps running if you refresh or close the tab. The test is submitted automatically when time ends.</li>
          <li>Question palette colours:
            <div className="mt-2 flex flex-wrap gap-4 text-sm">
              {LEGEND.map(([s, l]) => <span key={s} className="flex items-center gap-1.5"><QBox state={s} size="sm" />{l}</span>)}
            </div>
          </li>
          <li>Use <b>Save &amp; Next</b> to record an answer. A question that is answered and also marked for review is still evaluated.</li>
        </ul>
        <div className="flex flex-wrap gap-2.5">
          <Button variant="primary" size="lg" onClick={() => go(`exam/${id}`)}>{saved ? 'Resume test' : 'Start test'}</Button>
          {saved && (
            <Button onClick={() => {
              if (confirm('Discard the saved progress and start over?')) { clearProgress(id); go(`exam/${id}`); }
            }}>Start fresh</Button>
          )}
          <Button onClick={() => go('home')}>Back</Button>
        </div>
      </Wrap>
    </>
  );
}
