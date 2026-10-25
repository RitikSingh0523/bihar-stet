## 8. Hashing

### Concepts
- **Hash table**: array of m slots; **hash function** h(k) maps key → index. Average search/insert/delete **O(1)**, worst O(n).
- **Collision**: h(k1) = h(k2) for k1 ≠ k2. **Load factor α = n / m** (35 keys in 50 slots → 0.7).
- Good hash function: easy to compute, uniform distribution, minimises collisions.

### Hash functions

| Method | Idea |
|---|---|
| **Division** | h(k) = k mod m (choose m prime, not a power of 2) |
| **Multiplication** | h(k) = ⌊m·(k·A mod 1)⌋, A ≈ 0.618 (golden ratio) |
| **Mid-square** | square the key, take middle digits. 54² = 2916 → middle two digits **91** |
| **Folding** | split key into parts and add: 123456 → 12+34+56 = 102 (→ mod table size) |
| **Digit extraction** | pick selected digits of key |
| Universal hashing | random choice of function from a family |

### Collision resolution
**1. Separate chaining (open hashing)**: each slot holds a linked list of keys with that hash. α can exceed 1. Insert O(1) at head; expected search O(1 + α) (successful ≈ 1 + α/2).
- Worked: m = 10, h = k mod 10, keys 12, 22, 32, 15, 25, 7 → slot 2: 12→22→32; slot 5: 15→25; slot 7: 7. Longest chain = **3**.

**2. Open addressing (closed hashing)**: all keys stored in the table itself; α ≤ 1. Probe sequence until an empty slot is found.

| Method | Probe i | Problem |
|---|---|---|
| **Linear probing** | (h(k) + i) mod m | **primary clustering** |
| **Quadratic probing** | (h(k) + c1·i + c2·i²) mod m | **secondary clustering**; may not reach all slots |
| **Double hashing** | (h1(k) + i·h2(k)) mod m | least clustering; h2(k) must never be 0 |
- Worked linear probing, m = 7, h = k mod 7, insert 15, 22, 8, 29: 15→1; 22→1 taken →2; 8→1,2 taken →3; 29→1,2,3 taken → **4**.
- Worked double hashing, m = 7, h1 = k mod 7, h2 = 5 − (k mod 5): insert 10 → 3; insert 17: h1 = 3 (taken), h2 = 5 − 2 = 3 → (3+3) mod 7 = **6**; insert 24: h1 = 3 (taken), h2 = 5 − 4 = 1 → **4**.
- Quadratic example (c1 = 0, c2 = 1): probes h, h+1, h+4, h+9 (mod m).
- **Deletion** in open addressing needs a *tombstone/deleted marker* (just emptying a slot breaks probe chains).
- Expected probes (uniform hashing): unsuccessful ≈ 1/(1−α); successful ≈ (1/α) ln(1/(1−α)). Keep α < 0.7 (rehash when exceeded).
- **Rehashing**: build bigger table and re-insert all keys when load factor too high.
- Chaining vs open addressing: chaining never "fills up", handles deletions easily, but uses extra pointer memory; open addressing has better cache behaviour but suffers clustering.
- Perfect hashing: no collisions for a static key set. Applications: symbol tables, dictionaries/maps, caches, database indexing, password storage (cryptographic hash), duplicate detection.

**⚡ Exam tip:** Linear → primary clustering; quadratic → secondary clustering; double hashing → best of the three. Always insert keys in the *given order* when tracing collisions.

## 9. Sorting

### Terminology
- **Stable**: equal keys keep their original relative order. **In-place**: O(1) extra space. **Internal** (RAM) vs **external** (disk, e.g. external merge sort).
- Comparison-based sorting lower bound: **Ω(n log n)** comparisons (decision tree with n! leaves, height ≥ log₂ n!).
- **Inversions**: pairs i<j with A[i] > A[j]; max = n(n−1)/2 (reverse-sorted). Insertion sort shifts = inversions; bubble sort swaps = inversions.

### Master comparison table

