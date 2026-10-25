## 5. Linked Lists

### Basics
- **Linked list**: collection of nodes, each with `data` and pointer(s); nodes are non-contiguous and dynamically allocated. **Head** points to the first node; last node's next = NULL.
- **Singly**: one `next` pointer. **Doubly**: `prev` + `next` (traverse both directions). **Circular**: last node points back to the first (singly or doubly). **Header node** (dummy) simplifies edge cases.
- Memory per node: singly = data + 1 pointer; doubly = data + 2 pointers. A doubly list of n nodes stores 2n pointers.
- No random access: reaching the i-th node is O(i). No memory wasted by size over-allocation; extra memory for pointers.

### Complexity table (n nodes)

| Operation | Singly (head only) | Singly (head+tail) | Doubly (head+tail) | Array |
|---|---|---|---|---|
| Access i-th | O(n) | O(n) | O(n) | **O(1)** |
| Insert at beginning | O(1) | O(1) | O(1) | O(n) |
| Insert at end | O(n) | **O(1)** | O(1) | O(1) (if space) |
| Delete first | O(1) | O(1) | O(1) | O(n) |
| Delete last | O(n) | O(n) | **O(1)** | O(1) |
| Insert/delete after a *given node pointer* | O(1) | O(1) | O(1) | O(n) |
| Delete a *given node* (pointer only) | O(n) | O(n) | **O(1)** | O(n) |
| Search | O(n) | O(n) | O(n) | O(n) / O(log n) sorted |

- Singly list with a tail pointer: O(1) insertion at both front and rear, but deleting the last node is still O(n) (need predecessor).
- **Circular singly list with only a tail pointer**: insert at front, insert at rear, delete front are all O(1) (head = tail→next).
- Binary search on a linked list is not efficient (no random access) → O(n).

### Core code patterns
```
Insert at head:   new->next = head;  head = new;
Insert after p :  new->next = p->next;  p->next = new;
Delete after p :  t = p->next;  p->next = t->next;  free(t);
Doubly insert after p: n->next = p->next; n->prev = p;
                       p->next->prev = n; p->next = n;
Reverse (iterative, O(n) time, O(1) space):
   prev = NULL;  cur = head;
   while (cur) { nxt = cur->next; cur->next = prev; prev = cur; cur = nxt; }
   head = prev;
```
- Recursive reversal uses O(n) stack space.
- Order of pointer updates matters: set the new node's pointer *before* changing the existing links, else the rest of the list is lost.

### Classic techniques
- **Floyd's tortoise and hare**: slow moves 1, fast moves 2. If they meet → cycle; O(n) time, **O(1) space**.
- **Middle node**: when fast reaches the end, slow is at middle. For 9 nodes slow stops at the 5th node; for 10 nodes (fast ends at NULL) slow is at the 6th.
- Detect/locate the n-th node from the end: two pointers n apart.
- Merge two sorted lists: O(m+n). Merge sort is the best comparison sort for linked lists.
- **XOR linked list**: stores prev XOR next in one field (saves memory). **Skip list**: layered lists giving O(log n) average search.
- Applications: dynamic memory allocation, polynomial representation, adjacency lists, hash-table chaining, stack/queue implementations, music-player playlists (circular), undo (doubly), OS process scheduling (circular).

### Array vs linked list

| Array | Linked list |
|---|---|
| contiguous, fixed size | non-contiguous, dynamic |
| O(1) random access | O(n) access |
| costly insert/delete | O(1) given pointer |
| better cache locality | extra pointer memory |

**⚡ Exam tip:** "Deleting the last node of a singly linked list" is O(n) even with a tail pointer; "inserting at the front" is O(1) always. Doubly lists make delete-given-node and delete-last O(1).

## 6. Trees

### Terminology
- **Tree**: connected acyclic graph, hierarchical; n nodes ⇒ **n − 1 edges**.
- **Root**, **parent/child**, **siblings**, **leaf** (degree 0), **internal node**, **degree of node** (number of children), **degree of tree** (max node degree), **path**, **ancestor/descendant**.
- **Level**: root at level 0 (some books 1). **Depth of node** = edges from root. **Height of node** = edges on longest path down to a leaf. **Height of tree** = height of root; a single-node tree has height 0 (empty tree −1). If height is counted in nodes, add 1 — read the question.
- **Forest**: set of disjoint trees. **Subtree**, **ordered tree**.

### Binary tree types

| Type | Definition |
|---|---|
| Binary tree | each node ≤ 2 children (left, right) |
| **Full / strict** | every node has 0 or 2 children |
| **Complete** | all levels full except possibly last, which is filled left to right |
| **Perfect** | all internal nodes have 2 children and all leaves on same level |
| Skewed | every node has only one child (left- or right-skewed) |
| Balanced | height O(log n) |

