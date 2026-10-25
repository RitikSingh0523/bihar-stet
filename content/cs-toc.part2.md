
## 6. Pushdown Automata (PDA)

### Definition
**PDA = (Q, Σ, Γ, δ, q₀, Z₀, F)**: states, input alphabet, **stack alphabet Γ**, transition function, start state, initial stack symbol Z₀, final states.
- **δ: Q × (Σ ∪ {ε}) × Γ → finite subsets of Q × Γ\*** (NPDA). Move: read input (or ε), pop stack top, push a string.
- A PDA = ε-NFA + one stack (LIFO). Memory is unbounded but accessible only at the top.
- Mnemonics: FA = no memory, PDA = one stack, LBA = bounded tape, TM = unbounded tape.
- **Acceptance:** by **final state** or by **empty stack**; both modes are equivalent in power for NPDA (for DPDA, final-state acceptance is more powerful).
- Instantaneous description (ID): (state, remaining input, stack contents).

### DPDA vs NPDA

| Feature | DPDA | NPDA |
|---|---|---|
| Choice per move | at most one | many |
| Language class | **DCFL** (deterministic CFL) | all CFLs |
| Power | **strictly less** than NPDA | full CFL |
| Example accepted | {aⁿbⁿ}, {wcwᴿ}, balanced brackets | also {wwᴿ} (even palindromes) |
| Closed under complement | Yes | No |
| Equivalence | DPDA ⇄ NPDA **not** equivalent (unlike NFA ≡ DFA) | |
- Even palindromes {wwᴿ} need non-determinism (machine must guess the middle) → CFL but not DCFL. With a centre marker {wcwᴿ} → DCFL.
- DCFLs are parsed by LR(k) parsers (every DCFL has an LR(1) grammar); LL(k) languages ⊂ DCFL.
- Equivalence "NFA ≡ DFA", "NPDA ≢ DPDA", "NTM ≡ DTM" — a classic MCQ ("which pair is not equivalent?": NPDA vs DPDA).

### PDA examples
- aⁿbⁿ: push A for every a; pop A for every b; accept when stack returns to Z₀ (or empty).
- aⁿbᵐcⁿ⁺ᵐ / balanced parentheses: push on "(", pop on ")".
- **Cannot** be done by one stack: aⁿbⁿcⁿ, ww (need CSL/LBA/TM). Two stacks ≡ Turing machine.
- CFG ↔ PDA conversion: always possible (CFG → PDA by simulating leftmost derivations with the stack).
- A PDA with two stacks has the power of a Turing machine; a PDA with no stack is just an FA.

**⚡ Exam tip:** NPDA is more powerful than DPDA. NFA ≡ DFA, NTM ≡ DTM in power, but not NPDA ≡ DPDA. Stack alphabet is Γ; acceptance by empty stack ≡ final state for NPDA.

## 7. Turing Machines, Decidability, Reducibility

### Turing machine (TM)
**M = (Q, Σ, Γ, δ, q₀, B, F)**: Γ = tape alphabet (Σ ⊂ Γ), **B** (blank) ∈ Γ − Σ, **δ: Q × Γ → Q × Γ × {L, R}** (deterministic; write symbol, move head left/right), F = final (halting/accepting) states.
- Tape is infinite in one or both directions; read/write head moves left or right (or stays, in variants).
- **Halting states of a TM:** the accept (final) state and the reject state (no further transition defined). "Halting state" = state in which the machine stops; accepting halting is final state.
- A TM **accepts** w if it reaches a final state; **rejects** if it halts in a non-accepting state; may **loop forever**.
- **Recognises (accepts) → RE (recursively enumerable)**: halts and accepts for strings in L; may loop otherwise.
- **Decides → Recursive**: halts on every input (accept or reject). Recursive ⊂ RE.

### Variants (all equivalent in power to the basic TM)

