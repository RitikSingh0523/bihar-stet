
---

## 7. Coding-Decoding & Alphabet Position Counting

### Alphabet position table (memorise)
```
A=1  B=2  C=3  D=4  E=5  F=6  G=7  H=8  I=9  J=10 K=11 L=12 M=13
N=14 O=15 P=16 Q=17 R=18 S=19 T=20 U=21 V=22 W=23 X=24 Y=25 Z=26
```
- **EJOTY** = 5, 10, 15, 20, 25 (positions of E, J, O, T, Y). Mid-point: M = 13, N = 14.
- **Opposite (mirror) letter**: position p ↔ **27 − p**. A↔Z, B↔Y, C↔X, ..., M↔N. Pairs always add to 27. "FRIEND" opposite: F(6)→U, R(18)→I, I(9)→R, E(5)→V, N(14)→M, D(4)→W = UIRVMW.
- Position from the right = 27 − position from the left. 10th from the right = **17th from the left** (Q).
- Alphabet reversed (Z first): "5th letter to the right of the 12th from the left" → 12th from left = L → 5 to the right = Q.
- **Letters between** two letters X and Y (positions x < y): **y − x − 1**. Between G(7) and P(16): 16 − 7 − 1 = **8**.
- Vowels: A E I O U (5). Consonants 21.
- Handy sums: EAT = 5+1+20 = 26; COMPUTER positions 3-15-13-16-21-20-5-18.

### Letter-shift codes

| Type | Example |
|---|---|
| Constant shift +n | CAT → DBU (+1); DOG → FQI (+2) |
| Constant shift −n | TEACHER → SDZBGDQ (−1) |
| Alternating +1, −1 | PEN → QDO |
| Increasing shifts +1, +2, +3 ... | STUDY → TVXHD (S+1, T+2, U+3, D+4, Y+5 = 30−26 = D) |
| Opposite letters | CAT → XZG (C→X, A→Z, T→G) |
| Reverse the word | COMPUTER → RETUPMOC |
| Reverse each half / swap positions | a pair swap: BOARD → OBRAD |

Method: write position numbers under each letter of the word and its code, find the difference (add 26 if negative or subtract 26 above 26). Check with two letters, then apply to the target.

Worked: if **MONDAY = 13-15-14-4-1-25** is coded by +2 each → OQPFCA. So SUNDAY → UWPFCA.
Worked: position-sum code: CAB = 3 + 1 + 2 = **6**; BAG = 2 + 1 + 7 = **10**.

### Number codes
- Letter → number by position: PEN = 16 + 5 + 14 = 35; or concatenated 16-5-14.
- **Reverse positions** (A = 26 ... Z = 1): code = 27 − position.
- Letter → number with rules like "A = 1, B = 4, C = 9" → squares of position.
- Word → number by letter count × something: "if APPLE = 5 × 5 = 25 then BANANA = 36".
- Code languages: find the common word in two sentences and the common code in the two codes.

Worked word-code: *pen is red* = la ma na; *red ink* = na pa; *ink is good* = pa la ra.
- 'red' common to 1 and 2 → na; 'ink' common to 2 and 3 → pa; 'is' common to 1 and 3 → la; so **pen = ma**, **good = ra**.

### Letter-pair / group coding
- "If CLOUD is written as DMPVE" → +1.
- If A = 26 numbering is **reversed** (A = 26): then position of letter = 27 − usual; CAB = 24 + 26 + 25 = 75.
- **Letter-in-word counting**: "How many pairs of letters in the word STUDENT have as many letters between them in the word as in the alphabet?" For adjacent letters it means consecutive alphabet: ST, TU, DE → **3**.
- Alphabetical ordering: arrange letters of 'LEAD' alphabetically → ADEL; the 2nd letter is D.
- Symbol codes: treat each symbol like a letter; note which symbols repeat.

**⚡ Exam tip:** Position pairs of opposite letters sum to 27. Always test a coding rule on TWO letters before applying; letters wrapping past Z subtract 26.

---

## 8. Series, Analogy, Odd-One-Out, Operations & Missing Numbers

