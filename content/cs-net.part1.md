# Computer Networks

> **What the exam asks:** about 3-6 questions per paper, mostly one-liners: expanded forms (TCP, ARP, DNS), which protocol sends or retrieves e-mail (SMTP / POP3 / IMAP), IPv6 address length (128 bits), maximum IPv4 datagram size (65,535 bytes), contention-based MAC (CSMA, ALOHA), which device connects dissimilar networks (gateway/router), secure remote login (SSH), what subnetting does, "which is NOT a topology", and Zigbee, Bluetooth and Modbus TCP trivia. Occasional numeric items: subnet masks, host counts, Hamming/CRC, Shannon/Nyquist, window sizes. Master the tables and port numbers first.

---

## 1. Network Basics, Types and Topologies

### 1.1 Definitions
- **Computer network**: interconnected autonomous computers/devices sharing resources and data over a transmission medium.
- **Node/host**: any device on the network. **Protocol**: set of rules for communication (syntax, semantics, timing).
- **Bandwidth**: capacity of a link (Hz for analog, bps for digital). **Throughput**: actual data rate achieved. **Latency**: time for data to travel source to destination.
- **Transmission modes**:

| Mode | Direction | Example |
|---|---|---|
| Simplex | One way only | Keyboard, TV broadcast, radio |
| Half-duplex | Both ways, one at a time | Walkie-talkie, hub-based Ethernet |
| Full-duplex | Both ways simultaneously | Telephone, switched Ethernet |

- **Unicast** (one to one), **multicast** (one to selected group), **broadcast** (one to all).
- **Client-server** (dedicated servers, centralised) vs **peer-to-peer** (every node is both client and server, no central server).

### 1.2 Types of networks by area

| Type | Full form | Range | Notes |
|---|---|---|---|
| PAN | Personal Area Network | ~1-10 m | Bluetooth, USB, Zigbee |
| LAN | Local Area Network | up to a few km (building/campus) | Ethernet, Wi-Fi; high speed, privately owned |
| MAN | Metropolitan Area Network | ~city (5-50 km) | Cable TV network, IEEE 802.6 (DQDB) |
| WAN | Wide Area Network | country/world | Internet is the largest WAN; uses routers, leased lines, satellites |

- **Intranet**: private network using Internet technology within an organisation. **Extranet**: intranet extended to selected outsiders (partners). **Internet**: global network of networks (TCP/IP).
- **VPN**: encrypted tunnel over public network. **SAN**: Storage Area Network.

### 1.3 Topologies
**Topology** = physical or logical layout of nodes and links.

| Topology | Description | Pros | Cons |
|---|---|---|---|
| Bus | All nodes on one backbone cable with terminators | Cheap, little cable | Single cable failure kills network; collisions; hard to troubleshoot |
| Star | All nodes connect to central hub/switch | Easy to add/remove nodes; one link failure affects one node only | Central device is single point of failure |
| Ring | Each node connected to exactly two neighbours; data circulates one way (token ring) | Orderly access, no collisions | One break breaks ring (unless dual ring) |
| Mesh | Every node linked to every other | Most reliable, no traffic problem | Costly; heavy cabling |
| Tree | Hierarchy of stars on a bus backbone | Scalable | Backbone failure splits network |
| Hybrid | Combination of two or more | Flexible | Complex |

- **Full mesh with n nodes**: links = n(n−1)/2; each node has n−1 ports. Example: 6 nodes → 15 links, 5 ports each.
- Ethernet 10Base-T is **physically star, logically bus**. Token Ring is physically star, logically ring.
- Most common LAN topology today: **star** (switch-centred).

**⚡ Exam tip:** "Which is NOT a topology?" - bus, star, ring, mesh, tree are topologies; "Zigbee router", "hybrid protocol", "cluster" style options are distractors. Full mesh link formula n(n−1)/2 is the favourite numeric.

---

## 2. Layered Models: OSI and TCP/IP

### 2.1 OSI model (7 layers, ISO)
Top to bottom: **A**ll **P**eople **S**eem **T**o **N**eed **D**ata **P**rocessing (Application, Presentation, Session, Transport, Network, Data link, Physical). Bottom-up: "Please Do Not Throw Sausage Pizza Away".

