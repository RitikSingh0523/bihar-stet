
---

## 7. Virtual Memory

### 7.1 Concept
- **Virtual memory:** technique that lets a process run even if it is **not completely in main memory**; the logical address space can be much larger than physical memory. Implemented with **demand paging** (or demand segmentation). Secondary storage is used as an extension of RAM (the **swap space**/backing store).
- Benefits: program size not limited by RAM; more programs in memory (higher degree of multiprogramming, better CPU utilisation); less I/O for loading; faster process creation (copy-on-write).
- **Copy-on-write (COW):** parent and child initially share pages; a page is copied only when one of them writes (used in `fork()`).

### 7.2 Demand paging and page fault
- **Demand paging:** a page is loaded into memory **only when it is referenced** (lazy swapper = **pager**). Pure demand paging: start process with **no** pages in memory.
- Each PTE has a **valid–invalid bit**: valid = page legal and in memory; invalid = illegal or not in memory.
- **Page fault:** reference to a page not in memory (invalid bit) → **trap to OS**. Steps:
  1. Trap to OS; check internal table (PCB) – if illegal address, terminate; else page is on disk.
  2. Find a **free frame** (if none, run page replacement).
  3. Schedule disk read of the page into the frame.
  4. Update page table (valid bit = 1) and process table.
  5. **Restart the instruction** that caused the fault.
- A page fault is an **interrupt/trap (exception)**, handled by the OS; it is **not** an error by itself.
- **Locality of reference** (temporal and spatial) is why demand paging works.
- **Effective access time with page faults:** p = page-fault rate (0 ≤ p ≤ 1).
```
EAT = (1 − p) × t_mem + p × t_page-fault-service
```
- **Worked example.** t_mem = 200 ns, fault service time = 8 ms = 8,000,000 ns, p = 0.001 (1 in 1000): EAT = 0.999 × 200 + 0.001 × 8,000,000 = 199.8 + 8000 = **8199.8 ns** (≈ 8.2 μs; slowdown ≈ 41×). To keep slowdown below 10% (EAT ≤ 220 ns) p must be < 0.0000025.
- **Page-fault service time** is dominated by disk I/O (seek + latency + transfer). **Dirty (modify) bit:** if the victim page was not modified it need not be written back → saves one I/O.

### 7.3 Page replacement algorithms
When no free frame exists, choose a **victim page** to replace. Goal: **lowest page-fault rate**. Evaluated on a **reference string**.

| Algorithm | Victim | Notes |
|---|---|---|
| **FIFO** | oldest page in memory | simple; can evict heavily-used page; suffers **Belady's anomaly** |
| **Optimal (OPT / MIN)** | page that will **not be used for the longest time in future** | **lowest possible fault rate**, no Belady; **not implementable** (needs future knowledge) – used as benchmark |
| **LRU** | page **least recently used** (in the past) | good approximation of OPT; **stack algorithm** → no Belady; implementation by counters or stack of page numbers; needs hardware help |
| **LRU approximations** | reference bit; **second chance (clock)**: FIFO + reference bit (if ref bit = 1, clear it and give another chance); **enhanced second chance** uses (reference, modify) pairs; **additional-reference-bits** | |
| **LFU / MFU** | least / most frequently used | rarely used |
| **NRU** | classes by (R, M) bits | |
- **Stack algorithms** (OPT, LRU, LFU) never show Belady's anomaly: the set of pages in n frames ⊆ set in n+1 frames.

**Worked example (3 frames).** Reference string:
`7 0 1 2 0 3 0 4 2 3 0 3 2 1 2 0 1 7 0 1` (20 references)

**FIFO** trace (frames after each fault; F = fault, H = hit):
```
ref : 7  0  1  2  0  3  0  4  2  3  0  3  2  1  2  0  1  7  0  1
      F  F  F  F  H  F  F  F  F  F  F  H  H  F  F  H  H  F  F  F
```
FIFO faults = **15**. (First 3 are compulsory; 7 replaced by 2, 0 by 3, 1 by 0 ...)

