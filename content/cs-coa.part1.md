# Computer Organization & Architecture

> **What the exam asks:** about 2-4 questions per paper, mostly one-line factual MCQs: generation and its technology, von Neumann vs Harvard, register names and roles (PC, IR, MAR, MDR, accumulator), addressing modes (immediate vs direct vs indirect), RISC vs CISC, data bus width (past paper: "how is data bus width measured" = in bits), address-space arithmetic, cache and hit ratio, memory hierarchy order, ROM types, pipelining, DMA/interrupt, Flynn's classes, storage units. Numerics are small (address split, 2^n, average access time, speedup).

## 1. Computer Generations & Classification

### Generations

| Gen | Period | Key technology | Notes |
|---|---|---|---|
| 1st | 1940-56 | Vacuum tubes | Machine language, huge, heat, unreliable; ENIAC, UNIVAC, EDVAC |
| 2nd | 1956-63 | Transistors | Assembly language, FORTRAN/COBOL; batch processing; IBM 1401, IBM 7094 |
| 3rd | 1964-71 | Integrated Circuits (SSI/MSI) | Keyboard/monitor, operating systems, multiprogramming; IBM 360 |
| 4th | 1971-present | Microprocessor (LSI/VLSI) | PCs, GUI, networks; Intel 4004 (1971) first microprocessor |
| 5th | Present and beyond | ULSI, AI, parallel processing, quantum | Natural language, expert systems, robotics |

- Order of technology: Vacuum tube → Transistor → IC → Microprocessor (VLSI) → AI/ULSI.
- Vacuum tube was invented by John Ambrose Fleming (diode) / Lee de Forest (triode); the transistor at Bell Labs (1947) by Bardeen, Brattain, Shockley.
- Charles Babbage = "Father of the computer" (Analytical Engine); Ada Lovelace = first programmer.
- Language by generation: 1GL machine, 2GL assembly, 3GL high-level (C, Pascal), 4GL SQL/report generators, 5GL AI/logic (Prolog).

### Classification of computers

**By purpose:** general purpose (PCs) vs special purpose (washing machine controller, ATM).

**By type of data handled:**

| Type | Works on | Examples |
|---|---|---|
| Analog | Continuous physical quantities | Speedometer, thermometer, seismograph |
| Digital | Discrete binary (0/1) data | PC, calculator, smartphone |
| Hybrid | Both (analog input, digital processing) | ICU/patient monitor, petrol pump, ECG |

**By size / capability:**

| Class | Features |
|---|---|
| Supercomputer | Fastest, thousands of processors, speed in FLOPS (PARAM, Cray, Summit); weather, nuclear simulation. India: PARAM (C-DAC, Vijay Bhatkar) |
| Mainframe | Large, many simultaneous users, bulk transaction processing (banks, railways); IBM z-series |
| Minicomputer | Mid-range multi-user (PDP-11, VAX) |
| Microcomputer | Single-user, built around a microprocessor: desktop, laptop, tablet, PDA |
| Embedded | Computer inside a device |

- Speed units: MIPS (millions of instructions per second) for ordinary machines; FLOPS for supercomputers (1 PFLOPS = 10¹⁵).
- Microcomputer word size examples: 8-bit (8085), 16-bit (8086), 32-bit, 64-bit.

**⚡ Exam tip:** Match "generation ↔ device": 1st tube, 2nd transistor, 3rd IC, 4th microprocessor/VLSI. Hybrid computer = analog + digital (hospital, petrol pump). Supercomputer speed is in FLOPS, not MIPS.

---

## 2. Basic Architecture: von Neumann, Harvard, CPU Components

### von Neumann vs Harvard

| Feature | von Neumann (Princeton) | Harvard |
|---|---|---|
| Memory | One memory for instructions and data | Separate instruction memory and data memory |
| Buses | Single set of address/data bus | Separate buses for instruction and data |
| Access | Instruction and data fetch cannot be simultaneous | Simultaneous fetch possible, faster |
| Bottleneck | **von Neumann bottleneck** (shared bus) | Avoided; more complex and costly |
| Used in | General-purpose PCs | DSPs, microcontrollers (8051, PIC, AVR); L1 cache split I-cache/D-cache |

- **Stored-program concept** (von Neumann, 1945; EDVAC report): program and data are stored in the same read-write memory in binary; instructions are fetched and executed sequentially.
- **Modified Harvard**: separate L1 instruction and data caches, unified main memory (modern CPUs).
- Five units of a von Neumann machine: Input, Output, Memory, ALU, Control Unit (ALU + CU + registers = CPU).

### The CPU

CPU = **ALU + Control Unit (CU) + Registers**. Microprocessor = CPU on one chip.

- **ALU**: arithmetic (add, subtract, multiply, divide) and logic (AND, OR, NOT, XOR, compare, shift) operations. Outputs status flags.
- **CU**: fetches, decodes instructions, generates control/timing signals; does not process data itself.
- **Registers**: smallest, fastest storage inside CPU (faster than cache).

