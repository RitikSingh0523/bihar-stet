# Data Structures

> **What the exam asks:** about 8-12 questions per paper. Favourites: array address calculation (row/column-major), postfix/prefix conversion and evaluation, circular-queue formulas, linked-list operation costs, binary-tree counting formulas and traversals (build tree from pre+in), BST/AVL/heap insertions, B-tree order formulas, BFS/DFS order, MST weight, shortest path, hashing with collisions, sorting complexity table, and recursion output / recurrence.

## 1. ADT, Classification and Complexity

### Basics
- **Data structure**: a way of organising data in memory so that operations (insert, delete, search, traverse) are efficient.
- **Abstract Data Type (ADT)**: a mathematical model defined by its *values* and *operations*, with the implementation hidden. Examples: List, Stack, Queue, Deque, Priority Queue, Set, Map/Dictionary, Graph.
- ADT = "what" is done; data structure = "how" it is done. Stack ADT can be implemented by an array or a linked list.
- **Classification**
  - Primitive: int, char, float, boolean. Non-primitive: arrays, lists, trees, graphs, files.
  - **Linear** (elements in a sequence): array, linked list, stack, queue. **Non-linear**: tree, graph.
  - **Static** (fixed size, e.g. array) vs **dynamic** (grows/shrinks, e.g. linked list).
  - Homogeneous (array) vs heterogeneous (structure/record).

### Algorithm properties
- Input, output, definiteness, finiteness, effectiveness.
- **Time complexity**: number of basic operations as a function of input size n. **Space complexity**: extra memory used (input space + auxiliary space).

### Asymptotic notations

| Notation | Meaning | Bound |
|---|---|---|
| O(g) Big-Oh | f ≤ c·g for n ≥ n0 | upper bound (worst-case style) |
| Ω(g) Big-Omega | f ≥ c·g | lower bound |
| Θ(g) Theta | c1·g ≤ f ≤ c2·g | tight bound |
| o(g), ω(g) | strict (not tight) upper / lower | |

- Growth order (slow → fast):

```
1 < log n < √n < n < n log n < n² < n³ < 2ⁿ < n! < nⁿ
```
- Drop constants and lower-order terms: 5n² + 3n + 7 = Θ(n²).
- log₂ n, log₁₀ n differ only by a constant, so base is ignored in Big-O.

### Quick loop analysis
```
for (i = 1; i <= n; i++)       → O(n)
for (i = 1; i <= n; i = i*2)   → O(log n)   (i doubles)
for (i = n; i >= 1; i = i/2)   → O(log n)
for i in 1..n { for j in 1..n }→ O(n²)
for i in 1..n { for j in 1..i }→ n(n+1)/2 = O(n²)
for i in 1..n { for (j=1; j<=n; j*=2) } → O(n log n)
for (i = 1; i*i <= n; i++)     → O(√n)
```
- **Best / average / worst case**: the best case (e.g. key is first element) is Ω; worst case is usually quoted.
- **Amortized analysis**: average cost per operation over a sequence (e.g. dynamic array append is O(1) amortized).

**⚡ Exam tip:** A loop where the variable is multiplied or divided by a constant is O(log n); one where it is added to is O(n). Space complexity of an in-place algorithm is O(1).

## 2. Arrays

### Facts
- **Array**: a collection of homogeneous elements in *contiguous* memory, accessed by index. Random access in O(1).
- Insert/delete in the middle: O(n) (shifting). Search unsorted O(n); sorted + binary search O(log n).
- Number of elements of A[l..u] = u − l + 1. For A[l1..u1][l2..u2]: (u1−l1+1) × (u2−l2+1). For 3-D multiply three ranges.
- Examples: A[-3..4][2..6] has 8 × 5 = 40 elements; A[-2..3][1..4][0..2] has 6 × 4 × 3 = 72 elements.

### Address formulas (B = base address, w = element size)
```
1-D :  Loc(A[i])  = B + (i − l) × w
2-D row-major   :  Loc(A[i][j]) = B + [ (i − l1) × n2 + (j − l2) ] × w     n2 = no. of COLUMNS
2-D column-major:  Loc(A[i][j]) = B + [ (j − l2) × n1 + (i − l1) ] × w     n1 = no. of ROWS
3-D row-major   :  Loc(A[i][j][k]) = B + [ (i−l1)×n2×n3 + (j−l2)×n3 + (k−l3) ] × w
```
- Row-major: rows stored one after another (C, C++, Java, Python-numpy default). Column-major: columns one after another (FORTRAN, MATLAB).
- For 0-based arrays (l = 0) formulas reduce to B + (i×n2 + j)×w (row) and B + (j×n1 + i)×w (column).

