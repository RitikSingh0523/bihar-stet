# Question-writing brief (Bihar STET Paper II – Computer Science, Class 11-12)

We are building 20 mock tests. Exam pattern: 150 Qs / 150 marks / 150 min, no negative marking:
Part I Computer Science 100 | Part II Teaching Aptitude 30 | Part III General (GK 5, EVS 5, Maths 5, Reasoning 5).

You write ONE topic pool. Your pool must hold `20 x k` questions (k = per-mock quota given in your task),
so mock m (1..20) will receive questions [(m-1)*k, m*k) of your pool in order.

## Reference material (read for style / difficulty / syllabus coverage; do NOT copy)
Extracted text of past papers & a mock is in:
C:\Users\ritik\AppData\Local\Temp\claude\d--stet\2357d930-0364-4ec2-8edc-a7d840c9b4bd\scratchpad\*.txt
(Official 2025 papers Q.xx format; 2023 papers "Question N"; "Bihar-STET---Mock-Test-1.txt" has answers+explanations.)
Use grep to look at the questions of YOUR topic only; don't read whole files. Past-paper questions are the style target
(NCERT/university-level, 4 options, single correct). Write NEW questions: different wording, numbers, scenarios, code.
Never reuse a past-paper question verbatim, and no two questions in your pool may test the same fact in the same way.

## Quality rules (most important: every answer key MUST be correct)
- Exactly one unambiguously correct option. Plausible distractors. No "All of the above"/"None" overuse (max ~5%).
- For calculation/code-output/trace questions, work it out step by step before writing the key. Re-verify them.
- Do not write questions whose answer depends on opinion or an obscure edition-specific detail.
- Spread correct answers evenly over A/B/C/D (index 0-3) — do not cluster.
- Mix of styles across the pool: direct recall, "which is NOT", Statement I/II, match-the-following (put pairs in the stem,
  options are the mappings), assertion-reason, numeric/problem, code-output. Mix of easy/medium/hard (about 30/50/20).
- Within EVERY consecutive block of k questions cover varied sub-topics (each mock must be a good mix, not 1 subtopic).
- Plain English, plain text only (no markdown, no LaTeX). Code/formulas inline with \n for line breaks inside the "q" string
  (e.g. "What is the output?\nx = 5\nprint(x*2)"). Use unicode for symbols (≤, ≥, ∑, ∈, →, ², ³, √).
- Explanation: 1-2 sentences, states why the key is right (and the working for numeric questions).

## Output format
Write JSON files with the Write tool into D:\stet\questionbank\raw\<topic-id>\ as part01.json, part02.json, ...
Each file: max 40 questions, a valid JSON array (double quotes, escape quotes and newlines, no trailing commas, no comments):
[
  {"q": "question text", "options": ["A text","B text","C text","D text"], "answer": 2, "exp": "why", "sub": "subtopic label"}
]
`answer` is the 0-based index of the correct option. Exactly 4 options, no "(A)" prefixes in option text.
Total across your files MUST equal exactly 20 x k. After writing, validate with:
node -e "const fs=require('fs');const d='D:/stet/questionbank/raw/<topic-id>';let n=0;for(const f of fs.readdirSync(d).sort()){const a=JSON.parse(fs.readFileSync(d+'/'+f,'utf8'));n+=a.length;for(const x of a){if(x.options.length!==4||![0,1,2,3].includes(x.answer))throw new Error(f+' bad: '+x.q)}}console.log(n)"
Fix any errors. Your final reply should be ONE line: the topic id, the count written, and any problems. Do not paste questions in the reply.
