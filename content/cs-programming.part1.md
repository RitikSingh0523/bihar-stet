# Python & C Programming

> **What the exam asks:** Paper II (Computer Science) usually carries about 8-12 questions from programming. Python dominates with output-trace snippets (slicing, list/dict/set methods, operators, functions, file modes, exceptions, OOP) and about 3-5 C questions (operators, pointers, printf traps, storage classes, structures vs unions, file modes, translators, paradigms). Expect "What is the output?", "Which is invalid?", Statement I/II and match-the-following formats.

## 1. Python Basics: Features, Identifiers, Types, Operators

### 1.1 Features of Python
- Created by **Guido van Rossum** (first release 1991); named after "Monty Python's Flying Circus".
- **High-level, interpreted, dynamically typed, object-oriented, open source, portable, case-sensitive**, extensive standard library.
- Source is compiled to **bytecode** (.pyc) which the Python Virtual Machine interprets (reference implementation: CPython).
- Blocks are defined by **indentation** (no braces); comment starts with `#`; docstrings use triple quotes.
- No declaration needed: `x = 5` creates the name, type belongs to the object, not the variable.
- Modes: **interactive** (`>>>` prompt) and **script** (.py file).
- Supports procedural, object-oriented and functional styles. Multiple assignment `a, b = 1, 2`.
- Garbage collection by reference counting (+ cycle collector).

### 1.2 Identifiers and keywords
- Identifier = name of variable, function, class, module.
- Rules: letters (a-z, A-Z), digits, underscore; **cannot start with a digit**; no spaces or special symbols (`@ $ % - .`); **cannot be a keyword**; case-sensitive (`Age` ≠ `age`); no length limit.
- Valid: `_x`, `x1`, `my_var`, `__init__`, `Total`. Invalid: `1x`, `my-var`, `class`, `a b`, `for`, `x$`.
- 35 keywords in modern Python 3 (33 in Python 3.6): `False None True and as assert async await break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield`.
- `True`, `False`, `None` are capitalised; `true` is just an ordinary name.
- `print`, `input`, `int` are built-in functions, NOT keywords (can be shadowed).
- Naming convention (PEP 8): `snake_case` for variables/functions, `CamelCase` for classes, `UPPER_CASE` for constants.

### 1.3 Data types

| Category | Types |
|---|---|
| Numeric | `int` (unlimited size), `float` (64-bit), `complex` (`3+4j`), `bool` (subclass of int) |
| Sequence | `str`, `list`, `tuple`, `range` |
| Mapping | `dict` |
| Set | `set`, `frozenset` |
| None | `NoneType` (`None`) |
| Binary | `bytes`, `bytearray` |

- `type(x)` gives the type; `isinstance(x, int)` tests it. `True + True` = 2.
- Literals: `0b101` binary (5), `0o17` octal (15), `0xFF` hex (255), `1e3` = 1000.0, `10_000` underscores allowed.
- `/` always returns float; `//` floor division; `%` modulus; `**` power.

### 1.4 Mutable vs immutable

| Mutable (can change in place) | Immutable |
|---|---|
| list, dict, set, bytearray, user objects | int, float, complex, bool, str, tuple, frozenset, bytes, None |

- Immutable objects: "changing" creates a new object (`s = "a"; s += "b"` makes a new string; `id` changes).
- `s[0] = 'x'` on a string → **TypeError** ('str' object does not support item assignment).
- A tuple containing a list: the list can still be modified (`t = (1, [2]); t[1].append(3)` works), but `t[0] = 9` fails.
- **Dictionary keys and set elements must be hashable (immutable)**: tuple key OK, list key → TypeError (unhashable).
- Aliasing: `b = a` (lists) makes both names refer to the same object; `b = a[:]` / `a.copy()` makes a shallow copy; `copy.deepcopy` for nested.
- `id(x)` returns identity (address in CPython).

### 1.5 Operators and precedence

| Type | Operators |
|---|---|
| Arithmetic | `+ - * / // % **` |
| Comparison | `== != > < >= <=` |
| Logical | `and or not` |
| Bitwise | `& \| ^ ~ << >>` |
| Assignment | `= += -= *= /= //= %= **=` (no `++`/`--` in Python) |
| Identity | `is`, `is not` (same object?) |
| Membership | `in`, `not in` |

