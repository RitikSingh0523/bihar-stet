
## 8. Compiler Design: Phases and Lexical Analysis

### Language processors
- **Compiler:** translates the whole source program to target (machine/assembly) code before execution; reports all errors after analysis.
- **Interpreter:** translates and executes statement by statement; no separate object file.
- **Assembler:** assembly → machine code. **Preprocessor:** expands macros, includes. **Cross-compiler:** runs on one machine, generates code for another. **Transpiler:** source-to-source. **Bootstrapping:** compiler written in its own language (T-diagrams).

| Feature | Compiler | Interpreter |
|---|---|---|
| Translation unit | whole program | one statement at a time |
| Execution speed | **faster** (translated once) | slower (translation repeated, e.g. in loops) |
| Memory | object code stored (more) | less memory, no object file |
| Error reporting | all errors after compile | stops at first error, line-by-line |
| Examples | C, C++, Java (to bytecode), Go | Python, JavaScript, BASIC, Ruby, Perl |
| Debugging | harder | easier |
- Java: compiled to bytecode, then interpreted/JIT by the JVM (hybrid).

### Phases of a compiler
```
Source program
  → Lexical Analysis   (scanner)         → tokens
  → Syntax Analysis    (parser)          → parse / syntax tree
  → Semantic Analysis  (type checking)   → annotated tree
  → Intermediate Code Generation         → 3-address code
  → Code Optimization  (machine-independent)
  → Code Generation                      → target code
  → Target code optimization (machine-dependent, peephole)
Symbol table manager and Error handler interact with ALL phases.
```
- **Analysis (front end):** lexical, syntax, semantic (machine independent) + intermediate code generation. **Synthesis (back end):** code optimization, code generation (machine dependent).
- **Pass:** one reading of the source/intermediate form. Single-pass compilers are faster; multi-pass allow better optimization. A **phase** is a logical step; several phases can be grouped in one pass.
- **Front end/back end split:** N languages + M machines need N front ends + M back ends (not N×M compilers) through a common intermediate representation (UNCOL idea).
- Errors: lexical (illegal character, malformed number/identifier), syntax (missing semicolon, unbalanced parentheses), semantic (type mismatch, undeclared variable, wrong argument count), logical (not detected).
- Example: `a = b + c * 60` → tokens `id1 = id2 + id3 * 60` → tree → `t1 = c * 60; t2 = b + t1; a = t2`.

### Lexical analysis
- Reads characters, groups them into **tokens**; removes whitespace and comments; tracks line numbers; interacts with symbol table; reports lexical errors. First phase.
- **Token:** a (name, attribute) pair: identifier, keyword, operator, constant, literal, punctuation. **Lexeme:** actual character sequence matching a token (e.g., `count`, `3.14`). **Pattern:** rule describing the lexemes of a token (a regular expression).
- Example: `printf("Total = %d\n", score);` — lexemes `printf`, `(`, `"Total = %d\n"`, `,`, `score`, `)`, `;`  → 7 tokens (string is one token).
- Count tokens: `int a = b + 5;` → int, a, =, b, +, 5, ; = **7 tokens**.
- Tokens are specified by **regular expressions**; recognised by **finite automata** (DFA); the tool **Lex/Flex** generates a lexer from REs. **Yacc/Bison** generates LALR parser.
- **Longest match** rule and priority to earlier rule (keywords before identifiers) resolve ambiguity.
- Input buffering: **two-buffer scheme with sentinels (eof)**; pointers lexemeBegin and forward.
- Lexical analysis is separated from parsing for simplicity, efficiency and portability. Lexical analyser cannot detect balanced parentheses (needs a CFG, i.e. parser).

**⚡ Exam tip:** Token = category, lexeme = actual text, pattern = RE rule. Lexer uses regular languages (FA), parser uses CFG (PDA). Compiler converts the whole program; interpreter line by line.

## 9. Syntax Analysis (Parsing)

### Parser types
- **Top-down** (root → leaves; leftmost derivation): recursive descent, predictive (LL(1)). Needs **no left recursion** and **left factoring**.
- **Bottom-up** (leaves → root; reverse of rightmost derivation): shift-reduce, **operator-precedence, LR family**. More powerful.
- Parser input: token stream; output: parse tree. Parser also handles syntax error recovery (panic mode, phrase level, error productions, global correction).