### Number series: patterns to test (in this order)
1. **Differences** (constant → AP): 4, 9, 14, 19, 24, ... (+5).
2. **Second differences**: 3, 6, 10, 15, 21, 28 (differences 3,4,5,6,7) → triangular numbers; 3, 5, 8, 12, 17, **23** (+2, +3, +4, +5, +6).
3. **Ratio (×)**: 3, 6, 12, 24, 48 (×2); 2, 6, 18, 54 (×3).
4. **×n + c**: **5, 11, 23, 47, 95, 191** (×2 + 1) — mock question.
5. **Squares/cubes ±**: 1, 4, 9, 16, 25; 2, 5, 10, 17, 26 (n² + 1); 0, 3, 8, 15, 24 (n² − 1); 1, 8, 27, 64 (cubes); 2, 9, 28, 65 (n³ + 1).
6. **n(n + 1)**: 2, 6, 12, 20, 30, **42**.
7. **Primes**: 2, 3, 5, 7, 11, 13, 17.
8. **Fibonacci type** (each = sum of previous two): 1, 1, 2, 3, 5, 8, 13, 21.
9. **Alternating / two interleaved series**: 2, 10, 4, 20, 6, 30 → odd places +2, even places +10.
10. **Multiply then ± increasing**: 1, 2, 6, 24, 120 (×1, ×2, ×3, ×4, ×5 → factorials).
11. Digit-based: 12, 24, 36, 48 (multiples), 121, 144, 169 (squares of 11, 12, 13).
- Odd-one-out in number series: check divisibility, prime, perfect square, digit sum. E.g. 8, 27, 64, 100, 125 → 100 is not a cube.
- Wrong-number series: find the pattern in the other numbers and spot the exception.

### Letter series
- Convert to positions and look at the gaps. **A, C, F, J, O, ?** → gaps +2, +3, +4, +5, so next +6: O(15) + 6 = 21 = **U**.
- Alternating forward/backward: AZ, BY, CX, **DW**.
- Group series: **ABD, EFH, IJL, MNP, ?** → each group +4 → **QRT**.
- Skip patterns: B, D, G, K, P, **V** (+2, +3, +4, +5, +6).
- **Z, X, V, T, R, ?** → −2 each → **P**.
- Mixed alphanumeric: A1, C3, E5, G7 → pairs.

### Analogy (relationship types)

| Type | Example |
|---|---|
| Tool : user/work | Pen : Write :: Knife : Cut |
| Worker : place / product | Doctor : Hospital :: Teacher : School; Carpenter : Furniture |
| Part : whole | Petal : Flower :: Page : Book |
| Animal : young one / sound / home | Cat : Kitten :: Dog : Puppy; Lion : Den |
| Country : capital / currency | India : Delhi :: Japan : Tokyo |
| Cause : effect | Fire : Burn :: Fever : Weakness |
| Degree / intensity | Warm : Hot :: Cool : Cold |
| Opposite | Hot : Cold :: Day : Night |
- Number analogy: 3 : 27 :: 4 : **64** (cubes); 5 : 30 :: 6 : **42** (n(n + 1)); 8 : 64 :: 9 : 81 (squares).
- Letter analogy: AB : CD :: EF : **GH**; CAT : DBU :: DOG : **EPH**.
- Method: write the relationship as a sentence ("X is the tool used for Y"), then test the second pair with the same sentence.

### Odd one out
- Find the common property of three and the exception: **Brush, Easel, Canvas, Hammer** → hammer is not used for painting (mock).
- Common categories: fruits vs vegetable, planets vs satellite, bird vs mammal (bat is a mammal), metal vs non-metal, even vs odd, prime vs composite; Mercury/Venus/Moon/Mars → Moon (satellite).
- Numbers: 3, 5, 11, 14, 17 → 14 is not prime; 16, 25, 36, 48 → 48 not a perfect square.
- Letters: positions and vowels: AEIOU vs consonants; BDFH vs a mismatched pair.

### Mathematical operations (symbol substitution)
Method: rewrite the expression by substituting the new meanings of the symbols, then use **BODMAS** (Brackets, Orders, Division, Multiplication, Addition, Subtraction).

