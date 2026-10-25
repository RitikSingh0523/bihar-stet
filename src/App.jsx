import React from 'react';
import { useHashRoute } from './useHashRoute.js';
import Home from './pages/Home.jsx';
import Instructions from './pages/Instructions.jsx';
import Exam from './pages/Exam.jsx';
import Result from './pages/Result.jsx';
import History from './pages/History.jsx';
import Learn from './pages/Learn.jsx';
import Topic from './pages/Topic.jsx';
import Revise from './pages/Revise.jsx';

export default function App() {
  const [page, id, extra] = useHashRoute();
  const n = Number(id);
  switch (page) {
    case 'instructions': return <Instructions id={n} />;
    case 'exam': return <Exam key={n} id={n} />;
    case 'result': return <Result key={`${n}-${extra}`} id={n} attemptId={extra ? Number(extra) : null} />;
    case 'history': return <History />;
    case 'learn':
      if (!id) return <Learn />;
      if (id === 'revise') return <Revise />;
      return <Topic key={id} id={id} chapter={extra} />;
    default: return <Home />;
  }
}
