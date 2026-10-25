# Design & Analysis of Algorithms

> **What the exam asks:** about 3-5 questions per paper (about 18 hits for "algorithm/complexity" in the 2023 and Nov-2025 papers). Favourites: complexity of standard algorithms (merge/quick/binary search, Dijkstra, Kruskal, Prim, Floyd), Master theorem recurrences, growth-rate ordering, greedy vs DP identification, 0/1 vs fractional knapsack, LCS / matrix-chain / Huffman numeric problems, N-Queens counts, and P / NP / NP-complete statements. Numeric problems are small, so practise them by hand.

## 1. Algorithm Basics & Asymptotic Notation

### 1.1 Properties of an algorithm
An **algorithm** is a finite sequence of unambiguous steps that solves a problem. Five properties:

| Property | Meaning |
|---|---|
| Input | zero or more well-defined inputs |
| Output | at least one output |
| Definiteness | each step is precise and unambiguous |
| Finiteness | terminates after a finite number of steps |
| Effectiveness | every step is basic enough to be carried out exactly |

- A **program** need not terminate (e.g. an OS); an **algorithm** must (finiteness).
- Analysis measures **time** (number of basic operations) and **space** (extra memory). Cases: **best, average, worst**. The worst case is the usual default, since it gives an upper bound for every input.
- **A priori analysis** is machine-independent and gives a function of n. **A posteriori testing** is machine-dependent and measures actual run time.

### 1.2 Asymptotic notations (f, g non-negative)

| Notation | Meaning | Definition |
|---|---|---|
| f = O(g) | upper bound (≤) | ∃ c>0, n₀: f(n) ≤ c·g(n) for all n ≥ n₀ |
| f = Ω(g) | lower bound (≥) | ∃ c>0, n₀: f(n) ≥ c·g(n) for all n ≥ n₀ |
| f = Θ(g) | tight bound (=) | f = O(g) **and** f = Ω(g) |
| f = o(g) | strict upper (<) | for **every** c>0, f(n) < c·g(n) for large n; lim f/g = 0 |
| f = ω(g) | strict lower (>) | for every c>0, f(n) > c·g(n); lim f/g = ∞ |

- Limit test: lim f/g = 0 → f = o(g) (so also O); = finite constant > 0 → Θ; = ∞ → ω(g) (so also Ω).
- Analogy: O ~ ≤, Ω ~ ≥, Θ ~ =, o ~ <, ω ~ >.
- Properties: reflexive (O, Ω, Θ); symmetric only for Θ (f=Θ(g) ⇔ g=Θ(f)); transitive for all; **transpose symmetry**: f = O(g) ⇔ g = Ω(f); f = o(g) ⇔ g = ω(f).
- Sum rule: O(f) + O(g) = O(max(f, g)). Product rule: O(f)·O(g) = O(f·g). Example: f=O(n²), g=O(n³) → f·g = O(n⁵).
- Constants and lower-order terms are dropped: 3n² + 5n + 2 = Θ(n²).
- Base of the logarithm does not matter inside O (log_a n = Θ(log_b n)), but **the base of an exponent does**: 2ⁿ ≠ Θ(3ⁿ) (2ⁿ = o(3ⁿ)); also 2^(n+1) = Θ(2ⁿ) but 2^(2n) ≠ Θ(2ⁿ).
- n log n = Ω(n) is true (log n ≥ 1 for n ≥ 2). O(n log n) is not O(n).
- "Θ" is **not** the same as "average case"; notations describe functions, and each of the best, average and worst cases can have its own O, Ω, Θ.

### 1.3 Growth-rate ordering (slowest → fastest)

```
1 < log log n < log n < (log n)² < √n < n < n log n < n² < n³ < n^k < 2ⁿ < 3ⁿ < n! < nⁿ
```

- Polynomial < exponential: n^k = o(2ⁿ) for any constant k. Factorial beats exponential: 2ⁿ = o(n!). n! = o(nⁿ).
- log(n!) = Θ(n log n) (Stirling). (log n)^k = o(n^ε) for any ε>0.
- n^(log n) is **super-polynomial but sub-exponential**: n^(log n) = 2^((log n)²).
- Comparing two functions: take logs or the limit of the ratio. Example: n^(1/2) vs log²n → √n is faster growing.
- Common standard complexities:

