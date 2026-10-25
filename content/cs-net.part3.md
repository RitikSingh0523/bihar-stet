## 6. Network Layer: IPv4, Subnetting, IPv6 and Helper Protocols

### 6.1 IPv4 basics
- **IPv4 address**: 32 bits, written in dotted decimal (4 octets, each 0-255); total 2³² ≈ 4.29 billion addresses. Hierarchical: NetID + HostID.
- **IPv4 header**: 20 bytes minimum (no options) to 60 bytes maximum (IHL is 4 bits, units of 4 bytes; max 15 × 4 = 60). Fields: Version(4), IHL, ToS, Total length (16 bits), Identification, Flags (DF, MF), Fragment offset (13 bits, units of 8 bytes), **TTL**, Protocol (6 = TCP, 17 = UDP, 1 = ICMP), Header checksum, Source IP, Destination IP.
- **Maximum IPv4 datagram = 65,535 bytes** (16-bit total length field). **MTU**: Ethernet 1500 B. Fragmentation splits larger datagrams; reassembly only at destination.
- TTL decremented by each router; at 0 the packet is discarded and ICMP "time exceeded" is sent (loop prevention, used by traceroute).
- IP is **connectionless, unreliable, best effort**.

### 6.2 Classful addressing

| Class | First octet | First bits | Default mask | Prefix | Networks | Hosts/network | Use |
|---|---|---|---|---|---|---|---|
| A | 1 - 126 | 0 | 255.0.0.0 | /8 | 2⁷ − 2 = 126 | 2²⁴ − 2 = 16,777,214 | Very large |
| B | 128 - 191 | 10 | 255.255.0.0 | /16 | 2¹⁴ = 16,384 | 2¹⁶ − 2 = 65,534 | Medium |
| C | 192 - 223 | 110 | 255.255.255.0 | /24 | 2²¹ = 2,097,152 | 2⁸ − 2 = 254 | Small |
| D | 224 - 239 | 1110 | - | - | - | - | Multicast |
| E | 240 - 255 | 1111 | - | - | - | - | Reserved/experimental |

- Hosts per subnet = 2^h − 2 (network address and broadcast address excluded). Valid first octet range 1-126 (A) because 0 and 127 are special.
- To find class: look at the first octet only (e.g. 172.16.5.4 → B; 200.1.1.1 → C).

### 6.3 Special and private addresses

| Address | Meaning |
|---|---|
| 127.0.0.0/8 (e.g. 127.0.0.1) | **Loopback** / localhost |
| 0.0.0.0 | This host / default route / unspecified |
| 255.255.255.255 | Limited broadcast (own network) |
| Host bits all 0 | **Network address** (e.g. 192.168.1.0) |
| Host bits all 1 | **Directed broadcast** (e.g. 192.168.1.255) |
| 169.254.0.0/16 | **APIPA** (link-local, when DHCP fails) |
| 10.0.0.0/8 | Private, Class A |
| 172.16.0.0 - 172.31.255.255 (/12) | Private, Class B (16 networks) |
| 192.168.0.0/16 | Private, Class C (256 networks) |
| 224.0.0.0 - 239.255.255.255 | Multicast (224.0.0.5/6 = OSPF) |

Private addresses are not routable on the public Internet; NAT is needed.

### 6.4 Subnetting and CIDR
- **Subnet mask**: 1s for network+subnet bits, 0s for host bits. **Subnetting** divides one network into smaller subnets (borrow host bits): reduces broadcast traffic, improves security, uses addresses efficiently, easier management.
- **CIDR** (Classless Inter-Domain Routing): address written as a.b.c.d/n (n = prefix length), ignoring classes; allows **route aggregation (supernetting)**. 
- Mask values per octet: 128, 192, 224, 240, 248, 252, 254, 255 (1, 2, 3, 4, 5, 6, 7, 8 ones). **Block size** = 256 − mask octet value.
- Subnets created = 2^s (s = bits borrowed); hosts per subnet = 2^h − 2 (h = remaining host bits).

| Prefix | Mask | Block | Hosts |
|---|---|---|---|
| /24 | 255.255.255.0 | 256 | 254 |
| /25 | 255.255.255.128 | 128 | 126 |
| /26 | 255.255.255.192 | 64 | 62 |
| /27 | 255.255.255.224 | 32 | 30 |
| /28 | 255.255.255.240 | 16 | 14 |
| /29 | 255.255.255.248 | 8 | 6 |
| /30 | 255.255.255.252 | 4 | 2 |
| /16 | 255.255.0.0 | - | 65,534 |
| /20 | 255.255.240.0 | 16 (third octet) | 4094 |

