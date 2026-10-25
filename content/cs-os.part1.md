# Operating Systems

> **What the exam asks:** Bihar STET Paper II (Computer Science) usually carries about 3-6 questions from OS per paper. They are mostly direct definitions (functions of OS, kernel, context switch, inode, page table, I/O subsystem, protection, fragmentation, deadlock, paging/virtual memory), plus occasional numeric items: scheduling averages, page-fault counts, Banker's safe sequence, disk-head movement, EAT. Learn the definitions, the comparisons and the 6 numeric patterns in this file.

## 1. OS Basics: Functions, Types, Structure

### 1.1 What is an Operating System?
- **Operating System (OS):** system software that acts as an **interface between the user/application programs and the computer hardware**, and manages hardware and software resources.
- It is a **resource manager** (CPU, memory, files, I/O devices) and a **control program** (controls execution of user programs, prevents improper use).
- Goals: **convenience** (easy to use), **efficiency** (good utilisation of resources), **ability to evolve**.
- Examples: Windows, Linux, Unix, macOS, Android (Linux kernel based), iOS, MS-DOS.
- OS is **system software**; MS-Word, browsers, games are **application software**. Compilers/assemblers/linkers are system programs (utilities), not the OS kernel.

### 1.2 Main functions of an OS

| Function | Meaning |
|---|---|
| Process management | creation, deletion, scheduling, synchronisation, communication, deadlock handling |
| Memory management | allocation/deallocation, tracking which part is used by whom, virtual memory |
| File management | create/delete/read/write files and directories, access control |
| Device (I/O) management | drivers, buffering, caching, spooling |
| Secondary-storage (auxiliary storage / disk) management | free-space management, allocation, disk scheduling |
| Protection & security | authentication, access rights |
| User interface | CLI (shell) or GUI |
| Error detection, accounting | logging resource use |

- NOT a function of OS: application development, compiling source code, designing databases, word processing.
- **Booting:** loading the OS into main memory. A small program in ROM (**bootstrap loader**/BIOS/UEFI) runs at power-on, runs POST (power-on self test), then loads the OS kernel from disk.

### 1.3 Types of operating systems

| Type | Key idea | Example / note |
|---|---|---|
| **Batch** | similar jobs grouped into batches, run one after another with no user interaction | early IBM mainframes; CPU often idle during I/O |
| **Multiprogramming** | several jobs kept in memory; when one waits for I/O the CPU switches to another → **maximises CPU utilisation** | degree of multiprogramming = number of processes in memory |
| **Time-sharing (multitasking)** | multiprogramming + very short **time slice (quantum)**, rapid switching, interactive | Unix, Linux; aim = **minimise response time** |
| **Multiprocessor / parallel** | more than one CPU sharing memory, bus, clock; higher throughput, reliability | **SMP** (symmetric: every CPU runs the OS) vs **AMP** (master-slave) |
| **Distributed** | many independent computers connected by network, appear as one system; resource sharing | loosely coupled |
| **Network OS** | each machine has its own OS; users know about other machines | Novell NetWare, Windows Server |
| **Real-time (RTOS)** | must respond within a deadline. **Hard RT** – missing a deadline = failure (air-bag, pacemaker); **Soft RT** – occasional miss tolerated (video streaming) | VxWorks, QNX, FreeRTOS |
| **Embedded** | small fixed-function OS in a device | Android Things, RTOS in appliances |
| **Single-user / Multi-user** | MS-DOS is single-user single-task; Unix is multi-user multitasking | |

- **Multiprogramming** = many programs in memory, CPU switches only when a program waits. **Multitasking** = multiprogramming + time-slicing. **Multiprocessing** = many CPUs. **Multithreading** = many threads inside a process.
- **Spooling** (Simultaneous Peripheral Operations On-Line): disk used as a huge buffer to hold output (e.g. for printer) so CPU and slow devices work in overlap.
- **Buffering** overlaps the I/O and computation of ONE job; **spooling** overlaps the I/O of one job with the computation of OTHER jobs.