### Important registers

| Register | Full name | Holds |
|---|---|---|
| **PC** | Program Counter | Address of the **next** instruction to fetch (auto-increments) |
| **IR** | Instruction Register | The instruction currently being executed |
| **MAR** | Memory Address Register | Address of the memory location to be read/written |
| **MDR / MBR** | Memory Data (Buffer) Register | Data just read from / about to be written to memory |
| **ACC** | Accumulator | Intermediate arithmetic/logic results; one operand of the ALU |
| **SP** | Stack Pointer | Address of top of stack |
| **PSW / Flag register** | Program Status Word | Status bits: Zero, Carry, Sign, Overflow, Parity, Interrupt-enable |
| **Index register** | | Offset for indexed addressing |
| **Base register** | | Base for relocation/segment addressing |

- MAR width = address-bus width; MDR width = data-bus width (word size).
- PC width decides how many addresses can be named (PC of n bits → 2ⁿ addresses).
- Program Counter is also called Instruction Pointer (IP in x86).
- Flags: Z (zero), C (carry), S (sign), V/O (overflow), P (parity), AC (auxiliary carry).

### Instruction cycle (fetch-decode-execute)

```
FETCH    : MAR ← PC
           MDR ← M[MAR]          (memory read)
           IR  ← MDR
           PC  ← PC + 1          (point to next instruction)
DECODE   : CU decodes opcode in IR, finds operand addresses
EXECUTE  : ALU/memory/I/O operation performed; result stored
(interrupt check at end of every instruction cycle)
```

- Full cycle: Fetch → Decode → (Fetch operand / effective address calculation) → Execute → (Store result). With indirect addressing an extra **indirect cycle** is added; an **interrupt cycle** follows if an interrupt is pending.
- **Machine cycle** = time to access memory/I/O once (one fetch or read/write). **Instruction cycle** = one or more machine cycles. **T-state / clock period** = smallest unit.
- Clock speed (Hz) = 1 / clock period. Example: 2 GHz → 0.5 ns per cycle.
- CPU time = instruction count × CPI × clock period. **CPI** = cycles per instruction.
- Performance MIPS = clock rate / (CPI × 10⁶). Example: 500 MHz, CPI 2 → 250 MIPS.

**⚡ Exam tip:** PC holds the address of the NEXT instruction; IR holds the CURRENT instruction; MAR holds an address; MDR holds data. Harvard = separate memories (and buses) for code and data; von Neumann = one shared memory, hence the bottleneck.

---

## 3. Instruction Formats & Addressing Modes

### Instruction format

An instruction = **Opcode** (operation) + **Operand field(s)** (addresses/values) and often a mode field.

```
| Mode | Opcode | Operand 1 | Operand 2 | ... |
```

- Opcode with n bits can encode up to 2ⁿ different operations. Example: 6-bit opcode → 64 instructions.
- Instruction length depends on opcode + number of address fields × bits per address. Example: 16-bit instruction, 6-bit opcode, 2 operand fields → 5 bits each, so each addresses 32 locations.
- **Expanding opcode**: unused opcode bit patterns reused to encode instructions with fewer address fields.

### By number of addresses

| Type | Format | Example | Notes |
|---|---|---|---|
| 3-address | OP dest, src1, src2 | ADD R1, R2, R3 (R1 ← R2 + R3) | Short programs, long instructions; RISC style |
| 2-address | OP dest/src1, src2 | ADD R1, R2 (R1 ← R1 + R2) | One operand overwritten; x86 style |
| 1-address | OP src | ADD X (ACC ← ACC + M[X]) | Implied accumulator |
| 0-address | OP | ADD (pop two, push sum) | **Stack machine**; operands implied on stack; uses PUSH/POP; postfix |

**Worked example: X = (A + B) × (C + D)**

```
3-address        2-address          1-address        0-address (stack)
ADD R1,A,B       MOV R1,A           LOAD A           PUSH A
ADD R2,C,D       ADD R1,B           ADD B            PUSH B
MUL X,R1,R2      MOV R2,C           STORE T          ADD
                 ADD R2,D           LOAD C           PUSH C
                 MUL R1,R2          ADD D            PUSH D
                 MOV X,R1           MUL T            ADD
                                    STORE X          MUL
                                                     POP X
3 instr          6 instr            7 instr          8 instr
```

- Fewer addresses → shorter instructions but more instructions in program. More addresses → fewer instructions, longer instruction format.
- 0-address instructions use **Reverse Polish (postfix) notation**; PUSH and POP themselves are 1-address.
- A "zero-address" machine is a stack architecture; a "one-address" machine uses an accumulator.

### Addressing modes

**Addressing mode** = the rule used to find the operand (effective address, EA) from the address field.