**Worked example 1:** split 192.168.10.0/24 into 4 equal subnets. Borrow 2 bits → /26, mask 255.255.255.192, 62 hosts each.
```
Subnet  Network          Usable range            Broadcast
 1      192.168.10.0     .1   - .62              192.168.10.63
 2      192.168.10.64    .65  - .126             192.168.10.127
 3      192.168.10.128   .129 - .190             192.168.10.191
 4      192.168.10.192   .193 - .254             192.168.10.255
```
**Worked example 2 (find network of a host):** 172.16.45.200/20. Mask 255.255.240.0 → block 16 in third octet. 45 ÷ 16 → 2 × 16 = 32. Network = **172.16.32.0**; broadcast = 172.16.47.255; usable 172.16.32.1 - 172.16.47.254; hosts = 2¹² − 2 = **4094**. (Equivalent: AND the address with the mask.)

**Worked example 3 (VLSM):** 192.168.1.0/24, need subnets of 100, 50, 20 and 2 hosts. **Allocate largest first**:
- 100 hosts → /25 (126) → 192.168.1.0/25 (range .0-.127)
- 50 hosts → /26 (62) → 192.168.1.128/26 (.128-.191)
- 20 hosts → /27 (30) → 192.168.1.192/27 (.192-.223)
- 2 hosts (router link) → /30 (2) → 192.168.1.224/30 (.224-.227)

**VLSM** (Variable Length Subnet Mask) = different mask lengths inside one network, wasting fewer addresses. Needed bits: smallest h with 2^h − 2 ≥ hosts.

Shortcut: "/n" with n−24 bits borrowed: /26 → 4 subnets, /27 → 8, /28 → 16, /29 → 32, /30 → 64.

**Aggregation example:** 192.168.0.0/24 + 192.168.1.0/24 → 192.168.0.0/23 (adjacent, aligned).

### 6.5 IPv6
- **128-bit** address (2¹²⁸ addresses), written as **8 groups of 4 hexadecimal digits** separated by colons: `2001:0db8:0000:0000:0000:ff00:0042:8329`.
- **Compression**: leading zeros in a group may be dropped; one run of consecutive all-zero groups replaced by `::` (once only): `2001:db8::ff00:42:8329`. Loopback = `::1`; unspecified = `::`.
- Header **fixed 40 bytes**, no header checksum, no fragmentation by routers (source only), options via extension headers; Hop Limit replaces TTL; Flow Label field.
- Address types: **unicast, multicast (FF00::/8), anycast**. **No broadcast** in IPv6. Link-local FE80::/10. Unique local FC00::/7.
- Autoconfiguration (SLAAC), built-in IPsec support, NDP (Neighbor Discovery) replaces ARP. Transition: dual stack, tunnelling, translation.
- IPv4 → IPv6 comparison: 32 vs 128 bits; 20-60 vs 40-byte header; broadcast vs none; DHCP/manual vs auto + DHCPv6; checksum present vs absent.

### 6.6 Helper protocols

| Protocol | Role |
|---|---|
| **ARP** (Address Resolution Protocol) | Maps **IP address → MAC address**. Broadcast "who has IP x?", the owner replies unicast; result stored in ARP cache. Works on a LAN only |
| **RARP** (Reverse ARP) | MAC → IP (obsolete; replaced by BOOTP/DHCP) |
| **ICMP** (Internet Control Message Protocol) | Error reporting and diagnostics for IP (no data transfer): echo request/reply (**ping**), destination unreachable, time exceeded (**traceroute**), redirect, source quench. Carried inside IP (protocol number 1) |
| **IGMP** | Multicast group membership management |
| **DHCP** (Dynamic Host Configuration Protocol) | Automatically assigns IP, subnet mask, gateway, DNS. Uses UDP ports **67 (server)/68 (client)**. Process **DORA**: Discover → Offer → Request → Acknowledge. Leases addresses for a time |
| **NAT** (Network Address Translation) | Translates private IPs to a public IP at the router; saves IPv4 addresses and hides internal hosts. Types: static, dynamic, **PAT/NAT overload** (many hosts share one public IP using port numbers) |

