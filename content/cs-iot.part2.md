
## 6. Mobile Computing

### Basics
- **Mobile computing** = computing while moving using portable devices (phone, tablet, laptop, wearables) over wireless networks. Components: mobile hardware, mobile software/OS, mobile communication (cellular/Wi-Fi).
- **Cellular concept**: coverage area divided into hexagonal **cells**, each served by a **base station (BTS)** with its own set of frequencies. Non-adjacent cells **reuse** frequencies (frequency reuse) -> more users with limited spectrum. Typical reuse cluster size N = 3, 4, 7 (N = i² + ij + j²; i=2, j=1 gives 7, i=1, j=1 gives 3).
- Cell sizes: femto < pico < micro < macro cell. Several BTS -> **BSC** (Base Station Controller) -> **MSC** (Mobile Switching Centre) -> PSTN. Registers: **HLR** (home), **VLR** (visitor), AuC, EIR.
- **Roaming**: using the network outside the home area.
- **Handoff (handover)**: transferring an ongoing call from one cell/channel to another as the user moves, without dropping the call.
  - **Hard handoff**: **break before make** (old link released, then new link set up); used in GSM/FDMA/TDMA.
  - **Soft handoff**: **make before break** (connected to both for a time); used in **CDMA**; fewer dropped calls.
- Multiple access: **FDMA** (frequency slices), **TDMA** (time slots), **CDMA** (unique codes, spread spectrum), **OFDMA** (4G/5G).

### GSM vs CDMA

| Feature | GSM | CDMA |
|---|---|---|
| Full form | Global System for Mobile Communications | Code Division Multiple Access |
| Access method | TDMA + FDMA | Spread spectrum, unique code per user |
| SIM card | Yes (subscriber identity, SIM based) | Traditionally handset based (no SIM) |
| Handoff | Hard | Soft |
| Origin | Europe (ETSI), 1991 | Qualcomm (USA) |
| Frequency in India | 900/1800 MHz | 800 MHz |
| Roaming | Global, easier | Limited |

- GSM channel 200 kHz wide, 8 time slots per carrier. SMS, 2G digital voice came with GSM. **IMEI** identifies handset (15 digits); **SIM** identifies subscriber.

### Mobile generations

| Gen | Era | Technology | Speed | Key features |
|---|---|---|---|---|
| **1G** | 1980s | **Analog**, FDMA, AMPS | ~2.4 kbps | voice only, poor security |
| **2G** | 1990s | **Digital**, GSM/CDMA (TDMA) | ~64 kbps (up to 14.4 kbps data in GSM) | SMS, MMS, encrypted voice |
| 2.5G / 2.75G | late 90s | GPRS (up to 114 kbps) / EDGE (up to 384 kbps) | | packet data, basic internet |
| **3G** | 2000s | UMTS / WCDMA / HSPA | ~2 Mbps (HSPA up to 14+ Mbps) | video calls, mobile internet, apps |
| **4G** | 2010s | **LTE / LTE-Advanced**, OFDMA, **all-IP** (VoLTE) | 100 Mbps - 1 Gbps | HD video, streaming, packet switching only |
| **5G** | 2020s | NR, mmWave + sub-6 GHz, massive MIMO | up to ~10-20 Gbps peak; latency about 1 ms | IoT (massive machine type), self-driving, AR/VR, network slicing |

- 1G analog -> 2G first digital -> 3G first mobile broadband/video -> 4G all-IP -> 5G ultra-low latency + IoT.
- India launched 5G in October 2022 (Jio, Airtel).

### Mobile operating systems
- **Android** (Google, Linux kernel based, open source, Java/Kotlin, **APK** files; versions named after desserts up to Pie, e.g., Cupcake, Donut, Eclair, Froyo, Gingerbread, Honeycomb, Ice Cream Sandwich, Jelly Bean, KitKat, Lollipop, Marshmallow, Nougat, Oreo, Pie; Android 10 onwards numbers).
- **iOS** (Apple, closed, Objective-C/Swift, iPhone only). Others: HarmonyOS (Huawei), KaiOS, Windows Phone (discontinued), BlackBerry OS, Symbian (Nokia, old), Tizen, Bharat OS/ Indus OS.
- Mobile browsers/apps; app stores: Google Play, Apple App Store.

**⚡ Exam tip:** 1G = analog, 2G = digital (GSM), 3G = video call/mobile broadband, 4G = LTE all-IP, 5G = very low latency. Hard handoff = break-before-make; soft = make-before-break (CDMA). GSM uses SIM + TDMA.

## 7. E-Commerce

### Definition and models
- **E-commerce** = buying and selling of goods/services and transfer of money/data over electronic networks (Internet). **E-business** is broader (includes internal processes, customer service, partner collaboration).
- Founding examples: Amazon (1994, Jeff Bezos), eBay (1995), Flipkart (2007, India).

| Model | Between | Examples |
|---|---|---|
| **B2B** (Business to Business) | company <-> company | Alibaba, IndiaMART, Tata/ Reliance wholesale, supplier-manufacturer portals |
| **B2C** (Business to Consumer) | business -> consumer | Amazon, Flipkart, Myntra, Nykaa |
| **C2C** (Consumer to Consumer) | consumer <-> consumer, via a platform | OLX, eBay, Quikr, Facebook Marketplace |
| **C2B** (Consumer to Business) | consumer offers product/service to business | freelancing (Upwork), stock photo sellers, reverse auctions (Priceline) |
| **G2C** (Government to Citizen) | government -> citizen | income tax filing, passport, DigiLocker, UMANG, e-district |
| **G2B / B2G** | government <-> business | tenders on GeM, e-procurement, GST portal |
| **G2G** | between government bodies | NIC, inter-department data |

