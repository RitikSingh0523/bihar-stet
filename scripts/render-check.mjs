import fs from 'node:fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
const dir = new URL('../content/', import.meta.url);
let n = 0, tables = 0, code = 0;
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.md'))) {
  const html = renderToString(React.createElement(ReactMarkdown, { remarkPlugins: [remarkGfm] }, fs.readFileSync(new URL(f, dir), 'utf8')));
  n++; tables += (html.match(/<table/g) || []).length; code += (html.match(/<pre/g) || []).length;
  const outside = html.replace(/<pre>[\s\S]*?<\/pre>/g, '');
  const m = outside.match(/[^\n<>]{0,60}\|\s*:?-{3,}[^\n<>]{0,40}/);
  if (m) console.log('unrendered table pipes in', f, '=>', m[0]);
}
console.log(`${n} files rendered: ${tables} tables, ${code} code blocks`);