Worked: if + means ×, − means ÷, × means +, ÷ means −, then 12 + 3 − 4 × 5 ÷ 2 = 12 × 3 ÷ 4 + 5 − 2 = 9 + 5 − 2 = **12**.
Worked: if a * b = a² + b, then 3 * 4 = 9 + 4 = **13**; (2 * 3) * 1 = (4 + 3) * 1 = 7 * 1 = **50**.
Always substitute step by step; never use the original meaning of a symbol while solving.
- Comparison substitution: the statement "<" replaced by ">" etc. Replace in the inequality and check the truth.
- **Balancing / equation puzzles**: If 2 = 6, 3 = 12 (pattern n(n+1)), then 4 = **20**.

### Missing-number puzzles
- **Row/column rule**: 3 5 8 / 4 6 10 / 7 9 ? → third = sum of first two → **16**.
- **Product rule**: (2, 3, 12), (3, 4, 24), (4, 5, ?) → a × b × 2 → **40**.
- **Square rule**: (3, 4, 25), (5, 12, 169): a² + b² = c; (6, 8, 100).
- **Triangle/circle**: add or multiply the three outer numbers to get the middle; test both.
- **Diagonal / opposite** numbers: sum the numbers on opposite sides.
- **Matrix with squares**: 2, 4, 16 → 2² = 4, 4² = 16; next row 3, 9, **81**.
- Try these in order: sum, difference, product, squares, a² ± b, then digit sums.

**⚡ Exam tip:** For number series check differences first, then ratios, then n² and n³ ± c, then ×n + c (as in 5, 11, 23, 47, 95 → 191). For letter series convert to positions.

---

## 9. Blood Relations, Direction Sense, Ranking, Seating Arrangement

### Blood relations: technique
- Draw a **family tree**: use ▢ for male, ○ for female, = for marriage, vertical line for parent–child, horizontal for siblings. Work from "I", "pointing to", "only", "father's" backwards (read the sentence from the end).
- "Only son" / "only daughter" tells you the person with that relation is the speaker himself or his sibling.
- Relation table:

| Description | Relation |
|---|---|
| Mother's/father's father | Maternal/paternal grandfather |
| Mother's/father's mother | Grandmother |
| Father's/mother's brother | Paternal uncle (chacha) / Maternal uncle (mama) |
| Father's sister | Paternal aunt (bua) |
| Mother's sister | Maternal aunt (mausi) |
| Father's/mother's sister's husband | Uncle |
| Brother's wife | Sister-in-law (bhabhi) |
| Wife's/husband's brother | Brother-in-law |
| Sister's husband | Brother-in-law (jija) |
| Son's wife / daughter's husband | Daughter-in-law / Son-in-law |
| Brother's/sister's son | Nephew; daughter → niece |
| Uncle's/aunt's children | Cousins |
| Mother's/father's only son | I or brother |
| Wife's father | Father-in-law |

- Gender is **unknown** for: cousin, friend, spouse (use "his/her"), parent, child, sibling.

Worked: *Pointing to a man, a woman says "His mother is the only daughter of my mother".* The woman's mother's only daughter = the woman herself → man's mother = woman → the man is her **son**.
Worked: *A is B's sister; C is B's mother; D is C's father; E is D's mother. How is A related to D?* D is C's father → D is B's grandfather → A is D's **granddaughter**. (E is D's mother → E is A's great-grandmother.)
Worked: *Introducing a man, a girl says "He is the son of the only son of my grandfather".* Only son of grandfather = father of the girl → he is her **brother**.
Worked: *If A + B means A is the brother of B; A − B means A is the sister of B; A × B means A is the father of B.* Then P × Q + R means P is the father of Q, Q is the brother of R → P is the **father of R** too.

