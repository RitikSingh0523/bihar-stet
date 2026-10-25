# DBMS & SQL

> **What the exam asks:** Roughly 5-8 questions per paper. Most are direct one-liners: what is DBMS, DDL/DML/DCL/TCL classification (which command belongs where), SELECT/UPDATE/aggregate/HAVING-vs-WHERE, primary/foreign key, ACID, normalization purpose and normal forms, NoSQL meaning, relational schema/instance terms. Expect an occasional output-of-query or functional-dependency/closure/key-finding numeric. MySQL is the SQL flavour used in the papers.

## 1. DBMS Basics & Architecture

### Terms
- **Data** = raw facts; **Information** = processed data; **Database** = organised, shared, persistent collection of related data; **DBMS** = software that **stores, modifies, retrieves and manages** data (MySQL, Oracle, SQL Server, PostgreSQL, MS Access, SQLite).
- **Metadata** = data about data (stored in the **data dictionary / system catalog**).
- **Database system** = database + DBMS + application programs + users.
- **DBA (Database Administrator)** = controls schema, security, backup/recovery, performance tuning, user access.
- **Schema** = logical design/structure of the database (changes rarely). **Instance** (state/snapshot) = data actually in the database at a moment (changes constantly).
- Real-world analogy: schema = class definition, instance = objects.

### File system vs DBMS

| File system | DBMS |
|---|---|
| Data redundancy and inconsistency | Controlled redundancy |
| Difficult data access (new program for every query) | Query language (SQL) gives ad-hoc access |
| Data isolation (many formats) | Uniform structure |
| No concurrency control | Concurrent access with locking |
| Weak security | Authorisation, roles, privileges |
| Integrity constraints buried in program code | Declared constraints enforced centrally |
| No crash recovery | Backup + recovery (logs) |
| Program-data dependence | Data independence |

### Advantages / disadvantages of DBMS
- Advantages: reduced redundancy, consistency, sharing, security, integrity enforcement, backup/recovery, data independence, concurrent access.
- Disadvantages: costly software/hardware, complexity, need skilled DBA, performance overhead for small apps, single point of failure.

### Users
- **Naive/end users** (use forms/apps), **application programmers**, **sophisticated users** (write SQL/analysts), **DBA**.

### Languages

| Language | Purpose | Commands |
|---|---|---|
| **DDL** | define/alter structure | CREATE, ALTER, DROP, TRUNCATE, RENAME |
| **DML** | manipulate data | SELECT, INSERT, UPDATE, DELETE |
| **DCL** | access rights | GRANT, REVOKE |
| **TCL** | transactions | COMMIT, ROLLBACK, SAVEPOINT |
- Some books place SELECT in **DQL** (Data Query Language). In school/STET answers SELECT is DML unless DQL is an option.
- DML may be **procedural** (what + how; e.g. relational algebra style) or **declarative/non-procedural** (what only; SQL, relational calculus).

### Three-schema (ANSI-SPARC) architecture
```
 External level (view level)    -> many user VIEWS            (what each user sees)
        |  external/conceptual mapping
 Conceptual level (logical)     -> ONE schema for whole DB     (entities, relations, constraints)
        |  conceptual/internal mapping
 Internal level (physical)      -> files, indexes, blocks      (how stored)
```
- **Physical data independence**: change internal schema (indexes, file organisation, storage device) without changing conceptual schema. Easier to achieve.
- **Logical data independence**: change conceptual schema (add/remove attribute or table) without changing external views/applications. Harder to achieve.
- Purpose of the architecture: **data independence**, multiple views, hiding storage detail.

### Components of a DBMS
- **Query processor**: DDL interpreter, DML compiler, query optimiser, query evaluation engine.
- **Storage manager**: buffer manager, file manager, authorisation & integrity manager, transaction manager.
- Disk storage: data files, data dictionary, indices, statistical data.

### DBMS architecture (system)
- **1-tier**: user works directly on database (local, e.g. MS Access personal).
- **2-tier**: client app talks directly to DB server (ODBC/JDBC).
- **3-tier**: client (GUI) -> application/web server (business logic) -> database server. Used in web applications; better security and scalability.

**⚡ Exam tip:** "Which independence is harder?" -> **logical**. "Locks are used to maintain transactional integrity and consistency" (not pointers/cursors/triggers). DBMS = software that stores, modifies and retrieves data.

## 2. Data Models & the ER Model

### Data models

| Model | Structure | Note |
|---|---|---|
| **Hierarchical** | tree; one parent, many children | 1:N only; IBM IMS |
| **Network** | graph; child may have many parents | pointers/sets; CODASYL |
| **Relational** | tables (relations) | Codd 1970; dominant; SQL |
| **Entity-Relationship** | entities + relationships | conceptual/design model |
| **Object-oriented / object-relational** | objects, classes, inheritance | for complex data |
| **NoSQL** (document, key-value, column, graph) | flexible schema | big data |
- "Three main types of DBMS" commonly: relational, hierarchical, network. (Another listing: relational, object-oriented, NoSQL - read the options.)
- Data model parts: structure, operations, constraints.
- Levels: **conceptual/high-level** (ER), **representational/implementation** (relational, network, hierarchical), **physical**.

