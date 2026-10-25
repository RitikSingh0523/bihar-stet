# Digital Logic & Number Systems

> **What the exam asks:** about 4-7 questions per paper from this topic. Typical items: base conversions and binary arithmetic, 1's/2's complement ranges, BCD / Gray / Excess-3 / ASCII / EBCDIC facts, IEEE-754 fields, De Morgan and Boolean simplification, K-map minimisation, universal gates, half/full adder, MUX/decoder, flip-flop characteristic and excitation tables, counters (mod-n, ripple vs synchronous), one-hot vs binary state encoding, and hazards. Most questions are one-step recall or a short calculation.

## Number Systems & Conversions

### Bases at a glance

| System | Base | Digits | Group size from binary |
|---|---|---|---|
| Binary | 2 | 0,1 | 1 bit |
| Octal | 8 | 0-7 | 3 bits |
| Decimal | 10 | 0-9 | - |
| Hexadecimal | 16 | 0-9, A-F (A=10 ... F=15) | 4 bits |

- **Positional value:** digit × baseᵖᵒˢⁱᵗⁱᵒⁿ; fractional positions use negative powers (base⁻¹, base⁻² ...).
- **Bit** = 1 binary digit; **nibble** = 4 bits; **byte** = 8 bits; **word** = machine dependent.
- n bits give 2ⁿ distinct patterns. Decimal digits needed for n bits ≈ 0.301 n.
- Powers of 2 to memorise: 2⁴=16, 2⁵=32, 2⁶=64, 2⁷=128, 2⁸=256, 2¹⁰=1024, 2¹⁶=65536.

### Decimal → other base
- **Integer part:** repeatedly divide by the base; read remainders bottom to top.
- **Fraction part:** repeatedly multiply by the base; read the integer parts top to bottom.

```
Example: 45.625 → binary
45 ÷ 2: 22 r1, 11 r0, 5 r1, 2 r1, 1 r0, 0 r1  → 101101
0.625 × 2 = 1.25 → 1 ; 0.25×2 = 0.5 → 0 ; 0.5×2 = 1.0 → 1  → .101
Answer: 101101.101₂
```

### Other base → decimal
```
(2F)₁₆ = 2×16 + 15 = 47
(725)₈ = 7×64 + 2×8 + 5 = 469
(1011.01)₂ = 8+0+2+1 + 0.25 = 11.25
```

### Binary ↔ octal ↔ hex (grouping shortcut)
- Binary → octal: group in 3s from the binary point (pad with zeros outward). Binary → hex: group in 4s.
- Octal/hex → binary: expand each digit to 3 / 4 bits.
- Octal ↔ hex: go via binary.

```
(1101 0110)₂ = D6₁₆ ;  (011 010 110)₂ = 326₈
(3A7)₁₆ = 0011 1010 0111 = 1110100111₂ = 1647₈
```

### Useful results
- A number in base b ending in 0 is divisible by b (binary even numbers end in 0).
- Largest n-digit number in base b = bⁿ − 1 (e.g. 4-bit: 15; 8-bit: 255; 2-digit hex FF = 255).
- Number of bits needed to store N distinct values = ⌈log₂ N⌉.
- (10)₁₆ = 16₁₀; (100)₈ = 64₁₀; (777)₈ = 511₁₀; (FFFF)₁₆ = 65535.

**⚡ Exam tip:** For hex/octal conversions never go through decimal - group bits. When grouping a fraction, pad zeros on the RIGHT; for the integer part pad on the LEFT.

## Complements & Binary Arithmetic

### Binary arithmetic rules
```
Add:       0+0=0  0+1=1  1+0=1  1+1=10 (sum 0, carry 1)  1+1+1=11
Subtract:  0-0=0  1-0=1  1-1=0  0-1=1 (borrow 1)
Multiply:  as AND;   Divide: long division with subtraction
```

### Complements

| Complement | Definition (n digits, base r) | Binary rule |
|---|---|---|
| (r−1)'s | (rⁿ − 1) − N | **1's complement:** flip every bit |
| r's | rⁿ − N | **2's complement:** 1's complement + 1 |

- 9's complement: 9 − each digit; 10's complement: 9's + 1. 7's/8's complement for octal.
- Shortcut for 2's complement: copy bits from the right up to and including the first 1, then flip all remaining bits.

### Signed number representations (n bits)

