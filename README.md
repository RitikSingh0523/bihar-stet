# Bihar STET Computer Science – Mock Tests + Learn

React + Vite + Tailwind CSS. No backend: everything is static, and progress/results are stored in the browser (localStorage).

## Features
- **20 full-length mock tests** (150 Qs · 150 marks · 150 min · no negative marking) in the Bihar STET Paper II pattern:
  Part I Computer Science 100, Part II Teaching Aptitude 30, Part III General 20 (GK 5, Environment 5, Maths 5, Reasoning 5).
  Timer that survives refresh, question palette, mark-for-review, section/topic-wise results, answer review with explanations.
- **Subject Tests** (`#/subjects`): one test per subject (23 in total) containing every MCQ of that subject, e.g. all 140 Computer Networks questions.
- **Learn** (`#/learn`): full-text search across every chapter (press `/` to focus, quotes for exact phrases), concept notes for 20 topics (249 chapters, mapped to the official 15-unit syllabus), a day-by-day plan counting down to the exam on 7 Nov 2026,
  chapter progress tracking, weak-area suggestions from your mock results and a one-page *Quick Revision Sheets* view (`#/learn/revise`, printable).

## Run locally
    npm install
    npm run dev          # http://localhost:5173
    npm run build        # production build -> dist/

## Content
- Questions: `questionbank/raw/<topic>/*.json`. `npm run build:tests` assembles them into `public/tests/mock-01..20.json`
  (mock *m* takes items [(m-1)k, mk) of each topic pool, k = per-mock quota) and reports duplicates / malformed items.
- Notes: `content/<topic>.partN.md` (Markdown, `##` = chapter). `npm run build` bundles them; `node scripts/check-content.mjs`
  validates structure and `node scripts/render-check.mjs` checks every file renders.

## Deploy
Static site using hash routing and relative asset paths, so it works on any static host.
- **GitHub Pages:** repo *Settings → Pages → Source: GitHub Actions*; `.github/workflows/deploy.yml` builds and publishes on every push to `main`.
- **Vercel / Netlify:** build command `npm run build`, output directory `dist`.

## PWA / offline
The app is an installable Progressive Web App (`vite-plugin-pwa`): a service worker precaches the app shell, all notes and all 43 test files,
so everything (mock tests, subject tests, Learn, results) works offline after the first visit. Use *Install app* in the header (or the browser's
install / "Add to Home screen" option). Icons are generated from `public/icon.svg` with `node scripts/make-icons.mjs`.
Note: PWAs need HTTPS (GitHub Pages, Vercel and Netlify all provide it) or `localhost`.

## Syllabus alignment
Notes and MCQs follow the official 15-unit Computer Science syllabus (100 marks): see `questionbank/SYLLABUS-BRIEF.md` and the *Official syllabus* panel on `#/learn`.
Questions added/replaced for the syllabus carry `"v": 2` in `questionbank/raw`. `node scripts/syllabus-audit.mjs` gives a rough keyword coverage report.