### 1.4 OS structure
- **Simple/monolithic:** the entire OS is a single large kernel program running in kernel mode (original Unix, MS-DOS has no separation). Fast, but hard to maintain; one bug can crash everything.
- **Layered:** OS divided into layers; layer 0 = hardware, top layer = user interface; each layer uses only the services of lower layers. Easy debugging, but slower and layers are hard to define.
- **Microkernel:** only minimal functions (IPC, basic scheduling, basic memory management) in the kernel; file systems, drivers, etc. run as **user-space servers**. More secure/reliable/extensible, but slower (message passing overhead). Examples: Mach, QNX, MINIX.
- **Modular (loadable kernel modules):** core kernel + dynamically loadable modules (Linux, Solaris).
- **Hybrid:** Windows NT, macOS (XNU = Mach + BSD).
- **Virtual machine:** hypervisor creates the illusion of multiple separate machines on one physical machine (VMware, VirtualBox, JVM is a *process* VM).

### 1.5 Kernel, shell, system calls
- **Kernel:** the core, always-resident part of the OS that runs in privileged mode and manages CPU, memory and devices.
- **Shell:** the command interpreter; user-level program that reads the user's commands and asks the kernel to execute them (bash, sh, csh, ksh). It is the interface between the user and the kernel. **GUI** and **CLI** are the two user-interface types.
- **System call:** the programmatic interface by which a user program **requests a service from the kernel** (e.g. open a file, create process). It is implemented using a **trap/software interrupt** which switches the CPU from user mode to kernel mode. Programs normally use it indirectly through **API libraries** (e.g. `printf()` in libc → `write()` system call; Win32 API; POSIX API).

| Category | Examples (Unix) |
|---|---|
| Process control | `fork()`, `exec()`, `wait()`, `exit()`, `kill()` |
| File management | `open()`, `read()`, `write()`, `close()`, `lseek()` |
| Device management | `ioctl()`, `read()`, `write()` |
| Information maintenance | `getpid()`, `time()`, `alarm()` |
| Communication | `pipe()`, `shmget()`, `msgget()`, `socket()` |
| Protection | `chmod()`, `chown()`, `umask()` |

- Parameters to a system call are passed in **registers**, in a **table in memory** (address in a register) or on the **stack**.
- `fork()` returns **0 to the child**, the **child's PID to the parent**, and **−1 on failure**. After n successive unconditional `fork()` calls, total processes = 2ⁿ (child processes = 2ⁿ − 1).

### 1.6 Dual mode: user mode vs kernel mode
- A **mode bit** in the hardware: **0 = kernel (supervisor/privileged) mode**, **1 = user mode** (Intel convention).
- **Privileged instructions** (I/O instructions, set timer, modify memory-management registers, disable interrupts, halt, change mode bit) execute only in kernel mode. Executing one in user mode causes a **trap**.
- Switch user → kernel happens on a **system call, interrupt, or exception (trap)**. Return to user mode by a special "return from interrupt/trap" instruction.
- **Timer** ensures the OS regains control from a program stuck in an infinite loop.
- **Interrupt:** asynchronous signal from hardware (I/O completion, timer) → CPU saves state, runs the **interrupt service routine (ISR)** found through the **interrupt vector**. **Trap/exception:** synchronous, software generated (divide by zero, invalid memory access, system call).

**⚡ Exam tip:** "Not a function of OS" → application software/compilers/word processing. "Kernel" = core part running in privileged mode; "shell" = command interpreter. A system call moves the CPU from **user to kernel mode** via a trap. Time-sharing aims at response time; batch at throughput; multiprogramming at CPU utilisation.

---

## 2. Processes, Threads, IPC, Context Switch

### 2.1 Process basics
- **Program** = passive entity (file on disk). **Process** = program in execution = active entity.
- A process in memory has four parts: **text** (code), **data** (global/static variables), **heap** (dynamic memory, grows up), **stack** (function parameters, return addresses, locals; grows down). Plus the program counter and registers.

