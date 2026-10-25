
---

## 4. Process Synchronisation

### 4.1 Critical-section problem
- **Race condition:** result depends on interleaving of operations on shared data (e.g. `counter++` and `counter--` executed concurrently – each is 3 machine instructions: load, modify, store).
- **Critical section (CS):** code segment that accesses shared resources and must not be executed by more than one process at a time. Structure of a process:
```
do {
    entry section        // request permission
        critical section
    exit section         // release
        remainder section
} while (true);
```
- A correct solution must satisfy three requirements:
  1. **Mutual exclusion** – only one process in its CS at a time.
  2. **Progress** – if no process is in the CS, only processes outside their remainder sections decide who enters next, and this decision cannot be postponed indefinitely.
  3. **Bounded waiting** – a bound on the number of times others enter the CS after a process has requested entry (no starvation).
- (No assumption about relative speed or number of CPUs.)

### 4.2 Peterson's solution (2 processes, software)
Shared: `int turn; boolean flag[2];`
```
// process Pi  (j = 1 - i)
flag[i] = true;       // I want to enter
turn = j;             // but let the other go first
while (flag[j] && turn == j);   // busy wait
    // critical section
flag[i] = false;
```
- Satisfies **mutual exclusion, progress and bounded waiting**. Uses busy waiting (**spinlock**). Works only for two processes; may fail on modern hardware without memory barriers.
- Other software ideas: **strict alternation** (`turn` only) violates *progress*; **flag-only** approach can deadlock.

### 4.3 Hardware support
- **Disable interrupts** – works only on a single processor; inefficient for multiprocessors.
- **Atomic instructions:** **TestAndSet(lock)** and **Swap(a, b)** – execute indivisibly. TestAndSet lock gives mutual exclusion but not bounded waiting (unless extended). Also **Compare-and-Swap**.
```
boolean TestAndSet(boolean *target) { boolean r = *target; *target = true; return r; }
do { while (TestAndSet(&lock)); /* CS */ lock = false; } while (true);
```