| Algorithm | Time |
|---|---|
| Linear search | O(n) |
| Binary search | O(log n) |
| Bubble / insertion / selection sort | O(n²) (insertion best O(n)) |
| Merge sort / heap sort | Θ(n log n) |
| Quick sort | avg O(n log n), worst O(n²) |
| Matrix multiplication (naive) | O(n³) |
| Subset enumeration | O(2ⁿ) |
| Permutation enumeration | O(n!) |

**⚡ Exam tip:** Θ needs both bounds. Anything that is O(n) is also O(n²) (O is only an upper bound), but it is not Θ(n²). For "which grows slowest/fastest" questions, order as above and remember n! > 2ⁿ and 2ⁿ > any polynomial.

## 2. Solving Recurrences

### 2.1 Substitution (guess and prove by induction)
Guess the form, then prove with induction, adjusting constants. Example: T(n) = 2T(n/2) + n. Guess T(n) ≤ c·n log n:
T(n) ≤ 2c(n/2)log(n/2) + n = c·n log n − c·n + n ≤ c·n log n for c ≥ 1. Hence O(n log n).

### 2.2 Iteration / expansion (unroll)
- **T(n) = T(n−1) + n, T(1)=1:** T(n) = n + (n−1) + … + 1 = n(n+1)/2 = Θ(n²). T(10) = 55.
- **T(n) = T(n−1) + 1:** Θ(n). **T(n) = 2T(n−1) + 1, T(0)=0:** T(n) = 2ⁿ − 1 = Θ(2ⁿ) (Tower of Hanoi).
- **T(n) = T(n/2) + 1:** Θ(log n) (binary search). **T(n) = T(n/2) + n:** n + n/2 + n/4 + … = 2n → Θ(n).
- **T(n) = 2T(n/2) + 1, T(1)=1:** Θ(n); T(8) = 15 (= 2n − 1).
- **T(n) = T(√n) + 1:** Θ(log log n).

### 2.3 Recursion-tree method
Draw the tree, sum the work per level, then sum over levels.
- T(n) = 2T(n/2) + n: every level costs n, depth log₂n → Θ(n log n).
- T(n) = T(n/3) + T(2n/3) + n: each level costs ≤ n, depth log_{3/2} n → Θ(n log n).
- Unbalanced split T(n) = T(9n/10) + T(n/10) + n: still Θ(n log n) (depth log_{10/9} n, base only changes a constant). This is why quick sort with any **constant-ratio** split stays O(n log n).

### 2.4 Master theorem
For T(n) = a·T(n/b) + f(n), with a ≥ 1, b > 1. Let **n^(log_b a)** be the "watershed".

| Case | Condition | Result |
|---|---|---|
| 1 | f(n) = O(n^(log_b a − ε)) (f is polynomially **smaller**) | T(n) = Θ(n^(log_b a)) |
| 2 | f(n) = Θ(n^(log_b a)) (equal) | T(n) = Θ(n^(log_b a) · log n) |
| 3 | f(n) = Ω(n^(log_b a + ε)) (polynomially **larger**) **and** a·f(n/b) ≤ c·f(n), c<1 (regularity) | T(n) = Θ(f(n)) |

(Extended case 2: f = Θ(n^(log_b a) · logᵏ n) → T = Θ(n^(log_b a) · log^(k+1) n).)

**Worked cases**

| Recurrence | a, b, n^(log_b a) | Case | Answer |
|---|---|---|---|
| T(n) = 2T(n/2) + n | 2, 2, n | 2 | Θ(n log n) (merge sort) |
| T(n) = 4T(n/2) + n² | 4, 2, n² | 2 | Θ(n² log n) |
| T(n) = 4T(n/2) + n | 4, 2, n² | 1 | Θ(n²) |
| T(n) = 8T(n/2) + n² | 8, 2, n³ | 1 | Θ(n³) (plain D&C matrix multiply) |
| T(n) = 7T(n/2) + n² | 7, 2, n^2.81 | 1 | Θ(n^(log₂7)) ≈ Θ(n^2.81) (Strassen) |
| T(n) = 3T(n/2) + n² | 3, 2, n^1.58 | 3 | Θ(n²) |
| T(n) = 16T(n/4) + n | 16, 4, n² | 1 | Θ(n²) |
| T(n) = 2T(n/2) + n² | 2, 2, n | 3 | Θ(n²) |
| T(n) = T(n/2) + 1 | 1, 2, n⁰=1 | 2 | Θ(log n) (binary search) |
| T(n) = T(n/2) + n | 1, 2, 1 | 3 | Θ(n) |
| T(n) = 9T(n/3) + n | 9, 3, n² | 1 | Θ(n²) |
| T(n) = 2T(n/2) + n log n | 2, 2, n | extended 2 | Θ(n log² n) |
| T(n) = 2T(n/2) + 1 | 2, 2, n | 1 | Θ(n) |