### Direction sense
- Directions: N, E, S, W; diagonals NE, SE, SW, NW. Right turn = clockwise 90°; left turn = anticlockwise 90°.
- Facing **north**: right = east, left = west; facing **east**: right = south, left = north.
- **Shadow**: morning (sun in the east) shadow falls to the **west**; evening shadow falls to the east. Facing the sun in the morning means facing east. At noon (sun overhead) the shadow is shortest.
- Draw a coordinate sketch; the **final distance** (shortest) is by Pythagoras, bearing from the figure.
- Worked: walk 5 km north, turn right (east) 3 km, turn right (south) 5 km → now **3 km east** of the start, facing south.
- Worked: 3 km west then turn left (south) 4 km → distance = √(9 + 16) = **5 km, south-west** of the start.
- Worked: facing north, turns 90° clockwise → east; then 135° anticlockwise → from east, 90° gives north, 45° more → **north-west**.
- Worked: Ravi walks 8 m north, 6 m east, then 8 m south: he is 6 m east of the start.
- Clock-direction trick: right turn = clockwise, left = anticlockwise; 180° = about turn.
- After walking back to the same line: distance = difference of the opposite-direction legs (e.g. 10 N then 4 S → 6 N).

### Ranking & order
- **Total = (rank from top) + (rank from bottom) − 1**. Rahul 12th from top, 25th from bottom → 12 + 25 − 1 = **36**.
- Same for left/right in a row: total = L + R − 1. Row of 40; Rohan 12th from the left → 40 − 12 + 1 = **29th from the right**.
- Persons **between** two positions (same side) = difference − 1; positions 8th and 20th → 11 between.
- Swap type: A is 7th from the left, B is 10th from the right. After they exchange places A is 12th from the left → B's old place was 12th from the left, and it was 10th from the right → total = 12 + 10 − 1 = **21**.
- Tallest/shortest ordering: write the order left to right using symbols (> or <), merge the facts and answer from the chain: A > B, B > C, D > A → D > A > B > C.
- Number of persons **at least** / **more than** type: complete the chain; if a link is missing the answer is "cannot be determined".
- Ranks in class with ties: "Raj is 8th from the top; Ali is 5 ranks below Raj → Ali is 13th".
- Numerical ranking: arrange words in dictionary order — compare the first letter, then the second.

### Seating arrangement approach
1. Count persons and decide the **shape**: linear (row), circular, square/rectangular.
2. Fix the **fixed facts first** (someone at an extreme end; "between"; "opposite"); put the **definite** statements before the conditional.
3. Draw positions numbered 1...n and place known persons; use "X or Y" branches only when forced.
4. **Linear**: "Facing north" → left of a person is the west side; if two rows face each other, left/right switch.
5. **Circular**: persons facing the **centre**: left = **clockwise** next person, right = **anticlockwise**. Facing **outwards** these swap. With n persons evenly spaced, the opposite person is n/2 positions away (6 persons: opposite = +3).

Worked (row): A, B, C, D, E sit in a row facing north. A at the extreme right. C immediately left of A. B at the extreme left. D is to the right of E. Positions (left → right): B, E, D, C, A → the middle person is **D**.
Worked (circle): six friends P, Q, R, S, T, U sit around a table facing the centre, positions 1-6 clockwise. Put P at 1; S is opposite → 4. Q is second to the right of P; facing the centre, right = anticlockwise, so Q is at 5 (1 → 6 → 5). R is immediate left of P; left = clockwise → R at 2. Then T and U fill 3 and 6 as further clues decide.
- "Immediate" = adjacent; "second to the left" = skip one; "between X and Y" = in the gap.
- Puzzle types (floor, day, month, box): construct a table with rows = persons, columns = attributes, and eliminate.

**⚡ Exam tip:** Total persons in a line = from-left + from-right − 1. For circular arrangements remember: facing the centre, your left is the **clockwise** neighbour; facing outside it is opposite.

---

## 10. Syllogism, Statement & Conclusion, Venn Logic

### Syllogism: four statement forms

| Form | Venn picture |
|---|---|
| **All A are B** (A ⊆ B) | A inside B |
| **No A is B** | two separate circles |
| **Some A are B** | overlapping circles |
| **Some A are not B** | A circle partly outside B |

### Conversion rules

| Statement | Converse (valid) |
|---|---|
| All A are B | **Some B are A** (not "All B are A") |
| No A is B | **No B is A** |
| Some A are B | **Some B are A** |
| Some A are not B | none |

### Two-premise combinations