### ER model basics (Peter Chen, 1976)
- **Entity**: real-world object distinguishable from others (Student, Book). **Entity set** = collection of similar entities.
- **Attribute**: property of an entity. Types:
  - **Simple/atomic** (RollNo) vs **composite** (Name = First + Last; Address)
  - **Single-valued** (DOB) vs **multivalued** (phone numbers; double ellipse)
  - **Derived** (Age from DOB; dashed ellipse) vs stored
  - **Key attribute** (underlined)
  - **Null** attribute: unknown / not applicable.
- **Relationship**: association among entities (Student *enrolls in* Course). **Degree** = number of participating entity sets: unary (recursive), binary (most common), ternary.
- **Strong entity**: has its own primary key (rectangle). **Weak entity**: no sufficient key; depends on an owner (identifying) entity via an identifying relationship; has a **partial key (discriminator)** (dashed underline). Drawn as **double rectangle**; identifying relationship as double diamond. Primary key of weak entity = owner's PK + partial key. Example: Dependent of Employee; Room of Building.

### ER symbols

| Symbol | Meaning |
|---|---|
| Rectangle | entity set |
| Double rectangle | weak entity |
| Ellipse | attribute |
| Double ellipse | multivalued attribute |
| Dashed ellipse | derived attribute |
| Diamond | relationship |
| Double diamond | identifying relationship |
| Underlined name | key attribute |
| Lines | link components |

### Mapping cardinality
- **1:1** (one-to-one): each A with at most one B and vice versa (Person-Passport).
- **1:N** (one-to-many): a Department has many Employees; each Employee in one Department.
- **M:N** (many-to-many): Student-Course.
- **Participation**: **total** (every entity must participate; double line) vs **partial** (single line).

### ER to relational mapping rules
- Strong entity -> table with its attributes; PK = key attribute. Composite attribute -> its simple components. Multivalued attribute -> **separate table** (key + attribute).
- **1:1** -> put FK in either side (prefer total-participation side) or merge.
- **1:N** -> put FK on the **N side**.
- **M:N** -> **new table** with FKs of both entities; PK = combination (plus relationship attributes).
- Weak entity -> table including owner's PK as FK, PK = (owner PK + partial key).
- Minimum number of tables is a standard question: e.g. two strong entities with M:N = **3 tables**; with 1:N = **2 tables**.

### Extended ER (EER)
- **Specialization** (top-down): subdivide an entity set into subgroups (Person -> Student, Teacher).
- **Generalization** (bottom-up): combine similar entity sets into a higher-level one (Car, Truck -> Vehicle).
- **Aggregation**: treat a relationship as an entity to take part in another relationship.
- Attribute inheritance: sub-class inherits attributes of super-class ("**is-a**" relationship; triangle symbol). Constraints: disjoint/overlapping, total/partial.

**⚡ Exam tip:** M:N always needs a separate table; 1:N puts the foreign key on the "many" side; weak entity is drawn with a double rectangle and has a **partial key**, not a primary key.

## 3. Relational Model, Keys & Integrity

### Terminology

| Formal | Informal / SQL |
|---|---|
| Relation | Table |
| Tuple | Row / record |
| Attribute | Column / field |
| Domain | set of allowed values of an attribute |
| **Degree** (arity) | **number of attributes (columns)** |
| **Cardinality** | **number of tuples (rows)** |
| Relation schema | R(A1, A2, ..., An) |
- Properties of relation: no duplicate tuples (set), tuple order and attribute order immaterial, each attribute atomic (1NF), values from the same domain per column, each attribute name unique.
- **Null** = unknown/missing/inapplicable; not equal to 0 or blank; comparisons with NULL give UNKNOWN (use IS NULL).
- Proposed by **E. F. Codd (IBM, 1970)**. Codd's 12 rules define a true RDBMS.

### Keys
Take STUDENT(RollNo, Email, Name, Phone) with RollNo and Email unique.

| Key | Definition | Example |
|---|---|---|
| **Super key** | any set of attributes that uniquely identifies a tuple (may contain extras) | {RollNo}, {RollNo,Name}, {Email,Phone} |
| **Candidate key** | **minimal** super key (no proper subset is a super key) | {RollNo}, {Email} |
| **Primary key** | candidate key chosen by designer; unique + NOT NULL; only one per table | RollNo |
| **Alternate key** | candidate keys not chosen as primary | Email |
| **Composite key** | key with 2+ attributes | (OrderID, ProductID) |
| **Foreign key** | attribute(s) in one table referring to the primary (or unique) key of another (or same) table; may be NULL and may repeat | Student.DeptID -> Dept.DeptID |
| **Unique key** | unique values, NULL allowed (MySQL: multiple NULLs); many per table | Email |
| **Surrogate key** | system-generated artificial key (auto-increment id) | |
- Every PK is a candidate key; every candidate key is a super key (not the reverse).
- If a relation has n attributes and its **only** candidate key is a single attribute, the **number of super keys** = 2^(n-1). Example: R(A,B,C,D), A is the only candidate key -> super keys = 2³ = **8**.
- Primary key vs unique: PK = NOT NULL + only one; unique allows NULL and many.

