## 6. Software Metrics and Estimation

**Metric** = quantitative measure of a software attribute. Categories: **product** (size, complexity, quality), **process** (defect removal efficiency, effort), **project** (cost, schedule, staff).

### Size-oriented: LOC / KLOC
- Productivity = KLOC / person-month; Quality = defects / KLOC (**defect density**); Cost = Rs / LOC.
- Drawbacks: language dependent, penalises well-designed short code, not known early, ignores complexity.
- **Worked:** 45 defects in 15 KLOC → 3 defects/KLOC. 20 PM × Rs 50,000 = Rs 10,00,000; for 10,000 LOC → Rs 100 per LOC.
- Others: **Halstead** metrics (from operators/operands: n1, n2, N1, N2; vocabulary n = n1+n2, length N = N1+N2, volume V = N log₂ n), **McCabe** cyclomatic complexity, **cohesion/coupling**.

### Function Point (FP) analysis (Albrecht)
Language-independent measure of functionality, computable at requirement stage.

Five information domain counts and weights (simple / average / complex):

| Component | Simple | Average | Complex |
|---|---|---|---|
| External Inputs (EI) | 3 | 4 | 6 |
| External Outputs (EO) | 4 | 5 | 7 |
| External Inquiries (EQ) | 3 | 4 | 6 |
| Internal Logical Files (ILF) | 7 | 10 | 15 |
| External Interface Files (EIF) | 5 | 7 | 10 |

```
UFP = Σ (count × weight)
CAF = 0.65 + 0.01 × ΣFi      (14 factors, each rated 0-5; ΣFi ranges 0..70)
FP  = UFP × CAF              (CAF ranges 0.65 to 1.35)
```
**Worked:** EI = 20 (avg 4) = 80; EO = 12 (avg 5) = 60; EQ = 8 (avg 4) = 32; ILF = 6 (avg 10) = 60; EIF = 4 (avg 7) = 28 → UFP = 260. ΣFi = 42 → CAF = 0.65 + 0.42 = 1.07 → **FP = 260 × 1.07 = 278.2**.
- Effort ≈ FP / productivity (FP per PM). Max CAF = 1.35 (all factors 5), min = 0.65.

### COCOMO (Constructive Cost Model - Barry Boehm, 1981)
Size in **KLOC**; effort in **person-months (PM)**; time in **months**. Three project classes:
- **Organic**: small team, familiar environment, ≤ ~50 KLOC (e.g., payroll).
- **Semi-detached**: mixed experience, 50-300 KLOC (e.g., compiler, DBMS).
- **Embedded**: tight hardware/software/operational constraints, > 300 KLOC (e.g., flight control, real-time).

**Basic COCOMO:** `E = a × (KLOC)^b` PM; `D = c × E^d` months; `Staff = E / D`; Productivity = KLOC / E.

| Mode | a | b | c | d |
|---|---|---|---|---|
| Organic | 2.4 | 1.05 | 2.5 | 0.38 |
| Semi-detached | 3.0 | 1.12 | 2.5 | 0.35 |
| Embedded | 3.6 | 1.20 | 2.5 | 0.32 |

**Worked (organic, 10 KLOC):** E = 2.4 × 10^1.05 = 2.4 × 11.22 ≈ **26.9 PM**. D = 2.5 × 26.9^0.38 ≈ 2.5 × 3.49 ≈ **8.7 months**. Staff = 26.9/8.7 ≈ **3.1 persons**.
**Quick:** E = 32 PM organic → D = 2.5 × 32^0.38 ≈ 9.3 months.

**Intermediate COCOMO:** adds **15 cost drivers** (effort multipliers) in 4 groups - **product** (reliability, database size, complexity), **computer** (execution time, storage, virtual-machine volatility, turnaround), **personnel** (analyst/programmer capability, application/language experience), **project** (modern practices, tools, schedule). 
`E = a × (KLOC)^b × EAF` where EAF = product of the multipliers (nominal = 1.0). Coefficients: organic **a=3.2, b=1.05**; semi-detached **a=3.0, b=1.12**; embedded **a=2.8, b=1.20**. D = c × E^d as in basic.

