# Information Security & Cyber Law

> **What the exam asks:** about 2-4 questions per paper, mostly one-liners: identify the attack (phishing, malware, firewall, plagiarism), name the algorithm (AES, RSA, hash), match the cipher/key type, and recall IT Act sections and punishments, IPR terms and netiquette. Definitions and "which is NOT" questions dominate. Numeric ciphers (Caesar, RSA) appear occasionally.

## 1. Security Basics: CIA Triad and Terminology

### CIA triad

| Goal | Meaning | Violated by | Protected by |
|---|---|---|---|
| **Confidentiality** | Only authorised users can read data | Eavesdropping, data leak | Encryption, access control |
| **Integrity** | Data is not altered without authorisation | Tampering, modification | Hashing, digital signature, checksums |
| **Availability** | Data/service is accessible when needed | DoS/DDoS, hardware failure | Backups, redundancy, UPS, patching |

- Extra goals: **Authentication** (who are you), **Authorisation** (what may you do), **Non-repudiation** (sender cannot deny sending; achieved by digital signatures), **Accountability** (logs, audit trail), **Privacy**.
- AAA = Authentication, Authorisation, Accounting.

### Terminology
- **Asset**: anything of value (data, hardware, people).
- **Vulnerability**: a weakness (unpatched software, weak password).
- **Threat**: a potential danger that can exploit a vulnerability.
- **Attack**: an actual attempt to exploit a vulnerability.
- **Exploit**: code/technique that uses a vulnerability. **Zero-day**: vulnerability unknown to the vendor (no patch yet).
- **Risk** = Threat × Vulnerability × Asset value (qualitatively: likelihood × impact).
- **Countermeasure / control**: preventive, detective, corrective.
- **Hacker types**: White-hat (ethical, authorised), Black-hat (malicious), Grey-hat (no permission but no malicious intent), Script kiddie (uses ready-made tools), Hacktivist (political cause), Cracker (breaks software protection/passwords).

### Passive vs Active attacks

| | Passive | Active |
|---|---|---|
| Aim | Learn/steal information | Alter data or disrupt system |
| System affected | No | Yes |
| Detection | Hard (prevent by encryption) | Easier to detect, harder to prevent |
| Examples | Eavesdropping/sniffing, traffic analysis, release of message contents | Masquerade (spoofing), replay, modification, DoS, MITM |

