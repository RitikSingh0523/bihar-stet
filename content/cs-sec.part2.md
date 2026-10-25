
## 5. Modern Ciphers, Hashing, Signatures and PKI

### Symmetric block ciphers

| | DES | 3DES | AES |
|---|---|---|---|
| Block size | 64 bits | 64 bits | **128 bits** |
| Key size | 56 bits (64 with 8 parity) | 112 or 168 bits (effective 112) | **128 / 192 / 256 bits** |
| Rounds | 16 | 48 (3×16) | **10 / 12 / 14** |
| Structure | Feistel network | 3 DES passes (E-D-E, 2 or 3 keys) | Substitution-permutation network (Rijndael) |
| Status | Broken (brute force) | Deprecated, slow | Current standard (NIST 2001) |

- **DES** (IBM Lucifer, adopted 1977): initial permutation → 16 Feistel rounds, each using a 48-bit subkey and **8 S-boxes** (6 bits in → 4 bits out) → final permutation. Same algorithm for decryption with subkeys reversed.
- **3DES**: C = E(K3, D(K2, E(K1, P))).
- **AES** (Rijndael by Rijmen and Daemen): state = 4×4 byte matrix. Each round: **SubBytes** (S-box), **ShiftRows**, **MixColumns**, **AddRoundKey**. The last round omits MixColumns; an initial AddRoundKey is applied first.
- Key counts: 2⁵⁶ for DES, 2¹²⁸ for AES-128.
- **Modes of operation**: ECB (identical blocks → identical ciphertext, insecure), CBC (chaining with IV), CFB, OFB, CTR.
- Other: Blowfish (64-bit block, 32-448 bit key), RC4 (stream cipher), IDEA (128-bit key, 64-bit block).

### Asymmetric: RSA
Rivest-Shamir-Adleman (1977); security rests on difficulty of **factoring** large integers.
```
1. Choose primes p, q          2. n = p·q
3. φ(n) = (p−1)(q−1)           4. Choose e with gcd(e, φ) = 1, 1 < e < φ
5. d = e⁻¹ mod φ  (e·d ≡ 1 mod φ)
Public key = (e, n)   Private key = (d, n)
Encrypt: C = M^e mod n        Decrypt: M = C^d mod n
```
Worked example: p = 3, q = 11 → n = 33, φ = 2·10 = 20. Pick e = 7; d = 3 since 7·3 = 21 ≡ 1 (mod 20).
```
M = 2:   C = 2^7 mod 33 = 128 mod 33 = 29
Decrypt: 29^3 mod 33 = (−4)^3 = −64 ≡ 2 (mod 33)  → M = 2 ✓
```
Classic textbook: p = 61, q = 53 → n = 3233, φ = 3120, e = 17, d = 2753; M = 65 → C = 2790.
- RSA key sizes today: 2048 bits or more. Message must be < n.

### Diffie-Hellman key exchange
Lets two parties create a **shared secret over an insecure channel** (it does not encrypt data itself; vulnerable to MITM without authentication). Public: prime p and generator g.
```
p = 23, g = 5
Alice picks a = 6 → A = g^a mod p = 5^6 mod 23 = 8
Bob   picks b = 15 → B = g^b mod p = 5^15 mod 23 = 19
Alice: K = B^a mod p = 19^6 mod 23 = 2
Bob:   K = A^b mod p = 8^15 mod 23 = 2     shared key = 2
```
Security: discrete logarithm problem. Elliptic Curve Cryptography (ECC) gives same strength with smaller keys.

### Hash functions
- **Hash**: one-way function mapping any-length input to fixed-length **digest**; no key, cannot be reversed. Properties: pre-image resistance, second pre-image resistance, collision resistance, avalanche effect.
- Used for **integrity**, password storage (with salt), digital signatures.

| Algorithm | Digest | Block | Status |
|---|---|---|---|
| MD5 | 128 bits | 512 | Broken (collisions) |
| SHA-1 | 160 bits | 512 | Deprecated |
| SHA-256 | 256 bits | 512 | Secure |
| SHA-512 | 512 bits | 1024 | Secure |
| SHA-3 | 224-512 | - | Keccak sponge, latest |