**Detailed (Complete) COCOMO:** intermediate + cost drivers applied **per phase** (plan & requirements, design, coding, integration & test) and **at module/sub-system/system level** (three-level product hierarchy); phase-sensitive effort multipliers.

| COCOMO | Accuracy | Basis |
|---|---|---|
| Basic | rough | size only |
| Intermediate | better | size + 15 drivers |
| Detailed | best | drivers per phase/module |

- **COCOMO II**: for modern development; uses **object points, function points, LOC**; models: application composition, early design, post-architecture.
- **Putnam model** (Rayleigh curve, SLIM). **Brooks' law**: *adding manpower to a late project makes it later*. **Cost of change** increases steeply the later the phase.

**⚡ Exam tip:** Organic a/b = 2.4/1.05, semi 3.0/1.12, embedded 3.6/1.20; c = 2.5 always; d = 0.38/0.35/0.32. Intermediate organic a = 3.2 (others 3.0, 2.8). FP = UFP × (0.65 + 0.01 ΣFi).

## 7. Project Management, Scheduling and Risk

**Project management 4 P's:** **People, Product, Process, Project**. Activities: planning, estimation, scheduling, staffing, monitoring, risk management, configuration management.

### WBS (Work Breakdown Structure)
Hierarchical decomposition of project into deliverables → work packages → tasks (tree structure). Basis for estimation, scheduling, responsibility assignment.

### Gantt chart
- Bar chart: tasks on vertical axis, time on horizontal; bars show start/finish/duration; shows **progress and parallel tasks**, but **not task dependencies clearly** (and no slack explicitly).

### Network techniques: PERT and CPM

| PERT | CPM |
|---|---|
| Probabilistic - uncertain durations | Deterministic - known durations |
| Three time estimates: **O** optimistic, **M** most likely, **P** pessimistic | Single time estimate; trade-off time vs cost (crashing) |
| Event-oriented | Activity-oriented |
| R&D projects | Construction/routine projects |

```
PERT expected time  te = (O + 4M + P) / 6
Std deviation       σ  = (P − O) / 6          Variance = σ²
```
**Worked PERT:** O = 2, M = 5, P = 14 → te = (2 + 20 + 14)/6 = **6 days**, σ = (14 − 2)/6 = **2**, variance 4.

**CPM definitions:** Earliest start (ES) via **forward pass**; latest finish (LF) via **backward pass**. **Slack/float = LS − ES = LF − EF**. **Critical path** = **longest** path from start to end = minimum project duration; activities on it have **zero slack**. Delay of any critical activity delays the project. Project can have more than one critical path.

**Worked CPM:** A (3 d, none), B (5 d, after A), C (2 d, after A), D (4 d, after B and C).
Paths: A-B-D = 3 + 5 + 4 = **12**; A-C-D = 3 + 2 + 4 = 9. Critical path **A-B-D**, duration **12 days**; C slack = 12 − 9 = **3 days**.

### Staffing / team
- **Brooks' law**; team structures: **Democratic decentralised, Controlled decentralised, Controlled centralised (chief programmer)**. **Egoless programming** (Weinberg).
- **Staffing level** by Putnam/Rayleigh; avg staff = Effort / Duration.

### Risk management
- **Risk** = uncertain event that can cause loss. Types: **project** (budget, schedule, staff), **technical** (design, interface), **business** (market, strategy).
- Steps: **Risk identification → analysis/assessment (probability & impact) → prioritisation → risk planning/mitigation → monitoring (RMMM)**.
- **Risk exposure RE = P(probability) × L(loss)**. **Worked:** P = 0.3, L = Rs 2,00,000 → RE = **Rs 60,000**.
- Strategies: avoidance, mitigation (reduce), transfer (insurance), acceptance; contingency plan.
- **Risk prioritisation** by RE; "Top-10 risk list" (Boehm). **Spiral model** is risk driven.

**⚡ Exam tip:** Critical path = **longest** path (not shortest), zero slack. PERT te = (O + 4M + P)/6. Gantt shows schedule; PERT/CPM show dependencies. RE = probability × loss.

## 8. Quality Assurance, Maintenance, SCM and Reliability