- Master theorem **does not apply** for: T(n) = 2ⁿT(n/2) + nⁿ (a not constant), T(n) = 0.5T(n/2) + n (a<1), T(n) = 2T(n/2) + n/log n (gap not polynomial), T(n) = T(n−1) + n (not of form n/b).
- Shortcut for f(n) = nᵈ: compare d with log_b a. d < log_b a → Θ(n^(log_b a)); d = log_b a → Θ(nᵈ log n); d > log_b a → Θ(nᵈ).

**⚡ Exam tip:** compute log_b a first and compare it with the exponent of f. T(n) = 2T(n/2) + n = Θ(n log n); T(n) = T(n/2) + 1 = Θ(log n); T(n) = T(n−1) + n = Θ(n²) (Master theorem not applicable; use expansion).

## 3. Divide and Conquer

**Paradigm:** Divide the problem into smaller sub-problems, Conquer (solve recursively), Combine the answers. Typical recurrence T(n) = aT(n/b) + f(n), where f(n) is the divide+combine cost.

### 3.1 Binary search
- Needs a **sorted** array. Compare with mid, discard half. T(n) = T(n/2) + 1.
- Time: **O(log n)** worst/average, **O(1)** best; space O(1) iterative, O(log n) recursive.
- Max comparisons (element probes) = ⌊log₂ n⌋ + 1. For n = 1000 → 10. For n = 1023 → 10; n = 1024 → 11.
- Example: A = [3, 8, 12, 17, 21, 29, 35, 41, 50], key 29. mid = ⌊(0+8)/2⌋ = 4 → 21 < 29 → low=5; mid = 6 → 35 > 29 → high=5; mid = 5 → 29 found. Elements examined = 3.
- Binary search tree of probes has height ⌊log₂ n⌋ + 1; successful search ≤ that, unsuccessful ≈ same.

### 3.2 Merge sort
- Split in halves, sort each, merge. T(n) = 2T(n/2) + n → **Θ(n log n) in best, average and worst** case.
- **Stable**, not in place, auxiliary space **O(n)** (array version).
- Merging two sorted lists of sizes m and n takes at most **m + n − 1** comparisons (at least min(m, n)).
- Can count **inversions** in O(n log n) (during merge, when a right element goes first, add the number of remaining left elements). Array [2, 4, 1, 3, 5] has 3 inversions: (2,1), (4,1), (4,3).
- Number of merge levels = log₂ n.

### 3.3 Quick sort
- Pick pivot, partition (smaller left, larger right), recurse. T(n) = T(k) + T(n−k−1) + Θ(n).
- **Best/average: Θ(n log n)**; **worst: Θ(n²)** when the split is 0 : n−1, e.g. first/last element pivot on an **already sorted (or reverse sorted) / all-equal** input. Worst recurrence T(n) = T(n−1) + n.
- In place (space O(log n) stack on average, O(n) worst), **not stable**.
- Randomised pivot → expected O(n log n). Median pivot → worst O(n log n).
- **Lomuto partition** (pivot = last): worked example [7, 2, 9, 4, 6, 5], pivot 5. i = −1; j=0: 7>5; j=1: 2≤5 → i=0, swap(a0,a1) → [2,7,9,4,6,5]; j=2: 9; j=3: 4≤5 → i=1, swap(a1,a3) → [2,4,9,7,6,5]; j=4: 6. Finally swap a[i+1] with pivot → **[2, 4, 5, 7, 6, 9]**; pivot index 2.
- Comparison of sorts:

| Sort | Best | Avg | Worst | Space | Stable |
|---|---|---|---|---|---|
| Merge | n log n | n log n | n log n | O(n) | Yes |
| Quick | n log n | n log n | n² | O(log n) | No |
| Heap | n log n | n log n | n log n | O(1) | No |
| Insertion | n | n² | n² | O(1) | Yes |
| Selection | n² | n² | n² | O(1) | No |
| Bubble | n (with flag) | n² | n² | O(1) | Yes |