| Premise 1 + Premise 2 | Conclusion |
|---|---|
| All A are B + All B are C | **All A are C** (also Some C are A) |
| All A are B + No B is C | **No A is C** |
| Some A are B + All B are C | **Some A are C** |
| No A is B + All B are C | **Some C are not A** |
| All A are B + Some B are C | **No conclusion** |
| Some A are B + Some B are C | **No conclusion** |
| Some A are B + No B is C | **Some A are not C** |
| No A is B + No B is C | **No conclusion** |

### Venn technique
1. Draw the circles for the premises in every possible way; a conclusion is correct only if it holds in **all** drawings ("definitely follows").
2. For "possibility" conclusions, it follows if it holds in **at least one** drawing.
3. If two conclusions are a complementary pair (one "Some A are B" and the other "No A is B" with the same terms) and neither follows alone → **either I or II follows**.

Worked: *All cats are dogs; all dogs are rats.* → I: All cats are rats ✓; II: Some rats are cats ✓ (conversion of all-all).
Worked: *Some pens are books; all books are tables.* → Some pens are tables ✓; Some tables are pens ✓; "All pens are tables" ✗.
Worked: *No man is a bird; some birds are fish.* → "Some fish are not men" ✓ (Some + No → some not).
Worked: *All flowers are trees; some trees are rocks.* → "Some rocks are flowers" ✗ ("All + Some" gives no conclusion).
- "Only" statements: **Only A are B** = All B are A.
- "At least some" = some; "A few" = Some (not all).

### Statement–conclusion / assumption / argument / course of action
- **Conclusion**: only what **follows from the statement itself**; do not use outside knowledge. Extreme words (**all, only, never, always, none**) usually make it wrong unless stated.
- **Assumption**: an unstated premise that must be true for the statement to make sense. Statement: "Use plastic bags no more, they pollute." Assumption: people can switch to other options ✓. Assumptions are about what the speaker takes for granted; cues "because", "to avoid", "in order to", "should".
- **Inference**: probably true / definitely true / insufficient data / probably false / definitely false; choose "definitely" only if the passage states it.
- **Strong argument**: relevant, specific, and based on facts/logic (not on emotion or "everybody says"). A strong argument in the form "Yes, because it will reduce pollution" beats a weak "No, because it will cost money".
- **Course of action**: a good course follows the problem (e.g. problem: water shortage → follow-up: build reservoirs/ban wastage). Courses that are extreme or unrelated are wrong.
- **Cause and effect**: identify the **cause** (earlier, independent) and the **effect** (consequence). Both may be effects of a common cause, or independent.
- **Assertion–Reason** style: check A and R individually, then whether R explains A.

### Venn logic (which diagram?)
- **Humans, Doctors, Males** → Humans is the biggest circle; Doctors and Males are two **overlapping** circles inside it.
- **Mothers, Women, Doctors** → Mothers inside Women; Doctors overlapping both (some doctors are women, some mothers).
- **Pen, Pencil, Stationery** → two separate circles inside a bigger one.
- **Dog, Cat, Animal** → two separate circles inside a big circle.
- Minimum number of circles for **Engineers, Doctors, Fathers, Males** = **3** (Fathers inside Males; Engineers and Doctors separate circles) — mock Q150.
- Regions: with 2 intersecting circles there are 3 inside regions (A only, both, B only); with 3 circles, 7 regions inside.
- Counting problems: draw the Venn with numbers as in Chapter 6.

**⚡ Exam tip:** "All + All = All"; "Some + Some = nothing"; "All A are B" converts only to "Some B are A". Use extreme-word elimination in statement-conclusion questions.

---

## 11. Calendar & Clock

