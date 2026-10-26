## 9. C Fundamentals: Types, Operators, Control Flow

### 9.1 About C
- Developed by **Dennis Ritchie** at Bell Labs (~1972) for rewriting UNIX; ancestors: ALGOL → BCPL → B (Ken Thompson) → C. Standardised as **ANSI C (C89/C90)**, then C99, C11.
- Procedural, structured, **compiled**, case-sensitive, **middle-level** language (high-level features + low-level memory access). Statements end with `;`. Execution starts at `main()`. Header `<stdio.h>` for I/O, `<stdlib.h>`, `<string.h>`, `<math.h>`, `<ctype.h>`.
- Program structure: preprocessor directives → global declarations → `main()` → user functions. Comments `/* ... */`, `//` (C99).
- Steps: edit (.c) → **preprocess** → **compile** (.o/.obj) → **link** → **load/execute**.

### 9.2 Keywords and identifiers
- **32 keywords in ANSI C**: `auto break case char const continue default do double else enum extern float for goto if int long register return short signed sizeof static struct switch typedef union unsigned void volatile while`. (C99 adds `inline restrict _Bool _Complex _Imaginary` → 37.)
- Keywords are lowercase and reserved; `main`, `printf`, `include`, `define`, `String`, `Int`, `then`, `integer` are NOT keywords. `main` is a function name.
- Identifier rules: letters, digits, underscore; **must start with a letter or underscore**; no spaces/special characters; not a keyword; case-sensitive (`sum` ≠ `Sum`); in C89 the first 31 characters are significant.
- Valid: `_x`, `a1`, `total_sum`. Invalid: `1a`, `my-var`, `int`, `float`, `a b`, `x$`.

### 9.3 Data types and sizes

| Type | Size (typical 32/64-bit compiler) | Format | Range |
|---|---|---|---|
| `char` | 1 byte | `%c` | -128 to 127 |
| `unsigned char` | 1 | | **0 to 255** |
| `short` | 2 | `%hd` | -32768 to 32767 |
| `int` | **4** (2 in old 16-bit Turbo C) | `%d` | -2³¹ to 2³¹-1 (-2147483648 to 2147483647) |
| `unsigned int` | 4 | `%u` | 0 to 4294967295 |
| `long` | 4 (Windows) / 8 (Linux-64) | `%ld` | |
| `long long` | 8 | `%lld` | |
| `float` | 4 | `%f` | ~6-7 decimal digits precision |
| `double` | 8 | `%lf` (scanf), `%f`/`%lf` (printf) | ~15 digits |
| `long double` | 10/12/16 | `%Lf` | |

- 16-bit `int`: -32768 to 32767; `unsigned` 0 to 65535. n-bit signed range: -2ⁿ⁻¹ to 2ⁿ⁻¹-1; unsigned 0 to 2ⁿ-1.
- Classification: **primary/basic** (`int char float double void`), **derived** (array, pointer, function), **user-defined** (`struct`, `union`, `enum`, `typedef`).
- Other specifiers: `%s` string, `%x` hex, `%o` octal, `%e` exponent, `%p` pointer, `%%` percent sign.
- `sizeof` is an **operator** (not a function) evaluated at compile time; `sizeof('A')` is **4** in C (character constants are `int`), 1 in C++. `sizeof("abc")` = 4 (includes `\0`).
- Constants: `const int x = 5;`, `#define PI 3.14`; octal literal starts with 0 (`010` = 8), hex `0x1F` = 31; `'A'` = 65, `'a'` = 97, `'0'` = 48. Floating literal without suffix is `double`; `10L` long; `3.5f` float.
- Variables must be **declared before use**; no `bool` before C99 (0 = false, non-zero = true).
- Type conversion: implicit promotion (char/short → int → long → float → double); explicit cast `(float) a / b`. Assigning float to int truncates.

### 9.4 Operators and precedence

