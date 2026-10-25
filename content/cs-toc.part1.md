# Theory of Computation & Compiler Design

> **What the exam asks:** about 3-5 questions per paper. Favourites: DFA/NFA basics, NFA→DFA state count (2^n), regular-expression strings, Chomsky hierarchy (type 0-3 and machines), closure properties, Turing machine variants and halting, decidable/undecidable, ambiguity, PDA vs DPDA, then compiler phases, lexer vs parser, FIRST/FOLLOW, LL/LR hierarchy, 3-address code, optimization, assembler/linker/loader, interpreter vs compiler.

## 1. Basics: Alphabets, Strings, Languages

- **Alphabet (Σ):** finite, non-empty set of symbols. Σ = {0,1}, Σ = {a,b}.
- **String (word):** finite sequence of symbols from Σ. **|w|** = length. **ε** (epsilon) = empty string, |ε| = 0.
- **Σ\*** = set of all strings over Σ including ε (infinite, countable). **Σ⁺** = Σ\* − {ε}.
- Number of strings of length n over Σ = |Σ|ⁿ. Strings of length ≤ n over binary = 2^(n+1) − 1.
- **Language:** any subset of Σ\*. ∅ (empty language, no strings) ≠ {ε} (language with one string, the empty string).
- **Concatenation:** xy; εw = wε = w. **Reversal:** wᴿ. **Substring / prefix / suffix:** a string of length n has n+1 prefixes (including ε and itself); at most n(n+1)/2 + 1 distinct substrings (counting ε).
- **Kleene star** L\* = L⁰ ∪ L¹ ∪ L² ...; **positive closure** L⁺ = L¹ ∪ L² ...; ε ∈ L\* always; ε ∈ L⁺ only if ε ∈ L.
- Language operations: union, intersection, concatenation, complement (Σ\* − L), reversal, star, difference.
- Power of Σ: Σ⁰ = {ε}, Σ¹ = Σ.
- Countability: Σ\* is countably infinite; the set of all languages (2^(Σ\*)) is uncountable. So there are languages that no Turing machine accepts (TMs are countable).

### Alan Turing and the "algorithm = TM" idea
- **Church-Turing thesis:** anything that is effectively computable (by an algorithm) can be computed by a Turing machine. A thesis, not a theorem (cannot be proved).
- Turing machine models a general-purpose computer ("a Turing machine as a general-purpose computer system"; universal TM = stored-program computer).

### Automaton ↔ language class (core table)

| Language class | Grammar type | Machine |
|---|---|---|
| Regular | Type 3 | DFA / NFA / ε-NFA |
| Context-free (CFL) | Type 2 | NPDA |
| Context-sensitive (CSL) | Type 1 | Linear-bounded automaton (LBA) |
| Recursively enumerable (RE) | Type 0 | Turing machine |

**⚡ Exam tip:** ∅ vs {ε}: L = ∅ means no string; L = {ε} has exactly one string of length 0. Also L∅ = ∅ but L{ε} = L.

## 2. Finite Automata: DFA, NFA, ε-NFA

### DFA definition
A **DFA** is a 5-tuple **M = (Q, Σ, δ, q₀, F)**:
- Q finite set of states; Σ input alphabet; **δ: Q × Σ → Q** (exactly one next state, total function); q₀ ∈ Q start state; F ⊆ Q final (accepting) states.
- Accepted language L(M) = {w | δ\*(q₀, w) ∈ F}. A language for which a DFA exists is a **regular language**.
- A DFA has no memory except its current state (finite memory); it cannot count unboundedly. So it **cannot** recognise palindromes, aⁿbⁿ, balanced parentheses, wwᴿ, primes etc. "Can a DFA recognise a palindrome?" → **No** (palindromes are context-free, need a stack).

### NFA and ε-NFA
- **NFA:** δ: Q × Σ → **2^Q** (set of states, possibly empty). Several or zero moves per input symbol.
- **ε-NFA:** δ: Q × (Σ ∪ {ε}) → 2^Q; moves on empty input allowed.
- DFA ≡ NFA ≡ ε-NFA in power (all accept exactly regular languages). NFA is only more concise.
- **ε-closure(q):** all states reachable from q via ε moves only (includes q).
- Every DFA is a special NFA. NFA acceptance: some path leads to final state.

### NFA → DFA (subset construction)
1. Start state of DFA = {q₀} (or ε-closure(q₀)).
2. For each DFA state S (a set of NFA states) and symbol a: δ'(S, a) = ∪ δ(q, a) over q ∈ S (then ε-closure).
3. A DFA state is final if it contains any NFA final state.
4. Add new states until none appear. Empty set ∅ acts as the dead (trap) state.

