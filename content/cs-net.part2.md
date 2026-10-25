## 4. Data Link Layer: Framing, Error Control, Flow Control

### 4.1 Functions
Framing, physical (MAC) addressing, error detection/correction, flow control, access control. Unit = **frame**. Provides **node-to-node (hop-to-hop)** delivery.

### 4.2 Framing methods
- **Character (byte) count**: first field gives frame length. Fragile - one corrupted count desynchronises.
- **Flag bytes with byte stuffing**: FLAG byte marks boundaries; if FLAG or ESC appears in data, an ESC byte is inserted before it.
- **Flag bits with bit stuffing** (HDLC): flag = `01111110`. Sender inserts a **0 after every five consecutive 1s** in data; receiver removes it.
  - Example: data `0111110111111` → stuffed `011111001111101` (two zeros inserted, 13 → 15 bits).
- **Physical-layer coding violations**.

### 4.3 Error detection
Error types: **single-bit**, **burst error** (two or more bits, length measured from first to last corrupted bit).

**Parity check (VRC)**: add 1 bit so the count of 1s is even (even parity) or odd (odd parity). Detects all odd-number-of-bit errors; misses even-number errors. Example: data 1011001 has four 1s, so even parity bit = 0 → 10110010; data 1011101 has five 1s → even parity bit = 1. **2-D parity (LRC+VRC)** detects more, corrects single-bit errors.

**Checksum (Internet checksum)**: split data into equal words, add them using one's-complement (wrap carry round), complement the sum.
- Example (8-bit words): 10011001, 11100010, 00100100, 10000100.
  153 + 226 = 379 → 379 − 256 + 1 = 124; +36 = 160; +132 = 292 → 36 + 1 = **37 = 00100101**. Checksum = complement = **11011010**.
  Receiver adds all words incl. checksum: 37 + 218 = 255 = 11111111 → complement = 0 → accepted.
