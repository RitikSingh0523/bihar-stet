## 6. Functional Dependencies & Normalization

### Why normalize?
- **Normalization** = organising data into well-structured tables to **reduce redundancy** and avoid anomalies (the standard "primary purpose" answer: reduce data redundancy / improve integrity).
- Anomalies in a badly designed table: **insertion** (cannot add a fact without another), **deletion** (deleting one fact loses another), **update/modification** (change must be made in many rows -> inconsistency).
- Denormalization = deliberately adding redundancy to speed up reads (warehouses).

### Functional dependency (FD)
- **X → Y** (Y functionally dependent on X): whenever two tuples agree on X they agree on Y. X = determinant.
- **Trivial FD**: Y ⊆ X (e.g. AB → A). **Non-trivial**: Y ⊄ X. **Completely non-trivial**: X ∩ Y = ∅.
- Types: **full** dependency (Y depends on whole of composite X, not any proper subset); **partial** (depends on part of the candidate key); **transitive** (X → Y, Y → Z, Y not a key, so X → Z); **multivalued** X ↠ Y.

### Armstrong's axioms (sound and complete)
1. **Reflexivity**: if Y ⊆ X then X → Y.
2. **Augmentation**: if X → Y then XZ → YZ.
3. **Transitivity**: if X → Y and Y → Z then X → Z.
Derived rules: **Union** (X→Y, X→Z ⇒ X→YZ); **Decomposition** (X→YZ ⇒ X→Y, X→Z); **Pseudo-transitivity** (X→Y, WY→Z ⇒ WX→Z); **Composition**.
- Note: X → Y and X → Z can be merged; but **XY → Z does not imply X → Z**.

### Attribute closure X⁺ (most-asked numeric)
Algorithm: start with X⁺ = X; repeatedly add RHS of any FD whose LHS ⊆ X⁺ until nothing changes.
- X is a **super key** iff X⁺ = all attributes; a **candidate key** if additionally minimal.
- X → Y holds iff Y ⊆ X⁺.

**Worked example 1:** R(A,B,C,D,E), F = { A→B, BC→D, D→E }. Find (AC)⁺.
```
start         {A,C}
A→B           {A,B,C}
BC→D          {A,B,C,D}
D→E           {A,B,C,D,E}   = all attributes
```
So AC is a super key; neither A⁺={A,B} nor C⁺={C} is all, so **AC is a candidate key** (and the only one: A and C never appear on any RHS, so every key must contain A and C).

**Worked example 2 (finding candidate keys):** R(A,B,C,D), F = { A→B, B→C, C→D }.
- Attributes never on a RHS must be in every key: A. A⁺ = {A,B,C,D} -> **A is the only candidate key**.
- Shortcut: attributes on LHS only = must be in key; on RHS only = never in key; in both = maybe.

**Worked example 3:** R(A,B,C,D), F = { AB→C, C→D, D→A }. Keys: AB⁺ = {A,B,C,D} yes; CB⁺ = {C,B,D,A} yes; DB⁺ = {D,B,A,C} yes. Candidate keys: **AB, BC, BD** (B is never on a RHS so it is in every key).

- **Equivalence of FD sets**: F ≡ G if each covers the other (F⁺ = G⁺).
- **Canonical / minimal cover**: (1) single attribute on every RHS, (2) no extraneous attribute on any LHS, (3) no redundant FD.

### Normal forms