| Level (high → low) | Operators | Associativity |
|---|---|---|
| 1 | `() [] -> .` postfix `++ --` | L → R |
| 2 | `! ~ ++ -- + - (type) * & sizeof` (unary) | **R → L** |
| 3 | `* / %` | L → R |
| 4 | `+ -` | L → R |
| 5 | `<< >>` | L → R |
| 6 | `< <= > >=` | L → R |
| 7 | `== !=` | L → R |
| 8 | `&` then 9 `^` then 10 `\|` | L → R |
| 11 | `&&` | L → R |
| 12 | `\|\|` | L → R |
| 13 | `?:` (ternary) | R → L |
| 14 | `= += -= *= /= %= <<= >>= &= ^= \|=` | R → L |
| 15 | `,` comma | L → R |

- `%` works only on integers (`5.5 % 2` is a compile error). Integer division **truncates toward zero**: `7/2 = 3`, `-7/2 = -3`; `%` takes the sign of the **dividend**: `-7 % 3 = -1`, `7 % -3 = 1`.
- Relational/logical operators give **1 or 0** (type int). `&&` and `||` **short-circuit**: in `a++ || b++` / `0 && x++` the right side may not run.
- Bitwise: `5 & 3 = 1`, `5 | 3 = 7`, `5 ^ 3 = 6`, `~5 = -6`, `1 << 3 = 8` (multiply by 2ⁿ), `16 >> 2 = 4`. Don't confuse `&` with `&&`.
- `++i` (pre: increment then use), `i++` (post: use then increment): `a = 5; b = a++ + 10;` → b = 15, a = 6; `b = ++a + 10` → b = 16.
- Comma operator evaluates left to right and gives the last: `x = (1, 2, 3);` → 3. Ternary: `max = (a > b) ? a : b;`.
- Assignment is right-associative: `a = b = 5`. `a += 2` ≡ `a = a + 2`.
- `3 > 2 > 1` → `(3 > 2) > 1` → `1 > 1` → **0**.
- Worked: `int x = 2 + 3 * 4 % 5;` → `3*4=12`, `12%5=2` (same level, left to right), `2+2` → **4**.
- Worked: `!5 + 3` → `(!5) + 3` = 0 + 3 = **3**.

### 9.5 Control flow
- Selection: `if`, `if-else`, `else-if` ladder, nested `if`, `switch`. Loops: `for`, `while` (entry-controlled), `do-while` (**exit-controlled**, runs at least once, ends with `;`). Jumps: `break`, `continue`, `goto`, `return`.
- `switch(expr)`: expr must be **integer or char** (no float/string); `case` labels must be unique integer/char **constants**; **no `break` → fall-through** to the next case; `default` optional (can be anywhere).
```
int n = 2;
switch (n) {
  case 1: printf("A");
  case 2: printf("B");     /* starts here */
  case 3: printf("C");
  default: printf("D");
}                          → BCD
```
- **Dangling else** binds to the nearest `if`:
```
int x = 10;
if (x > 5)
   if (x > 15) printf("A");
   else printf("B");       → B
```
- `for (init; cond; update)`; any part may be omitted; `for(;;)` is an infinite loop.
- Trap: `for (i = 0; i < 3; i++);` (stray semicolon) - empty body; then the next statement runs once with `i = 3`.
- `continue` skips the rest of the current iteration; `break` leaves the innermost loop/switch.
- Worked: `s = 0; for (i = 1; i <= 5; i++) { if (i == 3) continue; s += i; }` → 1+2+4+5 = **12**.
- Worked: `i = 0; while (i < 10) { i += 3; }` → 3, 6, 9, 12 → i = **12**.
- Worked pattern:
```
for (i = 0; i < 3; i++)
    for (j = 0; j <= i; j++) printf("*");      → 1 + 2 + 3 = 6 asterisks
```
- Assignment-in-condition trap: `if (x = 0)` assigns 0, condition false; `if (x = 5)` always true.

**⚡ Exam tip:** ANSI C has 32 keywords; `%` is integer-only and takes the dividend's sign; `/` on two ints truncates; `switch` falls through without `break`; `do-while` runs at least once; unsigned char range is 0-255; `sizeof('A')` is 4 in C.