| Variant | Note |
|---|---|
| Multi-tape TM | equivalent; simulation slows by quadratic factor |
| Multi-head TM | equivalent |
| Nondeterministic TM (NTM) | equivalent in computability (DTM simulates NTM, exponential slow down) |
| Two-way / bidirectional infinite tape | equivalent |
| Multi-dimensional tape | equivalent |
| Offline TM, TM with stay option | equivalent |
| Universal TM (UTM) | takes encoding ⟨M, w⟩ and simulates M on w; basis of stored-program computer |
| Linear bounded automaton (LBA) | restricted tape (proportional to input) → CSL |
| Semi-infinite tape TM | equivalent |
| PDA with two stacks | equivalent to a TM |
- "Extension to the basic model": multi-tape, multi-head, NTM — all valid; none adds computability power.
- A **Universal Turing Machine** accepts description of any TM and its input and simulates it (a "programmable" TM). It is **not** single/two-tape definitionally; it's a TM that simulates TMs.
- **Time/space:** P = problems decidable in polynomial time on DTM; NP = polynomial on NTM; P ⊆ NP; P = NP is open. NP-complete: SAT (Cook-Levin), 3-SAT, Clique, Vertex Cover, Hamiltonian Cycle, TSP (decision), Subset Sum, graph colouring (k ≥ 3).

### Decidable vs undecidable
**Decidable (recursive) problems** — an algorithm always halts with yes/no:
- Membership, emptiness, finiteness, equivalence for **regular** languages (and DFAs).
- Membership, emptiness, finiteness for **CFLs**.
- Membership for **CSLs**; emptiness of DFA/CFG; acceptance of a DFA (A_DFA), A_CFG, E_DFA, EQ_DFA.
- Whether a TM halts in k steps (bounded halting).

**Undecidable problems (list to memorise):**
- **Halting problem** (A_TM / HALT_TM): does TM M halt on input w? Undecidable (Turing, 1936) but **semi-decidable (RE)**; its complement is not RE.
- Acceptance problem A_TM, emptiness E_TM, equivalence EQ_TM, regularity of a TM language.
- **Post Correspondence Problem (PCP)**, modified PCP.
- Equivalence of two CFGs; ambiguity of a CFG; is L(CFG) = Σ\*; is the intersection of two CFLs empty.
- **Entscheidungsproblem** / validity in first-order logic (Church-Turing).
- State-entry problem, blank-tape halting problem, totality problem, **Hilbert's tenth problem** (solvability of Diophantine equations).
- Tiling problem; whether a TM ever writes a given symbol.
- Halting problem proof idea: **diagonalization / contradiction** (assume decider H, construct D that does the opposite of H on ⟨D⟩).

### Rice's theorem
**Every non-trivial semantic (behavioural) property of the language recognised by a TM is undecidable.**
- Non-trivial = holds for some RE languages but not for all. Property of the **language L(M)**, not of the machine's syntax/steps.
- Examples undecidable by Rice: "Is L(M) empty?", "Is L(M) regular?", "Is L(M) finite?", "Does M accept ε?", "Is L(M) context-free?", "Is L(M) = Σ\*?".
- Not covered by Rice (structural properties can be decidable): "Does M have at least 5 states?", "Does M halt within 100 steps?".

### Reducibility
- **Mapping reduction A ≤ₘ B:** a computable function f with w ∈ A ⇔ f(w) ∈ B.
- If A ≤ₘ B and **B is decidable**, then A is decidable. If A ≤ₘ B and **A is undecidable**, then B is undecidable (this is how undecidability is proven: reduce a known undecidable problem, e.g. HALT or A_TM, to a new one).
- If A ≤ₘ B and B is RE, A is RE; if A is not RE then B is not RE.
- For complexity, polynomial-time reductions ≤ₚ: if A ≤ₚ B and B ∈ P then A ∈ P; NP-complete problems reduce from SAT.
- **Post Correspondence Problem:** given pairs of strings (xᵢ, yᵢ), does there exist a sequence i₁...iₖ with xᵢ₁...xᵢₖ = yᵢ₁...yᵢₖ? Undecidable; used to prove many CFG-related undecidability results.

### Language class relations to remember

| Language class | Decidable? |
|---|---|
| Regular, CFL, CSL, Recursive | decidable (membership) |
| RE | semi-decidable (membership undecidable in general) |
| Non-RE | exists (e.g., complement of HALT) |
- Recursive = Decidable; RE = Turing-recognisable = semi-decidable. L is recursive ⇔ both L and its complement are RE.
- Chomsky hierarchy proper inclusions: Regular ⊂ DCFL ⊂ CFL ⊂ CSL ⊂ Recursive ⊂ RE.

**⚡ Exam tip:** Halting problem = undecidable but RE. TM variants (multi-tape, multi-head, nondeterministic) add no power; only "efficiency". Rice's theorem is about properties of the *language*, and applies only to non-trivial ones.