### 2.2 Process states (five-state model)
```
          admitted           dispatch (scheduler)         exit
  NEW ------------> READY ---------------------> RUNNING ------> TERMINATED
                     ^  ^                           |
                     |  |   interrupt (time out)    |
                     |  +---------------------------+
                     |                              | I/O or event wait
                     |    I/O / event completion    v
                     +----------------------- WAITING (BLOCKED)
```
- **New:** being created. **Ready:** in memory, waiting for the CPU. **Running:** instructions executing (only one per CPU). **Waiting/Blocked:** waiting for I/O or an event. **Terminated:** finished.
- Transitions: Ready→Running (**dispatch**), Running→Ready (**pre-emption/time-out**), Running→Waiting (I/O request), Waiting→Ready (I/O complete). **Waiting → Running is NOT possible directly.** Ready → Waiting is not possible.
- Seven-state model adds **suspended ready** and **suspended wait (blocked)** (process swapped out to disk) – managed by the **medium-term scheduler**.

### 2.3 Process Control Block (PCB)
**PCB (task control block)** = data structure the OS keeps for each process; it is the process's "identity card". Contents:
- Process ID (PID), process state
- Program counter, CPU registers (saved at context switch)
- CPU-scheduling info (priority, queue pointers)
- Memory-management info (base/limit registers, page tables)
- Accounting info (CPU time used, time limits)
- I/O status info (open files, devices allotted)
- Parent/child pointers

### 2.4 Schedulers and queues

| Scheduler | Also called | Job | Frequency |
|---|---|---|---|
| **Long-term** | job scheduler | picks jobs from pool on disk → ready queue; controls **degree of multiprogramming** | least frequent |
| **Short-term** | CPU scheduler | picks a ready process and gives it the CPU | most frequent (ms) |
| **Medium-term** | swapper | swaps processes out/in to reduce load | in between |

- **I/O-bound** process: many short CPU bursts. **CPU-bound** process: few long CPU bursts. A good long-term scheduler keeps a **mix** of both.
- **Queues:** job queue (all processes), ready queue (in memory, ready), device (I/O) queues.
- **Dispatcher:** module that gives CPU control to the process chosen by the short-term scheduler: switches context, switches to user mode, jumps to correct location. **Dispatch latency** = time to stop one process and start another.

### 2.5 Context switch
- **Context switch** = saving the state (context) of the currently running process into its PCB and loading the saved state of another process so that it can run.
- Triggered by: time-slice expiry, interrupt, I/O request, higher-priority process arrival, system call.
- It is **pure overhead** (no useful work); time depends on hardware (registers, memory-management info). It is **not** "switching between different operating systems".
- Thread context switch is faster than process context switch (same address space; no change of memory map, TLB flush avoided).

### 2.6 Process creation and termination (Unix)
- Parent creates child with `fork()` (child = copy of the parent); child usually calls `exec()` to load a new program; parent can `wait()` for the child.
- **Zombie:** child terminated but parent has not yet called `wait()`, so its PCB entry remains. **Orphan:** parent terminated first; child is adopted by `init` (PID 1).
- `init` (or `systemd`) is the first user process, PID 1, parent of all.
- Termination: normal exit, error exit, fatal error, killed by another process.

### 2.7 Threads
- **Thread** = lightweight process; basic unit of CPU utilisation. A process may have many threads.
- **Per-thread:** thread ID, program counter, register set, stack. **Shared among threads of a process:** code, data (global variables), heap, open files, signals.

| Process | Thread |
|---|---|
| heavyweight, own address space | lightweight, shares address space |
| creation/context switch costly | cheap |
| IPC needed to communicate | shared memory, easy communication |
| independent; one crash doesn't affect others | one thread's crash can kill whole process |

- **Benefits of multithreading:** responsiveness, resource sharing, economy, scalability on multiprocessors.
- **User-level threads (ULT):** managed by a thread library in user space; kernel unaware; fast to create/switch; **if one thread blocks (system call) the whole process blocks**; cannot use multiple CPUs. **Kernel-level threads (KLT):** managed by the OS; blocking one doesn't block others; slower; can run in parallel on multiple CPUs. Examples: Windows, Linux, Solaris KLT; POSIX **pthreads** is a library API; Java threads.
- **Multithreading models:** **Many-to-One** (many user threads → one kernel thread), **One-to-One** (each user thread → a kernel thread; Linux/Windows), **Many-to-Many** (multiplexes many user threads onto ≤ as many kernel threads).
- **Concurrency** = progress of multiple tasks (interleaved on one CPU); **Parallelism** = actually simultaneous (needs multiple cores).