| NF | Condition | Removes |
|---|---|---|
| **1NF** | all attribute values **atomic** (no repeating groups / multivalued / composite); every row unique | multivalued attributes |
| **2NF** | 1NF + **no partial dependency** (no non-prime attribute depends on part of a candidate key) | partial dependencies |
| **3NF** | 2NF + **no transitive dependency** of non-prime attribute on key. Formal: for every FD X→A, X is a super key **or** A is a prime attribute | transitive dependencies |
| **BCNF** (3.5NF, Boyce-Codd) | for every non-trivial FD X → Y, **X is a super key** | any determinant that is not a key |
| **4NF** | BCNF + no non-trivial **multivalued dependency** (X ↠ Y) unless X is a super key | MVDs |
| **5NF** (PJNF) | no join dependency not implied by candidate keys | join dependencies |
- Hierarchy: 1NF ⊃ 2NF ⊃ 3NF ⊃ BCNF ⊃ 4NF ⊃ 5NF (each is stricter). **Prime attribute** = part of some candidate key; **non-prime** = not in any key.
- A relation with only **simple (single-attribute) candidate keys** and in 1NF is automatically in **2NF** (no partial dependency possible). A relation with **two attributes** is always in BCNF. A relation where all attributes are prime is in 3NF.
- Any relation can be decomposed into 3NF **lossless + dependency preserving**; BCNF is always **lossless** but may **not preserve dependencies**.

### Worked examples
**(a) 2NF violation.** ENROLL(StudentID, CourseID, StudentName, Grade), key (StudentID, CourseID); StudentID → StudentName is a partial dependency. Decompose: STUDENT(StudentID, StudentName); ENROLL(StudentID, CourseID, Grade).

**(b) 3NF violation.** EMP(EmpID, DeptID, DeptName), EmpID → DeptID → DeptName (transitive). Decompose: EMP(EmpID, DeptID); DEPT(DeptID, DeptName).

**(c) 3NF but not BCNF.** R(A,B,C), F = { AB → C, C → B }. Candidate keys: AB and AC. C → B has C not a super key (violates BCNF), but B is prime (in key AB), so 3NF holds. Highest form = **3NF**. BCNF decomposition: R1(C,B), R2(A,C) - lossless but AB → C is lost (not dependency preserving).

**(d) Highest normal form of R(A,B,C,D), F = {AB→C, B→D}**: key AB; B → D is partial -> **1NF only**.

### Decomposition
- **Lossless-join (non-additive)**: joining the decomposed relations gives back exactly the original (no spurious tuples). Test for binary decomposition R → R1, R2: lossless iff **(R1 ∩ R2) → R1 or (R1 ∩ R2) → R2** (common attributes form a key of one of them).
- **Dependency-preserving**: every FD of F can be enforced on individual decomposed relations (union of projected FDs ≡ F).
- Goals: lossless always required; dependency preservation desirable. Example above: R(A,B,C) with AB→C, C→B -> BCNF decomposition loses AB→C.
- Lossy example: R(A,B,C) with only B → C ... decompose into R1(A,B) and R2(B,C): common B -> R2 (B→C) -> lossless. Decompose into R1(A,B), R2(A,C) with no FD from A: lossy.

### Multivalued dependency & 4NF
- X ↠ Y when for one X value there is a set of Y values independent of the other attributes. Example: COURSE(Course, Teacher, Book) with Course ↠ Teacher and Course ↠ Book -> decompose into (Course,Teacher) and (Course,Book) for 4NF.

**⚡ Exam tip:** 1NF = atomic values; 2NF = no partial dependency; 3NF = no transitive dependency; BCNF = every determinant is a candidate/super key. Normalization **reduces redundancy**. 3NF can always be lossless + dependency preserving; BCNF may lose dependencies.

## 7. Transactions, Concurrency & Recovery

### Transaction & ACID
- **Transaction** = a logical unit of work (sequence of read/write operations) that takes the database from one consistent state to another. States: **active -> partially committed -> committed**; or active -> **failed -> aborted** (rolled back).

| Property | Meaning | Ensured by |
|---|---|---|
| **A**tomicity | all-or-nothing | recovery manager (undo via log) |
| **C**onsistency | database moves from a valid state to another valid state (constraints preserved) | programmer + DBMS integrity checks |
| **I**solation | concurrent transactions behave as if executed serially; intermediate results hidden | concurrency control (locks) |
| **D**urability | committed changes survive crashes | log, redo, stable storage |
- Classic example: bank transfer Rs 500 from A to B = read A, A-=500, write A, read B, B+=500, write B. Failure after the first write -> atomicity requires rollback. Total A+B unchanged = consistency.
- Operations: read(X), write(X), commit, rollback/abort.

