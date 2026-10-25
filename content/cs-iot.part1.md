# IoT, Cloud, E-Commerce & ICT

> The exam asks 6-10 questions from this topic per paper. IoT is the favourite (who coined it, MQTT full form, ZigBee coordinator/router/end device, RFID, sensors vs actuators, IPv6, resource management, limiting factors, "which is NOT true" statements, Industry 4.0). Then e-commerce models (B2B/B2C), cloud service models (IaaS/PaaS/SaaS), and general computer fundamentals (generations, memory units, shortcuts, inventors). Mostly one-line factual MCQs.

## 1. Internet of Things: Basics and Architecture

### Definition and origin
- **IoT** = a network of physical objects ("things") embedded with **sensors, software, processors and connectivity** that collect and exchange data over the Internet with little or no human intervention.
- Term coined by **Kevin Ashton** (British technologist, co-founder of the MIT **Auto-ID Center**) in **1999**, while presenting RFID-based supply chain work at Procter & Gamble. (Exam spelling: "Kevin Aston" - answer is him, not Steve Jobs or Bill Simpson.)
- Related: M2M (machine-to-machine), CPS (cyber-physical systems), **Industry 4.0** = IoT + real-time data + cyber-physical systems + AI/big data (the "4th Industrial Revolution"; 1st steam, 2nd electricity/mass production, 3rd electronics/automation).
- Each thing needs a unique identity: **IPv6** is the most suitable IP version for IoT (128-bit address, about 3.4 × 10³⁸ addresses; IPv4 has only 2³² ≈ 4.3 billion). 6LoWPAN = IPv6 over Low-power Wireless Personal Area Networks (IEEE 802.15.4).

### Characteristics
- Connectivity, sensing, intelligence (analytics), unique identity, dynamic/self-adapting, heterogeneity of devices, scale (billions of devices), security needs, low-power operation.

### Basic building blocks (the 4 stages of an IoT system)
```
Sensors/Devices -> Connectivity (gateway/network) -> Data processing (cloud/edge) -> User interface / action
 (collect data)     (transmit data)                   (analytics, rules)            (app, dashboard, actuator)
```
- **Sensor**: converts a physical quantity into an electrical signal (input device). *To capture data from the real world IoT uses sensors.*
- **Actuator**: converts an electrical signal into physical action (output device): motor, relay, valve, buzzer, solenoid, heater.
- Memory trick: **Sensor = senses (input); Actuator = acts (output).**

| Sensor | Measures |
|---|---|
| Thermistor / LM35 / DHT11 | temperature (DHT11 also humidity) |
| LDR (Light Dependent Resistor) | light intensity |
| PIR | motion (infrared from bodies) |
| Ultrasonic (HC-SR04) | distance |
| Gas sensor (MQ series) | gas / smoke |
| Accelerometer / Gyroscope | motion, orientation |
| Proximity / IR | presence of object |
| Pressure, Hall effect, soil moisture | pressure, magnetic field, water |

- Microcontroller (Arduino, ESP8266/ESP32, PIC) vs single-board computer (**Raspberry Pi**, runs full OS). Arduino = open-source board with ATmega328P (Uno). Raspberry Pi = ARM based SBC with GPIO pins. IoT devices use **microcontrollers**, sensors, actuators and wireless technology; a statement such as "IoT is fully safe" is FALSE (security is a major concern).

### IoT architecture layers
**3-layer model (basic):**
1. **Perception (Sensing/Device) layer**: sensors, actuators, RFID tags. Collects data.
2. **Network (Transmission) layer**: gateways, Wi-Fi, Bluetooth, ZigBee, cellular; transfers data.
3. **Application layer**: delivers services (smart home, health) to the user.

**5-layer model:** Perception -> Transport -> **Processing (Middleware)** -> Application -> **Business** layer.

**Common practical model (4 stage):** Things -> Gateway -> Cloud/Data centre -> Applications.

- **Gateway**: bridge between local sensor networks (ZigBee, BLE, LoRa, Modbus) and the Internet/cloud. Does protocol translation, data filtering/aggregation, local (edge) processing and security.
- **Edge computing**: processing close to the device (low latency, saves bandwidth). **Fog computing**: intermediate layer between edge and cloud. **Cloud**: heavy storage and analytics.

**⚡ Exam tip:** "Who coined IoT?" -> Kevin Ashton (1999). "Which IP is best for IoT?" -> IPv6. "Which is NOT true about IoT?" -> the option claiming it is "fully safe". Sensors capture data; actuators perform actions.

## 2. IoT Protocols and Wireless Technologies

### Application-layer protocols