### Formulas (root level 0, height h = edges)
```
Max nodes at level i                 = 2ⁱ
Max nodes in tree of height h        = 2^(h+1) − 1         (perfect tree)
Min nodes in tree of height h        = h + 1               (skewed)
Min height with n nodes              = ⌈log₂(n+1)⌉ − 1  =  ⌊log₂ n⌋  (complete tree)
Max height with n nodes              = n − 1
Leaves n0 = (nodes with 2 children n2) + 1
n = n0 + n1 + n2          edges = n − 1
Full binary tree: i internal nodes → leaves = i + 1, total = 2i + 1
Perfect tree with L leaves → total nodes 2L − 1, height log₂ L
Null pointers in a binary tree of n nodes = n + 1
Strict m-ary tree with i internal nodes: leaves = (m−1)·i + 1,  total = m·i + 1
```
- Worked: 24 leaves and 9 one-child nodes → n2 = 23 → total = 24 + 9 + 23 = **56**.
- Full binary tree with 5 internal nodes → 6 leaves → **11** nodes.
- If level counts from 1: max nodes at level i = 2^(i−1), max nodes up to level k = 2^k − 1.

### Representation
- **Array** (heap-style, 1-based): node i → left 2i, right 2i+1, parent ⌊i/2⌋. 0-based: left 2i+1, right 2i+2, parent ⌊(i−1)/2⌋. Wasteful for skewed trees (needs 2ⁿ−1 cells). Ideal for complete trees.
- **Linked**: node = (left, right, data) → 2 pointers per node.

### Traversals (depth-first)
```
Preorder  : Root, Left, Right      Inorder : Left, Root, Right      Postorder : Left, Right, Root
Level-order (BFS): level by level using a QUEUE
```
- All depth-first traversals O(n) time; space O(h) for stack.
- Inorder of a BST gives **sorted ascending** order.
- A binary tree is uniquely determined by **inorder + preorder** or **inorder + postorder**; preorder + postorder alone is *not* unique (unique only for full binary trees).

**Worked: construct from Pre = A B D E C F, In = D B E A F C.**
- Root A (first of preorder). Inorder split: left {D B E}, right {F C}.
- Left subtree: preorder B D E → root B; inorder D | B | E → left D, right E.
- Right subtree: preorder C F → root C; inorder F | C → left child F.
- Postorder = **D E B F C A**.

**Worked traversals** of tree: A with children B,C; B with D,E; C with right child F:
Pre A B D E C F; In D B E A C F; Post D E B F C A; Level A B C D E F.

### Binary Search Tree (BST)
- Left subtree keys < node < right subtree keys. Search/insert/delete: **O(h)** — average O(log n), worst O(n) (skewed, e.g. inserting sorted keys).
- Minimum = leftmost node; maximum = rightmost. Inorder successor = leftmost of right subtree.
- **Delete**: leaf → remove; one child → replace by child; two children → replace by inorder successor (or predecessor), then delete that node.
- Worked insert 50,30,70,20,40,60,80,35: 35 goes 50→30→40→left of 40. Height = **3** edges.
- Worked: insert 40,20,10,30,60,50,70 → perfect tree of height 2. Postorder = **10 30 20 50 70 60 40**; preorder = 40 20 10 30 60 50 70.
- Duplicate keys are usually not allowed.