**Precedence (high → low):**
```
()                         parentheses
**                         (right-to-left)
+x -x ~x                   unary
* / // %                   (left-to-right)
+ -
<< >>
&
^
|
== != < > <= >= is is not in not in   (comparisons, chained)
not
and
or
lambda / if-else
```
- `-2 ** 2` = **-4** (** binds tighter than unary minus). `2 ** 3 ** 2` = 2 ** 9 = **512**.
- Floor division rounds toward **negative infinity**: `7 // 2 = 3`, `-7 // 2 = -4`, `7 // -2 = -4`. `7.0 // 2 = 3.0`.
- Modulus takes the sign of the **divisor**: `-7 % 3 = 2`, `7 % -3 = -2`, `-7 % 2 = 1`. Identity: `a == (a // b) * b + a % b`.
- `10 / 2` = `5.0` (float); `divmod(17, 5)` = `(3, 2)`.
- Chained comparison: `1 < 5 < 10` is True; `1 < 5 > 3` is True.
- **`and` / `or` return an operand, not necessarily a bool** (short-circuit):
  - `0 or 5` → 5; `3 or 5` → 3; `3 and 0` → 0; `3 and 5` → 5; `'' or 'hi'` → 'hi'; `None and 1` → None.
  - Falsy values: `0, 0.0, '', [], (), {}, set(), None, False`.
- `is` compares identity, `==` compares value: `a = [1]; b = [1]` → `a == b` True, `a is b` False. Small ints (-5..256) and interned strings may share the same object in CPython.
- `in` on a dict tests **keys**; on a string tests substring: `'ell' in 'hello'` True.
- Worked: `2 + 3 * 4 ** 2 // 5 % 4` → 4**2=16; 3*16=48; 48//5=9; 9%4=1 (left-to-right for `* // %`); 2+1 = **3**.
- Worked: `not 0 or 1 and 0` → `and` binds tighter than `or`: `(not 0) or (1 and 0)` = `True or 0` = **True**.

### 1.6 Type casting (conversion)
- Implicit (coercion): `int + float → float`; `True + 1 → 2`.
- Explicit: `int()`, `float()`, `str()`, `bool()`, `list()`, `tuple()`, `set()`, `dict()`, `chr()`, `ord()`.