## 10. Arrays, Strings, Pointers, Functions, Recursion

### 10.1 Arrays
- Collection of **same-type** elements in contiguous memory; index from **0**; **no bounds checking** (out-of-range access = undefined behaviour). Size must be a constant in C89.
- `int a[5] = {1, 2, 3};` → remaining elements are **0** (`{1,2,3,0,0}`); `int a[] = {1,2,3};` size 3; uninitialised local array has garbage values; global/static arrays are zero.
- `a[i]` ≡ `*(a + i)` ≡ `*(i + a)` ≡ `i[a]`. The array name is the constant address of the first element (cannot be assigned: `a = b;` illegal). `sizeof(a)/sizeof(a[0])` = number of elements.
- 2-D: `int m[2][3] = {{1,2,3},{4,5,6}};` stored **row-major**; `m[1][2]` = 6; `sizeof(m)` = 2·3·4 = 24; column size is mandatory when passing to a function: `void f(int a[][3])`.
- Arrays are passed to functions **by address** (the callee can modify the original).
- Address of element: `&a[i]` = base + i × sizeof(type).

### 10.2 Strings
- A string is a **char array terminated by `'\0'`** (NUL, value 0). `char s[] = "hello";` → size **6**, `strlen(s)` = **5**. `char s[5] = "hello"` has no room for `\0` (bad).
- `char *p = "hello";` points to a read-only literal (modifying it is undefined); `char s[]` is modifiable.
- `<string.h>`: `strlen(s)` (excludes `\0`), `strcpy(d, s)`, `strncpy`, `strcat(d, s)`, `strcmp(a, b)` (returns **0 if equal**, negative if a < b, positive if a > b), `strchr`, `strstr`, `strrev`/`strupr` are NOT standard. `<ctype.h>`: `toupper`, `tolower`, `isdigit`, `isalpha`, `isspace`.
- Input: `scanf("%s", s)` stops at whitespace and needs no `&` (array name is an address); `gets(s)` reads a line but is unsafe/removed (use `fgets(s, n, stdin)`).
- `strcmp("abc", "abd")` < 0; `strcmp("a", "a")` = 0; `strlen("a\0b")` = 1; `"ab" == "ab"` compares addresses, not contents.
- Character arithmetic: `'a' - 'A'` = 32; `'A' + 2` = 'C'; `c - '0'` converts a digit char to its value; `printf("%d", 'A')` → 65; `printf("%c", 66)` → B.

### 10.3 Pointers
- A **pointer** stores the address of a variable. `int *p = &x;` - `&` address-of, `*` dereference (value at). `*p = *p + 3;` changes `x`.
- Worked: `int x = 7; int *p = &x; *p = *p + 3; printf("%d", x);` → **10**.
- **Pointer arithmetic** scales by the size of the pointed type: `p + n` adds `n × sizeof(*p)` bytes. If `int *p` = 1000 and int = 4 bytes: `p + 1` = 1004, `p + 3` = **1012**, `p - 1` = 996. For `char *` steps are 1; for `double *` steps are 8.
- Pointer subtraction gives number of elements: `&a[5] - &a[2]` = 3. Adding two pointers is illegal.
- `int a[] = {10,20,30,40}; int *p = a;` → `*p` = 10, `*(p+2)` = 30, `p[1]` = 20, `*p++` yields 10 then moves p to a[1]; `(*p)++` increments the value.
- `NULL` pointer = address 0 (dereferencing → crash); `void *` is a generic pointer (needs a cast to dereference); **pointer to pointer** `int **pp = &p;` → `**pp` = x; a **dangling pointer** points to freed/out-of-scope memory; **wild pointer** is uninitialised.
- Size of any pointer is the same for all types (4 bytes on 32-bit, 8 on 64-bit).
- **Dynamic memory** (`<stdlib.h>`): `malloc(n * sizeof(int))` (uninitialised, returns `void *`, NULL on failure), `calloc(n, size)` (**zero-initialised**), `realloc(p, newsize)`, `free(p)`. Memory comes from the **heap**; forgetting `free` → memory leak.
- Static memory regions: code, data (globals/static), stack (locals, function frames), heap.

