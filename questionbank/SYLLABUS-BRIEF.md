# Syllabus-alignment brief (Bihar STET Paper II – Computer Science, 100 marks)

The candidate supplied the official unit-wise syllabus below. Our Learn notes (D:\stet\app\content\*.md) and MCQ pools (D:\stet\app\questionbank\raw\<topic>\*.json) were written
earlier from past papers; your job is to AUDIT your cluster against THIS syllabus and CLOSE THE GAPS.

## Official syllabus (unit-wise, as supplied)
Unit 1 Digital Logic: Number systems (binary, octal, hex, BCD, ASCII, EBCDIC, Gray); binary arithmetic, complements, Boolean algebra, Venn diagrams; logic gates, truth tables, SOP & POS, K-map;
 combinational circuits (adder, subtractor, encoder, decoder, multiplexer, comparator, parity generator); memory systems (RAM, ROM, EPROM, EEPROM, PLDs & PLAs);
 sequential circuits (SR, JK, D, T flip-flops, registers, counters, state diagrams); A/D and D/A conversion; logic families (TTL, ECL, MOS, CMOS).
Unit 2 Computer Organization & Architecture: number systems & conversions, binary arithmetic; error detection/correction codes (parity, checksum, Hamming); ASCII, EBCDIC, Gray, BCD;
 CPU, addressing modes, RAM (SRAM, DRAM), ROM (PROM, EPROM, EEPROM); microprocessor & microcontroller basics; logic gates, K-map simplification, ALU design.
Unit 3 Programming & Data Structures: data types, ADTs, algorithm design techniques; arrays (1D, 2D, sparse matrices), recursion & backtracking; linked lists (single, double, circular, polynomial operations);
 stack (operations, prefix/postfix evaluation); queue (circular, dequeue, priority queue); searching (linear, binary, hashing); sorting (insertion, selection, bubble, heap, counting, bucket);
 trees (binary, BST, AVL, B-tree, Huffman coding); graphs (representation, DFS, BFS).
Unit 4 Algorithms: time & space complexity, Big-O, recurrence relations; divide & conquer (binary search, merge sort); dynamic programming, graph algorithms, NP-completeness.
Unit 5 Operating System: functions, structures, types of OS; processes (states, scheduling, synchronization, deadlock handling); memory management (paging, segmentation, virtual memory);
 file system (organization, allocation, directories, I/O); protection, security, recovery.
Unit 6 DBMS: DBMS vs file system, 3-level architecture; relational model (keys, ER model, schema); normalization (1NF-BCNF); transactions, concurrency control, locking, 2-phase commit.
Unit 7 Computer Networks: topologies, models (OSI, TCP/IP); data transmission, encoding, compression, impairments; data link layer (framing, flow & error control);
 network layer (routing, congestion control, IPv4, ARP); transport & application layers (UDP, TCP, HTTP, FTP, SMTP).
Unit 8 Software Engineering: characteristics & models (waterfall, spiral, prototype); project estimation (LOC, FP, COCOMO); SRS documentation, structured & object-oriented design;
 testing (unit, system, black-box, white-box); software quality & maintenance.
Unit 9 OOP: classes, objects, encapsulation, inheritance, polymorphism; constructors, destructors, abstract classes & methods; exception handling.
Unit 10 Web-Based Application Development: internet basics, HTML, CSS, JavaScript, jQuery; Node.js, Git, PHP, MySQL integration; DOM, XML, sessions, HTTP forms.
Unit 11 Theory of Computation: DFA, NFA, regular expressions, minimization of FA; CFG, CNF, GNF, PDA; Turing machines, recursive languages, halting problem.
Unit 12 IoT: architecture, middleware, protocols (Zigbee, Modbus, RFID); cloud & mobile computing in IoT; IIoT (industrial IoT), security & privacy.
Unit 13 Artificial Intelligence: problem solving, search strategies (DFS, BFS, hill climbing); knowledge representation (predicate logic, frames, rules);
 inference (forward & backward chaining, Bayesian networks); planning, machine learning, expert systems.
