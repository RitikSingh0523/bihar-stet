
## 5. Dynamic Programming

### 5.1 Principle
DP solves a problem by combining solutions of **overlapping subproblems**, storing each result (table / memoisation) so it is computed once. Applicable when the problem has:
1. **Optimal substructure** - an optimal solution contains optimal solutions of its subproblems.
2. **Overlapping subproblems** - the same subproblems recur (naive recursion is exponential, e.g. Fibonacci).

| | Divide & Conquer | Dynamic Programming | Greedy |
|---|---|---|---|
| Subproblems | independent | overlapping | one choice, then one subproblem |
| Strategy | top-down recursion | bottom-up table / memoisation | local best choice |
| Optimality | n/a | guaranteed (Principle of Optimality) | only if greedy-choice property holds |
| Examples | merge sort, quick sort | knapsack, LCS, matrix chain | Huffman, Kruskal |

- **Memoisation** = top-down + cache; **tabulation** = bottom-up.
- Fibonacci: naive Θ(2ⁿ) → DP Θ(n) time.

### 5.2 0/1 Knapsack
- B[i][w] = max value using first i items with capacity w:
  `B[i][w] = B[i−1][w]` if wᵢ > w, else `max(B[i−1][w], vᵢ + B[i−1][w − wᵢ])`.
- Time/space **Θ(nW)**: **pseudo-polynomial** (polynomial in the numeric value W, exponential in its bit-length). Problem is NP-complete.
- Worked: W = 7, items (w, v): (1,1), (3,4), (4,5), (5,7). Best combination: items 2+3 (3+4 = 7) → 4+5 = **9**; items 1+4 (weight 6) → 8. Answer **9**.
- Worked: W = 5, items (2,3), (3,4), (4,5), (5,6): items 1+2 (weight 5) → **7**.

### 5.3 Longest Common Subsequence (LCS)
- c[i][j] = c[i−1][j−1] + 1 if xᵢ = yⱼ; else max(c[i−1][j], c[i][j−1]). Row/column 0 are 0. Time/space **Θ(mn)**; length-only needs O(min(m, n)) space. Subsequence need not be contiguous (substring must be).
- Worked: X = ABCBDAB, Y = BDCABA (columns B D C A B A):

```
       ""  B  D  C  A  B  A
  ""    0  0  0  0  0  0  0
  A     0  0  0  0  1  1  1
  B     0  1  1  1  1  2  2
  C     0  1  1  2  2  2  2
  B     0  1  1  2  2  3  3
  D     0  1  2  2  2  3  3
  A     0  1  2  2  3  3  4
  B     0  1  2  2  3  4  4
```
LCS length = **4** (e.g. BCBA or BDAB).
- AGGTAB and GXTXAYB → LCS = GTAB, length **4**.
- Related: edit distance (Θ(mn)), longest increasing subsequence (O(n²) DP, O(n log n) improved).

### 5.4 Matrix-chain multiplication
- Multiplying p×q by q×r costs p·q·r scalar multiplications. Choose the parenthesisation with minimum cost. Matrices Aᵢ is p[i−1] × p[i].
- m[i][j] = min over i ≤ k < j of m[i][k] + m[k+1][j] + p[i−1]·p[k]·p[j]. Time **Θ(n³)**, space Θ(n²).
- Number of parenthesisations of n matrices = Catalan number C(n−1): n=3 → 2, n=4 → 5, n=5 → **14**.
- Worked 1: A(10×20), B(20×30), C(30×40). (AB)C = 10·20·30 + 10·30·40 = 6000 + 12000 = **18000**; A(BC) = 20·30·40 + 10·20·40 = 24000 + 8000 = 32000. Min = 18000.
- Worked 2: p = [5, 10, 3, 12, 5].
  m12 = 150, m23 = 360, m34 = 180.
  m13 = min(m23 + 5·10·12 = 960, m12 + 5·3·12 → 150 + 180 = 330) = 330.
  m24 = min(180 + 10·3·5 = 330, 360 + 10·12·5 = 960) = 330.
  m14 = min(k=1: 330 + 250 = 580; k=2: 150 + 180 + 75 = 405; k=3: 330 + 300 = 630) = **405**.

### 5.5 Multistage graph
- Vertices in stages; find the min-cost path from source (stage 1) to sink (stage k). Backward DP: cost(i, j) = min over edges (j, l) of c(j, l) + cost(i+1, l). Time O(V + E).
- Worked: S→{A, B}→{C, D}→T with S-A 2, S-B 3, A-C 4, A-D 1, B-C 2, B-D 5, C-T 3, D-T 6.
  cost(C) = 3, cost(D) = 6; cost(A) = min(4+3, 1+6) = 7; cost(B) = min(2+3, 5+6) = 5;
  cost(S) = min(2+7, 3+5) = **8** (S-B-C-T).