### Worked examples
1. A[-5..20], B = 1000, w = 4. Loc(A[8]) = 1000 + (8 − (−5))×4 = 1000 + 52 = **1052**.
2. A[0..9][0..14] row-major, B = 500, w = 4. n2 = 15. Loc(A[6][7]) = 500 + (6×15 + 7)×4 = 500 + 388 = **888**.
3. A[1..4][1..5] column-major, B = 200, w = 2. n1 = 4. Loc(A[3][4]) = 200 + [(4−1)×4 + (3−1)]×2 = 200 + 28 = **228**.
4. A[1..100], A[40] at 2156 and A[1] at 2000 → w = 156/39 = 4, so Loc(A[75]) = 2000 + 74×4 = **2296**.
5. Finding w or B from two given addresses: subtract the two address-formulas to get w, then back-substitute.

### Special matrices (n × n)

| Type | Stored elements | Formula |
|---|---|---|
| Lower / upper triangular | n(n+1)/2 | 6×6 → 21 |
| Diagonal | n | |
| Tridiagonal | 3n − 2 | |
| Symmetric (store one triangle) | n(n+1)/2 | |

- Lower-triangular, row-wise, 1-based: A[i][j] (i ≥ j) is at position i(i−1)/2 + j in the 1-D array.
- **Sparse matrix**: most elements are zero; stored as triplets (row, col, value) → space 3 × (non-zero count) (+ a header row). Saves memory when non-zeros are few.
- Array limitations: fixed size, costly insertion/deletion, needs contiguous memory.

**⚡ Exam tip:** Always subtract the *lower bound* (index may start at −5 or 1, not 0), and check whether the question says row- or column-major before choosing n1 or n2 as the multiplier.

## 3. Stacks

### Basics
- **Stack**: LIFO list; insertion (**push**) and deletion (**pop**) only at one end, the **top**. `peek/top` reads the top.
- Array stack: `top = −1` means empty; `top = MAX−1` means full (**overflow**); pop on empty gives **underflow**.
- Push, pop, peek, isEmpty: all **O(1)**. Linked-list stack: push/pop at head, O(1), no overflow (until memory ends).
- **Applications**: function-call (activation record) stack and recursion, expression conversion/evaluation, parenthesis matching, undo/redo, backtracking, DFS, reversing a string, browser back button, syntax parsing in compilers.
- Implementing a queue with stacks needs **2 stacks** (enqueue O(1), dequeue amortised O(1); or the reverse). Stack with 2 queues is also possible.

### Stack-permutation rule
Input 1,2,3,…,n pushed in order, pops at any time. A pop sequence is impossible if it contains a pattern where k appears, then a smaller i, then j with i < j < k (e.g. 3 1 2). Number of valid permutations of n items = Catalan number C(2n,n)/(n+1) (n=3 → 5, n=4 → 14). Example for n = 4: 3 1 2 4 is **invalid**; 4 3 2 1, 1 2 3 4, 2 1 4 3 are valid.

### Expression notations

| Notation | Example (A+B) | Operator position |
|---|---|---|
| Infix | A + B | between operands |
| Prefix (Polish) | + A B | before |
| Postfix (Reverse Polish) | A B + | after |
- Prefix/postfix need no parentheses and no precedence rules.
- Precedence (high → low): `^` (right-associative) > `* / %` > `+ -` (others left-associative).

### Infix → Postfix (stack of operators)
1. Operand → output. 2. `(` → push. 3. `)` → pop to output until `(`; discard both.
4. Operator → pop while top has *higher or equal* precedence (for `^`: only higher, because right-assoc), then push.
5. End → pop everything.

**Worked 1:** (A+B)*C − D/E

