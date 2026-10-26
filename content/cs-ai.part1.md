# AI, Machine Learning, Image Processing & Graphics

> **What the exam asks:** about 3-5 questions per paper, mostly one-line definitional MCQs: father of AI / Turing test, expert-system components and tools, first step of image processing (image acquisition), analog vs digital image, pixel, Prolog/LISP, perceptron, supervised vs unsupervised, graphics (DDA/Bresenham, transformations, clipping), morphing, aliasing, multimedia/compression. Know definitions cold; do a few numeric drills (image size, Bresenham, precision/recall).

## 1. Introduction to AI

### Definition and goals
- **Artificial Intelligence (AI):** the branch of computer science that builds machines/software able to perform tasks that normally need human intelligence (reasoning, learning, perception, language, problem solving).
- Term coined by **John McCarthy** in **1956** (Dartmouth Conference). McCarthy also created **LISP** (1958). Alan Turing = "father of theoretical computer science / AI pioneer".
- Four views of AI (Russell & Norvig): thinking humanly, thinking rationally, acting humanly (Turing test), acting rationally (**rational agent** approach, the modern view).

### History milestones

| Year | Event |
|---|---|
| 1943 | McCulloch-Pitts artificial neuron |
| 1950 | Turing paper "Computing Machinery and Intelligence" - Turing Test |
| 1956 | Dartmouth workshop; term "AI" |
| 1958 | LISP (McCarthy) |
| 1965 | ELIZA (Weizenbaum) - early chatbot; DENDRAL (first expert system) |
| 1972 | PROLOG (Colmerauer); MYCIN (medical expert system, 1970s) |
| 1980s | Expert-system boom; backpropagation popularised |
| 1997 | IBM Deep Blue beats Kasparov (chess) |
| 2011 | IBM Watson wins Jeopardy |
| 2016 | AlphaGo beats Lee Sedol |