### Eliminating left recursion and left factoring
```
Immediate left recursion:  A → Aα | β        becomes   A → βA'     A' → αA' | ε
Left factoring:            A → αβ₁ | αβ₂      becomes   A → αA'     A' → β₁ | β₂
```
- Left recursion makes a top-down parser loop forever. Left factoring removes common prefixes to avoid backtracking.

### FIRST and FOLLOW
- **FIRST(α):** set of terminals that begin strings derived from α (ε ∈ FIRST if α ⇒\* ε).
- **FOLLOW(A):** set of terminals that can appear immediately to the right of A in some sentential form; **$** ∈ FOLLOW(start). FOLLOW never contains ε.
- Rules: FIRST(terminal) = {terminal}. For A → X₁X₂…: add FIRST(X₁)−ε; if X₁ nullable continue to X₂…; add ε if all nullable.
- FOLLOW: for A → αBβ add FIRST(β)−ε to FOLLOW(B); if β nullable (or empty) add FOLLOW(A) to FOLLOW(B).

**Worked example** (standard expression grammar after removing left recursion):
```
E  → T E'
E' → + T E' | ε
T  → F T'
T' → * F T' | ε
F  → ( E ) | id

FIRST(E)=FIRST(T)=FIRST(F) = { (, id }
FIRST(E') = { +, ε }        FIRST(T') = { *, ε }

FOLLOW(E)  = { $, ) }       FOLLOW(E') = { $, ) }
FOLLOW(T)  = { +, $, ) }    FOLLOW(T') = { +, $, ) }
FOLLOW(F)  = { *, +, $, ) }
```
Derivation: FOLLOW(E) gets `)` from F → (E), and `$` as start. E → TE' gives FOLLOW(T) ⊇ FIRST(E')−ε = {+} and, since E' nullable, FOLLOW(E). T → FT' gives FOLLOW(F) ⊇ {*} and FOLLOW(T) (T' nullable).

### LL(1) parsing
- **LL(1):** scan Left-to-right, produce **Leftmost** derivation, **1** lookahead symbol. Table-driven predictive parser using a stack and parsing table M[A, a].
- Table construction: for each A → α: put the production in M[A, a] for every a ∈ FIRST(α); if ε ∈ FIRST(α), put it in M[A, b] for every b ∈ FOLLOW(A).
- Example entries above: M[E, id] = E → TE'; M[E', +] = E' → +TE'; M[E', )] = M[E', $] = E' → ε; M[T', *] = T' → \*FT'.
- Grammar is **LL(1)** iff the table has no multiply-defined entry; equivalently, for A → α | β: FIRST(α) ∩ FIRST(β) = ∅, and if β ⇒\* ε then FIRST(α) ∩ FOLLOW(A) = ∅.
- A grammar that is **left-recursive, ambiguous or not left-factored is not LL(1)**. Every LL(1) grammar is unambiguous. LL(1) ⊂ LR(1).

### Bottom-up: shift-reduce and LR parsing
- Actions: **shift** (push next input), **reduce** (replace handle on stack by LHS), **accept**, **error**. A **handle** is the substring matching RHS of a production whose reduction is a step of the reverse rightmost derivation. **Handle pruning.**
- **Conflicts:** shift-reduce, reduce-reduce.
- **LR(k):** Left-to-right scan, **R**ightmost derivation in reverse, k lookahead. Uses stack of states, ACTION and GOTO tables; the parser is deterministic and handles all DCFLs.
- **Operator-precedence parser:** for operator grammars (no ε-RHS, no two adjacent non-terminals); a simple shift-reduce method.

### LR parser family

| Parser | Lookahead used for reduce | Items | Number of states |
|---|---|---|---|
| **LR(0)** | none | LR(0) items | fewest |
| **SLR(1)** | FOLLOW(A) | LR(0) items | same as LR(0) |
| **LALR(1)** | merged LR(1) lookaheads | LR(1) items with merged cores | same as SLR/LR(0) |
| **CLR(1) = LR(1)** (canonical) | exact lookahead per item | LR(1) items | **most** |
- **Power:** LR(0) < SLR(1) < LALR(1) < CLR(1)  (set of grammars they handle). All accept DCFL when a suitable grammar is chosen.
- **State count:** LR(0) = SLR = LALR ≤ CLR. CLR tables are the largest.
- LALR can introduce **reduce-reduce** conflicts when merging states, but never new shift-reduce conflicts. **YACC/Bison use LALR(1).**
- **Augmented grammar:** add S' → S to mark acceptance; **closure** and **goto** operations build the canonical collection.
- LR(0) item: A → α·β (dot shows how much is parsed); **kernel** vs non-kernel items.
- LL(k) vs LR(k): LR parsers handle a **larger class of grammars** than LL; left recursion is fine for LR, not LL.
- Top-down: recursive descent with backtracking can be exponential; **predictive** parsers need no backtracking.