- **HMAC** = hash + secret key (message authentication code, gives integrity + authentication). **MAC** needs shared key.
- Hashing ≠ encryption: hashing is irreversible.

### Digital signature
- Sender hashes the message, **encrypts the hash with their private key** → signature. Receiver decrypts with sender's **public key** and compares with own hash of message.
- Provides **authentication, integrity, non-repudiation** (not confidentiality). Algorithms: RSA, DSA, ECDSA.
- Indian IT Act: digital signature uses asymmetric crypto and hash function (section 3, later electronic signature under 3A).

### Certificates and PKI
- **Digital certificate (X.509)** binds a public key to an identity; contains subject name, public key, issuer (CA), serial number, validity period, signature of CA.
- **Certifying Authority (CA)** issues certificates; **Registration Authority (RA)** verifies identities; **CRL / OCSP** revoke; **Root CA** at top of **chain of trust**. In India, the Controller of Certifying Authorities (CCA) licenses CAs.
- **PKI** = policies, hardware, software and people to create, manage, distribute, revoke certificates. Components: CA, RA, certificate repository, CRL, end entities.
- Certificate classes (Class 1/2/3) in India: Class 3 for high assurance (e-filing, tenders).

**⚡ Exam tip:** AES = 128-bit block with 128/192/256-bit key; DES = 64-bit block and 56-bit key. RSA = factoring; DH = key exchange only. Digital signature: sign with PRIVATE key, verify with PUBLIC key; encryption: encrypt with PUBLIC key.

## 6. Authentication, Access Control and Network Security Tools

### Authentication
- Factors: **something you know** (password, PIN), **something you have** (OTP token, smart card, phone), **something you are** (biometrics: fingerprint, iris, face). Also location, behaviour.
- **2FA / MFA**: two or more different factors (password + OTP). Two passwords is NOT 2FA. OTP types: TOTP (time-based), HOTP (counter-based).
- Good password: long, mixed, unique, passphrase, password manager. **Salt** = random value added before hashing a password. **CAPTCHA** distinguishes humans from bots. **Single sign-on (SSO)**, **Kerberos** (ticket-based), **Biometric errors**: FAR (false accept rate), FRR (false reject rate).

### Access control

| Model | Idea |
|---|---|
| **DAC** (Discretionary) | Owner decides who can access (Windows/Unix file permissions) |
| **MAC** (Mandatory) | System-enforced labels/clearance (Top Secret, Secret...), used in military |
| **RBAC** (Role-based) | Access by job role (admin, teller, student) |
| **ABAC** | Based on attributes/policies |
- Principle of **least privilege**, **need-to-know**, separation of duties. **Access Control List (ACL)**: list of permissions on an object. Capability list is per subject.

### Firewalls
**Firewall**: hardware/software that filters traffic between trusted (internal) and untrusted (internet) networks according to rules; primary function: **prevent unauthorised access to/from a private network**.

| Type | Works at | Feature |
|---|---|---|
| **Packet-filtering** | Network/Transport (L3-4) | Checks IP, port, protocol per packet; stateless, fast, weakest |
| **Stateful inspection** | L3-4 | Tracks connection state/table |
| **Circuit-level gateway** | Session (L5) | Validates TCP handshake |
| **Application-level / Proxy** | Application (L7) | Inspects content, hides internal hosts, slowest, most secure |
| **NGFW** | L3-7 | Deep packet inspection, IPS, app awareness |
- **DMZ (demilitarised zone)**: subnet between two firewalls hosting public servers (web, mail). A firewall cannot stop insider attacks, malware on allowed channels, or attacks bypassing it.

### IDS and IPS

| | IDS | IPS |
|---|---|---|
| Action | Detects and **alerts** (passive, out-of-band) | Detects and **blocks** (inline, active) |
- Types: **NIDS/NIPS** (network) vs **HIDS/HIPS** (host). Methods: **signature-based** (known attacks, misses zero-day) and **anomaly-based** (deviation from normal; false positives). **Honeypot** = decoy system to lure and study attackers.

