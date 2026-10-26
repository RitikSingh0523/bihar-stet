
---

## 5. Buses, Bus Width & Address-Space Arithmetic

### System buses

| Bus | Carries | Direction | Width decides |
|---|---|---|---|
| **Address bus** | Memory/I-O address | **Unidirectional** (CPU → memory/I/O) | Maximum memory = 2ⁿ locations |
| **Data bus** | Data and instructions | **Bidirectional** | Word size / amount transferred per cycle |
| **Control bus** | Control signals (Read, Write, Interrupt, Clock, Reset, Bus request/grant, Ready) | Bidirectional (individual lines unidirectional) | - |

- **Bus width is measured in bits** (number of parallel lines). Data bus width (8, 16, 32, 64) is the main figure of merit of a microprocessor's "bit-ness" (8085: 8-bit data, 16-bit address; 8086: 16-bit data, 20-bit address).
- Bus bandwidth (transfer rate) = bus width (bytes) × bus clock frequency (× transfers per clock).
- Bus types: **synchronous** (clock-controlled) vs **asynchronous** (handshake); **serial** vs **parallel**; internal vs external; **backside/frontside** buses.
- Common buses: PCI/PCIe (expansion), SCSI, SATA (storage), USB (peripherals), ISA (old), AGP (graphics).
- **Bus contention** is resolved by arbitration (daisy chain, polling, independent request).

### Address-space arithmetic

```
Number of addressable locations = 2ⁿ        (n = address lines)
Memory size = 2ⁿ × (bits per location)
Address lines needed for N locations = log₂ N
```

| Address lines | Locations |
|---|---|
| 8 | 256 |
| 10 | 1 K (1024) |
| 16 | 64 K |
| 20 | 1 M (8086: 1 MB) |
| 24 | 16 M |
| 32 | 4 G (4 GB) |
| 64 | 16 EB (2⁶⁴) theoretical |

Worked examples:
1. 16-bit address bus, byte-addressable → 2¹⁶ = 64 KB.
2. Memory 8 K × 8 → 2¹³ locations → 13 address lines, 8 data lines.
3. How many 1 K × 4 chips for 4 K × 8 memory? (4K/1K) × (8/4) = 4 × 2 = **8 chips**.
4. 32-bit PC address register, word = 4 bytes, memory byte-addressable: max 4 GB; if word-addressable: 4 G words = 16 GB.
5. 2-input decoder for chip select: 4 K memory from 1 K chips needs 2-to-4 decoder using the 2 higher address lines.

- Number of address lines = log₂(memory size in locations): 64 MB byte-addressable → 26 lines (2²⁶).
- Width of PC/MAR = number of address lines; MDR = data lines.
- A 32-bit CPU means 32-bit registers / data bus, not necessarily 32-bit address.

**⚡ Exam tip:** Address bus is unidirectional (one-way); data bus is bidirectional. Memory capacity = 2^(address lines); data bus width is measured in bits and determines word size. 1 K = 2¹⁰, 1 M = 2²⁰.

---

## 6. Memory Hierarchy, ROM/RAM Types & Storage Devices

### Hierarchy (fast/small/expensive → slow/large/cheap)

```
Registers → Cache (L1, L2, L3) → Main Memory (RAM) → Secondary (SSD/HDD) → Tertiary/Archival (tape, optical)
```

| Level | Typical size | Speed | Cost/bit | Volatile |
|---|---|---|---|---|
| Registers | bytes (tens-hundreds) | < 1 ns | Highest | Yes |
| Cache (SRAM) | KB - MB | 1-10 ns | High | Yes |
| Main memory (DRAM) | GB | 50-100 ns | Medium | Yes |
| SSD/HDD | GB - TB | µs - ms | Low | No |
| Tape/optical | TB+ | seconds | Lowest | No |

- Going down: **access time ↑, capacity ↑, cost per bit ↓, frequency of access ↓**.
- Works because of **locality of reference**: *temporal* (recently used item will be used again, e.g. loop variable) and *spatial* (nearby addresses will be used soon, e.g. array). Hierarchy aims at the speed of the fastest and the cost of the cheapest.
- Primary memory = registers, cache, RAM, ROM (directly accessible by CPU). Secondary memory = non-volatile external storage.

### RAM

