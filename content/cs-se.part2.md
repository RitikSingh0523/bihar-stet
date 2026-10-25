## 4. Software Design and Coding

**Design** transforms the SRS into a blueprint. Levels: **architectural (high-level)** → **detailed (low-level)**. Design principles: **abstraction, modularity, information hiding, stepwise refinement, separation of concerns, reuse**.

### Modularity
- Divide software into independently developable modules. Good design = **high cohesion + low coupling**.
- **Fan-in** = number of modules that call a given module (high fan-in = reuse). **Fan-out** = number of modules a module calls/controls (keep ≤ ~7). **Structure chart** shows module hierarchy and calls.

### Cohesion (within a module; want HIGH)
Ranked **worst → best**:

| Rank | Type | Meaning |
|---|---|---|
| 1 (worst) | **Coincidental** | Unrelated tasks lumped together |
| 2 | **Logical** | Related by category (e.g., all I/O routines), one selected by flag |
| 3 | **Temporal** | Executed at the same time (e.g., initialisation) |
| 4 | **Procedural** | Follow a specific sequence of control |
| 5 | **Communicational** | Operate on the same data |
| 6 | **Sequential** | Output of one is input of next |
| 7 (best) | **Functional** | Performs a single well-defined task |

Memory trick: **C**o**L**o**T**ed **P**ink **C**ats **S**it **F**ine → Coincidental, Logical, Temporal, Procedural, Communicational, Sequential, Functional.

### Coupling (between modules; want LOW)
Ranked **worst (highest) → best (lowest)**:

| Rank | Type | Meaning |
|---|---|---|
| 1 (worst) | **Content** | One module modifies/jumps into internals of another |
| 2 | **Common** | Modules share **global data** |
| 3 | **External** | Share externally imposed format/device/protocol |
| 4 | **Control** | One passes control flag that decides other's logic |
| 5 | **Stamp** (data-structured) | Pass whole data structure, use only part |
| 6 (best) | **Data** | Pass only needed simple parameters |
(No coupling = no communication; message coupling is lowest in OO.)

### Structured vs Object-oriented design

| Structured (function-oriented) | Object-oriented |
|---|---|
| Decompose by **functions** (top-down) | Decompose by **objects/classes** |
| Tools: DFD, structure chart, data dictionary | Tools: UML (class, sequence, use case) |
| Data and functions separate | Data + methods **encapsulated** |
| Weak reuse | Inheritance, polymorphism → reuse |
| State is global/shared | State hidden in objects |

### DFD (Data Flow Diagram)
- Shows **flow of data** through a system; no control/time. Symbols (Yourdon/DeMarco): **circle = process; open-ended rectangle/parallel lines = data store; rectangle = external entity (source/sink); arrow = data flow**. (Gane-Sarson: rounded rectangle for process.)
- **Level 0 = context diagram**: whole system as a **single process** with external entities. **Level 1** = main sub-processes; **Level 2** = further decomposition.
- **Balancing rule**: inputs/outputs of a parent process must equal those of its child DFD.
- Rules: no data flow between two external entities or two data stores directly; process must have ≥1 input and ≥1 output (no miracle/black hole).
- **Data dictionary**: repository of data element definitions. Notation: `=` is composed of, `+` and, `[ | ]` or, `{ }` iteration, `( )` optional.

### ER Diagram (Chen)
- Rectangle = **entity**; ellipse = **attribute**; diamond = **relationship**; double ellipse = multivalued; dashed ellipse = derived; double rectangle = weak entity. Cardinalities: 1:1, 1:N, M:N.

### UML diagrams (Unified Modeling Language; Booch, Rumbaugh, Jacobson)

| Category | Diagrams |
|---|---|
| **Structural** | Class, Object, Component, Deployment, Package, Composite structure |
| **Behavioural** | Use case, Activity, State machine (state chart), Sequence, Communication (collaboration), Timing, Interaction overview |
- **Use case**: actors + system functions (requirements view). **Class**: classes, attributes, operations, relationships. **Sequence**: object interactions over time (vertical lifelines). **State**: states and transitions of an object. **Activity**: workflow (flowchart-like, concurrency via fork/join). **Deployment**: hardware nodes.
- Relationships: **association**, **aggregation** (hollow diamond, "has-a", parts can exist independently), **composition** (filled diamond, strong ownership, part dies with whole), **generalisation/inheritance** (hollow triangle arrow, "is-a"), **dependency** (dashed arrow), **realisation** (dashed with hollow triangle).
- Visibility: `+` public, `-` private, `#` protected.

### Coding standards and guidelines
- Purpose: uniformity, readability, maintainability, fewer bugs.
- Typical rules: meaningful names; naming conventions; consistent indentation; **limit use of `goto`** (structured constructs only); avoid global variables; one statement per line; each function does one thing, limited length; adequate **comments** (header comment: purpose, author, date, I/O, modification history); avoid obscure side effects; no deep nesting; use constants not magic numbers; handle errors/exceptions.
- **Coding standard** = mandatory rules; **guideline** = suggestions. **Code review/inspection/walkthrough** checks conformance.
- Code review types: **walkthrough** (informal, author leads), **inspection** (formal, Fagan; trained moderator, checklist), **desk checking**.