### VPN
- **Virtual Private Network**: encrypted **tunnel** over public internet that securely connects remote users/sites. Gives confidentiality, integrity, authentication. Types: remote-access and site-to-site. Protocols: IPSec, SSL/TLS VPN, PPTP, L2TP, OpenVPN.

### SSL/TLS
- **SSL** (Netscape) → **TLS** (IETF; TLS 1.2, 1.3 current; SSL is obsolete). Works between application and transport layers (above TCP); secures HTTP → **HTTPS (port 443)**. Provides encryption, server authentication (certificate), integrity (MAC).
- **Handshake**: hello messages (versions, cipher suites, random numbers) → server certificate → key exchange (session key) → Finished; then symmetric encryption of data. Padlock icon and `https://`.
- Other secure protocols: **SSH** (port 22, replaces Telnet), **SFTP**, **S/MIME** and **PGP** (email), **SET** (card payments).

### IPSec
- Security at the **Network layer (IP)**; protects every IP packet. Components: **AH** (Authentication Header: integrity + authentication, no encryption), **ESP** (Encapsulating Security Payload: encryption + optionally authentication), **IKE** (key exchange/SA setup). Modes: **Transport** (encrypts payload only, host-to-host) and **Tunnel** (encrypts whole original packet, new IP header, used in VPN gateway).

### Wireless security

| Protocol | Cipher | Status |
|---|---|---|
| **WEP** | RC4, 40/104-bit key, 24-bit IV | Broken |
| **WPA** | RC4 with TKIP | Interim, weak |
| **WPA2** | **AES-CCMP** | Standard for years |
| **WPA3** | SAE (stronger handshake), 192-bit option | Latest |
- Tips: change default password, hide/disable WPS, MAC filtering (weak), disable SSID broadcast (weak), use WPA2/3. Attacks: evil twin, rogue AP, war driving, Bluetooth attacks (bluejacking = unsolicited messages, bluesnarfing = data theft).

**⚡ Exam tip:** Firewall = prevents unauthorised access; IDS detects, IPS prevents. WEP is weakest, WPA2 uses AES. IPSec works at network layer; TLS at transport/application boundary. HTTPS uses port 443.

## 7. Backup, Recovery and Risk Management

### Backup and recovery
- **Backup**: copy of data stored separately to restore after loss. **3-2-1 rule**: 3 copies, 2 media, 1 off-site.

| Type | Copies | Restore needs |
|---|---|---|
| **Full** | All data | Only the last full (slowest backup, fastest restore) |
| **Incremental** | Changes since last backup (any type) | Last full + all incrementals (fastest backup, slowest restore) |
| **Differential** | Changes since last **full** | Last full + last differential |
- **Disaster Recovery Plan (DRP)** restores IT systems; **Business Continuity Plan (BCP)** keeps business running. **RPO** (Recovery Point Objective: acceptable data loss time) and **RTO** (Recovery Time Objective: acceptable downtime). Sites: **hot** (ready), **warm**, **cold** (empty space).
- **RAID** gives redundancy (RAID 1 mirroring, RAID 5 parity) but is **not** a backup. Also: UPS, patch management, cloud backup, encrypted backups, test restores.

### Risk management
- Steps: **identify assets → identify threats and vulnerabilities → assess risk (likelihood × impact) → treat risk → monitor/review**.
- Risk treatment: **Mitigate/reduce** (apply controls), **Transfer** (insurance, outsourcing), **Avoid** (stop the activity), **Accept** (tolerate residual risk).
- **Quantitative** (money: SLE = AV × EF, ALE = SLE × ARO) vs **Qualitative** (high/medium/low).
- **Security policy**, **audit**, **penetration testing** (authorised simulated attack), **vulnerability assessment**. Standards: **ISO/IEC 27001** (ISMS), ISO 27002, PCI-DSS (cards), HIPAA (health).
- Defence in depth: layered security (physical, network, host, app, data).

**⚡ Exam tip:** Incremental = smallest backup, longest restore. Differential = changes since last FULL backup. Risk can be reduced, transferred, avoided or accepted.