| Algorithm | Best | Average | Worst | Space | Stable |
|---|---|---|---|---|---|
| **Bubble** | O(n) (with flag) | O(n²) | O(n²) | O(1) | Yes |
| **Selection** | O(n²) | O(n²) | O(n²) | O(1) | No |
| **Insertion** | O(n) | O(n²) | O(n²) | O(1) | Yes |
| **Merge** | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |
| **Quick** | O(n log n) | O(n log n) | **O(n²)** | O(log n) (worst O(n)) | No |
| **Heap** | O(n log n) | O(n log n) | O(n log n) | O(1) | No |
| **Shell** | O(n log n) | ~O(n^1.3) | O(n²) (gap-dependent) | O(1) | No |
| **Counting** | O(n + k) | O(n + k) | O(n + k) | O(n + k) | Yes |
| **Radix** (LSD) | O(d(n + k)) | O(d(n + k)) | O(d(n + k)) | O(n + k) | Yes |
| **Bucket** | O(n + k) | O(n + k) | O(n²) | O(n + k) | Yes |

### Bubble sort
- Compare adjacent pairs, swap if out of order; the largest "bubbles" to the end each pass; n−1 passes. Comparisons n(n−1)/2; swaps = number of inversions (max n(n−1)/2).
- Worked: 5 4 3 2 1 (reverse) → 4+3+2+1 = **10 swaps**. With "swapped" flag, already-sorted input takes 1 pass → O(n).

### Selection sort
- Find min of the unsorted part and swap it to the front. **Always n(n−1)/2 comparisons** (10 elements → **45**), at most **n − 1 swaps** (fewest writes of the quadratic sorts). Not stable (long-distance swap).
- Worked: 64 25 12 22 11 → 11 25 12 22 64 → 11 12 25 22 64 → 11 12 22 25 64 → sorted.

### Insertion sort
- Take next element and insert it into the sorted left part by shifting larger ones right. Best for small or nearly-sorted data and online data; adaptive, stable. Worst comparisons n(n−1)/2.
- Worked: 7 3 5 1. After pass 1 (insert 3): **3 7 5 1**. After pass 2 (insert 5): **3 5 7 1**. After pass 3: 1 3 5 7.
- Binary insertion sort reduces comparisons to O(n log n) but shifts remain O(n²).

### Merge sort
- Divide and conquer: split in halves, sort recursively, merge. **T(n) = 2T(n/2) + n → Θ(n log n)** in all cases. Needs O(n) extra space; stable. Number of merge levels (bottom-up) for n = 16: log₂ 16 = **4**. Good for linked lists and external sorting. Merge of sizes m and n takes at most m + n − 1 comparisons.
- Worked: [38 27 43 3] → [38 27] [43 3] → [27 38] [3 43] → merge → [3 27 38 43].

### Quick sort
- Choose pivot, **partition** (smaller left, larger right), recurse on both sides. Partition is O(n). Pivot ends in its final position.
- Best/average: T(n) = 2T(n/2) + n → O(n log n). Worst: T(n) = T(n−1) + n → **O(n²)** — occurs when pivot is always min or max, e.g. **already sorted (or reverse sorted) input with first/last element as pivot**. Random or median-of-three pivot makes worst case unlikely.
- In-place, not stable, fastest in practice for arrays.
- Lomuto partition (pivot = last): scan j, keep i as boundary of "≤ pivot"; Hoare partition: two indices moving inward and swapping.
- Worked partition (pivot = first, Hoare-style) on 50 30 70 20 40: pivot 50 → 40 30 20 50 70 → pivot in position 4.

### Heap sort
- Build max-heap O(n) + n extractions each O(log n) → **O(n log n)** best, average, worst; in place; not stable. Slower than quick sort in practice, but no O(n²) worst case.

### Non-comparison sorts
- **Counting sort**: integer keys in range 0..k; count occurrences, prefix sums, place elements from right to left (stable). O(n + k); good when k = O(n).
- **Radix sort**: sort digit by digit from least significant using a stable sort (counting). O(d(n + k)) with d digits and base k.
- **Bucket sort**: distribute into buckets (uniform data in [0,1)), sort each (insertion), concatenate; average O(n).
- Radix worked: 170 45 75 90 802 → by units: 170 90 802 45 75 → by tens: 802 45 170 75 90 → by hundreds: 45 75 90 170 802.

### Which sort when?
- Nearly sorted / tiny n → insertion. Guaranteed O(n log n) and stability → merge. Guaranteed O(n log n) with O(1) space → heap. Fastest average on arrays → quick. Fewest swaps → selection. Small integer range → counting. Linked list → merge.
- Only **merge sort** and **insertion/bubble/counting/radix** are stable among the common ones; quick, heap and selection are not.

