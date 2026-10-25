# Software Engineering

> **What the exam asks:** about 3-6 questions per paper from this topic: SDLC models (Waterfall / Spiral / Prototype / Agile - which model fits which situation), testing types (black-box vs white-box, levels, alpha/beta), cohesion and coupling ranking, cyclomatic complexity V(G), COCOMO / function-point numerics, CPM/PERT, CMM levels, maintenance types, SRS, DFD/UML and V&V definitions. Most are one-line definition MCQs; 1-2 are small numeric ones.

## 1. Software, Characteristics and the Crisis

**Software** = programs + data structures + documentation (the whole, not just code). **Software engineering** (IEEE): the systematic, disciplined, quantifiable approach to development, operation and maintenance of software; i.e. application of engineering to software.

### Characteristics of software
- Software is **developed/engineered, not manufactured** in the classical sense.
- Software **does not wear out** (no physical deterioration). It **deteriorates** due to changes (maintenance introduces defects).
- Software is **logical, not physical**: most software is **custom-built**, though industry is moving to component-based assembly (reuse).
- Failure-rate curves: **hardware = bathtub curve** (infant mortality, flat useful life, wear-out); **software = idealised curve flat, actual curve has spikes after each change and a rising floor**.

### Types of software

| Type | Example |
|---|---|
| System software | OS, compiler, device drivers |
| Application software | Word processor, payroll |
| Embedded / real-time | Washing machine, ABS controller |
| Engineering/scientific | CAD, simulation |
| Web/mobile apps | e-commerce site |
| AI software | Expert systems, ML apps |

### Software crisis
- Term arose in the **late 1960s** (NATO conference, **1968**, Garmisch, Germany - where "software engineering" was coined).
- Symptoms: projects **over budget, late, poor quality, unreliable, hard to maintain, not meeting requirements**.
- Causes: increasing size and complexity, poor project management, inadequate requirements, no use of engineering methods, changing hardware.
- Solution: **software engineering discipline** - process models, methods, tools, quality assurance.

### Software quality attributes (McCall/ISO 9126 style)
Correctness, reliability, efficiency, integrity (security), usability, maintainability, flexibility, testability, portability, reusability, interoperability.

### Generic view: process, methods, tools
- **Process** = glue holding layers together (framework of activities); **Methods** = technical "how-to"; **Tools** = automated support (**CASE**).
- Generic framework activities: **communication, planning, modeling, construction, deployment**.
- **Quality focus** is the foundation layer.

**⚡ Exam tip:** "Software does not wear out but deteriorates" and "software crisis arose in the 1960s" are repeated facts. Software failure curve has *no* wear-out phase of the bathtub type.

## 2. SDLC and Process Models

**SDLC phases (classic order):** Feasibility study → Requirements analysis & specification → Design → Coding (implementation) → Testing → Deployment/Installation → Maintenance.

### 2.1 Waterfall (classic life-cycle / linear sequential)
- Phases flow downward; **each phase must finish before the next**; output of one is input to next.
- Strengths: simple, easy to manage, well-documented; good when **requirements are clear, fixed, stable**.
- Weaknesses: **no working software until late**, **inflexible to change**, **risk found late**, customer sees product only at the end.
- **Iterative waterfall** adds feedback paths to previous phases.

### 2.2 Prototyping model
- Build a quick **throw-away (or evolutionary) prototype** → customer evaluates → refine requirements → build actual system.
- Best when **requirements are unclear/ vague**; user interface heavy systems.
- Pros: reduces requirement risk, early user feedback. Cons: customer may mistake prototype for product; poor design retained; extra cost.

### 2.3 RAD (Rapid Application Development)
- **Very short cycle (60-90 days)**, component-based, parallel teams on modules, strong user involvement, uses reusable components / 4GL tools.
- Needs modularisable system and **enough human resources**; unsuitable for high technical-risk, large, non-modular systems.
- Phases: business modeling, data modeling, process modeling, application generation, testing and turnover.

### 2.4 Incremental model
- Product built and delivered in **increments**; first increment = **core product**; later increments add features. Each increment passes through a mini-waterfall.
- Early working software, less costly changes, lower initial staffing. Needs good planning/ modular architecture.
- **Iterative** = whole system built repeatedly and refined; **Incremental** = system built piece by piece.

### 2.5 Spiral model (Boehm, 1986)
- **Risk-driven**, combines waterfall + prototyping; each loop = a **phase**.
- Four quadrants per loop: **(1) Determine objectives / alternatives / constraints, (2) Identify and resolve risks (risk analysis, prototype), (3) Develop and verify (engineering), (4) Plan next iteration / customer evaluation.**
- Radius = cumulative cost; angular dimension = progress.
- Best for **large, high-risk, costly, evolving** projects. Weakness: needs risk-assessment expertise; costly; not for small projects.
- It is a **meta-model** (can accommodate other models).