## 8. Cyber Law: IT Act 2000 and Cyber Crimes

### Background
- **Information Technology Act, 2000** (India): came into force **17 October 2000**; based on **UNCITRAL Model Law on Electronic Commerce (1996)**. Gives legal recognition to electronic records and digital signatures, enables e-governance, defines cyber offences.
- **IT (Amendment) Act, 2008**: effective **27 October 2009**; added electronic signatures (3A), identity theft, cyber terrorism, child pornography, data protection (43A), CERT-In; removed the ₹1 crore cap on compensation for damage and gave intermediaries safe harbour (79).
- **IT Act amends**: IPC, Indian Evidence Act, Banker's Books Evidence Act, RBI Act. Digital Personal Data Protection Act **2023** is the newer privacy law. New criminal codes (BNS) replaced IPC from 2024.
- Authorities: **Controller of Certifying Authorities (CCA)** (Sec 17), **Adjudicating Officer** (Sec 46; claims up to ₹5 crore), **Cyber Appellate Tribunal** (now TDSAT, Sec 48), **CERT-In** (Sec 70B; national nodal agency for incidents), **NCIIPC** (protected systems, Sec 70A).

### Important sections and punishments

| Section | Offence | Punishment |
|---|---|---|
| 43 | Unauthorised access, data theft, virus introduction, damage, DoS | **Civil**: compensation/damages |
| 43A | Failure to protect sensitive personal data by body corporate | Compensation |
| 65 | Tampering with computer **source documents** | Up to **3 years** or fine up to ₹2 lakh, or both |
| 66 | Computer-related offences (dishonest/fraudulent act in Sec 43) = **hacking** | Up to **3 years** or fine up to ₹5 lakh, or both |
| 66A | Offensive messages | **Struck down** by Supreme Court in **Shreya Singhal v. Union of India (2015)** |
| 66B | Dishonestly receiving stolen computer resource | Up to 3 years or ₹1 lakh |
| 66C | **Identity theft** (password, e-signature misuse) | Up to 3 years + fine up to ₹1 lakh |
| 66D | **Cheating by personation** using computer | Up to 3 years + fine up to ₹1 lakh |
| 66E | Violation of **privacy** (capturing private images) | Up to 3 years or ₹2 lakh |
| 66F | **Cyber terrorism** | **Life imprisonment** |
| 67 | Publishing **obscene** material electronically | First: up to 3 yrs + ₹5 lakh; repeat: up to 5 yrs + ₹10 lakh |
| 67A | **Sexually explicit** material | First: up to 5 yrs + ₹10 lakh; repeat: up to 7 yrs + ₹10 lakh |
| 67B | **Child pornography** | First: up to 5 yrs + ₹10 lakh; repeat: up to 7 yrs + ₹10 lakh |
| 69 | Government power to intercept/monitor/decrypt | Up to 7 years + fine (for non-compliance) |
| 70 | Unauthorised access to **protected system** | Up to **10 years** + fine |
| 72 | Breach of confidentiality and privacy | Up to 2 years or ₹1 lakh |
| 72A | Disclosure of information in breach of lawful contract | Up to 3 years or ₹5 lakh |
| 73, 74 | Publishing false/fraudulent digital signature certificate | Up to 2 years or ₹1 lakh |
| 79 | Intermediary liability (safe harbour if due diligence) | - |

- Sec 3: authentication by digital signature; Sec 4: legal recognition of electronic records; Sec 5 (old): digital signatures; Sec 10A: validity of contracts by electronic means.
- Under the Act, a **computer** covers any electronic/optical data device; offences committed abroad are covered if involving a computer in India (Sec 75).

### Cyber crimes
- **Cyber crime**: crime using a computer/network as tool, target, or both. Examples: hacking, phishing, identity theft, cyberstalking (repeated online harassment), **cyberbullying**, **cyber defamation**, **online fraud/credit card fraud**, **salami attack** (many tiny amounts skimmed), **data diddling** (altering data before entry), **email bombing**, **spamming**, **software piracy**, **cyber squatting** (registering a domain similar to a trademark), **cyber terrorism**, **web jacking**, **logic bomb**, **Trojan**, **child pornography**, **sextortion**, **ATM skimming**, **vishing**.
- Reporting: National Cyber Crime Reporting Portal (cybercrime.gov.in), helpline **1930**. Cyber forensics: preserve evidence, hash images, chain of custody.