### Concurrency problems (without control)

| Problem | Cause |
|---|---|
| **Lost update** (write-write) | two transactions overwrite each other's update |
| **Dirty read** (uncommitted dependency, W-R) | reading data written by an uncommitted transaction that later aborts |
| **Non-repeatable read** (R-W) | same item read twice gives different values |
| **Phantom read** | re-running a query returns new rows inserted by another transaction |
- SQL isolation levels (weakest -> strongest): READ UNCOMMITTED (allows dirty reads) -> READ COMMITTED -> REPEATABLE READ (MySQL InnoDB default) -> SERIALIZABLE (prevents all).

### Schedules
- **Schedule** = interleaved ordering of operations of several transactions preserving each transaction's own order. **Serial schedule**: transactions run one after another. For n transactions there are **n!** serial schedules.
- **Serializable schedule**: equivalent to some serial schedule. Two notions: **conflict serializability** and **view serializability** (conflict ⊂ view).
- **Conflicting operations**: from different transactions, on the **same item**, and **at least one is a write**: R-W, W-R, W-W conflict; R-R does not.
- **Conflict serializability test**: build **precedence (serialization) graph**: node per transaction; edge Ti → Tj if an operation of Ti conflicts with and precedes one of Tj. **Serializable iff the graph has no cycle**; a topological order gives the equivalent serial schedule.

**Worked example:**
```
S1: r1(X) w2(X) w1(X)      conflicts: r1(X) before w2(X) -> T1→T2
                                       w2(X) before w1(X) -> T2→T1   => cycle => NOT conflict serializable
S2: r1(X) w1(X) r2(X) w2(X) conflicts all T1→T2, no cycle => serializable (equivalent to T1 then T2)
```
- **Recoverable schedule**: a transaction commits only after every transaction whose data it read has committed. **Cascadeless (ACA)**: reads only committed data -> no cascading rollbacks. **Strict**: no read **or write** of data written by an uncommitted transaction. Strict ⊂ Cascadeless ⊂ Recoverable.

### Concurrency control
**Lock-based**
- **Shared lock (S / read lock)**: many may hold; **Exclusive lock (X / write lock)**: only one, blocks all others.
- Compatibility: S-S yes; S-X no; X-S no; X-X no.
- **Two-Phase Locking (2PL)**: **growing phase** (acquire locks only, no release) then **shrinking phase** (release only, no new locks). Guarantees **conflict serializability** but **not freedom from deadlock** and not cascading rollbacks.
  - **Strict 2PL**: holds all exclusive locks until commit/abort -> avoids cascading aborts (strict schedules).
  - **Rigorous 2PL**: holds all locks (S and X) till commit.
  - **Lock point**: the moment the last lock is obtained; serial order follows lock points.
  - Lock upgrade (S->X) in growing phase; downgrade in shrinking phase.
- **Granularity**: database > table > page > row > field; **intention locks** (IS, IX, SIX) used in multiple-granularity locking.

**Timestamp ordering**
- Each transaction gets timestamp TS(T) at start (older = smaller). Each item X has **R-TS(X)** (largest TS that read) and **W-TS(X)** (largest TS that wrote).
- **Read(X) by T**: if TS(T) < W-TS(X) -> T is too old, **rollback** (restart with new TS); else execute and R-TS = max(R-TS, TS(T)).
- **Write(X) by T**: if TS(T) < R-TS(X) or TS(T) < W-TS(X) -> **rollback**; else execute and W-TS = TS(T).
- Guarantees conflict serializability (order = timestamp order); **deadlock-free** (no waiting), but may cause starvation/cascading rollback. **Thomas write rule**: ignore an obsolete write (TS(T) < W-TS(X)) instead of aborting.