- Any comparison-based sort needs Ω(n log n) comparisons in the worst case (decision tree has ≥ n! leaves, height ≥ log₂ n!).

### 3.4 Finding max and min
- Straightforward: 2(n−1) comparisons.
- Divide and conquer: T(n) = 2T(n/2) + 2, T(2) = 1 → **T(n) = 3n/2 − 2** (n power of 2). n=8 → 10; n=16 → 22. Optimal. (For general n: ⌈3n/2⌉ − 2.)
- Finding the largest of n takes n − 1 comparisons; second largest needs n + ⌈log₂ n⌉ − 2 (tournament).

### 3.5 Strassen's matrix multiplication
- Conventional D&C: 8 multiplications of n/2 matrices → T(n) = 8T(n/2) + Θ(n²) = Θ(n³).
- **Strassen: 7 multiplications** (and 18 additions/subtractions) of n/2 matrices → T(n) = 7T(n/2) + Θ(n²) = **Θ(n^(log₂7)) ≈ Θ(n^2.81)**.
- For 2×2: 7 multiplications instead of 8. For 4×4: 7 × 7 = **49** multiplications (vs 64). For 8×8: 343.
- Needs n to be a power of 2 (pad with zeros). Better constants only for large n.
- Best known theoretical exponent is below 2.38 (Coppersmith-Winograd family), irrelevant for exams.

### 3.6 Closest pair of points
- Sort by x, split by a vertical line, recursively find the closest pair δ = min(δL, δR), then check the **strip** of width 2δ around the line, sorted by y; each point needs to be compared with at most **7** (often stated 6-7) following points.
- T(n) = 2T(n/2) + O(n) → **O(n log n)** (brute force O(n²)).

### 3.7 Other D&C examples
- Tower of Hanoi (2ⁿ − 1 moves), integer multiplication (Karatsuba: 3 multiplications → O(n^1.585)), convex hull (merge hull), median of medians (O(n) selection), power xⁿ in O(log n).

**⚡ Exam tip:** 3n/2 − 2 for max-min; Strassen = n^log₂7 with 7 multiplications; binary search probes = ⌊log₂n⌋ + 1; merge m+n−1; merge sort Θ(n log n) always, quick sort worst n² on sorted input with first/last pivot.

## 4. Greedy Method

**Greedy:** build the solution step by step, always making the **locally best (greedy) choice**, never reconsidering. Works when the problem has the **greedy-choice property** and **optimal substructure**. It is fast but not always optimal.

### 4.1 Activity (interval) selection
- Sort by **finish time**, pick the first, then every activity whose start ≥ last chosen finish. Time O(n log n) (sorting), O(n) after sorting. Maximises the number of activities.
- Example (start, finish): (1,4), (3,5), (0,6), (5,7), (3,9), (5,9), (6,10), (8,11), (8,12), (2,14), (12,16). Sorted by finish already. Pick (1,4); next start ≥ 4 → (5,7); next start ≥ 7 → (8,11); next start ≥ 11 → (12,16). Answer: **4 activities**.

### 4.2 Knapsack: fractional vs 0/1
- **Fractional knapsack:** items can be broken. Greedy by **value/weight ratio** (descending) is **optimal**. Time O(n log n).
- **0/1 knapsack:** greedy ratio is **not optimal**; use DP (or branch and bound).
- Worked fractional: W = 50, items (w, v): (10,60) ratio 6, (20,100) ratio 5, (30,120) ratio 4. Take item 1 (10, 60), item 2 (20, 100), then 20/30 of item 3 = 80. Total = 60+100+80 = **240**. (0/1 optimum for the same data is 220.)

### 4.3 Huffman coding
- Optimal **prefix** (prefix-free) code for known character frequencies; variable-length, frequent chars get shorter codes. Repeatedly **merge the two lowest-frequency nodes** (min-heap). Time O(n log n). Full binary tree: n leaves, n − 1 internal nodes.
- Cost (total bits) = Σ freq × code length = **sum of all internal-node weights**.
- Worked: a=5, b=9, c=12, d=13, e=16, f=45.
  Merge 5+9 = 14; 12+13 = 25; 14+16 = 30; 25+30 = 55; 45+55 = 100.
  Cost = 14 + 25 + 30 + 55 + 100 = **224**. Codes: f=0, c=100, d=101, a=1100, b=1101, e=111. Check: 45·1 + 12·3 + 13·3 + 5·4 + 9·4 + 16·3 = 224.