**⚡ Exam tip:** IPv6 = 128 bits (8 hex groups), IPv4 = 32 bits; max IPv4 datagram = 65,535 B; ARP = IP→MAC; 127.x.x.x loopback; subnetting divides a network into smaller subnetworks (efficient use, less broadcast traffic). Usable hosts = 2^h − 2.

---

## 7. Routing

- **Routing** = choosing the best path for packets between networks (network layer). **Forwarding** = moving packet to the output port per routing table. **Default route** 0.0.0.0/0 (gateway of last resort).
- **Static** (manual, simple, no overhead, no adaptation) vs **dynamic** (adaptive, protocol-driven).
- **Autonomous System (AS)**: a group of networks under one administration. **IGP** (inside AS: RIP, OSPF, EIGRP) vs **EGP** (between ASes: BGP).

### 7.1 Distance Vector (Bellman-Ford) vs Link State (Dijkstra)

| Point | Distance Vector | Link State |
|---|---|---|
| Algorithm | Bellman-Ford | Dijkstra (shortest path first) |
| Information shared | Own routing table (distances) | Link state of own links (LSA/LSP) |
| Shared with | Only direct neighbours | **All routers** (flooding) |
| Knowledge | Rumour-based ("routing by rumour") | Complete topology map |
| Convergence | Slow; count-to-infinity problem | Fast |
| Overhead | Periodic updates, low CPU | More memory/CPU, more flooding |
| Protocols | RIP, IGRP | OSPF, IS-IS |

- **Bellman-Ford equation**: d_x(y) = min over neighbours v { c(x,v) + d_v(y) }.
- **Count-to-infinity**: bad news travels slowly. Fixes: **split horizon**, **poison reverse**, hold-down timers, triggered updates, defining a maximum (infinity = 16 in RIP).

### 7.2 Routing protocols

| Protocol | Type | Metric | Key facts |
|---|---|---|---|
| **RIP** | Distance vector, IGP | Hop count; **max 15**, 16 = unreachable | Updates every **30 s**, runs over **UDP port 520**; RIPv2 supports CIDR/multicast 224.0.0.9 |
| **OSPF** | Link state, IGP | Cost (based on bandwidth) | Uses Dijkstra; area-based hierarchy (backbone Area 0); runs directly over IP (**protocol 89**); hello packets; multicast 224.0.0.5/6; fast convergence, supports VLSM |
| **BGP** | **Path vector**, EGP | Path attributes/policy (AS path) | Runs on **TCP port 179**; routing between ASes - the Internet's inter-domain protocol; BGP version 4 supports CIDR |

**Worked example (Distance Vector update):** router A has neighbours B (cost 2) and C (cost 5). B advertises distance to D = 4; C advertises distance to D = 1. A's cost via B = 2 + 4 = 6; via C = 5 + 1 = 6 → A picks either (tie), cost to D = 6. If C's advertisement dropped to 0 via a shortcut, the min would change accordingly.

**Worked example (Dijkstra idea):** from source S, repeatedly pick the unvisited node with least tentative distance, then relax its neighbours' distances: d(v) = min(d(v), d(u) + w(u,v)). Complexity O(V²) (array) or O(E log V) (heap).

**⚡ Exam tip:** RIP: hop count, max 15, 30 s updates. OSPF = link state (Dijkstra). BGP = path vector, between ASes, TCP 179. Distance vector suffers from count-to-infinity (fix: split horizon).

---

## 8. Transport Layer: TCP, UDP, Congestion Control

### 8.1 Role
End-to-end (process-to-process) communication using **port numbers** (16 bits, 0-65535); a **socket** = IP address + port. Segmentation, multiplexing/demultiplexing, flow control, error control, congestion control (TCP).

**Port ranges:** 0-1023 well-known (system), 1024-49151 registered, 49152-65535 dynamic/ephemeral.

### 8.2 TCP vs UDP

| Feature | TCP | UDP |
|---|---|---|
| Full form | Transmission Control Protocol | User Datagram Protocol |
| Connection | Connection-oriented (handshake) | Connectionless |
| Reliability | Reliable: ack, retransmission, sequencing | Unreliable, no guarantee, no ordering |
| Flow/congestion control | Yes (sliding window) | No |
| Header | 20-60 bytes | **8 bytes** (fixed) |
| Speed/overhead | Slower, more overhead | Faster, light |
| Transmission | Byte stream, full duplex | Message (datagram) based; supports broadcast/multicast |
| Uses | HTTP/HTTPS, FTP, SMTP, SSH, Telnet, POP3, IMAP | DNS, DHCP, TFTP, SNMP, VoIP, video streaming, online gaming, RIP, NTP |

