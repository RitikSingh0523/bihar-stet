import React from 'react';

const cx = (...a) => a.filter(Boolean).join(' ');

const BTN = 'inline-flex items-center justify-center rounded-lg border px-3.5 py-2 text-sm transition disabled:cursor-default disabled:opacity-40 cursor-pointer';
const VARIANT = {
  default: 'border-slate-200 bg-white text-slate-800 hover:enabled:border-brand',
  primary: 'border-brand bg-brand text-white hover:enabled:brightness-110',
  danger: 'border-red-600 bg-red-600 text-white hover:enabled:brightness-110',
  mark: 'border-violet-500 bg-white text-violet-600 hover:enabled:bg-violet-50',
};

export function Button({ variant = 'default', size, className, ...p }) {
  return <button {...p} className={cx(BTN, VARIANT[variant], size === 'sm' && '!px-2.5 !py-1 text-xs', size === 'lg' && '!px-6 !py-3 text-base', className)} />;
}

const BADGE = {
  default: 'bg-slate-100 text-slate-500',
  ok: 'bg-green-100 text-green-700', correct: 'bg-green-100 text-green-700',
  warn: 'bg-amber-100 text-amber-700',
  wrong: 'bg-red-100 text-red-700', skipped: 'bg-amber-100 text-amber-700',
};
export const Badge = ({ tone = 'default', children }) => (
  <span className={cx('rounded-full px-2 py-0.5 text-xs capitalize', BADGE[tone])}>{children}</span>
);

export const Wrap = ({ narrow, children }) => (
  <main className={cx('mx-auto w-full px-4 pb-12', narrow ? 'max-w-3xl' : 'max-w-6xl')}>{children}</main>
);

// Question-palette box styles, shared by the exam palette and the instructions legend.
const Q_STATE = {
  notvisited: 'bg-slate-200',
  notanswered: 'bg-red-300',
  answered: 'bg-green-400',
  marked: 'bg-violet-300 rounded-full',
  'marked ans': 'bg-violet-300 rounded-full ring-[3px] ring-inset ring-green-400',
};
export function QBox({ state, size = 'md', current, children, ...p }) {
  const Tag = p.onClick ? 'button' : 'span';
  return (
    <Tag {...p} className={cx(
      'inline-grid place-items-center text-xs',
      size === 'sm' ? 'h-5 w-5 rounded' : 'h-9 w-full rounded-lg cursor-pointer',
      Q_STATE[state], current && 'outline-2 outline-offset-1 outline-brand',
    )}>{children}</Tag>
  );
}

export { cx };