| # | Layer | Function | PDU | Examples |
|---|---|---|---|---|
| 7 | Application | User interface to network services | Data/message | HTTP, FTP, SMTP, DNS, Telnet |
| 6 | Presentation | Translation (encoding), encryption, compression | Data | SSL/TLS (conceptually), JPEG, ASCII |
| 5 | Session | Dialog control, authentication, synchronisation (checkpoints) | Data | NetBIOS, RPC, session sockets |
| 4 | Transport | End-to-end (process-to-process) delivery, segmentation, flow & error control, port addressing | Segment (TCP) / Datagram (UDP) | TCP, UDP |
| 3 | Network | Logical addressing (IP), routing, path selection | Packet | IP, ICMP, ARP*, OSPF |
| 2 | Data Link | Framing, physical (MAC) addressing, error detection, flow control, media access | Frame | Ethernet, PPP, HDLC, switches |
| 1 | Physical | Raw bit transmission, signals, voltages, cables, topology | Bit | Hub, repeater, cables, NIC |

*ARP is often placed between layers 2 and 3.

- **Layers 1-3** are network-support layers (hop-by-hop); **layer 4** is end-to-end; **layers 5-7** are user-support layers.
- Data link has two sublayers: **LLC** (Logical Link Control) and **MAC** (Medium Access Control).
- **Encapsulation**: each layer adds its header (data link also adds trailer with FCS) going down; reverse (decapsulation) going up.
- Addressing by layer: Application - names (URL); Transport - **port** (16 bit); Network - **IP address**; Data link - **MAC address** (48 bit); Physical - none.
- **Process-to-process** delivery: transport; **host-to-host**: network; **node-to-node** (hop-to-hop): data link.

### 2.2 TCP/IP model (4 layers; 5 in the hybrid teaching model)

| TCP/IP layer | OSI layers covered | Protocols | PDU |
|---|---|---|---|
| Application | 5, 6, 7 | HTTP, FTP, SMTP, DNS, DHCP, Telnet, SSH | Message |
| Transport | 4 | TCP, UDP, SCTP | Segment / Datagram |
| Internet | 3 | IP, ICMP, IGMP, ARP | Packet (datagram) |
| Network Access (Host-to-network/Link) | 1, 2 | Ethernet, Wi-Fi, PPP | Frame / bits |

### 2.3 OSI vs TCP/IP

| Point | OSI | TCP/IP |
|---|---|---|
| Layers | 7 | 4 |
| Origin | ISO, theoretical reference | DoD/ARPANET, practical, protocol-driven |
| Approach | Vertical, protocol-independent | Horizontal, protocols first |
| Session/Presentation | Separate layers | Merged into Application |
| Connection-oriented and connectionless | Both at network layer; only connection-oriented at transport (strict) | Network: connectionless (IP); Transport: both (TCP and UDP) |
| Usage | Reference | Used on the Internet |

**⚡ Exam tip:** PDU names: bits, frame, packet, segment, data. Router = layer 3, switch/bridge = layer 2, hub/repeater = layer 1, gateway = layers up to 7. TCP/IP "Internet layer" = OSI "Network layer".

---

## 3. Physical Layer: Media, Signals, Switching, Multiplexing

### 3.1 Transmission media
**Guided (wired)**

| Medium | Details |
|---|---|
| Twisted pair (UTP/STP) | Two insulated copper wires twisted to reduce crosstalk/EMI; RJ-45 connector; max segment 100 m. Cat5 100 Mbps, Cat5e 1 Gbps, Cat6 up to 10 Gbps (short). STP has shielding. Cheapest |
| Coaxial cable | Central copper core, insulator, braided shield, jacket; BNC connector; better shielding and bandwidth than UTP; 10Base2 (thinnet, 185 m), 10Base5 (thicknet, 500 m); cable TV |
| Optical fibre | Light pulses by total internal reflection; core + cladding; highest bandwidth, lowest attenuation, immune to EMI, secure; costly, fragile. **Single-mode** (thin core ~9 µm, laser, long distance) vs **multi-mode** (thicker core 50/62.5 µm, LED, short distance) |

**Unguided (wireless)**: radio waves (omnidirectional, pass through walls, e.g. AM/FM, Wi-Fi), microwave (line-of-sight, point-to-point, 1-300 GHz), infrared (short range, cannot pass walls, TV remote), satellite (GEO about 36,000 km, propagation delay ~250 ms one way up-down).

- Bandwidth/security ordering: fibre > coax > twisted pair. Fibre is least affected by noise.
- **Impairments**: attenuation (loss of strength, measured in dB), distortion, noise (thermal, crosstalk, impulse, induced).