- **Upper bound: an NFA with n states gives a DFA with at most 2ⁿ states** (|2^Q|). This bound is attained in worst case.
- Trap: "NFA of 5 states **excluding** the initial state" means total 6 states → at most 2⁶ = **64** DFA states.
- An ε-NFA with n states also gives a DFA with at most 2ⁿ states.

**Worked example.** NFA for "ends with ab": q0 --a--> {q0,q1}, q0 --b--> {q0}, q1 --b--> {q2}, q2 final.
DFA: A={q0}; A --a--> B={q0,q1}; A --b--> A; B --a--> B; B --b--> C={q0,q2} (final); C --a--> B; C --b--> A.
Only 3 DFA states are reachable out of the 2³ = 8 possible subsets.

### Standard small DFAs (frequently asked)

| Language | Min. DFA states (including dead state if needed) |
|---|---|
| Strings of {a,b} ending with "ab" | 3 |
| Strings with exactly 2 a's | 4 (counts 0,1,2 + dead for >2) |
| Strings with at least 2 a's | 3 |
| Strings with an even number of a's | 2 |
| Length divisible by n (over any Σ) | n |
| Strings of length at least n | n+1 |
| Binary numbers divisible by k | k (remainders 0..k−1) |
| Strings containing substring of length m (e.g. "aba") | m+1 |
| Single word "automata" (8 letters), exact match | 9 live states + 1 dead = 10 (without dead: 9) |
| Strings of length exactly n | n+2 (with dead) |

- **Divisible by 3 (binary):** states = remainders {0, 1, 2}; transition: r → (2r + bit) mod 3; start & final state = 0. "All possible remainders" = 0, 1, 2.
- Exact single word of length n: n+1 states without trap, n+2 with trap. Check the question wording ("states required to recognise the word" usually counts n+2 when DFA must be complete, but many keys use n+1; read options).

### Minimization of DFA (table-filling / Myhill-Nerode)
1. Remove unreachable states.
2. Mark every pair (p, q) where one is final and the other is not (distinguishable by ε).
3. Repeatedly mark (p,q) if for some symbol a, (δ(p,a), δ(q,a)) already marked.
4. Unmarked pairs are equivalent; merge them.
- Minimal DFA is **unique** (up to renaming of states) for a regular language.
- **Myhill-Nerode theorem:** L regular ⇔ finitely many equivalence classes of ≈_L. Number of classes = number of states in minimal DFA.
- Equivalence of two DFAs: minimise both and compare, or test the product automaton.
- Complement of DFA: swap final/non-final states (DFA must be complete). Does NOT work directly for NFA.

### Moore and Mealy machines (FA with output)

| | Moore | Mealy |
|---|---|---|
| Output depends on | current state only | current state **and** current input |
| Output on transitions/states | states | transitions |
| Output length for input length n | **n + 1** (includes initial output) | **n** |
| States needed | usually more | usually fewer |
- Both are equivalent in power; any Moore machine can be converted to Mealy and vice versa (Moore→Mealy: same state count; Mealy→Moore: may increase states, up to |Q|·|Δ|).
- Neither has final states. Used as sequential circuit models (1's/2's complement, adders, sequence detectors).

**⚡ Exam tip:** Bound for NFA→DFA is **2ⁿ** (not n², not 2n). Moore output has one extra symbol (n+1) while Mealy gives exactly n.

## 3. Regular Expressions, Identities, Arden's Theorem

### Regular expression (RE) definition
Primitives: ∅ (empty language), ε ({ε}), a ∈ Σ. Operations: union **R+S** (or R|S), concatenation **RS**, star **R\***. Precedence: **star > concatenation > union**.
- Regular languages = languages denoted by REs = languages accepted by FA = generated by regular grammars.
- Kleene's theorem: RE ⇔ FA.

### Common REs over {a,b}

| Language | RE |
|---|---|
| All strings | (a+b)\* |
| Starts with a | a(a+b)\* |
| Ends with b | (a+b)\*b |
| Starts with b and ends with bba | b(a+b)\*bba (standard answer; strictly "bba" itself also qualifies) |
| Contains "ab" | (a+b)\*ab(a+b)\* |
| Even length | ((a+b)(a+b))\* |
| Odd length | (a+b)((a+b)(a+b))\* |
| Exactly one a | b\*ab\* |
| Even number of a's | b\*(ab\*ab\*)\* |
| No two consecutive a's | (b+ab)\*(a+ε) |
| Starts and ends with same symbol | a(a+b)\*a + b(a+b)\*b + a + b |
| a's followed by b's | a\*b\* |