**Optimistic (validation-based)**: read phase, validation phase, write phase; good when conflicts are rare. **MVCC** (multiversion): readers see snapshots, don't block writers.

### Deadlock in DBMS
- **Deadlock**: two or more transactions each wait for a lock held by another -> none proceed. Example: T1 holds X(A) wants X(B); T2 holds X(B) wants X(A).
- Detection: **wait-for graph** (Ti → Tj means Ti waits for Tj); **cycle ⇒ deadlock**. Recovery: pick a **victim** (least cost), roll back it; avoid starvation.
- Prevention using timestamps: **Wait-Die** (non-preemptive: older waits for younger; younger requesting from older **dies**/aborted), **Wound-Wait** (preemptive: older **wounds**/aborts younger holder; younger waits for older). Both are deadlock-free. Others: lock-all-upfront, ordering of resources, **timeout**.
- (OS deadlock needs four Coffman conditions; the DB version uses wait-for graph.)

### Recovery
- **Failures**: transaction failure (logical error, deadlock), system crash (loses memory, disk intact), disk failure (needs backup/archive).
- **Log (journal)** on stable storage records: `<T, start>`, `<T, X, old, new>`, `<T, commit>`, `<T, abort>`.
- **Write-Ahead Logging (WAL)**: log record must reach stable storage **before** the corresponding data page is written to disk; and all log records must be flushed before commit.
- **Deferred update (NO-UNDO/REDO)**: writes applied to DB only after commit; after crash **redo** committed ones, ignore uncommitted.
- **Immediate update (UNDO/REDO)**: DB updated before commit; after crash **undo** uncommitted and **redo** committed.
- **Checkpoint**: periodic marker `<checkpoint, active list>` after flushing buffers; recovery only scans log from the last checkpoint -> saves time. Transactions committed before the checkpoint need no redo.
- Recovery after crash: transactions with both `<start>` and `<commit>` in log -> **REDO**; transactions with `<start>` but no commit -> **UNDO**.
- **Shadow paging**: keep current and shadow page table; commit by switching pointer; no log needed (no undo/redo).
- **ARIES**: WAL + analysis, redo, undo passes. Backup types: full, incremental, differential; also mirroring/RAID.

**⚡ Exam tip:** ACID = Atomicity, Consistency, Isolation, Durability; 2PL guarantees serializability but not deadlock-freedom; timestamp ordering is deadlock-free; cycle in precedence graph = not serializable, cycle in wait-for graph = deadlock. COMMIT/ROLLBACK/SAVEPOINT are TCL.

## 8. Indexing & Hashing

### File organisation
- **Heap (unordered)**, **sequential (sorted on key)**, **hashed**, **clustered**. Records stored in disk **blocks/pages**; cost measured in **disk I/O (block accesses)**. Blocking factor bfr = ⌊block size / record size⌋; blocks needed = ⌈records / bfr⌉.

### Indexing
- **Index** = auxiliary structure (search key + pointer) to find records fast, like a book index.

| Index type | Description |
|---|---|
| **Primary index** | on the **ordered key** field of a sequentially ordered file; **sparse** (one entry per block) |
| **Clustering index** | on a non-key ordered field (many records same value) |
| **Secondary index** | on non-ordering field; must be **dense** (entry for every record/value) |
| **Dense index** | an index entry for every search-key value/record |
| **Sparse index** | entries only for some values (one per block); needs sorted file |
| **Single-level vs multilevel** | multilevel = index on the index (reduces I/O); B-trees realise this |
- Index entries for sparse index = number of blocks of the data file. Binary search on an index with b blocks costs ⌈log₂ b⌉ block accesses (+1 for the data block).
- Pros: faster search; cons: extra storage and slower updates.