| | SRAM | DRAM |
|---|---|---|
| Cell | 6 transistors (flip-flop) | 1 transistor + 1 capacitor |
| Refresh | Not needed | **Needed** periodically (capacitor leaks) |
| Speed | Faster | Slower |
| Density/cost | Low density, costly | High density, cheaper |
| Use | **Cache** | **Main memory** |

- RAM is volatile, read-write, random access. DRAM types: SDRAM, DDR (double data rate; DDR2/3/4/5), RDRAM.
- Flash (EEPROM-based) is non-volatile: pen drive, SSD, memory card; NAND vs NOR.

### SRAM vs DRAM in more detail

- **DRAM** stores a bit as charge on a capacitor, which leaks, so every row must be **refreshed** every few milliseconds (typically 64 ms for all rows). A read is destructive and followed by write-back. Refresh styles: **burst** (all rows together), **distributed** (one row at intervals), **hidden** (during normal access).
- DRAM address pins are **multiplexed**: the row address is latched with RAS, then the column address with CAS - this halves the number of address pins (a 2ⁿ-bit chip needs about n/2 address lines).
- **SRAM** keeps the bit in a bistable flip-flop (6 transistors): no refresh, faster, more power-hungry in speed-critical use, expensive and low density; used for cache and registers.
- **Asynchronous** DRAM vs **SDRAM** (synchronised with the system clock), DDR (transfers on both clock edges).
- Both are **volatile** random-access read/write memories; ROM/Flash retain data without power.

### ROM family (non-volatile)

| Type | Programming / erase |
|---|---|
| **ROM (Mask ROM)** | Programmed at factory; cannot be changed |
| **PROM** | Programmable **once** by user (fuse blowing) |
| **EPROM** | Erased by **ultraviolet light**, reprogrammable |
| **EEPROM** | Erased **electrically**, byte-wise, in circuit |
| **Flash** | Electrically erased in blocks; fast; used in SSD, USB |

- ROM stores BIOS/bootstrap loader/firmware; the **bootstrap program** is loaded from ROM at power-on (POST first).
- Storing microprograms (control memory) → ROM.

### Secondary storage & units

| Device | Type / technology |
|---|---|
| HDD | Magnetic platters; tracks → sectors; cylinder; seek time + rotational latency + transfer time |
| SSD | Flash, no moving parts, faster, shock-proof |
| CD / DVD / Blu-ray | Optical (laser); ≈ 700 MB / 4.7 GB (single layer) / 25 GB |
| Magnetic tape | Sequential access, backup/archival |
| Pen drive, SD card | Flash |

- HDD access time = seek time + rotational latency (avg = half a rotation) + transfer time. Example: 7200 rpm → one rotation 8.33 ms → avg latency 4.17 ms.
- Access types: random (RAM, ROM), sequential (tape), direct (disk).

```
Bit < Nibble (4 bits) < Byte (8 bits)
1 KB = 1024 B (2¹⁰)     1 MB = 1024 KB (2²⁰)    1 GB = 2³⁰ B
1 TB = 2⁴⁰ B            1 PB = 2⁵⁰ B            1 EB = 2⁶⁰ B
Then ZB (2⁷⁰), YB (2⁸⁰)
```

- Word = natural unit of data a CPU processes (8/16/32/64 bits). 1 byte = 1 character (ASCII).
- Kb (kilobit) vs KB (kilobyte); network speeds are in bits (Mbps), storage in bytes.
- Decimal/SI usage: manufacturers use 1 GB = 10⁹ B; binary (GiB) = 2³⁰.

**⚡ Exam tip:** Order registers < cache < RAM < disk for speed (fastest first). DRAM needs refresh (capacitor), SRAM doesn't and is used in cache. EPROM = UV erase, EEPROM = electrical erase.

---

## 7. Cache Memory & Mapping

**Cache** = small, fast SRAM between CPU and main memory holding copies of frequently used blocks. **Hit** = data found in cache; **miss** = not found (fetch block from main memory). Main memory is divided into **blocks** (= cache **lines**), the same size.

### Formulas

```
Hit ratio h  = hits / (hits + misses)        Miss ratio = 1 − h

AMAT (average memory access time)
   (a) Hierarchical (cache checked first, then memory):
        T_avg = T_c + (1 − h) × T_m_penalty        [T_c + miss rate × miss penalty]
        or    T_avg = h × T_c + (1 − h) × (T_c + T_m)
   (b) Simultaneous/parallel access:
        T_avg = h × T_c + (1 − h) × T_m
```