| Symbol | Stack | Output |
|---|---|---|
| ( | ( | |
| A | ( | A |
| + | ( + | A |
| B | ( + | A B |
| ) | | A B + |
| * | * | A B + |
| C | * | A B + C |
| − | − (pop *) | A B + C * |
| D | − | A B + C * D |
| / | − / | A B + C * D |
| E | − / | A B + C * D E |
| end | | **A B + C * D E / −** |

**Worked 2:** A*(B+C)/D − E → `A B C + * D / E −`. Maximum stack depth during conversion = **3** (`*`, `(`, `+`).

**Worked 3:** A + B * C − D → `A B C * + D −`. A ^ B ^ C → `A B C ^ ^` (right-assoc). A − B − C → `A B − C −`.

### Infix → Prefix
Method 1 (reverse trick): reverse the infix string (swap `(` ↔ `)`), convert to postfix (for equal precedence *do not pop*, except `^` handled opposite), reverse result.
Method 2 (by hand): fully parenthesise, move each operator to the front of its bracket.
- A + B * C → + A * B C.  (A+B)*C → * + A B C.  A*B + C*D → + * A B * C D.

### Evaluating postfix (scan left → right)
Operand → push. Operator → pop **b** first (right operand), then **a**; push (a op b).
- `5 6 2 + * 12 4 / −`: 6+2=8; 5×8=40; 12/4=3; 40−3 = **37**.
- `2 3 1 * + 9 −`: 3×1=3; 2+3=5; 5−9 = **−4**.
- `8 2 3 ^ / 2 3 * + 5 −` : 2^3=8; 8/8=1; 2×3=6; 1+6=7; 7−5 = **2**.

### Evaluating prefix (scan right → left)
Operand → push. Operator → pop **a** first (left operand), then b; push (a op b).
- `− * + 4 3 2 5`: right-to-left: 4+3=7; 7×2=14; 14−5 = **9**.
- `+ * 2 3 4` = (2×3)+4 = 10.

### Parenthesis matching
Push every opening bracket; on a closing bracket pop and check type. Balanced if the stack is empty at the end. `{[()]}` balanced; `([)]` not.

**⚡ Exam tip:** In postfix evaluation the *first* popped operand is the right operand (matters for − and /). Postfix evaluation and infix→postfix both use a stack but of operands and operators respectively.

## 4. Queues

### Basics
- **Queue**: FIFO; insert (**enqueue**) at **rear**, delete (**dequeue**) at **front**. All operations O(1).
- Applications: CPU/job scheduling (round robin), printer spooling, BFS, buffers (keyboard, IO), call-centre, simulation. *Not* a queue application: balanced-parenthesis check, recursion (those use a stack).
- Linear array queue problem: after many enqueue/dequeue the front moves right and free space at the left is wasted although the queue is "full" (rear = MAX−1). Fix: **circular queue**.

### Circular queue (array of size N, indices 0..N−1)
```
enqueue :  rear  = (rear + 1) % N
dequeue :  front = (front + 1) % N
Full  (waste-one-slot convention):  (rear + 1) % N == front        → max N − 1 elements
Empty :  front == rear   (or front == −1 when using the count/−1 method)
No. of elements (rear = index of last element):  (rear − front + N) % N + 1
No. of elements (rear = next free slot)       :  (rear − front + N) % N
```
- Worked: N = 6, front = 4, rear = 1 (last element index) → (1 − 4 + 6) % 6 + 1 = 3 + 1 = **4** elements (indices 4,5,0,1).
- With N = 8 and the waste-one convention, capacity = **7**.
- Trace: enqueue 1,2,3; dequeue (1 out); enqueue 4; dequeue (2 out); enqueue 5 → queue (front→rear) = 3,4,5; front element = 3.

### Types

| Type | Description |
|---|---|
| Simple/linear queue | insert rear, delete front |
| Circular queue | last position connects to first |
| **Deque** (double-ended) | insert/delete at both ends |
| Input-restricted deque | insertion only at one end, deletion at both |
| Output-restricted deque | deletion only at one end, insertion at both |
| **Priority queue** | each element has a priority; highest (or lowest) removed first |

- Priority queue: implemented best by a **binary heap** — insert O(log n), extract-max/min O(log n), peek O(1). Using an unsorted array: insert O(1), delete O(n); sorted array: insert O(n), delete O(1). Equal priorities → FIFO order (usually).
- Deque can behave as both a stack and a queue.
- Queue with linked list: keep both `front` and `rear` pointers; enqueue at tail, dequeue at head, both O(1).
- Queue from two stacks: enqueue → push to S1; dequeue → if S2 empty, pop all S1 to S2; pop S2.

**⚡ Exam tip:** Circular queue "full" and "empty" give the same front==rear unless one slot is sacrificed — hence capacity N−1 and the formula (rear+1)%N == front.