**⚡ Exam tip:** Hierarchy LR(0) ⊂ SLR ⊂ LALR ⊂ CLR. CLR has the most states; SLR/LALR/LR(0) have the same number. Left recursion kills LL but not LR. FOLLOW is used for LL(1) ε-entries and for SLR reduce moves.

## 10. Syntax-Directed Translation, Symbol Table, Intermediate Code

### Syntax-directed definitions (SDD) and translation (SDT)
- **SDD:** CFG + **attributes** attached to grammar symbols + **semantic rules** attached to productions. **SDT scheme:** semantic actions embedded in production bodies (order of evaluation explicit).
- **Synthesized attribute:** value computed from children (and own attributes) — bottom-up; e.g. `E.val = E1.val + T.val`.
- **Inherited attribute:** value computed from parent and/or siblings — top-down; e.g. type of identifiers in a declaration list `int a, b, c`.
- **S-attributed definition:** only synthesized attributes → evaluated bottom-up (natural for LR parsing).
- **L-attributed definition:** each inherited attribute depends on parent or left siblings (so evaluable in one left-to-right depth-first pass) — fits LL parsing. Every S-attributed definition is also L-attributed.
- **Annotated parse tree:** parse tree showing attribute values. **Dependency graph** must be acyclic to give valid evaluation order (topological sort).
- Uses: type checking, building syntax trees, generating intermediate code, evaluating expressions.

### Syntax tree vs DAG vs parse tree
- Parse tree: shows all grammar symbols/derivation; syntax tree: operators as nodes, operands as children (abstract); **DAG** shares common sub-expressions (a+a\*(b−c)+(b−c)\*d).

### Symbol table
- Data structure holding information about **identifiers**: name, type, scope, size/offset, storage class, number/types of parameters (functions), line of declaration.
- Created/used in lexical analysis (insert names), semantic analysis (type checks), code generation (addresses). Operations: **insert, lookup**, delete (at scope exit).
- Implementations: linear list, binary search tree, **hash table (most efficient, O(1) average)**. Scope handled by a stack of tables / chaining.
- Kept in memory across all phases; **error handler** also uses it.

### Intermediate code
- Machine-independent representation between front end and back end; eases retargeting and optimisation.
- Forms: **syntax tree / DAG, postfix (reverse Polish) notation, three-address code**, control-flow graph, bytecode (Java).
- **Three-address code (TAC):** each statement has at most **one operator on the right side** and at most three addresses: `x = y op z`. Temporaries are generated by the compiler.
```
a = b * -c + b * -c
t1 = minus c
t2 = b * t1
t3 = minus c
t4 = b * t3
t5 = t2 + t4
a  = t5
```
- Statement types: assignment `x = y op z`, unary `x = op y`, copy `x = y`, unconditional jump `goto L`, conditional jump `if x relop y goto L`, procedure call `param x; call p, n; return y`, indexed `x = y[i]`, address/pointer `x = &y; x = *y`.
- **Representations of TAC:**

| Representation | Description |
|---|---|
| **Quadruples** | 4 fields: (op, arg1, arg2, result); results are explicit temporaries; **easy to reorder** (good for optimisation) |
| **Triples** | 3 fields: (op, arg1, arg2); result referred to by **statement index**; saves temporaries but **hard to reorder** |
| **Indirect triples** | list of pointers to triples; allows reordering without changing triples |
- Quadruple for `t1 = minus c` is (minus, c, –, t1). Triple form needs no result field → fewer fields (3).
- **Postfix of** a+b\*c is `abc*+`; of (a+b)\*c is `ab+c*`; evaluated with a stack.
- **Basic block:** straight-line sequence with single entry (first instruction, a **leader**) and single exit. **Leaders:** first instruction; target of any jump; instruction right after a jump. **Flow graph:** nodes = basic blocks, edges = possible control flow. Blocks = number of leaders.