### B-tree and B+ tree
- **B-tree**: balanced multiway search tree; all leaves at the same level; every node (except root) at least half full; keys & record pointers present in **all** nodes (internal and leaf).
- **B+ tree**: data (record pointers) only in **leaf** nodes; internal nodes hold only keys for routing (so more keys per node -> shallower tree); **leaves linked in a linked list** -> efficient **range queries** and sequential scan. Most DBMS indexes are B+ trees.
- Order (for B-tree, max children) m: each node ≤ m children, ≤ m-1 keys; non-root internal ≥ ⌈m/2⌉ children; root ≥ 2 children (if not leaf). Node splits when overfull (tree grows from the **root upward**, remains balanced).
- Search/insert/delete time: **O(log n)**; height small (typically 3-4 for millions of rows).

| | B-tree | B+ tree |
|---|---|---|
| Data pointers | all nodes | leaf only |
| Keys repeated | no | yes (leaf keys appear again in internal nodes) |
| Leaf linking | no | yes |
| Range query | slower | **faster** |
| Fan-out | lower | higher |
- Other structures: bitmap index (low-cardinality columns), full-text index, R-tree (spatial).

### Hashing
- **Hash function** h(K) maps search key to bucket/block address, e.g. h(K) = K mod M. Gives **O(1)** average equality search; **poor for range queries**.
- **Static hashing**: fixed number of buckets. **Collision**: two keys map to same bucket. Resolve by **overflow chaining**, **open addressing/linear probing**, rehashing. Static hashing suffers when file grows.
- **Dynamic hashing**: **extendible hashing** (directory with global depth, local depths of buckets, directory doubles on split), **linear hashing** (buckets split in order).
- Worked: h(K) = K mod 5; keys 12, 7, 22, 15 -> buckets 2, 2, 2, 0: 12, 7, 22 collide in bucket 2.

**⚡ Exam tip:** B+ tree = data only at leaves + linked leaves (best for range queries); hashing = best for equality, bad for range; a sparse index needs a sorted file, a secondary index must be dense.

## 9. NoSQL, Data Warehousing, Data Mining & CRUD

### NoSQL ("Not Only SQL")
- **NoSQL** = non-relational databases (not using the fixed-table relational model); schema-flexible, horizontally scalable, built for big data, high-volume, variable (semi/unstructured) data, low-latency. They follow **BASE** (Basically Available, Soft state, Eventual consistency) instead of strict ACID; **CAP theorem**: a distributed store can guarantee only two of Consistency, Availability, Partition tolerance.
- **Wrong options**: "database not managed by a DBMS" / "not stored on a physical device" - NoSQL still is a DBMS and stored on disk.

| Type | Data model | Examples | Use |
|---|---|---|---|
| **Key-value** | key -> opaque value | Redis, DynamoDB, Riak | caching, sessions, carts |
| **Document** | JSON/BSON documents | **MongoDB**, CouchDB | catalogues, CMS, user profiles |
| **Column-family (wide-column)** | rows with dynamic column families | Cassandra, HBase | time series, analytics, huge write loads |
| **Graph** | nodes + edges | Neo4j | social networks, recommendations, fraud |
- RDBMS vs NoSQL: fixed schema vs dynamic; vertical vs horizontal scaling; ACID vs BASE; SQL vs varied APIs.
- Other terms: **Big Data** (3Vs: Volume, Velocity, Variety), **Hadoop/HDFS**, **MapReduce**, **distributed DB** (data spread over sites), **replication**, **sharding** (horizontal partitioning).

### Data warehousing
- **Data warehouse** (Inmon): **subject-oriented, integrated, time-variant, non-volatile** collection of data for decision support (read-mostly, historical, loaded from many sources).
- **OLTP** (operational: many short transactions, current data, normalised, e.g. banking) vs **OLAP** (analytical: complex queries on historical, summarised data, denormalised).
- **ETL** = Extract, Transform, Load. **Data mart** = department-level subset of a warehouse. **Metadata** repository describes the warehouse.
- Modelling: **star schema** (central **fact table** of measures + denormalised **dimension tables**), **snowflake schema** (normalised dimensions), fact constellation.
- OLAP operations: **roll-up** (aggregate up the hierarchy), **drill-down**, **slice** (fix one dimension), **dice** (select sub-cube on several), **pivot** (rotate). Data cube = multidimensional view.