### 5.6 All-pairs shortest path: Floyd-Warshall
- d^(k)[i][j] = min(d^(k−1)[i][j], d^(k−1)[i][k] + d^(k−1)[k][j]); after iteration k, paths use only intermediate vertices from {1..k}.
- Time **Θ(V³)** (three nested loops), space Θ(V²). Handles negative edges, **not** negative cycles (detect via negative diagonal). Also gives transitive closure (Warshall).
- Worked: 1→2: 4, 1→3: 11, 2→1: 6, 2→3: 2, 3→1: 3. d[1][3] = min(11, d[1][2] + d[2][3] = 4+2 = 6) = **6**.
- Running Dijkstra from every vertex: O(V(V+E) log V). Johnson's algorithm handles negative edges that way.

### 5.7 Travelling Salesman Problem (TSP)
- Find the cheapest Hamiltonian tour. Brute force: (n−1)! tours (for symmetric: (n−1)!/2 distinct). K5 → 4!/2 = **12** distinct tours.
- **Held-Karp DP:** C(S, j) = min cost path from start visiting set S and ending at j. Subproblems n·2ⁿ, each O(n) → **Θ(n² · 2ⁿ)** time, Θ(n·2ⁿ) space. Still exponential: TSP is NP-hard (decision version NP-complete).

