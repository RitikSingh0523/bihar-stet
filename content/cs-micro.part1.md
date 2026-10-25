# Microprocessors & Microcontrollers

> **What the exam asks:** about 2-4 questions per paper, mostly direct facts: microprocessor vs microcontroller, applications of microcontrollers (automotive, home automation, embedded), ALU/register role, memory-mapped I/O, address-bus arithmetic, and 8085/8086/8051 numbers (flags, interrupts, vectors, segment arithmetic, timers). Mocks add small numeric items: 8086 physical address, 8051 timer reload, 8085 flags after ADI/XRA, 8255 control words, PUSH/SP.

## 1. Basic Concepts: MPU, MCU, Microcomputer, Buses

### Definitions
- **Microprocessor (MPU/CPU on a chip):** ALU + registers + control unit on one IC. Needs external memory, I/O and peripherals. General-purpose, high speed. Examples: 8085, 8086, Pentium.
- **Microcontroller (MCU):** CPU + ROM/Flash + RAM + I/O ports + timers + serial port (+ ADC etc.) on ONE chip. A "computer on a chip" for dedicated control. Examples: 8051, PIC16F877A, AVR ATmega328, ARM Cortex-M.
- **Microcomputer:** microprocessor + memory + I/O devices + buses (a complete small computer, e.g. a PC). An MCU is effectively a single-chip microcomputer.

| Feature | Microprocessor | Microcontroller |
|---|---|---|
| Chip contents | CPU only | CPU + RAM + ROM + I/O + timers |
| External parts | Many (memory, I/O chips) | Very few |
| Cost / size / power | Higher | Low, compact, low power |
| Instruction set | Many, rich addressing | Fewer, bit-manipulation oriented |
| Use | General computing (PCs) | Dedicated/embedded control |
| Bit handling | Mostly byte/word | Strong bit-level instructions |
| Memory architecture | Usually von Neumann | Often Harvard (8051, PIC, AVR) |

### ALU and CPU parts
- The **ALU is inside the CPU (microprocessor)**: it does arithmetic (add, subtract) and logic (AND, OR, XOR, NOT, compare, shift) operations.
- **Accumulator** = register holding one operand and the result of ALU operations. The **temporary register** holds the other operand during an operation (not user accessible).
- **Control unit** fetches, decodes, and generates timing/control signals. **Registers** = fast storage in the CPU. **Program counter (PC)** holds address of next instruction. **Stack pointer (SP)** points to top of stack. **Instruction register** holds the opcode being decoded.
- **Flag register** shows ALU result status.

### System buses

| Bus | Direction | Purpose |
|---|---|---|
| Address bus | Unidirectional (CPU → memory/I/O) | Selects memory location/port |
| Data bus | Bidirectional | Carries data/instructions |
| Control bus | Mixed | READ, WRITE, ALE, INTR, HOLD, etc. |

```
Addressable memory = 2^n locations   (n = number of address lines)
 8 lines  -> 256 B       16 lines -> 64 KB (8085, 8051)
 20 lines -> 1 MB (8086) 24 lines -> 16 MB (80286)   32 lines -> 4 GB (80386)
Data bus width ~ "bit size" of the processor:  8085 = 8, 8086 = 16, 8088 = 8 (internal 16)
```
- 1 KB = 1024 B = 2^10; 64 KB = 2^16 = 65536 = 0000H-FFFFH; 1 MB = 2^20 = 00000H-FFFFFH.
- **Multiplexed bus:** same pins carry low address then data at different times (8085 AD0-AD7; 8086 AD0-AD15). Separated using ALE and a latch (74LS373).
- **Von Neumann:** one memory/bus for program and data. **Harvard:** separate program and data memories/buses (8051, PIC, AVR).
- **RISC** (few simple, fixed-length, mostly single-cycle instructions: ARM, PIC, AVR) vs **CISC** (many complex instructions: 8085, 8086, x86).

### History (Intel)

| Chip | Year | Bits |
|---|---|---|
| 4004 | 1971 | 4-bit, first microprocessor |
| 8008 | 1972 | 8-bit |
| 8080 | 1974 | 8-bit |
| 8085 | 1976 | 8-bit |
| 8086 | 1978 | 16-bit, first x86 |
| 8051 MCU | 1980-81 | 8-bit MCU |
| 80386 | 1985 | 32-bit |