### 10.3b Function pointers, 2D arrays and pointers
- **Pointer to function**: `int (*fp)(int, int) = add;` then `fp(2,3)` or `(*fp)(2,3)`. Without the parentheses, `int *fp(int,int)` declares a **function returning int***. Used for callbacks and menu tables.
- 2D array `int a[2][3]` is stored row by row (row-major). `a[i][j] == *(*(a+i)+j)`; `a+1` points to the whole **row 1**, `*(a+1)` is that row decayed to `int*`. Passing to a function needs the column size: `void f(int a[][3], int r)`.
- `sizeof` of a char array includes the `'\0'`: `char s[]="abcd"` gives sizeof 5, strlen 4; `char *p="abcd"` gives sizeof(p) = pointer size (string literal must not be modified).
- Nested loops: `break` leaves only the **innermost** loop; `continue` skips to the next iteration of the innermost loop; `goto label;` jumps within a function (avoid in structured code).
- A function can return only one value directly; to "return" several, pass pointers or return a structure.

### 10.4 Functions
- Declaration (prototype) `int add(int, int);` → definition → call. Return type `void` means nothing returned. `main` returns int (0 = success). Default return type of an undeclared function in C89 is int.
- **Call by value** (default): copies of arguments are passed; changes inside do not affect the caller. **Call by reference** is simulated by passing **addresses** (pointers).
```
void swap(int a, int b)   { int t = a; a = b; b = t; }      /* swap(x,y) → x=1,y=2 unchanged */
void swap2(int *a, int *b){ int t = *a; *a = *b; *b = t; }  /* swap2(&x,&y) → x=2,y=1 */
```
- A function can return only one value directly (use pointers/structures for more). Functions cannot be nested in C. Array name as parameter = pointer.
- Formal vs actual parameters; local variables live on the stack; `return` ends the function.
- Library functions vs user-defined; `main()` can be called recursively (rare).
- Variable-argument functions: `printf` uses `...` (`<stdarg.h>`).

### 10.5 Recursion
- A function that calls itself; requires a **base case**; each call has its own stack frame; no base case → stack overflow.
```
int fact(int n) { if (n <= 1) return 1; return n * fact(n - 1); }   fact(5) = 120
int f(int n)    { if (n < 2) return n; return f(n-1) + f(n-2); }    f(7) = 13   (Fibonacci)
void g(int n)   { if (n > 0) { printf("%d ", n); g(n - 1); printf("%d ", n); } }
g(3) → 3 2 1 1 2 3
```
- Fibonacci: f(0)=0, f(1)=1, 1, 2, 3, 5, 8, **13** (f(7)). Number of calls grows exponentially.
- Types: direct, indirect (mutual), tail recursion. Classic uses: factorial, Fibonacci, GCD (`gcd(a,b) = b==0 ? a : gcd(b, a%b)`), Towers of Hanoi (2ⁿ - 1 moves), binary search, tree traversal.

**⚡ Exam tip:** `sizeof` of a string array includes `\0`; array initialised partially → rest zero; `p + 1` moves by `sizeof(*p)`; plain C functions are call by value so a swap without pointers fails; `strcmp` returns 0 for equal strings.

## 11. Structures, Unions, Storage Classes, Preprocessor, File I/O

### 11.1 Structure vs union
```
struct Student { int roll; char name[20]; float marks; };
struct Student s1 = {1, "Ram", 85.5};
s1.roll = 2;                       /* dot operator */
struct Student *sp = &s1;
sp->roll;  (*sp).roll;             /* arrow operator - both equal s1.roll */
```

| | `struct` | `union` |
|---|---|---|
| Memory | each member has its **own** memory; size ≥ sum of members (padding) | all members **share** the same memory |
| Size | sum (+ padding) | size of the **largest** member |
| Access | all members usable together | only the **last written** member is valid |
| Keyword | `struct` | `union` |

