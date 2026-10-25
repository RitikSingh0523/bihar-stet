
## 4. The 8086 Microprocessor

### Key facts
- **16-bit** microprocessor (1978), HMOS, **40-pin**, +5 V, clock 5 MHz (8086-1: 10 MHz). About 29,000 transistors.
- **16-bit data bus, 20-bit address bus → 1 MB (2^20) memory**; 16-bit I/O address → 64 K I/O ports.
- Multiplexed **AD0-AD15** (address/data), A16/S3-A19/S6 (address/status). **8088**: same internal design, 8-bit external data bus, 4-byte queue.
- Supports **pipelining** (fetch overlaps execution), multiprocessing, 256 interrupts, string instructions.
- **Little-endian**: low byte at lower address.

### Architecture: two units

| Unit | Components | Job |
|---|---|---|
| **BIU** (Bus Interface Unit) | Segment registers CS, DS, SS, ES; IP; address-generation adder; **6-byte instruction queue**; bus control | Fetches instructions, reads/writes memory & I/O, generates 20-bit physical addresses |
| **EU** (Execution Unit) | ALU, flag register, general registers AX BX CX DX, pointer/index SP BP SI DI, control/decode | Decodes and executes; has no direct bus access |
- **Instruction queue:** 6 bytes (8088: 4). The BIU prefetches while EU executes (a FIFO); on a jump/branch the queue is flushed. Queue refilled when ≥ 2 bytes empty (8086).

### Registers

| Group | Registers | Notes |
|---|---|---|
| General | **AX** (accumulator), **BX** (base), **CX** (count), **DX** (data); each splits into AH/AL etc. | CX used by LOOP, shift counts (CL), REP; DX for I/O port address, MUL/DIV high part |
| Pointer | SP (stack pointer), BP (base pointer) | Default segment SS |
| Index | SI (source index), DI (destination index) | Default DS (DI = ES for string dest.) |
| Segment | CS, DS, SS, ES | 16-bit each; segment base |
| Pointer | IP (instruction pointer) | With CS: next instruction |
| Flags | 16-bit, 9 used | below |
- Default segment: BP → **SS**; BX, SI, DI → DS; SP → SS; IP → CS; string destination DI → ES.

### Segmentation and physical address
```
Physical address (20-bit) = Segment × 10H (shift left 4 bits) + Offset
Example 1: CS = 2000H, IP = 0150H  ->  20000H + 0150H = 20150H
Example 2: DS = 1234H, offset 0005H -> 12340H + 0005H = 12345H
Example 3: SS = 5000H, SP = 00FEH   -> 500FEH
```
- Each segment is up to **64 KB**; segments can overlap; segment starts at a multiple-of-16 address ("paragraph" boundary). Maximum number of non-overlapping 64 KB segments = 16.
- Logical address = segment:offset. Many logical addresses map to one physical address (e.g. 2000:0010 = 2001:0000 = 20010H).
- Reset: CS = FFFFH, IP = 0000H → first instruction at **FFFF0H**; DS, SS, ES, IP, flags cleared; queue empty.

### Flag register (16-bit; 9 flags)
```
bit: 15 14 13 12  11  10  9   8   7   6   5   4   3   2   1   0
      -  -  -  -   OF  DF  IF  TF  SF  ZF  -   AF  -   PF  -   CF
```

| Type | Flags |
|---|---|
| **6 status (conditional)** | CF carry, PF parity, **AF** auxiliary carry, ZF zero, SF sign, **OF** overflow |
| **3 control** | **TF** trap (single-step), **IF** interrupt enable, **DF** direction (0 = auto-increment SI/DI, 1 = decrement) |
- Instructions: CLC/STC/CMC, CLD/STD, CLI/STI, LAHF/SAHF, PUSHF/POPF.
- OF set on signed overflow (CF is for unsigned carry).

### Modes (MN/MX' pin)

| Minimum mode (MN/MX' = 1) | Maximum mode (MN/MX' = 0) |
|---|---|
| Single-processor system; 8086 produces all control signals (M/IO', RD', WR', DT/R', DEN', ALE, INTA') | Multiprocessor/coprocessor (8087) systems; **8288 bus controller** generates control signals |
| HOLD / HLDA used for DMA | RQ'/GT' used; LOCK' output |

### Addressing modes (examples)

| Mode | Example |
|---|---|
| Immediate | MOV AX, 1234H |
| Register | MOV AX, BX |
| Direct | MOV AX, [2000H] |
| Register indirect | MOV AX, [BX] |
| Based | MOV AX, [BX+08H] / [BP+4] |
| Indexed | MOV AX, [SI+08H] |
| **Based-indexed** | MOV AX, [BX+SI] |
| **Based-indexed with displacement** | MOV AX, [BX+SI+08H] |
| String / implied | MOVSB, CBW |
- 8086 has **no memory-to-memory MOV** (except string ops).