**⚡ Exam tip:** Remember: 66 = hacking, 66C = identity theft, 66D = cheating by personation, 66E = privacy, 66F = cyber terrorism (life), 67 = obscene, 67B = child porn, 70 = protected system, 43 = civil compensation. 66A was scrapped in 2015.

## 9. Intellectual Property Rights, Plagiarism and Open Source

### IPR
- **IPR**: legal rights over creations of the mind. Software protection: copyright (code), patent (limited), trade secret.

| Right | Protects | Duration (India) | Law |
|---|---|---|---|
| **Copyright** (©) | Original literary, artistic, musical, dramatic works, software, films | Author's **life + 60 years** (automatic on creation, registration optional) | Copyright Act 1957 |
| **Patent** | Novel, inventive, industrially applicable **inventions** | **20 years** from filing | Patents Act 1970 |
| **Trademark** (™, ® registered) | Names, logos, slogans, sounds identifying goods/services | **10 years**, renewable indefinitely | Trade Marks Act 1999 |
| **Industrial design** | Shape, pattern, ornament of article | 10 years (+5) | Designs Act 2000 |
| **Geographical Indication** | Region-specific product (Darjeeling tea, Basmati) | 10 years, renewable | GI Act 1999 |
| **Trade secret** | Confidential business info (Coca-Cola formula) | As long as secret | Contract law |
- Copyright protects **expression, not ideas**. Algorithms/ideas/facts are not copyrightable. **Fair use/fair dealing** allows limited use (education, research, criticism). **Piracy** = illegal copying (Sec 63 Copyright Act punishment: 6 months to 3 years). **Moral rights** stay with the author. Software = "literary work".
- **WIPO** (World Intellectual Property Organization, Geneva) administers IPR treaties; **TRIPS** agreement under WTO.

### Plagiarism
- **Plagiarism**: presenting another's words/ideas/work as one's own without credit; academic dishonesty. Types: direct/copy-paste, self-plagiarism, paraphrasing plagiarism, mosaic. Avoid by **citing and referencing**, quotation marks, paraphrasing with credit. Tools: Turnitin, Urkund/Ouriginal, Grammarly checker. **Copyright infringement** is the legal violation; plagiarism is mainly ethical.

### Digital ethics and netiquette
- **Netiquette** (net + etiquette): respect others online, no ALL CAPS (shouting), no flaming/trolling/spamming, respect privacy, cite sources, do not forward chain mails/hoaxes, think before posting, check facts, keep to topic, use proper language, do not share passwords.
- **Digital footprint** (active and passive), **digital citizenship**, **digital divide**, **e-waste** responsible disposal, cyberbullying avoidance, respect licences, protect personal data, **right to privacy**, **digital literacy**. Hoax, fake news, deepfake awareness.
- **Cookies** store small user data in browser; **GDPR** (EU data protection).

### Software licences

| Term | Meaning |
|---|---|
| **Proprietary** | Closed source; paid; use restricted (MS Office) |
| **Freeware** | Free of cost, source closed, not modifiable (Adobe Reader, Skype) |
| **Shareware** | Free trial for limited time/features, then pay |
| **FOSS/FLOSS** | Free and open source software: free to use, study, modify, distribute |
| **Open source** | Source code available (OSI definition) |
| **Public domain** | No copyright; anyone may use |
- "Free software" (Richard Stallman, **FSF**, 1985) = freedom, not price: four freedoms (run, study/modify, redistribute, redistribute modified). **OSI** (Open Source Initiative). Linux by Linus Torvalds (GPL), Firefox (MPL), Apache, Python, LibreOffice.