| Method | Range | Zero | Notes |
|---|---|---|---|
| Sign-magnitude | −(2ⁿ⁻¹−1) to +(2ⁿ⁻¹−1) | two (+0, −0) | MSB = sign |
| 1's complement | −(2ⁿ⁻¹−1) to +(2ⁿ⁻¹−1) | two | negative = flip bits |
| 2's complement | −2ⁿ⁻¹ to +(2ⁿ⁻¹−1) | **one** | most widely used |
| Excess-K (biased) | −K to 2ⁿ−1−K | one | used in float exponent |

- 8-bit 2's complement: −128 to +127. 4-bit: −8 to +7. 16-bit: −32768 to +32767.
- Sign extension: replicate MSB to widen (2's complement).
- Value of 2's complement number = −b(n−1)·2ⁿ⁻¹ + remaining weights.

```
Example: −25 in 8-bit 2's complement
25 = 0001 1001 → flip 1110 0110 → +1 → 1110 0111
```

### Subtraction using complements
- **2's complement method (A − B):** A + 2's comp(B). If a final carry is generated, discard it - result is positive. If NO carry, the result is negative and is in 2's complement form (take the 2's complement to get the magnitude).
- **1's complement method (A − B):** A + 1's comp(B). If end-around carry occurs, add it back to the LSB (result positive). If no carry, result is negative, in 1's complement form.

```
Example: 1010 − 0110 (10 − 6) using 2's complement
2's comp of 0110 = 1010
1010 + 1010 = 1 0100 → discard carry → 0100 = 4 ✓

Example: 0110 − 1010 (6 − 10)
0110 + 0110 = 1100 (no carry) → negative; magnitude = 2's comp(1100) = 0100 → −4 ✓
```

### Overflow
- Occurs only when adding two numbers of the SAME sign and the result has the opposite sign.
- Rule: overflow = carry into MSB ⊕ carry out of MSB. (Adding positive + negative never overflows.)
- Unsigned: overflow = carry out of MSB.
- 0111 + 0001 (7+1) = 1000 in 4-bit signed = −8 → overflow.

**⚡ Exam tip:** 2's complement of the most negative number (1000 0000) is itself. Number of 1's-complement zeros = 2 but 2's complement = 1; this is why the 2's complement range is asymmetric.

## Codes: BCD, Gray, Excess-3, ASCII, EBCDIC