### Instructions and numeric patterns
- Data transfer: MOV, PUSH, POP, XCHG, IN, OUT, XLAT, LEA, LDS, LES. Arithmetic: ADD, ADC, SUB, SBB, INC, DEC, CMP, NEG, MUL, IMUL, DIV, IDIV, DAA, AAA. Logical: AND, OR, XOR, NOT, TEST, SHL/SHR/SAR, ROL/ROR/RCL/RCR. Control: JMP, Jcc, CALL, RET, LOOP, INT, IRET, HLT, NOP. String: MOVS, CMPS, SCAS, LODS, STOS with REP.
- **DIV r/m8**: AX ÷ operand → AL = quotient, AH = remainder. Example: AX = 0064H (100), BL = 07H → AL = 0EH (14), AH = 02H. **DIV r/m16**: DX:AX ÷ operand → AX = quotient, DX = remainder. **MUL r8**: AL × r8 → AX; **MUL r16**: AX × r16 → DX:AX.
- Stack: PUSH decrements SP by 2 (16-bit items), grows downward.
- Interrupts: **256 types** (0-255), vector table **1 KB at 00000H-003FFH**, 4 bytes per vector (IP low, IP high, CS low, CS high). Vector address = **4 × type**. Type 0 divide error, 1 single-step, 2 **NMI**, 3 breakpoint, 4 overflow (INTO). NMI is edge-triggered non-maskable; INTR maskable via IF; INTA' for type number.

### 8085 vs 8086

| | 8085 | 8086 |
|---|---|---|
| Data bus | 8 | 16 |
| Address bus | 16 (64 KB) | 20 (1 MB) |
| Pipelining/queue | No | Yes, 6-byte queue |
| Memory | Linear | Segmented |
| Flags | 5 | 9 |
| Interrupts | 5 hardware | 256 vectored |
| I/O ports | 256 | 64 K |
| Multiprocessing | No | Yes (max mode) |
| Pins | 40 | 40 |

**⚡ Exam tip:** Physical address = segment × 16 + offset (shift left 1 hex digit). 8086 queue = 6 bytes; 8088 = 4 bytes. Control flags = TF, IF, DF; remaining six are status. IVT = 1 KB at 0000:0000. Default segment for BP is SS.

## 5. The 8051 Microcontroller

### Key facts (standard 8051)
- **8-bit** MCU, Intel 1980/81, **Harvard architecture**, 40-pin DIP, +5 V.
- **4 KB on-chip ROM** (8031: none; 8751: EPROM; 89C51: Flash), **128 bytes on-chip RAM** (8052: 8 KB/256 B RAM & 3 timers).
- **32 I/O lines** (4 ports × 8), **two 16-bit timers/counters** (T0, T1), full-duplex **UART**, **5 interrupt sources** (6 in 8052), 64 KB external code + 64 KB external data.
- 16-bit PC, 16-bit DPTR, 8-bit SP. One **machine cycle = 12 clock periods** (1 µs at 12 MHz). Typical crystal 11.0592 MHz (for serial baud rates) or 12 MHz.
- Boolean (bit) processor: single-bit instructions SETB, CLR, CPL, JB, JNB, JBC, ANL C,bit.
- Accumulator **A**, register **B** (used by MUL AB, DIV AB), **PSW**, SP, DPTR, R0-R7.

### Pins

| Pin | Function |
|---|---|
| P0.0-P0.7 | Port 0: multiplexed low address/data (AD0-AD7); **open drain, needs external pull-up resistors** for I/O |
| P1 | Port 1: pure I/O with internal pull-ups |
| P2 | Port 2: I/O or high address A8-A15 |
| P3 | Port 3 alternate functions below |
| RST | Reset (high ≥ 2 machine cycles) |
| ALE/PROG' | Address latch enable (1/6 oscillator frequency) |
| PSEN' | Program store enable (read external code) |
| EA' | External access: tie high (use internal ROM), low (all external) |
| XTAL1, XTAL2 | Crystal |
- **P3 alternate functions:** P3.0 RXD, P3.1 TXD, P3.2 INT0', P3.3 INT1', P3.4 T0, P3.5 T1, P3.6 WR', P3.7 RD'.
- On reset all ports = FFH (input mode), SP = 07H, PC = 0000H, A = 00H.

### Memory map
**Internal RAM (128 B, 00H-7FH):**

