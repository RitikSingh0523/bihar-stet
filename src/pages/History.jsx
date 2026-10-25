import React, { useState } from 'react';
import Header from '../components/Header.jsx';
import { Button, Wrap } from '../components/ui.jsx';
import { clearHistory, getHistory } from '../storage.js';
import { go } from '../useHashRoute.js';

const TH = 'bg-slate-50 px-3 py-2.5 text-left font-semibold';
const TD = 'border-t border-slate-200 px-3 py-2.5';

export default function History() {
  const [list, setList] = useState(getHistory);
  return (
    <>
      <Header />
      <Wrap>
        <div className="flex items-center justify-between">
          <h1 className="my-4 text-2xl font-bold">My Attempts</h1>
          {list.length > 0 && (
            <Button variant="danger" size="sm" onClick={() => {
              if (confirm('Delete all saved attempts from this browser?')) { clearHistory(); setList([]); }
            }}>Clear all</Button>
          )}
        </div>
        {list.length === 0 && <p className="text-slate-500">No attempts yet. Take a mock test to see your results here.</p>}
        {list.length > 0 && (
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-sm">
              <thead><tr>{['Test', 'Date', 'Score', 'CS', 'Teaching', 'General', ''].map((h) => <th key={h} className={TH}>{h}</th>)}</tr></thead>
              <tbody>
                {list.map((a) => (
                  <tr key={a.at}>
                    <td className={TD}>Mock {a.testId}</td>
                    <td className={TD}>{new Date(a.at).toLocaleString()}</td>
                    <td className={TD}><b>{a.score}/{a.total}</b></td>
                    {a.sections.map((s) => <td key={s.name} className={TD}>{s.score}/{s.total}</td>)}
                    <td className={TD}><Button size="sm" onClick={() => go(`result/${a.testId}/${a.at}`)}>View</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Wrap>
    </>
  );
}