**⚡ Exam tip:** "Which part contains the ALU?" = CPU/microprocessor. "What does an MCU integrate that an MPU lacks?" = memory (RAM/ROM) and I/O/timers on the same chip. Address bus is unidirectional, data bus bidirectional.

## 2. The 8085 Microprocessor

### Key facts
- 8-bit, NMOS, **40-pin DIP**, +5 V single supply, on-chip clock generator (crystal / 2 = internal clock; 6 MHz crystal gives 3 MHz).
- **16-bit address bus** (64 KB), 8-bit data bus. Low address A0-A7 multiplexed with data on **AD0-AD7**; high address on A8-A15.
- 74 instructions, 246 opcodes (about 80 mnemonic types; "74" is the commonly quoted figure). Instruction length 1, 2 or 3 bytes.
- Hardware: serial I/O lines SID, SOD; 5 interrupts; DMA via HOLD/HLDA.

### Important pins

| Pin | Function |
|---|---|
| ALE | Address Latch Enable: HIGH during T1 means AD0-AD7 carry address |
| IO/M' | HIGH = I/O operation, LOW = memory operation |
| S1, S0 | Status (with IO/M' identify machine cycle) |
| RD', WR' | Active-low read / write strobes |
| READY | Inserts wait states for slow memory |
| HOLD, HLDA | DMA request / acknowledge |
| INTR, INTA' | Interrupt request / acknowledge |
| TRAP, RST7.5, 6.5, 5.5 | Other interrupts |
| RESET IN', RESET OUT | Reset CPU; reset peripherals |
| X1, X2, CLK | Crystal inputs; clock output |
| SID, SOD | Serial in / out |
| Vcc, Vss | +5 V, ground |

### Registers
- General purpose 8-bit: **A (accumulator), B, C, D, E, H, L**. Pairs **BC, DE, HL** (16-bit). **M** = memory location pointed to by HL.
- **PSW** = A + flag register. **SP** (16-bit), **PC** (16-bit). Temporary registers W, Z (not programmer visible), instruction register.
- Stack grows toward **lower** addresses. PUSH: SP decremented by 2 (high byte stored at SP-1, low byte at SP-2). Example: SP = 2000H, PUSH B → B stored at 1FFFH, C at 1FFEH, SP = 1FFEH. POP reverses (SP +2).

### Flags (5 flags in an 8-bit flag register)
```
bit:  D7  D6  D5  D4  D3  D2  D1  D0
      S   Z   X   AC  X   P   X   CY        (X = undefined/unused)
```

| Flag | Set when |
|---|---|
| **S** Sign | Result MSB (bit 7) = 1 (negative in 2's complement) |
| **Z** Zero | Result = 00H |
| **AC** Auxiliary carry | Carry from bit 3 to bit 4 (used by DAA) |
| **P** Parity | Result has even number of 1s |
| **CY** Carry | Carry out of bit 7 / borrow |
- INR/DCR do not affect CY. Logical ANA/ORA/XRA clear CY; ANA sets AC. **XRA A** → A = 00H, Z = 1, CY = 0 (standard way to clear A).
- Example: MVI A,45H; ADI 3BH → 45 + 3B = 80H; A = 80H, CY = 0, S = 1, Z = 0, AC = 1 (5+B = 10H carry from bit 3), P = 0 (80H has a single 1 → odd parity).
- Example: RLC with A = 82H (1000 0010): bit 7 goes to bit 0 and to CY → A = 05H (0000 0101), CY = 1.
- Example: A = FFH, INR A → 00H, Z = 1, CY unaffected.

### Instruction set groups

| Group | Examples |
|---|---|
| Data transfer | MOV, MVI, LXI, LDA, STA, LHLD, SHLD, LDAX, STAX, XCHG, PUSH, POP, IN, OUT |
| Arithmetic | ADD, ADI, ADC, SUB, SUI, SBB, INR, DCR, INX, DCX, DAD, DAA |
| Logical | ANA, ORA, XRA, CMP, CMA, CMC, STC, RLC, RRC, RAL, RAR, CPI, ANI |
| Branching | JMP, JC, JNC, JZ, JNZ, JP, JM, JPE, JPO, CALL, RET, PCHL, RST |
| Machine control | NOP, HLT, EI, DI, SIM, RIM |

- **LDA addr** = load A from 16-bit address directly (3 bytes, 13 T). **STA addr** stores A. **LHLD/SHLD** load/store HL pair directly. **LXI rp,16-bit** load register pair. **XCHG** swaps HL and DE. **DAD rp** adds rp to HL (only CY affected). **CMP r** compares: Z=1 if equal, CY=1 if A < r. **CMA** complements A (no flags). **DAA** decimal adjust after BCD addition. **HLT** stops CPU until reset/interrupt. **XTHL**, **SPHL**, **PCHL** exist.

### Addressing modes (5)

| Mode | Example | Meaning |
|---|---|---|
| Immediate | MVI B,32H; LXI H,2050H | Data is in instruction |
| Register | MOV A,B | Operand in register |
| Direct | LDA 2050H; STA 3000H; IN 01H | Address given in instruction |
| Register indirect | MOV A,M; LDAX B | Address held in register pair |
| Implied | CMA; RAL; STC | Operand implicit |

### Timing and T-states
- **T-state** = one clock period (1/f_clk). **Machine cycle** = one memory/I/O access (3-6 T). **Instruction cycle** = fetch + execute = 1 to 5 machine cycles.
- Machine cycles: **Opcode fetch (4 T, some 6 T)**, memory read (3 T), memory write (3 T), I/O read (3 T), I/O write (3 T), interrupt acknowledge, bus idle.
- Status signals:

| Machine cycle | IO/M' | S1 | S0 |
|---|---|---|---|
| Opcode fetch | 0 | 1 | 1 |
| Memory read | 0 | 1 | 0 |
| Memory write | 0 | 0 | 1 |
| I/O read | 1 | 1 | 0 |
| I/O write | 1 | 0 | 1 |
| Interrupt ack | 1 | 1 | 1 |
| Halt | Z | 0 | 0 |

- T-states: NOP 4, MOV r,r 4, ADD r 4, MVI r 7, MOV r,M 7, LXI 10, LDA/STA 13, LHLD/SHLD 16, PUSH 12, POP 10, CALL 18, RET 10, IN/OUT 10.
- Execution time = T-states × clock period. With 3 MHz clock (T = 0.333 µs), LDA (13 T) = 4.33 µs. With 2 MHz, MVI (7 T) = 3.5 µs.

### Interrupts of the 8085

| Interrupt | Vector address | Type | Priority |
|---|---|---|---|
| **TRAP** | 0024H | Edge AND level sensitive, non-maskable | 1 (highest) |
| RST 7.5 | 003CH | Edge-triggered (latched), maskable | 2 |
| RST 6.5 | 0034H | Level-triggered, maskable | 3 |
| RST 5.5 | 002CH | Level-triggered, maskable | 4 |
| **INTR** | via INTA' (device supplies RST/CALL opcode) | Level, maskable | 5 (lowest) |
- Only **INTR is non-vectored**; the other four are vectored. Hardware vector formula: **address = 8 × n** for RST n (RST 1 = 0008H, RST 7 = 0038H; TRAP = RST 4.5 → 0024H; 5.5 → 002CH; 6.5 → 0034H; 7.5 → 003CH). Reset vector = 0000H.
- **EI** enables, **DI** disables maskable interrupts (not TRAP). **SIM** sets masks (M7.5, M6.5, M5.5, resets RST7.5 flip-flop, serial out); **RIM** reads interrupt masks/pending and serial input. After reset, interrupts (except TRAP) are disabled.
- Software interrupts RST 0-7: single-byte CALL to 8n.

**⚡ Exam tip:** 8085 = 5 flags, 5 interrupts, 16-bit address, TRAP highest, INTR lowest and the only non-vectored. RST 7.5 = 003CH. Opcode fetch = 4 T (6 T for some). IO/M' HIGH = I/O cycle.

## 3. Memory-Mapped vs I/O-Mapped I/O and Peripheral Chips

### Comparison

| Feature | Memory-mapped I/O | I/O-mapped (isolated / port-mapped) I/O |
|---|---|---|
| Address space | Shared with memory (ports treated as memory locations) | Separate I/O space |
| Address width (8085) | 16-bit (64 K locations total) | 8-bit → **256 input + 256 output ports** |
| Instructions | All memory instructions (LDA, STA, MOV r,M, ADD M, arithmetic on ports) | Only IN port / OUT port |
| Data transfer via | Any register | **Accumulator only** |
| Control signal | MEMR'/MEMW' (IO/M' = 0) | IORD'/IOWR' (IO/M' = 1) |
| Decoder | More hardware | Simple |
| Memory available | Reduced (ports use addresses) | Full 64 KB for memory |
| Speed | Slower (longer instructions) | Faster |
- 8086: I/O-mapped uses 16-bit port address → up to 64 K ports; M/IO' signal (note polarity is opposite to 8085's IO/M').
- Primary role of memory-mapped I/O: I/O devices are accessed using the same addresses/instructions as memory, so no special I/O instructions are needed.
- **Peripheral interfacing:** an address decoder (74LS138, 3-to-8) generates chip-select; with partial decoding some address lines are unused (aliases).

### Peripheral chips

| Chip | Name | Key facts |
|---|---|---|
| **8255A** | Programmable Peripheral Interface (PPI) | 40-pin, 3 ports A, B, C (8 bits each) = **24 I/O lines**; C splits into upper/lower nibbles |
| **8253/8254** | Programmable Interval Timer | 24-pin, **three independent 16-bit down counters**, 6 modes |
| **8259A** | Programmable Interrupt Controller | 28-pin, **8 interrupt inputs (IR0-IR7)**, cascade up to **64** (1 master + 8 slaves) |
| **8237/8257** | DMA Controller | **4 channels**, 8237 is 40-pin, 16-bit address/count; uses HOLD/HLDA |
| 8251A | USART (serial) | Synchronous/asynchronous serial |
| 8279 | Keyboard/display controller | 8-char display, 64-key keyboard |
| 8155/8355/8755 | RAM+I/O+timer; ROM+I/O; EPROM+I/O | Support chips for 8085 |
| 74LS373 | Octal latch | Demultiplexes AD0-AD7 using ALE |
| 8284 / 8288 / 8289 | Clock generator / bus controller / bus arbiter | 8086 support |

### 8255 in detail
- Pins: D0-D7, RD', WR', CS', A1, A0 (select port A, B, C, control), RESET.
- **Control word** (address A1A0 = 11), bit D7 = 1 → I/O mode; D7 = 0 → BSR mode.
```
D7  D6 D5  D4  D3    D2   D1  D0
1   Group A mode  PA  PC(upper)  Group B mode  PB  PC(lower)
        00 = mode0, 01 = mode1, 1x = mode2     (for each port: 1 = input, 0 = output)
D6D5 = group A mode; D4 = port A; D3 = PC7-PC4; D2 = group B mode (0/1); D1 = port B; D0 = PC3-PC0
```
- Examples: all ports **input, mode 0 = 9BH** (1001 1011); all **output, mode 0 = 80H**; Port A input, rest output = 90H.
- Group A = Port A + PC upper; Group B = Port B + PC lower. **Mode 0** simple I/O; **Mode 1** strobed I/O (handshake); **Mode 2** bidirectional bus on **Port A only**.
- **BSR mode** (D7 = 0): sets/resets a single bit of Port C. D3-D1 = bit number, D0 = 1 set / 0 reset. Example: set PC3 → 0000 0111 = **07H**; reset PC3 = 06H.

### 8253 modes

| Mode | Name |
|---|---|
| 0 | Interrupt on terminal count |
| 1 | Programmable one-shot |
| 2 | Rate generator (divide-by-N) |
| 3 | **Square-wave generator** |
| 4 | Software-triggered strobe |
| 5 | Hardware-triggered strobe |
- Control word: SC1 SC0 (counter select), RW1 RW0 (read/write LSB/MSB), M2 M1 M0 (mode), BCD. Max count 65536 (binary). Output frequency = input clock / N.

### 8259A
- ICW1-ICW4 (initialisation), OCW1 (mask), OCW2 (EOI), OCW3. In 8086 mode, **interrupt type = (ICW2 upper 5 bits) + IR number**. Example: ICW2 = 40H, IR3 → type 43H → vector address 4 × 43H = 10CH.

**⚡ Exam tip:** Memorise numbers: 8255 = 24 lines, 3 ports; 8253 = 3 counters, mode 3 = square wave; 8259 = 8 IRs (64 cascaded); 8237 = 4 DMA channels. I/O-mapped 8085 = 256 ports and IN/OUT only through the accumulator. 8255 all-input mode 0 = 9BH.