Worked example (a): T_c = 10 ns, T_m = 100 ns, h = 0.9.
- Parallel formula: 0.9×10 + 0.1×100 = 9 + 10 = **19 ns**.
- Hierarchical: 0.9×10 + 0.1×(10+100) = 9 + 11 = **20 ns** (= 10 + 0.1×100).
- (If question does not specify, use h·T_c + (1−h)·T_m, the textbook default; "cache first then memory" wording → add T_c.)
- Speedup due to cache = T_m / T_avg. Example: 100/19 ≈ 5.3.

Hit ratio from counts: 950 hits out of 1000 accesses → h = 0.95.

### Mapping techniques

| Mapping | Rule | Pros / cons |
|---|---|---|
| **Direct** | Block j → line (j mod number of lines) | Simple, cheap, fast; **conflict misses** (thrashing) |
| **Fully (Associative)** | Any block → any line; compare tag with all lines (CAM) | Most flexible, lowest miss rate; costly/slow search; needs replacement algorithm |
| **Set-associative (k-way)** | Block j → set (j mod number of sets), any line in the set | Compromise; common (2-, 4-, 8-way) |

- Direct mapped = 1-way set associative; fully associative = one set with all lines.
- Number of sets = lines / k.

### Address split

```
Direct:       | TAG | LINE (index) | WORD (offset) |
Set-assoc:    | TAG | SET (index)  | WORD (offset) |
Associative:  | TAG                | WORD (offset) |

offset bits = log₂(block size in bytes/words)
index bits  = log₂(lines)   [direct]   or  log₂(sets) [set-assoc]
tag bits    = address bits − index − offset
```

**Worked example:** 32-bit address, byte-addressable, cache 64 KB, block 16 B.
- Block offset = log₂16 = **4 bits**.
- Number of lines = 64 KB / 16 B = 2¹⁶/2⁴ = 2¹² = 4096.
- Direct mapped: index 12 bits, tag = 32 − 12 − 4 = **16 bits**. Format 16 | 12 | 4.
- 4-way set-associative: sets = 4096/4 = 1024 → index 10, tag = 32 − 10 − 4 = **18 bits**. Format 18 | 10 | 4.
- Fully associative: no index; tag = 32 − 4 = **28 bits**.

Another: main memory 64 KB (16-bit address), cache 1 KB, block 32 B, direct: offset 5, lines = 32 → index 5, tag = 16 − 5 − 5 = 6 bits. Number of memory blocks = 64 KB/32 B = 2048; each cache line can hold one of 2048/32 = 64 blocks (6 tag bits ✓).

- Tag bits grow as associativity increases; index bits shrink.
- **Valid bit** indicates line holds valid data; **dirty bit** for write-back.

### Replacement and write policies

- Replacement (associative/set): **LRU** (least recently used), FIFO, Random, LFU. Direct mapped needs none.
- **Write-through**: write to cache and memory together (consistent, slow). **Write-back (copy-back)**: write only to cache, set dirty bit, write to memory on replacement (faster, memory may be stale). Write-allocate / no-write-allocate on write miss.
- Miss types (**3 Cs**): Compulsory (cold), Capacity, Conflict.
- Levels: L1 (smallest, fastest, on-chip, split I/D), L2, L3 (shared, larger).
- Cache coherence arises with multiple cores/caches.

**⚡ Exam tip:** Tag + index + offset = address bits. Direct mapped → index selects line; fully associative → no index bits. Average access time = h·T_c + (1−h)·T_m. Cache uses SRAM; write-back uses a dirty bit.

---

## 8. Virtual Memory

**Virtual memory** = technique giving programs the illusion of a very large (main-memory-sized or larger) address space by keeping only active parts in RAM and the rest on disk (swap space); the logical (virtual) address space can exceed physical memory.

- **Virtual (logical) address** generated by CPU → translated to **physical address** by the **MMU** (Memory Management Unit).
- **Paging**: virtual space divided into fixed-size **pages**, physical memory into **frames** (same size). **Page table** maps page number → frame number. Virtual address = (page number | offset); physical = (frame number | offset).
- **Page fault**: referenced page not in memory → OS loads it from disk (**demand paging**); costly (ms).
- **TLB** (Translation Lookaside Buffer): small associative cache of recent page-table entries; speeds translation.
- **Segmentation**: variable-size logical units (code, data, stack). Segment table gives base + limit. Causes external fragmentation; paging causes internal fragmentation.
- Page replacement: FIFO, **LRU**, Optimal, Clock. FIFO can show **Belady's anomaly** (more frames → more faults). **Thrashing** = excessive paging, CPU mostly idle.
- Page table entry bits: valid/present, dirty (modified), reference, protection.