### AVL tree (height-balanced BST)
- **Balance factor** = height(left) − height(right) ∈ {−1, 0, +1} for every node. Search/insert/delete **O(log n)** guaranteed. Height ≤ 1.44 log₂ n.
- Rotations (after insertion at the unbalanced node's...):

| Case | Imbalance | Fix |
|---|---|---|
| **LL** | inserted in left subtree of left child | single **right** rotation |
| **RR** | inserted in right subtree of right child | single **left** rotation |
| **LR** | inserted in right subtree of left child | left rotation on child, then right rotation on node |
| **RL** | inserted in left subtree of right child | right rotation on child, then left rotation on node |
- Worked: insert 10, 20, 30 → RR at 10 → left rotation → root 20, children 10 and 30. Insert 30, 20, 10 → LL → root 20. Insert 10, 30, 20 → RL → root 20.
- Insertion needs at most 1 rotation (single or double); deletion may need O(log n) rotations.
- **Minimum nodes** N(h) = N(h−1) + N(h−2) + 1 with N(0) = 1, N(1) = 2 (height in edges): 1, 2, 4, 7, 12, 20 → height 4 needs min **12** nodes. (If height counts nodes: 1, 2, 4, 7, 12 for heights 1..5.)
- Red-black tree: height ≤ 2 log₂(n+1); faster insertion/deletion, less strictly balanced. Splay tree: recently used node moved to root.

### Heap
- **Binary heap**: *complete* binary tree stored in an array. **Max-heap**: parent ≥ children (root = max). **Min-heap**: parent ≤ children.
- Operations: find-max O(1); insert (sift-up) **O(log n)**; delete-max (replace root by last, sift-down) **O(log n)**; **build-heap (bottom-up Floyd) O(n)**; heap sort O(n log n); search O(n).
- Height of heap with n nodes = ⌊log₂ n⌋. Leaves occupy indices ⌊n/2⌋+1 … n; internal nodes 1 … ⌊n/2⌋. Number of nodes at height h ≤ ⌈n / 2^(h+1)⌉.
- Worked insert (max-heap) 10, 20, 15, 30, 40: [10] → [20,10] → [20,10,15] → [30,20,15,10] → [40,30,15,10,20]. **Final: 40 30 15 10 20**.
- Worked build-heap of 4 10 3 5 1 (heapify from index ⌊n/2⌋ = 2 down to 1): node 10 ok; node 4 swaps with larger child 10 → [10,4,3,5,1]; then 4 swaps with 5 → **10 5 3 4 1**.
- Heap sort: build max-heap, then repeatedly swap root with last and sift-down: O(n log n) all cases, in place, **not stable**. Priority queues use heaps.
- Min element of a max-heap is among the leaves.

### B-tree and B+ tree (order m = max children)

| Property (B-tree of order m) | Value |
|---|---|
| Max children per node | m |
| Max keys per node | m − 1 |
| Min children (non-root internal) | ⌈m/2⌉ |
| Min keys (non-root) | ⌈m/2⌉ − 1 |
| Root | at least 2 children (1 key) unless it is a leaf |
| Leaves | all at the **same level** |
- Order 5: max 4 keys, min **2** keys (3 children) in a non-root node. Order 4 (2-3-4 tree): 1..3 keys.
- Grows upward (root splits); a node overflowing splits and the median key moves up. Height = O(log n); used in **databases and file systems** to reduce disk accesses.
- Alternative (Cormen) "minimum degree t": every non-root node has t−1 … 2t−1 keys.
- **B+ tree**: all records (data pointers) are only in **leaf nodes**; internal nodes hold only index keys (duplicated); leaves are **linked** as a list → efficient range queries and sequential access; search always goes root to leaf.
- B-tree: keys/data appear in internal nodes too; no leaf links.
- Other trees: **Trie** (prefix tree, strings), **segment tree**, **2-3 tree**, **Huffman tree** (full binary, optimal prefix codes; leaves = characters; n leaves → n−1 internal nodes).

### Threaded binary tree
- NULL pointers (there are n + 1 of them) are replaced by **threads** to the inorder predecessor (left NULL) / inorder successor (right NULL). Traversal without recursion or stack; faster. Types: single-threaded, double-threaded.

### Expression tree
- Leaves = operands, internal nodes = operators. Inorder → infix, preorder → prefix, postorder → postfix. Evaluate by postorder.

### Counting formulas (Catalan number C(n) = (2n)! / ((n+1)! n!))
```
C(0..6) = 1, 1, 2, 5, 14, 42, 132
Unlabelled binary trees with n nodes          = C(n)      (n=3 → 5, n=4 → 14)
Distinct BSTs with n distinct keys            = C(n)
Labelled binary trees (n distinct labels)     = C(n) × n!
Also: valid stack permutations, ways to parenthesise n+1 factors, full binary trees with n internal nodes
```

**⚡ Exam tip:** Remember leaves = n2 + 1, null pointers = n + 1, B-tree min keys = ⌈m/2⌉ − 1, AVL min nodes 1,2,4,7,12 and BST worst case O(n) — each appears in nearly every paper.

## 7. Graphs

### Terminology
- **Graph** G = (V, E). Undirected (unordered pairs) / directed (digraph, ordered pairs). Weighted / unweighted.
- **Degree** (undirected); in-degree / out-degree (directed). Σ degrees = **2E**; in a digraph Σ in-degree = Σ out-degree = E.
- **Path**, **cycle**, **simple path**, **connected** (path between every pair), **strongly connected** (digraph, both directions), **tree** = connected acyclic, **DAG** = directed acyclic, **complete graph Kₙ**, **bipartite**, **subgraph**, **self-loop**, **parallel edges**.
- Max edges: undirected simple **n(n−1)/2** (K₇ → 21); directed simple n(n−1).
- A connected graph has ≥ n−1 edges; a graph with n vertices and ≥ n edges that is connected has a cycle; a forest with c components has n − c edges.
- **Euler circuit** exists iff connected and all degrees even; Euler path iff exactly 0 or 2 odd-degree vertices. **Hamiltonian** cycle visits every vertex once (no simple condition).
- Number of spanning trees of Kₙ = n^(n−2) (Cayley). Handshake: number of odd-degree vertices is even.

### Representations

| | Adjacency matrix | Adjacency list |
|---|---|---|
| Space | O(V²) | O(V + E) |
| Edge (u,v) exists? | O(1) | O(deg u) |
| List all neighbours of u | O(V) | O(deg u) |
| Best for | dense graphs | sparse graphs |
- Undirected matrix is symmetric; number of 1s = **2E** (8 vertices, 11 edges → 22). Digraph: number of 1s = E. Adjacency list stores 2E nodes (undirected) or E (directed).
- Also: incidence matrix (V × E), edge list. Matrix power Aᵏ[i][j] = number of walks of length k.

### Traversals
- **BFS**: uses a **queue**, visits level by level, O(V + E) with list (O(V²) with matrix). Gives shortest path (fewest edges) in unweighted graph; finds connected components.
- **DFS**: uses a **stack** (or recursion), goes deep first, O(V + E). Used for cycle detection, topological sort, connected/strongly connected components, maze solving, articulation points.
- Worked: digraph 1:{2,3}, 2:{4}, 3:{4}, 4:{} from vertex 1 (ascending neighbours): **BFS = 1 2 3 4; DFS = 1 2 4 3**.
- Number of connected components: run BFS/DFS from each unvisited vertex, count the runs.
- DFS edge types (directed): tree, back (→ cycle), forward, cross. Undirected DFS: tree and back edges only. Digraph has a cycle iff DFS finds a back edge.

### Minimum Spanning Tree (MST)
- **Spanning tree**: subgraph with all V vertices, connected, acyclic → exactly **V − 1 edges**. MST: minimum total weight. If all weights are distinct MST is unique.
- **Kruskal** (greedy, edges): sort edges ascending, add edge if it does not form a cycle (Union-Find). **O(E log E) = O(E log V)**. Good for sparse graphs.
- **Prim** (greedy, vertices): grow a tree from a start vertex, always add the cheapest edge leaving the tree. **O(V²)** with matrix; **O(E log V)** with binary heap.
- **Worked** edges: A-B 4, A-C 2, B-C 1, B-D 5, C-D 8, C-E 10, D-E 2, D-F 6, E-F 3.
  Kruskal sorted: BC 1 ✓, AC 2 ✓, DE 2 ✓, EF 3 ✓, AB 4 ✗ (cycle A-B-C), BD 5 ✓ (joins {A,B,C} and {D,E,F}). MST weight = 1+2+2+3+5 = **13** (5 edges for 6 vertices).

### Shortest paths

| Algorithm | Problem | Time | Negative edges |
|---|---|---|---|
| **Dijkstra** | single source, greedy | O(V²) / O((V+E) log V) heap | **not allowed** |
| **Bellman-Ford** | single source, relax all edges V−1 times | **O(VE)** | allowed; detects negative cycle |
| **Floyd-Warshall** | all pairs, DP | **O(V³)** | allowed (no negative cycle) |
| BFS | unweighted single source | O(V+E) | – |
- Floyd: d[i][j] = min(d[i][j], d[i][k] + d[k][j]) for k = 1..V. Space O(V²).
- Relaxation: if d[u] + w(u,v) < d[v] then d[v] = d[u] + w(u,v).
- **Worked Dijkstra** (undirected S-A 4, S-B 1, B-A 2, A-C 1, B-C 5): d(S)=0 → pick B (1); relax A = min(4, 1+2) = 3, C = 6 → pick A (3); relax C = min(6, 3+1) = 4 → shortest S→C = **4** via S-B-A-C.

### Topological sort
- Linear ordering of a **DAG** so that for every edge u→v, u comes before v. Exists iff the graph has no cycle. O(V + E).
- **Kahn's algorithm**: repeatedly remove a vertex of in-degree 0 (queue). **DFS method**: output vertices in decreasing finishing time (reverse postorder).
- A DAG can have more than one topological order. Applications: task scheduling, build order, course prerequisites.
- Strongly connected components: Kosaraju / Tarjan, O(V + E).

**⚡ Exam tip:** BFS ⇒ queue, DFS ⇒ stack; Dijkstra fails with negative weights; Kruskal picks edges, Prim picks vertices; adjacency-matrix space is V² regardless of edges.