| Address | Use |
|---|---|
| 00H-1FH | 4 register banks (8 bytes each: R0-R7) |
| 20H-2FH | **Bit-addressable area** (16 bytes = 128 bits, bit addresses 00H-7FH) |
| 30H-7FH | General-purpose scratchpad / stack |
| 80H-FFH | **SFRs** (direct addressing only; 21 SFRs in 8051) |
- Banks: Bank 0 = 00-07H, Bank 1 = 08-0FH, Bank 2 = 10-17H, Bank 3 = 18-1FH. Default bank 0, so R0 = address 00H. SFRs with addresses divisible by 8 are bit-addressable (A=E0H, B=F0H, PSW=D0H, IE=A8H, IP=B8H, P0=80H, P1=90H, P2=A0H, P3=B0H, TCON=88H, SCON=98H).
- Internal RAM is **read/write** (RAM), on-chip code memory is ROM/Flash, program memory separate from data memory.

### PSW (D0H)
```
bit: 7   6   5   4    3    2   1   0
     CY  AC  F0  RS1  RS0  OV  -   P
 RS1 RS0 = 00 bank0 (00H) | 01 bank1 (08H) | 10 bank2 (10H) | 11 bank3 (18H)
```
- P = parity of accumulator (even parity sets P = 1). Flags: CY, AC, OV, P (+ user flag F0).

### Key SFRs

| SFR | Address | Purpose |
|---|---|---|
| ACC | E0H | Accumulator |
| B | F0H | MUL/DIV |
| PSW | D0H | Flags + bank select |
| SP | 81H | Stack pointer |
| DPL/DPH | 82H/83H | Data pointer |
| P0-P3 | 80H, 90H, A0H, B0H | Ports |
| TCON, TMOD | 88H, 89H | Timer control/mode |
| TL0, TH0, TL1, TH1 | 8AH, 8CH, 8BH, 8DH | Timer registers |
| SCON, SBUF | 98H, 99H | Serial control, buffer |
| IE, IP | A8H, B8H | Interrupt enable/priority |
| PCON | 87H | Power control, SMOD |

### Timers/counters
- Timer = counts internal machine cycles (clock/12). Counter = counts external pulses on T0/T1 pin (P3.4/P3.5), max rate = clock/24.
- **TMOD** (89H): upper nibble Timer 1, lower nibble Timer 0, each = **GATE, C/T', M1, M0**.
- **TCON** (88H): **TF1 TR1 TF0 TR0 IE1 IT1 IE0 IT0**.

| Mode | M1 M0 | Description |
|---|---|---|
| 0 | 00 | 13-bit timer (TH 8 + TL low 5) |
| 1 | 01 | **16-bit timer/counter** |
| 2 | 10 | **8-bit auto-reload** (TH holds reload value) |
| 3 | 11 | Split timer: T0 becomes two 8-bit timers (TL0, TH0); T1 stops |
- Timer overflow sets TF (TF cleared by hardware when ISR runs). TR1 = 1 starts timer.
```
Timer delay (mode 1):
  count = delay / machine-cycle time ; load = 65536 − count
Example: 12 MHz, T = 1 µs. 1 ms delay → count = 1000 → load = 65536 − 1000 = 64536 = FC18H
  -> TH1 = FCH, TL1 = 18H.  (Max delay in mode 1 = 65536 µs = 65.536 ms.)
Mode 2 example: 250 µs at 12 MHz -> TH = 256 − 250 = 06H.
```
- TMOD for Timer 1 mode 2 (baud rate) = 20H; Timer 0 mode 1 = 01H.

### Serial port
- SBUF is two registers (transmit and receive, same address 99H). **SCON** (98H): **SM0 SM1 SM2 REN TB8 RB8 TI RI**.
- Modes: **0** shift register (baud = fosc/12); **1** 8-bit UART, variable baud (1 start, 8 data, 1 stop = 10 bits); **2** 9-bit UART, fixed (fosc/32 or /64); **3** 9-bit UART, variable.
- TI = transmit interrupt flag (set after last bit sent), RI = receive flag; both cleared by software.
- **Baud rate (mode 1,3) = (2^SMOD / 32) × fosc / (12 × (256 − TH1))**, with Timer 1 in mode 2. With 11.0592 MHz, **TH1 = FDH (−3) → 9600 baud**; TH1 = FAH → 4800 (SMOD = 0); with SMOD = 1, TH1 = FDH → 19200.

### Interrupts (5)