Worked example: virtual address 32 bits, page size 4 KB (12 bits offset) → page number = 20 bits → 2²⁰ pages (1 M entries). If physical memory is 256 MB (28 bits), frame number = 28 − 12 = 16 bits.

Effective memory access time with page faults: EAT = (1 − p) × T_m + p × T_fault, where p = page-fault rate. Example: T_m = 100 ns, T_fault = 8 ms, p = 10⁻⁶ → EAT ≈ 100 + 8 (8 ms × 10⁻⁶ = 8 ns) → ≈ **108 ns**.

- Related: **Memory interleaving** (consecutive addresses across banks for parallel access); **Swapping** moves whole processes.

**⚡ Exam tip:** Virtual address → physical address via page table/MMU; page fault when the page is not in RAM; TLB caches the page table; thrashing = too many page faults.

---

## 9. Pipelining

**Pipelining** overlaps execution of multiple instructions by splitting the instruction cycle into stages (like an assembly line); increases **throughput**, not the latency of a single instruction.

Classic 5-stage RISC pipeline: **IF** (instruction fetch) → **ID** (decode/register read) → **EX** (execute/ALU) → **MEM** (memory access) → **WB** (write back).

```
Cycle:   1   2   3   4   5   6   7
I1       IF  ID  EX  MEM WB
I2           IF  ID  EX  MEM WB
I3               IF  ID  EX  MEM WB
```

### Formulas (k stages, n instructions, clock period tp)

```
Non-pipelined time = n × k × tp
Pipelined time     = (k + n − 1) × tp        (k cycles for first, then 1 per instruction)
Speedup S          = n·k / (k + n − 1)       → k as n → ∞ (ideal speedup = number of stages)
Efficiency         = S / k
Throughput         = n / ((k + n − 1) × tp)
```

Worked example: k = 5, n = 100, tp = 2 ns.
- Non-pipelined = 100 × 5 × 2 = 1000 ns. Pipelined = (5 + 99) × 2 = 208 ns.
- Speedup = 500/104 ≈ **4.81**. Efficiency ≈ 96%.
- If stage delays are unequal, the clock = slowest stage delay (+ latch delay): stages 10, 20, 15, 10 ns → tp = 20 ns.
- Pipeline time for 1 instruction = k cycles; for n = 1 the speedup is 1.

### Hazards (reasons for stalls)

| Hazard | Cause | Remedy |
|---|---|---|
| **Structural** | Two instructions need same hardware resource (e.g. one memory port) | More resources; separate I/D memory (Harvard-like caches); stall |
| **Data** | Instruction depends on result of previous one | **Forwarding/bypassing**, stalling (bubble/NOP), compiler instruction scheduling |
| **Control (branch)** | Branch/jump changes PC; fetched instructions may be wrong | Branch prediction, delayed branch, branch target buffer, flush |

- Data hazard types: **RAW** (read after write, true dependency), **WAR** (anti), **WAW** (output). In simple in-order pipelines RAW is the problem; WAR/WAW appear with out-of-order execution (fixed by register renaming).
- **Superscalar**: multiple pipelines, several instructions per clock (CPI < 1). **Superpipelining**: more, shorter stages. **VLIW**: compiler packs parallel instructions.
- Pipeline is easier with fixed-length, simple instructions → RISC.
- Types: instruction pipeline, arithmetic pipeline.

**⚡ Exam tip:** Speedup = n·k/(k+n−1), max = k. Three hazards: structural, data, control. Pipelining improves throughput, not individual instruction latency. Forwarding fixes data hazards; branch prediction fixes control hazards.

---

## 10. I/O Organization

Peripherals connect via **I/O interfaces/controllers/ports**. Devices are slow and differ in data format, so an interface (status/control/data registers) is needed.

### I/O addressing

- **Memory-mapped I/O**: I/O registers share the memory address space; use normal LOAD/STORE; no special I/O instructions (reduces memory space). 
- **Isolated (I/O-mapped / port-mapped)**: separate I/O address space; special IN/OUT instructions; control line distinguishes IO/M (8085: IO/M̅ signal).

### Three data transfer techniques