### Calendar formulas
- **Odd days** = remainder after dividing total days by 7. Day codes: **0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday**.
- **Leap year**: divisible by 4; for century years, divisible by **400**. 1900 is not leap; 2000 is leap; 2100 is not.
- Ordinary year = 365 days = **1 odd day**; leap year = 366 = **2 odd days**.
- **Centuries**: 100 years = 5 odd days; 200 years = 3; 300 years = 1; 400 years = 0.
- **Odd days in months** (ordinary year): Jan 3, Feb 0 (leap: 1), Mar 3, Apr 2, May 3, Jun 2, Jul 3, Aug 3, Sep 2, Oct 3, Nov 2, Dec 3. (31-day months → 3; 30-day months → 2; Feb → 0/1.)
- **Same date next year**: weekday moves **+1**, or **+2** if 29 February lies in between.
- Leap years in a span: ⌊years/4⌋ minus century corrections.
- A calendar repeats: leap-year calendar after 28 years (within the same century); ordinary years: 2015 and 2026 calendars are identical (both start on Thursday, both ordinary).
- Reference dates: **26 Jan 1950 was Thursday; 15 Aug 1947 was Friday; 1 Jan 2000 was Saturday**.
- 1 Jan 2001 was a Monday (400-year cycle start 1 Jan 2000 was Saturday).

Worked: **What day was 26 January 1950?** Completed years 1600 → 0 odd; 1601–1900 (300 years) → 1; 1901–1949 (49 years): 12 leap years → 49 + 12 = 61 → 5; total odd days = 1 + 5 = 6; add 26 days of January (26 mod 7 = 5) → 6 + 5 = 11 → 4 → **Thursday** ✓.
Worked (mock): **9 September 2023**: 1 Jan 2023 was a Sunday; days from 1 Jan to 9 Sep = 243 (Jan–Aug) + 9 − 1 = 251; 251 mod 7 = 6 → Sunday + 6 = **Saturday** ✓.
Worked (mock): 15 Aug 2012 is Wednesday; to 15 Aug 2014 = 730 days (no 29 Feb in between as 29 Feb 2012 is before Aug and 2013, 2014 ordinary) → 730 mod 7 = 2 → Wednesday + 2 = **Friday** ✓.
Worked: if today is Monday, what day is it after 61 days? 61 mod 7 = 5 → Monday + 5 = **Saturday**. What day was it 100 days ago? 100 mod 7 = 2 → Monday − 2 = **Saturday**.
Worked: how many Sundays in a leap-year February that begins on a Sunday? 29 days = 4 weeks + 1 → **5** Sundays. An ordinary year has 53 of one weekday (the day it starts on); a leap year has 53 of two weekdays (its first day and the next).
- **Number of weekdays in a month**: 28 days → every day 4 times; extra days (29th, 30th, 31st) follow the starting day.
- A year has **52 weeks + 1 day** (ordinary), **52 weeks + 2 days** (leap).
- Day names: Sunday 0 ... Saturday 6; "day before yesterday", "day after tomorrow" are ±2.
- Question type: "If the 3rd of a month falls on Monday, what day is the 24th?" → 21 days later = same day → **Monday**.

### Clock formulas
- Hour hand moves **0.5° per minute** (30° per hour); minute hand moves **6° per minute**; the minute hand gains **5.5° per minute** over the hour hand.
- **Angle between the hands = |30H − 5.5M|** (take 360 − angle if greater than 180) where H = hour, M = minutes.
- Worked: at 3:40: |90 − 220| = **130°**. At 4:20: |120 − 110| = **10°**. At 6:00: 180°. At 9:00: 90°.
- **Hands coincide** (0°): 11 times in 12 hours, 22 times in a day; every **65 5/11 minutes**; at time H:M with M = 60H/11. Between 4 and 5: 4 + 240/11 min → **4:21 9/11**.
- **Hands at right angle (90°)**: **22 times in 12 hours, 44 times in a day**. **Opposite (180°)**: 11 times in 12 hours, 22 in a day. **Coincide**: 11 times in 12 hours, 22 in a day.
- Exact minutes for an angle θ after H o'clock: M = (30H ± θ)/5.5 = 2(30H ± θ)/11 (both give two times in the hour).
- Worked: at what time between 3 and 4 are the hands at right angle? M = 2(90 ± 90)/11 → 0 (3:00) or 360/11 = **3:32 8/11**.
- **Mirror image**: time in mirror = **11:60 − actual time** (i.e. 12:00 − time). 3:20 → 8:40; 9:15 → 2:45.
- **Slow/fast clock**: add the total gain (or loss) over the elapsed time. A clock that is 5 min slow at noon and loses 5 min per hour is 5 + 5 × 6 = **35 min slow** at 6 pm. A clock gaining 2 min per hour set right at 12 noon shows 12:12 after 6 hours.
- Reflection of the clock face: opposite positions add to 12 hours.
- Time gap: hour hand angle at H:M = 30H + 0.5M; minute hand = 6M.

