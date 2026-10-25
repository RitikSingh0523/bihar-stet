
## Boolean Algebra & Logic Gates

### Basic laws and postulates

| Law | AND form | OR form |
|---|---|---|
| Identity | A·1 = A | A + 0 = A |
| Null (dominance) | A·0 = 0 | A + 1 = 1 |
| Idempotent | A·A = A | A + A = A |
| Complement | A·A' = 0 | A + A' = 1 |
| Involution | (A')' = A | |
| Commutative | AB = BA | A + B = B + A |
| Associative | (AB)C = A(BC) | (A+B)+C = A+(B+C) |
| Distributive | A(B+C) = AB + AC | A + BC = (A+B)(A+C) |
| Absorption | A(A+B) = A | A + AB = A |
| Redundancy | A(A'+B) = AB | A + A'B = A + B |
| Consensus | (A+B)(A'+C)(B+C) = (A+B)(A'+C) | AB + A'C + BC = AB + A'C |

- Second distributive law (A + BC = (A+B)(A+C)) has no counterpart in ordinary algebra.
- **Duality principle:** swap AND↔OR and 0↔1 (variables unchanged) to get the dual identity; every true identity's dual is also true.
- **Boolean complement vs dual:** the complement of a function inverts variables too; the dual does not.

### De Morgan's theorems
```
(A · B)' = A' + B'        (A + B)' = A' · B'
Generalised: (ABC...)' = A'+B'+C'+...   (A+B+C...)' = A'B'C'...
```
- To complement an expression: swap AND↔OR and complement each literal.
- Useful for converting between NAND/NOR forms and AND-OR forms; De Morgan's theorem is especially helpful for simplifying expressions with **an inverted (complemented) sum or product - i.e. NOT over several variables**.
- Bubbled-AND = NOR; bubbled-OR = NAND.

### Gates and truth tables

| Gate | Expression | Output 1 when |
|---|---|---|
| AND | A·B | all inputs 1 |
| OR | A+B | at least one 1 |
| NOT | A' | input 0 |
| NAND | (AB)' | not all inputs 1 |
| NOR | (A+B)' | all inputs 0 |
| XOR | A⊕B = A'B + AB' | inputs differ (odd number of 1s) |
| XNOR | (A⊕B)' = AB + A'B' | inputs same (equivalence) |

- XOR identities: A⊕0 = A, A⊕1 = A', A⊕A = 0, A⊕A' = 1. Associative and commutative.
- XOR of n inputs = 1 iff an **odd** number of inputs are 1 (odd-parity generator). XNOR of n inputs = even parity.
- 2-input XNOR = **coincidence / equality** gate.
- NOT can be built from XOR with 1; XOR from 4 NANDs.

### Universal gates
- **NAND and NOR are universal**: any logic function can be built using only one of them. AND, OR, XOR, XNOR are not universal.
- NAND realisations: NOT = NAND with inputs tied; AND = NAND + NOT; OR = NOT inputs then NAND (A'·B')' = A+B.
- NOR realisations: NOT = NOR with inputs tied; OR = NOR + NOT; AND = (A'+B')' = AB.
- Two-level AND-OR (SOP) = two-level NAND-NAND. Two-level OR-AND (POS) = NOR-NOR.
- NAND and NOR are **not** associative: (A↑B)↑C ≠ A↑(B↑C).
- Gate count to make XOR: 4 NAND gates (or 5 NOR gates).
- Fan-in = number of inputs; fan-out = number of gates an output can drive. Noise margin: difference between guaranteed output and required input levels.
- Logic families: TTL (fast, 5 V, NAND basic), CMOS (low power, high noise margin), ECL (fastest, non-saturated). Positive logic: high = 1; negative logic: low = 1 (AND in positive = OR in negative).

**⚡ Exam tip:** A + A'B = A + B and A + AB = A are used constantly. Universal gates = NAND, NOR (only these two). XOR output is 1 for an odd number of 1s.

## Canonical Forms: SOP, POS & Minterms

- **Literal:** a variable or its complement. **Product term** = AND of literals; **sum term** = OR of literals.
- **Minterm (mᵢ):** product term containing ALL n variables once; equals 1 for exactly one input combination (variable = 1, complemented if 0). m5 for ABC = 101 → AB'C.
- **Maxterm (Mᵢ):** sum term containing all variables; equals 0 for exactly one combination (variable complemented if 1). M5 = A' + B + C'.
- Relation: mᵢ' = Mᵢ.
- **Canonical SOP** = Σm(...) = OR of minterms where function is 1. **Canonical POS** = ΠM(...) = AND of maxterms where function is 0.
- The same function in both forms uses complementary index lists: for 3 variables, F = Σm(1,3,5) = ΠM(0,2,4,6,7), and F' = Σm(0,2,4,6,7).
- n variables → 2ⁿ minterms and 2ⁿ maxterms; number of distinct Boolean functions of n variables = 2^(2ⁿ) (2 vars: 16; 3 vars: 256).
- **Standard (non-canonical) form:** product/sum terms need not contain all variables.
- Converting a term to canonical form: multiply a missing variable by (X + X').

```
Example: F = A + B'C  (3 vars A,B,C)
A      = A(B+B')(C+C') = ABC + ABC' + AB'C + AB'C'
B'C    = B'C(A+A')    = AB'C + A'B'C
F = Σm(1,4,5,6,7)  = ΠM(0,2,3)
```

- **Don't-care (d or X):** input combinations that never occur or whose output does not matter; used in K-maps as 1 or 0 whichever gives bigger groups.
- **Implicant:** product term that implies F. **Prime implicant:** implicant not contained in a larger one. **Essential prime implicant:** covers a minterm no other prime implicant covers.
- Methods: algebraic, K-map (≤ 5-6 variables), Quine-McCluskey tabular method (any number, computer-friendly).

**⚡ Exam tip:** Minterm = AND term with 1 → uncomplemented; maxterm = OR term with 0 → uncomplemented. For F with k minterms of n variables there are 2ⁿ − k maxterms.

## Karnaugh Maps

### Layout and rules
- 2-variable: 4 cells; 3-variable: 8 cells; 4-variable: 16 cells; 5-variable: 32 cells (two 4-variable maps stacked; also mirror adjacency).
- Rows/columns labelled in **Gray code order** (00, 01, 11, 10) so neighbouring cells differ by one variable.
- Group adjacent 1s in rectangles of size 1, 2, 4, 8, 16 (powers of 2). Groups may wrap around edges (map is a torus); corners of a 4-variable map are adjacent.
- Larger group = fewer literals: a group of 2ᵏ cells eliminates k variables.
  - Pair → 1 variable eliminated; quad → 2; octet → 3.
- Rules: cover all 1s, use fewest and largest groups, overlap allowed, no diagonal groups, include only the 1s (and useful don't-cares).
- **SOP:** group 1s, write product terms. **POS:** group 0s, write sum terms with complemented sense (variable = 1 → complemented, 0 → true literal).
- **Redundant group:** group whose all cells are already covered by other groups.

### 4-variable cell numbering (ABCD, rows AB, columns CD)
```
        CD=00 01  11  10
AB=00 |   0    1   3   2
AB=01 |   4    5   7   6
AB=11 |  12   13  15  14
AB=10 |   8    9  11  10
```

### Worked example (from past papers)
F(A,B,C,D) = Σm(0,1,2,4,5,6,8,9,10,12,13,14). All cells are 1 except 3, 7, 11, 15 (the column CD = 11).
```
Group {0,1,4,5,8,9,12,13} (C=0) → C'
Group {0,2,4,6,8,10,12,14} (D=0) → D'
F = C' + D'   (= (CD)')
```
Using zeros (POS): the only zeros form the quad CD = 11 → F' = CD → F = (CD)' = C' + D'.

### Don't cares
```
F = Σm(1,3,7,11,15) + d(0,2,5)    (4 variables)
Group {1,3,5,7}→ A'D ; {3,7,11,15} → CD ; use d(0,2) not needed
F = A'D + CD
```
- A don't-care may be included only if it enlarges a group; never need to cover all don't-cares.

### 5-variable maps
- Two 4×4 maps (E = 0 and E = 1 or A = 0 / A = 1). Cell in one layer is adjacent to the same cell in the other layer (like folding one map on the other).
- Group size 32 → F = 1. Quad across layers eliminates the layer variable.

### Number of terms
- Highest simplification of an n-variable function by a K-map: a single group of all 2ⁿ cells gives F = 1.
- Minimum SOP isn't always unique; essential prime implicants must always be included.

**⚡ Exam tip:** Gray order (00,01,11,10) is the trap - never 00,01,10,11. A group of 8 in a 4-variable map leaves one single-literal term. Corners are adjacent.

## Combinational Circuits

Output depends only on current inputs (no memory). Examples: adders, subtractors, comparators, MUX/DEMUX, encoder/decoder, code converters, ROM/PLA.

### Adders
```
Half adder:  Sum = A ⊕ B        Carry = A·B          (1 XOR + 1 AND)
Full adder:  Sum = A ⊕ B ⊕ Cin  Cout = AB + Cin(A⊕B) = AB + BCin + ACin
```
- Half adder: 2 inputs, 2 outputs; no carry-in. Full adder: 3 inputs, 2 outputs; = 2 half adders + 1 OR gate. Full adder with NAND only: 9 gates.
- Sum is 1 for an odd number of 1s (m1,2,4,7); Carry is 1 for 2 or more ones (m3,5,6,7).
- **n-bit ripple-carry adder:** n full adders chained; delay ∝ n (carry ripples). 
- **Carry look-ahead adder:** Generate Gᵢ = AᵢBᵢ, Propagate Pᵢ = Aᵢ⊕Bᵢ; Cᵢ₊₁ = Gᵢ + PᵢCᵢ. Carries computed in parallel → much faster but more hardware.
- 4-bit parallel adder IC: 7483. BCD adder = 4-bit binary adder + correction (+6) circuit when sum > 9 or carry = 1.
- Adder-subtractor: XOR gates on B input controlled by mode M; Cin = M. M=0 add; M=1 → B' + 1 = 2's complement subtraction.

### Subtractors
```
Half subtractor: Diff = A ⊕ B        Borrow = A'·B
Full subtractor: Diff = A ⊕ B ⊕ Bin  Bout = A'B + A'Bin + B·Bin
```

### Comparator
- 1-bit: A>B = AB', A<B = A'B, A=B = (A⊕B)' (XNOR). n-bit: compare MSB first; equality needs all bits equal. IC 7485 = 4-bit magnitude comparator.

### Multiplexer (MUX, data selector)
- 2ⁿ data inputs, n select lines, 1 output. 4:1 MUX: Y = S1'S0'I0 + S1'S0 I1 + S1 S0' I2 + S1 S0 I3.
- Any n-variable function can be implemented with a 2ⁿ:1 MUX, or with a **2ⁿ⁻¹:1 MUX** using one variable on data inputs (0, 1, X or X').
- 2ⁿ:1 MUX built from 2:1 MUXes needs 2ⁿ − 1 units (8:1 = 7 of 2:1; 16:1 from 4:1 needs 5).
- A MUX is a "parallel-to-serial converter" and also a universal logic element.

### Demultiplexer (DEMUX)
- 1 data input, n select lines, 2ⁿ outputs; routes input to the selected output (serial-to-parallel). A 1:4 DEMUX = a 2:4 decoder with the data input used as enable.

### Decoder
- n inputs → up to 2ⁿ outputs; exactly one output active per input code (generates all minterms). 3:8 decoder (74138) has 3 enables.
- Any function of n variables = OR of its minterm outputs → decoder + OR gate; with NAND outputs (active low) use a NAND gate.
- 2:4 decoder needs 4 AND gates (+2 NOT). Larger decoders: 4:16 from two 3:8 (using enable).
- BCD-to-7-segment decoder drives displays (common anode: active low; common cathode: active high).

### Encoder
- 2ⁿ (or fewer) inputs → n outputs (inverse of decoder). 8:3 encoder uses 3 OR gates. Plain encoder wrong if more than one input is active.
- **Priority encoder:** highest-priority active input is encoded (74148 8:3); has a valid output flag.

### Code converters
- Binary → Gray: Gᵢ = Bᵢ ⊕ Bᵢ₊₁ (n−1 XORs for n bits). Gray → binary: chain of XORs.
- BCD → Excess-3: add 0011 (4-bit adder with constant).

### Programmable logic (PLA, PAL, ROM)

| Device | AND array | OR array |
|---|---|---|
| ROM | fixed (full decoder: all 2ⁿ minterms) | programmable |
| PAL | programmable | fixed |
| PLA | programmable | programmable (most flexible) |

- ROM with n address lines and m outputs: 2ⁿ × m bits; it is a combinational decoder + OR. Used for look-up tables/code converters.
- Types: mask ROM, PROM (one time), EPROM (UV erasable), EEPROM (electrical), Flash. PLA is efficient for multiple functions sharing product terms. CPLD/FPGA are larger programmable devices.

**⚡ Exam tip:** Full adder = 2 half adders + OR. 2ⁿ:1 MUX has n select lines; decoder n:2ⁿ. PLA: both arrays programmable; PAL: only AND; ROM: only OR.

## Sequential Circuits: Latches & Flip-Flops

Outputs depend on present inputs AND past state (memory). **Synchronous:** state changes at clock edges. **Asynchronous:** state changes on input changes; no clock.

### Latch vs flip-flop
- **Latch:** level-sensitive (transparent while enable = 1). **Flip-flop:** edge-triggered (changes only at a clock edge, +ve or −ve). A flip-flop stores 1 bit.
- Bistable: two stable states. Basic latch made of 2 cross-coupled NOR (SR, active-high) or NAND (S'R', active-low) gates.
- **Race-around condition:** in a level-triggered JK with J = K = 1, output toggles repeatedly while clock is high (when pulse width > propagation delay). Cured by **master-slave** or edge-triggered design.
- Clock-triggering: +ve/−ve edge (flip-flop), level (latch), pulse (master-slave).
- **Asynchronous inputs:** Preset (set Q=1) and Clear (reset Q=0) override the clock.
- Setup time: data must be stable before the clock edge; hold time: stable after the edge.

### Characteristic and excitation tables

| FF | Characteristic equation | Behaviour |
|---|---|---|
| SR | Q⁺ = S + R'Q (with SR = 0) | S=R=0 hold; S=1,R=0 set; S=0,R=1 reset; **S=R=1 invalid** |
| D | Q⁺ = D | Output follows D (delay FF) |
| JK | Q⁺ = JQ' + K'Q | J=K=0 hold; 01 reset; 10 set; **11 toggle** |
| T | Q⁺ = T ⊕ Q = TQ' + T'Q | T=0 hold; T=1 toggle |

**Excitation table (Q → Q⁺ : required inputs)**

| Q | Q⁺ | S R | J K | D | T |
|---|---|---|---|---|---|
| 0 | 0 | 0 X | 0 X | 0 | 0 |
| 0 | 1 | 1 0 | 1 X | 1 | 1 |
| 1 | 0 | 0 1 | X 1 | 0 | 1 |
| 1 | 1 | X 0 | X 0 | 1 | 0 |

- JK is the most versatile (no invalid state; JK with J=K=T gives T; K = J' gives D). 
- SR 11 is forbidden for NOR latch (both outputs 0; unpredictable when released).

### Conversions between flip-flops
Procedure: write the required FF's excitation table next to the available FF's, get inputs as functions of (external input, Q) using a K-map.
```
JK → T :   J = K = T
JK → D :   J = D,  K = D'
D → T   :  D = T ⊕ Q
SR → D  :  S = D,  R = D'
SR → JK :  S = J·Q',  R = K·Q
SR → T  :  S = T·Q',  R = T·Q
D → JK  :  D = JQ' + K'Q
```
- A T flip-flop can be made from JK by tying J and K together; a D flip-flop with D = Q' acts as a toggle (divide-by-2).
- A flip-flop output frequency = clock/2 when toggling (divide by 2).

**⚡ Exam tip:** Memorise Q⁺ equations and the excitation table. JK 11 = toggle; SR 11 = invalid; D = delay; T = toggle. Race-around happens only in level-triggered JK (J=K=1); fixed by master-slave.

## Registers & Counters

### Registers
- Register = group of n flip-flops storing n bits (D-type typical). Loads in parallel on a clock.
- **Shift register:** bits shift one place per clock. Modes: SISO, SIPO (serial → parallel), PISO (parallel → serial), PIPO. Serial transfer of n bits needs n clocks; parallel needs 1.
- n-bit shift register needs n flip-flops; delaying a serial stream by n clock pulses.
- **Ring counter:** shift register with Q_last fed to D_first; one 1 circulates; **n FFs → n states** (one-hot). **Johnson (twisted-ring) counter:** Q' of last fed back; **n FFs → 2n states**; self-decoding with 2-input gates.
- Universal shift register (74194): parallel load + left/right shift.

### Asynchronous (ripple) counters
- Flip-flops clocked by the previous stage's output; clock isn't common. T/JK(T=1) flip-flops used.
- n FFs → mod-2ⁿ counter; counts 0 to 2ⁿ − 1. Each stage divides frequency by 2: f_out = f_clk / 2ⁿ (mod-N: f_clk/N).
- Up counter: next FF clocked from Q of previous (with −ve edge triggering); down counter: from Q' of previous.
- Delays add up (**propagation delay accumulates**): total ≈ n × tpd; max clock frequency = 1 / (n·tpd) (for decoding all). Glitches during transitions; slower.

### Synchronous counters
- All FFs share the same clock; the next state is controlled by logic on J/K (or T) inputs. Delay independent of n (one FF delay + gate). Faster, more hardware.
- 4-bit synchronous up counter: T0 = 1, T1 = Q0, T2 = Q0Q1, T3 = Q0Q1Q2.

| | Ripple (asynchronous) | Synchronous |
|---|---|---|
| Clock | stage → stage | common to all |
| Speed | slow (delays add) | fast |
| Hardware | simple | extra gates |
| Glitches | yes (decoding) | no |

### Mod-n (modulus) counters
- Mod-N counter has N states. Needs minimum **n = ⌈log₂ N⌉ flip-flops** (mod-10 → 4 FFs; mod-60 → 6 FFs; 2ⁿ ≥ N).
- Non-2ⁿ modulus in a ripple counter: use a NAND gate on the Q outputs of the first unwanted state to drive asynchronous **Clear**. Mod-10 (decade/BCD) counter: reset when count = 1010 (Q3 and Q1 both 1). Count 0000-1001.
- Cascading counters: mod-M followed by mod-N = mod M×N. E.g. mod-6 × mod-10 = mod-60 (clock → seconds).
- Counter IC: 7490 decade counter (mod-2 and mod-5 sections), 7493 4-bit binary, 74190/74191 up-down.
- Lock-out: unused states of a counter that never return to the main cycle; self-starting counters avoid it.

**⚡ Exam tip:** Johnson counter n FFs → 2n states; ring counter n FFs → n states. Mod-N counter needs ⌈log₂N⌉ FFs; ripple counter is slow because delays add.

## State Machines & Fault Testing

### Finite state machines (FSM)

| | Moore | Mealy |
|---|---|---|
| Output depends on | present state only | present state AND input |
| Output written on | state | transition arrow (input/output) |
| Number of states | usually more | fewer |
| Output timing | synchronous with clock, glitch-free | may change asynchronously with input |
| Response | one clock later | immediate |

- Design steps: state diagram → state table → state assignment (encoding) → next-state/output equations using excitation table → circuit.
- A sequence detector (e.g. 101) can overlap; states = pattern prefixes (S0 start, S1 "1", S2 "10", S3 "101").
- **State reduction:** merge equivalent states (same outputs and same/equivalent next states) → fewer FFs.
- n flip-flops can encode 2ⁿ states.

### State encoding

| Encoding | FFs for N states | Notes |
|---|---|---|
| Binary (full / sequential) | ⌈log₂N⌉ (2ᶠᶠ ≥ states) | minimum flip-flops, more decode logic |
| Gray | ⌈log₂N⌉ | one bit changes per step, fewer glitches |
| One-hot | N (one FF per state; exactly one is "hot") | more FFs, simplest decoding, fast; ideal for FPGAs (many FFs) |

### Hazards, glitches
- **Hazard:** unwanted momentary output glitch caused by unequal propagation delays.
- Static-1 hazard: output should stay 1 but dips to 0 (in SOP circuits, when moving between adjacent 1s in different K-map groups). Static-0 hazard: should stay 0 but spikes to 1 (POS). Dynamic hazard: multiple transitions.
- Remedy: add a **redundant prime implicant (consensus term)** covering the adjacent cells (extra group in K-map). E.g. F = AB + A'C has a static-1 hazard at B=C=1; add BC.
- A two-level SOP free from static-0 hazards; fully reliable if all prime implicants are present.

### Fault testing basics
- Faults modelled: **stuck-at-0 (s-a-0)**, **stuck-at-1 (s-a-1)**, bridging faults, open faults, delay faults. The *single stuck-at fault model* assumes one fault at a time.
- **Test vector** = input pattern for which good and faulty circuit outputs differ. Steps: activate (set the faulty line to the opposite value) and propagate (sensitise a path) to an observable output.
- To test s-a-0 on a line: drive 1 on that line; s-a-1: drive 0.
- Fault coverage = detected faults / total faults. For n lines, total single stuck-at faults = 2n.
- Test generation methods: D-algorithm, path sensitisation, Boolean difference, exhaustive test. **Redundant** circuit faults cannot be detected (no test exists).
- **Built-in self-test (BIST)** uses LFSR pattern generator and signature analyser; **scan design** converts FFs into a shift register for controllability/observability. Boundary scan = JTAG (IEEE 1149.1).
- Controllability = ease of setting a node; observability = ease of seeing its value.

**⚡ Exam tip:** Moore = output from state only; Mealy = state + input (fewer states). One-hot = one FF per state; binary = ⌈log₂N⌉. Static-1 hazard is removed by adding a redundant K-map group.

## Quick Revision Sheet

- Hex digit = 4 bits; octal digit = 3 bits; (FF)₁₆ = 255; (777)₈ = 511.
- 2's complement = flip bits + 1; range of n-bit = −2ⁿ⁻¹ to 2ⁿ⁻¹ − 1 (8-bit: −128..127).
- 1's complement and sign-magnitude both have two zeros; 2's complement has one.
- Signed overflow = carry into MSB ⊕ carry out of MSB; only for same-sign addition.
- 2's complement subtraction: carry out → discard (positive); no carry → negative, take complement.
- BCD: 0-9 only (1010-1111 invalid); correct a sum > 9 by adding 6 (0110).
- Packed BCD 16 bytes = 31 digits + 1 sign nibble; sign C/F = +, D = −; zoned zone = F.
- Excess-3 = BCD + 3; self-complementing (also 2421). Gray = one bit changes; G = B ⊕ (B >> 1).
- ASCII: 7 bits, 128 chars, 'A' = 65, 'a' = 97, '0' = 48; EBCDIC: 8 bits, IBM mainframes.
- IEEE single: 1+8+23, bias 127; double: 1+11+52, bias 1023; leading 1 implied; E=all-1s means ∞/NaN.
- De Morgan: (AB)' = A' + B'; (A+B)' = A'B'. Duality: swap AND/OR and 0/1.
- A + A'B = A + B; A + AB = A; AB + A'C + BC = AB + A'C (consensus).
- NAND and NOR are the only universal gates; XOR output = 1 for odd number of 1s; XNOR = equality.
- n variables → 2ⁿ minterms, 2^(2ⁿ) Boolean functions; minterm AND of all literals, maxterm OR of all literals.
- K-map: Gray order (00,01,11,10); groups 1,2,4,8,16; a group of 2ᵏ eliminates k variables; corners/edges wrap.
- Half adder: S = A⊕B, C = AB; full adder: S = A⊕B⊕Cin, Cout = AB + Cin(A⊕B); full adder = 2 HA + OR.
- Half subtractor: D = A⊕B, Bw = A'B. Full subtractor: D = A⊕B⊕Bin.
- MUX: 2ⁿ inputs, n select; DEMUX 1→2ⁿ; decoder n→2ⁿ; encoder 2ⁿ→n; priority encoder handles multiple actives.
- ROM: fixed AND, programmable OR; PAL: programmable AND, fixed OR; PLA: both programmable.
- Q⁺: SR = S + R'Q; D = D; JK = JQ' + K'Q; T = T⊕Q. JK 11 toggles; SR 11 invalid; race-around fixed by master-slave.
- Excitation: 0→0 JK=0X, 0→1 JK=1X, 1→0 JK=X1, 1→1 JK=X0; T = 1 when Q changes; D = Q⁺.
- JK→T: J=K=T; JK→D: J=D, K=D'; D→T: D = T⊕Q.
- Mod-N counter needs ⌈log₂N⌉ FFs; ripple counter delays add up; synchronous counter is faster; ring = n states, Johnson = 2n states.
- Moore: output from state only; Mealy: state + input; one-hot = N FFs, binary = ⌈log₂N⌉ FFs.
- Static-1 hazard removed by adding redundant prime implicant; stuck-at faults: 2 per line.