- **Threat types**: physical (fire, theft, flood) vs cyber/logical (hacking, malware). Hacking is a cyber threat.
- Other terms: **Sniffing** (capturing packets), **Spoofing** (faking identity: IP, email, DNS spoofing), **Pharming** (redirecting a website's traffic to a fake site, DNS poisoning), **Eavesdropping**, **Dumpster diving**, **Shoulder surfing**, **Brute force** (try all passwords), **Dictionary attack**, **Keylogging**.

**⚡ Exam tip:** Passive = confidentiality attack, no change to data. Active = integrity/availability attack. DoS attacks **availability**, not confidentiality.

## 2. Malware and Social Engineering

### Malware types

| Type | Key feature |
|---|---|
| **Virus** | Attaches to a host file/program, needs user action to spread, replicates by infecting files |
| **Worm** | Self-replicating, standalone, spreads over network **without** host or user action; consumes bandwidth |
| **Trojan horse** | Looks legitimate but has hidden malicious function; does **not** self-replicate |
| **Ransomware** | Encrypts files and demands payment (WannaCry, CryptoLocker) |
| **Spyware** | Secretly collects user information |
| **Adware** | Displays unwanted advertisements |
| **Keylogger** | Records keystrokes (steals passwords) |
| **Rootkit** | Hides its presence and gives privileged (root) access |
| **Backdoor** | Hidden entry bypassing authentication |
| **Logic bomb** | Triggers when a condition/date is met |
| **Time bomb** | Logic bomb triggered by time (e.g. Friday 13th) |
| **Botnet / zombie** | Network of infected machines controlled by a bot-master (used for DDoS, spam) |
| **Spam** | Unsolicited bulk email |
| **Scareware** | Fake alerts pushing user to buy fake antivirus |
| **Fileless malware** | Lives in memory/registry, not in files |

- **Virus types**: boot-sector, file infector, macro virus (in Word/Excel documents), polymorphic (changes its code), metamorphic, stealth, multipartite.
- **Antivirus** detection: signature-based, heuristic, behaviour-based. Keep it updated.
- Famous: ILOVEYOU (worm/VBS), Melissa (macro), Stuxnet (worm vs industrial systems), Morris worm (1988, first internet worm), WannaCry (2017 ransomware via EternalBlue), Creeper (first virus-like program), Brain (first PC virus).

### Social engineering
- **Social engineering**: manipulating people (not machines) to reveal confidential information. "Humans are the weakest link".
- **Phishing**: fraudulent emails/sites that mimic trusted entities to steal credentials/card details. **Spear phishing** targets a specific person/organisation. **Whaling** targets senior executives. **Vishing** = voice (phone) phishing. **Smishing** = SMS phishing. **Pharming** redirects DNS.
- **Baiting** (infected USB left lying), **Pretexting** (invented scenario), **Tailgating/piggybacking** (following authorised person into a building), **Quid pro quo** (offer service for info), **Impersonation**.
- Defence: awareness training, check URL/HTTPS, never share OTP/PIN, verify sender, spam filters, 2FA.

**⚡ Exam tip:** Worm = no host file needed; Virus = needs host; Trojan = disguised, no replication. Phishing is a social engineering attack, not a malware.

## 3. Network and Web Attacks

### DoS and DDoS
- **DoS**: one source floods a server/network with requests so legitimate users are denied service (attacks **availability**).
- **DDoS**: many compromised machines (botnet) attack simultaneously; harder to block because traffic comes from thousands of IPs.
- Types: **SYN flood** (half-open TCP connections), **ICMP/Ping flood**, **Ping of death** (oversized ping packet), **Smurf** (ICMP broadcast with spoofed source), **UDP flood**, **HTTP flood**, **Teardrop** (overlapping fragments).
- Defence: firewalls, rate limiting, traffic filtering, load balancers, CDN, anti-DDoS services.

### Man-in-the-Middle (MITM)
- Attacker secretly sits between two parties, reading and possibly altering messages; both think they talk directly.
- Forms: ARP spoofing, rogue Wi-Fi hotspot ("evil twin"), session hijacking, SSL stripping, DNS spoofing.
- Defence: HTTPS/TLS with valid certificates, VPN, mutual authentication, avoid public Wi-Fi.
- Other: **Replay attack** (resend captured valid message), **Session hijacking** (steal session ID/cookie), **IP spoofing**, **Packet sniffing**, **Port scanning**, **Buffer overflow**, **Cookie theft**.

### SQL Injection (SQLi)
- Attacker inserts malicious SQL through input fields to manipulate the database (steal, modify, delete data).
- Classic example: login query `SELECT * FROM users WHERE name='$u' AND pass='$p'`; entering `' OR '1'='1` as the password makes the condition always true and bypasses login. `'; DROP TABLE users; --` drops a table (`--` comments out the rest).
- Defence: **prepared statements / parameterised queries**, input validation/sanitisation, least-privilege DB account, stored procedures, WAF.

### Cross-Site Scripting (XSS)
- Attacker injects malicious **JavaScript** into a web page that runs in other users' browsers (steals cookies/session, redirects, defaces).
- Types: **Stored (persistent)** (script saved on server, e.g. comment), **Reflected** (script in URL/request echoed back), **DOM-based**.
- Defence: output encoding/escaping, input validation, Content Security Policy (CSP), HttpOnly cookies.

### Cross-Site Request Forgery (CSRF / XSRF)
- Tricks a logged-in user's browser into sending an **unwanted request** to a site where they are authenticated (e.g. transfer money), exploiting the site's trust in the browser/cookie.
- Defence: anti-CSRF tokens, SameSite cookies, re-authentication for critical actions.

| | SQLi | XSS | CSRF |
|---|---|---|---|
| Target | Database/server | User's browser | Authenticated user's session |
| Injected | SQL | JavaScript | Forged request |
| Exploits | Unvalidated input | Trust of user in the site | Trust of site in user's browser |

**⚡ Exam tip:** SQLi = database, XSS = script in victim's browser, CSRF = forged request using victim's logged-in session. The best SQLi defence is parameterised queries.

## 4. Cryptography Basics

### Terms
- **Plaintext** (original message), **Ciphertext** (encrypted), **Encryption** (plain→cipher), **Decryption**, **Key**, **Cipher** (algorithm), **Cryptanalysis** (breaking ciphers), **Cryptology** = Cryptography + Cryptanalysis. **Steganography** hides the existence of a message (e.g. in an image).
- **Kerckhoffs' principle**: security must rest on the secrecy of the key, not the algorithm.
- Classical techniques: **Substitution** (replace letters) and **Transposition** (rearrange positions). Modern: **block** (fixed-size blocks) and **stream** (bit-by-bit) ciphers.

### Naming (frequent trap)

| Type | Keys | Other names |
|---|---|---|
| Symmetric | One **shared secret key** for both encryption and decryption | **Private-key / secret-key / single-key** cryptography |
| Asymmetric | **Key pair**: public key + private key | **Public-key** cryptography |

- Symmetric: fast, good for bulk data; problem is **key distribution**. Examples: DES, 3DES, AES, Blowfish, RC4, IDEA.
- Asymmetric: slow, solves key distribution; examples: RSA, Diffie-Hellman, ElGamal, DSA, ECC.
- Encrypt with receiver's **public** key → only receiver's **private** key decrypts (confidentiality). Sign with sender's **private** key → anyone verifies with sender's **public** key (authenticity).
- For n users, symmetric needs n(n−1)/2 keys; asymmetric needs 2n keys.
- **Hybrid**: asymmetric exchanges a session key, symmetric encrypts data (TLS does this).

### Classical ciphers with worked examples
**Caesar cipher** (shift/additive): C = (P + k) mod 26, P = (C − k) mod 26. Julius Caesar used k = 3. Only 25 keys → brute force easy.
```
Plain:  H E L L O      k = 3
Cipher: K H O O R      (A→D, B→E, ... X→A, Y→B, Z→C)
```
ROT13 = Caesar with k = 13 (applying twice returns the original).

**Monoalphabetic substitution**: each letter maps to a fixed other letter; 26! keys but broken by **frequency analysis** (E is most common in English).

**Vigenère** (polyalphabetic): add key letters repeated, C = (P + K) mod 26.
```
Plain: A T T A C K A T D A W N
Key:   L E M O N L E M O N L E
Cipher:L X F O P V E F R N H R   (A+L=L, T+E=X, T+M=F, A+O=O, C+N=P ...)
```
Broken by Kasiski test / index of coincidence. **One-time pad**: random key as long as message, used once → unbreakable.

**Playfair** (digraph substitution, 5×5 matrix, I/J merged). Key MONARCHY:
```
M O N A R
C H Y B D
E F G I K
L P Q S T
U V W X Z
```
Rules (plaintext split in pairs; double letters get an X inserted; odd length padded with X):
- Same row → take letter to the right (wrap): AR → RM
- Same column → take letter below (wrap)
- Rectangle → swap columns: HI → BF
- Playfair encrypts 2 letters at a time (digraphs), so 25×25 = 625 digraphs, harder to break by frequency than monoalphabetic.

**Hill cipher** (matrix multiplication, polyalphabetic, block of m letters): C = K·P mod 26; decryption P = K⁻¹·C mod 26 (K must be invertible mod 26: gcd(det K, 26) = 1). Letters A=0 … Z=25.
```
K = [3 3; 2 5], plaintext "HE" = (7, 4)
C1 = 3·7 + 3·4 = 33 mod 26 = 7  → H
C2 = 2·7 + 5·4 = 34 mod 26 = 8  → I      HE → HI
"LP" = (11,15): 33+45 = 78 mod 26 = 0 → A ; 22+75 = 97 mod 26 = 19 → T
HELP → HIAT
```
Hill is vulnerable to known-plaintext attack (linear). **Rail fence** and **columnar** are transposition ciphers.

**⚡ Exam tip:** "Private-key" = symmetric; "public-key" = asymmetric. Caesar default shift is 3 (ROT13 shift 13). Playfair uses digraphs; Hill uses matrices; Vigenère uses a keyword.