| Interrupt | Vector | Flag | Default priority |
|---|---|---|---|
| Reset | 0000H | – | – |
| **External 0 (INT0')** | **0003H** | IE0 | 1 (highest) |
| **Timer 0** | **000BH** | TF0 | 2 |
| External 1 (INT1') | 0013H | IE1 | 3 |
| **Timer 1** | **001BH** | TF1 | 4 |
| **Serial (RI/TI)** | **0023H** | RI/TI | 5 |
- Vectors are 8 bytes apart (0003, 000B, 0013, 001B, 0023). Place a LJMP at the vector as only 8 bytes available.
- **IE (A8H):** EA, –, (ET2), ES, ET1, EX1, ET0, EX0. EA = master enable; each bit enables a source (ES = serial, ET = timer, EX = external). After reset all interrupts disabled. Example: enable Timer 0 and serial: IE = 10010010B = 92H.
- **IP (B8H):** PS, PT1, PX1, PT0, PX0 — setting a bit gives high priority. A high-priority ISR can interrupt a low-priority one.
- IT0/IT1 = 0 → level-triggered (low level), 1 → falling-edge triggered. Serial flag RI/TI must be cleared by software; TF0/TF1 cleared by hardware on ISR entry.
- RETI returns from interrupt.

### 8051 vs 8085

| | 8051 | 8085 |
|---|---|---|
| Type | MCU, on-chip RAM/ROM, I/O, timers | MPU |
| Architecture | Harvard | Von Neumann |
| I/O | 32 lines, bit-addressable | Needs 8255 etc. |
| Registers | 4 banks of R0-R7 | A, B-L |

**⚡ Exam tip:** 8051 numbers: 4 KB ROM, 128 B RAM, 32 I/O lines, 2 timers (16-bit), 5 interrupts, 1 UART, Port 0 needs pull-ups, timer 1 vector 001BH, mode 2 = 8-bit auto-reload, RS1RS0 = 10 → bank 2 at 10H. Machine cycle = 12 clocks.

## 6. Applications, Embedded Systems, and ARM/PIC/AVR

### Applications of microcontrollers

| Field | Typical use |
|---|---|
| **Automotive** | Engine control unit (ECU), fuel injection, ABS braking, airbag deployment, cruise control, power windows, tyre-pressure monitoring, instrument cluster |
| **Home automation / appliances** | Washing machines, microwave ovens, TV remote, air conditioner thermostat, smart lighting, digital door locks |
| Consumer electronics | Digital cameras, toys, set-top boxes, printers |
| Industrial | Motor control, PLCs, robotics, process monitoring |
| Medical | Pacemakers, glucometers, BP monitors, infusion pumps |
| Computing peripherals | Keyboard, mouse controller, hard-disk controller |
| IoT & wearables | Smartwatch, fitness bands, sensor nodes |
| Security / telecom | Alarm systems, RFID, fingerprint locks, mobile phone sub-systems |
- Not typical: running a desktop OS, large database servers, high-end gaming (that is MPU work).

### Embedded systems basics
- **Embedded system:** a computer system (MCU/MPU + software firmware) built into a larger device to do a **dedicated function**, often with real-time constraints, low cost and low power. Examples: ATM, digital camera, car ECU, washing machine.
- Parts: processor (MCU/DSP), memory (ROM/Flash for firmware, RAM), I/O (sensors, actuators, displays), timers, communication interfaces (UART, SPI, I2C, CAN), power supply, firmware.
- **Real-time system:** correctness depends on result time. **Hard real-time**: missing a deadline = failure/catastrophe (airbag, ABS, pacemaker). **Soft real-time**: occasional miss tolerated (video streaming, media player). **Firm**: late results useless but not catastrophic.
- Firmware stored in ROM/Flash/EEPROM. Common languages: C, assembly, Embedded C. An **RTOS** (FreeRTOS, VxWorks) schedules tasks.
- Common interfaces: **UART** (async serial), **SPI** (4-wire synchronous), **I2C** (2-wire: SDA, SCL), CAN (automotive), USB, ADC/DAC, PWM, GPIO.
- Sensors (input: temperature, LDR, ultrasonic) → MCU → actuators (output: motors, relays, LEDs, buzzers).
- Watchdog timer resets a hung system. Interrupt-driven vs polling I/O.
- **Low-cost dedicated control (TV remote, toy)** → 8-bit MCU, not a PC-class MPU.

### ARM, PIC, AVR comparison

| Family | Maker | Bits | Architecture | Notes |
|---|---|---|---|---|
| **ARM** | Arm Ltd (formerly Acorn RISC Machine) | 32 (64-bit ARMv8) | **RISC**, load/store; licensed IP | Cortex-A (applications: phones), Cortex-R (real-time), Cortex-M (microcontrollers). Low power, Thumb 16-bit compressed instruction set, 16 visible registers R0-R15 (R13 = SP, R14 = LR, R15 = PC), CPSR |
| **PIC** | Microchip | 8/16/32 | Harvard RISC | PIC16F877A: 40 pin, 35 instructions, 8 KB Flash, 368 B RAM, 33 I/O, 10-bit ADC; single working register W |
| **AVR** | Atmel (now Microchip) | 8 (also 32) | Modified Harvard RISC | Flash program memory, 32 general registers, mostly single-cycle; ATmega328P is the Arduino Uno MCU; 16 MHz typical |
| 8051 | Intel (many second sources) | 8 | CISC-like Harvard | Oldest, still widely taught |
- Arduino = open-source board (AVR/ARM) with bootloader and IDE. Raspberry Pi = ARM-based microcomputer (runs an OS), not a plain MCU.
- ARM processors dominate smartphones and embedded devices because of **low power consumption** and high performance per watt.

**⚡ Exam tip:** "Typical automotive MCU use" = engine control / ABS / airbag, never "word processing". ARM = RISC, 32-bit, low power. Hard real-time = missing deadline causes system failure.

## Quick Revision Sheet
- MPU = CPU only; MCU = CPU + RAM + ROM + I/O + timers on one chip; microcomputer = MPU + memory + I/O.
- ALU lives inside the CPU/microprocessor; accumulator holds ALU operand and result.
- Address bus unidirectional, data bus bidirectional; memory = 2^(address lines); 16 lines = 64 KB, 20 lines = 1 MB.
- 8085: 8-bit, 40-pin, 16-bit address, 5 flags (S, Z, AC, P, CY), 5 interrupts, ALE demultiplexes AD0-AD7.
- 8085 interrupts: TRAP 0024H (highest, non-maskable), RST7.5 003CH, 6.5 0034H, 5.5 002CH, INTR lowest (only non-vectored); RST n → 8n.
- 8085 opcode fetch = 4 T-states; memory read/write = 3 T; IO/M' = 1 for I/O; LDA = 13 T, MVI = 7 T, CALL = 18 T.
- 8085 addressing: immediate, register, direct, register-indirect, implied. XRA A clears A with Z = 1, CY = 0.
- PUSH: SP ← SP − 2, stack grows downward; SP is 16-bit.
- Memory-mapped I/O: ports share memory address space, uses LDA/STA/MOV; I/O-mapped: IN/OUT via accumulator, 256 ports (8085), 64 K (8086).
- 8255: 24 lines, 3 ports, modes 0/1/2 (mode 2 only port A); control word D7 = 1 I/O, 0 BSR; all-input mode 0 = 9BH.
- 8253: 3 16-bit counters, 6 modes (mode 3 = square wave, mode 2 = rate generator). 8259: 8 IRs, 64 cascaded. 8237: 4 DMA channels.
- 8086: 16-bit data, 20-bit address (1 MB), BIU + EU, 6-byte queue (8088: 4).
- 8086 physical address = segment × 16 + offset; segment ≤ 64 KB; reset starts at FFFF0H.
- 8086 flags: 9 (6 status CF PF AF ZF SF OF; 3 control TF IF DF). IVT = 256 × 4 B = 1 KB at 00000H; address = 4 × type.
- 8086 modes: minimum (MN/MX' = 1, single CPU) / maximum (0, multiprocessor, 8288).
- 8051: 8-bit Harvard, 4 KB ROM, 128 B RAM, 32 I/O, 2 × 16-bit timers, 1 UART, 5 interrupts, machine cycle = 12 clocks.
- 8051 RAM: 00-1F banks, 20-2F bit-addressable (128 bits), 30-7F scratchpad, 80-FF SFRs. Port 0 needs external pull-ups.
- 8051 vectors: INT0 0003H, T0 000BH, INT1 0013H, T1 001BH, serial 0023H (priority in that order).
- 8051 timer modes: 0 = 13-bit, 1 = 16-bit, 2 = 8-bit auto-reload, 3 = split; reload = 65536 − delay/T (1 ms at 12 MHz = FC18H); 9600 baud = TH1 FDH at 11.0592 MHz.
- Automotive MCU uses: ECU, ABS, airbag, fuel injection; home: washing machine, microwave, remote. Embedded = dedicated function, hard real-time = deadline miss is failure.
- ARM = 32-bit RISC low power (Cortex-A/R/M); PIC = Microchip Harvard RISC; AVR = Atmel 8-bit RISC (Arduino Uno ATmega328P).
