import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// rehype plugin: wraps every occurrence of the search terms in <mark>.
const highlighter = (terms) => () => (tree) => {
  const re = new RegExp(`(?<![A-Za-z0-9])(${terms.map(esc).join('|')})`, 'gi');
  const walk = (node) => {
    if (!node.children) return;
    const out = [];
    for (const c of node.children) {
      if (c.type === 'text') {
        c.value.split(re).forEach((p, i) => {
          if (!p) return;
          out.push(i % 2 === 1
            ? { type: 'element', tagName: 'mark', properties: {}, children: [{ type: 'text', value: p }] }
            : { type: 'text', value: p });
        });
      } else { walk(c); out.push(c); }
    }
    node.children = out;
  };
  walk(tree);
};

const components = {
  table: ({ children }) => <div className="my-4 overflow-x-auto"><table>{children}</table></div>,
  pre: ({ children }) => <pre className="!bg-slate-900 !text-slate-100 text-[13px]">{children}</pre>,
  mark: ({ children }) => <mark className="rounded bg-yellow-200 px-0.5 text-slate-900">{children}</mark>,
  // Highlight the "Exam tip" lines
  p: ({ children }) => {
    const first = React.Children.toArray(children)[0];
    const isTip = first?.props?.children && String(first.props.children).includes('Exam tip');
    return isTip
      ? <p className="rounded-lg border-l-4 border-amber-400 bg-amber-50 px-3 py-2 text-amber-900">{children}</p>
      : <p>{children}</p>;
  },
};

export default function Markdown({ children, terms }) {
  const key = (terms || []).join('\u0001');
  const rehype = useMemo(() => (terms?.length ? [highlighter(terms)] : []), [key]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="prose prose-slate max-w-none prose-headings:scroll-mt-20 prose-h3:mt-6 prose-code:rounded prose-code:bg-slate-100 prose-code:px-1 prose-code:before:content-none prose-code:after:content-none prose-table:text-sm prose-th:bg-slate-50 prose-pre:p-4 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-inherit [&_pre_code]:rounded-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={rehype} components={components}>{children}</ReactMarkdown>
    </div>
  );
}