- UDP header (4 fields × 2 B): source port, destination port, length, checksum.
- TCP header fields: source port, dest port, **sequence number (32 b)**, **ack number (32 b)**, header length, flags (**URG, ACK, PSH, RST, SYN, FIN**), **window size (16 b)**, checksum, urgent pointer, options.

### 8.3 TCP connection management
**Three-way handshake (establishment):**
```
Client                          Server
  | --- SYN (seq = x) ---------> |    client active open
  | <-- SYN+ACK (seq=y, ack=x+1) |    server passive open
  | --- ACK (ack = y+1) -------> |    connection established
```
**Termination (four-way):** FIN → ACK → FIN → ACK (each side closes its direction independently; half-close). **RST** aborts a connection. SYN and FIN each consume one sequence number.

TCP states: LISTEN, SYN-SENT, SYN-RCVD, ESTABLISHED, FIN-WAIT, CLOSE-WAIT, TIME-WAIT.

### 8.4 Flow control and reliability
- **Flow control** uses the receiver's advertised window (**rwnd**); sender window = min(rwnd, cwnd).
- **Cumulative acks**; retransmission on timeout (RTO from estimated RTT) or on **3 duplicate ACKs** (fast retransmit).
- Throughput bound = window size / RTT. Example: window 64 KB, RTT 100 ms → 65,536 × 8 / 0.1 ≈ 5.24 Mbps.

### 8.5 Congestion control (TCP)
Congestion = too much traffic for the network. Sender uses **congestion window (cwnd)** in MSS units.
- **Slow start**: cwnd starts at 1 MSS, **doubles every RTT** (exponential: 1, 2, 4, 8…) until it reaches **ssthresh**.
- **Congestion avoidance** (AIMD): after ssthresh, cwnd grows **linearly +1 MSS per RTT** (additive increase).
- **On timeout**: ssthresh = cwnd / 2; cwnd = 1 MSS; restart slow start (Tahoe and Reno).
- **On 3 duplicate ACKs** (Reno): fast retransmit + **fast recovery**: ssthresh = cwnd/2, cwnd = ssthresh (+3), continue linear growth.
- Multiplicative decrease = halve on loss; hence AIMD "sawtooth".

**Worked example:** ssthresh = 16, cwnd starts at 1. RTT 1:1, 2:2, 3:4, 4:8, 5:16 (reaches ssthresh), then 17, 18... If timeout occurs at cwnd = 20: new ssthresh = 10, cwnd = 1, grows 1, 2, 4, 8, 10, 11...

**⚡ Exam tip:** TCP = reliable, connection-oriented; UDP = fast, connectionless, 8-byte header. 3-way handshake: SYN, SYN-ACK, ACK. On timeout: ssthresh = cwnd/2 and cwnd = 1. DNS and DHCP use UDP (DNS zone transfer uses TCP).

---

## 9. Application Layer Protocols and Well-Known Ports

### 9.1 Port table (memorise)

| Protocol | Port | Transport |
|---|---|---|
| FTP | 20 (data), 21 (control) | TCP |
| SSH / SFTP | **22** | TCP |
| Telnet | **23** | TCP |
| SMTP | **25** (587 submission, 465 SMTPS) | TCP |
| DNS | **53** | UDP (and TCP) |
| DHCP | 67 (server), 68 (client) | UDP |
| TFTP | 69 | UDP |
| HTTP | **80** | TCP |
| POP3 | **110** (995 secure) | TCP |
| NTP | 123 | UDP |
| IMAP | **143** (993 secure) | TCP |
| SNMP | 161/162 | UDP |
| BGP | 179 | TCP |
| HTTPS | **443** | TCP |
| RIP | 520 | UDP |
| Modbus TCP | **502** | TCP |
| RDP | 3389 | TCP |