| Protocol | Full form / nature | Transport | Key facts |
|---|---|---|---|
| **MQTT** | **Message Queuing Telemetry Transport** | TCP | **Publish/subscribe** via a **broker**; very lightweight; designed by IBM (Andy Stanford-Clark, Arlen Nipper, 1999); ports 1883 (8883 secure); QoS 0,1,2 |
| **CoAP** | **Constrained Application Protocol** | **UDP** | RESTful (GET/POST/PUT/DELETE) like HTTP but binary, light; for constrained devices; port 5683; supports multicast |
| **HTTP** | Hypertext Transfer Protocol | TCP | Request/response; heavy headers; not ideal for tiny devices |
| AMQP | Advanced Message Queuing Protocol | TCP | Enterprise messaging, reliable queues |
| XMPP | Extensible Messaging and Presence Protocol | TCP | XML based chat/presence |
| DDS | Data Distribution Service | UDP/TCP | real-time, publish/subscribe |

- MQTT roles: **publisher** (sensor) -> **broker** (server) -> **subscriber** (app), organised by **topics**. Many-to-many, decoupled.
- MQTT = TCP + pub/sub; CoAP = UDP + request/response (REST).
- Examples of MQTT brokers: Mosquitto, HiveMQ.

### ZigBee (IEEE 802.15.4)
- Wireless **WPAN** standard for **low power, low data rate, short range (10-100 m)**, low cost. All three of "low power", "low data rate", "low range" are TRUE for ZigBee.
- Bands: 2.4 GHz (global, 250 kbps), 915 MHz (Americas), 868 MHz (Europe). Supports mesh, star and cluster-tree topologies. Uses 128-bit AES security.
- Three device types:

| Device | Role |
|---|---|
| **Coordinator (ZC)** | Exactly **one per network**; starts/forms the network, chooses channel and PAN ID, stores network info, acts as trust centre. The most capable (FFD). Also "transfers data between devices" in exam wording. |
| **Router (ZR)** | Full-function device; **relays/routes** data between nodes, extends range, allows other devices to join; can also sense. |
| **End device (ZED)** | Reduced-function device (RFD); sensor/actuator node; talks only to its parent (coordinator/router); **sleeps** to save battery; cannot route. |

- FFD = Full Function Device (coordinator, router); RFD = Reduced Function Device (end device).
- Typical uses: smart home lighting, smart meters, industrial monitoring.

### RFID (Radio Frequency Identification)
- Used for **automatic object identification** and tracking (not for providing Wi-Fi or measuring signal strength).
- Components: **Tag** (transponder; antenna + chip with unique ID), **Reader** (interrogator), back-end database/middleware.
- **Passive tags**: no battery, powered by reader's field, short range (cm to few m), cheapest. **Active tags**: own battery, long range (up to 100 m), costlier. **Semi-passive**: battery for chip only.
- Frequencies: LF 125-134 kHz, HF 13.56 MHz, UHF 860-960 MHz, microwave 2.45 GHz.
- **NFC** = subset of HF RFID (13.56 MHz), range about 4 cm; used in contactless payment and tap-to-pair.
- Uses: toll (FASTag in India uses RFID), library books, attendance, inventory, passports, animal tagging.
- RFID module (e.g., RC522) talks to a microcontroller via **SPI** whose pins are: **MOSI** (Master Out Slave In), **MISO** (**Master In Slave Out**), **SCK** (clock), **SS/SDA** (slave/chip select). So MISO = data line from the RFID module (slave) to the microcontroller (master).

### Other short-range / LPWAN technologies

| Technology | Key facts |
|---|---|
| **Bluetooth** (IEEE 802.15.1) | 2.4 GHz ISM, range about 10 m (class 2), piconet (1 master + up to 7 active slaves), scatternet |
| **Bluetooth Low Energy (BLE, Bluetooth 4.0+)** | very low power, coin cell battery for years, short bursts, beacons, wearables, fitness bands |
| **Wi-Fi** (IEEE 802.11) | high data rate, higher power; 2.4/5 GHz |
| **LoRa / LoRaWAN** | **Long Range**, low power, low bit rate; sub-GHz (865-867 MHz in India); 2-15 km; chirp spread spectrum; star-of-stars topology (devices -> gateways -> network server) |
| **Sigfox, NB-IoT** | other LPWAN options (NB-IoT works on licensed cellular spectrum) |
| **Z-Wave** | sub-GHz home automation mesh |
| **6LoWPAN** | IPv6 over 802.15.4 |
| Cellular (2G/3G/4G/5G) | wide area; costlier power |