### Classification
- **Weighted codes:** BCD (8421), 2421, 5421 - each bit position has a fixed weight.
- **Non-weighted:** Excess-3, Gray.
- **Self-complementing:** Excess-3, 2421 (9's complement obtained by inverting every bit).
- **Unit-distance (cyclic):** Gray - only one bit changes between successive numbers.
- **Error-detecting:** parity bit codes; 2-out-of-5; Hamming (detect/correct).
- **Alphanumeric:** ASCII, EBCDIC, Unicode.

### BCD (8421)
- Each decimal digit coded in its own 4-bit binary: 0-9 = 0000-1001. Codes 1010-1111 are invalid (6 unused).
- 47₁₀ = 0100 0111 (BCD) - not the same as 101111₂.
- BCD addition: add as binary; if a nibble sum > 9 or generates a carry, **add 6 (0110)** to that nibble.

```
Example: 27 + 18 in BCD
0010 0111 + 0001 1000 = 0011 1111
Low nibble 1111 > 9 → +0110 → 0011 1111 + 0110 = 0100 0101 = 45 ✓
```

### IBM packed vs unpacked (zoned) BCD
- **Packed BCD:** two digits per byte; the last nibble holds the sign. Valid sign nibbles A-F; commonly **C (or F) = plus, D = minus** (A, C, E, F positive; B, D negative). A packed word is 1-16 bytes: 16 bytes = 32 nibbles = **31 digits + 1 sign nibble** (max 31 digits).
- **Unpacked (zoned) BCD:** one digit per byte: zone nibble (F in EBCDIC) + digit nibble; the zone of the LAST byte carries the sign. −736 → F7 F3 D6.
- Packed is half the size of zoned; arithmetic is done in packed form (zoned must be converted first).

```
Packed +736 = 73 6C    Packed -736 = 73 6D
Zoned  -736 = F7 F3 D6
```

### Excess-3
- Excess-3 = BCD + 0011. Digit 0 = 0011 ... 9 = 1100. Unused: 0000-0010, 1101-1111.
- **Self-complementing:** the 1's complement of a digit's code is the code of its 9's complement (e.g. 2 = 0101, 7 = 1010). Makes subtraction by complement easy.
- Addition: add; if carry out → add 0011 to that group; if no carry → subtract 0011 (add 1101).

### Gray code (reflected binary)

| Dec | Binary | Gray |
|---|---|---|
| 0 | 000 | 000 |
| 1 | 001 | 001 |
| 2 | 010 | 011 |
| 3 | 011 | 010 |
| 4 | 100 | 110 |
| 5 | 101 | 111 |
| 6 | 110 | 101 |
| 7 | 111 | 100 |

```
Binary → Gray:  G(n-1) = B(n-1);   Gi = Bi ⊕ B(i+1)
Gray → Binary:  B(n-1) = G(n-1);   Bi = Gi ⊕ B(i+1)   (XOR of the previous binary bit)
Example: binary 1011 → Gray 1110 ; Gray 1110 → binary 1011
```
- Uses: shaft/rotary encoders, K-map row/column labelling, minimising glitches in counters, Karnaugh adjacency. Converting Gray → binary uses a chain of **XOR gates**.
- Not suited to arithmetic. Gray code of 2ⁿ is a cyclic code (last and first differ by one bit).

### Parity and error codes
- Even parity: parity bit chosen so total number of 1's is even. Detects single-bit (odd number of) errors; cannot correct.
- Hamming distance d: detects d−1 errors, corrects ⌊(d−1)/2⌋. Hamming(7,4): d = 3, corrects 1 bit; parity bits at positions 1, 2, 4, 8 ... (powers of 2); needs 2ᵖ ≥ m + p + 1.

### Character codes

| Code | Bits | Characters | Facts |
|---|---|---|---|
| ASCII | 7 (std), 8 (extended) | 128 / 256 | 'A' = 65 (41₁₆), 'a' = 97 (61₁₆), '0' = 48 (30₁₆), space = 32, DEL = 127; lowercase = uppercase + 32 |
| EBCDIC | 8 | 256 | IBM mainframes; 'A' = C1₁₆, 'a' = 81₁₆, '0' = F0₁₆ |
| ISCII | 8 | - | Indian scripts |
| Unicode | UTF-8 1-4 bytes, UTF-16, UTF-32 | > 1.1 million code points | superset of ASCII; first 128 same as ASCII |

**⚡ Exam tip:** "Self-complementing" → Excess-3 (also 2421). "Only one bit changes" → Gray. "6 invalid combinations" → BCD. EBCDIC is IBM mainframes; ASCII 'A' = 65.

## IEEE-754 Floating Point

### Formats

| Format | Total | Sign | Exponent | Mantissa (fraction) | Bias | Approx. decimal digits |
|---|---|---|---|---|---|---|
| Single precision | 32 | 1 | 8 | 23 | 127 | ~7 |
| Double precision | 64 | 1 | 11 | 52 | 1023 | ~15-16 |

- Value = (−1)ˢ × 1.fraction × 2^(E − bias) for normalised numbers. The leading 1 is **implicit (hidden bit)**, so single precision has effectively 24 significant bits and double 53.
- Stored exponent E = true exponent + bias (excess-127 / excess-1023).
- Special values (single): E = 0, f = 0 → ±0; E = 0, f ≠ 0 → denormal; E = 255, f = 0 → ±∞; E = 255, f ≠ 0 → NaN.
- Normal range of stored exponent single: 1 to 254 → true exponent −126 to +127.
- Largest single ≈ 3.4 × 10³⁸; smallest normal ≈ 1.18 × 10⁻³⁸.

### Worked example: 12.375 to single precision
```
12.375 = 1100.011₂ = 1.100011 × 2³
sign = 0 ; exponent = 3 + 127 = 130 = 1000 0010
fraction = 10001100000000000000000
Hex: 0 10000010 10001100000000000000000 = 41460000
```

### Worked example: decode C1480000
```
C1480000 = 1100 0001 0100 1000 0 ... 
sign = 1 ; exponent = 10000010 = 130 → 3 ; fraction .1001 → 1.1001₂ = 1.5625
Value = −1.5625 × 2³ = −12.5
```

- Normalisation shifts the binary point so exactly one non-zero digit lies before it.
- Precision depends on mantissa bits; range depends on exponent bits.
- Fixed-point vs floating: fixed has a fixed number of fractional bits (limited range); floating trades precision for a huge range.

**⚡ Exam tip:** 1-8-23 with bias 127 and 1-11-52 with bias 1023. The mantissa has an IMPLIED leading 1, so 0.5 = 1.0 × 2⁻¹ is stored with exponent 126 (0111 1110) and fraction 0.
