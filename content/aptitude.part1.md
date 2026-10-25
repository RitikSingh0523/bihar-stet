# Mathematical Aptitude & Logical Reasoning

> Part III (General) of the Bihar STET Paper II asks **5 Mathematical Aptitude + 5 Logical Reasoning questions = 10 questions (10 marks, about 4-5 minutes of the 2.5 hour paper if you are quick)**. Maths is school level (Class VI-X arithmetic: profit-loss, ratio, SI, mensuration, averages). Reasoning is series, coding-decoding, calendar, odd-one-out, Venn. These are the easiest marks in the paper: practise speed, not theory. Official 2025 papers and the mock tests repeat the same patterns.

---

## 1. Number System, Divisibility, HCF & LCM

### Types of numbers
- **Natural**: 1, 2, 3, ... ; **Whole**: 0, 1, 2, ... ; **Integers**: ..., -2, -1, 0, 1, ...
- **Prime**: exactly 2 factors (2 is the only even prime; 1 is neither prime nor composite). Primes below 50: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47 (25 primes below 100).
- **Co-prime**: HCF = 1 (need not be prime themselves, e.g. 8 and 15). **Twin primes**: differ by 2 (11, 13). **Perfect number**: equals the sum of its proper factors (6, 28).
- **Rational** = p/q (q ≠ 0): terminating or recurring decimals. **Irrational**: non-terminating non-recurring (√2, π).
- Useful sums: 1+2+...+n = n(n+1)/2; sum of first n odd numbers = n²; sum of first n even numbers = n(n+1); sum of squares = n(n+1)(2n+1)/6; sum of cubes = [n(n+1)/2]².

### Divisibility rules

| By | Rule |
|---|---|
| 2 | last digit even |
| 3 | sum of digits divisible by 3 |
| 4 | last two digits divisible by 4 |
| 5 | last digit 0 or 5 |
| 6 | divisible by both 2 and 3 |
| 8 | last three digits divisible by 8 |
| 9 | sum of digits divisible by 9 |
| 10 | last digit 0 |
| 11 | (sum of digits at odd places) − (sum at even places) = 0 or a multiple of 11 |
| 7 | double the last digit, subtract from the rest; repeat (or just divide) |
| 12 | divisible by 3 and 4 |
| 15 | divisible by 3 and 5 |

Example: 2728 → (2+2) − (7+8) = −11 → divisible by 11 (2728 = 11 × 248).
Example: smallest digit x so that 4x56 is divisible by 9? 4+x+5+6 = 15+x → x = 3.

### HCF and LCM
- **HCF** (GCD) = greatest number dividing all; **LCM** = least number divisible by all.
- Prime factorisation: HCF = product of **lowest** powers of common primes; LCM = product of **highest** powers of all primes.
- **HCF × LCM = product of the two numbers** (only for two numbers).
- HCF of fractions = HCF(numerators) / LCM(denominators); LCM of fractions = LCM(numerators) / HCF(denominators).
- HCF divides the difference of the numbers; LCM is a multiple of every number.

```
12 = 2² × 3 ; 18 = 2 × 3² ; 30 = 2 × 3 × 5
HCF = 2 × 3 = 6 ; LCM = 2² × 3² × 5 = 180
```

Word-problem templates:

| Question says | Use |
|---|---|
| Bells ring together again / traffic lights change together / runners meet at start | **LCM** |
| Largest tile / greatest length measuring exactly / largest group / cut into equal pieces | **HCF** |
| Least number divisible by a, b, c | LCM |
| Least number which leaves remainder r on dividing by a, b, c | LCM + r |
| Greatest number dividing x, y, z leaving remainders p, q, r | HCF of (x−p), (y−q), (z−r) |
| Greatest number dividing x, y leaving the **same** remainder | HCF of (x−y) |

Example: largest number dividing 245 and 1029 leaving remainder 5 in each: HCF(240, 1024) = **16**.
Example: least number divisible by 12, 15, 20, 27 = **540**.
Example: least number which leaves remainder 3 when divided by 8, 12, 16: LCM = 48, answer 48 + 3 = **51**.
Example: smallest square tiles to floor a 5 m 20 cm × 3 m 90 cm hall: HCF(520, 390) = 130 cm. Number of tiles = (520/130) × (390/130) = 4 × 3 = **12**.