### Turing Test
- Proposed by **Alan Turing (1950)** ("imitation game"). A human interrogator converses (text only) with a human and a machine; if the interrogator cannot tell which is the machine, the machine passes = shows intelligent behaviour.
- Tests only behaviour, not understanding (Searle's Chinese Room is the classic objection).
- Do not confuse with **Turing machine** (abstract computing model, TOC).

### Types of AI
- By capability: **Narrow/Weak AI** (one task: chess, Siri), **General/Strong AI** (human-level, hypothetical), **Super AI** (beyond human).
- By functionality: reactive machines, limited memory, theory of mind, self-aware.

### Agents and environments
- **Agent** = anything that perceives its environment through **sensors** and acts through **actuators**. Agent function maps percept history → action.
- **Rational agent:** chooses the action expected to maximise its performance measure.
- Agent types (increasing power): simple reflex → model-based reflex → goal-based → utility-based → **learning agent**.
- **PEAS** description: Performance measure, Environment, Actuators, Sensors (e.g. taxi: safety/profit; roads; steering/brake; camera/GPS).
- Environment properties: fully vs partially observable; deterministic vs stochastic; episodic vs sequential; static vs dynamic; discrete vs continuous; single vs multi-agent. Chess = fully observable, deterministic, discrete, multi-agent; taxi driving = partially observable, stochastic, continuous.

### Applications
Expert systems, NLP/speech recognition, computer vision, robotics, game playing, medical diagnosis, recommendation, autonomous vehicles, spam filtering.

**⚡ Exam tip:** McCarthy = coined "AI" + LISP; Turing = Turing Test (1950); Weizenbaum = ELIZA; first expert system = DENDRAL; MYCIN = medical diagnosis (bacterial infections).

## 2. Problem Solving and Search

### Problem formulation
A search problem = **initial state, actions (successor function), goal test, path cost**. State space = graph of all reachable states. Evaluate algorithms on: **completeness, optimality, time, space**. b = branching factor, d = depth of shallowest goal, m = max depth.

### Uninformed (blind) search

| Algorithm | Data structure | Complete | Optimal | Time | Space |
|---|---|---|---|---|---|
| **BFS** | Queue (FIFO) | Yes (finite b) | Yes if step costs equal | O(b^d) | O(b^d) |
| **DFS** | Stack (LIFO)/recursion | No (infinite depth/loops) | No | O(b^m) | O(b·m) |
| **Uniform-cost (UCS)** | Priority queue by g(n) | Yes | **Yes** (any positive costs) | O(b^(1+⌊C*/ε⌋)) | same |
| **Depth-limited** | DFS with limit l | No (if l < d) | No | O(b^l) | O(b·l) |
| **Iterative deepening (IDDFS)** | DFS repeated l = 0,1,2.. | Yes | Yes (equal costs) | O(b^d) | **O(b·d)** |
| Bidirectional | two BFS | Yes | Yes | O(b^(d/2)) | O(b^(d/2)) |

- BFS explores level by level, finds shallowest goal; memory is its problem.
- IDDFS = BFS's completeness/optimality + DFS's low memory; the repeated work is small.

### Informed (heuristic) search
- Uses **heuristic h(n)** = estimated cost from n to goal. Evaluation f(n):
```
Greedy best-first : f(n) = h(n)            (not optimal, not complete)
A*                : f(n) = g(n) + h(n)     g = cost so far
```
- **Admissible heuristic:** never overestimates the true cost: h(n) ≤ h*(n). **Consistent (monotone):** h(n) ≤ c(n,n') + h(n'). Consistent ⇒ admissible.
- **A\*** is complete and **optimal** if h is admissible (tree search) / consistent (graph search). Space is its drawback.
- h(n) = 0 turns A* into UCS. Examples of admissible h: straight-line distance (route finding), Manhattan distance / misplaced tiles (8-puzzle).

### Local search
- **Hill climbing:** keep moving to the best neighbouring state; stops when no neighbour is better. Needs only current state (O(1) memory). Problems: **local maxima, plateau, ridges**. Variants: steepest-ascent, stochastic, random-restart.
- **Simulated annealing:** sometimes accepts worse moves with probability e^(−ΔE/T), T decreases - escapes local maxima.
- **Genetic algorithm:** population, selection, crossover, mutation.

### Adversarial search (games)
- **Minimax:** two players MAX and MIN; MAX picks the child with maximum value, MIN with minimum. Complete & optimal vs optimal opponent for finite trees; time O(b^m), space O(b·m) (DFS).
- **Alpha-beta pruning:** same result as minimax but skips branches that cannot affect the decision. α = best (highest) value found for MAX so far, β = best (lowest) for MIN; **prune when α ≥ β**. Best case time **O(b^(m/2))** (doubles the searchable depth) with perfect move ordering; worst case = minimax.
- Worked mini-example: root MAX with two MIN children; left MIN leaves (3, 5) → value 3; in right MIN node first leaf is 2 (≤ 3), so it is already worse for MAX → remaining leaves pruned. Root = 3.

### Worked example: BFS vs DFS order
Tree: S has children A, B (left to right); A has children C, D; B has child E.

```
        S
      /   \
     A     B
    / \     \
   C   D     E
```

- **BFS** (queue, level by level): S, A, B, C, D, E.
- **DFS** (stack/recursion, goes deep first, left child first): S, A, C, D, B, E.
- Hill climbing follows only one path and keeps just the current node, so it needs O(1) memory but may stop at a local maximum.
- Hill climbing in one line: current = start; loop: pick the best neighbour; if it is not better than current, return current.

**⚡ Exam tip:** BFS=queue, DFS=stack; UCS & A* use priority queue; A* optimal only if h is admissible; alpha-beta never changes the minimax answer, only the work done.

## 3. Knowledge Representation and Logic

### Requirements of a good KR scheme
Representational adequacy, inferential adequacy, inferential efficiency, acquisitional efficiency.

### Propositional logic
- Statements that are True/False; connectives ¬, ∧, ∨, →, ↔. No variables/quantifiers. Cannot express "all/some" about objects.
- **Modus Ponens:** P, P → Q ⊢ Q. **Modus Tollens:** ¬Q, P → Q ⊢ ¬P. **Resolution** is the standard inference rule (works on clauses in CNF).
- Tautology = always true; contradiction = always false; satisfiable = true for some assignment.

### First-order (predicate) logic - FOL
- Adds **objects, predicates, functions, variables, quantifiers** ∀ (for all), ∃ (there exists).
- "All humans are mortal": ∀x Human(x) → Mortal(x). "Some student is clever": ∃x Student(x) ∧ Clever(x).
- Rule of thumb: ∀ goes with →, ∃ goes with ∧. More expressive than propositional logic.
- **Unification** = finding a substitution that makes two expressions identical (used by resolution and Prolog).

### Other schemes

| Scheme | Idea |
|---|---|
| **Semantic network** | Graph: nodes = concepts/objects, labelled arcs = relations (is-a, has-part, instance-of); supports **inheritance** |
| **Frames** (Minsky) | Record-like structure: frame name + **slots** (attributes) with values, defaults, procedures; inheritance through is-a hierarchy |
| **Production rules** | IF condition THEN action; used in rule-based/expert systems; working memory + rule base + inference engine |
| **Scripts** (Schank) | Stereotyped event sequences (restaurant script) |
| Conceptual dependency, ontologies | Meaning/primitive-based; formal concept hierarchies |

- **Forward chaining:** data-driven, starts from known facts, derives conclusions. **Backward chaining:** goal-driven, starts from goal and works back to facts (Prolog, MYCIN).

**⚡ Exam tip:** Semantic net = graph with is-a links; frame = slots & fillers; production rule = IF-THEN. Predicate logic is more powerful than propositional because of quantifiers and predicates.

## 4. Expert Systems and Fuzzy Logic

### Expert system (ES)
- A program that emulates a human expert's decision-making in a narrow domain using a knowledge base and inference rules.
- **Components:**
  1. **Knowledge base** - facts + rules (domain knowledge)
  2. **Inference engine** - applies rules (forward/backward chaining) to derive conclusions
  3. **User interface** - dialogue with user
  4. **Explanation facility** - tells why/how a conclusion was reached
  5. **Knowledge acquisition module** - gets knowledge from experts
  6. Working memory (current facts)
- People: **domain expert**, **knowledge engineer** (encodes knowledge), end user.
- **Advantages:** consistent, available 24x7, preserves/replicates expertise, reduces cost/time, no fatigue/emotion. **Limitations:** no common sense, cannot learn by itself (classic ES), narrow domain, knowledge acquisition is hard, no creativity.
- **Development tools / shells:** **EMYCIN** (empty MYCIN), **CLIPS**, **Prolog, LISP**, OPS5, Jess, Exsys. An expert-system **shell** = ES with the domain knowledge removed; advantage of a development tool/shell = faster, cheaper development as inference engine and UI come ready-made.
- **Examples:** DENDRAL (chemistry/molecular structure), **MYCIN** (diagnose blood infections, recommend antibiotics), PROSPECTOR (mineral exploration), XCON/R1 (configure DEC VAX computers), CADUCEUS, DENDRAL.

### Fuzzy logic
- Proposed by **Lotfi Zadeh (1965)**. Truth values are degrees in **[0, 1]**, not just 0/1; handles vagueness ("warm", "tall").
- **Fuzzy set:** membership function μ_A(x) ∈ [0,1]. Operations: AND (intersection) = min(μA, μB); OR (union) = max(μA, μB); NOT = 1 − μA.
- Steps: **Fuzzification** → rule evaluation (inference, IF-THEN fuzzy rules) → **Defuzzification** (e.g. centroid) → crisp output.
- Applications: washing machines, AC, camera autofocus, ABS brakes, control systems.
- Example: μ(tall)=0.7, μ(heavy)=0.4 → AND = 0.4, OR = 0.7, NOT tall = 0.3.

**⚡ Exam tip:** ES components = knowledge base + inference engine + user interface (+ explanation, acquisition). MYCIN = medical; EMYCIN/CLIPS = shells; fuzzy AND = min, OR = max.

## 5. Neural Networks

### Biological vs artificial neuron
Dendrites = inputs, synapse = weights, soma = summation + activation, axon = output.

### Perceptron (Rosenblatt, 1957)
- Single-layer, single neuron, **linear binary classifier**.
```
net = Σ wi·xi + b
output = 1 if net ≥ threshold (or > 0), else 0
Learning rule:  wi(new) = wi + η (t − y) xi
```
- Learns only **linearly separable** functions (AND, OR yes; **XOR no**) - Minsky & Papert (1969). XOR needs a **multi-layer perceptron (MLP)** with a hidden layer.
- Worked: AND gate, w1=w2=1, threshold 1.5: (1,1) → 2 ≥ 1.5 → 1; (1,0) → 1 < 1.5 → 0. Works.

### Activation functions

| Function | Formula | Range |
|---|---|---|
| Step | 1 if x ≥ 0 else 0 | {0,1} |
| Sigmoid | 1/(1 + e^(−x)) | (0,1) |
| Tanh | (e^x − e^(−x))/(e^x + e^(−x)) | (−1,1) |
| ReLU | max(0, x) | [0, ∞) |
| Softmax | e^xi / Σ e^xj | probabilities summing to 1 (multi-class output) |

### Architectures and training
- **Feed-forward** (signals one way) vs **recurrent** (feedback loops).
- **Backpropagation:** forward pass computes output → error (loss) measured → error propagated backward using the chain rule → weights updated by **gradient descent**: w ← w − η·∂E/∂w. η = learning rate. One pass over all data = **epoch**.
- **CNN** (Convolutional NN): convolution + pooling layers, for images/vision. **RNN**: has memory over sequences (text, speech); **LSTM** fixes vanishing gradient. **Deep learning** = NN with many hidden layers.
- Other: **Hopfield** network (associative memory), **Kohonen SOM** (unsupervised), **autoencoder**, **GAN**, **Transformer** (attention; basis of LLMs).
- Vanishing gradient: gradients shrink in deep nets with sigmoid/tanh; ReLU mitigates.

**⚡ Exam tip:** A single perceptron cannot solve XOR; backpropagation = error propagated backward + gradient descent; CNN = images, RNN = sequences.