### Software quality assurance (SQA)
- **SQA** = planned activities applied **throughout the whole process** (not just at the end) to ensure quality: standards, reviews, audits, testing, defect tracking. **QC (control)** = checks the product (testing); **QA** = checks the process.
- **Software reviews**: walkthrough, inspection (formal technical review - FTR).
- **ISO 9001**: international standard for **Quality Management System (QMS)** - applies to **any organisation** (manufacturing, service, software); focuses on **process / management**, not product quality directly. **ISO 9000-3** = guidelines for software; **ISO 9126** = software product quality (functionality, reliability, usability, efficiency, maintainability, portability); **ISO/IEC 12207** = software life-cycle processes; **ISO 25010** replaces 9126. ISO certification is issued by registrars; it is **not graded** (pass/fail), unlike CMM.
- **Six Sigma**: ≤ 3.4 defects per million opportunities.

### SEI CMM (Capability Maturity Model; Software Engineering Institute, Carnegie Mellon) - process maturity levels

| Level | Name | Characterised by |
|---|---|---|
| 1 | **Initial** | Ad hoc, chaotic, depends on individuals |
| 2 | **Repeatable** | Basic project management (requirements mgmt, planning, tracking, SCM, SQA) |
| 3 | **Defined** | Standard documented organisation-wide process (training, peer reviews) |
| 4 | **Managed** | Quantitative process and quality management (metrics) |
| 5 | **Optimizing** | Continuous process improvement, defect prevention |
- **CMMI** (Integrated) has levels: 1 Initial, 2 Managed, 3 Defined, 4 Quantitatively Managed, 5 Optimizing. Each level (except 1) has **Key Process Areas (KPAs)**. **PSP/TSP** = personal/team software process.

### Software maintenance

| Type | Purpose | Example |
|---|---|---|
| **Corrective** | Fix bugs found after delivery | Crash fix |
| **Adaptive** | Adapt to changed environment (OS, hardware, law) | Port to new OS |
| **Perfective** | Add features / improve performance on user request | New report |
| **Preventive** | Improve structure to prevent future problems | Refactoring, restructuring |
- Maintenance is the **longest and most costly** phase (commonly 60%+ of total life-cycle cost).
- **Reverse engineering**: derive design/specs from code. **Re-engineering** = reverse engineering + restructuring + forward engineering. **Reengineering/legacy**, **Software Reuse**.
- **Ripple effect**: a change in one part causes unintended changes elsewhere.
- **Boehm maintenance estimate**: `Annual maintenance effort = ACT × Development effort` (ACT = Annual Change Traffic = fraction of code changed per year). **Worked:** 200 PM × 0.1 = **20 PM/year**.
- **Lehman's laws**: continuing change, increasing complexity, self-regulation, conservation of organisational stability, conservation of familiarity, continuing growth, declining quality, feedback system. (Software that is used must continually be adapted = *law of continuing change*.)

### Software Configuration Management (SCM) and version control
- **SCM** = identify, control, audit and report changes to software work products (**configuration items - SCIs**). Activities: **configuration identification, version control, change control, configuration auditing, status reporting**.
- **Baseline** = formally reviewed and agreed work product, changed only through formal change control.
- **Version control tools:** centralised (**CVS, SVN**), distributed (**Git**, Mercurial). **Git** (Linus Torvalds): `clone`, `add`, `commit`, `push`, `pull` (= `fetch` + `merge`), `branch`, `merge`, `checkout`; **merge conflict** = same lines changed differently in two branches that cannot be merged automatically. Repository, working copy, staging area; **commit** records snapshot; **tag** marks release.

### DevOps and CI/CD
- **DevOps** = culture/practices uniting development and operations for faster, reliable delivery; automation, monitoring, collaboration.
- **CI (Continuous Integration)**: developers merge code frequently into a shared repo; **every commit triggers automated build and tests** → detects integration bugs early.
- **Continuous Delivery**: code always releasable; deployment to production is **manual approval**. **Continuous Deployment**: every passing change is **auto-deployed** to production.
- Typical pipeline: **Source/commit → Build → Test → Release/Package → Deploy → Operate/Monitor**. Tools: Jenkins, GitHub Actions, GitLab CI, Docker, Kubernetes, Ansible; **Infrastructure as Code**.

### CASE tools
- **Upper-CASE** (front-end): analysis & design (diagram editors, requirements tools). **Lower-CASE** (back-end): coding, testing, debugging, maintenance. **Integrated CASE (I-CASE)** covers the full life-cycle with common repository. Benefits: productivity, consistency, documentation, reduced effort.