Range ladder (short -> long): NFC (4 cm) < RFID passive < Bluetooth (10 m) < ZigBee (10-100 m) < Wi-Fi (about 50-100 m) < LoRa (km) < Cellular.
Data-rate ladder (low -> high): LoRa/Sigfox < ZigBee (250 kbps) < BLE (about 1-2 Mbps) < Bluetooth classic (about 3 Mbps) < Wi-Fi.

**⚡ Exam tip:** MQTT full form = **Message Queuing Telemetry Transport** (not "Things"; the paper's distractors are "Message Queue Telemetry Things"). CoAP runs on UDP, MQTT on TCP. ZigBee coordinator = one per network and forms it; router relays; end device sleeps. MISO = Master In Slave Out.

## 3. IoT Platforms, Resource Management, Applications, Challenges

### IoT platform
- Middleware that connects devices to applications: device management, connectivity, data storage, analytics, visualisation, security.
- Examples: AWS IoT Core, Microsoft Azure IoT Hub, Google Cloud IoT, IBM Watson IoT, ThingSpeak, Blynk, Thingsboard, Cisco Jasper.

### Resource management in IoT
- IoT devices are resource-constrained (energy, CPU, memory, bandwidth). Resource management covers **discovery, allocation, scheduling, load balancing, and energy management**.
- It is done by implementing **protocols and algorithms** (both).
- Challenges of resource management are overcome using **clustering, software agents and synchronization techniques** (all three; "Cluster, Software agent and Synchronization techniques" is the full answer).
- **Limiting factors of IoT devices:** low power (battery), low processing power, low memory (all of the above).

### Applications
- **Smart home** (lights, thermostats, security cameras), **smart city** (traffic, street lighting, waste, parking), **healthcare** (wearables, remote patient monitoring), **agriculture** (soil moisture, drip irrigation, drones), **industry (IIoT)** (predictive maintenance), **smart grid / smart meters**, **logistics/supply chain** (RFID tracking, cold chain), **connected vehicles**, **retail**, **wearables**, environmental monitoring (air, water, disaster).

### Advantages / challenges

| Advantages | Challenges |
|---|---|
| Automation, efficiency, cost saving | **Security & privacy** (hacking, botnets like Mirai) |
| Real-time monitoring and data driven decisions | Interoperability / lack of standards |
| Better resource use, energy saving | Limited power, memory, processing |
| Improved quality of life, remote control | Scalability, huge data (big data), network reliability |
| New business models | Cost, heterogeneity, legal/ethical issues, job impact |

**⚡ Exam tip:** Statement questions on IoT: "uses microcontrollers / sensors and actuators / wireless technology" are TRUE; "fully safe" is FALSE. Resource management -> "protocols and algorithms"; limiting factors -> "all of the above".

## 4. Cloud Computing

### Definition and NIST model
- **Cloud computing** = on-demand delivery of computing resources (servers, storage, databases, networking, software) over the Internet on a **pay-as-you-go** basis. Defined by **NIST** (US National Institute of Standards and Technology).
- **Five essential characteristics (NIST):**
  1. **On-demand self-service**
  2. **Broad network access**
  3. **Resource pooling** (multi-tenancy)
  4. **Rapid elasticity** (scale up/down quickly)
  5. **Measured service** (metering, pay per use)
- **Three service models**, **four deployment models**.

### Service models

| Model | You get | Provider manages | Examples |
|---|---|---|---|
| **IaaS** (Infrastructure as a Service) | virtual machines, storage, network | hardware, virtualization | Amazon EC2/S3, Microsoft Azure VMs, Google Compute Engine, DigitalOcean |
| **PaaS** (Platform as a Service) | platform to build/deploy apps (runtime, DB, tools) | OS, middleware, runtime | Google App Engine, AWS Elastic Beanstalk, Heroku, Azure App Service, Red Hat OpenShift |
| **SaaS** (Software as a Service) | ready-to-use software via browser | everything | Gmail, Google Docs/Workspace, Microsoft 365, Salesforce, Dropbox, Zoom |

- Control (user -> provider): IaaS (most user control) -> PaaS -> SaaS (least control, least effort).
- Others: **DaaS** (Desktop), **FaaS / Serverless** (AWS Lambda), **STaaS** (Storage), **XaaS**.
- Stack memory: SaaS = end users, PaaS = developers, IaaS = system administrators/IT architects.

### Deployment models

| Model | Description |
|---|---|
| **Public cloud** | owned by provider, shared by many customers over Internet (AWS, Azure, Google Cloud); cheapest, least control |
| **Private cloud** | used by a single organisation (on-premises or hosted); most secure/control, costly |
| **Hybrid cloud** | combination of public + private with data/app portability; cloud bursting |
| **Community cloud** | shared by several organisations with common concerns (e.g., government departments, universities, banks) |

### Virtualization
- **Virtualization** = creating a virtual (software) version of hardware: multiple **virtual machines (VMs)** run on a single physical machine. Foundation of cloud.
- **Hypervisor** (Virtual Machine Monitor, VMM) = software that creates and runs VMs, allocating CPU/RAM.
  - **Type 1 (bare-metal / native)**: runs directly on hardware. Examples: VMware ESXi, Microsoft Hyper-V, Xen, KVM. Used in data centres; better performance.
  - **Type 2 (hosted)**: runs on a host OS. Examples: Oracle VirtualBox, VMware Workstation, Parallels.
- Types: server, storage, network, desktop, OS-level (containers: Docker, Kubernetes for orchestration).
- Container vs VM: containers share the host OS kernel (light, fast); VMs each have a full guest OS.

### Benefits and risks

| Benefits | Risks / Limitations |
|---|---|
| Low upfront cost (CapEx -> OpEx), pay-per-use | Data security and privacy |
| Scalability and elasticity | Internet dependency, downtime/outages |
| Accessibility from anywhere, collaboration | Vendor lock-in |
| Automatic updates/backup, disaster recovery | Limited control, compliance/legal (data location) |
| Fast deployment | Latency, hidden/long-term costs |

**⚡ Exam tip:** Gmail = SaaS; Google App Engine/Heroku = PaaS; EC2 = IaaS. Hybrid = public + private. Type 1 hypervisor = bare metal. NIST lists 5 characteristics, 3 service models, 4 deployment models.

## 5. Big Data and Blockchain Basics

### Big data
- **Big data** = datasets so large, fast or varied that traditional tools cannot store/process them. Types: **structured** (RDBMS tables), **semi-structured** (XML, JSON), **unstructured** (text, images, video).
- **5 Vs:** **Volume** (size), **Velocity** (speed of generation/processing), **Variety** (formats), **Veracity** (accuracy/trustworthiness), **Value** (usefulness). Original 3 Vs = Volume, Velocity, Variety (Doug Laney).
- **Hadoop** (Apache, created by Doug Cutting and Mike Cafarella, named after a toy elephant; written in **Java**): open-source framework for distributed storage and processing on commodity hardware clusters.
  - **HDFS** (Hadoop Distributed File System): storage; master **NameNode** (metadata) + slave **DataNodes** (blocks); default block size 128 MB; default replication factor 3.
  - **MapReduce**: programming model: **Map** (split and process into key-value pairs) -> shuffle/sort -> **Reduce** (aggregate). Input split, processed in parallel.
  - **YARN**: resource manager/scheduler.
  - Ecosystem: Hive (SQL-like), Pig (scripting), HBase (NoSQL), Spark (in-memory processing), Sqoop, Flume, Kafka.
- NoSQL examples: MongoDB, Cassandra, HBase. Data warehouse vs data lake. Data mining = discovering patterns in large data.
- IoT generates big data; cloud provides the storage/compute.

### Blockchain basics
- **Blockchain** = a distributed, decentralised, **immutable digital ledger** of transactions stored in linked **blocks**, secured with cryptography; no central authority.
- Introduced by **Satoshi Nakamoto** (pseudonym) in the 2008 whitepaper; first used for **Bitcoin** (network launched January 2009).
- A **block** contains: transactions (data), **timestamp**, **hash** of itself, **hash of the previous block**, and a **nonce**. The first block is the **Genesis block**. Changing one block changes its hash and breaks all later links -> tamper-evident.
```
[Block 0 Genesis] <- prev hash <- [Block 1] <- prev hash <- [Block 2] ...
```
- **Hash**: fixed-length digest (SHA-256 used by Bitcoin). **Consensus**: nodes agree on state. **Proof of Work (PoW)** = miners solve a computational puzzle (find a nonce) to add a block; **Proof of Stake (PoS)** = validators chosen by stake (Ethereum now).
- **Miners / mining**: validate transactions and earn newly created coins + fees. **Wallet**: stores private/public keys (not coins themselves). **Public key** = address; **private key** signs transactions.
- **Smart contract**: self-executing code on the blockchain (**Ethereum**, by Vitalik Buterin).
- Types: **public** (Bitcoin, Ethereum), **private**, **consortium**, hybrid.
- Features: decentralisation, transparency, immutability, security, traceability. Uses: cryptocurrency, supply chain, land records, healthcare records, voting, smart contracts.

**⚡ Exam tip:** 5 Vs = Volume, Velocity, Variety, Veracity, Value. Hadoop = HDFS + MapReduce (+ YARN). Blockchain links blocks by the previous block's hash; Satoshi Nakamoto created Bitcoin.