**⚡ Exam tip:** Quick sort worst case O(n²) on sorted input (first-element pivot); merge sort needs O(n) extra space; selection sort always does n(n−1)/2 comparisons; bubble/insertion best case O(n).

## 10. Searching

| Method | Requirement | Best | Average | Worst |
|---|---|---|---|---|
| **Linear (sequential)** | none | O(1) | O(n) (≈ (n+1)/2 comparisons) | O(n) |
| **Binary** | sorted + random access | O(1) | O(log n) | O(log n) |
| **Interpolation** | sorted, uniformly distributed | O(1) | O(log log n) | O(n) |
| **Jump** | sorted | | | O(√n) (block size √n) |
| **Exponential** | sorted, unbounded | | O(log n) | |
| Hash lookup | hash table | O(1) | O(1) | O(n) |
| BST search | BST | O(1) | O(log n) | O(n) |
| AVL / B-tree | balanced | | O(log n) | O(log n) |

### Binary search
```
low = 0; high = n−1
while (low <= high) { mid = (low + high) / 2;
   if (A[mid] == key) return mid;
   else if (key < A[mid]) high = mid − 1;  else low = mid + 1; }
```
- Max comparisons = ⌊log₂ n⌋ + 1 (n = 1000 → **10**; n = 1024 → 11; n = 15 → 4). Recurrence T(n) = T(n/2) + 1.
- Safe midpoint: low + (high − low)/2 (avoids overflow).
- Worked: A = 2 5 8 12 16 23 38, key 23: mid = 12 (index 3) → right half; mid = 23 (index 5) found in 2 comparisons.
- Binary search on a linked list gains nothing (O(n)). Number of elements remaining after k steps ≈ n/2ᵏ.
- Linear search with a **sentinel** saves one comparison per iteration; move-to-front/transpose heuristics speed up frequent keys.

**⚡ Exam tip:** Binary search needs a *sorted array* — it fails on unsorted data and is not efficient on linked lists. Compute comparisons as ⌊log₂ n⌋ + 1.

## 11. Recursion

### Basics
- **Recursion**: a function calling itself; needs a **base case** (stops recursion) and a **recursive case** (smaller sub-problem). Missing base case → infinite recursion → **stack overflow**.
- Each call pushes an **activation record** (parameters, locals, return address) onto the call stack. Recursion depth n uses O(n) stack space.
- **Tail recursion**: recursive call is the last action; can be optimised into a loop (O(1) stack).
- Direct vs indirect (mutual) recursion. Recursion can always be replaced by iteration + explicit stack.
- Recursion is elegant but has call overhead; iteration is usually faster and uses less memory.

### Standard recursive functions
```
fact(n) = n * fact(n−1), fact(0)=1                         T = O(n)
fib(n)  = fib(n−1) + fib(n−2)                              naive T = O(2ⁿ)  (with memoisation O(n))
gcd(a,b) = gcd(b, a mod b), gcd(a,0)=a                     O(log min(a,b))
sumDigits(x) = x%10 + sumDigits(x/10), base x==0 → 0
power(x,n) by squaring                                      O(log n)
Tower of Hanoi: moves(n) = 2·moves(n−1) + 1 = 2ⁿ − 1
Binary search, merge sort, quick sort, tree traversals, DFS
```
- Worked: sumDigits(4825) = 5 + 2 + 8 + 4 = **19**.
- Worked: f(n)= 1 if n ≤ 1 else f(n−1)+f(n−2): f(0..6) = 1,1,2,3,5,8,**13**.
- Worked: Tower of Hanoi with 5 disks → 2⁵ − 1 = **31** moves; 3 disks → 7; 4 → 15.
- Output tracing: `void p(int n){ if(n>0){ p(n-1); printf("%d",n); p(n-1);} }` — p(2) prints 1 2 1 (print after first recursive call: inorder pattern). If printf is before the recursive calls it prints in preorder (2 1 1); after both calls (postorder): 1 1 2.
- Ackermann function is a non-primitive recursive example. Number of calls in naive fib(n) is 2·fib(n+1) − 1 (≈ O(φⁿ), φ = 1.618).

### Solving recurrences