- Example: `struct { char c; int i; }` typically 8 bytes (3 bytes padding for alignment); `union { int i; char c; double d; }` = 8 bytes.
- `typedef struct {...} Student;` creates an alias; `enum color {RED, GREEN, BLUE};` → RED = 0, GREEN = 1, BLUE = 2 (can assign values; the next continues +1).
- Structures can be nested, arrays of structures allowed, passed to functions by value, and assigned directly (`s2 = s1;` copies all members). Structure members cannot be initialised inside the declaration. Comparing structures with `==` is illegal.
- Bit fields: `unsigned a : 3;`. `self-referential` structure (pointer to itself) forms linked lists.

### 11.2 Storage classes

| Class | Storage | Default initial value | Scope | Lifetime |
|---|---|---|---|---|
| `auto` (default for locals) | stack | **garbage** | block | till block ends |
| `register` | CPU register (hint) | garbage | block | block; **cannot use `&`** |
| `static` | data segment | **0** | block (local static) or file | **whole program**, keeps value between calls |
| `extern` | data segment | 0 | global (whole program) | whole program; declares a variable defined elsewhere |

```
void f() { static int c = 0; c++; printf("%d ", c); }
f(); f(); f();     → 1 2 3
```
- A `static` local is initialised only once. A `static` global/function is visible only inside its file. Global variables default to 0. `const` makes a variable read-only. `volatile` tells the compiler the value may change unexpectedly.

### 11.3 Preprocessor
- Directives start with `#`, processed **before compilation**, no semicolon at the end.
- `#include <file>` (system header dirs) vs `#include "file"` (current directory first); `#define NAME value` (macro, text substitution, **no type checking, no memory**); `#undef NAME` (removes a macro); conditional: `#if`, `#ifdef`, `#ifndef`, `#else`, `#elif`, `#endif`; `#pragma`; `#error`; `#line`.
- Macro with args: `#define SQ(x) x*x` → `SQ(2+3)` expands to `2+3*2+3` = **11**, not 25. Fix with parentheses: `#define SQ(x) ((x)*(x))` = 25.
- Predefined: `__FILE__`, `__LINE__`, `__DATE__`, `__TIME__`. Include guards: `#ifndef H / #define H / ... / #endif`.
- Macros are expanded in place (faster, but code grows); functions are called (type-checked, less code).

### 11.4 File I/O in C
- `FILE *fp = fopen("a.txt", "r");` returns **NULL** on failure; always `fclose(fp)` (returns 0 on success).

| Mode | Meaning | If file missing | Existing content |
|---|---|---|---|
| `r` | read | **fails (NULL)** | kept |
| `w` | write | created | **erased** |
| `a` | append | created | kept |
| `r+` | read + write | **fails** | kept |
| `w+` | read + write | created | **erased** |
| `a+` | read + append | created | kept |
| `rb`, `wb`, `ab` | binary versions | | |

- Character I/O: `fgetc`/`getc`, `fputc`/`putc`; string: `fgets(buf, n, fp)`, `fputs`; formatted: `fprintf`, `fscanf`; block/binary: `fread(ptr, size, n, fp)`, `fwrite`; positioning: `fseek(fp, offset, SEEK_SET/SEEK_CUR/SEEK_END)`, `ftell`, `rewind`.
- `feof(fp)` returns **non-zero** when end-of-file is reached; `EOF` is the constant (usually -1) returned by `getc`; `stdin`, `stdout`, `stderr` are predefined streams.
- Text file vs binary file: in text mode newline translation occurs; binary stores raw bytes.
- Command-line arguments: `int main(int argc, char *argv[])` - `argc` = count (including program name), `argv[0]` = program name.

**⚡ Exam tip:** union size = largest member; struct members use `.` and pointers use `->`; `static` locals keep their value; `auto` locals start with garbage; `r+` needs the file to exist, `w+` erases; `#define` has no semicolon and `SQ(x) x*x` fails for expressions.

## 12. C Output Traps, Algorithms, Translators, Paradigms