### 3.2 Signals and formulas
- **Analog** signal: continuous; **digital**: discrete levels. Bandwidth of analog channel = f_high − f_low (Hz).
- **Baud rate** = signal elements per second; **bit rate** = bits per second = baud × bits per signal element.
- **Decibel**: dB = 10 log₁₀(P₂/P₁); SNR(dB) = 10 log₁₀(S/N). 30 dB → ratio 1000; 20 dB → 100; 10 dB → 10; 3 dB ≈ 2×.

```
Nyquist (noiseless channel):  Max bit rate = 2 × B × log₂(L)
      B = bandwidth in Hz, L = number of signal levels
Shannon (noisy channel):      C = B × log₂(1 + SNR)      (SNR as ratio, not dB)
```

**Worked example 1 (Nyquist):** B = 3000 Hz, L = 4 levels → 2 × 3000 × log₂4 = 2 × 3000 × 2 = **12,000 bps**. Binary signal (L=2) on 3 kHz → 6000 bps.

**Worked example 2 (Shannon):** B = 3000 Hz, SNR = 30 dB → ratio = 10^(30/10) = 1000. C = 3000 × log₂(1001) ≈ 3000 × 9.97 ≈ **29,900 bps (about 30 kbps)**. This is the theoretical ceiling for a telephone line.

Use both: actual limit = smaller of the two values.

**Delay components**
```
Transmission delay = L / R        (L = packet bits, R = link rate bps)
Propagation delay  = d / s        (d = distance, s ≈ 2×10⁸ m/s in cable, 3×10⁸ in air)
Total = transmission + propagation + queuing + processing
RTT = 2 × propagation (+ transmission/processing)
Bandwidth-delay product = bandwidth × RTT   (bits "in flight")
```
Example: 1000-byte packet on 8 Mbps link: L/R = 8000/8×10⁶ = 1 ms.

### 3.3 Switching techniques

| Feature | Circuit switching | Packet switching | Message switching |
|---|---|---|---|
| Path | Dedicated end-to-end path set up before data | No dedicated path | No dedicated path |
| Unit | Continuous stream | Small fixed-size packets | Whole message |
| Store and forward | No (after setup) | Yes | Yes |
| Phases | Setup, transfer, teardown | Datagram: none; Virtual circuit: setup | None |
| Delay | Setup delay, then constant | Variable (queuing) | Highest, big buffers |
| Efficiency | Poor (idle capacity wasted) | Good (shared links) | Moderate |
| Order | In order | Datagram: may arrive out of order; VC: in order | Whole |
| Example | Old telephone (PSTN) | Internet (IP) | Telegram, e-mail relay (concept) |

- **Datagram** packet switching: each packet routed independently (connectionless, IP). **Virtual circuit**: a fixed route chosen at setup, packets carry a short VC identifier (ATM, Frame Relay, MPLS).
- **Packet-switching time** (no propagation): message M bits split into packets of P bits over h links of rate R: T = (M/P + h − 1) × (P/R). Example: M=4000, P=1000, h=3, R=1000 bps → (4+2) × 1 s = **6 s**.

### 3.4 Multiplexing
Combining several signals on one link.

| Technique | Domain | Notes |
|---|---|---|
| **FDM** (Frequency Division) | Analog; each channel gets its own frequency band | Guard bands prevent overlap; radio/TV, cable |
| **TDM** (Time Division) | Digital; each channel gets time slots | **Synchronous TDM** wastes empty slots; **Statistical (asynchronous) TDM** assigns slots on demand with address info |
| **WDM** (Wavelength Division) | Optical fibre; different light colours (wavelengths) | Optical equivalent of FDM; **DWDM** = dense, many channels |
| **CDM/CDMA** | Spread spectrum codes | Used in 3G |

- Demultiplexer at receiving end splits stream. **Multiplexer** = many-to-one, **demultiplexer** = one-to-many.
- TDM example: 4 sources of 1 kbps each, synchronous TDM, one bit per slot → link rate 4 kbps; frame = 4 slots.

**⚡ Exam tip:** Nyquist is for noiseless channels (uses levels), Shannon for noisy channels (uses SNR; convert dB first: ratio = 10^(dB/10)). WDM = fibre, FDM = analog, TDM = digital. Circuit switching has dedicated path; packet switching is the Internet's basis.

