import React from 'react';
import { go } from '../useHashRoute.js';
import InstallButton from './InstallButton.jsx';

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <a href="#/home" className="flex items-center gap-2 font-bold text-slate-800 no-underline">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand text-white">S</span>
          Bihar STET <small className="hidden font-normal text-slate-500 sm:inline">Computer Science · Paper II</small>
        </a>
        <nav className="flex items-center gap-3 overflow-x-auto whitespace-nowrap text-sm sm:gap-4">
          <InstallButton />
          <button className="cursor-pointer font-semibold text-emerald-700 hover:text-emerald-900" onClick={() => go('learn')}>Learn</button>
          <button className="cursor-pointer hover:text-brand" onClick={() => go('home')}>Mock Tests</button>
          <button className="cursor-pointer hover:text-brand" onClick={() => go('subjects')}>Subject Tests</button>
          <button className="cursor-pointer hover:text-brand" onClick={() => go('history')}>My Attempts</button>
        </nav>
      </div>
    </header>
  );
}