### Software reliability
- **Reliability** = probability of failure-free operation for a specified time in a specified environment.
- **MTTF** (Mean Time To Failure): average time until failure (non-repairable). **MTTR** (Mean Time To Repair). **MTBF = MTTF + MTTR**. **ROCOF** = rate of occurrence of failures. **POFOD** = probability of failure on demand. **Availability = MTTF / (MTTF + MTTR) = MTTF / MTBF**.
- **Worked:** MTTF = 400 h, MTTR = 20 h → MTBF = 420 h; Availability = 400/420 ≈ **95.2%**.
- Failure rate λ = 1/MTTF; R(t) = e^(−λt) (constant failure rate).
- Reliability growth models: **Jelinski-Moranda**, **Musa**, **Goel-Okumoto**. Fault avoidance, fault tolerance (**N-version programming**, recovery blocks).

**⚡ Exam tip:** Maintenance types: **C-A-P-P** (Corrective, Adaptive, Perfective, Preventive). Refactoring = **preventive**; new feature = **perfective**; OS port = **adaptive**. CMM L1-L5: Initial, Repeatable, Defined, Managed, Optimizing. Availability = MTTF/(MTTF + MTTR).

## 9. Design Principles, Testing Strategy and Requirements Management (Syllabus Supplement)

### 9.1 Design principles
- **Core principles:** abstraction, modularity (high cohesion, low coupling), information hiding (Parnas), stepwise refinement, separation of concerns, **reuse**, design for change.
- **General rules:** **KISS** (keep it simple), **DRY** (do not repeat yourself), **YAGNI** (do not build what is not needed), **Law of Demeter** (talk only to immediate neighbours).
- **SOLID (object-oriented design):** **S** Single Responsibility (one reason to change), **O** Open/Closed (open for extension, closed for modification), **L** Liskov Substitution (subclass usable wherever base class is), **I** Interface Segregation (many small interfaces), **D** Dependency Inversion (depend on abstractions, not concretions).
- **Object-oriented concepts used in design:** object, class, encapsulation, inheritance, polymorphism, abstraction, message passing. **OOAD steps:** identify use cases and classes (nouns = classes, verbs = methods) -> class diagram -> interaction (sequence) diagrams -> state diagrams.
- **Design patterns (GoF, 23 patterns):** **creational** (Singleton, Factory, Abstract Factory, Builder, Prototype), **structural** (Adapter, Bridge, Composite, Decorator, Facade, Proxy), **behavioural** (Observer, Strategy, Command, Iterator, State). Architectural styles: layered, client-server, MVC, pipe-and-filter.
- **Structured design flow:** requirements -> DFD (structured analysis) -> **transform or transaction analysis** -> structure chart -> module specification.

### 9.2 Testing strategy
- **Strategy order:** unit -> integration -> system -> acceptance (inside-out); verification (static reviews) runs alongside validation (dynamic).
- **Integration approaches:** top-down (stubs), bottom-up (drivers), **sandwich/hybrid**, big-bang, **incremental**.
- **Test case design:** **black-box** (equivalence partitioning, boundary value, decision table, cause-effect graph, error guessing) vs **white-box** (statement, branch, condition, path coverage, basis-path using cyclomatic complexity, data-flow, loop testing). **Grey-box** mixes both.
- **Test plan** (IEEE 829) lists scope, approach, resources, schedule, entry/exit criteria; **test levels** vs **test types** (functional, performance, security, usability, compatibility, regression).
- **Debugging approaches:** brute force, backtracking, cause elimination, program slicing. Testing finds failures; debugging finds and fixes the fault.
- **Coverage ordering:** path subsumes branch subsumes statement (100% branch implies 100% statement, not the reverse).