- Second example: frequencies 1, 1, 2, 3, 5, 8 → internal nodes 2, 4, 7, 12, 20 → cost **45**.
- Fixed-length code needs ⌈log₂ n⌉ bits per symbol. Huffman codes are not unique but the optimal cost is unique. Decoding is unambiguous because of the prefix property.

### 4.4 Minimum spanning tree
A spanning tree of a connected graph has V − 1 edges. MST = minimum total weight. Both algorithms are greedy (cut/cycle properties).

| | Kruskal | Prim |
|---|---|---|
| Idea | sort edges, add the smallest that does not form a cycle (Union-Find) | grow one tree from a start vertex, add the cheapest edge leaving the tree |
| Works on | forest of components; disconnected → spanning forest | connected graph, single tree |
| Time | **O(E log E) = O(E log V)** | **O(E log V)** (binary heap + adjacency list); O(V²) (adjacency matrix); O(E + V log V) (Fibonacci heap) |
| Better for | sparse graphs | dense graphs |

- If all edge weights are distinct, the MST is **unique**.
- Worked (Kruskal): edges A-B 2, B-C 3, A-C 4, C-D 1, B-D 5, D-E 6, C-E 7. Sorted: CD1, AB2, BC3, (AC4 forms cycle, skip), (BD5 cycle, skip), DE6 → MST weight 1+2+3+6 = **12** (4 edges for 5 vertices).
- Worked 2: A-B 4, A-C 2, B-C 1, B-D 5, C-D 8, C-E 10, D-E 2. Pick BC1, AC2, DE2, (AB4 cycle), BD5 → 1+2+2+5 = **10**.

### 4.5 Dijkstra's single-source shortest path
- Repeatedly finalise the unvisited vertex with the smallest tentative distance, relax its edges. Works for **non-negative edge weights only** (may give wrong answers with negative edges; use Bellman-Ford O(VE) instead).
- Time: **O(V²)** with array; **O((V + E) log V)** with binary heap; O(E + V log V) with Fibonacci heap.
- Worked: A-B 4, A-C 1, C-B 2, B-D 1, C-D 5, D-E 3, source A. C=1; B = min(4, 1+2) = 3; D = min(3+1, 1+5) = 4; E = 4+3 = **7** (A-C-B-D-E). Finalisation order: A, C, B, D, E.
- Another: S-A 7, S-B 2, B-A 3, A-C 1, B-C 8 → B=2, A=min(7, 5)=5, C=min(10, 6)=6. Finalisation order S, B, A, C.

### 4.6 Job sequencing with deadlines
- n jobs, each takes unit time with deadline dᵢ and profit pᵢ. Sort by **profit descending**; place each job in the **latest free slot ≤ its deadline**; skip if none. Time O(n²) (O(n log n) with Union-Find).
- Worked: J1 (d2, 100), J2 (d1, 19), J3 (d2, 27), J4 (d1, 25), J5 (d3, 15). Order: 100, 27, 25, 19, 15. J1 → slot 2; J3 → slot 1; J4 (d1) no slot; J2 no slot; J5 → slot 3. Jobs {J3, J1, J5}, profit 27+100+15 = **142**.
- Another: (4,20), (1,10), (1,40), (1,30): pick 40 (slot 1), 20 (slot 4); 30, 10 rejected → **60**.

### 4.7 Others and summary
- Optimal merge pattern (merge cost = Huffman-like), coin change (greedy only for canonical systems), Dijkstra, MST, Huffman, fractional knapsack, activity selection, job sequencing (**all greedy**).
- **Not greedy-solvable optimally:** 0/1 knapsack, TSP, matrix-chain, LCS, longest path, all-pairs shortest path (use DP).

**⚡ Exam tip:** Fractional → greedy; 0/1 → DP. Kruskal = sort edges + cycle check; Prim = grow from a vertex. Dijkstra fails with negative edges. Huffman cost = sum of internal nodes. Activity selection: sort by finish time (not start time).