**LRU:** at ref 2, LRU victim is 7; at 3 it is 1; at 4 it is 2 (since 0,3 recently used)... Faults:
```
ref : 7  0  1  2  0  3  0  4  2  3  0  3  2  1  2  0  1  7  0  1
      F  F  F  F  H  F  H  F  F  F  F  H  H  F  H  F  H  F  H  H
```
LRU faults = **12**.

**Optimal:** replace the page whose next use is farthest away (or never):
```
ref : 7  0  1  2  0  3  0  4  2  3  0  3  2  1  2  0  1  7  0  1
      F  F  F  F  H  F  H  F  H  H  F  H  H  F  H  H  H  F  H  H
```
OPT faults = **9** (page-fault rate 9/20 = 45%). So **OPT (9) < LRU (12) < FIFO (15)** – the textbook ordering.

- Hit ratio = hits / references = 1 − faults/references. Number of **compulsory (cold-start) faults** = number of distinct pages (when no frames are pre-loaded).

### 7.4 Belady's anomaly
- **Belady's anomaly:** for some algorithms (**FIFO**), **increasing** the number of frames **increases** the number of page faults.
- Classic string: `1 2 3 4 1 2 5 1 2 3 4 5`
  - FIFO with **3 frames → 9 faults**; with **4 frames → 10 faults** (anomaly!).
  - LRU/OPT: faults decrease (LRU: 10 → 8 for 3 → 4 frames).