### Algebraic identities (high frequency)
```
∅ + R = R + ∅ = R          ε R = R ε = R
∅ R = R ∅ = ∅              R + R = R
R + S = S + R              (R S) T = R (S T)
R(S + T) = RS + RT         (R + S)T = RT + ST
ε* = ε                      ∅* = ε
(R*)* = R*                  R* R* = R*
R R* = R* R = R⁺            R* = ε + R R*  = ε + R⁺
(R + ε)* = R*               (R* + S*)* = (R + S)* = (R*S*)* = (R*+S)*
(R + ε)⁺ = R*               R(SR)* = (RS)*R
(RS)*R = R(SR)*             (P + Q)* = (P* Q*)*
```
Note: RS ≠ SR in general; (R+S)\* ≠ R\* + S\*.

### Arden's theorem
If P and Q are REs over Σ and **P does not contain ε**, then the equation **R = Q + RP** has the unique solution **R = QP\***.
- Used to convert a DFA/NFA to a regular expression (state-equation method):
  1. Write an equation for each state: q_i = (sum of q_j·symbol incoming) (+ ε for the start state).
  2. Eliminate by substitution; apply Arden to self-loops.
  3. The RE = union of expressions for the final states.
- Condition: **no ε-transition in the machine** (P without ε).

**Worked example.** DFA: q1 start, q1 --a--> q2, q1 --b--> q1, q2 --a--> q2, q2 --b--> q1, final q2.
q1 = ε + q1·b + q2·b ; q2 = q1·a + q2·a.
Arden on q2: q2 = q1 a a\*. Substitute: q1 = ε + q1 b + q1 a a\* b = ε + q1 (b + a a\* b) → q1 = (b + aa\*b)\*. So q2 = (b + aa\*b)\* a a\*.
(Language: strings ending with a.)

### Other conversions
- RE → ε-NFA: **Thompson's construction**. Gives at most 2·|r| states (|r| = number of symbols+operators); exactly one start and one final state.
- DFA → RE: state elimination or Arden's.
- Regular grammar ↔ FA: right-linear A → aB, A → a ↔ transitions.
- Decision problems for regular languages (all decidable): membership, emptiness, finiteness, equivalence, containment.

**⚡ Exam tip:** Arden: R = Q + RP ⇒ R = QP\*, valid only if ε ∉ P. And (a+b)\* = (a\*b\*)\* = (a\*+b)\* — identity questions pick these.

## 4. Closure Properties and Pumping Lemmas

### Pumping lemma for regular languages
If L is regular, ∃ a constant p (pumping length, ≤ number of DFA states) such that every w ∈ L with |w| ≥ p can be split **w = xyz** with:
1. |y| > 0 ; 2. |xy| ≤ p ; 3. xyⁱz ∈ L for all i ≥ 0.
- Used only to **prove non-regularity** (proof by contradiction). It cannot prove a language is regular (necessary, not sufficient).
- Not regular: {aⁿbⁿ}, {ww}, {wwᴿ}, {aⁿ² }, {a^(2ⁿ)}, {a^p : p prime}, {aⁿbᵐ : n>m}, balanced parentheses, {0ⁿ1ⁿ}, strings with equal number of a's and b's.
- Regular: {aⁿbᵐ : n,m ≥ 0} = a\*b\*, strings with even number of a's, {w : |w| divisible by 3}, any finite language.
- Any finite language is regular. If the DFA has k states and accepts a string of length ≥ k, language is infinite; L(M) infinite ⇔ accepts a string with k ≤ |w| < 2k.

### Pumping lemma for CFLs (Bar-Hillel)
If L is context-free, ∃ p such that every z ∈ L, |z| ≥ p, can be written **z = uvwxy** with:
1. |vwx| ≤ p ; 2. |vx| ≥ 1 ; 3. uvⁱwxⁱy ∈ L for all i ≥ 0.
- Proves non-CFL: {aⁿbⁿcⁿ}, {ww}, {aⁿbᵐcⁿdᵐ}, {a^(n²)}, {aⁱbʲcᵏ : i<j<k}.
- CFL (not regular): {aⁿbⁿ}, {wwᴿ}, palindromes, {aⁿbᵐ : n ≠ m}, balanced parentheses.
- {aⁿbⁿcⁿ} is context-sensitive (not CF). {ww} is CSL but not CFL.

### Closure properties tables
(Y = closed, N = not closed)

| Operation | Regular | DCFL | CFL | CSL | Recursive (decidable) | RE |
|---|---|---|---|---|---|---|
| Union | Y | N | Y | Y | Y | Y |
| Intersection | Y | N | **N** | Y | Y | Y |
| Complement | Y | **Y** | **N** | **Y** | Y | **N** |
| Concatenation | Y | N | Y | Y | Y | Y |
| Kleene star | Y | N | Y | Y | Y | Y |
| Reversal | Y | N | Y | Y | Y | Y |
| Difference | Y | N | N | Y | Y | N |
| Intersection with regular | Y | Y | **Y** | Y | Y | Y |
| Homomorphism | Y | N | Y | N | N | Y |
| Inverse homomorphism | Y | Y | Y | Y | Y | Y |
| Substitution | Y | N | Y | N | N | Y |