### Data mining
- **Data mining** = discovering useful patterns/knowledge from large data (KDD - Knowledge Discovery in Databases; mining is the analysis step after cleaning, integration, selection, transformation).
- Tasks: **classification** (predict class label; decision tree), **clustering** (group similar objects, unsupervised; k-means), **association rule mining** (market basket, "bread -> butter"; measures **support** and **confidence**; Apriori algorithm), **regression/prediction**, **anomaly/outlier detection**, sequential patterns.
- Support = fraction of transactions containing the itemset; Confidence(A→B) = support(A∪B) / support(A).
- Supervised (classification: labelled) vs unsupervised (clustering: unlabelled).

### CRUD
- **CRUD = Create, Read, Update, Delete** - the four basic persistent-storage operations.

| CRUD | SQL | HTTP/REST | MongoDB |
|---|---|---|---|
| Create | INSERT | POST | insertOne / insertMany |
| Read | SELECT | GET | find |
| Update | UPDATE | PUT / PATCH | updateOne / updateMany |
| Delete | DELETE | DELETE | deleteOne / deleteMany |

**⚡ Exam tip:** NoSQL types = key-value, document, column-family, graph; warehouse = subject-oriented, integrated, time-variant, non-volatile; CRUD maps to INSERT/SELECT/UPDATE/DELETE.

## 10. Distributed Transactions & Two-Phase Commit (2PC)

### Why 2PC
- A **distributed transaction** updates data at several sites (nodes). **Atomicity** must hold globally: either **all** sites commit or **all** abort, even if some sites or messages fail.
- **Two-Phase Commit (2PC)** is the standard **atomic commit protocol**. One site acts as **coordinator** (transaction manager); the others are **participants** (cohorts / resource managers).
- Do not confuse: **2PL** = two-phase *locking* (concurrency control, growing + shrinking); **2PC** = two-phase *commit* (atomicity across sites, voting + decision).

### The two phases

| Phase | Coordinator | Participant |
|---|---|---|
| **Phase 1: Prepare / Voting** | writes `<prepare T>` in log, sends **PREPARE** (vote request) to all | if it can commit: forces log records to disk, writes `<ready T>`, replies **VOTE-COMMIT (YES)**; else writes `<no T>`, replies **VOTE-ABORT (NO)** and aborts locally |
| **Phase 2: Decision / Completion** | all YES -> writes `<commit T>`, sends **GLOBAL-COMMIT**; any NO (or timeout) -> writes `<abort T>`, sends **GLOBAL-ABORT** | obeys decision, commits or aborts, releases locks, sends **ACK**; coordinator then writes `<end T>` |

- **Commit point** = the instant the coordinator writes the global-commit record in its log. After a participant votes YES it is in the **uncertain / ready state**: it cannot unilaterally commit or abort; it must wait for the coordinator.
- **Unanimity rule**: commit only if **every** participant votes YES; a single NO forces global abort.
- Messages for n participants (no failures): 2 phases x 2 messages each = **4n** (n prepare + n votes + n decisions + n acks).

### Failures and the blocking problem
- Participant fails before voting -> coordinator times out -> global abort. Participant recovers in ready state -> asks coordinator for the outcome.
- **Coordinator fails after participants voted YES** -> participants stay **blocked** (holding locks) until it recovers. Hence **2PC is a blocking protocol**.
- **Three-Phase Commit (3PC)** adds a **pre-commit** phase (can-commit, pre-commit, do-commit) to avoid blocking under simple crash failures; costlier, rarely used. Alternative: **Paxos Commit**, and **sagas** (compensating transactions) in microservices.
- 2PC in practice: **XA standard** (X/Open DTP), JTA, distributed databases.