### 9.3 Requirements engineering: process and management
- **Process:** feasibility study -> **elicitation** -> **analysis and negotiation** (resolve conflicts, prioritise, e.g. MoSCoW: Must, Should, Could, Won't) -> **specification (SRS)** -> **validation** (reviews, prototyping, test-case generation, walkthroughs) -> **management**.
- **Requirements management:** requirements change is inevitable; use change control, version baselines and a **requirements traceability matrix** (links requirement to design, code, test).
- **Analysis models:** use case, DFD, ER diagram, state diagram, data dictionary, **decision table**.
- **Quality attributes** (ISO 9126): functionality, reliability, usability, efficiency, maintainability, portability. McCall groups factors into product operation, product revision and product transition.

**⚡ Exam tip:** SOLID = SRP, OCP, LSP, ISP, DIP. Singleton/Factory = creational; Adapter/Facade = structural; Observer/Strategy = behavioural. Branch coverage subsumes statement coverage. Validation of requirements = reviews + prototypes; traceability matrix links requirements to tests.

---

## Quick Revision Sheet

1. Software = programs + data + documentation; does **not wear out** but **deteriorates**; software crisis ~ **1960s** (NATO 1968).
2. Waterfall: sequential, fixed requirements; **Prototype**: unclear requirements; **Spiral**: risk-driven (Boehm); **RAD**: 60-90 days; **Incremental**: core product first; **V-model**: test phase per dev phase.
3. Agile Manifesto 2001: individuals, working software, customer collaboration, responding to change. Scrum: PO, SM, team; sprint 1-4 weeks, daily 15-min scrum. XP: pair programming, TDD, refactoring.
4. Verification = "building product right" (static); Validation = "building right product" (dynamic).
5. SRS = **what** not how; IEEE 830; FR = services, NFR = quality constraints/performance.
6. Feasibility: technical, economic, operational, legal, schedule.
7. Cohesion (worst→best): Coincidental, Logical, Temporal, Procedural, Communicational, Sequential, Functional.
8. Coupling (worst→best): Content, Common, External, Control, Stamp, Data.
9. DFD level 0 = context diagram; data store ≠ entity; balancing rule between levels.
10. UML: filled diamond = composition, hollow = aggregation, hollow triangle = inheritance.
11. Testing levels: Unit → Integration → System → Acceptance; alpha (developer site), beta (user site).
12. Stub = called dummy (top-down); Driver = calling dummy (bottom-up).
13. Black-box: ECP, BVA, decision table; White-box: statement, branch, condition, path coverage, basis path.
14. V(G) = E − N + 2P = predicates + 1 = regions; e.g. E=9, N=7 → 4.
15. Regression = retest after change; Smoke = quick build check; Mutation = test-suite quality.
16. Static analysis = without executing; Dynamic = while executing (coverage, profiling, leaks).
17. FP = UFP × (0.65 + 0.01 ΣFi); EI/EO/EQ/ILF/EIF average weights 4/5/4/10/7; CAF 0.65-1.35.
18. Basic COCOMO: E = a·KLOC^b; D = 2.5·E^d; organic (2.4, 1.05, 0.38), semi (3.0, 1.12, 0.35), embedded (3.6, 1.20, 0.32).
19. Intermediate COCOMO: E = a·KLOC^b·EAF with a = 3.2 / 3.0 / 2.8; 15 cost drivers; Detailed = per phase & module.
20. PERT te = (O + 4M + P)/6, σ = (P − O)/6; CPM critical path = longest path, zero slack.
21. Risk exposure = probability × loss; Gantt = bar chart of schedule; WBS = task hierarchy.
22. ISO 9001 = quality management system (process-based, any industry); CMM levels: Initial, Repeatable, Defined, Managed, Optimizing.
23. Maintenance: corrective (bugs), adaptive (environment), perfective (features), preventive (refactor); annual maintenance = ACT × dev effort.
24. Git `pull` = fetch + merge; CI = auto build + test on every commit; Continuous Delivery = manual deploy gate, Deployment = automatic.
25. MTBF = MTTF + MTTR; Availability = MTTF/(MTTF + MTTR); Brooks' law: adding people to a late project makes it later.
26. Design principles: abstraction, modularity, information hiding, KISS, DRY, YAGNI; SOLID = SRP, OCP, LSP, ISP, DIP; GoF patterns: creational, structural, behavioural.
27. Integration: top-down (stubs), bottom-up (drivers), sandwich, big-bang; debugging: brute force, backtracking, cause elimination.
28. RE process: elicitation, analysis and negotiation (MoSCoW), specification, validation, management; traceability matrix; ISO 9126 six characteristics.