### 2.6 V-model (verification and validation model)
- Extension of waterfall bent upward: each development phase has a **corresponding test phase** planned in parallel.

```
Requirements ........................ Acceptance testing
  System design .................... System testing
    High-level (architecture) design .... Integration testing
      Low-level (module) design ......... Unit testing
              \ Coding /
```
- **Verification** = "Are we building the product right?" (reviews, inspections, walkthroughs - static, no execution).
- **Validation** = "Are we building the right product?" (testing - dynamic, execution).

### 2.7 Agile
**Agile Manifesto (2001)** values: **Individuals and interactions** over processes and tools; **Working software** over comprehensive documentation; **Customer collaboration** over contract negotiation; **Responding to change** over following a plan. (Items on the right still have value; left valued *more*.)

**Scrum**
- Roles: **Product Owner** (backlog, priorities), **Scrum Master** (facilitator, removes impediments), **Development Team**.
- Artifacts: **Product backlog, Sprint backlog, Increment**.
- Events: **Sprint** (time-box, usually **1-4 weeks**), **Sprint planning, Daily Scrum (15 minutes), Sprint review, Sprint retrospective**.

**XP (Extreme Programming)** - Kent Beck: **pair programming, test-driven development (TDD), refactoring, continuous integration, small releases, simple design, collective code ownership, on-site customer, 40-hour week, coding standards, planning game**. Values: communication, simplicity, feedback, courage (and respect).

Other agile methods: Kanban, Crystal, DSDM, FDD, Lean.

### 2.8 Comparison of models

| Model | Requirements | Risk handling | Customer involvement | Best for |
|---|---|---|---|---|
| Waterfall | Clear, fixed | Poor (late) | Low (end) | Small, stable projects |
| Prototype | Unclear | Reduces requirement risk | High | UI-heavy, vague needs |
| RAD | Known, modular | Medium | Very high | Short-time business apps |
| Incremental | Core known | Medium | Medium | Early delivery needed |
| Spiral | Evolving | **Explicit risk analysis** | High | Large, risky projects |
| V-model | Fixed | Early test planning | Low | Safety critical, testing emphasis |
| Agile | Changing | Continuous | **Very high** | Dynamic requirements |

**⚡ Exam tip:** "Risk analysis" → **Spiral**. "Unclear requirements" → **Prototype**. "Clear & fixed requirements / sequential" → **Waterfall**. "Verification & validation phases mapped" → **V-model**. "Daily stand-up / sprint" → **Scrum**. "Pair programming" → **XP**.

## 3. Requirements Engineering

**Requirements engineering** = process of establishing services a system should provide and constraints under which it operates. Steps: **Inception → Elicitation → Elaboration → Negotiation → Specification → Validation → Management**.

### Elicitation techniques
Interviews, questionnaires/surveys, observation (ethnography), **brainstorming/JAD (Joint Application Development)**, **use cases/scenarios**, prototyping, document analysis, **FAST** (facilitated application specification technique), **QFD** (quality function deployment).

### Types of requirements

| Functional | Non-functional (NFR) |
|---|---|
| What the system **does** (services, inputs, outputs, behaviour) | **How well / constraints**: performance, reliability, security, usability, portability, maintainability, response time |
| e.g. "System shall generate monthly bill" | e.g. "Response within 2 s for 95% requests" |

- **Domain requirements**: from application domain. **User requirements** (natural language, for customers) vs **system requirements** (detailed, for developers).
- Good requirement = **complete, consistent, unambiguous, verifiable/testable, traceable, modifiable**. "User-friendly" is bad because it is **not verifiable**.
- Requirement problems: **ambiguity, inconsistency (contradictions), incompleteness**.

### Feasibility study
Types: **Technical, Economic (cost-benefit), Operational, Legal, Schedule**. Output = feasibility report (go/no-go).

### SRS (Software Requirements Specification)
- Formal document of agreed requirements; **IEEE 830** is the standard for SRS. Describes **what** not **how**.
- Contents: Introduction (purpose, scope, definitions), Overall description, Specific requirements (functional, external interface, performance, design constraints, attributes), Appendices.
- Characteristics: correct, unambiguous, complete, consistent, ranked for importance/stability, verifiable, modifiable, **traceable**.
- Should **not** contain design/implementation details.
- Tools: **decision tables, decision trees, structured English**, DFD, ER diagram, use-case.

**⚡ Exam tip:** SRS = *what* the system should do (no design details); IEEE 830 = SRS. Requirements must be *testable*; "fast / user-friendly" are poor requirements.