### 9.2 Protocol details
- **DNS (Domain Name System)**: translates domain names ↔ IP addresses; distributed hierarchical database: **root → TLD (.com, .in) → authoritative** servers. Resolution: recursive or iterative; resolver caches. Records: **A** (IPv4), **AAAA** (IPv6), **MX** (mail), **CNAME** (alias), **NS** (name server), **PTR** (reverse lookup), SOA. Uses UDP 53 (TCP for large replies/zone transfers). FQDN example: www.example.com.
- **HTTP (HyperText Transfer Protocol)**: web request-response protocol on TCP 80; **stateless** (cookies add state). Methods: **GET, POST, PUT, DELETE, HEAD, OPTIONS**. Status classes: 1xx info, **2xx success (200 OK)**, **3xx redirect (301, 302)**, **4xx client error (400, 403, 404 Not Found)**, **5xx server error (500, 503)**. HTTP/1.0 non-persistent; HTTP/1.1 persistent connections. **HTTPS** = HTTP over TLS/SSL (443; encrypted, authenticated). URL = scheme://host:port/path?query. HTML is the markup language, not a protocol.
- **FTP (File Transfer Protocol)**: transfers files using **two TCP connections**: control (21, persistent, commands) and data (20, per transfer) - "out-of-band" control; username/password sent in clear text. Modes: active/passive; ASCII/binary. **TFTP**: simple, UDP, no authentication. **SFTP**: file transfer over SSH.
- **E-mail**: User Agent (Outlook, Gmail) → **SMTP** (push, client to server and server to server; port 25) → recipient's mail server → **POP3/IMAP** (pull) → user. 
  - **SMTP**: sends/relays mail; text-based, only 7-bit ASCII (MIME extends to attachments).
  - **POP3**: downloads mail to local device, usually deletes from server (offline reading; single device).
  - **IMAP**: mail stays on server, synchronised across devices, folders managed on server.
- **Telnet**: remote terminal login, **plain text (insecure)**, port 23. **SSH (Secure Shell)**: encrypted remote login and command execution, port 22, replaces Telnet; uses public-key cryptography. "Secure remote login" → **SSH**.
- Others: **SNMP** (network management), **NTP** (time sync), **VoIP/SIP**, **WWW** (web client = browser, server = web server), **URL**, **Proxy server**, **Firewall** (filters traffic by rules), **TLS/SSL** (secure channel between transport and application), **IPsec** (secure IP at network layer).

**⚡ Exam tip:** SMTP sends mail, POP3/IMAP retrieve it. SSH = secure remote login (Telnet is unsecure). DNS = name → IP (port 53). HTTP 80 / HTTPS 443. FTP uses 20 and 21. Modbus TCP = port 502.

---

## 10. Mobile Generations, Bluetooth and Zigbee

### 10.1 Cellular generations

| Gen | Era | Technology | Key features |
|---|---|---|---|
| **1G** | 1980s | Analog (AMPS, FDMA) | Voice only, poor security, large phones |
| **2G** | 1990s | Digital: **GSM** (TDMA), CDMA (IS-95) | Voice + **SMS**, encryption; 2.5G **GPRS**, 2.75G **EDGE** (packet data, ~384 kbps) |
| **3G** | 2000s | **UMTS/WCDMA**, CDMA2000, HSPA | Mobile broadband, video calls, ~2 Mbps (HSPA up to tens of Mbps) |
| **4G** | 2010s | **LTE / LTE-Advanced**, WiMAX; OFDMA, MIMO | All-IP (packet switched, VoLTE), ~100 Mbps mobile, up to 1 Gbps stationary |
| **5G** | 2020s | **5G NR**; sub-6 GHz and mmWave; massive MIMO | Up to ~10-20 Gbps peak, latency ~1 ms, network slicing, IoT (massive device density) |

- Cellular concepts: **cell**, **base station (BTS)**, **MSC**, **handoff/handover**, frequency reuse. GSM uses SIM card. Cellular uses circuit switching in 1G-2G voice, packet switching from 3G data/4G all-IP.
- 5G service categories: **eMBB** (enhanced mobile broadband), **URLLC** (ultra-reliable low latency), **mMTC** (massive machine-type communication).

### 10.2 Bluetooth (IEEE 802.15.1)
- Short-range wireless **PAN**; **2.4 GHz ISM band**, frequency hopping spread spectrum (FHSS); range ~10 m (Class 2), up to 100 m (Class 1).
- **Piconet**: 1 master + up to **7 active slaves** (8 devices); **scatternet** = interconnected piconets. Bluetooth Low Energy (BLE) for low power.
- Uses: headsets, file transfer between phones, wireless keyboards/mice.

### 10.3 Zigbee (IEEE 802.15.4)
- Low-power, low-data-rate, low-cost wireless **mesh** networking for IoT / home automation / sensors; **250 kbps** at 2.4 GHz (also 868/915 MHz).
- Device roles: **Coordinator** (one per network, forms network, trust centre), **Router** (relays data, extends range), **End device** (battery-powered, sleeps).
- Topologies: star, tree, mesh. Range 10-100 m. Compared to Bluetooth: lower power and rate, larger networks (thousands of nodes).