**⚡ Exam tip:** Calendar: odd days — 100 yrs = 5, 200 = 3, 300 = 1, 400 = 0; same date next year moves +1 weekday (+2 if a 29 Feb falls in between). Clock angle = |30H − 5.5M|; hands coincide 22 times a day.

---

## Quick Revision Sheet

1. HCF × LCM = product of two numbers; HCF → "greatest/largest/biggest", LCM → "least/together again".
2. Divisibility by 11: (odd-place sum) − (even-place sum) = 0 or a multiple of 11; by 8: last three digits.
3. Number of factors of p^a q^b = (a + 1)(b + 1). Zeros in n! = ⌊n/5⌋ + ⌊n/25⌋ + ...
4. Successive change a%, b%: a + b + ab/100; +20% then −20% = −4%.
5. A is x% more than B → B is x/(100 + x) × 100 % less than A (25% → 20%).
6. Profit/loss % on CP; discount % on MP; MP = CP(1 + p)/(1 − d); same-price x% gain & x% loss → loss x²/100 %.
7. SI = PRT/100; CI = P(1 + R/100)ⁿ − P; half-yearly → R/2, 2n; CI − SI (2 yrs) = P(R/100)².
8. Average speed for equal distances = 2xy/(x + y); two numbers' average = sum/2.
9. Time-work: together = ab/(a + b); use LCM units; pipes: inlet +, outlet −.
10. km/h × 5/18 = m/s; train crossing platform: (L + P)/S; opposite trains: add speeds.
11. Boat: downstream u + v, upstream u − v; u = (D + U)/2, v = (D − U)/2.
12. Areas: triangle ½bh, equilateral (√3/4)a², rhombus ½d₁d₂, trapezium ½(a + b)h, circle πr², sector (θ/360)πr².
13. Volumes: cuboid lbh, cylinder πr²h, cone ⅓πr²h, sphere (4/3)πr³, hemisphere (2/3)πr³; 1 m³ = 1000 L.
14. Bricks/tiles = volume or area of structure ÷ volume or area of one unit; same units!
15. (a + b)² = a² + 2ab + b²; a² − b² = (a + b)(a − b); a + b + c = 0 → a³ + b³ + c³ = 3abc.
16. Congruence: SSS, SAS, ASA, AAS, RHS; AAA and SSA do not work.
17. Circle: central angle = 2 × circumference angle; semicircle angle 90°; cyclic quadrilateral opposite angles sum 180°.
18. n(A ∪ B) = n(A) + n(B) − n(A ∩ B); subsets of n elements = 2ⁿ.
19. Pie chart: 1% = 3.6°; % change = change/original × 100.
20. Alphabet: opposite letter = 27 − position; EJOTY = 5, 10, 15, 20, 25; letters between = difference − 1.
21. Series: try differences, ratios, squares/cubes ±, ×n + c (5, 11, 23, 47, 95, 191), n(n + 1), Fibonacci, primes.
22. Blood relations: draw a tree from the end of the sentence; gender of cousin/spouse/friend unknown.
23. Ranking: total = from top + from bottom − 1; between = difference − 1.
24. Direction: right = clockwise; morning shadow falls west; distance by Pythagoras.
25. Syllogism: All + All = All; All + Some = nothing; Some + Some = nothing; No + All = Some not; All A are B converts to Some B are A.
26. Calendar odd days: 100 yrs = 5, 200 = 3, 300 = 1, 400 = 0; leap year divisible by 4 (centuries by 400); same date +1 weekday (+2 across 29 Feb).
27. Clock: angle = |30H − 5.5M|; hands coincide 22 times and are at right angles 44 times a day (11 and 22 in 12 h); mirror time = 11:60 − T.
28. Venn: Fathers ⊂ Males, so Engineers, Doctors, Fathers, Males need only 3 circles.