### 12.1 Output traps with worked answers
```
1)  printf("%d", 5/2);                    → 2
2)  float f = 7 / 2; printf("%f", f);     → 3.000000    (integer division happens first)
3)  printf("%f", 7 / 2.0);                → 3.500000    ; (float)7/2 → 3.5 ; (float)(7/2) → 3.0
4)  int a = 10, b = 3; printf("%d %d", a / b, a % b);   → 3 1
5)  printf("%d", -7 / 2);  printf("%d", -7 % 3);        → -3 and -1
6)  printf("%d", printf("Hi"));           → Hi2        (printf returns number of chars printed)
7)  int a = 5; int b = a++ + 10;          → a = 6, b = 15
8)  int i = 5; int r = i++ + ++i;         → UNDEFINED/unspecified in C (unsequenced); textbooks give 12 (5 + 7)
9)  printf("%d", 'A');                    → 65 ; printf("%c", 'A' + 2); → C
10) printf("%d", sizeof(int) * 2);        → 8 (when int = 4)
11) int x = 10; if (x = 0) printf("Y"); else printf("N");  → N   (assignment, not comparison)
12) printf("%5d|%-5d|", 42, 42);          →    42|42   |
13) printf("%.2f", 3.14159);              → 3.14 ; printf("%x", 255); → ff ; printf("%o", 8); → 10
14) int a[5] = {1, 2, 3}; printf("%d", a[4]);           → 0
15) char s[] = "hello"; printf("%d %d", strlen(s), sizeof(s));  → 5 6
16) #define SQ(x) x*x   printf("%d", SQ(2+3));          → 11
17) printf("%d", 010 + 0x10);             → 8 + 16 = 24
18) unsigned char c = 255; c++; printf("%d", c);        → 0 (wraps modulo 256)
19) int i; for (i = 0; i < 3; i++); printf("%d", i);     → 3
20) printf("%d", 1 / 2 * 4);   printf("%d", 4 * 1 / 2); → 0 and 2   (left to right)
21) int a = 0, b = 5; if (a++ && b++) {}  printf("%d %d", a, b);  → 1 5  (short-circuit: b++ skipped)
22) printf("Hello\n" "World");             → Hello (newline) World; adjacent string literals are concatenated
23) void swap(int a, int b){...}  swap(x,y); printf("%d %d", x, y);   → 1 2 (unchanged, call by value)
24) printf("%d", 5 > 3 && 2 > 4 || 1);    → 1
25) int x = 7; x += x++ ;                 → undefined; avoid
```
- Typical mistakes: missing `&` in `scanf("%d", &n)`; `=` vs `==`; array index off by one; forgetting `break`; `;` after `if`/`for`/`while`; integer overflow; using `%d` for float (garbage); uninitialised variable (garbage); `main()` missing `return`.
- `printf` returns the number of characters printed; `scanf` returns the number of items successfully read (`EOF` on failure).
- `main()` returning 0 means normal termination. `void main()` is non-standard.

### 12.2 Algorithms and flowcharts
- **Algorithm**: finite, step-by-step, unambiguous procedure to solve a problem. Properties: **input** (≥ 0), **output** (≥ 1), **definiteness**, **finiteness**, **effectiveness** (each step basic and feasible), independent of language. NOT a property: "must use a loop", "must be written in code".
- Representation: natural language, **pseudocode**, **flowchart**. Program development life cycle: problem analysis → algorithm/flowchart → coding → compile/test/debug → documentation/maintenance.

| Flowchart symbol | Meaning |
|---|---|
| Oval / rounded rectangle | **Terminal** (Start / Stop) |
| Parallelogram | **Input / Output** |
| Rectangle | **Process** (calculation / assignment) |
| Diamond | **Decision** (yes/no, true/false branching) |
| Circle | **Connector** (on-page); pentagon: off-page connector |
| Arrow | Flow line (direction) |
| Hexagon | Preparation (loop initialisation) |
| Rectangle with double side bars | Predefined process / sub-routine |

