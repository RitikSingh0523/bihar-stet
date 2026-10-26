import React from 'react';
import { useHashRoute } from './useHashRoute.js';
import { parseTestId } from './storage.js';
import Home from './pages/Home.jsx';
import Instructions from './pages/Instructions.jsx';
import Exam from './pages/Exam.jsx';
import Result from './pages/Result.jsx';
import History from './pages/History.jsx';
import Learn from './pages/Learn.jsx';
import Topic from './pages/Topic.jsx';
import Revise from './pages/Revise.jsx';
import Subjects from './pages/Subjects.jsx';

export default function App() {
  const [page, id, extra] = useHashRoute();
  const tid = parseTestId(id); // number for mocks, "s-..." string for subject tests
  switch (page) {
    case 'subjects': return <Subjects />;
    case 'instructions': return <Instructions key={tid} id={tid} />;
    case 'exam': return <Exam key={tid} id={tid} />;
    case 'result': return <Result key={`${tid}-${extra}`} id={tid} attemptId={extra ? Number(extra) : null} />;
    case 'history': return <History />;
    case 'learn':
      if (!id) return <Learn />;
      if (id === 'revise') return <Revise />;
      return <Topic key={id} id={id} chapter={extra} />;
    default: return <Home />;
  }
}