| Recurrence | Solution |
|---|---|
| T(n) = T(n−1) + 1 | O(n) |
| T(n) = T(n−1) + n | O(n²) |
| T(n) = 2T(n−1) + 1 | O(2ⁿ) |
| T(n) = T(n/2) + 1 | O(log n) (binary search) |
| T(n) = T(n/2) + n | O(n) |
| T(n) = 2T(n/2) + 1 | O(n) |
| T(n) = 2T(n/2) + n | O(n log n) (merge sort) |
| T(n) = 2T(n/2) + n log n | O(n log² n) |
| T(n) = T(n−1) + log n | O(n log n) |
- **Master theorem**: T(n) = a·T(n/b) + f(n), compare f(n) with n^(log_b a): if f is smaller polynomially → Θ(n^(log_b a)); if equal → Θ(n^(log_b a) log n); if larger (and regularity holds) → Θ(f(n)).
- Example: T(n) = 4T(n/2) + n → n^(log₂4) = n² dominates → Θ(n²). T(n) = 3T(n/3) + n → Θ(n log n).

**⚡ Exam tip:** Naive Fibonacci is exponential (2ⁿ), Hanoi needs 2ⁿ − 1 moves, T(n) = 2T(n/2) + n is n log n — memorise these three.

## Quick Revision Sheet

- ADT = values + operations, implementation hidden; linear: array, list, stack, queue; non-linear: tree, graph.
- Growth order: 1 < log n < √n < n < n log n < n² < n³ < 2ⁿ < n! ; loop with i = i×2 is O(log n).
- Row-major A[i][j] = B + [(i−l1)×(no. of columns) + (j−l2)]×w; column-major uses (no. of rows) with j first.
- Lower triangular n×n stores n(n+1)/2 elements; tridiagonal 3n − 2.
- Stack = LIFO (push/pop at top, O(1)); applications: recursion, expression evaluation, DFS, parenthesis check, undo.
- Infix→postfix: pop operators with ≥ precedence; `^` right-assoc; (A+B)*C−D/E → AB+C*DE/−.
- Postfix evaluation: first popped operand is the right operand; prefix evaluated right-to-left.
- Queue = FIFO; circular queue: rear=(rear+1)%N, full when (rear+1)%N==front, capacity N−1.
- Priority queue best implemented by heap (insert/delete O(log n)); deque = insertion/deletion at both ends.
- Singly list: insert front O(1), delete last O(n); doubly list delete given node O(1); Floyd cycle detection O(1) space.
- Binary tree: leaves = n2 + 1; edges = n − 1; max nodes at level i = 2ⁱ; max nodes height h = 2^(h+1) − 1; null pointers = n + 1.
- Full binary tree with i internal nodes has i+1 leaves, 2i+1 nodes. Unique tree needs inorder + (pre or post).
- Number of binary trees / BSTs with n nodes = Catalan = (2n)!/((n+1)!n!): 1, 2, 5, 14, 42.
- BST inorder = sorted; BST search worst O(n); AVL balance factor ∈ {−1,0,1}; rotations LL, RR, LR, RL; min nodes AVL 1, 2, 4, 7, 12.
- Heap: parent i/2, children 2i, 2i+1; insert O(log n), build-heap O(n), heap sort O(n log n) not stable.
- B-tree order m: max m children, m−1 keys; min ⌈m/2⌉ children, ⌈m/2⌉ − 1 keys; B+ tree data only in linked leaves.
- Graph: max edges n(n−1)/2; Σdeg = 2E; matrix space V², list V+E; BFS queue, DFS stack, both O(V+E).
- MST has V−1 edges; Kruskal O(E log E), Prim O(V²) or O(E log V); Dijkstra no negative edges; Bellman-Ford O(VE); Floyd O(V³); topological sort only for DAG.
- Hashing: load factor α = n/m; linear probing → primary clustering, quadratic → secondary, double hashing best; chaining α may exceed 1.
- Sorting: bubble/insertion best O(n); selection always n(n−1)/2 comparisons; merge O(n log n) + O(n) space, stable; quick worst O(n²); heap O(1) space; counting O(n+k) stable.
- Binary search: sorted array only, max ⌊log₂ n⌋ + 1 comparisons; linear search O(n).
- Recursion: needs base case, uses call stack; naive fib O(2ⁿ); Hanoi 2ⁿ − 1; T(n)=2T(n/2)+n → O(n log n).