- Classic algorithms: swap with temp (`t=a; a=b; b=t`), largest of three, factorial, Fibonacci, prime check (test divisors up to √n), GCD by Euclid (`gcd(48,18)`: 48%18=12, 18%12=6, 12%6=0 → **6**), sum of digits, reverse a number, Armstrong number (153 = 1³+5³+3³), palindrome, linear search (O(n)), binary search (sorted data, O(log n)), bubble sort (O(n²)).
- Control structures of structured programming: **sequence, selection, iteration**.
- Errors: **syntax** (compile time), **runtime** (e.g. divide by zero), **logical** (wrong output, no error message). Debugging finds and removes bugs; **testing** checks against expected output.

### 12.3 Language translators and generations

| Translator | Function |
|---|---|
| **Assembler** | assembly language → machine code |
| **Compiler** | translates the **whole** high-level program into object code at once; reports all errors after scanning; fast execution (C, C++) |
| **Interpreter** | translates and executes **line by line**; stops at the first error; slower, no separate object file (Python, JavaScript, BASIC) |

- Compiler phases: lexical analysis → syntax analysis (parsing) → semantic analysis → intermediate code generation → optimisation → code generation.
- **Linker** combines object files + libraries into an executable; **loader** places the executable in memory; **preprocessor** handles `#` directives. Java: compiled to **bytecode** then interpreted/JIT-compiled by the JVM. Python: bytecode interpreted by PVM.
- Source program → (compiler) → object program → (linker) → executable.
- Generations: **1GL** machine language (binary), **2GL** assembly language (mnemonics), **3GL** high-level (C, Pascal, Python, Java), **4GL** very high-level / non-procedural (SQL, report generators), **5GL** AI / constraint-based (Prolog).
- Machine language is the only language the CPU directly understands; assembly is machine-dependent; high-level languages are portable.

### 12.4 Programming paradigms

| Paradigm | Idea | Examples |
|---|---|---|
| **Procedural / imperative** | sequence of instructions grouped in procedures/functions | C, Pascal, FORTRAN, COBOL, BASIC |
| **Object-oriented** | objects = data + methods; classes, inheritance, polymorphism, encapsulation, abstraction | C++, Java, Python, C#, Smalltalk |
| **Functional** | computation as mathematical functions, no side effects, recursion | Haskell, Lisp, Scheme, (Erlang) |
| **Logic / declarative** | facts and rules, inference | **Prolog** |
| **Event-driven** | flow determined by events (clicks) | GUI/JavaScript, Visual Basic |
| **Structured** | sequence/selection/iteration, no goto | Pascal, C |
| **Scripting** | interpreted glue-code | Python, JavaScript, PHP, Perl |

- Match: C → procedural; Java → object-oriented; Prolog → logic; Haskell → functional.
- C is **not** object-oriented; C++ is **multi-paradigm** (procedural + OOP + generic); Python is multi-paradigm.
- Programming approaches: **top-down** (decompose main problem into modules; used in C) vs **bottom-up** (start from low-level modules; OOP). Modular programming improves reuse and debugging.

**⚡ Exam tip:** `printf` returns the character count (`printf("%d", printf("Hi"))` → Hi2); `7/2` is 3 even when stored in a float; a flowchart decision is a diamond and I/O a parallelogram; a compiler reports all errors after translating the whole program while an interpreter stops at the first error.

## Quick Revision Sheet