| Technique | CPU involvement | Notes |
|---|---|---|
| **Programmed I/O (polling)** | CPU continuously checks device status flag (busy waiting) | Simple; wastes CPU time |
| **Interrupt-driven I/O** | CPU does other work; device raises an interrupt when ready; CPU runs ISR | Better CPU use; per-word overhead (save PC/context) |
| **DMA (Direct Memory Access)** | DMA controller transfers a block between I/O and memory without CPU; CPU only starts it and is interrupted at the end | Best for bulk transfer (disk) |

Sequence of an interrupt: device sends request (INTR) → CPU finishes current instruction → acknowledges (INTA) → saves PC and flags (on stack) → loads ISR address from the **interrupt vector table** → executes **ISR** → returns (IRET/RET) restoring state.

- **Maskable** (can be disabled: INTR) vs **non-maskable** (NMI; e.g. power failure, highest priority). **Vectored** (device supplies ISR address) vs non-vectored. **Priority** by daisy chain or priority encoder. Software interrupt = trap/exception (system call, divide by zero).
- Interrupts are checked at the end of each instruction cycle.
- **DMA** steps: CPU programs DMA controller (address register, word-count register, control) → DMA sends **HOLD/bus request**; CPU replies **HLDA/bus grant** → DMA transfers data using the bus → on completion DMA interrupts CPU.
- DMA modes: **Burst (block)** (holds bus until all done), **Cycle stealing** (one word at a time, steals bus cycles, CPU slowed slightly), **Transparent** (uses only cycles when CPU doesn't need the bus).
- Direction of speed: Polling < Interrupt < DMA in efficiency for bulk data.
- **I/O processor/channel**: independent processor for I/O (mainframes). **Buffering and spooling** smooth speed mismatch.
- Transfer type: **Synchronous** (clock) vs **asynchronous** (strobe/handshake); **serial** (USB, RS-232, one bit at a time, long distance) vs **parallel** (printer port, short distance, many wires).

**⚡ Exam tip:** DMA = data moved without CPU for each byte; programmed I/O = polling with CPU busy-waiting; interrupt-driven = device notifies CPU. NMI cannot be masked.

---

## 11. Parallel Processing: Flynn's Taxonomy

Flynn (1966) classifies by number of **instruction streams** and **data streams**.

| Class | Instruction streams | Data streams | Example |
|---|---|---|---|
| **SISD** | Single | Single | Conventional uniprocessor (von Neumann) |
| **SIMD** | Single | Multiple | Vector/array processors, GPUs, MMX/SSE |
| **MISD** | Multiple | Single | Rare; fault-tolerant systems (space shuttle), systolic arrays (debated) |
| **MIMD** | Multiple | Multiple | Multicore/multiprocessors, clusters, distributed systems |

- MIMD subtypes: **tightly coupled** (shared memory, SMP/multiprocessor, UMA/NUMA) vs **loosely coupled** (distributed memory, multicomputer, message passing).
- **Amdahl's law**: Speedup = 1 / ((1 − f) + f/N), f = parallel fraction, N = processors. Example: f = 0.8, N = 4 → 1/(0.2 + 0.2) = 2.5. Max speedup (N → ∞) = 1/(1 − f) = 5.
- Multicore = more than one CPU core on one chip. **Hyper-threading** = two logical threads per core.
- Other terms: **Cluster** (group of computers acting as one), **Grid**.

**⚡ Exam tip:** SISD = ordinary PC, SIMD = vector/GPU, MIMD = multicore/multiprocessor, MISD = rare. Flynn's classification is by instruction and data streams.

---

## 12. Register Transfer & Micro-operations

A **micro-operation** is an elementary operation performed on data stored in registers during one clock pulse. A machine instruction is executed as a sequence of micro-operations; the control unit generates the control signals that trigger them.

### Register transfer language (RTL)
- `R2 ← R1` copies R1 into R2 (R1 unchanged). Conditional: `P: R2 ← R1` means "if P = 1 then transfer" (P is a control function).
- Simultaneous transfers on one clock: `T: R2 ← R1, R1 ← R2` (swap).
- Memory transfer: **read** `DR ← M[AR]`; **write** `M[AR] ← R1` (AR = address register, DR = data register).
- Many registers share a **common bus**: a multiplexer bus system (n registers of k bits need k multiplexers of n:1) or a **tri-state buffer** bus; select lines choose the source and a load line chooses the destination.
- Instruction fetch micro-operations: `T0: AR ← PC`; `T1: IR ← M[AR], PC ← PC + 1`; `T2: decode IR`.

### Four types of micro-operations

| Type | Examples |
|---|---|
| Register transfer | R2 ← R1 |
| Arithmetic | add, subtract, increment, decrement, complement |
| Logic | AND, OR, XOR, complement, clear |
| Shift | logical, circular, arithmetic |

### Arithmetic micro-operations
- `R3 ← R1 + R2` add; `R3 ← R1 + R2' + 1` subtract (2's complement); `R1 ← R1 + 1` increment; `R1 ← R1 − 1` decrement; `R2 ← R2'` complement (1's); negate = `R2' + 1`.
- **Arithmetic circuit:** one n-bit parallel adder. A multiplexer feeds the Y input with B, B', all 0s or all 1s while Cin is 0 or 1:

| S1 S0 | Cin = 0 | Cin = 1 |
|---|---|---|
| 0 0 (Y = B) | A + B (add) | A + B + 1 |
| 0 1 (Y = B') | A + B' | A + B' + 1 (subtract) |
| 1 0 (Y = 0) | A (transfer) | A + 1 (increment) |
| 1 1 (Y = all 1s) | A − 1 (decrement) | A (transfer) |

### Logic micro-operations (bitwise)
- Two variables → 16 possible functions; the common ones: AND (∧), OR (∨), XOR (⊕), complement, clear (all 0), set.
- **Selective-set:** A ← A ∨ B (bits set where B = 1). **Selective-complement:** A ← A ⊕ B (bits toggled where B = 1). **Selective-clear:** A ← A ∧ B' (bits cleared where B = 1). **Mask:** A ← A ∧ B (bits cleared where B = 0). **Insert:** mask the field, then OR the new value. **Clear:** A ← A ⊕ A.
- Example: A = 1010, B = 1100: A ∨ B = 1110; A ∧ B = 1000; A ⊕ B = 0110; A ∧ B' = 0010.

### Shift micro-operations

| Shift | Behaviour (register R, serial input) |
|---|---|
| Logical shift left / right | Zero enters; bit shifted out is lost (or goes to carry) |
| Circular shift (rotate) | The bit shifted out re-enters at the other end |
| Arithmetic shift right | Sign bit kept and replicated (divides by 2) |
| Arithmetic shift left | Zero enters at LSB; multiplies by 2; **overflow** if the sign bit changes |

- Example: 8-bit 1011 0100 arithmetic shift right → 1101 1010; logical shift right → 0101 1010; rotate left → 0110 1001.
- A barrel shifter shifts by any number of positions in one step using multiplexers.

**⚡ Exam tip:** Subtract = A + B' + 1; arithmetic shift right keeps the sign (divide by 2), left doubles; mask = AND, selective-set = OR, selective-complement = XOR; fetch = AR ← PC, IR ← M[AR], PC ← PC + 1.

---

## 13. Error Detection & Correction: Parity, Checksum, CRC, Hamming

Errors (bit flips) occur in memory and communication; extra **redundant bits** let the receiver detect (and sometimes correct) them.

### Parity
- **Even parity:** parity bit chosen so total 1s is even; **odd parity:** total 1s odd. Data 1011001 (four 1s) → even parity bit 0, odd parity bit 1.
- Detects any **odd** number of bit errors; misses even numbers; cannot locate the bad bit. Overhead 1 bit per word.
- **Two-dimensional (block) parity:** parity for every row (VRC) and every column (LRC); locates and corrects a single-bit error (intersection of the bad row and column) and detects more.

### Checksum
- Sender adds data words (usually 8/16-bit) with **end-around carry (1's complement sum)**, then sends the **complement of the sum** as the checksum; the receiver adds all words including the checksum - the result must be all 1s (complement = 0), otherwise there is an error.
- Example (8-bit words): 01010101 + 00110011 + 10001000 = 100010000 (272); wrap carry → 00010001 (17); complement → **11101110** (238). Receiver: 17 + 238 = 255 = 11111111, so no error.
- Used in IP, TCP, UDP headers. Weaker than CRC: detects most but not all errors (e.g. swapped words go unnoticed).

### CRC (cyclic redundancy check)
- Data polynomial is divided (modulo-2, XOR) by a generator polynomial G(x) of degree r; the r-bit **remainder** is appended. Receiver divides the received frame: remainder 0 = no error.
- Hardware: shift register with XOR gates. Detects all single-bit errors, all burst errors of length ≤ r and most longer bursts. Used in Ethernet (CRC-32), disks, ZIP.
- Example: data 1101011011, G = 10011 (r = 4) → append 0000, divide, remainder is the CRC.

### Hamming code (single-error correcting)
- Hamming distance d = number of positions in which two code words differ. A code with minimum distance d **detects d − 1** errors and **corrects ⌊(d − 1)/2⌋** errors. d = 3 → single-error correcting (Hamming), d = 4 → SEC-DED.
- For m data bits and p parity bits: **2ᵖ ≥ m + p + 1**. 4 data bits → p = 3 (7,4 code); 8 data → 4 (12 bits); 16 → 5; 32 → 6; 64 → 7.
- Parity bits sit at positions **1, 2, 4, 8, ...** (powers of 2). Parity bit at position 2ᵏ covers all positions whose binary number has bit k set: P1 → 1, 3, 5, 7, ...; P2 → 2, 3, 6, 7, ...; P4 → 4, 5, 6, 7, ...
- **Worked example (even parity):** data 1011 placed at positions 3, 5, 6, 7 (d3 = 1, d5 = 0, d6 = 1, d7 = 1). P1 = d3⊕d5⊕d7 = 0; P2 = d3⊕d6⊕d7 = 1; P4 = d5⊕d6⊕d7 = 0. Code word (positions 1-7) = **0110011**.
- **Error correction:** recompute the checks C4 C2 C1 over the received word; the binary number C4C2C1 (**syndrome**) gives the position of the wrong bit (000 = no error). If bit 5 flips, the word is 0110111 → C1 = 1, C2 = 0, C4 = 1 → syndrome 101 = 5 → flip bit 5.
- **SEC-DED:** add an overall parity bit (extended Hamming): corrects 1-bit and detects 2-bit errors; used in ECC memory.

| Method | Detect | Correct |
|---|---|---|
| Parity | odd number of errors | none |
| 2-D parity | multiple | single bit |
| Checksum | most errors | none |
| CRC | burst errors | none |
| Hamming | 2 bits (d = 3) | 1 bit |

**⚡ Exam tip:** Parity bits in Hamming sit at powers of 2 (1, 2, 4, 8); syndrome = error position; 2ᵖ ≥ m + p + 1; d = 3 corrects 1 error and detects 2; checksum receiver result must be all 1s.

---

## 14. ALU Design

The **ALU** performs all arithmetic and logic operations of the CPU. It is purely combinational; operation select lines choose the function and results go to a register (usually the accumulator), while **status flags** are set.

### Structure of an ALU
- **Arithmetic unit** (adder with input conditioning) + **logic unit** (AND, OR, XOR, NOT gates) + (optionally) **shifter**; a final multiplexer selects which result goes out, controlled by the opcode select lines.
- **One bit slice:** a full adder, gates for AND/OR/XOR and a 4:1 multiplexer; n identical slices are cascaded (carry ripples between slices or uses carry look-ahead) to form an n-bit ALU.
- **Adder/subtractor:** XOR each B bit with the mode M, and Cin = M: M = 0 → A + B; M = 1 → A + B' + 1 = A − B.
- Typical ALU IC: **74181** - 4-bit ALU, 16 logic and 16 arithmetic functions selected by S3-S0 and mode M (M = 1 logic, M = 0 arithmetic); 74182 is the carry look-ahead generator for cascading.

### Status flags (condition codes)

| Flag | Set when |
|---|---|
| **C (carry)** | Carry out of the MSB (unsigned overflow); borrow in subtraction |
| **Z (zero)** | All result bits are 0 (NOR of all output bits) |
| **S / N (sign)** | MSB of the result = 1 (negative) |
| **V (overflow)** | Signed overflow = carry into MSB ⊕ carry out of MSB |
| **P (parity)** | Result has even number of 1s (8085/8086) |
| **AC (auxiliary carry)** | Carry from bit 3 to bit 4 (used for BCD adjust) |

### Speeding up and other operations
- **Ripple-carry adder** delay = n × delay per full adder; **carry look-ahead** computes carries in parallel from G = AB and P = A ⊕ B: Ci+1 = Gi + Pi·Ci - delay nearly independent of n.
- **Multiplication:** shift-and-add (n additions for n bits); **Booth's algorithm** handles signed numbers in 2's complement and skips runs of 1s; array multiplier is combinational. n × n bits → 2n-bit product.
- **Division:** restoring and non-restoring algorithms (shift-subtract). **Floating-point ALU:** align exponents, add mantissas, normalise.
- Bit-parallel logic uses the same bus; a **BCD adder** adds 6 when the sum exceeds 9 or there is a carry.

**⚡ Exam tip:** Subtract = XOR on B inputs with Cin = 1; V flag = C(n−1) ⊕ C(n); Z flag = NOR of all result bits; 74181 = 4-bit ALU; carry look-ahead reduces carry-propagation delay.

---

## Quick Revision Sheet

1. Generations: tube → transistor → IC → microprocessor (VLSI) → AI/ULSI.
2. Intel 4004 (1971) = first microprocessor; Babbage = father of computer.
3. Analog (continuous), digital (discrete), hybrid (both: ICU, petrol pump). Supercomputer speed = FLOPS.
4. von Neumann: single memory for code + data (stored-program, bottleneck); Harvard: separate memories/buses.
5. CPU = ALU + CU + registers; CU does not process data, ALU does.
6. PC = next instruction address; IR = current instruction; MAR = address; MDR = data; ACC = ALU results.
7. Fetch: MAR←PC, MDR←M[MAR], IR←MDR, PC←PC+1.
8. CPU time = IC × CPI × clock period; MIPS = clock / (CPI × 10⁶).
9. 3/2/1/0-address: ADD R1,R2,R3 / ADD R1,R2 / ADD X (ACC) / ADD (stack, postfix).
10. Immediate: operand in instruction; Direct: address in instruction; Indirect: address of address; Indexed: A + index; Relative: PC + offset.
11. RISC: fixed-length, load/store, hardwired, many registers, 1 CPI, pipelining; CISC: variable-length, microprogrammed, many modes.
12. Hardwired CU faster; microprogrammed (control memory in ROM) flexible; Wilkes.
13. Address bus unidirectional, data bus bidirectional; bus width in bits; memory = 2^(address lines).
14. Hierarchy (fast→slow): registers, cache, RAM, SSD/HDD, tape; justified by locality of reference.
15. SRAM (6 T, no refresh, cache); DRAM (1T+1C, refresh, main memory).
16. ROM < PROM (once) < EPROM (UV) < EEPROM (electrical) < Flash (block electrical).
17. 1 KB = 2¹⁰ B, 1 GB = 2³⁰ B, 1 TB = 2⁴⁰ B; nibble = 4 bits.
18. Cache address = tag | index | offset; direct → line = block mod lines; fully associative has no index; k-way sets = lines/k.
19. h = hits/total; T_avg = h·T_c + (1−h)·T_m (or T_c + (1−h)·penalty).
20. Write-through (immediate to memory) vs write-back (dirty bit); LRU replacement.
21. Virtual memory: pages ↔ frames, page table, MMU, TLB, page fault, thrashing.
22. Pipeline speedup = nk/(k+n−1) → k; hazards: structural, data (RAW; forwarding), control (branch prediction).
23. I/O: programmed (polling), interrupt-driven, DMA (block transfer, cycle stealing); NMI non-maskable; memory-mapped vs isolated I/O.
24. Flynn: SISD (PC), SIMD (vector/GPU), MISD (rare), MIMD (multicore).
25. Amdahl: speedup = 1 / ((1−f) + f/N).
26. Micro-operation = elementary register-level step per clock; types: register transfer, arithmetic, logic, shift. Subtract = A + B' + 1; fetch: AR←PC, IR←M[AR], PC←PC+1.
27. Selective-set = OR, selective-complement = XOR, mask/selective-clear = AND; arithmetic shift right keeps the sign; logical shift fills 0; rotate recirculates.
28. Parity detects odd number of errors only; 2-D parity corrects 1 bit; checksum = complement of 1's-complement sum (receiver sum all 1s); CRC = modulo-2 division, detects bursts.
29. Hamming: 2ᵖ ≥ m + p + 1; parity at positions 1, 2, 4, 8; syndrome = error position; distance d detects d−1, corrects ⌊(d−1)/2⌋; SEC-DED adds one overall parity bit.
30. ALU = arithmetic unit + logic unit + shifter + output MUX; flags C, Z, S, V (= carry into MSB ⊕ carry out of MSB); 74181 = 4-bit ALU; carry look-ahead Ci+1 = Gi + Pi·Ci.
31. DRAM: multiplexed row/column address (RAS/CAS), refresh every few ms (burst, distributed, hidden); SRAM faster, no refresh, used for cache.