### Integrity constraints
- **Domain constraint**: value must belong to attribute's domain (data type, CHECK, NOT NULL, DEFAULT).
- **Entity integrity**: primary key cannot be NULL (and must be unique).
- **Referential integrity**: a foreign key value must either match an existing primary key value in the referenced table or be NULL. Violations on delete/update handled by `ON DELETE CASCADE | SET NULL | RESTRICT | NO ACTION`.
- **Key constraint**: key values unique.
- **Semantic/business constraints**: assertions, triggers.
- Referential action: deleting a parent row referenced by children is rejected (RESTRICT/default) or cascaded.

**⚡ Exam tip:** Degree = columns, Cardinality = rows (reverse is the trap). Primary key = unique + NOT NULL; foreign key may be NULL and may have duplicates; a table can have only one primary key but many unique keys and many foreign keys.

## 4. Relational Algebra & Tuple Calculus

### Relational algebra (procedural query language)
**Fundamental operators**: σ select, π project, ∪ union, − set difference, × Cartesian product, ρ rename. Derived: ∩, join (⋈), division (÷).

| Operator | Notation | Meaning |
|---|---|---|
| Selection | σ_condition(R) | **rows** satisfying predicate (horizontal subset) |
| Projection | π_A1,A2(R) | chosen **columns**; **removes duplicates** (set semantics) |
| Union | R ∪ S | tuples in R or S; needs **union-compatible** relations (same degree, same domains) |
| Intersection | R ∩ S | in both (= R − (R − S)) |
| Difference | R − S | in R not in S |
| Cartesian product | R × S | every R tuple with every S tuple; degree = d1 + d2, cardinality = n1 × n2 |
| Rename | ρ_x(R) | rename relation/attributes |
| Natural join | R ⋈ S | product + selection on equal common attributes + drop duplicate column |
| Theta join | R ⋈_θ S | join with any condition θ; equi-join when θ is "=" |
| Outer joins | left/right/full | keep unmatched tuples padded with NULL |
| Division | R ÷ S | tuples of R-S attributes related to **all** tuples of S ("for all" queries) |

- Examples: σ_(salary>30000)(EMP); π_name,dept(EMP); π_name(σ_(dept='CS')(EMP)).
- **Division example**: Takes(Student, Course) ÷ Required(Course) gives students who took **all** required courses.
- Sizes: if R has 3 attributes/4 tuples and S 2 attributes/5 tuples: R × S has **5 attributes, 20 tuples**. Union cardinality ≤ n1+n2; intersection ≤ min(n1,n2).
- Natural join of R(A,B) with S(B,C) -> result attributes (A,B,C).
- Relational algebra ≡ expressive power of **safe tuple calculus**; "relationally complete" = at least as powerful as relational algebra. SQL is more powerful (aggregates, ordering).
- Extended operators: generalised projection, aggregate G, grouping.

### Worked example
```
EMP: (E1,Ravi,CS) (E2,Sita,EE) (E3,Amit,CS)   DEPT: (CS,Patna) (EE,Gaya)
σ_dept='CS'(EMP)        -> (E1,Ravi,CS), (E3,Amit,CS)       cardinality 2
π_dept(EMP)             -> CS, EE          (duplicate CS removed) -> cardinality 2
EMP ⋈ DEPT (on dept)    -> (E1,Ravi,CS,Patna) (E2,Sita,EE,Gaya) (E3,Amit,CS,Patna)
EMP × DEPT              -> 3 × 2 = 6 tuples, degree 3+2 = 5
```

### Tuple relational calculus (TRC) - basics
- Non-procedural: describes **what** to retrieve. Form: **{ t | P(t) }** = set of tuples t such that predicate P is true.
- Uses tuple variables, relation membership (t ∈ EMP or EMP(t)), conditions (t.salary > 30000), connectives ∧ ∨ ¬, quantifiers **∃** (there exists) and **∀** (for all).
- Example: { t | t ∈ EMP ∧ t.dept = 'CS' } = σ_dept='CS'(EMP).
- Example: { t.name | EMP(t) ∧ t.salary > 30000 } = π_name(σ...).
- **Domain relational calculus (DRC)**: variables range over attribute **domain values**: { <a,b> | <a,b,c> ∈ R ∧ c > 5 }. QBE is based on DRC; SQL is closer to TRC.
- **Safe expression**: guarantees finite result (e.g. { t | ¬(t ∈ R) } is unsafe).

**⚡ Exam tip:** Projection removes duplicates in algebra (SQL needs DISTINCT); relational algebra is procedural, calculus is declarative; division = "for all"; Cartesian product multiplies cardinalities and adds degrees.