### 2.8 Inter-Process Communication (IPC)
Cooperating processes need IPC. Two fundamental models:

| Shared memory | Message passing |
|---|---|
| region of memory shared by processes | processes exchange messages via `send()` / `receive()` |
| **fastest** (kernel involved only for setup) | slower (kernel involved each time) |
| needs synchronisation by programmer | easier, good for distributed systems and small data |

- Mechanisms: **pipes** (unidirectional, related processes; `|` in shell), **named pipes / FIFO** (unrelated processes, appear in file system), **message queues**, **shared memory**, **semaphores**, **sockets** (across network), **signals**.
- Message passing variants: **direct** (name the process) vs **indirect** (mailbox/port); **synchronous (blocking)** vs **asynchronous (non-blocking)**; buffering: zero capacity, bounded, unbounded.
- **Race condition:** outcome depends on the order of execution of concurrent accesses to shared data.

**⚡ Exam tip:** PCB holds PC + registers + state + memory info; context switch saves it. Threads share code/data/files but have own stack, registers, PC. Ready→Running = dispatch; Waiting→Running does not exist. Shared memory is the fastest IPC. Short-term scheduler = most frequent; long-term controls degree of multiprogramming.

---

## 3. CPU Scheduling

### 3.1 Concepts and terms
- **CPU burst / I/O burst** cycle: process execution alternates between them.
- Scheduling decisions occur when a process: (1) running→waiting, (2) running→ready, (3) waiting→ready, (4) terminates. Cases 1 and 4 only → **non-preemptive**; 2 and 3 as well → **preemptive**.
- **Non-preemptive:** process keeps CPU until it finishes or blocks. **Preemptive:** CPU can be taken away.

| Term | Definition / formula |
|---|---|
| Arrival Time (AT) | when process enters the ready queue |
| Burst Time (BT) | CPU time required |
| Completion Time (CT) | time when it finishes |
| **Turnaround Time (TAT)** | **CT − AT** |
| **Waiting Time (WT)** | **TAT − BT** (time spent in ready queue) |
| Response Time (RT) | first CPU time − AT |
| Throughput | processes completed per unit time |
| CPU utilisation | % time CPU busy |

- Criteria: **maximise** CPU utilisation & throughput; **minimise** turnaround, waiting, response time.
- A **Gantt chart** is the bar chart showing the order and time of execution.

### 3.2 Algorithms

| Algorithm | Selection rule | Preemptive? | Notes |
|---|---|---|---|
| **FCFS** | earliest arrival | No | simple FIFO queue; **convoy effect** (short jobs stuck behind a long one); poor avg WT |
| **SJF** | smallest next CPU burst | No | **optimal (minimum average WT)** for a given set; starvation of long jobs; burst needs prediction |
| **SRTF (SRJF)** | smallest remaining time | Yes | preemptive SJF; optimal avg WT overall; starvation |
| **Round Robin** | FIFO queue with time quantum q | Yes | designed for time-sharing; good response time; no starvation |
| **Priority** | highest priority first (small number often = high) | Both | **starvation** of low priority → cured by **aging** |
| **Multilevel Queue** | separate fixed queues (foreground/RR, background/FCFS) | Yes | processes permanently assigned to a queue; scheduling among queues is fixed-priority or time-slice |
| **Multilevel Feedback Queue** | like MLQ but processes **move** between queues by behaviour | Yes | most general; prevents starvation by aging; defined by number of queues, algorithm per queue, upgrade/demote rules |
| **HRRN** | highest response ratio = (W + S)/S | No | W = waiting time, S = service time; reduces starvation |
| **Longest Job First** | largest burst first | No | rarely used |

