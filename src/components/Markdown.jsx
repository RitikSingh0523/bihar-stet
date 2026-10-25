import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const components = {
  table: ({ children }) => <div className="my-4 overflow-x-auto"><table>{children}</table></div>,
  pre: ({ children }) => <pre className="!bg-slate-900 !text-slate-100 text-[13px]">{children}</pre>,
  // Highlight the "Exam tip" lines
  p: ({ children }) => {
    const first = React.Children.toArray(children)[0];
    const isTip = first?.props?.children && String(first.props.children).includes('Exam tip');
    return isTip
      ? <p className="rounded-lg border-l-4 border-amber-400 bg-amber-50 px-3 py-2 text-amber-900">{children}</p>
      : <p>{children}</p>;
  },
};

export default function Markdown({ children }) {
  return (
    <div className="prose prose-slate max-w-none prose-headings:scroll-mt-20 prose-h3:mt-6 prose-code:rounded prose-code:bg-slate-100 prose-code:px-1 prose-code:before:content-none prose-code:after:content-none prose-table:text-sm prose-th:bg-slate-50 prose-pre:p-4">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>{children}</ReactMarkdown>
    </div>
  );
}