- "Four main types of e-commerce" = B2B, B2C, C2C, C2B (the standard four; B2G/G2C also exist).
- **Advantages of B2B** : reduced costs and procurement time, automation of orders (EDI), wider supplier reach, better inventory and supply chain management, 24x7 operation, lower paperwork.
- Dominant volume: B2B is larger than B2C.

### Advantages and limitations of e-commerce

| Advantages | Limitations |
|---|---|
| 24x7 availability, global reach | Security concerns, fraud, phishing |
| Lower operating cost (no shop rent) | Cannot touch/see product; return issues |
| Easy comparison, wider choice, discounts | Dependence on Internet, power, digital literacy |
| Faster transactions, personalisation | Delivery delays, hidden charges |
| Lower inventory and paperwork | Privacy issues, legal/tax complexities |

### Components and technologies
- **Payment gateway** (e.g., Razorpay, PayU, CCAvenue, Paytm): authorises online payments between merchant and bank. Shopping cart, product catalogue, order management.
- **EDI (Electronic Data Interchange)**: computer-to-computer exchange of standard business documents (purchase orders, invoices, shipping notices) between organisations in a standard format without human intervention. Standards: ANSI X12, **UN/EDIFACT**. Used in B2B.
- **SSL (Secure Sockets Layer)** / **TLS**: encrypts data between browser and server; indicated by **https://** and padlock; port **443**. Uses digital certificates issued by a **Certificate Authority (CA)**. **SET** (Secure Electronic Transaction) was a card payment protocol (Visa/Mastercard).
- Other security: encryption, digital signature, firewall, **two-factor authentication**, **OTP**, CVV, PIN, tokenization.
- Cyber law: **Information Technology Act, 2000** (India) gives legal recognition to e-records and digital signatures.

### Electronic payment systems