### Related distributed-DB vocabulary
- **Replication** (copies for availability/speed) vs **fragmentation** (horizontal = rows split, vertical = columns split). **Homogeneous** vs **heterogeneous** distributed DBMS. **Distribution transparency**: location, replication, fragmentation transparency.
- **Distributed deadlock**: local wait-for graphs show no cycle but the **global** graph does; detected by merging graphs at a coordinator or by timeouts.

**⚡ Exam tip:** 2PC = Phase 1 voting (prepare, ready/abort), Phase 2 decision (commit/abort); commit only if ALL vote YES; coordinator crash can block participants. 2PC is for atomic commit across sites; 2PL is for serializability on one site.

## Quick Revision Sheet
- DBMS = software that **stores, modifies, retrieves** and manages data; DBA manages it; metadata = data about data (data dictionary).
- Three-schema levels: **external (views) / conceptual / internal (physical)**; logical independence is harder than physical.
- DDL: CREATE, ALTER, DROP, TRUNCATE, RENAME. DML: SELECT, INSERT, UPDATE, DELETE. DCL: GRANT, REVOKE. TCL: COMMIT, ROLLBACK, SAVEPOINT.
- Degree = number of columns; cardinality = number of rows.
- Super key ⊇ candidate key (minimal) ⊇ primary key (chosen; unique + NOT NULL); foreign key may be NULL/duplicate; only one PK per table.
- Entity integrity: PK not NULL. Referential integrity: FK matches a PK or is NULL.
- ER: weak entity = double rectangle, partial key; M:N needs a separate table; 1:N FK on the N side.
- Relational algebra: σ rows, π columns (removes duplicates), × gives n1×n2 rows and d1+d2 columns, ÷ division for "all".
- WHERE filters rows (no aggregates); **HAVING** filters groups (with aggregates).
- COUNT(*) counts all rows; COUNT(col)/SUM/AVG ignore NULLs; use IS NULL, not = NULL.
- LIKE: `%` any string, `_` exactly one character; `==` is invalid in SQL, `<>` is not-equal.
- DELETE (DML, rollback, WHERE) vs TRUNCATE (DDL, all rows) vs DROP (removes table).
- UNION removes duplicates; UNION ALL keeps them; a view is a virtual table.
- Armstrong axioms: reflexivity, augmentation, transitivity; X → Y holds iff Y ⊆ X⁺; X is a super key iff X⁺ = R.
- 1NF atomic; 2NF no partial dependency; 3NF no transitive dependency; BCNF every determinant is a super key; 4NF no non-trivial MVD.
- Normalization reduces redundancy (insertion, deletion, update anomalies); BCNF may not preserve dependencies, 3NF always can.
- Lossless binary decomposition iff common attributes determine one of the parts.
- ACID: Atomicity, Consistency, Isolation, Durability; locks maintain transactional integrity.
- Serializable iff precedence graph is acyclic; n transactions have n! serial schedules; conflict = same item, different transactions, at least one write.
- 2PL = growing then shrinking phase, ensures serializability but allows deadlock; strict 2PL avoids cascading rollback; timestamp ordering is deadlock-free.
- Deadlock = cycle in wait-for graph; Wait-Die and Wound-Wait are prevention schemes.
- Recovery: log + WAL, checkpoint, REDO committed / UNDO uncommitted.
- B+ tree: data only in linked leaves (range queries); hashing: O(1) equality, no range queries.
- NoSQL types: key-value, document (MongoDB), column-family (Cassandra), graph (Neo4j); BASE and CAP.
- Data warehouse: subject-oriented, integrated, time-variant, non-volatile; OLAP ops roll-up, drill-down, slice, dice, pivot; ETL.
- CRUD = Create, Read, Update, Delete = INSERT, SELECT, UPDATE, DELETE.
- 2PC (atomic commit across sites): Phase 1 prepare/vote, Phase 2 global commit/abort; all-YES needed; blocking if coordinator crashes; 3PC adds pre-commit. 2PL (locking) is different.