| Mode | Operand location | EA / Rule | Example |
|---|---|---|---|
| **Implied / Implicit** | Fixed, implied by opcode | none | CMA, CLC, PUSH (uses ACC/stack) |
| **Immediate** | In the instruction itself | Operand = value | MVI A, 05H ; ADD #5 (constant, fastest, no memory ref) |
| **Register direct** | In a register | Operand = R | MOV A, B |
| **Register indirect** | Memory; register holds address | EA = (R) | MOV A, M ; LOAD (R1) |
| **Direct / Absolute** | In memory | EA = address field A | LDA 2000H |
| **Indirect** | Address field points to a memory word holding the address | EA = M[A] | LOAD @X (two memory refs) |
| **Indexed** | Memory | EA = A + (index reg) | Array access A[i] |
| **Base register** | Memory | EA = (base reg) + displacement | Relocation, segments |
| **Relative (PC-relative)** | Memory | EA = PC + offset | Branches/jumps; position-independent code |
| **Auto-increment / Auto-decrement** | Memory | EA = (R), then R ← R+1 (or R-1 first) | Stepping through arrays, stack |

Worked example: memory word at 200 holds 500; M[500] holds 800; R1 = 200; index register XR = 100; instruction address field = 200.

```
Immediate        : operand = 200
Direct           : EA = 200, operand = 500
Indirect         : EA = M[200] = 500, operand = M[500] = 800
Register indirect: EA = R1 = 200, operand = 500
Indexed          : EA = 200 + 100 = 300, operand = M[300]
```

- **Memory references needed** (to fetch operand): immediate 0, register 0, register-indirect 1, direct 1, indirect 2 (or more).
- **Fastest**: register/immediate. **Slowest**: indirect (multi-level).
- Immediate: operand is the data itself; address field has a constant — past paper asks "which mode specifies a value within the instruction itself" → **Immediate** (not direct).
- Indirect addressing allows pointers and large address space (address field smaller than address).
- Indexed → arrays/loops; Base → relocation of programs; PC-relative → branching, shorter address field.
- Effective Address = actual memory address of operand after mode calculation.

**⚡ Exam tip:** Immediate = operand IS in the instruction; Direct = address is in the instruction; Indirect = address of the address is in the instruction. Indexed for arrays, PC-relative for jumps, base for relocation.

---

## 4. RISC vs CISC and the Control Unit

### RISC vs CISC

| Feature | RISC (Reduced Instruction Set Computer) | CISC (Complex Instruction Set Computer) |
|---|---|---|
| Instruction set | Small (≈ 50-150), simple | Large (hundreds), complex |
| Instruction length | **Fixed** (e.g. 32 bits) | **Variable** |
| Cycles | Mostly **1 cycle per instruction** (CPI ≈ 1) | Multi-cycle |
| Addressing modes | Few (3-5) | Many |
| Memory access | Only **LOAD/STORE** touch memory; all else register-to-register (load-store architecture) | Many instructions operate directly on memory |
| Registers | Large register file | Few registers |
| Control unit | **Hardwired** | **Microprogrammed** |
| Pipelining | Easy, very efficient | Difficult |
| Code size | Larger programs | Compact programs |
| Complexity | Complexity in compiler/software | Complexity in hardware |
| Examples | ARM, MIPS, SPARC, PowerPC, RISC-V | Intel x86, VAX, Motorola 68000, IBM 370 |

- RISC gives higher clock speed and better pipelining; CISC reduces number of instructions per program (closer to high-level language, "semantic gap").
- Modern x86 chips translate CISC instructions into RISC-like micro-operations internally.
- ARM (Advanced RISC Machine) dominates mobile devices (low power).

### Control unit: hardwired vs microprogrammed

The CU generates timing and control signals to execute instructions.

| Feature | Hardwired | Microprogrammed |
|---|---|---|
| Implementation | Fixed logic circuits (gates, flip-flops, decoders, counters) | **Control memory (ROM)** storing microinstructions |
| Speed | **Faster** | Slower (control memory access) |
| Flexibility | Hard to modify/redesign | **Easy to modify** by changing microprogram |
| Cost/complexity | Complex for large instruction sets | Simpler to design for large sets |
| Used in | RISC | CISC |

- **Microinstruction**: a control word of bits specifying control signals for one clock; sequence of them = **microprogram (firmware)**, stored in control memory. **Microoperation** = elementary operation on registers (e.g. MAR ← PC).
- Components of microprogrammed CU: control memory, control address register (CAR), control data register (microinstruction register), sequencer.
- **Horizontal** microcode: wide, little encoding, high parallelism, faster. **Vertical** microcode: narrow, encoded fields, needs decoders, slower, shorter control words.
- Maurice Wilkes proposed microprogramming (1951).

**⚡ Exam tip:** RISC ↔ hardwired, fixed-length, load/store, many registers, pipelining. CISC ↔ microprogrammed, variable-length, many addressing modes. Hardwired is faster; microprogrammed is more flexible.