Unit 14 E-Commerce: framework & applications; internet as infrastructure, firewalls, network security; payment systems (smart cards, credit cards, digital tokens);
 EDI, digital libraries, corporate data warehouses.
Unit 15 Multimedia: basics (hardware, software, applications); audio (MP3, MIDI), graphics, text, animation, video; multimedia project design, tools, future trends.

A shorter summary also supplied earlier adds: COA "micro-operations"; Programming Languages "C, C++, Java, Python fundamentals, control flow, functions, arrays, pointers, structures, file handling";
Emerging "Cyber Security basics"; Web "web application structures". Cover these too.

Not in the syllabus but still asked in the real 2023/2025 papers (so KEEP existing notes/questions, but don't spend replacement slots on them): compiler design, IEEE-754 details, deep 8085/8086/8051 programming.

## Step 1 – Audit (do it properly, don't guess)
For each topic in your cluster:
1. List the existing note chapters: `grep -n "^## " D:\stet\app\content\<id>*.md`. Skim the chapters relevant to each syllabus line.
2. Check MCQ coverage: print index + `sub` + first ~80 chars of every `q` in your pool(s) with a small node script and tally which syllabus lines are thin or missing.
3. Decide the gaps: every syllabus line must be covered by (a) a clear note section and (b) MCQs spread across the 20 mocks (core lines several; minor lines at least 2-3).

## Step 2 – Fix the NOTES
- Add new chapters / extend thin ones. Keep: exactly one `# Title` line (first part only), chapters as `## `, and `## Quick Revision Sheet` still the LAST chapter of the LAST part file.
  Insert new chapters directly BEFORE the `## Quick Revision Sheet` heading (or add `###` sections inside existing chapters) and append the new key facts to the Quick Revision Sheet.
  Edit the existing `<id>.partN.md` files in place; do not create files with other names. GFM tables need a blank line before the header row. Close all code fences.
  Same style as existing notes: dense bullets, tables, worked examples, code blocks, `**⚡ Exam tip:** ...` closing each chapter. Plain text math, no LaTeX/HTML/images.
- If a syllabus line is already well covered, leave it alone — don't pad.

## Step 3 – Fix the MCQs (counts must NOT change)
- Each pool must keep EXACTLY the same number of questions (mock m gets items [(m-1)k, mk)). New syllabus questions REPLACE existing items **in place** (same file, same index).
- Choose items to replace: (1) near-duplicates / the 3rd-4th question on an over-represented sub-topic, (2) low-value trivia, (3) off-syllabus items — in that order, without erasing past-paper-style coverage.
  Typical replacement volume: 10-25% of a pool, more only if the gap is big.
- Spread new questions over all 20 mock blocks (each block of k consecutive items should get some), prioritising missing syllabus lines first.
- Mark EVERY new/replaced item with an extra field `"v": 2` (do NOT add `v` to untouched items). Format: {"q","options"[4],"answer"(0-3),"exp","sub","v":2}.
  Quality rules as in D:\stet\questionbank\BRIEF.md: one unambiguous correct answer, plausible distractors, verified key (compute numeric/code answers with node; hand-trace C/C++/Java twice — gcc/javac are not installed),
  balanced answer positions, no duplicate of any question in ANY pool.
- Validate: `cd D:\stet\app && node scripts/build-tests.mjs` must print "Built 20 mocks, 3000 questions." with no PROBLEMS caused by your pools; `node scripts/check-content.mjs` must show `ok` for your topics.
  (Other agents are editing other pools at the same time — only fix problems in your own files; ignore transient problems in others.)

## Final reply (one short paragraph)
Per topic: gaps found, chapters/sections added (names), number of MCQs replaced (+ the `sub` labels), anything you could not verify. Do not paste content.