| Expression | Result |
|---|---|
| `int(3.9)` | 3 (truncates toward 0); `int(-3.9)` = -3 |
| `int("42")` | 42; `int("3.5")` → **ValueError**; `int("12abc")` → ValueError |
| `int("101", 2)` | 5 |
| `float("2.5")` | 2.5; `float(3)` = 3.0 |
| `str(12) + "3"` | '123' |
| `bool(0)`, `bool("")`, `bool([])` | False |
| `bool("0")`, `bool("False")`, `bool(" ")` | **True** (non-empty strings) |
| `list("abc")` | ['a','b','c'] |
| `tuple([1,2])` | (1, 2) |
| `set("hello")` | {'h','e','l','o'} (unordered, duplicates dropped) |
| `ord('A')`, `chr(97)` | 65, 'a' |
| `bin(5)`, `oct(8)`, `hex(255)` | '0b101', '0o10', '0xff' |
| `round(2.5)`, `round(3.5)` | 2, 4 (banker's rounding: ties to even) |

- `input()` always returns a **string**: `a = input(); a + a` on "5" gives "55". Use `int(input())`.
- `"5" + 5` → TypeError; `"5" * 3` → '555'.

**⚡ Exam tip:** `-2 ** 2 = -4`, `2 ** 3 ** 2 = 512`, `-7 // 2 = -4`, `-7 % 3 = 2`, `int("3.5")` raises ValueError, `bool("0")` is True, and `input()` returns str.

## 2. Strings

- Immutable sequence of Unicode characters; single, double or triple quotes. Indexing from 0, negative from -1.
- Slicing `s[start:stop:step]` - stop excluded, out-of-range slice indices are tolerated (no error), out-of-range single index → IndexError.

```
s = "Hello, World"       indices: H0 e1 l2 l3 o4 ,5 ' '6 W7 o8 r9 l10 d11
s[0]      → 'H'          s[-1]    → 'd'
s[:5]     → 'Hello'      s[-5:]   → 'World'
s[7:]     → 'World'      s[::2]   → 'Hlo ol'
s[::-1]   → 'dlroW ,olleH'          (reverse)
s[2:8:2]  → 'lo '        s[20:]   → ''  (no error)
len(s)    → 12
```
- Worked: `s = "programming"`; `s[2:8:2]` → indices 2,4,6 = 'o','r','m' → "orm"; `s[::-3]` → indices 10,7,4,1 = 'g','m','r','r' → "gmrr".
- Negative step: start defaults to the end, so `s[5:1:-1]` walks 5,4,3,2.

### Common string methods

| Method | Example → Result |
|---|---|
| `upper() / lower()` | `"aB".upper()` → 'AB' |
| `capitalize()` | `"hello world".capitalize()` → 'Hello world' |
| `title()` | `"hello world".title()` → 'Hello World' |
| `swapcase()` | `"aB".swapcase()` → 'Ab' |
| `strip() / lstrip() / rstrip()` | `"  hi ".strip()` → 'hi' |
| `split(sep)` | `"a b  c".split()` → ['a','b','c']; `"a,b".split(",")` → ['a','b'] |
| `join(iter)` | `"-".join(["a","b"])` → 'a-b' |
| `replace(old,new[,n])` | `"aaa".replace("a","b",2)` → 'bba' |
| `find(sub)` | returns index or **-1**; `"hello".find("l")` → 2 |
| `index(sub)` | like find but raises **ValueError** if absent |
| `rfind`, `rindex` | search from right |
| `count(sub)` | `"banana".count("a")` → 3 |
| `startswith / endswith` | `"abc".startswith("ab")` → True |
| `isdigit / isalpha / isalnum` | `"12a".isalnum()` True; `"12a".isdigit()` False |
| `isupper / islower / isspace` | boolean tests |
| `center(w, fill)` | `"Hi".center(6,'*')` → '**Hi**' |
| `ljust / rjust` | padding |
| `zfill(n)` | `"42".zfill(5)` → '00042' |
| `partition(sep)` | `"a=b".partition("=")` → ('a','=','b') |
| `format()` / f-string | `f"{3.14159:.2f}"` → '3.14'; `"{} {}".format(1,2)` |

- Operators: `+` concatenate, `*` repeat, `in` membership, comparison is lexicographic (`"apple" < "banana"` True; uppercase < lowercase since 'A'=65, 'a'=97).
- `"abc" + 1` → TypeError. `str(1) + "abc"` OK.
- Escape sequences: `\n` newline, `\t` tab, `\\`, `\'`, `\"`. Raw string `r"C:\new"` keeps backslashes.
- `print("a", "b", sep="-", end="!")` → `a-b!`. Default `sep=' '`, `end='\n'`.
- `len("")` = 0; `"a".join("xyz")` = 'xayaz'.
- Strings are iterable: `for ch in "abc"`; `list("abc")`.
- `"%d %s" % (5, "x")` is old-style formatting → '5 x'.

**⚡ Exam tip:** string methods never modify the original (they return a new string); `find` returns -1 but `index` raises ValueError; slice stop is exclusive; `s[::-1]` reverses.

## 3. Lists, Tuples, Dictionaries, Sets

### 3.1 List (mutable, ordered, allows duplicates, `[ ]`)

| Method | Effect / Return |
|---|---|
| `append(x)` | add one item at end → None |
| `extend(iter)` | add each element of iterable → None |
| `insert(i, x)` | insert before index i |
| `remove(x)` | delete first occurrence; ValueError if absent |
| `pop([i])` | remove & **return** item (default last); IndexError if empty |
| `clear()` | empty the list |
| `index(x)` | first position; ValueError if absent |
| `count(x)` | occurrences |
| `sort(reverse=False, key=None)` | sorts **in place**, returns **None** |
| `reverse()` | reverses in place, returns None |
| `copy()` | shallow copy |
| `sorted(a)` | built-in: returns NEW sorted list |
| `del a[i]`, `del a[1:3]` | delete by index/slice |
| `len, min, max, sum` | built-ins |

```
a = [3, 1, 2]
a.append([4, 5])    → [3, 1, 2, [4, 5]]
a = [3, 1, 2]
a.extend([4, 5])    → [3, 1, 2, 4, 5]
a.insert(1, 10)     → [3, 10, 1, 2, 4, 5]
a.pop()             → 5   ; a = [3, 10, 1, 2, 4]
a.pop(0)            → 3   ; a = [10, 1, 2, 4]
a.remove(1)         → a = [10, 2, 4]
print(a.sort())     → None   (a is now [2, 4, 10])
a[::-1]             → [10, 4, 2]
```
- `+` concatenates, `*` repeats: `[0] * 3` → [0, 0, 0]; `[1,2] + [3]` → [1,2,3].
- Slice assignment: `a[1:3] = [9]` replaces two items with one.
- Trap: `m = [[0] * 3] * 2; m[0][0] = 1` → `[[1,0,0],[1,0,0]]` (both rows are the same object).
- Trap: `b = a; b.append(9)` also changes `a`; `b = a[:]` does not.
- `a.append(1, 2)` → TypeError (takes exactly one argument). `[1,2,3].index(5)` → ValueError.
- Comparison: `[1, 2] < [1, 3]` True (element-wise); `[1,2] == [1,2]` True.
- Nested: `a = [[1,2],[3,4]]; a[1][0]` → 3.

### 3.2 Tuple (immutable, ordered, `( )`)
- Only methods: `count()`, `index()`. No append/remove.
- Single-element tuple needs a comma: `t = (5,)`; `(5)` is just an int. `t = 1, 2, 3` (packing) is a tuple.
- Unpacking: `a, b = (1, 2)`; swap: `a, b = b, a`; `a, *rest = (1,2,3)` → rest = [2,3].
- `t[0] = 5` → TypeError. `del t` deletes whole tuple; `del t[0]` → TypeError.
- Faster, hashable (usable as dict keys), memory-light. `tuple([1,2])`, `len`, `max`, `+`, `*`, slicing all work.

### 3.3 Dictionary (mutable, key:value pairs, ordered by insertion since 3.7, `{ }`)

| Method | Effect |
|---|---|
| `d[k]` | value; **KeyError** if absent |
| `get(k[, default])` | value or default (None); no error |
| `keys() / values() / items()` | views of keys / values / (k, v) tuples |
| `update(d2)` | merge, overwriting existing keys |
| `pop(k[, default])` | remove key and return value (KeyError if absent and no default) |
| `popitem()` | remove & return **last inserted** pair (LIFO) |
| `setdefault(k, v)` | return value if present else insert `k: v` |
| `clear()`, `copy()` | |
| `dict.fromkeys(seq, v)` | new dict with the given keys |
| `del d[k]` | delete key |
| `k in d` | tests key |

```
d = {'a': 1, 'b': 2}
d['c'] = d.get('c', 0) + 5      → {'a':1,'b':2,'c':5}
d.update({'a': 10})             → {'a':10,'b':2,'c':5}
list(d.items())[0]              → ('a', 10)
d.pop('b')                      → 2 ; d = {'a':10,'c':5}
d.popitem()                     → ('c', 5)
d.get('z')                      → None
for k in d:                     iterates keys
len(d)                          → 1
```
- Keys unique; duplicate key in literal keeps the last value: `{'a':1,'a':2}` → `{'a': 2}`.
- Keys must be immutable: `d[[1,2]] = 3` → TypeError: unhashable type: 'list'.
- `{}` creates an empty **dict**, not a set.

### 3.4 Set (mutable, unordered, no duplicates, no indexing, `{ }` or `set()`)

| Operation | Symbol / Method | Example (A={1,2,3}, B={3,4}) |
|---|---|---|
| Union | `A \| B`, `union` | {1,2,3,4} |
| Intersection | `A & B`, `intersection` | {3} |
| Difference | `A - B`, `difference` | {1,2} |
| Symmetric diff | `A ^ B`, `symmetric_difference` | {1,2,4} |
| Subset / superset | `<=`, `issubset`, `issuperset` | |
| Disjoint | `isdisjoint` | False |

- `add(x)`; `update(iter)`; `remove(x)` → **KeyError** if absent; `discard(x)` → no error; `pop()` removes an arbitrary element; `clear()`.
- `set([1,2,2,3,3])` → {1, 2, 3}; `len({1,1,2})` = 2. Elements must be hashable. `s[0]` → TypeError.
- `frozenset` is the immutable set.

### 3.5 Comprehensions and range
```
[x*x for x in range(5)]                  → [0, 1, 4, 9, 16]
[x for x in range(10) if x % 2 == 0]     → [0, 2, 4, 6, 8]
[(i, j) for i in range(2) for j in range(2)] → [(0,0),(0,1),(1,0),(1,1)]
{x: x*x for x in range(3)}               → {0: 0, 1: 1, 2: 4}
{c for c in "hello"}                     → {'h','e','l','o'}   (set)
(x*2 for x in range(3))                  → generator object (NOT a tuple)
[x if x > 2 else 0 for x in range(5)]    → [0, 0, 0, 3, 4]
```
- `range(stop)`, `range(start, stop)`, `range(start, stop, step)`; stop excluded; `range(1, 10, 3)` → 1,4,7; `range(5, 0, -2)` → 5,3,1; `list(range(0))` → [].
- Other built-ins: `enumerate`, `zip`, `map`, `filter`, `sum`, `any`, `all`, `sorted`, `reversed`, `len`, `abs`, `pow`, `min`, `max`.
- `zip([1,2,3], "ab")` → pairs (1,'a'), (2,'b') (stops at shortest).

**⚡ Exam tip:** `list.sort()` returns None; `append` adds one object (even a list) while `extend` flattens; `dict.get()` never raises KeyError; `{}` is a dict; `set.remove` raises KeyError but `discard` does not; `(5)` is not a tuple.