### 4.4 Semaphores
- **Semaphore S** = integer variable accessed only through two **atomic** operations (Dijkstra):
```
wait(S)   / P(S) / down :   while (S <= 0) ;   S = S - 1;
signal(S) / V(S) / up   :   S = S + 1;
```
- **Binary semaphore (mutex lock):** value 0 or 1; used for mutual exclusion. **Counting semaphore:** any non-negative range; controls access to a resource with N identical instances (initialise S = N).
- With a **blocking implementation**, a waiting process is put in the semaphore's queue (not busy-waiting): `wait`: S−−; if S < 0 block. `signal`: S++; if S ≤ 0 wake one process. A negative value of S = number of waiting processes.
- Mutual exclusion with semaphore: initialise `mutex = 1`; `wait(mutex); CS; signal(mutex);`.
- Order enforcement: S1 before S2 → `sync = 0`; P1: `S1; signal(sync);` P2: `wait(sync); S2;`.
- **Mistakes:** `signal(mutex) … wait(mutex)` (order reversed) → mutual exclusion violated; `wait … wait` → **deadlock**.
- **Semaphore value question:** initial S = 1; after 5 `wait` and 3 `signal`... final = 1 − 5 + 3 = −1 (meaning 1 process blocked). Final value = init − (#P) + (#V) (for completed operations).
- **Spinlock:** semaphore/lock with busy waiting; wastes CPU but no context switch – good for very short critical sections on multiprocessors.
- **Mutex** = ownership (the locker must unlock); **semaphore** = signalling mechanism, no ownership.

### 4.5 Classic synchronisation problems
**(a) Bounded-Buffer (Producer–Consumer):** buffer of N slots. Semaphores: `mutex = 1`, `empty = N`, `full = 0`.
```
Producer:  wait(empty); wait(mutex);  add item;     signal(mutex); signal(full);
Consumer:  wait(full);  wait(mutex);  remove item;  signal(mutex); signal(empty);
```
(Swapping `wait(empty)` and `wait(mutex)` in the producer can deadlock.)

**(b) Readers–Writers:** many readers may read together; a writer needs exclusive access. *First* readers–writers problem: no reader waits unless a writer is already writing (writers may starve). *Second*: once a writer is waiting it gets priority (readers may starve). Uses `rw_mutex = 1`, `mutex = 1`, `read_count = 0`.

**(c) Dining Philosophers:** 5 philosophers, 5 chopsticks (each a semaphore = 1); each needs two to eat. Naive "pick left then right" can **deadlock** (all pick left). Fixes: allow at most 4 philosophers at the table; pick up both chopsticks only if both available (inside a CS); **asymmetric** solution (odd philosopher picks left first, even picks right first); resource ordering. Also risk of **starvation**.

**(d) Sleeping Barber** and **Cigarette smokers** – other classic problems (barber shop with N chairs).

### 4.6 Monitors
- **Monitor:** high-level language construct (abstract data type) that provides mutual exclusion automatically – **only one process can be active inside the monitor at a time**. Shared variables + procedures + initialisation code are encapsulated. Easier and less error-prone than semaphores. (Java `synchronized`.)
- **Condition variables** `x` with `x.wait()` (suspend the caller) and `x.signal()` (resume exactly one suspended process; no effect if none waits – unlike a semaphore signal, which is remembered).
- Variants: signal-and-wait, signal-and-continue.

### 4.7 Other terms
- **Busy waiting** – process loops while waiting, consuming CPU. **Starvation** – indefinite waiting. **Livelock** – processes keep changing state but make no progress.
- **Lock** types: mutex, spinlock, read-write lock. **Barrier** – all threads wait until all reach a point. **Atomic operation** – indivisible.

**⚡ Exam tip:** Three CS requirements = mutual exclusion, progress, bounded waiting. Semaphore `wait` = P = down (decrement); `signal` = V = up (increment). Producer–consumer: `empty = N`, `full = 0`, `mutex = 1`. Dining philosophers naive solution → deadlock. Peterson = 2 processes, satisfies all 3 conditions.

---

## 5. Deadlocks

### 5.1 Definition and conditions
- **Deadlock:** a set of processes each holding resources and waiting for a resource held by another process in the set – none can proceed.
- Resource use: **request → use → release**. Resource types: **preemptable** (CPU, memory) vs **non-preemptable** (printer, tape).
- **Four necessary (Coffman) conditions – all must hold simultaneously:**
  1. **Mutual exclusion** – a resource is held in non-sharable mode.
  2. **Hold and wait** – a process holds ≥ 1 resource while waiting for others.
  3. **No preemption** – a resource can be released only voluntarily by its holder.
  4. **Circular wait** – P₀ waits for P₁, P₁ for P₂ … Pₙ waits for P₀.
- **Starvation** ≠ deadlock (starved process is not blocked in a cycle; others progress). **Livelock** also different.

### 5.2 Resource Allocation Graph (RAG)
- Vertices: processes (circles), resources (rectangles with dots = instances). **Request edge** P → R; **Assignment edge** R → P. **Claim edge** (dashed) P ⇢ R (for avoidance).
- **No cycle** → no deadlock.
- **Cycle and every resource has a single instance** → **deadlock** (necessary and sufficient).
- **Cycle with multiple instances** → *possible* deadlock (necessary but not sufficient).
- **Wait-for graph:** collapse RAG (single instance resources) by removing resource nodes; cycle ⇒ deadlock.

### 5.3 Handling deadlocks – four approaches
1. **Prevention** – ensure at least one of the four conditions can never hold.
2. **Avoidance** – dynamically check that granting a request keeps the system in a **safe state** (needs advance information about maximum needs).
3. **Detection and recovery** – allow deadlock, detect it, and recover.
4. **Ignore (Ostrich algorithm)** – pretend it never occurs; used by **Unix and Windows** (cost of prevention too high).

### 5.4 Deadlock prevention

| Condition attacked | Method | Drawback |
|---|---|---|
| Mutual exclusion | make resources sharable (read-only files), spooling | impossible for printers etc. |
| Hold and wait | request all resources at the start, or release all before requesting new | low utilisation, starvation |
| No preemption | if a request fails, release held resources (preempt); resources preempted are added to waiting list | works for CPU/memory only |
| **Circular wait** | impose a **total ordering** of resource types; request only in increasing order | most practical; |

### 5.5 Deadlock avoidance
- **Safe state:** there exists a **safe sequence** ⟨P₁…Pₙ⟩ so that each Pᵢ's remaining need can be met by Available + resources held by all Pⱼ with j < i. **Safe ⇒ no deadlock. Unsafe ⇒ deadlock *possible* (not certain).** Deadlock ⊂ Unsafe.
- Single-instance resources: **RAG algorithm with claim edges** (grant request only if converting it to an assignment edge doesn't create a cycle).
- Multiple instances: **Banker's algorithm** (Dijkstra). Data (n processes, m resource types):
  - `Available[m]`, `Max[n][m]`, `Allocation[n][m]`, **`Need = Max − Allocation`**.
- **Safety algorithm:** Work = Available; Finish[i] = false. Find i with Finish[i] = false and Need[i] ≤ Work; then Work = Work + Allocation[i], Finish[i] = true; repeat. If all Finish = true → safe.
- **Resource-request algorithm:** request ≤ Need (else error), request ≤ Available (else wait); pretend to allocate (Available −= req; Allocation += req; Need −= req); run safety algorithm; if safe → grant, else roll back and wait.
- Time complexity of safety algorithm: O(m·n²).

**Worked example (Banker's).** 5 processes, resources A, B, C with total instances 10, 5, 7.

| P | Allocation (A B C) | Max (A B C) | Need = Max − Alloc |
|---|---|---|---|
| P0 | 0 1 0 | 7 5 3 | 7 4 3 |
| P1 | 2 0 0 | 3 2 2 | 1 2 2 |
| P2 | 3 0 2 | 9 0 2 | 6 0 0 |
| P3 | 2 1 1 | 2 2 2 | 0 1 1 |
| P4 | 0 0 2 | 4 3 3 | 4 3 1 |

Total allocated = (7, 2, 5) → **Available = (10,5,7) − (7,2,5) = (3, 3, 2)**.
- Work = (3,3,2). P0 needs (7,4,3) > Work ✗. **P1** (1,2,2) ≤ (3,3,2) ✓ → Work = (3,3,2)+(2,0,0) = (5,3,2).
- **P3** (0,1,1) ≤ (5,3,2) ✓ → Work = (5,3,2)+(2,1,1) = (7,4,3).
- P4 (4,3,1) ≤ (7,4,3) ✓ → Work = (7,4,3)+(0,0,2) = (7,4,5).
- P0 (7,4,3) ≤ (7,4,5) ✓ → Work = (7,5,5).
- P2 (6,0,0) ≤ (7,5,5) ✓ → Work = (10,5,7).
- **Safe sequence: ⟨P1, P3, P4, P0, P2⟩** (others like ⟨P1, P3, P4, P2, P0⟩ are also valid) → system is **safe**.
- Request: P1 asks (1,0,2): ≤ Need (1,2,2) ✓, ≤ Available (3,3,2) ✓. After pretend allocation Available = (2,3,0), P1 Alloc (3,0,2), Need (0,2,0); the system is still safe (e.g. ⟨P1, P3, P4, P0, P2⟩) → granted.

**Quick pattern:** single resource type, n processes each needing max k: deadlock-free if resources R ≥ n(k − 1) + 1. Example: 3 processes each needing 2 units → minimum resources for guaranteed deadlock-freedom = 3(2−1)+1 = **4**.

### 5.6 Deadlock detection and recovery
- **Detection:** for single instance, search for a cycle in the **wait-for graph** (O(n²)); for multiple instances, use a Banker-like algorithm with the current **Request** matrix instead of Need. Frequency: every request, or periodically/when CPU utilisation drops.
- **Recovery:**
  - **Process termination:** abort **all** deadlocked processes (costly) or abort **one at a time** until the cycle breaks (choose by priority, run time, resources held, number of resources needed, interactive vs batch).
  - **Resource preemption:** select victim (minimise cost), **rollback** the process to a safe state, avoid **starvation** (same victim repeatedly) by counting rollbacks.

**⚡ Exam tip:** Four conditions = **M**utual exclusion, **H**old & wait, **N**o preemption, **C**ircular wait. Prevention removes ≥ one; avoidance = Banker's (needs max claims); cycle in single-instance RAG = deadlock, in multi-instance = only maybe. Need = Max − Allocation. Safe state ⇒ no deadlock; unsafe ≠ deadlock necessarily. Unix/Windows use the Ostrich approach.

---

## 6. Memory Management

### 6.1 Basics
- Program must be brought into main memory (RAM) to run. CPU accesses RAM directly; **cache** sits between CPU and RAM. Hierarchy (fast → slow, small → large): registers → cache → RAM → SSD/disk → tape.
- **Address binding** (symbolic → absolute): at **compile time** (absolute code, must know location), **load time** (relocatable code), **run time** (needs hardware support – MMU; used by modern OS).
- **Logical (virtual) address:** generated by CPU. **Physical address:** seen by memory unit. Compile/load-time binding → same; **execution-time binding → different**. **MMU** (Memory Management Unit) maps logical → physical.
- Simple MMU: **relocation (base) register** + **limit register**. Physical = logical + base; if logical ≥ limit → **trap** (addressing error).
- **Dynamic loading:** load a routine only when called. **Dynamic linking:** linking postponed until run time (shared libraries, DLL). **Overlays:** keep only needed instruction sets in memory (user-programmer managed). **Swapping:** temporarily move a process out of RAM to **backing store** (disk) and bring it back later (**roll out / roll in**); it enables higher degree of multiprogramming; swap time is dominated by transfer time (∝ process size).

### 6.2 Contiguous memory allocation
- **Fixed (static) partitioning:** memory divided into fixed-size partitions at boot; degree of multiprogramming bounded; causes **internal fragmentation**.
- **Variable (dynamic) partitioning:** partition created exactly to process size; causes **external fragmentation** over time. Free blocks = **holes**.
- **Placement strategies:**
  - **First fit** – first hole big enough (fast).
  - **Next fit** – first fit but starting where the last search ended.
  - **Best fit** – smallest hole that fits (needs search; leaves tiny useless holes).
  - **Worst fit** – largest hole (leaves large leftover; usually worst performance).
  - First fit and best fit are generally better than worst fit in time and utilisation.

**Worked example.** Holes (in order): 100K, 500K, 200K, 300K, 600K. Place processes 212K, 417K, 112K, 426K in order.
- **First fit:** 212→500 (hole left 288), 417→600 (183 left), 112→288 (176 left), **426 must wait** (no hole ≥ 426).
- **Best fit:** 212→300, 417→500, 112→200, 426→600 → **all placed** (best fit most efficient here).
- **Worst fit:** 212→600 (388), 417→500 (83), 112→388 (276), 426 waits.

### 6.3 Fragmentation

| | Internal | External |
|---|---|---|
| Meaning | unused space **inside** an allocated block/partition | free memory exists in total but is **scattered** in non-contiguous holes |
| Occurs in | fixed partitioning, **paging** (last page), buddy system | **variable partitioning, segmentation** |
| Solution | smaller/better-fitting blocks | **Compaction** (shuffle to merge holes; needs dynamic relocation), **paging/segmentation with paging** |
- **50-percent rule:** with first fit, for N allocated blocks about N/2 blocks are lost to fragmentation (⅓ of memory unusable).
- Paging has **no external fragmentation** but has **internal fragmentation** (average half a page per process).

### 6.4 Paging
- Physical memory divided into fixed-size **frames**; logical memory into same-size **pages** (power of 2, typically 4 KB). **Page table** maps page number → frame number; one per process (PTBR = Page Table Base Register points to it; stored in PCB).
- Logical address = **page number (p) | page offset (d)**. For logical address space 2ᵐ and page size 2ⁿ: p has **m − n** bits, d has **n** bits. Physical address = frame number × page size + offset.
```
CPU --> [ p | d ] --> page table[p] = f --> [ f | d ] --> physical memory
```
- **Worked example.** Page size = 1 KB (1024). Logical address 3172: p = 3172 / 1024 = 3, d = 3172 mod 1024 = 100. If page table[3] = frame 7 → physical = 7 × 1024 + 100 = **7268**.
- **Page-table size:** 32-bit logical addresses, 4 KB pages → p = 20 bits, d = 12 bits → 2²⁰ = 1M entries; with 4-byte entries → **4 MB per process**. Number of pages = logical address space / page size; number of frames = physical memory / page size.
- Page table entry (PTE) also holds: **valid/invalid bit**, **protection bits (r/w/x)**, **reference bit**, **dirty/modify bit**, caching bits.
- Paging separates the user's view (contiguous) from physical memory (scattered); **no external fragmentation**; supports **page sharing** (shared code, e.g. editors – reentrant code is read-only).
- **Large page tables** solutions: **hierarchical (multi-level) paging** (page the page table; two-level for 32-bit), **hashed page table**, **inverted page table** (one entry per **frame**, with (pid, page) – saves memory but slow search; uses hash to speed).

### 6.5 TLB and Effective Access Time
- **TLB (Translation Look-aside Buffer):** small, fast **associative cache** of recent page→frame translations (stores page number and frame number). If page in TLB → **TLB hit**: 1 memory access. **TLB miss:** consult the page table in memory (extra memory access), then update TLB.
- Some TLBs store **ASIDs** (address-space identifiers); otherwise TLB must be **flushed on a context switch**.
- **Hit ratio (α)** = fraction of references found in TLB.
```
EAT = α (t_TLB + t_mem) + (1 − α)(t_TLB + 2·t_mem)
```
(Single-level page table; if TLB lookup time is ignored: EAT = α·t_mem + (1−α)·2·t_mem.)
- **Worked example.** α = 80%, TLB search = 20 ns, memory = 100 ns: EAT = 0.8 × (20 + 100) + 0.2 × (20 + 200) = 96 + 44 = **140 ns**. With α = 98%: 0.98 × 120 + 0.02 × 220 = **122 ns**.
- Two-level paging: a miss costs 3 memory accesses → EAT = α(t + m) + (1−α)(t + 3m).

### 6.6 Segmentation
- Memory management scheme that supports the **user's view**: a program = collection of **segments** (main, functions, stack, symbol table, arrays), each of **variable length**.
- Logical address = **⟨segment number s, offset d⟩**. **Segment table** entry: **base** (starting physical address) and **limit** (length). If d ≥ limit → **trap**; else physical = base + d.
- **Worked example.** Segment 2: base 4300, limit 400. Address (2, 53) → 4300 + 53 = **4353**. Address (2, 500) → 500 ≥ 400 → **trap (illegal)**.
- Causes **external fragmentation**, no internal fragmentation; supports sharing and protection per segment.

| Paging | Segmentation |
|---|---|
| fixed-size pages | variable-size segments |
| invisible to the programmer (OS decided) | visible to the programmer (logical units) |
| internal fragmentation | external fragmentation |
| page table (p→f) | segment table (base, limit) |
| single address (p, d) | (s, d) |
- **Segmentation with paging** (Intel x86, MULTICS): each segment is paged → removes external fragmentation.
- **Buddy system:** memory allocated in power-of-2 blocks; splits/merges "buddies" (internal fragmentation).

**⚡ Exam tip:** Paging → internal fragmentation, no external; segmentation → external only; compaction solves external fragmentation. Page-number bits = log₂(address space / page size). EAT = α(t+m) + (1−α)(t+2m). Best fit = smallest sufficient hole; worst fit = largest hole. Page table maps **page → frame**; TLB is a hardware cache for the page table.