### 7.5 Frame allocation and thrashing
- **Allocation:** **equal** (m/n each), **proportional** (∝ process size), **priority**. Minimum frames per process fixed by the instruction set architecture. **Global replacement** (victim from any process; better throughput but a process can't control its own fault rate) vs **local replacement** (victim from own frames only).
- **Thrashing:** a process (or system) spends **more time paging than executing** because it doesn't have enough frames for its **working set** → very high page-fault rate, CPU utilisation falls; the OS (seeing low CPU use) wrongly adds more processes → utilisation collapses further.
- Causes: high degree of multiprogramming, insufficient frames, global replacement.
- Cures: reduce degree of multiprogramming (medium-term scheduler swaps out processes), use **local replacement/priority replacement**, **working-set model**, **page-fault frequency (PFF)** control, add RAM.
- **Working-set model:** WS(t, Δ) = set of pages referenced in the most recent Δ references; if total demand ΣWSS > available frames → thrashing → suspend a process.
- **Prepaging**, **page buffering**, and **large page size** (smaller page table but more internal fragmentation; small pages → better locality use, but bigger table) – trade-offs. Typical page size 4 KB.
- **Swap space:** disk area for virtual memory – faster than the file system (larger chunks, no directory lookups); Linux uses a swap partition or swap file.

**⚡ Exam tip:** Faults: OPT ≤ LRU ≤ FIFO for the standard string (9, 12, 15). Belady's anomaly = FIFO only (not LRU/OPT). Thrashing = more paging than execution (too many processes / too few frames). EAT = (1−p)·m + p·fault-time. A page fault is handled by the OS and the **instruction is restarted**.

---

## 8. File Systems and Disk Management

### 8.1 File concepts
- **File:** named collection of related information stored on secondary storage; a logical storage unit (OS abstracts physical properties).
- **File attributes:** **name**, **identifier** (inode number), **type**, **location** (pointer to device/blocks), **size**, **protection** (permissions), **time/date/owner** (creation, modification, last access).
- **File operations:** create, open, read, write, **reposition (seek)**, delete, truncate, close, append, rename. The **open-file table** (system-wide and per-process) holds info about opened files; a **file pointer**, **open count**, disk location are kept.
- **File types** (by extension): executable (`.exe .com .bin`), object (`.obj .o`), source (`.c .java .py`), batch/script (`.bat .sh`), text (`.txt .doc`), archive (`.zip .tar .rar`), multimedia (`.mp3 .mp4 .jpg`), library (`.lib .dll .so`).
- Internal structure: byte sequence (Unix – all files are just byte streams), record sequence, tree (index).
- **File types in Unix:** regular (`-`), directory (`d`), symbolic link (`l`), character special (`c`), block special (`b`), socket (`s`), pipe/FIFO (`p`). **"Everything is a file"** in Unix, including devices.
- **Magic number** at start of a file identifies the type in Unix.

### 8.2 Access methods

| Method | Description |
|---|---|
| **Sequential** | records processed in order; `read next`, `write next`, `reset`; tapes, editors; most common |
| **Direct (relative/random)** | fixed-length records; read/write any block directly: `read n`, `write n` (n = relative block number); databases |
| **Indexed (ISAM)** | index file with pointers to blocks/records; search index (binary) then access record; large databases |

### 8.3 Directory structure
- **Directory:** a symbol table mapping file names to file control blocks; operations: search, create, delete, list, rename, traverse.

| Structure | Features | Problem |
|---|---|---|
| **Single-level** | all files in one directory | name collision (unique names), no grouping |
| **Two-level** | separate **User File Directory (UFD)** per user under a Master File Directory (MFD) | no sharing / no subdirectories |
| **Tree-structured** | hierarchy; **absolute** path (from root, e.g. `/home/ram/a.txt`) vs **relative** path (from current working directory); one root | sharing difficult |
| **Acyclic graph** | allows shared files/directories via **links** (hard link, symbolic link) | deletion problem (dangling pointers); needs reference counts; no cycles |
| **General graph** | cycles allowed | needs **garbage collection**, cycle detection |
- **Hard link:** another directory entry to the same inode (same file system, increments link count; file freed when count = 0). **Symbolic (soft) link:** a file containing the path name of the target; can cross file systems; becomes dangling if target deleted.
- **Mounting:** attaching a file system to a directory (mount point) in the existing tree.

### 8.4 File allocation methods

| Method | How | Pros | Cons |
|---|---|---|---|
| **Contiguous** | file occupies consecutive blocks; directory stores (start, length) | simple; **fast sequential & direct access**; minimal seeks | **external fragmentation**; file size must be known; files can't grow easily; compaction needed |
| **Linked** | each block holds a **pointer** to the next block; directory stores first (and last) block | no external fragmentation; file can grow | **no efficient direct access**; pointer overhead; poor reliability (one broken pointer loses the rest); slow |
| **FAT** (File Allocation Table) | variation of linked: pointers are stored in a **table** at the start of the volume (one entry per block); last block marked EOF; table cached in memory | direct access improved | table size; extra seek if not cached (used by MS-DOS, FAT12/16/32, flash drives) |
| **Indexed** | an **index block** holds all block pointers of the file | **no external fragmentation, supports direct access** | index block overhead; large files need multi-level/linked/combined index |

- Linked allocation: to read block i, i disk reads are needed. Indexed: 1 index read + 1 block read.
- **Unix inode (index node):** a data structure holding **file attributes** (owner, permissions, size, timestamps, link count) and the **pointers to data blocks**; contains **no file name** (names are in directory entries mapping name → inode number). Typical **combined scheme**: **12 direct pointers**, 1 **single indirect**, 1 **double indirect**, 1 **triple indirect**. Small files are accessed quickly via direct blocks.
  - **Worked example.** Block = 4 KB, pointer = 4 bytes → 1024 pointers per index block. Max file size = (12 + 1024 + 1024² + 1024³) × 4 KB ≈ 4 TB (dominated by the triple-indirect term, 1024³ × 4 KB = 4 TB). Direct part alone = 12 × 4 KB = 48 KB.
- Directory implementation: **linear list** (simple, slow search) vs **hash table** (fast).
- **File system layers:** application programs → logical file system → file-organisation module → basic file system → I/O control (device drivers) → devices.
- Common file systems: **FAT32, NTFS** (Windows), **ext2/ext3/ext4** (Linux), HFS+/APFS (macOS), ISO 9660 (CD). **Journaling** (ext3/4, NTFS) logs changes to recover quickly from crashes.
- **Boot block, superblock** (file-system metadata: size, free blocks count, free list), **inode table**, data blocks – layout of a Unix file system.

### 8.5 Free-space management

| Method | Idea |
|---|---|
| **Bit vector (bitmap)** | 1 bit per block (1 = free or allocated by convention); easy to find first free/contiguous blocks; vector must be kept in memory – large disks → big bitmap |
| **Linked list** | free blocks linked together; no waste, but traversal slow |
| **Grouping** | first free block stores addresses of n free blocks, the last of which points to the next such block |
| **Counting** | store (first free block, count of contiguous free blocks) – good when free space is contiguous |
| **Space maps** (ZFS) | |
- Bit vector size = number of disk blocks bits. Example: 1 TB disk with 4 KB blocks = 2²⁸ blocks → 2²⁸ bits = 32 MB bitmap.

### 8.6 Disk structure and performance
- Disk: **platters** → **tracks** → **sectors**; same-numbered tracks on all platters = **cylinder**; **read/write heads** on an arm. **Disk access time = seek time + rotational latency + transfer time**.
  - **Seek time:** move arm to the correct cylinder. **Rotational latency:** wait for sector to rotate under head (**average = half a rotation**; for 7200 rpm one rotation = 60/7200 s = 8.33 ms → average latency ≈ 4.17 ms). **Transfer time** = data size / transfer rate.
- Disk capacity = surfaces × tracks per surface × sectors per track × bytes per sector.
- **Disk formatting:** low-level (physical) formatting divides disk into sectors; partitioning; logical formatting writes the file system. **Boot block / MBR** holds the bootstrap. **Bad blocks:** handled by sector sparing/forwarding.
- **Disk scheduling** reduces total seek time (head movement), the dominant cost.

### 8.7 Disk scheduling algorithms – worked example
Request queue (cylinders): **98, 183, 37, 122, 14, 124, 65, 67**. Head at **53**; disk has cylinders **0–199**.

| Algorithm | Rule | Head path | Total movement |
|---|---|---|---|
| **FCFS** | serve in arrival order | 53→98→183→37→122→14→124→65→67 | 45+85+146+85+108+110+59+2 = **640** |
| **SSTF** (shortest seek time first) | nearest request next (like SJF; may **starve** far requests) | 53→65→67→37→14→98→122→124→183 | 12+2+30+23+84+24+2+59 = **236** |
| **SCAN** (elevator) | head moves in one direction serving requests to the **end of the disk**, then reverses. If moving toward 0 first: | 53→37→14→**0**→65→67→98→122→124→183 | 53 + 183 = **236** |
| **C-SCAN** (circular SCAN) | moves in one direction only to the end, then **jumps** to the other end and continues in the same direction; gives more uniform wait time. Toward 199 first: | 53→65→67→98→122→124→183→**199**→**0**→14→37 | (199−53) + 199 + 37 = **382** (including return jump) |
| **LOOK** | like SCAN but goes only as far as the **last request** in each direction, then reverses. Toward 199 first: | 53→65→67→98→122→124→183→37→14 | 130 + 169 = **299** |
| **C-LOOK** | like C-SCAN but goes only to the last request, then jumps to the lowest pending request | 53→…→183→14→37 | 130 + 169 + 23 = **322** (with jump) |

- **FCFS:** fair, no starvation, high movement. **SSTF:** better throughput, starvation possible. **SCAN/C-SCAN:** no starvation, good under heavy load (best for heavy load = SCAN & C-SCAN); C-SCAN gives more uniform waiting time. **LOOK/C-LOOK** are the practical versions.
- Disk-scheduling choice depends on number/type of requests and the file-allocation method (contiguous → less head movement).
- **RAID** (Redundant Array of Independent Disks): **RAID 0** striping (speed, no redundancy), **RAID 1** mirroring (reliability), **RAID 5** block-level striping with distributed parity (tolerates 1 disk failure), **RAID 6** double parity; **RAID 10** = mirror + stripe.
- **SSDs** have no seek time, so seek-optimising schedulers (SCAN etc.) matter little for them.

**⚡ Exam tip:** Inode stores attributes + block pointers, **not the file name**. Linked allocation = no direct access; contiguous = fast but external fragmentation; indexed = direct access without external fragmentation. Disk access time = seek + rotational latency + transfer. SCAN = elevator; C-SCAN = circular, uniform wait; SSTF may starve; for the classic queue FCFS = 640, SSTF = 236.

---

## 9. I/O Systems, Unix/Linux and Protection

### 9.1 I/O hardware and techniques
- **Device controller** (hardware on device/motherboard with registers) + **device driver** (OS software module providing a uniform interface to the I/O subsystem; hides hardware details). Devices classified: block (disks), character (keyboard, mouse), network.
- **Port, bus, controller.** CPU talks to the controller via **I/O ports/registers**: **port-mapped I/O** (special I/O instructions) or **memory-mapped I/O** (device registers appear in the memory address space; normal load/store).
- **Three ways of doing I/O:**
  1. **Programmed I/O (polling / busy-waiting):** CPU repeatedly checks the device status (busy bit); wastes CPU time.
  2. **Interrupt-driven I/O:** device interrupts the CPU on completion; CPU does other work meanwhile.
  3. **DMA (Direct Memory Access):** DMA controller transfers a whole block between device and memory **without CPU involvement per byte**; CPU interrupted only once at the end. Best for bulk transfers; **cycle stealing** = DMA takes bus cycles from CPU.
- **Kernel I/O subsystem** responsibilities: **I/O scheduling** (ordering of requests), **buffering** (store data in memory during transfer – to cope with speed mismatch, size mismatch, copy semantics), **caching** (fast copy of data; a **buffer cache** keeps disk blocks in memory to reduce disk I/O), **spooling** (hold output for a device like printer that can't interleave), **device reservation**, **error handling**, **protection of I/O** (I/O instructions privileged), name space management, power management.
- **Buffer** may hold the only copy of data; a **cache** holds a copy of data that is stored elsewhere.
- **Blocking, non-blocking and asynchronous I/O:** blocking = process suspended until I/O completes; non-blocking returns immediately with available data; asynchronous = request returns at once, completion signalled later.
- **Interrupt controller / vectored interrupts:** interrupt vector = table of ISR addresses; interrupts can be **maskable** (can be disabled) or **non-maskable** (NMI – for unrecoverable errors); **interrupt priority levels**.

### 9.2 Unix / Linux basics
- **Unix** developed at **AT&T Bell Labs** in **1969** by **Ken Thompson and Dennis Ritchie**; rewritten in **C**. **Linux** (1991) by **Linus Torvalds**, a free, open-source (GPL), **Unix-like** monolithic (modular) kernel; Linux distributions: Ubuntu, Red Hat, Debian, Fedora, Android uses Linux kernel. Unix/Linux are **multi-user, multitasking, portable**, with hierarchical file system and a powerful shell.
- **Architecture layers:** **Hardware → Kernel → Shell → User applications/utilities.** Shells: **sh** (Bourne), **bash** (Bourne Again Shell – default in Linux), csh, ksh, zsh.
- **Directory layout (FHS):** `/` root; `/bin` essential commands; `/sbin` system binaries; `/etc` configuration files; `/home` user home dirs; `/root` home of superuser; `/usr` user programs; `/var` variable data (logs); `/tmp` temporary files; `/dev` device files; `/proc` virtual files about processes; `/boot` boot files/kernel; `/lib` libraries; `/mnt` mount point. **`~`** = home directory, `.` = current directory, `..` = parent directory.
- **Superuser** = **root** (UID 0). Normal prompt `$`, root prompt `#`. Linux is **case-sensitive**.

| Command | Purpose |
|---|---|
| `pwd` | print working directory |
| `ls` (`-l` long, `-a` hidden, `-R` recursive) | list directory contents |
| `cd dir` | change directory |
| `mkdir` / `rmdir` | create / remove directory |
| `touch f` | create empty file / update timestamp |
| `cat f` | display (concatenate) file; `cat > f` creates |
| `cp src dst` / `mv src dst` / `rm f` (`rm -r` recursive) | copy / move-rename / delete |
| `more`, `less`, `head`, `tail` | view file page-wise / first 10 / last 10 lines |
| `wc` (`-l -w -c`) | count lines, words, characters |
| `grep pattern f` | search text pattern |
| `find` | search files in directory tree |
| `sort`, `uniq`, `cut`, `diff` | sorting, duplicates, columns, compare |
| `chmod`, `chown`, `chgrp` | change permissions / owner / group |
| `ps`, `top`, `kill pid`, `kill -9 pid` | process status / live process monitor / terminate / force kill |
| `df`, `du` | disk free space / disk usage |
| `who`, `whoami`, `date`, `cal`, `echo`, `clear`, `man`, `history` | misc. (`man` = manual) |
| `ln` / `ln -s` | hard link / symbolic link |
| `tar`, `gzip` | archive / compress |
| `mount`, `umount` | attach / detach file system |
| `sudo` | run command as superuser |
| `passwd` | change password; `su` switch user |
| `&` after command | run in background; `fg`, `bg`, `jobs`; `nohup` |

- **Redirection and pipes:** `>` output to file (overwrite), `>>` append, `<` input from file, `2>` redirect errors; `|` **pipe** feeds output of one command to the next: `ls | wc -l`, `cat f | sort | uniq`. Standard streams: **stdin (0), stdout (1), stderr (2)**. Wildcards: `*` any string, `?` one character, `[ ]` range.
- **File permissions:** 10-character string e.g. `-rwxr-xr--`: first char = file type; then 3 triplets for **user (owner), group, others**; r = 4, w = 2, x = 1. `chmod 755 f` = `rwxr-xr-x`; `chmod 644 f` = `rw-r--r--`; `chmod 777` = all permissions; `chmod u+x f` adds execute for owner. **umask** sets default permission mask (default files 666 − umask, directories 777 − umask; umask 022 → files 644, dirs 755).
- **Process creation in Unix:** `fork()` + `exec()`; **PID 1 = init/systemd**; `ps` shows processes; `$$` = PID of shell; background processes with `&`. Daemons = background system processes. **Signals:** `SIGKILL` (9, cannot be caught), `SIGTERM` (15), `SIGINT` (2, Ctrl+C), `SIGSTOP`.
- Unix file system blocks: boot block, superblock, inode list, data blocks. Unix **scheduler**: multilevel feedback queue with dynamic priorities (lower number = higher priority).
- **Windows vs Linux:** Windows is proprietary, GUI-centric, NTFS, drive letters (C:\); Linux is open-source, single root `/`.

### 9.3 Protection and security
- **Protection** = mechanism controlling access of processes/users to **resources defined by the OS** (internal problem). **Security** = defending the system from **external and internal attacks** and ensuring authenticated users (broader). **Principle of least privilege:** give a program only the access it needs.
- **Domain of protection:** a domain = set of (object, access-rights) pairs; a process executes in a domain. Domain can be a user, process or procedure.
- **Access matrix:** rows = domains, columns = objects, entries = access rights. Implementations: **Access Control List (ACL)** – per object, list of (domain, rights) (column-wise; Unix permissions are a compact ACL); **Capability list** – per domain, list of objects with rights (row-wise); lock-key mechanism.
- A **formal model of protection** (access matrix) provides a way to specify and enforce which domain can perform which operation on which object.
- **Authentication:** passwords (hashed and salted), biometrics, smart cards, **two-factor authentication**, one-time passwords, digital certificates.
- **Program threats:** **Trojan horse** (malicious code hidden in a useful program), **trap door/back door** (secret entry), **logic bomb** (triggers on condition), **virus** (attaches to files, needs a host/user action to spread), **worm** (self-replicating, spreads by network on its own), **ransomware**, spyware, **buffer-overflow/stack-smashing** attack.
- **System/network threats:** **Denial of Service (DoS/DDoS)**, port scanning, phishing, sniffing, **masquerading**, replay, man-in-the-middle.
- **Security measures:** strong passwords, **firewalls**, **antivirus**, **encryption** (symmetric/asymmetric), intrusion detection, patching, backups, audit logs, user accounts and file permissions. **CIA triad:** Confidentiality, Integrity, Availability.
- **Memory protection:** base + limit registers; mode bit; page-table protection bits.

**⚡ Exam tip:** DMA = block transfer without CPU per byte; interrupt-driven avoids polling. Buffer cache = holds disk blocks in memory to cut disk I/O. Protection is internal control of access to resources; security is protection against external attack. `chmod 755` = rwxr-xr-x; `ls` list, `ps` processes, `grep` search, `pwd` print directory, `kill` signals a process. Worm spreads on its own; virus needs a host file.

---

## 10. OS Services, Structures, Security and Recovery (Syllabus Supplement)

### 10.1 Services an OS provides
- **User-helpful services:** user interface (CLI/GUI/batch), **program execution**, **I/O operations**, **file-system manipulation**, **communication** (shared memory / message passing), **error detection**.
- **System-efficiency services:** **resource allocation**, **accounting** (usage statistics), **protection and security**.
- **Dual-mode operation:** mode bit distinguishes **user mode (1)** and **kernel mode (0)**; privileged instructions (I/O, set timer, halt, modify mode bit) run only in kernel mode. **Timer** prevents a process hogging the CPU.

### 10.2 OS structures compared

| Structure | Idea | Example | Pros / cons |
|---|---|---|---|
| Monolithic | whole OS in one kernel address space | early UNIX, MS-DOS (simple) | fast; hard to maintain, one bug crashes all |
| Layered | layers 0..N, each uses only lower layer | THE OS | easy debug; slow, layers hard to define |
| Microkernel | only IPC, basic scheduling and memory in kernel; rest are user-space servers | Mach, QNX, MINIX | secure, extensible; message-passing overhead |
| Modular | loadable kernel modules | Linux, Solaris | flexible and efficient |
| Hybrid | microkernel + monolithic parts | Windows NT, macOS | compromise |
| Virtual machine | hypervisor gives each guest OS a virtual copy of hardware | VMware, VirtualBox, KVM | isolation; Type 1 = bare metal, Type 2 = hosted |

### 10.3 Security in more detail
- **Four levels of security:** physical, human (social engineering), operating system, network.
- **Threat types:** breach of confidentiality (stealing data), breach of integrity (modifying), breach of availability (destroying / DoS), theft of service, **masquerading**, **replay**, **man-in-the-middle**.
- **Authentication factors:** something you **know** (password), **have** (token, smart card), **are** (biometric). Passwords are stored as **salted hashes**; one-time passwords and 2FA reduce risk.
- **Encryption:** symmetric (DES, AES; one shared key, fast) vs asymmetric (RSA; public/private pair, used for key exchange and digital signatures).
- **Defences:** firewall, **IDS/IPS**, antivirus, patching, least privilege, **audit/logging**, **sandboxing**, address-space layout randomisation against buffer overflow.
- **Trusted-system ideas:** TCB (Trusted Computing Base) = all hardware/software that enforce security policy; Orange Book classes D (minimal) to A (verified).

### 10.4 Recovery
- **File-system recovery:** **consistency checking** (fsck on Unix, chkdsk on Windows) compares directory structure with block bitmap/inode counts after a crash and repairs; **journaling / log-structured** file systems write intended changes to a log first, so recovery just replays or discards the log (fast).
- **Backup types:** **full** (all files), **incremental** (changed since the LAST backup of any kind; small, slow restore needs full + all incrementals), **differential** (changed since last FULL backup; restore needs full + latest differential). **Snapshots** and RAID mirroring add redundancy but RAID is not a backup.
- **Process/transaction recovery:** **checkpoint** = saved consistent state to restart from; **rollback** undoes work; deadlock recovery = process termination (all, or one at a time) or resource preemption with rollback and starvation control.
- **Boot and crash recovery:** bootstrap loader in ROM loads boot block, then the kernel; **safe mode / recovery partition** repair a damaged OS.

**⚡ Exam tip:** Microkernel = minimal kernel + user-space services (Mach, QNX); Linux = monolithic with loadable modules; Windows NT/macOS = hybrid. fsck/journaling = file-system recovery; incremental backup = since last backup, differential = since last full. Dual-mode: mode bit 0 = kernel.

---

## Quick Revision Sheet

1. OS = interface between user and hardware + resource manager; kernel = core in privileged mode; shell = command interpreter.
2. Types: batch, multiprogramming (CPU utilisation), time-sharing (response time), distributed, real-time (hard/soft), multiprocessor (SMP).
3. System call = user program's request to kernel via trap; switches **user → kernel mode** (mode bit 0 = kernel). `fork()` returns 0 to child.
4. Process states: New → Ready → Running → Waiting → Terminated; **Waiting → Ready** on I/O completion; dispatcher gives CPU to the process chosen by the short-term scheduler.
5. PCB = PID, state, PC, registers, scheduling, memory and I/O info; context switch = save/restore PCB (pure overhead).
6. Threads share code, data, files, heap; own stack, PC, registers. User-level thread blocking blocks whole process. Fastest IPC = shared memory.
7. TAT = CT − AT; WT = TAT − BT. SJF/SRTF → minimum avg WT; FCFS → convoy effect; RR large q = FCFS; priority → starvation, fixed by aging; MLFQ allows movement between queues.
8. Critical section needs mutual exclusion, progress, bounded waiting; Peterson = 2 processes (flag[], turn).
9. Semaphore: wait/P decrements, signal/V increments; binary (mutex) vs counting. Producer–consumer: mutex = 1, empty = N, full = 0.
10. Monitor: only one process active inside at a time; uses condition variables (wait/signal).
11. Deadlock conditions: mutual exclusion, hold & wait, no preemption, circular wait. Prevention removes one; avoidance = Banker's; Unix ignores it (Ostrich).
12. Single-instance RAG: cycle ⇒ deadlock; multi-instance: cycle ⇒ maybe. Need = Max − Allocation; safe state ⇒ no deadlock.
13. Fragmentation: internal (paging, fixed partitions) vs external (segmentation, variable partitions); compaction cures external.
14. Paging: p bits = log₂(logical space / page size); d bits = log₂(page size); page table maps page → frame; PTE has valid, dirty, reference bits.
15. EAT with TLB = α(t + m) + (1−α)(t + 2m); e.g. 80%, 20 ns, 100 ns → 140 ns.
16. Segmentation: (segment, offset), base + limit check; user's view; external fragmentation.
17. Virtual memory via demand paging; page fault = trap to OS, instruction restarted; EAT = (1−p)m + p·fault-time.
18. Page replacement on the standard string (3 frames): OPT 9 < LRU 12 < FIFO 15 faults; Belady's anomaly only in FIFO (1 2 3 4 1 2 5 1 2 3 4 5: 9 → 10).
19. Thrashing = more paging than executing; cure: reduce multiprogramming / working-set model.
20. File allocation: contiguous (fast, ext. fragmentation), linked (no direct access), indexed (direct, index block), FAT = linked with table. Inode = attributes + pointers, no file name; 12 direct + single/double/triple indirect.
21. Free-space: bit vector, linked list, grouping, counting. Directory: single-level, two-level, tree, acyclic graph, general graph.
22. Disk access time = seek + rotational latency + transfer; scheduling queue 98,183,37,122,14,124,65,67 head 53 → FCFS 640, SSTF 236, SCAN 236, LOOK 299.
23. I/O: polling < interrupt-driven < DMA (for bulk); I/O subsystem does scheduling, buffering, caching, spooling, error handling.
24. Unix: created by Thompson and Ritchie (1969, Bell Labs, C); Linux by Torvalds (1991); `chmod 755`, `ls`, `ps`, `grep`, `kill`, pipe `|`, `>` redirect.
25. Protection = controlling access to resources (access matrix, ACL, capability list); security = defence vs external threats (virus, worm, Trojan, DoS); least privilege.
26. OS services: program execution, I/O, file manipulation, communication, error detection, resource allocation, accounting, protection; dual mode (kernel = 0).
27. Structures: monolithic, layered (THE), microkernel (Mach, QNX), modular (Linux), hybrid (Windows NT, macOS); hypervisor Type 1 bare metal, Type 2 hosted.
28. Authentication = know/have/are; salted hash passwords; recovery = fsck/chkdsk, journaling, checkpoint/rollback; incremental = since last backup, differential = since last full.