**⚡ Exam tip:** Cohesion best = **functional**, worst = **coincidental**. Coupling worst = **content**, best = **data**. Context diagram = DFD **level 0**. Filled diamond = **composition**, hollow diamond = aggregation.

## 5. Testing

**Testing** = executing a program with the intent of finding errors. **Verification** (static) vs **Validation** (dynamic). Terms: **error/mistake** (human) → **fault/defect/bug** (in code) → **failure** (observed wrong behaviour). **Test case** = input + expected output + preconditions. **Oracle** = mechanism to judge expected result. "Testing can show the presence of bugs, never their absence" (Dijkstra).

### Levels of testing

| Level | Tests | By whom | Technique |
|---|---|---|---|
| **Unit** | Individual module/function | Developer | White-box; uses **drivers** and **stubs** |
| **Integration** | Interfaces between modules | Developer/tester | Top-down, bottom-up, **big-bang**, sandwich/hybrid |
| **System** | Complete integrated system vs SRS | Independent testers | Black-box |
| **Acceptance** | Customer checks if system meets needs | Customer/users | Black-box: **alpha, beta** |

- **Stub** = dummy *called* module (needed in **top-down** integration); **Driver** = dummy *calling* module (needed in **bottom-up** integration).
- **Big-bang**: all modules combined at once - difficult to localise faults. **Regression** testing throughout.
- **System-level types**: functional, performance, **stress** (beyond limits), **load**, **volume**, security, recovery, usability, compatibility, configuration, installation.
- **Alpha testing**: by **customer at developer's site**, controlled environment, developer present. **Beta testing**: by **real users at their own site**, uncontrolled, developer absent; feedback reported. Alpha precedes beta.

### Black-box (behavioural / functional) testing
No knowledge of internal code; based on specification.
- **Equivalence class partitioning (ECP)**: divide inputs into classes (valid + invalid) such that every member behaves the same; test one value per class.
- **Boundary value analysis (BVA)**: errors cluster at boundaries. For a range [a, b]: test **a-1, a, a+1, b-1, b, b+1** (robust form); basic form tests min, min+1, nominal, max-1, max (**4n+1** cases for n variables).
- Others: decision table testing, cause-effect graphing, state-transition testing, error guessing, orthogonal arrays.

**Worked (ECP+BVA):** input "age must be 18 to 60". Classes: <18 (invalid), 18-60 (valid), >60 (invalid). BVA values: 17, 18, 19, 59, 60, 61.

### White-box (glass-box / structural) testing
Needs code. Coverage criteria (weakest → strongest):
- **Statement coverage**: every statement executed at least once.
- **Branch (decision) coverage**: every decision gives both TRUE and FALSE at least once (subsumes statement coverage).
- **Condition coverage**: each atomic condition takes T and F.
- **Multiple condition coverage**: all combinations of conditions.
- **Path coverage**: every independent path executed (strongest; subsumes branch/statement).
- Also **data-flow testing (def-use)**, **loop testing**, **mutation testing** (insert small faults - "mutants" - to check test-suite quality).

### Cyclomatic complexity (McCabe)
Upper bound on the number of **independent paths** = minimum number of tests for basis-path/branch coverage.
```
V(G) = E − N + 2P      (P = connected components; usually 1)
V(G) = number of predicate (decision) nodes + 1
V(G) = number of regions of the planar flow graph (incl. outer region)
```
**Worked:** control-flow graph with E = 9 edges, N = 7 nodes, P = 1 → V(G) = 9 − 7 + 2 = **4**. Check: 3 decision nodes + 1 = 4; regions = 4. So at least 4 independent paths need testing.
- Interpretation: 1-10 simple/low risk; 11-20 moderate; 21-50 high; >50 untestable.
- Note: a program with only `if` = V(G) 2; each `if`, `while`, `for`, `case` branch adds 1; compound conditions with `and/or` each add 1 predicate.

### Other testing terms
- **Regression testing**: re-run old tests after a change to confirm nothing else broke.
- **Smoke testing**: quick build-verification (daily build) of critical functions - "does the build even work?" **Sanity testing**: narrow check after small fix.
- **Exploratory, ad hoc, monkey** testing. **Static testing** = reviews/inspections/static analysis (no execution).
- **Debugging** (locating and fixing the cause) is **not** testing; done by the developer.
- **Test coverage analyser** reports which parts of code were executed.

### Program analysis tools

| Static analysis | Dynamic analysis |
|---|---|
| Analyse code **without executing** | Analyse during **execution** |
| Syntax, dead code, uninitialised variables, unreachable code, complexity metrics, coding-standard violations (e.g. lint) | Memory leaks, **code coverage**, profiling/performance, race conditions, assertion checks |
| Finds defects early | Finds runtime-only defects |

**⚡ Exam tip:** BVA/ECP = **black-box**; statement/branch/path coverage and cyclomatic complexity = **white-box**. Stub ↔ top-down, driver ↔ bottom-up. Alpha = developer site; Beta = customer site. V(G) = E − N + 2.