**⚡ Exam tip:** Quadruples: 4 fields, explicit temporary, reorder-friendly; triples: 3 fields, refer by position. Synthesized = children→parent (bottom-up); inherited = parent/siblings→child. S-attributed ⊂ L-attributed.

## 11. Code Optimization, Code Generation, Assemblers, Linkers, Loaders

### Code optimization (machine-independent unless noted)
Goals: reduce execution time/space without changing the program's meaning. Applied on intermediate code (some on target code).

| Technique | Idea / example |
|---|---|
| **Constant folding** | evaluate constants at compile time: `x = 2*3.14` → `x = 6.28` |
| **Constant propagation** | replace variable by its known constant value |
| **Common subexpression elimination** | reuse value of identical expression computed earlier |
| **Dead code elimination** | remove code whose result is never used / unreachable code |
| **Copy propagation** | after `x = y`, use y in place of x |
| **Strength reduction** | replace costly op by cheaper: `x*2` → `x+x` or `x<<1`; `x^2` → `x*x` |
| **Loop-invariant code motion** (code hoisting) | move computation unchanged across iterations out of the loop |
| **Loop unrolling** | replicate loop body to cut loop overhead |
| **Loop jamming (fusion)** | combine two loops with same range into one |
| **Induction variable elimination** | remove redundant loop variables |
| **Inlining** | replace call by function body |
| **Peephole optimisation** | examine a small window of target instructions: remove redundant load/store, jumps to jumps, algebraic identities (x+0, x\*1); **machine-dependent** |
- Optimisation levels: local (basic block), global (across blocks via data-flow analysis), inter-procedural.
- Data-flow analyses: **reaching definitions, live variable analysis, available expressions**.
- Optimisation must preserve semantics and be worth the effort (speed vs compile time). The phase before code generation.

### Code generation
- Input: intermediate code + symbol table; output: target machine/assembly code (absolute, relocatable, or assembly).
- Issues: **instruction selection, register allocation and assignment, instruction ordering (evaluation order)**, addressing modes.
- **Register allocation:** graph colouring (interference graph; k registers → k-colouring), usage counts. Spilling = storing register to memory when out of registers.
- Simple code generator uses **register descriptors** and **address descriptors**; **next-use information** from basic blocks.
- Target machine cost model: instruction cost = 1 + cost of addressing modes.

### Assemblers, linkers, loaders, macros

| Tool | Function |
|---|---|
| **Assembler** | converts assembly language to machine code (object code). **Two-pass:** pass 1 builds the **symbol table** (labels → addresses, location counter) ; pass 2 generates code using it. Handles pseudo-ops (START, END, DC, DS, EQU). A **one-pass** assembler needs back-patching for forward references. |
| **Macro processor** | expands macro calls (macro = named block of code with parameters). Parts: macro definition (MACRO ... MEND), macro call, macro expansion. Data structures: **MNT** (macro name table), **MDT** (macro definition table), **ALA** (argument list array). Macro expansion happens **before assembly** (pass 0 / pre-assembly). Macro vs subroutine: macro expands inline at each call (faster, larger code); subroutine is one copy with call/return (smaller, slower). |
| **Linker** | combines object modules + libraries into one executable; resolves **external references** and relocates addresses. **Static linking** (at build time), **dynamic linking** (at load/run time; DLL/.so). |
| **Loader** | places the executable into memory and starts execution. Functions: **allocation, linking, relocation, loading**. |
| **Link editor** | produces a relocatable load module; **linkage loader** does linking at load time. |
- Loader types: **absolute loader** (simplest, loads at fixed address specified in the object code, no relocation), **relocating loader** (e.g., BSS loader), **direct linking loader**, **bootstrap loader** (loads OS at power-up from ROM), dynamic loading.
- **Relocation:** adjusting addresses when a module is loaded at an address different from the assembled origin; uses relocation bits/table.
- Compile → assemble → link → load → execute: source → (compiler) → assembly → (assembler) → object code → (linker) → executable → (loader) → memory.