### 5.8 Optimal Binary Search Tree (OBST)
- Given sorted keys with search probabilities (and failure probabilities), build the BST with minimum expected search cost.
- C[i][j] = min over root r (i < r ≤ j) of C[i][r−1] + C[r][j] + W(i, j). Time **O(n³)** (Knuth's optimisation O(n²)), space O(n²).

### 5.9 Other DP problems and list
- DP: 0/1 knapsack, LCS, matrix chain, Floyd-Warshall, Bellman-Ford, multistage graph, TSP (Held-Karp), OBST, coin change (min coins), edit distance, rod cutting, subset sum (pseudo-polynomial O(n·sum)), longest increasing subsequence.
- Greedy not DP: fractional knapsack, Huffman, Kruskal, Prim, Dijkstra, activity selection, job sequencing.

**⚡ Exam tip:** Complexities to memorise: knapsack Θ(nW), LCS Θ(mn), matrix chain Θ(n³), Floyd Θ(V³), TSP Held-Karp Θ(n²2ⁿ), OBST O(n³). DP needs optimal substructure **and** overlapping subproblems (an MCQ favourite).

## 6. Backtracking and Branch & Bound

### 6.1 Backtracking
- Systematic **depth-first** search of the **state-space tree**; extend a partial solution one component at a time, and **backtrack** (prune) as soon as a **bounding / feasibility (promising) function** shows it cannot lead to a solution.
- Terms: **explicit constraints** (domain of each xᵢ), **implicit constraints** (relations among xᵢ), **solution space**, **live node**, **E-node** (currently expanding), **dead node**.
- Worst case still exponential (O(2ⁿ) or O(n!)), but pruning cuts the search. Used for constraint-satisfaction problems.

### 6.2 N-Queens
- Place n queens on an n×n board with no two in the same row, column or diagonal. One queen per row: xᵢ = column of queen in row i. Queens i, j attack if xᵢ = xⱼ or |xᵢ − xⱼ| = |i − j|.

| n | 1 | 2 | 3 | 4 | 5 | 6 | 8 |
|---|---|---|---|---|---|---|---|
| Solutions | 1 | 0 | 0 | **2** | 10 | **4** | **92** |

- 8-Queens has 92 solutions (12 fundamental, i.e. distinct up to rotations/reflections). 4-Queens solutions: (2, 4, 1, 3) and (3, 1, 4, 2) (column per row).
- State-space tree size for n-queens: ∑ n!/(n−k)!. Without pruning the search space is nⁿ (or n! with the one-per-column constraint).
- 4-Queens trace: queen 1 at (1,1); row 2: column 1, 2 attacked, column 3 safe → (2,3); row 3: all columns attacked → backtrack; (2,4); row 3: column 2 safe → (3,2); row 4: no safe column → backtrack... eventually queen 1 moves to column 2, giving (2,4,1,3).

### 6.3 Subset sum (sum of subsets)
- Choose a subset of weights whose sum is M. Sort weights ascending; include/exclude tree; prune when current sum + wᵢ > M, or current sum + remaining total < M.
- Worked: {3, 5, 6, 7}, M = 15 → only {3, 5, 7} → **1** subset. For W = {5, 10, 12, 13, 15, 18}, M = 30: {5, 10, 15}, {5, 12, 13}, {12, 18} → 3 solutions.
- Full state-space tree has 2ⁿ⁺¹ − 1 nodes. Subset sum is NP-complete (but pseudo-polynomial DP exists).

### 6.4 Graph (m-)colouring
- Colour vertices with at most m colours such that no two adjacent vertices share a colour. Backtracking assigns colours vertex by vertex; state-space tree has mⁿ leaves; time O(n · mⁿ).
- **Chromatic number** χ(G) = minimum colours. Any **planar** graph: 4 colours suffice (Four Colour Theorem). Bipartite: 2. Complete graph Kₙ: n. Odd cycle: 3.
- Deciding whether a graph is m-colourable is NP-complete for m ≥ 3; for m = 2 it is polynomial (bipartiteness).
- Other backtracking problems: **Hamiltonian cycle**, maze / rat in maze, sudoku, 0/1 knapsack (alternative), permutations.

### 6.5 Branch and Bound (B&B)
- For **optimisation** problems (min/max). Explores the state-space tree using BFS-like / best-first strategy; each live node gets a **bound** (lower bound for minimisation). **Prune** a node if its bound is no better than the best solution found so far (for minimisation: lower bound ≥ current best/upper bound).
- Strategies: **FIFO** (queue), **LIFO** (stack), **LC (least cost)**: next E-node = live node with the **smallest cost/bound**.
- Used for 0/1 knapsack, TSP (reduced cost-matrix bound), job assignment.

| | Backtracking | Branch & Bound |
|---|---|---|
| Traversal | DFS | BFS / best-first (LC) |
| Problem type | decision / enumeration (all solutions) | optimisation |
| Pruning basis | feasibility (constraints) | bound vs best known value |
| Space | less (path only) | more (live node list) |
| Examples | N-Queens, subset sum, colouring | TSP, 0/1 knapsack |

**⚡ Exam tip:** N-Queens counts: 4 → 2, 6 → 4, 8 → 92. Backtracking = DFS with feasibility pruning; B&B = optimisation with bounds (LC selects the minimum-cost live node).

## 7. String Matching

Text T[1..n], pattern P[1..m], find all shifts s where P occurs.

### 7.1 Naive algorithm
- Try every shift s = 0 … n − m, compare left to right. Time **O((n − m + 1)·m) = O(nm)** worst case (e.g. T = aaaa…a, P = aa…ab); best O(n) when each shift fails at first character. No preprocessing, no extra space.
- Worked: T = AAAAAB, P = AAB. s0: A, A vs A, A, then A vs B → 3 comparisons; s1: 3; s2: 3; s3: matches (3). Total = **12**.

### 7.2 Rabin-Karp
- Compare a **hash** of the pattern with the hash of each window of the text (rolling hash, mod q). Only on a hash match verify character by character. Hash match with an actual mismatch = **spurious hit**.
- Rolling: t(s+1) = (d·(t(s) − T[s+1]·h) + T[s+m+1]) mod q, where h = d^(m−1) mod q.
- Time: **average/expected O(n + m)**, **worst O(nm)** (many spurious hits); preprocessing Θ(m). Good for multiple pattern search.
- Worked: text 31415926535, pattern 26, q = 11. Pattern hash 26 mod 11 = 4. Windows: 31→9, 14→3, 41→8, 15→4, 59→4, 92→4, 26→4, 65→10, 53→9, 35→2. Hash matches at 15, 59, 92, 26; only 26 is real → **3 spurious hits**.

### 7.3 Knuth-Morris-Pratt (KMP)
- Preprocess the pattern into the **prefix (failure/π) function**: π[i] = length of the longest proper prefix of P[1..i] that is also a suffix of P[1..i]. On a mismatch, shift using π so the text pointer **never moves back**.
- Time **Θ(n + m)** (preprocessing Θ(m), matching Θ(n)), space Θ(m). Worst case also linear (unlike naive/RK).
- Worked 1: P = abcabcab → π = [0, 0, 0, 1, 2, 3, 4, 5]; last entry 5.
- Worked 2: P = AABAA → π = [0, 1, 0, 1, 2].
- Worked 3: P = ababaca → π = [0, 0, 1, 2, 3, 0, 1].
- Also: Boyer-Moore (often sublinear in practice, worst O(nm)); finite-automaton matching (preprocessing O(m|Σ|), matching Θ(n)).

| Algorithm | Preprocessing | Matching (worst) |
|---|---|---|
| Naive | none | O((n − m + 1)m) |
| Rabin-Karp | Θ(m) | O(nm) (avg O(n + m)) |
| KMP | Θ(m) | Θ(n) |
| Finite automaton | O(m|Σ|) | Θ(n) |

**⚡ Exam tip:** KMP = O(n + m) and never backs up in the text; Rabin-Karp average O(n + m) but worst O(nm); naive O(nm). π[i] counts the longest proper prefix = suffix.

## 8. P, NP, NP-Hard and NP-Complete

### 8.1 Definitions
- **Decision problem:** answer yes/no. Complexity classes are defined for decision problems.
- **P:** decision problems solvable by a **deterministic** algorithm in **polynomial time**.
- **NP:** decision problems whose "yes" answer can be **verified in polynomial time** given a certificate (equivalently, solvable in polynomial time by a **non-deterministic** machine).
- **P ⊆ NP**. Whether **P = NP** is the biggest open problem (Clay prize).
- **NP-hard:** problem H is NP-hard if **every** problem in NP is polynomial-time reducible to H (H need not be in NP, need not be a decision problem; "at least as hard as any NP problem").
- **NP-complete (NPC):** in **NP and NP-hard**. NPC = NP ∩ NP-hard.
- **Reduction A ≤p B:** a poly-time transformation of instances of A into instances of B preserving the answer. If A ≤p B and B ∈ P, then A ∈ P. To prove B is NP-complete: show B ∈ NP and reduce a **known NPC** problem to B.
- If any one NP-complete problem is solved in polynomial time, then **P = NP** (every NP problem becomes polynomial).
- If P ≠ NP, no NP-complete problem has a polynomial algorithm; and NPC ∩ P = ∅.

```
If P ≠ NP:                          If P = NP:
 NP-hard ⊃ NPC ⊂ NP ⊃ P               P = NP = NPC (all except trivial)
```

### 8.2 Cook's theorem (Cook-Levin, 1971)
- **The Boolean Satisfiability problem (SAT) is NP-complete.** It was the **first** problem proved NP-complete (directly, by simulating any non-deterministic Turing machine in polynomial time). All other NPC proofs reduce from it (via 3-SAT, etc.).
- Chain of reductions: SAT → 3-SAT → Clique → Vertex Cover → Hamiltonian Cycle → TSP; 3-SAT → Subset Sum → Partition/Knapsack; 3-SAT → 3-Colouring.
- **CNF-SAT:** satisfiability of a CNF formula. **3-SAT** (each clause has exactly 3 literals) is NPC; **2-SAT is in P**.

### 8.3 Common problems

| NP-complete (decision versions) | In P |
|---|---|
| SAT, 3-SAT | 2-SAT |
| Clique, Independent Set, Vertex Cover | Shortest path, MST |
| Hamiltonian cycle / path | Euler circuit |
| Travelling Salesman (decision) | Matching (bipartite and general), max flow |
| Subset sum, Partition, 0/1 Knapsack (decision) | Fractional knapsack |
| Graph colouring (k ≥ 3), 3-Colouring | 2-colouring, planarity test |
| Bin packing, Set cover, Job-shop scheduling | Linear programming, primality (AKS) |

- **NP-hard but not NP-complete:** the halting problem (undecidable, not in NP), optimisation versions of TSP/knapsack (not decision problems), generalised chess-type problems.
- **Open/unknown:** Graph isomorphism and integer factorisation are in NP but **not known** to be NP-complete (nor known to be in P). Primality is in P.
- **Co-NP:** complement problems (e.g. tautology). Unknown whether NP = co-NP.
- **Approximation:** vertex cover has a 2-approximation; metric TSP has a 2-approximation (MST-based) and 1.5 (Christofides). Used because exact algorithms are exponential.
- Non-deterministic algorithm primitives: choice(S), failure(), success(); complexity O(poly) for NP.

**⚡ Exam tip:** NPC = NP ∩ NP-hard. First NPC problem = SAT (Cook). "If an NP-complete problem is in P then P = NP." Not every NP problem is NP-complete (P problems are in NP too). Shortest path, MST, 2-SAT, fractional knapsack = P; Hamiltonian cycle, TSP, subset sum, clique, vertex cover, 3-SAT, 3-colouring = NPC.

## 9. Amortized Analysis

- **Amortized cost** = average cost per operation over a **worst-case sequence** of operations (no probability involved, unlike average-case analysis). Total actual cost ≤ total amortized cost.
- Three methods:
  1. **Aggregate:** total cost of n operations T(n); amortized = T(n)/n.
  2. **Accounting (banker's):** charge each operation an amortized cost; unused charge is stored as credit on objects to pay for later expensive operations; credit never negative.
  3. **Potential (physicist's):** amortized ĉᵢ = cᵢ + Φ(Dᵢ) − Φ(Dᵢ₋₁), potential Φ ≥ 0 with Φ(D₀) = 0.
- **Examples**
  - **Stack with MULTIPOP:** each element pushed can be popped once, so n operations cost O(n) → **O(1) amortized** per operation (though a single multipop is O(n)).
  - **Binary counter increment:** n increments flip O(n) bits in total (bit i flips n/2ⁱ times) → **O(1) amortized** (worst single increment O(k) for k bits).
  - **Dynamic array (table) doubling:** an insert is O(n) when full, but doubling makes the cost **O(1) amortized** per insertion (total ≤ 3n).
  - Splay trees: O(log n) amortized. Union-Find with path compression + rank: nearly constant (inverse Ackermann α(n)) amortized.

**⚡ Exam tip:** amortized ≠ average-case. Dynamic array insertion and binary counter increment are both O(1) amortized even though single operations can be O(n)/O(k).

## 10. Graph Algorithms Toolkit

### Traversals as algorithms
- **BFS**: queue, level by level; O(V + E) with adjacency list, O(V²) with matrix; gives shortest paths (fewest edges) in an unweighted graph; also tests bipartiteness (2-colour by level parity).
- **DFS**: recursion/stack with discovery and finishing times; O(V + E). Edge types in a directed graph: tree, back (to an ancestor, means a **cycle**), forward, cross. An undirected graph has only tree and back edges.
- A directed graph is a **DAG iff DFS finds no back edge**. A graph is connected iff BFS/DFS from one vertex reaches all V vertices.
- Cut vertices and bridges by DFS low-link values: O(V + E). **Strongly connected components**: Kosaraju or Tarjan, O(V + E).

### Shortest paths: choosing the algorithm

| Situation | Algorithm | Time |
|---|---|---|
| Unweighted | BFS | O(V + E) |
| Non-negative weights | Dijkstra (binary heap) | O((V + E) log V); array version O(V²) |
| Negative weights, no negative cycle | Bellman-Ford | O(VE) |
| DAG | Relax in topological order | O(V + E) |
| All pairs | Floyd-Warshall (DP) | O(V³), space O(V²) |
| All pairs, sparse | Johnson (reweight + Dijkstra from every vertex) | O(V² log V + VE) |

- **Bellman-Ford** worked: edges s→a 4, s→b 5, a→b −3, b→c 2, source s. Pass 1 (edges in the order listed): a = 4, b = min(5, 4 − 3) = 1, c = 1 + 2 = 3. A further pass changes nothing → no negative cycle; distances s=0, a=4, b=1, c=3. If any edge can still be relaxed after V − 1 passes there is a **negative cycle** reachable from the source.
- Dijkstra's greedy choice (a finalised vertex has the smallest tentative distance) is unsafe with negative edges; adding a constant to every weight does **not** fix it (paths with more edges are penalised more).
- Relaxation is the common step: if d[u] + w(u,v) < d[v] then d[v] = d[u] + w(u,v).

### Topological sort and DAG algorithms
- Worked (Kahn): edges A→B, A→C, B→D, C→D. In-degrees A0 B1 C1 D2. Remove A → B and C become 0 → remove B, C → D becomes 0 → order **A B C D** (A C B D is also valid).
- Longest path in a DAG (critical path) is solved in O(V + E) by DP in topological order; longest path in a general graph is NP-hard.
- Counting paths in a DAG: paths(v) = sum of paths(u) over edges u→v, processed in topological order.

### Minimum spanning tree facts
- A connected graph with V vertices has an MST with **V − 1** edges. If all edge weights are distinct the MST is **unique**. Cut property: the lightest edge crossing any cut belongs to some MST; cycle property: the heaviest edge on a cycle is not needed.
- Number of spanning trees of K_n = n^(n−2) (Cayley). Prim O(E log V) with heap (O(V²) with matrix); Kruskal O(E log E) with sorting + union-find.

### Complexity analysis reminders
- **Space complexity** = input + auxiliary. Recursive algorithms use O(depth) stack: recursive DFS O(V), merge sort O(n) array, quick sort O(log n) average and O(n) worst stack, recursive binary search O(log n) vs iterative O(1).
- Substitution check: guess T(n) ≤ c n log n for T(n) = 2T(n/2) + n and verify. Recursion tree: each of the log n levels costs n.
- Reduction chain for NP-completeness: SAT → 3-SAT → Clique → Vertex Cover → Hamiltonian Cycle → TSP; 3-SAT → Subset Sum → Partition/Knapsack; 3-SAT → 3-Colouring. The reduction itself must run in polynomial time.

**⚡ Exam tip:** DFS back edge = cycle; Bellman-Ford handles negative edges but is O(VE); Dijkstra only non-negative; topological order exists only for DAGs; MST has V − 1 edges.

## Quick Revision Sheet

1. Algorithm properties: input, output, definiteness, finiteness, effectiveness.
2. O = upper (≤), Ω = lower (≥), Θ = tight (both); o and ω are strict versions (lim f/g = 0 and ∞).
3. Growth order: 1 < log n < √n < n < n log n < n² < n³ < 2ⁿ < n! < nⁿ; log n! = Θ(n log n).
4. Master theorem: compare f(n) with n^(log_b a): smaller → Θ(n^log_b a); equal → ×log n; larger → Θ(f).
5. T(n)=2T(n/2)+n → n log n; T(n)=T(n/2)+1 → log n; T(n)=T(n−1)+n → n²; T(n)=4T(n/2)+n² → n² log n; 7T(n/2)+n² → n^2.81.
6. Binary search: O(log n), probes ⌊log₂n⌋ + 1 (1000 elements → 10).
7. Merge sort: Θ(n log n) always, stable, O(n) extra space; merging m & n lists ≤ m+n−1 comparisons.
8. Quick sort: avg n log n, worst n² (sorted input with first/last pivot), in place, not stable.
9. Max-min D&C: 3n/2 − 2 comparisons (n=8 → 10). Strassen: 7 multiplications, Θ(n^log₂7); 4×4 → 49.
10. Closest pair D&C: O(n log n). Comparison-sort lower bound Ω(n log n).
11. Greedy: activity selection (sort by finish), fractional knapsack (ratio), Huffman, Kruskal, Prim, Dijkstra, job sequencing.
12. Huffman cost = sum of internal node weights (5, 9, 12, 13, 16, 45 → 224). Kruskal O(E log E); Prim O(E log V) with heap; Dijkstra O((V+E) log V), fails with negative edges.
13. DP needs optimal substructure + overlapping subproblems. 0/1 knapsack Θ(nW) (pseudo-polynomial); LCS Θ(mn); matrix chain Θ(n³); Floyd-Warshall Θ(V³); TSP (Held-Karp) Θ(n²2ⁿ); OBST O(n³).
14. LCS(ABCBDAB, BDCABA) = 4; matrix chain (10×20, 20×30, 30×40) = 18000; parenthesisations of 5 matrices = 14.
15. N-Queens solutions: n=4 → 2, n=6 → 4, n=8 → 92. Backtracking = DFS + pruning; B&B = optimisation + bounding (LC picks minimum cost live node).
16. Subset sum, graph colouring, Hamiltonian cycle: backtracking problems; all NP-complete (3-colouring).
17. String matching: naive O(nm); Rabin-Karp avg O(n+m), worst O(nm); KMP Θ(n+m); π[i] = longest proper prefix that is also a suffix.
18. P ⊆ NP; NPC = NP ∩ NP-hard; Cook's theorem: SAT is NP-complete (first NPC).
19. NPC: 3-SAT, clique, vertex cover, Hamiltonian cycle, TSP (decision), subset sum, 3-colouring. In P: 2-SAT, MST, shortest path, fractional knapsack.
20. Solving one NPC problem in polynomial time gives P = NP. NP-hard problems need not be in NP (halting problem).
21. Amortized analysis methods: aggregate, accounting, potential. Dynamic array doubling and binary counter increment: O(1) amortized.
22. Naive TSP tours: (n−1)!/2 distinct (K5 → 12); Fibonacci naive Θ(2ⁿ) → DP Θ(n).
- Graph algorithms: DFS back edge means a cycle; Bellman-Ford O(VE) detects negative cycles after V−1 passes; Dijkstra needs non-negative weights; Johnson for sparse all-pairs; MST has V−1 edges, unique if weights are distinct.