### Number-property shortcuts
- Number of factors of N = p^a · q^b · r^c: **(a+1)(b+1)(c+1)**. 180 = 2²·3²·5 → 3·3·2 = 18 factors.
- **Unit-digit cycles** (power mod 4): 2 → 2,4,8,6; 3 → 3,9,7,1; 7 → 7,9,3,1; 8 → 8,4,2,6; 4 → 4,6; 9 → 9,1; 0,1,5,6 never change. Example: unit digit of 7⁴⁵: 45 mod 4 = 1 → **7**.
- Trailing zeros in n! = ⌊n/5⌋ + ⌊n/25⌋ + ...; for 100!: 20 + 4 = **24**.
- Remainder = dividend − divisor × quotient. If a number leaves remainder r on division by d, then (number − r) is a multiple of d.
- Squares to know: 11²=121, 12²=144, 13²=169, 14²=196, 15²=225, 16²=256, 17²=289, 18²=324, 19²=361, 25²=625. Cubes: 2³=8, 3³=27, 4³=64, 5³=125, 6³=216, 7³=343, 8³=512, 9³=729.
- A number ending in 5: (n5)² = n(n+1) followed by 25 → 75² = 7×8 → 5625.
- Recurring decimal 0.3333... = 1/3; 0.\overline{ab} = ab/99.

### Class VI flavour: Roman numerals & place value
- I=1, V=5, X=10, L=50, C=100, D=500, M=1000.
- A symbol is not repeated more than 3 times; **V, L, D are never repeated or subtracted**; I is subtracted only from V and X; X only from L and C; C only from D and M. 49 = XLIX, 1994 = MCMXCIV, 90 = XC.
- Indian system: ones, tens, hundreds, thousands, **lakhs, crores**; International: millions, billions. 1 crore = 10 million; 1 lakh = 100 thousand.
- Rounding/estimation: round to nearest 10/100; a number rounds up when the next digit is 5 or more.

**⚡ Exam tip:** "Same remainder" and "least number" questions are HCF/LCM in disguise: subtract the remainders for HCF, add the remainder for LCM. HCF × LCM = product works for TWO numbers only.

---

## 2. Percentage, Ratio & Proportion, Average, Alligation

### Percentage
- x% = x/100. **Percentage change = (change / original) × 100.**
- Fraction ↔ percent table (memorise):

| 1/2 | 1/3 | 1/4 | 1/5 | 1/6 | 1/7 | 1/8 | 1/9 | 1/10 | 1/11 | 1/12 |
|---|---|---|---|---|---|---|---|---|---|---|
| 50 | 33⅓ | 25 | 20 | 16⅔ | 14²⁄₇ | 12.5 | 11⅑ | 10 | 9¹⁄₁₁ | 8⅓ |

- **Successive changes** of a% and b%: net = a + b + ab/100 (use minus for decreases). +20% then −20% → 20 − 20 − 4 = **−4%**.
- If A is x% more than B, then B is x/(100+x) × 100 % less than A. A is 25% more than B → B is 20% less than A.
- If a price rises by x%, consumption must fall by x/(100+x) × 100 % to keep expenditure same. 20% rise → 16⅔% cut.
- Rectangle: length +10%, breadth +10% → area +21%. Length +20%, breadth −20% → area −4%. Side of square +x% → area +(2x + x²/100)%.
- Population growth: P(1 + r/100)ⁿ; decay P(1 − r/100)ⁿ.
- Marks: pass marks = x% of total. Example: a student gets 30% and fails by 15; with 35% he passes by 20 → 5% = 35 marks → total = 700, pass marks = 225.
- Example: 35% of 640 = 0.35 × 640 = **224**.
- Example: in an election a candidate got 55% of votes and won by 300 votes (two candidates) → 10% = 300 → total = **3000**.