- Used in IP (header), TCP, UDP, ICMP (16-bit, one's complement).

**CRC (Cyclic Redundancy Check)**: sender appends (n−1) zeros to data (n = number of bits in generator), divides by generator using **modulo-2 (XOR) division**; the remainder is the CRC appended to data. Receiver divides the received codeword; remainder 0 → no error detected.
- Generator as polynomial: x³ + x + 1 → 1011 (degree 3 → append 3 zeros, CRC is 3 bits).

**Worked example (CRC):** data = 1001, generator = 1011.
```
Append 3 zeros: 1001000
1001000
1011        XOR  -> 0010 then bring down: 0010000
  1011      XOR aligned at leading 1 -> 0000110
Remainder = 110
Transmit: 1001110
Check: 1001110 / 1011 -> remainder 000 (accepted)
```
- CRC detects all single-bit, all double-bit errors (for suitable generator), all odd-number errors (if generator has factor x+1), all burst errors of length ≤ degree (r), most longer bursts. Standard polynomials: CRC-32 (Ethernet), CRC-16, CRC-CCITT.
- Detection power: CRC > checksum > parity.

**Hamming distance**: number of bit positions in which two codewords differ. Minimum distance d_min: detects up to **d_min − 1** errors; corrects up to **⌊(d_min − 1)/2⌋** errors. Example: d_min = 3 detects 2, corrects 1.

### 4.4 Error correction: Hamming code
For m data bits and r check (redundancy) bits: **2^r ≥ m + r + 1**. m = 4 → r = 3 (7,4 code); m = 7 → r = 4 (11,7); m = 11 → r = 4 (15,11); m = 8 → r = 4. Check bits sit at positions that are powers of 2 (1, 2, 4, 8...). Parity bit p at position 2^k covers all positions whose binary representation has bit k set.

```
Position:  1   2   3   4   5   6   7
Role:      p1  p2  d3  p4  d5  d6  d7
p1 covers 1,3,5,7   p2 covers 2,3,6,7   p4 covers 4,5,6,7
```
**Worked example (even parity):** data bits d3 d5 d6 d7 = 1 0 1 1.
- p1 = parity(d3,d5,d7) = parity(1,0,1) → 2 ones → p1 = 0
- p2 = parity(d3,d6,d7) = parity(1,1,1) → 3 ones → p2 = 1
- p4 = parity(d5,d6,d7) = parity(0,1,1) → 2 ones → p4 = 0
- Codeword (positions 1-7) = **0 1 1 0 0 1 1**.

**Error detection:** suppose bit 5 flips → 0110111. Recompute: p1 group (1,3,5,7) = 0,1,1,1 → odd → c1 = 1; p2 group (2,3,6,7) = 1,1,1,1 → even → c2 = 0; p4 group (4,5,6,7) = 0,1,1,1 → odd → c4 = 1. Syndrome c4c2c1 = **101 = 5** → bit 5 is wrong; flip it. Syndrome 000 = no error.

Corrects **single-bit** errors only (d_min = 3). Adding an overall parity bit gives SEC-DED (d_min = 4).

### 4.5 Flow control and ARQ (sliding window)
Flow control stops a fast sender from overwhelming a slow receiver. **ARQ** = Automatic Repeat reQuest (ack + timeout + retransmit).

Let **Tt** = transmission time of a frame = L/B, **Tp** = propagation delay, **a = Tp/Tt**.

| Protocol | Sender window | Receiver window | Efficiency |
|---|---|---|---|
| Stop-and-Wait | 1 | 1 | **1 / (1 + 2a)** |
| Go-Back-N (GBN) | N ≤ 2^k − 1 | 1 (accepts in order only; discards others) | **N / (1 + 2a)** (max 1) |
| Selective Repeat (SR) | N ≤ 2^(k−1) | N (buffers out-of-order frames) | **N / (1 + 2a)** (max 1) |

(k = number of bits in the sequence-number field.)

- **Sequence numbers needed:** GBN: N + 1; SR: 2N (sender window + receiver window).
- Utilisation: U = useful transmission time / cycle time; cycle for S&W = Tt + 2Tp (ack time ignored). **Throughput = efficiency × bandwidth.**
- **Optimal (maximum useful) window** = 1 + 2a = (Tt + 2Tp)/Tt.
- **GBN retransmission:** on error/timeout, resend the damaged frame and all following ones; uses cumulative ACKs. **SR:** retransmit only the lost frame; uses individual ACKs and NAK; receiver needs buffers (more complex). Piggybacking = ack carried on data frame going the other way.

**Worked example (S&W):** link 1 Mbps, frame 1000 bits → Tt = 1 ms; one-way propagation Tp = 4 ms → a = 4. Efficiency = 1/(1 + 8) = 1/9 ≈ **11.1%**; throughput ≈ 111 kbps. For a GBN/SR window to fill the pipe: 1 + 2a = **9** frames. Sequence-number bits: GBN needs N + 1 = 10 numbers → 4 bits (2⁴ = 16); SR needs 2N = 18 → 5 bits.

**Worked example (window limit):** k = 3 bits → GBN max window = 7; SR max window = 4.

**⚡ Exam tip:** Efficiency S&W = 1/(1+2a). GBN window ≤ 2^k − 1, SR window ≤ 2^(k−1). Hamming: 2^r ≥ m + r + 1, check bits at powers of 2. CRC remainder has (generator bits − 1) bits; parity cannot detect even-number bit errors.

---

## 5. MAC Sublayer, Ethernet, Wi-Fi and Network Devices

### 5.1 Medium access control
**Static (channel partitioning):** FDMA, TDMA, CDMA. **Dynamic:** random access (contention) and controlled access (token/polling/reservation).

**ALOHA (contention-based, random access)**

| | Pure ALOHA | Slotted ALOHA |
|---|---|---|
| Transmission | Any time | Only at start of slot (needs synchronised clocks) |
| Vulnerable time | **2 × Tfr** | **Tfr** |
| Throughput S | G·e^(−2G) | G·e^(−G) |
| Max efficiency | **18.4% (1/2e) at G = 0.5** | **36.8% (1/e) at G = 1** |

G = average frames offered per frame-time. Slotted doubles pure ALOHA's efficiency.

**CSMA** (Carrier Sense Multiple Access): "listen before talk". Persistence methods: **1-persistent** (send immediately when idle; Ethernet), **non-persistent** (wait random time if busy), **p-persistent** (send with probability p when idle; slotted channels).

**CSMA/CD (Collision Detection)** - wired Ethernet, half-duplex:
1. Sense the channel; if idle, transmit. 2. While sending, keep listening. 3. On collision, send a **jam signal** (48 bits), stop. 4. Wait a random time by **binary exponential backoff**: after the n-th collision pick K from 0 … 2ⁿ − 1 (n capped at 10), wait K × slot time; give up after 16 attempts.
- **Minimum frame length rule**: Tt ≥ 2 × Tp, i.e. min frame size = **2 × Tp × Bandwidth**. Ethernet 10 Mbps: slot = 51.2 µs → 512 bits = **64 bytes**.
- Example: B = 10 Mbps, Tp = 25.6 µs → min frame = 2 × 25.6×10⁻⁶ × 10⁷ = **512 bits (64 B)**. If the cable gets longer, either min frame size must grow or speed must fall.
- CSMA/CD is not used in full-duplex switched Ethernet (no collisions).

**CSMA/CA (Collision Avoidance)** - Wi-Fi 802.11 (collisions can't be detected on radio): wait **IFS**, random backoff, use **ACK** for every frame, optional **RTS/CTS** handshake to solve the **hidden node problem** (two stations out of range of each other but both in range of the AP). NAV (Network Allocation Vector) = virtual carrier sense.

**Controlled access**
- **Token passing (Token Ring IEEE 802.5; Token Bus 802.4)**: a small token frame circulates; only the holder transmits. No collisions, deterministic delay; token loss/monitor station needed.
- **Polling** (primary polls secondaries), **Reservation**.

**Contention-based MAC protocols** = ALOHA, CSMA, CSMA/CD, CSMA/CA (collisions possible). **Contention-free** = token passing, polling, TDMA, reservation.

### 5.2 IEEE 802 standards

| Standard | Technology |
|---|---|
| 802.3 | Ethernet (CSMA/CD) |
| 802.5 | Token Ring |
| 802.4 | Token Bus |
| 802.11 | Wi-Fi (WLAN, CSMA/CA) |
| 802.15.1 | Bluetooth (WPAN) |
| 802.15.4 | Zigbee / low-rate WPAN |
| 802.16 | WiMAX (wireless MAN) |
| 802.1Q | VLAN tagging |
| 802.2 | LLC |

### 5.3 Ethernet
- **MAC address**: 48 bits (6 bytes), written as 12 hex digits `AA:BB:CC:DD:EE:FF`; first 24 bits = OUI (manufacturer), last 24 bits = NIC serial. Broadcast MAC = FF:FF:FF:FF:FF:FF.
- **Ethernet (DIX/802.3) frame:**

```
| Preamble 7B | SFD 1B | Dest MAC 6B | Src MAC 6B | Type/Length 2B | Data 46-1500 B | FCS(CRC-32) 4B |
```
- Header+trailer (without preamble/SFD) = 6+6+2+4 = **18 bytes**. **Min frame = 64 bytes** (46 data + 18), **max frame = 1518 bytes** (1500 + 18). **MTU = 1500 bytes**. Data padded to 46 B if shorter.
- Speeds/standards: 10Base-T (10 Mbps, UTP, 100 m), Fast Ethernet 100Base-TX (100 Mbps), Gigabit 1000Base-T (1 Gbps), 10Base2 (thin coax 185 m), 10Base5 (thick coax 500 m), 100Base-FX (fibre).

### 5.4 Wi-Fi (IEEE 802.11)

| Standard | Band | Max rate | Marketing name |
|---|---|---|---|
| 802.11b | 2.4 GHz | 11 Mbps | Wi-Fi 1 |
| 802.11a | 5 GHz | 54 Mbps | Wi-Fi 2 |
| 802.11g | 2.4 GHz | 54 Mbps | Wi-Fi 3 |
| 802.11n | 2.4 and 5 GHz | up to 600 Mbps (MIMO) | Wi-Fi 4 |
| 802.11ac | 5 GHz | ≥ 1 Gbps (multi-Gbps) | Wi-Fi 5 |
| 802.11ax | 2.4/5/6 GHz | ~9.6 Gbps | Wi-Fi 6/6E |

- Components: **Access Point (AP)**, station, **SSID** (network name), BSS (one AP) / ESS (several APs). Infrastructure vs ad hoc mode.
- Security: WEP (weak, obsolete) → WPA → **WPA2 (AES-CCMP)** → WPA3. Non-overlapping 2.4 GHz channels: 1, 6, 11.

### 5.5 Network devices

| Device | Layer | Function | Domains |
|---|---|---|---|
| **Repeater** | 1 | Regenerates/amplifies signal to extend distance | Same collision domain |
| **Hub** | 1 | Multi-port repeater, broadcasts to all ports; half-duplex | One collision + one broadcast domain |
| **Bridge** | 2 | Connects two LAN segments, filters by MAC (learns table); software, 2 ports | Splits collision domains |
| **Switch** | 2 | Multi-port bridge, forwards frame only to the destination port using MAC address table; full-duplex | Each port its own collision domain; one broadcast domain (unless VLANs) |
| **Router** | 3 | Forwards packets between different networks using IP and routing table; connects LAN to WAN | Each port its own broadcast domain |
| **Gateway** | up to 7 | Connects networks using different protocols/architectures, protocol conversion | - |
| **Modem** | 1 | Modulates/demodulates digital to analog | - |
| **Access point** | 2 | Wireless clients to wired LAN | - |
| NIC | 1-2 | Network card with MAC address | - |

- **Switch learning**: reads source MAC of incoming frame, records in CAM table; if destination unknown → floods; known → forwards to one port. **VLAN** splits one switch into several broadcast domains.
- Layer-3 switch = switch with routing.
- Number of collision domains in a switch with n ports = n; hub = 1.

**⚡ Exam tip:** Slotted ALOHA 36.8% vs pure 18.4%; Ethernet min frame 64 B, max 1518 B, payload 46-1500; MAC = 48 bits; CSMA/CD wired, CSMA/CA wireless. Gateway connects dissimilar networks, router connects networks (IP), switch uses MAC, hub broadcasts.