**Python**
1. Python: Guido van Rossum, 1991; interpreted, dynamically typed, case-sensitive, indentation-based; 35 keywords (`True False None` capitalised).
2. Identifier: letters/digits/underscore, not starting with a digit, not a keyword; `my-var`, `1x`, `class` invalid.
3. Mutable: list, dict, set; immutable: int, float, str, tuple, frozenset, bool. `s[0]='x'` → TypeError.
4. Precedence: `**` > unary > `* / // %` > `+ -` > comparisons/`in`/`is` > `not` > `and` > `or`. `-2**2 = -4`; `2**3**2 = 512`.
5. `//` floors (`-7//2 = -4`), `%` takes the divisor's sign (`-7%3 = 2`), `/` always float.
6. `and`/`or` return an operand: `0 or 5` → 5, `3 and 0` → 0; `is` = identity, `==` = value.
7. `int("3.5")` ValueError; `int(3.9)` = 3; `bool("0")` True; `input()` returns str; `round(2.5)` = 2.
8. Slicing `s[a:b:c]` excludes b; `s[::-1]` reverses; out-of-range slice OK, out-of-range index → IndexError.
9. `find` → -1 vs `index` → ValueError; `split`, `join`, `strip`, `title`, `replace` return new strings.
10. List: `append` (one object), `extend` (flatten), `pop` returns item, `sort()` returns None, `remove` first match.
11. Tuple: `(5,)` single element, only `count`/`index`; dict: `get` safe, `[]` KeyError, `popitem` removes last, keys immutable; `{}` is a dict, `set()` is the empty set.
12. Set ops: `| & - ^`; `remove` KeyError vs `discard` none; duplicates removed; unordered.
13. Function: non-default after default = SyntaxError; `*args` tuple, `**kwargs` dict; mutable default persists; no return → None.
14. LEGB scope; `global` / `nonlocal`; assigning a global inside a function without `global` → UnboundLocalError.
15. File modes: `r` missing → error; `w` erases; `a` appends; `r+` no erase; `w+` erases; `b` binary; `with` auto-closes.
16. `csv.reader` rows are lists of strings; open with `newline=''`; `DictReader` for header-keyed dicts.
17. try/except/else/finally - `else` runs only if no exception, `finally` always; `ZeroDivisionError`, `ValueError`, `TypeError`, `IndexError`, `KeyError`, `NameError`.
18. OOP: `__init__` constructor, `self`, `super()`, `__x` private (name mangled), no method overloading, multiple inheritance via MRO.
19. NumPy: homogeneous ndarray, `*` element-wise, `shape`, `reshape`, `axis=0` columns/`axis=1` rows; Pandas: Series 1-D, DataFrame 2-D, `loc` label (inclusive), `iloc` position (exclusive), `head()` = 5 rows.

**C**
20. C: Dennis Ritchie, Bell Labs, 1972; middle-level, procedural, compiled; 32 ANSI keywords; identifier cannot start with a digit.
21. Sizes: char 1, short 2, int 4 (2 in Turbo C), float 4, double 8; unsigned char 0-255; 16-bit int -32768..32767.
22. `/` on ints truncates toward 0; `%` sign of dividend, ints only; `5/2 = 2`, `-7%3 = -1`; `float f = 7/2` → 3.0.
23. `printf` returns chars printed; `i++ + ++i` is undefined (textbook 12 for i = 5); `SQ(x) x*x` with `2+3` gives 11.
24. `switch` falls through without `break`; `do-while` runs once at least; dangling else goes to the nearest `if`.
25. `p + n` moves `n × sizeof(*p)` bytes; `a[i] == *(a+i)`; `char s[]="hello"` → strlen 5, sizeof 6; C is call by value (use pointers to swap); union size = largest member; `static` locals keep value, default 0; `auto` garbage; `fopen` returns NULL on failure; `r+` needs the file, `w+` erases; flowchart: oval = start/stop, parallelogram = I/O, diamond = decision, rectangle = process; compiler = whole program, interpreter = line by line; C → procedural, Java → OOP, Prolog → logic, Haskell → functional.
- C extras: function pointer `int (*fp)(int,int)` vs function returning pointer `int *fp(int,int)`; `a[i][j] == *(*(a+i)+j)`; `calloc` zero-fills, `malloc` returns NULL on failure; `break` leaves only the innermost loop; `char s[]="abcd"` has sizeof 5 and strlen 4.
- Python extras: `yield` makes a generator (third `next` past the end raises StopIteration); loop `else` runs only if no `break`; abstract class = `ABC` + `@abstractmethod` (instantiation gives TypeError); `__del__` is the destructor.