| Licence | Type | Feature |
|---|---|---|
| **GPL** (GNU General Public) | **Copyleft** | Derived works must also be GPL, source must be shared |
| **LGPL** | Weak copyleft | Allows linking from proprietary software |
| **MIT** | Permissive | Very short; use freely, keep notice |
| **BSD** | Permissive | Like MIT, no-endorsement clause |
| **Apache 2.0** | Permissive | Includes explicit patent grant |
| **Creative Commons (CC)** | Content licences | CC-BY (attribution), -SA (share-alike), -NC (non-commercial), -ND (no derivatives) |
- **EULA**: end-user licence agreement. **Copyleft** = "copyleft" reversed copyright, ensures freedoms stay with derivatives.

**⚡ Exam tip:** Copyright = life + 60 yrs; patent = 20 yrs; trademark = 10 yrs renewable. GPL = copyleft; MIT/BSD/Apache = permissive. Free software = freedom (Stallman), freeware = price only.

## Quick Revision Sheet
- CIA = Confidentiality, Integrity, Availability; DoS/DDoS hits availability; encryption protects confidentiality; hashing protects integrity.
- Passive attacks (sniffing, traffic analysis) don't alter data; active ones (replay, masquerade, DoS, MITM) do.
- Virus needs host file; worm self-spreads over network; Trojan disguised, no replication; ransomware encrypts files for payment.
- Phishing = fake email/site for credentials; vishing = voice; smishing = SMS; spear = targeted; whaling = executives; pharming = DNS redirect.
- SQLi = malicious SQL in input (defence: parameterised queries); XSS = injected JavaScript in victim's browser; CSRF = forged request via logged-in session.
- Symmetric = private/secret key (one key; DES, 3DES, AES); asymmetric = public key (pair; RSA, DH, ECC).
- Caesar: C = (P + k) mod 26 (HELLO, k=3 → KHOOR); Vigenère uses a repeating keyword; Playfair = 5×5 digraphs (I/J merged); Hill = matrix mod 26.
- DES: 64-bit block, 56-bit key, 16 rounds; 3DES: 168-bit key (112 effective); AES: 128-bit block, key 128/192/256, rounds 10/12/14.
- AES round steps: SubBytes, ShiftRows, MixColumns, AddRoundKey.
- RSA: n = pq, φ = (p−1)(q−1), ed ≡ 1 mod φ, C = M^e mod n, M = C^d mod n (p=3,q=11,e=7,d=3, M=2→C=29).
- Diffie-Hellman: A = g^a mod p, B = g^b mod p, K = g^ab mod p; only key exchange (p=23,g=5,a=6,b=15 → K=2).
- Hash sizes: MD5 128, SHA-1 160, SHA-256 256, SHA-512 512 bits; hashes are one-way.
- Digital signature: hash signed with sender's private key; gives authentication, integrity, non-repudiation.
- Certificate (X.509) issued by CA binds identity to public key; PKI manages certificates; CCA licenses CAs in India.
- 2FA = two different factors (know/have/are); firewall blocks unauthorised access; IDS alerts, IPS blocks.
- Firewall types: packet filter (L3-4), stateful, circuit-level, application proxy (L7), NGFW; DMZ hosts public servers.
- VPN = encrypted tunnel; HTTPS = HTTP over TLS, port 443; IPSec = AH + ESP + IKE at network layer; WPA2 uses AES-CCMP, WEP broken.
- Backup: full (all), incremental (since last backup), differential (since last full); 3-2-1 rule; RPO/RTO.
- Risk responses: mitigate, transfer, avoid, accept; ISO 27001 = ISMS.
- IT Act 2000 effective 17 Oct 2000, amended 2008 (effective 27 Oct 2009); 66 hacking (3 yrs, ₹5 lakh), 66C identity theft, 66D personation, 66E privacy, 66F cyber terrorism (life), 67 obscenity, 67B child porn, 70 protected system (10 yrs); 66A struck down in 2015.
- CERT-In = national nodal agency for cyber incidents; cyber crime helpline 1930; portal cybercrime.gov.in.
- Copyright life+60 yrs, patent 20 yrs, trademark 10 yrs renewable; plagiarism = passing off others' work as own.
- GPL = copyleft; MIT, BSD, Apache = permissive; freeware ≠ free software; Creative Commons for content.