| System | Key facts |
|---|---|
| **Credit card** | pay later; bank gives credit limit, billing cycle, interest if unpaid; Visa, Mastercard, RuPay, Amex |
| **Debit card** | money deducted immediately from savings/current account; PIN needed |
| **Smart card** | embedded chip (EMV) |
| **Net banking** | online bank portal; NEFT (batch), RTGS (large value >= Rs 2 lakh, real time gross settlement), **IMPS** (instant 24x7) |
| **E-wallet** | prepaid digital wallet: Paytm, PhonePe wallet, Amazon Pay, Mobikwik, Google Pay |
| **UPI** | **Unified Payments Interface** by **NPCI** (National Payments Corporation of India), launched **2016**; instant 24x7 bank-to-bank transfer using mobile; **VPA** (Virtual Payment Address) like name@bank; no need to share account number/IFSC; secured with **UPI PIN**; apps: BHIM (launched Dec 2016), Google Pay, PhonePe, Paytm; built over IMPS |
| **RuPay** | India's domestic card network by NPCI |
| **AePS** | Aadhaar Enabled Payment System (biometric + Aadhaar) |
| **USSD (*99#)** | banking without internet on basic phones |
| **BHIM Aadhaar**, **NFC** tap-to-pay, **QR code** payments | |
| **Cryptocurrency** | digital currency, not regulated by any central bank |

### Bitcoin
- First decentralised **cryptocurrency**, by **Satoshi Nakamoto** (2008 paper, 2009 launch). Works on blockchain with proof-of-work mining.
- Total supply capped at **21 million** coins; smallest unit **1 satoshi = 10⁻⁸ BTC**; block time about 10 minutes; block reward halves about every 4 years (210,000 blocks). Transactions are pseudonymous (addresses, not names), irreversible, peer-to-peer. Other crypto: Ethereum (Ether), Litecoin, Ripple (XRP), Dogecoin.
- Not legal tender in India (RBI's own **e-rupee / CBDC** launched as pilot in 2022-23).

**⚡ Exam tip:** Four main e-commerce types = B2B, B2C, C2C, C2B. Amazon -> B2C; OLX -> C2C; filing income tax -> G2C. SSL -> https (443). UPI -> NPCI, VPA, 2016. EDI = standard electronic business documents between companies.

## 8. E-Governance, Digital India, ICT, Social Media and Green Computing

### E-governance
- **E-governance** = use of ICT by government to deliver services, exchange information and improve transparency, efficiency and accountability. Models: **G2C, G2B, G2G, G2E** (employees).
- Benefits: transparency, speed, less corruption, lower cost, citizen participation. Challenges: digital divide, literacy, security, infrastructure.
- **National e-Governance Plan (NeGP)**, 2006; **NIC** (National Informatics Centre) builds government IT infrastructure; **C-DAC** (Centre for Development of Advanced Computing, Pune; built PARAM supercomputers); **MeitY** (Ministry of Electronics and IT).

### Digital India (launched 1 July 2015)
- Vision: transform India into a digitally empowered society and knowledge economy. **Nine pillars:** broadband highways; universal access to mobile connectivity; public Internet access programme; e-governance (reforming government through technology); **eKranti** (electronic delivery of services); information for all; electronics manufacturing; IT for jobs; early harvest programmes.
- Key initiatives and tools:

| Initiative | Purpose |
|---|---|
| **Aadhaar** (UIDAI, 12 digit ID) | biometric identity |
| **DigiLocker** | cloud storage for official documents/certificates |
| **UMANG** | single mobile app for many government services |
| **BHIM / UPI** | digital payments |
| **BharatNet** | optical fibre broadband to gram panchayats |
| **e-Sign**, **MyGov**, **GeM** (Government e-Marketplace), **e-Hospital**, **e-NAM** (agri markets), **CSC** (Common Service Centres), **Jan Dhan-Aadhaar-Mobile (JAM)**, **Skill India**, **Start-up India** | |
- **ICT** = Information and Communication Technology: all technologies for storing, processing, transmitting and presenting information (computers, networks, mobile, Internet, broadcasting).

### Social media
- **Social media** = Internet platforms for creating and sharing content and interaction. Types: social networking (Facebook, LinkedIn), microblogging (X/Twitter), media sharing (Instagram, YouTube, Pinterest), messaging (WhatsApp, Telegram), blogs (Blogger, WordPress), wikis (Wikipedia), forums/community (Reddit, Quora).
- Founders: Facebook (Mark Zuckerberg, 2004), YouTube (2005, Chad Hurley, Steve Chen, Jawed Karim), Twitter (2006, Jack Dorsey), WhatsApp (2009, Brian Acton and Jan Koum), LinkedIn (2002, Reid Hoffman), Instagram (2010, Kevin Systrom).
- Pros: communication, awareness, marketing, education. Cons: cyberbullying, fake news, privacy loss, addiction, identity theft. Cyber crimes: phishing, hacking, spamming, **cyber stalking**; report at cybercrime.gov.in.

### Green computing
- **Green computing (green IT)** = environmentally responsible and eco-friendly use of computers and resources: designing, manufacturing, using and disposing of computing with minimum environmental impact.
- Practices: use **Energy Star** rated devices, power-saving/sleep mode, LCD/LED over CRT, turn off idle devices, virtualization and cloud (fewer servers), telecommuting, paperless office, **recycling e-waste**, avoid hazardous materials (lead, mercury; **RoHS**), screen savers do not save energy (sleep does).
- **E-waste** = discarded electronic equipment; toxic if dumped; disposed through authorised recyclers (E-Waste Management Rules, India).
- Goals: reduce energy use, carbon footprint, and hazardous waste.

**⚡ Exam tip:** Digital India = 1 July 2015, nine pillars. DigiLocker = documents; UMANG = services app; BharatNet = rural broadband. Green computing -> energy saving + e-waste recycling; Energy Star label.

## 9. History of Computing and Computer Fundamentals

### History and inventors

| Year | Person / event |
|---|---|
| ~2400 BC | **Abacus** (first calculating device) |
| 1617 | **John Napier**, Napier's bones, logarithms |
| 1642 | **Blaise Pascal**: Pascaline (mechanical adding machine); Pascal language named after him |
| 1673 | **Leibniz**: Stepped Reckoner (multiply/divide), binary system |
| 1801 | **Joseph Jacquard**: punched card loom |
| 1822 / 1837 | **Charles Babbage**: Difference Engine / **Analytical Engine** -> **Father of the Computer** |
| 1843 | **Ada Lovelace**: first programmer |
| 1890 | **Herman Hollerith**: punched card tabulator for census; founded firm that became IBM |
| 1936 | **Alan Turing**: Turing machine; Father of theoretical CS/AI |
| 1937-44 | **Howard Aiken**: Harvard Mark I (electromechanical) |
| 1946 | **ENIAC**: first general-purpose electronic digital computer (J. Presper Eckert and John Mauchly) |
| 1945-49 | **John von Neumann**: stored-program concept (EDVAC; EDSAC by Maurice Wilkes) |
| 1951 | **UNIVAC-I**: first commercial computer |
| 1947 | **Transistor** (Bardeen, Brattain, Shockley, Bell Labs) |
| 1958 | **Integrated Circuit** (Jack Kilby, TI; Robert Noyce) |
| 1971 | **Intel 4004**: first microprocessor (Ted Hoff, Federico Faggin) |
| 1975-81 | Altair 8800 (1975), Apple I/II (Steve Jobs, Wozniak), **IBM PC (1981)** |
| 1989-91 | **Tim Berners-Lee**: World Wide Web |
| 1991 | **Linus Torvalds**: Linux; C-DAC PARAM 8000 (India's first supercomputer, Vijay Bhatkar) |

- Others: **Bill Gates and Paul Allen** (Microsoft, 1975); **Douglas Engelbart** (mouse); **Ray Tomlinson** (e-mail, @ symbol, 1971); **Vint Cerf and Bob Kahn** (TCP/IP, "fathers of the Internet"); **Dennis Ritchie** (C, UNIX); **Bjarne Stroustrup** (C++); **James Gosling** (Java); **Guido van Rossum** (Python); **Grace Hopper** (COBOL, "bug"); **Dan Bricklin** (spreadsheet VisiCalc).

### Generations

| Gen | Period | Technology | Examples / notes |
|---|---|---|---|
| 1st | 1946-1959 | **Vacuum tubes**; machine language; punched cards; huge, hot | ENIAC, EDVAC, UNIVAC-I |
| 2nd | 1959-1965 | **Transistors**; assembly and early high-level (FORTRAN, COBOL) | IBM 1401, IBM 7094 |
| 3rd | 1965-1971 | **Integrated Circuits (SSI/MSI)**; OS, keyboard, monitor | IBM 360 |
| 4th | 1971-1980s (to present) | **Microprocessor, LSI/VLSI**; PCs, GUI, networking | Intel 4004, IBM PC, Apple |
| 5th | present and beyond | **ULSI, AI**, parallel processing, natural language, quantum | ANN, expert systems, robotics |

### Types of computers
- By data handled: **analog** (continuous: speedometer, thermometer), **digital** (discrete 0/1), **hybrid** (ICU/petrol pump).
- By size/power (largest -> smallest): **Supercomputer** (weather, nuclear, PARAM, Cray, measured in FLOPS) > **Mainframe** (banks, airlines; IBM z series; thousands of users) > **Minicomputer** (PDP-11, mid size) > **Microcomputer** (PC: desktop, laptop, tablet, smartphone, workstation).
- **Embedded** computer: special purpose in washing machines, cars.

### Units of memory
```
1 bit = 0 or 1             (smallest unit of data)
1 nibble = 4 bits
1 byte (B) = 8 bits        (one character)
1 KB = 1024 B  (2¹⁰)
1 MB = 1024 KB (2²⁰ bytes)
1 GB = 1024 MB (2³⁰ bytes)
1 TB = 1024 GB (2⁴⁰ bytes)
1 PB = 1024 TB (2⁵⁰)  ->  EB (2⁶⁰) -> ZB (2⁷⁰) -> YB (2⁸⁰)
1 word = 16/32/64 bits (depends on CPU)
```
- n bits can represent 2ⁿ different values (8 bits -> 256 values, 0-255). ASCII = 7 bits (128 chars), extended ASCII = 8 bits (256), **Unicode** up to 32 bits (UTF-8/16/32). 
- Worked example: 4 GB = 4 × 1024 MB = 4096 MB = 4096 × 1024 KB = 4,194,304 KB. Speed units: bps, Kbps, Mbps (a 100 Mbps link = 12.5 MB/s because 8 bits = 1 byte).
- Memory hierarchy (fast -> slow, costly -> cheap): registers > cache > RAM > SSD/HDD > optical/tape. RAM is volatile; ROM, flash non-volatile.

### Input / output devices

| Input | Output |
|---|---|
| Keyboard, mouse, trackball, joystick, light pen, touch screen | Monitor (CRT, LCD, LED), projector |
| Scanner, **OCR** (printed text), **OMR** (marks on sheets, exam answer sheets), **MICR** (bank cheques) | Printers: **impact** (dot matrix, daisy wheel, line) vs **non-impact** (inkjet, laser, thermal); speed units CPS/LPM/PPM; resolution DPI |
| Barcode reader, QR scanner, webcam, microphone, biometric | Speaker, plotter (large drawings, CAD) |
| Digitizer/graphics tablet | Headphones, braille display |

- Input/output both: touch screen, modem, network card, USB drive.

### Software types
- **System software**: OS (Windows, Linux, macOS, Android), device drivers, utilities (antivirus, disk cleanup), language translators (**compiler, interpreter, assembler**), loader/linker, firmware/BIOS.
- **Application software**: general purpose (MS Office, browsers, Photoshop) and **bespoke/custom** (payroll, hospital software); packages (Tally).
- Licensing: **freeware** (free, source closed), **shareware** (trial), **open source** (source available: Linux, Python), **proprietary**, **FOSS**. Malware: virus, worm, trojan, ransomware, spyware.

### MS Office common shortcuts

| Shortcut | Action | Shortcut | Action |
|---|---|---|---|
| Ctrl+C | Copy | Ctrl+X | Cut |
| Ctrl+V | Paste | Ctrl+Z | Undo |
| Ctrl+Y | Redo (also F4 repeats) | Ctrl+A | Select all |
| Ctrl+B / I / U | Bold / Italic / Underline | Ctrl+S | Save |
| Ctrl+P | Print | Ctrl+N | New document |
| Ctrl+O | Open | Ctrl+F | Find |
| Ctrl+H | Replace | Ctrl+G | Go to |
| Ctrl+K | Insert hyperlink | Ctrl+E / L / R / J | Centre / Left / Right / Justify |
| Ctrl+Home / End | Start / end of document | Ctrl+W | Close document |
| F12 | Save As | F7 | Spell check |
| F5 | Slide show (PowerPoint) / Go To (Word) | Shift+F3 | Change case |
| Alt+F4 | Close program | Ctrl+Shift+Esc | Task Manager |
| Ctrl+Alt+Del | Security options | Win+D | Show desktop |
| Ctrl+Enter | Page break (Word) | F2 | Edit cell (Excel) |
| Alt+Tab | Switch windows | Ctrl+; | Insert today's date (Excel) |

- Default file extensions: Word .docx (older .doc), Excel .xlsx (.xls), PowerPoint .pptx (.ppt), Access .accdb.
- Excel: formulas start with `=`; cell address like B3; functions SUM, AVERAGE, MAX, MIN, COUNT, IF, VLOOKUP.

**⚡ Exam tip:** Babbage = father of the computer; ENIAC (1946) = first electronic general-purpose computer; transistor -> 2nd gen, IC -> 3rd, microprocessor -> 4th. 1 byte = 8 bits, 1 KB = 1024 bytes. Ctrl+Y = redo, Ctrl+H = replace, F12 = Save As.

## 10. IoT Middleware, Modbus, IIoT, Cloud/Mobile in IoT, Security and Privacy

### IoT middleware
- **Middleware** = software layer between the devices/network (below) and applications (above). It hides hardware and protocol heterogeneity and gives applications a uniform API. It is the **Processing/Middleware layer** of the 5-layer IoT model.
- Functions: **device management** (registration, firmware update, monitoring), **protocol translation/interoperability** (MQTT, CoAP, HTTP, Modbus), **data collection, filtering and aggregation**, storage, **event processing / rules engine**, **security** (authentication, authorisation), **service discovery**, and exposing APIs to applications.
- Types by approach: service-oriented (SOA), message-oriented (MQTT/AMQP brokers), database-oriented (sensor network seen as a database), agent-based, and **cloud-based IoT platforms** (AWS IoT Core, Azure IoT Hub).
- Examples: FIWARE, Eclipse Kura, OpenIoT, Kaa, ThingsBoard, Node-RED (flow-based wiring tool).
- Middleware challenges: heterogeneity, scalability, real-time response, resource limits, security.

### Modbus (industrial protocol)
- **Modbus** = serial **master-slave (client-server) request/response** protocol created by **Modicon (1979)** for PLCs. Open, simple, royalty-free; the de-facto industrial standard.
- One **master** (client) starts every transaction; up to **247 slave** addresses (1-247; 0 = broadcast) on a serial bus.
- Variants:

| Variant | Medium / encoding |
|---|---|
| **Modbus RTU** | binary on serial **RS-485** / RS-232; CRC-16 error check |
| **Modbus ASCII** | text hex characters on serial; LRC check |
| **Modbus TCP/IP** | over Ethernet, **TCP port 502**; no CRC (TCP handles it) |

- Data model: **coils** (1-bit read/write outputs), **discrete inputs** (1-bit read-only), **input registers** (16-bit read-only), **holding registers** (16-bit read/write). Function codes: 01 read coils, 03 read holding registers, 05 write single coil, 06 write single register, 16 write multiple registers.
- Used in SCADA, PLCs, energy meters, building automation. Weakness: **no built-in authentication or encryption** (use VPN/firewall/Modbus-TLS). A gateway converts Modbus to MQTT/OPC UA for the cloud. Other industrial buses: Profibus, CAN, HART, **OPC UA**.

### Cloud computing in IoT
- IoT devices produce huge data but have little storage/CPU, so the **cloud** gives elastic storage, analytics (big data, ML), device management, dashboards, and pay-per-use (SaaS/PaaS/IaaS for IoT: AWS IoT, Azure IoT Hub, Google Cloud IoT, IBM Watson IoT, ThingSpeak).
- Flow: Device -> Gateway -> MQTT/HTTP -> Cloud broker -> Storage/Analytics -> Application / command back to actuator.
- Problem: **latency, bandwidth cost, privacy, dependence on connectivity** -> solved by **edge computing** (process at the device/gateway) and **fog computing** (local nodes between edge and cloud). Cloud = heavy, long-term analytics; edge = fast local decisions.
- **Sensor-cloud**: sensor data virtualised and offered as a cloud service. **Digital twin** = virtual replica of a physical asset kept in sync using IoT data.

### Mobile computing in IoT
- The smartphone is the **user interface, controller and sometimes the gateway** of IoT: an app controls the smart home, reads wearables over **BLE/NFC/Wi-Fi**, and uses its own sensors (GPS, accelerometer, camera) as IoT sensors (**mobile crowdsensing**).
- Cellular IoT: **NB-IoT, LTE-M (Cat-M1)**, 5G mMTC (massive machine-type communication, up to about 1 million devices per km2), URLLC (ultra-reliable low latency); eSIM for devices.
- Mobile issues: limited battery, intermittent connectivity, handoff, security of apps, bandwidth. **Mobile-edge computing (MEC)** brings compute to the base station.

### Industrial IoT (IIoT)
- **IIoT** = IoT applied to **industry** (manufacturing, energy, oil and gas, mining, logistics, utilities) - machines, sensors, PLCs/SCADA connected to analytics. Core of **Industry 4.0**.
- Differences from consumer IoT:

| Aspect | Consumer IoT | IIoT |
|---|---|---|
| Aim | convenience | efficiency, uptime, safety |
| Failure impact | inconvenience | safety hazard, production loss |
| Latency / reliability | moderate | **real-time, deterministic, very high** |
| Protocols | Wi-Fi, BLE, MQTT | **Modbus, OPC UA, Profibus, MQTT, TSN**, private 5G |
| Lifespan | 2-5 years | 10-30 years (legacy "brownfield" machines) |
| Security need | privacy | **safety + availability first** |

- Key applications: **predictive maintenance** (vibration/temperature sensors predict failure), asset tracking, remote monitoring, quality control, digital twin, smart grid, supply chain, robotics, worker safety.
- Concepts: **SCADA** (supervisory control and data acquisition), **PLC** (programmable logic controller), **HMI**, **DCS**, **CPS**, edge gateway, **OT vs IT** (operational vs information technology convergence).

### Security and privacy in IoT
- **CIA triad**: Confidentiality, Integrity, Availability, plus authentication, authorisation, non-repudiation.
- Layer-wise threats:

| Layer | Attacks |
|---|---|
| Perception | physical tampering, node capture, **spoofing/cloning RFID tags**, eavesdropping, side-channel, fake sensor data |
| Network | **DoS/DDoS**, man-in-the-middle, sniffing, replay, sinkhole/wormhole, jamming |
| Application | malware, SQL injection, weak/default passwords, insecure APIs, firmware flaws |

- Famous case: **Mirai botnet (2016)** - infected cameras/routers with default passwords and launched DDoS. **Stuxnet** attacked industrial PLCs.
- Countermeasures: strong unique credentials, **encryption (AES; TLS for MQTT on 8883, DTLS for CoAP)**, secure boot, signed **OTA firmware updates**, lightweight cryptography (ECC), device identity/PKI certificates, network segmentation, firewalls/IDS, secure gateway, regular patching, blockchain for device identity.
- **Privacy**: IoT collects personal data (location, health, habits). Principles: data minimisation, consent, anonymisation, encryption, user control. Law: India **DPDP Act 2023**, EU **GDPR**; IT Act 2000.
- Resource-constrained devices cannot run heavy security, so lightweight protocols are needed.

**⚡ Exam tip:** Middleware = hides heterogeneity, sits between devices and apps. Modbus = master-slave, RTU/ASCII/TCP (port 502), 247 slaves, no security. IIoT = Industry 4.0 for factories (predictive maintenance, SCADA/PLC). Mirai = default-password DDoS botnet. Edge solves cloud latency.

## 11. E-Commerce Framework, Internet Infrastructure, Network Security and Payment Systems

### E-commerce framework and applications
- **Framework layers** (Kalakota-Whinston): Applications (B2B, B2C, supply-chain, e-governance, e-banking, e-learning, e-ticketing, online auction) on top of **common business services** (security, payments, directories) -> **messaging and information distribution** (EDI, e-mail, HTTP) -> **multimedia content and network publishing** (HTML, web) -> **network infrastructure** (Internet, telecom, cable, wireless). Supported by **public policy, legal and technical standards**.
- Applications: online retail, online banking, e-ticketing (IRCTC), online auctions, e-learning, e-governance, digital content (OTT, music), travel booking, stock trading, supply-chain management.
- Revenue models: sales, advertising, subscription, commission/affiliate, freemium. **Brick-and-click** = physical + online. **m-commerce** = commerce on mobile devices.

### Internet as infrastructure
- Internet = global TCP/IP packet-switched network of networks, the backbone of e-commerce. Parts: ISPs (Tier 1/2/3), **IXPs**, backbone, DNS, web servers, CDNs, data centres/cloud.
- **Intranet** = private network of an organisation using Internet technology; **Extranet** = intranet extended to trusted partners (suppliers, customers), used in B2B/EDI; **VPN** = encrypted tunnel over the public Internet (IPsec, SSL VPN).
- Key services: **DNS** (name to IP), **HTTP/HTTPS**, SMTP/IMAP mail, FTP, web hosting, **CDN** (content delivered from servers near the user), cloud hosting, domain registration.
- Digital certificate (X.509) from a **CA** binds a public key to an identity; the framework is **PKI**.

### Firewalls and network security
- **Firewall** = hardware/software placed between a trusted internal network and an untrusted network (Internet) that **filters traffic by rules**; blocks unauthorised access (it does not remove viruses already inside, nor stop insiders).

| Type | Works at | Idea |
|---|---|---|
| **Packet-filtering** | network/transport layer | allow/deny by source/destination IP, port, protocol; stateless; fast |
| **Stateful inspection** | network + transport | tracks connection state (TCP handshake) |
| **Circuit-level gateway** | session layer | validates sessions (e.g., SOCKS) |
| **Application-level gateway / proxy** | application layer | inspects content (HTTP, FTP); most secure, slower |
| **NGFW** | all | deep packet inspection, IPS, application awareness |

- **DMZ** (demilitarised zone) = separate subnet holding public servers (web, mail) between two firewalls. **IDS** detects intrusion (alerts), **IPS** blocks it. **Proxy server** hides internal hosts; **NAT** hides private IPs.
- Security goals: confidentiality, integrity, authentication, **non-repudiation**, availability.
- Cryptography: **symmetric** (one shared key; DES, 3DES, AES; fast), **asymmetric** (public/private pair; RSA, ECC; key exchange, signatures), **hash** (MD5, SHA-256; integrity), **digital signature** (hash encrypted with the sender's private key: authentication + integrity + non-repudiation). Typical hybrid: asymmetric to exchange a session key, symmetric for the data.
- Protocols: **SSL/TLS** (https, 443), **SET**, **IPsec**, S/MIME and PGP (email), **SSH** (22).
- Threats: **phishing, spoofing, sniffing, man-in-the-middle, DoS/DDoS, SQL injection, malware (virus, worm, trojan, ransomware), spyware, brute force**, cross-site scripting.
- Defences: firewall, antivirus, IDS/IPS, encryption, strong passwords, 2FA/OTP, patching, backups, secure coding.

### Payment systems
- **Smart card**: plastic card with an embedded **microprocessor chip** (can compute, store data, run cryptography) vs a magnetic stripe (storage only). **EMV** (Europay-Mastercard-Visa) chip standard. Types: **contact** (inserted, ISO 7816), **contactless** (NFC, ISO 14443, 13.56 MHz). Uses: bank chip cards, SIM, ID cards, transit cards, e-passport. Needs PIN; much harder to clone than a magstripe card.
- **Credit card flow**: cardholder -> merchant -> **payment gateway** -> **acquiring bank** (merchant's bank) -> **card network** (Visa/Mastercard/RuPay) -> **issuing bank** (cardholder's bank) -> authorisation, then settlement. Five parties: cardholder, merchant, issuer, acquirer, network. Bank income: interest, **MDR** (merchant discount rate), annual fees. Credit = pay later within credit limit and billing cycle.
- **Debit card** deducts instantly; **prepaid/gift card** has loaded value; **charge card** must be paid in full each month.
- **Digital tokens (electronic tokens)**: digital representation of value that can be exchanged. Two kinds:
  - **Cash-like (prepaid) tokens**: e-cash, e-wallet balance, bearer tokens such as **DigiCash / Ecash** (David Chaum, blind signatures give anonymity), Mondex. The holder pays from stored value; the bank must prevent **double spending**.
  - **Check-like (postpaid) tokens**: **e-cheque**, NetBill, NetCheque; a payment instruction cleared later through the bank.
  - **Payment tokenization** (card-network tokens) replaces the card number (PAN) with a random token so merchants never store the real number. **CBDC (e-rupee)** is a central-bank digital token.
- Requirements for e-payment: security, authentication, integrity, non-repudiation, **anonymity** (for cash), divisibility, convertibility, low transaction cost.
- Other systems: e-wallet, net banking, UPI, e-cheque, micropayments (very small amounts, e.g., Millicent).

### EDI (Electronic Data Interchange)
- Structured **computer-to-computer exchange of business documents** (purchase order, invoice, shipping notice, payment advice) in a **standard format**, with no manual re-keying; reduces errors, cost and cycle time.
- Standards: **ANSI X12** (North America), **UN/EDIFACT** (international, ISO 9735), also TRADACOMS, HL7 (health).
- Components: **trading partners**, **EDI translator** (internal format <-> standard), communication link (**VAN** = value-added network, AS2/FTP/Internet EDI), mapping software. A document is built from **segments** and **data elements**.
- **Benefits**: speed, accuracy, lower cost, supports **JIT** inventory. **Drawbacks**: setup cost, rigid standards, small firms excluded (hence XML/web EDI). Used in B2B, customs, banking (**EFT**), retail.

### Digital libraries
- **Digital library** = organised collection of digital objects (books, journals, theses, audio, video, images) with **metadata, search and retrieval, preservation, and access management**, accessible over a network. Differs from a plain website by curation, standards and long-term preservation.
- Features: full-text search, **metadata** (Dublin Core, MARC), **persistent identifiers (DOI, handle)**, OCR digitisation, access rights/DRM, **OAI-PMH** for harvesting, interoperability, remote 24x7 access.
- Examples: **NDLI** (National Digital Library of India, IIT Kharagpur), **INFLIBNET / N-LIST**, **e-ShodhSindhu**, **Shodhganga** (theses), **SWAYAM**, DELNET, Project Gutenberg, Internet Archive, JSTOR, IEEE Xplore; open-source software DSpace, EPrints, Greenstone.
- Issues: copyright, digital preservation (format obsolescence), cost, digital divide.

### Corporate data warehouses
- **Data warehouse** (Bill Inmon) = **subject-oriented, integrated, time-variant, non-volatile** collection of data supporting **management decisions**. Holds historical data from many operational (OLTP) sources.

| OLTP (operational DB) | Data warehouse (OLAP) |
|---|---|
| day-to-day transactions, insert/update | analysis, read-mostly queries |
| current, detailed data | historical, summarised data |
| normalised, many small queries | denormalised (**star/snowflake schema**), complex queries |
| application-oriented | subject-oriented |

- **ETL** = Extract, Transform, Load (cleaning, integration) from sources into the warehouse. **Data mart** = small department-level subset. **Metadata** describes the data. **ODS** = operational data store.
- **Star schema**: central **fact table** (measures, e.g., sales amount) surrounded by **dimension tables** (time, product, customer, store); snowflake = normalised dimensions.
- **OLAP operations**: **roll-up** (aggregate up a hierarchy), **drill-down**, **slice** (one dimension fixed), **dice** (sub-cube), **pivot** (rotate). Types: ROLAP, MOLAP, HOLAP. **Data cube** = multidimensional view.
- **Data mining** (association, clustering, classification) discovers patterns in the warehouse: CRM, fraud detection, market-basket analysis, targeted offers in e-commerce.
- Corporate use: sales trend analysis, customer segmentation, inventory forecasting, **business intelligence (BI)**, dashboards.

**⚡ Exam tip:** Firewall = filters traffic between trusted and untrusted networks (packet filter at network layer; proxy at application layer). Smart card = embedded microprocessor (EMV). Acquirer = merchant's bank, issuer = cardholder's bank. Digital signature = non-repudiation. EDI standards = ANSI X12 and UN/EDIFACT. Warehouse = subject-oriented, integrated, time-variant, non-volatile.

## Quick Revision Sheet

1. IoT term coined by **Kevin Ashton** (MIT Auto-ID Center, 1999).
2. IoT data capture = **sensors** (input); **actuators** = output/action. IoT devices are resource constrained: low power, low processing, low memory.
3. IPv6 is best for IoT (128-bit). 6LoWPAN = IPv6 over 802.15.4.
4. IoT layers: Perception -> Network -> Application (3-layer); 5-layer adds Processing and Business.
5. **MQTT = Message Queuing Telemetry Transport**: TCP, pub/sub, broker, port 1883. **CoAP = Constrained Application Protocol**: UDP, RESTful, port 5683.
6. ZigBee = IEEE 802.15.4: low power, low data rate, low range; **Coordinator** (one per network, forms it), **Router** (relays), **End device** (sleeps, no routing).
7. RFID = object identification; tag + reader; passive tags have no battery; NFC is 13.56 MHz, about 4 cm.
8. MISO = Master In Slave Out (SPI); MOSI = Master Out Slave In.
9. BLE = low-power Bluetooth; LoRa = long range low power sub-GHz LPWAN (2-15 km).
10. IoT resource management uses protocols and algorithms; clustering, software agents and synchronization overcome the challenges. Industry 4.0 = IoT + CPS + real-time data.
11. NIST cloud: 5 characteristics (on-demand self-service, broad network access, resource pooling, rapid elasticity, measured service), 3 service models, 4 deployment models.
12. IaaS = EC2/Azure VM; PaaS = Google App Engine/Heroku; SaaS = Gmail/Salesforce/MS 365.
13. Public, private, hybrid (both), community (shared by organisations with common interest).
14. Type 1 hypervisor = bare metal (ESXi, Hyper-V, Xen, KVM); Type 2 = hosted (VirtualBox, VMware Workstation).
15. Big data 5 Vs: Volume, Velocity, Variety, Veracity, Value. Hadoop = HDFS (storage, block 128 MB, replication 3) + MapReduce (processing) + YARN.
16. Blockchain = chain of hash-linked blocks; Bitcoin by Satoshi Nakamoto; 21 million cap; PoW; SHA-256; first block = Genesis.
17. Mobile: 1G analog, 2G digital (GSM, SMS), 3G video/broadband, 4G LTE all-IP, 5G ~1 ms latency. Hard handoff = break before make; soft = make before break (CDMA).
18. GSM = TDMA and SIM; CDMA = spread spectrum, soft handoff. Android = Linux based (Google); iOS = Apple.
19. E-commerce four types: B2B, B2C, C2C, C2B; G2C = government to citizen. Amazon B2C, OLX C2C, Alibaba/IndiaMART B2B.
20. EDI = standard electronic exchange of business documents. SSL/TLS -> https, port 443, certificates from a CA.
21. UPI = NPCI, 2016, VPA, UPI PIN, 24x7, built on IMPS. RuPay = NPCI card network. Debit = instant deduction; credit = pay later.
22. Digital India: 1 July 2015, 9 pillars; DigiLocker, UMANG, BharatNet, BHIM, Aadhaar, GeM, eKranti.
23. Green computing = energy saving, Energy Star, e-waste recycling, virtualization. IT Act 2000 governs cyber law in India.
24. Generations: vacuum tube -> transistor -> IC -> microprocessor (VLSI) -> AI (ULSI). Babbage = father of computer; Ada Lovelace = first programmer; ENIAC 1946; UNIVAC first commercial.
25. 1 byte = 8 bits; 1 KB = 1024 B; 1 nibble = 4 bits; n bits = 2ⁿ values. Ctrl+Y redo, Ctrl+H replace, F12 Save As, Ctrl+Z undo.
26. IoT middleware = layer between devices and apps (device management, protocol translation, rules engine). Modbus = master-slave, RTU/ASCII/TCP (port 502), up to 247 slaves, no built-in security.
27. IIoT = IoT for industry/Industry 4.0 (SCADA, PLC, predictive maintenance); needs real-time reliability and safety. Edge/fog fixes cloud latency; NB-IoT/LTE-M/5G mMTC for cellular IoT.
28. IoT security: CIA triad; Mirai = default-password DDoS botnet; use TLS/DTLS, secure OTA updates, lightweight crypto. Privacy laws: DPDP Act 2023, GDPR.
29. E-commerce framework: applications -> common services -> messaging (EDI, mail) -> content publishing -> network infrastructure. Intranet = private, extranet = partners, VPN = encrypted tunnel.
30. Firewall types: packet filter (network layer), stateful, circuit-level, application proxy (most secure), NGFW. DMZ holds public servers. Digital signature = authentication + integrity + non-repudiation.
31. Smart card = embedded microprocessor chip (EMV, ISO 7816; contactless ISO 14443). Credit card: acquirer = merchant's bank, issuer = customer's bank. Digital tokens: cash-like (e-cash, blind signature, anonymity) vs check-like (e-cheque).
32. EDI standards ANSI X12 and UN/EDIFACT; VAN; supports JIT. Digital library: metadata, DOI, NDLI, INFLIBNET, Shodhganga. Data warehouse = subject-oriented, integrated, time-variant, non-volatile; ETL; star schema; OLAP roll-up/drill-down/slice/dice/pivot.