- **Round Robin:** if q is very large → behaves as **FCFS**; if q is very small → too many context switches (overhead), approaches processor sharing. Good q: slightly larger than most CPU bursts (~80% of bursts shorter than q). With n processes and quantum q, no process waits more than **(n−1)·q** for its next turn.
- **Convoy effect:** FCFS problem. **Starvation (indefinite blocking):** Priority, SJF, SRTF. **Aging:** gradually increase priority of waiting processes.
- **Priority inversion:** a high-priority process waits for a low-priority process holding a lock; solved by **priority inheritance**.
- SJF burst prediction: **exponential averaging** τₙ₊₁ = α·tₙ + (1 − α)·τₙ.

### 3.3 Worked example A: FCFS, SJF, SRTF

| Process | AT | BT |
|---|---|---|
| P1 | 0 | 8 |
| P2 | 1 | 4 |
| P3 | 2 | 9 |
| P4 | 3 | 5 |

**FCFS** (order P1, P2, P3, P4):
```
| P1 | P2 | P3 | P4 |
0    8    12   21   26
```
CT = 8, 12, 21, 26. TAT = CT − AT = 8, 11, 19, 23 → avg = 61/4 = **15.25**. WT = TAT − BT = 0, 7, 10, 18 → avg = 35/4 = **8.75**.

**SJF (non-preemptive):** at t=0 only P1 is present, runs to 8. Then ready: P2(4), P3(9), P4(5) → P2, P4, P3.
```
| P1 | P2 | P4 | P3 |
0    8    12   17   26
```
CT: P1 8, P2 12, P4 17, P3 26. TAT: 8, 11, 14, 24 → avg 14.25. WT: 0, 7, 9, 15 → avg = 31/4 = **7.75**.

**SRTF (preemptive SJF):** P2 (4) arrives at t=1 < P1's remaining 7 → preempts. P3 (9) at t=2 and P4 (5) at t=3 don't preempt P2 (remaining 3 and 2). After P2 ends at 5: P4(5) < P1(7) < P3(9).
```
| P1 | P2 | P4 | P1 | P3 |
0    1    5    10   17   26
```
CT: P1 17, P2 5, P3 26, P4 10. TAT: 17, 4, 24, 7 → avg 13. WT: 9, 0, 15, 2 → avg = 26/4 = **6.5**. (SRTF < SJF < FCFS: classic result.)

### 3.4 Worked example B: Round Robin (all AT = 0, q = 2)

| P | BT |
|---|---|
| P1 | 5 |
| P2 | 3 |
| P3 | 1 |
```
| P1 | P2 | P3 | P1 | P2 | P1 |
0    2    4    5    7    8    9
```
Ready-queue order: P1(2) → P2(2) → P3(1, done at 5) → P1(2, rem 1 left) → P2(1, done 8) → P1(1, done 9).
CT: P1 9, P2 8, P3 5. TAT = 9, 8, 5 (AT=0) → avg 22/3 = 7.33. WT = TAT − BT = 4, 5, 4 → avg 13/3 = **4.33**.

**Priority (non-preemptive) quick example:** P1(BT 10, pr 3), P2(1, 1), P3(2, 4), P4(1, 5), P5(5, 2), all AT 0, smaller number = higher priority → order P2, P5, P1, P3, P4 (finish at 1, 6, 16, 18, 19). WT: P2 = 0, P5 = 1, P1 = 6, P3 = 16, P4 = 18 → total 41, avg = **8.2**.

### 3.5 Quick comparisons
- Lowest average waiting time among all algorithms: **SRTF/SJF** (SJF is provably optimal for non-preemptive; SRTF for preemptive).
- Best for interactive/time-sharing: **Round Robin**. Simplest: **FCFS**. Most general: **MLFQ**.
- RR with q = ∞ = FCFS. With the same AT = 0 for all, FCFS WT depends on order given.
- Which can cause starvation? Priority, SJF, SRTF, MLQ (low queues). Which cannot? FCFS, RR, HRRN, aging-based MLFQ.

**⚡ Exam tip:** TAT = CT − AT; WT = TAT − BT. When AT = 0 for all, TAT = CT. SJF/SRTF give minimum average WT; RR with large quantum = FCFS; priority → starvation solved by aging; convoy effect = FCFS. Draw the Gantt chart first, then compute.