### 10.4 Other wireless
- **NFC**: very short range (~4 cm), 13.56 MHz, contactless payments. **RFID**: tags read by radio. **Wi-Fi Direct**, **Infrared (IrDA)**, **WiMAX 802.16**, **Li-Fi**, **GPS** (satellite positioning).
- Mobile IP lets a host keep its IP address while moving (home agent / foreign agent).

**⚡ Exam tip:** 1G analog, 2G digital voice + SMS (GSM), 3G mobile data, 4G LTE all-IP, 5G ultra-low latency. Bluetooth: 2.4 GHz, piconet up to 7 slaves. Zigbee: 802.15.4, low-power mesh with coordinator/router/end device.

---

## Quick Revision Sheet

1. Full mesh of n nodes has n(n−1)/2 links; each node has n−1 ports.
2. OSI layers: Physical, Data link, Network, Transport, Session, Presentation, Application. TCP/IP has 4.
3. PDUs: bit (physical), frame (data link), packet (network), segment/datagram (transport), data (upper layers).
4. Router = L3, switch/bridge = L2, hub/repeater = L1, gateway = protocol converter up to L7.
5. Nyquist (noiseless): C = 2B log₂L. Shannon (noisy): C = B log₂(1 + SNR); dB → ratio = 10^(dB/10).
6. WDM = optical fibre, FDM = analog, TDM = digital time slots. Circuit switching = dedicated path; packet switching = Internet.
7. Bit stuffing: insert 0 after five consecutive 1s; flag = 01111110.
8. Parity cannot detect an even number of bit errors; CRC remainder has (generator length − 1) bits.
9. Hamming: 2^r ≥ m + r + 1; check bits at positions 1, 2, 4, 8; syndrome gives error position. d_min detects d−1, corrects ⌊(d−1)/2⌋.
10. Stop-and-wait efficiency = 1/(1 + 2a), a = Tp/Tt; GBN/SR efficiency = N/(1 + 2a).
11. GBN window ≤ 2^k − 1; SR window ≤ 2^(k−1).
12. Pure ALOHA 18.4%, slotted ALOHA 36.8%; vulnerable time 2T vs T.
13. CSMA/CD wired (min frame = 2·Tp·B; 64 bytes at 10 Mbps), CSMA/CA wireless (RTS/CTS, ACK).
14. Ethernet frame 64-1518 B, payload 46-1500 B, MAC address 48 bits.
15. IPv4 = 32 bits, header 20-60 B, max datagram 65,535 B; IPv6 = 128 bits (8 hex groups), 40-byte header, no broadcast.
16. Classes: A 1-126, B 128-191, C 192-223, D 224-239 (multicast), E 240-255; 127.x loopback; private 10/8, 172.16/12, 192.168/16; APIPA 169.254/16.
17. Hosts per subnet = 2^h − 2; /26 → 62 hosts, mask .192; /27 → 30, .224; /28 → 14, .240; /30 → 2.
18. ARP: IP → MAC; RARP: MAC → IP; ICMP: errors/ping/traceroute; DHCP: DORA over UDP 67/68; NAT: private → public.
19. RIP: distance vector, hops, max 15, 30 s; OSPF: link state, Dijkstra; BGP: path vector, between ASes, TCP 179.
20. TCP reliable/connection-oriented with 3-way handshake (SYN, SYN-ACK, ACK); UDP connectionless, 8-byte header.
21. TCP congestion: slow start (doubling) → congestion avoidance (+1/RTT); on timeout ssthresh = cwnd/2, cwnd = 1.
22. Ports: FTP 20/21, SSH 22, Telnet 23, SMTP 25, DNS 53, DHCP 67/68, HTTP 80, POP3 110, IMAP 143, HTTPS 443, Modbus TCP 502.
23. SMTP sends e-mail; POP3 downloads (and deletes); IMAP keeps mail on server. SSH = secure remote login.
24. Mobile: 1G analog, 2G GSM digital/SMS, 3G UMTS data, 4G LTE all-IP, 5G NR ~1 ms latency.
25. Bluetooth: 802.15.1, 2.4 GHz, piconet = 1 master + 7 slaves; Zigbee: 802.15.4, low-power mesh, 250 kbps.