### Ratio & Proportion
- a : b = a/b. Compare ratios by cross multiplication. Equal ratios: a : b = c : d ⇒ **ad = bc** (product of extremes = product of means).
- Combining: A : B = 4 : 5 and B : C = 6 : 7 → make B equal: A : B = 24 : 30, B : C = 30 : 35 → **A : C = 24 : 35**. (Quick: multiply B's cross-wise.)
- A : B = 2 : 3 and B : C = 4 : 5 → A : B : C = 8 : 12 : 15.
- Dividing an amount in ratio m : n : p: parts = amount × m/(m+n+p). Rs 840 in 3 : 4 : 5 → one part = 840/12 = 70 → shares 210, 280, 350.
- Mean proportional of a, b = √(ab); third proportional of a, b = b²/a; fourth proportional of a, b, c = bc/a.
- **Direct** proportion: more → more (cost vs articles). **Inverse**: more → less (men vs days, speed vs time).
- Ratio of ages: after t years, add t to each person's age. Ratio of ages 3 : 5, sum 40 → ages 15 and 25.
- Partnership: profit share ∝ (capital × time).
- Compounded ratio of a:b and c:d is ac : bd; duplicate ratio a² : b²; sub-duplicate √a : √b.
- Proportion with fractions: if x/y = 3/4 then (x+y)/(x−y) = (3+4)/(3−4) = −7 (componendo-dividendo).

### Average (Mean)
- **Average = Sum ÷ Number of items.** Sum = Average × n.
- Average of first n natural numbers = (n+1)/2; first n even = n+1; first n odd = n; AP average = (first + last)/2; average of consecutive numbers = middle value.
- Average speed for equal distances = **2xy/(x+y)**; for equal times = (x+y)/2. 60 and 40 km/h over equal distances → **48 km/h**.
- Adding/removing a member: new item = new avg × (n+1) − old sum. Example: average of 10 numbers is 20; adding an 11th makes it 21 → 11th = 21×11 − 200 = **31**.
- Example (mock): average of 5 numbers 24; remove 14 → (120 − 14)/4 = **26.5**.
- If a member is replaced: change in total = (new avg − old avg) × n. Replacing a 30-year-old member by a younger one drops average of 6 by 2 years → new member is 12 years younger = 18.
- Weighted average = Σ(wᵢxᵢ)/Σwᵢ. Marks: 20 students avg 60, 30 students avg 70 → (1200+2100)/50 = **66**.
- Class VI: **mean** = sum/n, **median** = middle item after ordering (average of two middles for even n), **mode** = most frequent, **range** = max − min.

### Alligation & mixture
- Two items of price c (cheaper) and d (dearer) mixed to get mean price m: **quantity of cheaper : dearer = (d − m) : (m − c)**.
- Example: rice at Rs 40/kg and Rs 60/kg mixed to sell at Rs 52 cost → (60−52) : (52−40) = 8 : 12 = **2 : 3**.
- Milk-water: milk : water = 3 : 1 in 40 L → milk 30 L, water 10 L; to make the ratio 1 : 1 add **20 L** of water (milk stays 30).

**⚡ Exam tip:** "A is x% more than B" is a percentage of B (the base); reversing it needs x/(100+x). Net of +20% and −20% is −4%, not 0.

---

## 3. Profit & Loss, Discount, Simple & Compound Interest

### Profit and loss
```
Profit = SP − CP          Loss = CP − SP
Profit% = (Profit / CP) × 100       Loss% = (Loss / CP) × 100   (always on CP)
SP = CP × (100 + P%)/100            SP = CP × (100 − L%)/100
CP = SP × 100/(100 + P%)            CP = SP × 100/(100 − L%)
```
- Example: shirt CP 400, profit 20% → SP = 400 × 1.2 = **480**.
- Example: table bought Rs 1250, loss 12% → SP = 1250 × 0.88 = **1100**.
- Example: CP 800, SP 920 → profit 120 → 15%.
- **Discount** is always on **Marked Price (MP)**: SP = MP × (1 − d/100). MP = CP × (100 + P%)/(100 − D%).
- Example (mock): CP 500, gain 20%, discount 20% → SP = 600, MP = 600/0.8 = **750**.
- Successive discounts of a% and b%: single discount = a + b − ab/100. 20% and 10% → **28%**.
- Two articles sold at the same price, one at x% gain and other at x% loss → always a **loss of x²/100 %**. 10% each → 1% loss.
- Dishonest dealer (false weight): gain% = (error/(true value − error)) × 100. Sells 900 g for 1 kg: gain = 100/900 = 11.11%.
- "Sold at a profit of 20% instead of loss of 10% would give Rs 90 more": 30% of CP = 90 → CP = 300.
- If CP of 20 articles = SP of 16 articles → profit = 4/16 = 25%.
- Ratio trick: if profit% = x, SP : CP = (100+x) : 100. Gain 25% → SP : CP = 5 : 4.
- Selling price for desired profit after discount: use MP route above.

### Simple Interest
```
SI = P × R × T / 100       A = P + SI = P(1 + RT/100)
P = 100 × SI / (R × T)     R = 100 × SI / (P × T)     T = 100 × SI / (P × R)
```
- T in **years** (months/12, days/365).
- Example (mock): SI on 2000 at 5% for 3 years = 2000 × 5 × 3/100 = **300**.
- Example: SI on Rs 4000 at 7.5% p.a. for 3 years = **900**.
- Sum doubles in T years at R%: R × T = 100. Sum becomes **n times** in T years: R × T = 100(n−1). Triples in 10 years → R = **20%**.
- A sum lent in two parts at different rates: use total interest equation. Rs 6000 split such that parts at 5% and 10% earn Rs 450 per year: x×5% + (6000−x)×10% = 450 → x = 3000.

### Compound Interest
```
A = P (1 + R/100)ⁿ        CI = A − P
Half-yearly: A = P (1 + R/200)^(2n)      Quarterly: A = P (1 + R/400)^(4n)
Different rates r1, r2, r3 in successive years: A = P(1+r1/100)(1+r2/100)(1+r3/100)
```
- CI − SI for **2 years** = P (R/100)². For **3 years** = P (R/100)² (3 + R/100).
- Example: CI on Rs 10 000 at 10% for 2 years: A = 10000 × 1.21 = 12100 → CI = **2100**; SI = 2000; difference 100 = 10000 × (0.1)².
- Example: Rs 8000 at 10% p.a. half-yearly, 1 year → rate 5%, 2 periods → 8000 × 1.1025 = 8820 → CI = **820**.
- If CI − SI for 2 years is Rs 25 at 5% → P = 25 × 400 = Rs 10 000.
- For one year, CI = SI (compounding only differs from the second period).
- Growth of money: a sum becomes 4 times in 2 years at CI → in 4 years becomes 16 times.
- Instalments, depreciation: value after n years = P(1 − r/100)ⁿ.

**⚡ Exam tip:** Profit/loss % is on CP, discount % is on MP. MP = CP × (1+profit)/(1−discount). For CI half-yearly halve the rate and double the time. CI − SI (2 yrs) = P(R/100)².

---

## 4. Time & Work, Pipes, Speed-Distance-Time, Trains, Boats

### Time and work
- Work rate = 1/(days). **A alone in a days, B alone in b days → together ab/(a+b) days.**
- **LCM (unit) method**: take total work = LCM of days. A 12 days, B 18 days → total 36 units; A = 3 units/day, B = 2 units/day; together 5/day → 36/5 = **7.2 days**.
- Work ∝ men × days × hours: **M₁D₁H₁/W₁ = M₂D₂H₂/W₂**. 10 men finish in 12 days → 15 men take 8 days.
- If A is twice as efficient as B, A takes half the time; if A does 1/3 work in 5 days, he finishes in 15.
- Wages are divided in the ratio of work done (efficiency × days). A 6 days alone, B 12 days: wage ratio 2 : 1 when working together.
- Work left: if A works x days and leaves, B finishes remaining (1 − x/a) in b(1 − x/a) days.
- **Alternate days**: A 10 days, B 15 days, A first. Two-day work = 1/10 + 1/15 = 1/6. After 10 days (5 cycles) 5/6 done; day 11 A does 1/10 → 14/15; day 12 B does 1/15 → total **12 days**.
- Three workers: 1/a + 1/b + 1/c = 1/T.

### Pipes and cisterns
- Inlet pipe fills (+), outlet pipe empties (−). Net rate = Σ(1/fill) − Σ(1/empty).
- Inlet fills in 6 h, outlet empties in 10 h: net = 1/6 − 1/10 = 1/15 → **15 h**.
- A leak that empties a full tank in x hours: if the tank normally fills in a, with leak fills in b: leak empties in ab/(b − a).
- Same formula as work: pipes = workers, tank = job.

### Speed, distance, time
- **Speed = Distance / Time.** km/h → m/s: **× 5/18**; m/s → km/h: **× 18/5**. 54 km/h = 15 m/s; 72 km/h = 20 m/s.
- Same distance: speed ∝ 1/time. Same time: distance ∝ speed.
- Average speed (total distance / total time). Equal distances at x and y: 2xy/(x+y).
- Relative speed: same direction **x − y**; opposite directions **x + y**.
- A walks at 3/4 of usual speed and is 20 min late → usual time = 20 × 3 = 60 min (time ratio 4:3, difference 1 part = 20 min).
- Meeting problems: two people start from points d apart towards each other, meet after d/(x+y).

### Trains
- Train of length L crosses:
  - a **pole / man / signal** in L/S;
  - a **platform / bridge** of length P in **(L + P)/S**;
  - another train of length L₂: **(L₁ + L₂)/(relative speed)** (add speeds if opposite, subtract if same direction).
- Example: 150 m train at 54 km/h → 15 m/s; pole: 150/15 = **10 s**; 300 m platform: 450/15 = **30 s**.
- Example: trains of 120 m and 180 m at 60 and 48 km/h in opposite directions: relative = 108 km/h = 30 m/s; time = 300/30 = **10 s**.
- Man standing: use relative speed with a moving man: train 100 m, speed 60 km/h, man running at 6 km/h in same direction: relative 54 km/h = 15 m/s → 100/15 = 6.67 s.

### Boats and streams
- Boat speed in still water u, stream v: **downstream = u + v; upstream = u − v.**
- u = (D + U)/2; v = (D − U)/2.
- Example: u = 15, v = 5 → downstream 20, upstream 10. 60 km down = 3 h, 60 km back = 6 h; total 9 h for 120 km → average 13⅓ km/h (not 15).
- Time down : time up for same distance = (u − v) : (u + v).
- Same idea for flights with wind, swimmers.

### Circular track / races (quick)
- Two runners on a circular track meet first (same direction) after L/(difference of speeds); (opposite) L/(sum).
- Race: "A beats B by 20 m in a 100 m race" → when A finishes 100, B has done 80 → speeds 100 : 80 = 5 : 4.

**⚡ Exam tip:** Convert units before anything else (km/h × 5/18 for metres and seconds). Round-trip average speed is the harmonic mean, never the simple mean. Trains passing a platform: distance = L + P.

---

## 5. Mensuration (2-D and 3-D)

### 2-D figures

| Figure | Area | Perimeter |
|---|---|---|
| Square (side a) | a² ; also d²/2 | 4a |
| Rectangle (l, b) | l × b | 2(l + b) |
| Parallelogram | base × height | 2(a + b) |
| Triangle | ½ × base × height | a + b + c |
| Equilateral triangle | (√3/4) a² | 3a |
| Right triangle | ½ × (perpendicular sides) | sum of 3 sides |
| Heron (any triangle) | √[s(s−a)(s−b)(s−c)], s = (a+b+c)/2 | |
| Rhombus | ½ × d₁ × d₂ | 4a |
| Trapezium | ½ (a + b) × h | sum of sides |
| Circle (r) | πr² | 2πr (circumference) |
| Semicircle | ½πr² | πr + 2r |
| Sector (angle θ) | (θ/360) × πr² | arc = (θ/360) × 2πr |
| Ring/annulus | π(R² − r²) | |

- π = 22/7 or 3.14. Diagonal of square = a√2; diagonal of rectangle = √(l² + b²).
- Example (mock): rhombus diagonals 16 and 12 cm → area = ½ × 16 × 12 = **96 cm²** = 0.0096 m².
- Example: triangle sides 13, 14, 15 → s = 21 → area = √(21 × 8 × 7 × 6) = **84**.
- Example: park 30 m × 20 m with a path 2 m wide outside: (30+4)(20+4) − 600 = 816 − 600 = **216 m²**.
- Wheel of radius 35 cm covers distance per revolution = 2 × 22/7 × 35 = 220 cm; in 1000 revs → 2200 m.
- Area ratio of circles = (radius ratio)²; area of similar figures ∝ (side)².
- Rectangle with area 48 and l : b = 3 : 1: 3b² = 48 → b = 4, l = 12 → perimeter **32**.

### 3-D solids

| Solid | Volume | Curved/Lateral SA | Total SA |
|---|---|---|---|
| Cube (a) | a³ | 4a² | 6a² |
| Cuboid (l, b, h) | lbh | 2h(l + b) | 2(lb + bh + hl) |
| Cylinder (r, h) | πr²h | 2πrh | 2πr(r + h) |
| Cone (r, h, slant l) | ⅓πr²h | πrl | πr(r + l) |
| Sphere (r) | (4/3)πr³ | 4πr² | 4πr² |
| Hemisphere | (2/3)πr³ | 2πr² | 3πr² |
| Prism | base area × h | perimeter × h | lateral + 2 × base |
| Pyramid | ⅓ × base area × h | ½ × perimeter × slant | lateral + base |

- Cone: l² = r² + h². Cube diagonal = a√3; cuboid diagonal = √(l² + b² + h²).
- Conversions: 1 m³ = 1000 L; 1 cm³ = 1 mL; 1 m = 100 cm so 1 m² = 10 000 cm²; 1 m³ = 10⁶ cm³; 1 hectare = 10 000 m².
- **Volume is conserved** when a solid is melted and recast: n × (volume of small) = volume of big. A sphere of radius 6 recast into spheres of radius 2 → (6/2)³ = **27** spheres.

### Typical problems
- **Bricks**: number = volume of wall ÷ volume of one brick (ignore mortar unless told). Wall 20 m × 3 m × 0.25 m = 15 m³; brick 25 × 12.5 × 7.5 cm = 0.00234375 m³ → **6400 bricks**.
- **Tiles**: number = area of floor ÷ area of one tile. Room 6 m × 4 m = 24 m²; square tile 40 cm → 0.16 m² → **150 tiles**.
- **Tank / cuboid**: 5 m × 4 m × 3 m = 60 m³ = 60 000 L. Water level rise when a solid is dropped = volume of solid ÷ base area.
- **Painting**: cost = area × rate; for a closed room subtract doors/windows; painting four walls uses lateral area 2h(l + b).
- **Cylinder**: r = 7, h = 10: V = 22/7 × 49 × 10 = 1540 cm³; CSA = 2 × 22/7 × 7 × 10 = 440 cm².
- **Cube scaling**: side +10% → surface area +21%, volume +33.1%. Doubling the side → area ×4, volume ×8.
- Cube of side 6 cm cut into 1 cm cubes → 216 cubes; if outer faces are painted, 3-face painted cubes = 8 (corners), 2-face = 12(n−2), 1-face = 6(n−2)², unpainted = (n−2)³.
- Surface area of cuboid with l = 6, b = 4, h = 3: 2(24 + 12 + 18) = 108.
- Open box made by cutting squares of side x from corners of an l × b sheet: V = (l − 2x)(b − 2x)x.

**⚡ Exam tip:** Convert ALL lengths to one unit first (cm or m) before multiplying. Volume formulas: cylinder πr²h, cone ⅓ of it, sphere (4/3)πr³. Rhombus area = ½ d₁d₂.

---

## 6. Algebra, Geometry, Sets & Venn, Data Interpretation, Class VI Maths

### Algebraic identities
```
(a + b)² = a² + 2ab + b²            (a − b)² = a² − 2ab + b²
a² − b² = (a + b)(a − b)            (a + b)² − (a − b)² = 4ab
(a + b)³ = a³ + 3a²b + 3ab² + b³    (a − b)³ = a³ − 3a²b + 3ab² − b³
a³ + b³ = (a + b)(a² − ab + b²)     a³ − b³ = (a − b)(a² + ab + b²)
a³ + b³ + c³ − 3abc = (a + b + c)(a² + b² + c² − ab − bc − ca)
If a + b + c = 0 then a³ + b³ + c³ = 3abc
(x + a)(x + b) = x² + (a + b)x + ab
```
- If a + 1/a = k then a² + 1/a² = k² − 2 (and a³ + 1/a³ = k³ − 3k).
- Quadratic ax² + bx + c = 0: x = [−b ± √(b² − 4ac)]/2a; sum of roots = −b/a; product = c/a; discriminant D = b² − 4ac (D > 0 two real roots, D = 0 equal, D < 0 no real roots).
- Fast squares: 99² = (100 − 1)² = 9801; 102² = 10404; 47² − 43² = (90)(4) = 360.
- Example: x + y = 10, xy = 21 → x² + y² = 100 − 42 = 58.
- **Linear equation word problems**: define unknown, translate, solve.
  - Consecutive numbers: x, x+1, x+2; sum 48 → x = 15.
  - Two-digit number = 10x + y; reversed = 10y + x; difference = 9(x − y); sum = 11(x + y).
  - Ages: "5 years ago father was 3 times the son": set equation (F − 5) = 3(S − 5).
  - Fraction: add same number to numerator and denominator → set up (x + k)/(y + k).
- Pair of linear equations: eliminate one variable; x + y = 12, x − y = 4 → x = 8, y = 4.
- Exponent laws: aᵐ × aⁿ = aᵐ⁺ⁿ; aᵐ/aⁿ = aᵐ⁻ⁿ; (aᵐ)ⁿ = aᵐⁿ; a⁰ = 1; a⁻ⁿ = 1/aⁿ.

### Geometry basics
- Angle sum of a triangle = 180°; **exterior angle = sum of two opposite interior angles**; sum of exterior angles of any polygon = 360°.
- Triangle inequality: sum of any two sides > third side. (3, 4, 8 cannot form a triangle.)
- Polygon: interior angle sum = (n − 2) × 180°; each angle of a regular polygon = (n − 2) × 180/n; each exterior = 360/n. Regular hexagon: 120° each; pentagon 108°; number of diagonals = n(n − 3)/2.
- Complementary angles add to 90°; supplementary to 180°; vertically opposite angles are equal; linear pair = 180°.
- Parallel lines cut by transversal: corresponding, alternate (interior) angles equal; co-interior add to 180°.
- Pythagoras: a² + b² = c². Triples: (3, 4, 5), (5, 12, 13), (8, 15, 17), (7, 24, 25), and their multiples.
- Isosceles triangle: base angles equal; equilateral: all 60°.
- Mid-point theorem: line joining mid-points of two sides is parallel to the third and **half** of it.
- Triangle centres: **centroid** (medians; divides each median 2 : 1), **incentre** (angle bisectors; centre of incircle), **circumcentre** (perpendicular bisectors), **orthocentre** (altitudes).
- Similar triangles: corresponding angles equal and sides proportional; **area ratio = (side ratio)²**. Criteria AA, SAS, SSS.

#### Congruence criteria

| Criterion | Meaning |
|---|---|
| **SSS** | three sides equal |
| **SAS** | two sides and the **included** angle equal |
| **ASA** | two angles and the **included** side equal |
| **AAS** | two angles and a non-included side (follows from ASA) |
| **RHS** | right angle, hypotenuse and one side equal (right triangles only) |

- **AAA and SSA are NOT congruence criteria** (AAA gives similarity only). CPCT = corresponding parts of congruent triangles are equal.

#### Circles
- Angle subtended at the centre = **2 × angle at the circumference** by the same arc; angle in a semicircle = **90°**.
- Angles in the same segment are equal. **Opposite angles of a cyclic quadrilateral sum to 180°.**
- Tangent is perpendicular to the radius at the point of contact; two tangents from an external point are equal in length.
- Perpendicular from the centre to a chord bisects the chord; equal chords are equidistant from the centre.
- Length of tangent from a point at distance d from centre: √(d² − r²). Diameter = 2r is the longest chord.

### Sets and Venn problems
- **n(A ∪ B) = n(A) + n(B) − n(A ∩ B)**.
- **n(A ∪ B ∪ C) = n(A) + n(B) + n(C) − n(A∩B) − n(B∩C) − n(A∩C) + n(A∩B∩C)**.
- Only A = n(A) − n(A ∩ B); neither = Total − n(A ∪ B). Complement n(A′) = n(U) − n(A).
- Number of subsets of an n-element set = 2ⁿ; proper subsets 2ⁿ − 1; power set has 2ⁿ elements.
- Example: class of 60; 35 like tea, 30 coffee, 10 both → union = 55 → **neither = 5**; only tea = 25.
- Example: 100 students: Maths 60, Physics 50, Chemistry 40, M∩P 30, P∩C 20, M∩C 25, all three 10 → at least one = 60+50+40−30−20−25+10 = **85**.
- Example: 80 people read Hindi or English; 50 Hindi, 45 English → both = 50 + 45 − 80 = 15.
- Set notation: ∈ belongs to, ∉, ⊂ subset, ∪ union, ∩ intersection, ∅ empty set; A − B = elements in A but not B. Set builder form: {x : x is a prime less than 10}.

### Data interpretation approach
1. Read the **title, axes, units, scale (thousands / lakhs / %)** before the question.
2. Percentage of total = part/total × 100; **percentage change = (new − old)/old × 100**; ratio = a : b simplified.
3. **Pie chart**: central angle = (value/total) × 360° (1% = 3.6°); 90° = 25%.
4. Bar/line graph: find the exact values at the required point; "increase" questions need difference/old value.
5. Table: compute averages = total/count; for "which is greatest" estimate with round numbers instead of exact division.
6. Example: sales 120 (2022) and 150 (2023) → growth = 30/120 × 100 = 25%. If a pie has 72° for rent in a total of Rs 50 000 → 20% = Rs 10 000.
7. Cumulative / index questions: mean = Σ/n; ratio of two bars = ratio of heights.

### Class VI maths (pedagogy flavour)
Typical question types from the Class VI syllabus:
- **Knowing our numbers**: place value, Indian/international systems, Roman numerals, estimation, largest/smallest 5-digit number with given digits.
- **Whole numbers**: number line, closure, commutative, associative, **distributive** (a × (b + c) = ab + ac); **0 is the additive identity, 1 the multiplicative identity**; successor/predecessor; patterns.
- **Playing with numbers**: factors, multiples, primes/composites, **Sieve of Eratosthenes**, divisibility tests, HCF, LCM, co-primes.
- **Integers**: negative numbers on the number line; −5 < 3; rules: (−) + (−) = (−); (−) × (−) = (+). 0 is neither positive nor negative.
- **Fractions**: proper (num < den), improper, mixed; equivalent fractions; compare by cross-multiplication; ¾ + ⅝ → LCD 8 → 11/8.
- **Decimals**: place value to tenths/hundredths; 0.5 = 1/2, 0.25 = 1/4; adding aligns the decimal point; Rs 3.50 = 350 paise.
- **Ratio and proportion**: simplest form; unitary method (cost of 1 → cost of many).
- **Algebra introduction**: variable, expressions; matchstick patterns (e.g. n squares need 3n + 1 sticks); 'x + 7 = 12' solved by balancing.
- **Basic geometry**: point, line, ray, segment; angles (acute < 90°, right = 90°, obtuse > 90°, straight = 180°, reflex > 180°); triangles by sides (scalene, isosceles, equilateral) and angles; quadrilaterals; **symmetry** (a square has 4 lines of symmetry, rectangle 2, equilateral triangle 3, circle infinitely many).
- **Perimeter and area**: rectangle, square; area by counting squares; area of triangle as half of rectangle.
- **Practical geometry**: constructing a circle, bisectors, angles of 60°, 90°, 120° using compass.
- **Data handling**: tally marks, pictographs (key: 1 symbol = n items), bar graphs, mean/median/mode.
- Teaching-method ideas that appear in the pedagogy items: use concrete objects (counters, beads), real-life contexts, number line and area models, error analysis (common misconception: "multiplication always makes bigger" fails for fractions and decimals; 0.5 < 0.25 is a wrong claim from comparing 5 > 25).
- Example: a rope of 5 m 40 cm is cut into pieces of 60 cm → 540/60 = 9 pieces.
- Example: Ria has 3/4 of a pizza, eats 1/3 of that → 3/4 × 1/3 = 1/4 pizza eaten, 1/2 left.

**⚡ Exam tip:** AAA and SSA never prove congruence; RHS is for right triangles only. In a three-set Venn problem draw the diagram and fill the centre first (triple overlap), then work outward.