Key memory points:
- Regular: closed under **everything** common.
- CFL: closed under **union, concatenation, star, reversal, homomorphism, intersection with regular**; NOT under intersection, complement, difference.
- DCFL: closed under complement and intersection with regular; not under union, intersection.
- CSL: closed under complement (Immerman-Szelepcsényi theorem, 1987).
- Recursive: closed under complement, union, intersection, concatenation, star; RE: not closed under complement (and set difference).
- If L and its complement are both RE, then L is recursive.

**⚡ Exam tip:** CFL ∩ regular = CFL, but CFL ∩ CFL need not be CFL (e.g., {aⁿbⁿcᵐ} ∩ {aᵐbⁿcⁿ} = {aⁿbⁿcⁿ}). RE is closed under union and intersection but not complement.

## 5. Grammars, Chomsky Hierarchy, CFGs

### Grammar
**G = (V, T, P, S)**: variables (non-terminals), terminals, productions, start symbol. Language L(G) = {w ∈ T\* | S ⇒\* w}.

### Chomsky hierarchy

| Type | Name | Production form | Machine | Language | Closed under complement? |
|---|---|---|---|---|---|
| 0 | Unrestricted / phrase structure | α → β, α ≠ ε contains a variable | Turing machine | RE | No |
| 1 | Context-sensitive | α → β with **|α| ≤ |β|** (noncontracting) | Linear bounded automaton | CSL | Yes |
| 2 | Context-free | **A → α** (single variable on LHS) | PDA (nondeterministic) | CFL | No |
| 3 | Regular | A → aB or A → a (right linear) or A → Ba, A → a (left linear) | FA | Regular | Yes |
- Proper inclusion: **Regular ⊂ CFL ⊂ CSL ⊂ Recursive ⊂ RE** (Type 3 ⊂ 2 ⊂ 1 ⊂ 0). The recursive class lies between type 1 and type 0.
- A grammar mixing left- and right-linear productions is **not** necessarily regular (it is linear CFG).
- Regular grammar with only right-linear or only left-linear rules.

### Derivations and parse trees
- **Leftmost derivation:** always expand the leftmost variable; **rightmost:** the rightmost variable.
- **Parse (derivation) tree:** root = start symbol; internal nodes = variables; leaves = terminals/ε; yield (leaves left to right) = derived string. Each parse tree has a unique leftmost and a unique rightmost derivation.
- Sentential form: any string of variables/terminals derivable from S; sentence: only terminals.
- Example: S → aSb | ε generates aⁿbⁿ (n ≥ 0). S → aSa | bSb | a | b | ε generates palindromes over {a,b}.

### Ambiguity
- A CFG is **ambiguous** if some string has **two or more distinct parse trees** (equivalently two leftmost or two rightmost derivations).
- Example: E → E+E | E\*E | id is ambiguous (id+id\*id). Fix by precedence layering: E → E+T | T, T → T\*F | F, F → (E) | id.
- Ambiguity is a property of the **grammar**; a language is **inherently ambiguous** if every CFG for it is ambiguous (e.g., {aⁱbʲcᵏ | i=j or j=k}).
- **Ambiguity of an arbitrary CFG is undecidable.** Every regular language has an unambiguous grammar. Left recursion causes problems for top-down parsers; ambiguity is also a problem.

### Simplification of CFG
Order: **(1) remove ε-productions, (2) remove unit productions (A → B), (3) remove useless symbols** (non-generating, then unreachable).

### Normal forms
- **Chomsky Normal Form (CNF):** every production is **A → BC** or **A → a**. A derivation of string of length n takes exactly **2n − 1** steps; parse tree is binary. Every CFL without ε has a CNF grammar.
- **Greibach Normal Form (GNF):** every production is **A → aα** (terminal followed by zero or more variables). Derivation of string of length n takes exactly **n** steps. Useful for PDA construction (no ε moves, no left recursion).
- Conversion to GNF requires removing left recursion first.

### Decision problems for CFLs
- Decidable: membership (CYK algorithm, O(n³) for CNF), emptiness, finiteness.
- **Undecidable:** equivalence of two CFGs, ambiguity, whether L(G) = Σ\*, intersection of two CFLs being empty, whether CFG generates a regular language/ is a DCFL.

**⚡ Exam tip:** CNF → 2n−1 steps; GNF → n steps; CYK is O(n³). Type 1 ⇒ |LHS| ≤ |RHS|. Intersection of two CFLs is **not** necessarily CFL.