### Other system software facts
- **Cross assembler**, **debugger**, **editor**, **text editor**; **system software** = OS, compilers, assemblers, linkers, loaders, device drivers (supports application software).
- **Garbage collection**, run-time environment, **activation record** (return address, parameters, locals, temporaries, access/control links) managed on the **stack**; **static, stack, heap** storage allocation.
- Parameter passing: call by value, reference, copy-restore, name.

**⚡ Exam tip:** Assembler pass 1 = symbol table building; pass 2 = code generation. Loader = loads to memory; linker = resolves external references. Peephole = machine-dependent; constant folding/CSE = machine-independent. Macro expansion occurs before assembly.

## Quick Revision Sheet

1. Σ\* is countably infinite; L = ∅ ≠ {ε}. Number of binary strings of length n = 2ⁿ.
2. DFA = (Q, Σ, δ, q₀, F), δ: Q×Σ→Q; NFA: δ: Q×Σ→2^Q; ε-NFA adds ε moves. DFA ≡ NFA ≡ ε-NFA (regular).
3. NFA with n states → DFA with at most **2ⁿ** states (5 states + initial = 6 → 64).
4. DFA cannot recognise palindromes, aⁿbⁿ, primes (needs memory).
5. Binary divisible by 3: states = remainders {0,1,2}; transition r → (2r+bit) mod 3.
6. Moore: output on states (n+1 outputs); Mealy: output on transitions (n outputs); equivalent power.
7. RE precedence: star > concatenation > union. (a+b)\* = (a\*b\*)\* ; ∅\* = ε ; ε\* = ε.
8. Arden: R = Q + RP ⇒ R = QP\* when ε ∉ P.
9. Pumping lemma (regular): w = xyz, |y|>0, |xy|≤p, xyⁱz ∈ L. Only proves non-regularity.
10. Pumping lemma (CFL): z = uvwxy, |vwx|≤p, |vx|≥1, uvⁱwxⁱy ∈ L.
11. Regular closed under all (union, ∩, complement, concat, star, reverse); CFL not closed under ∩, complement; CSL, recursive closed under complement; RE not.
12. Chomsky: Type 3 regular/FA; Type 2 CFG/PDA; Type 1 CSG/LBA (|α|≤|β|); Type 0 TM/RE.
13. Regular ⊂ DCFL ⊂ CFL ⊂ CSL ⊂ Recursive ⊂ RE.
14. CNF: A→BC | a (2n−1 steps); GNF: A→aα (n steps); CYK O(n³). Simplify: ε-prod → unit → useless.
15. Ambiguity = two parse trees (or two leftmost derivations); undecidable for CFG.
16. NPDA > DPDA; NFA ≡ DFA; NTM ≡ DTM. PDA acceptance: final state ≡ empty stack (NPDA).
17. TM variants (multi-tape, multi-head, nondeterministic) add no power; UTM simulates any TM.
18. Halting problem undecidable but semi-decidable (RE). L recursive ⇔ L and L̄ both RE.
19. Rice: any non-trivial semantic property of L(M) is undecidable. Undecidable: PCP, CFG equivalence/ambiguity, E_TM, EQ_TM.
20. Compiler phases: lexical → syntax → semantic → intermediate code → optimisation → code generation; symbol table and error handler touch all.
21. Token = category; lexeme = actual string; pattern = RE. Lexer uses DFA (Lex), parser uses CFG (Yacc, LALR).
22. FOLLOW(start) contains $; FOLLOW never has ε; LL(1) table: use FIRST, plus FOLLOW for ε-productions.
23. Left recursion A→Aα|β becomes A→βA', A'→αA'|ε. LL(1) grammar cannot be left-recursive or ambiguous.
24. LR(0) ⊂ SLR(1) ⊂ LALR(1) ⊂ CLR(1); CLR has most states; LALR merging can give reduce-reduce conflicts.
25. Synthesized = bottom-up (S-attributed); inherited = from parent/siblings; S-attributed ⊂ L-attributed.
26. TAC: at most one operator on the right; quadruples (op, a1, a2, result), triples (op, a1, a2); indirect triples allow reordering.
27. Optimisations: constant folding, CSE, dead-code elimination, strength reduction, loop-invariant code motion, peephole (machine-dependent).
28. Assembler: pass 1 symbol table, pass 2 object code. Linker resolves references; loader loads (allocation, relocation, linking); macros use MNT/MDT/ALA.
29. Compiler translates whole program (faster run, all errors at once); interpreter line by line (slower, easier debugging).
