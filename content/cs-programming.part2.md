## 4. Control Flow and Functions

### 4.1 Control flow
- Conditional: `if / elif / else`; colon + indentation. Ternary: `x = a if cond else b`.
- Loops: `while cond:` and `for var in iterable:`. `break` exits the loop, `continue` skips to next iteration, `pass` is a do-nothing placeholder.
- **Loop `else`** runs when the loop ends normally (condition false / iterable exhausted) and is **skipped if `break` executed**.
- No `switch` in classic Python (3.10 added `match-case`). No `do-while`. No `++`/`--`.

```
for i in range(3):
    print(i, end=' ')          → 0 1 2
else:
    print("done")              → done           (full line:  0 1 2 done)

for i in range(5):
    if i == 3: break
else:
    print("never")             → nothing printed (break skipped else)

i = 1
while i <= 3:
    print(i * i, end=',')      → 1,4,9,
    i += 1
```
- Nested-loop pattern: `for i in range(1, 4): print('*' * i)` prints 1, 2, 3 stars per line.
- `for i in range(10, 0, -3)` → 10, 7, 4, 1.
- `while True:` + `break` is the usual infinite-loop pattern. `while 0:` never runs.
- Sum of first n: `sum(range(1, n+1))`. Truthiness: `if []:` False, `if "0":` True.

### 4.2 Functions
- Define with `def name(params):`; `return` gives back a value (**no return → None**); multiple values returned as a **tuple**.
- Functions are first-class objects (can be passed, returned, stored).
- Parameters (formal) vs arguments (actual).

| Argument type | Example | Note |
|---|---|---|
| Positional | `f(1, 2)` | order matters |
| Keyword | `f(b=2, a=1)` | order free; keyword args must come after positional |
| Default | `def f(a, b=10)` | default params must come **after** non-default; `def f(a=1, b)` → SyntaxError |
| Variable positional | `def f(*args)` | collected into a **tuple** |
| Variable keyword | `def f(**kwargs)` | collected into a **dict** |

Order in header: `def f(pos, default=…, *args, kwonly, **kwargs)`.

```
def f(a, b=2, *args, **kw):
    print(a, b, args, kw)
f(1)                 → 1 2 () {}
f(1, 5, 7, 8, x=9)   → 1 5 (7, 8) {'x': 9}
def g(*a): print(a, type(a))
g(1, 2)              → (1, 2) <class 'tuple'>
```
- Unpacking at call: `f(*[1, 2])` and `f(**{'a': 1, 'b': 2})`.
- **Mutable default trap** (default evaluated once, at definition):
```
def add(x, lst=[]):
    lst.append(x)
    return lst
add(1)   → [1]
add(2)   → [1, 2]       (same list reused!)
```
- Arguments are passed by **object reference**: mutating a list inside a function affects the caller; rebinding the parameter does not.
```
def m(l): l.append(9)          # caller's list changes
def r(l): l = [0]              # caller's list unchanged
```
- Calling with too few/many args → TypeError.

### 4.3 Scope - LEGB rule
Name lookup order: **L**ocal → **E**nclosing (outer function) → **G**lobal (module) → **B**uilt-in.
- Assigning to a name inside a function makes it local unless declared `global` / `nonlocal`.
- `global x` : refer to the module-level variable. `nonlocal x` : refer to the enclosing function's variable.
```
x = 10
def f():
    x = x + 1       # UnboundLocalError (x is local because it is assigned)
def g():
    global x
    x = 20
g(); print(x)       → 20
def outer():
    n = 1
    def inner():
        nonlocal n
        n += 1
    inner(); return n   → 2
```
- Reading a global inside a function without assigning works fine.

### 4.4 Lambda, map, filter, reduce
- `lambda args: expression` - anonymous, single expression, implicit return. `(lambda x, y: x + y)(2, 3)` → 5. `sq = lambda x: x*x`.
- `list(map(lambda x: x**2, [1, 2, 3]))` → [1, 4, 9].
- `list(filter(lambda x: x % 2, [1, 2, 3, 4]))` → [1, 3].
- `from functools import reduce; reduce(lambda a, b: a + b, [1, 2, 3, 4])` → 10.
- `sorted(words, key=len)`; `max(words, key=len)`.

### 4.5 Recursion
- A function calling itself; needs a **base case**; Python's default limit ≈ **1000** frames (`sys.getrecursionlimit()`), beyond which `RecursionError`.
```
def fact(n):  return 1 if n <= 1 else n * fact(n - 1)     fact(5) → 120
def fib(n):   return n if n < 2 else fib(n-1) + fib(n-2)  fib(7) → 13
def total(n): return 0 if n == 0 else n + total(n-1)      total(4) → 10
```
- Fibonacci series 0 1 1 2 3 5 8 13 ... (`fib(0)=0, fib(1)=1`). `fib(n)` makes exponentially many calls.
- Recursion vs iteration: recursion is shorter but uses stack memory.
- `def f(): f()` → RecursionError (no base case).

**⚡ Exam tip:** non-default parameter after a default one is a SyntaxError; `*args` is a tuple, `**kwargs` a dict; mutable default lists persist across calls; assigning to a global name inside a function without `global` gives UnboundLocalError; a function with no `return` returns `None`.

## 5. Files, CSV, Exceptions, Modules

### 5.1 File handling
`f = open("data.txt", "r")` ... `f.close()`; preferred: `with open(...) as f:` (auto-closes even on error).

| Mode | Meaning | If file missing | Existing content | Pointer |
|---|---|---|---|---|
| `r` | read (default) | **FileNotFoundError** | kept | start |
| `w` | write | created | **erased** (truncated) | start |
| `a` | append | created | kept | end |
| `x` | exclusive create | created | error if file exists (FileExistsError) | start |
| `r+` | read + write | **error** | kept | start |
| `w+` | write + read | created | **erased** | start |
| `a+` | append + read | created | kept | end for writes |
| `rb`, `wb`, `ab` | binary versions (bytes, e.g. images, pickle) | | | |
| `t` | text mode (default) | | | |

- Reading: `read()` whole file as one string; `read(n)` n chars; `readline()` one line (including `\n`); `readlines()` list of all lines; iterate `for line in f:`.
- Writing: `write(str)` (no automatic newline; returns number of characters written), `writelines(list_of_str)`.
- `tell()` current position; `seek(offset, whence)` move pointer (`seek(0)` rewinds); `flush()`; `f.closed`; `f.name`; `f.mode`.
- `write()` needs a string: `f.write(5)` → TypeError; use `str(5)`.
- Binary data: `pickle.dump(obj, f)` / `pickle.load(f)` with `wb` / `rb`.
- Worked: file has "A\nB\nC\n"; `f.readline()` → 'A\n'; then `f.read()` → 'B\nC\n'; `f.readlines()` first time → ['A\n','B\n','C\n']; calling `read()` again at EOF → '' (empty string).
- `os` module: `os.remove`, `os.rename`, `os.path.exists`, `os.getcwd()`, `os.listdir()`.

### 5.2 CSV files
- CSV = comma-separated values, plain text table. `import csv`.
```
import csv
with open("s.csv", "w", newline="") as f:     # newline='' avoids blank lines on Windows
    w = csv.writer(f)
    w.writerow(["Name", "Marks"])             # one row
    w.writerows([["A", 90], ["B", 85]])       # many rows
with open("s.csv", "r") as f:
    for row in csv.reader(f):
        print(row)                            → ['Name', 'Marks'] ['A', '90'] ['B', '85']
```
- `csv.reader` gives each row as a **list of strings** (numbers come as '90'); `csv.DictReader` gives dicts keyed by header; `csv.DictWriter(f, fieldnames=[...])` with `writeheader()`.
- Other delimiter: `csv.reader(f, delimiter=';')`. Pandas: `pd.read_csv("s.csv")`, `df.to_csv("o.csv", index=False)`.

### 5.3 Exceptions
- **Syntax error** (found before run, e.g. missing colon) vs **exception** (runtime error) vs **logical error** (wrong output, no error).

| Exception | Typical cause |
|---|---|
| `ZeroDivisionError` | `1/0`, `5%0`, `5//0` |
| `ValueError` | right type, wrong value: `int("abc")` |
| `TypeError` | wrong type: `"a"+1`, `len(5)` |
| `IndexError` | list index out of range |
| `KeyError` | missing dict key |
| `NameError` | undefined variable |
| `AttributeError` | `"a".foo()` / missing attribute |
| `FileNotFoundError` (subclass of `OSError`/`IOError`) | open missing file in `r` |
| `ImportError` / `ModuleNotFoundError` | bad import |
| `IndentationError` (a SyntaxError) | wrong indentation |
| `RecursionError`, `StopIteration`, `KeyboardInterrupt`, `AssertionError`, `ZeroDivisionError` | |

- Hierarchy: `BaseException` → `Exception` → (ArithmeticError → ZeroDivisionError), (LookupError → IndexError, KeyError), ValueError, TypeError...
```
try:
    risky code
except ZeroDivisionError as e:     # can list several: except (ValueError, TypeError):
    handle
except Exception:                  # generic, keep LAST
    handle
else:
    runs ONLY if no exception occurred
finally:
    ALWAYS runs (cleanup)
```
- `raise ValueError("msg")` raises manually; `raise` alone re-raises; `assert cond, "msg"` → AssertionError if false.
- Custom exception: `class MyErr(Exception): pass`.
- Worked: `try: print(1/0) except ZeroDivisionError: print("E") else: print("O") finally: print("F")` → **E** then **F** (else skipped).
- Worked: `try: x = int("5") ... else` → prints O then F.
- `finally` runs even when `return` is executed in `try`; a `return` inside `finally` overrides the earlier one:
```
def f():
    try:    return "try"
    finally: print("F")     # prints F, then function returns "try"
def g():
    try:    return "try"
    finally: return "fin"   # returns "fin"
```
- `try` must have at least one `except` or `finally`. `else` needs `except`.

### 5.4 Modules and packages
- **Module** = a .py file; **package** = a directory of modules containing `__init__.py` (required before 3.3, optional afterwards); **library** = collection of packages.
- Importing: `import math`; `import math as m`; `from math import sqrt, pi`; `from math import *` (pollutes namespace).
- `math`: `sqrt(16)` → 4.0; `pow(2,3)` → 8.0; `ceil(2.1)` → 3; `floor(-2.1)` → -3; `factorial(5)` → 120; `pi`; `gcd`; `fabs`.
- `random`: `random()` float in [0,1); `randint(a,b)` **inclusive both**; `randrange(a,b)` excludes b; `choice(seq)`; `shuffle(list)`; `seed()`.
- `statistics`: `mean`, `median`, `mode`. `datetime`, `os`, `sys` (`sys.argv`), `time`.
- `dir(module)` lists names; `help(obj)`; `__name__ == "__main__"` is True when the file is run directly (False when imported).
- Third-party installed using **pip** (`pip install numpy`). Standard library needs no installation.
- `import` a missing module → `ModuleNotFoundError`.

**⚡ Exam tip:** `w` erases, `a` appends, `r+` needs the file to exist and does not erase, `w+` erases; `finally` always runs; `csv.reader` returns strings; `random.randint(1,6)` includes 6; `from math import *` is legal but discouraged.

## 6. Object-Oriented Programming in Python

- **Class** = blueprint; **object (instance)** = real entity made from class. Four pillars: **encapsulation, abstraction, inheritance, polymorphism**.
- `__init__(self, ...)` is the constructor (runs at object creation); `self` = reference to the current object (first parameter of every instance method, not a keyword); `__del__` is the destructor.
```
class Student:
    school = "XYZ"                 # class variable (shared by all objects)
    def __init__(self, name, m):
        self.name = name           # instance variables
        self.m = m
    def show(self):
        print(self.name, self.m)
s = Student("Ram", 80)
s.show()                           → Ram 80
```
- Class variable vs instance variable: `Student.school` shared; `self.name` per object. Assigning `s.school = "ABC"` creates an instance attribute and does not change the class variable.
- Counter trap: `class A: c=0; def __init__(self): A.c += 1` → after creating 3 objects `A.c` = 3.
- No default constructor overloading and **no method overloading** in the classic sense: defining two methods with the same name keeps only the last. Use default args instead.
- `__str__` is called by `print(obj)`/`str(obj)`; `__repr__` for the developer view; `__len__`, `__add__`, `__eq__`, `__lt__` implement operator overloading (`a + b` calls `a.__add__(b)`).

### Inheritance
```
class Animal:
    def __init__(self, n): self.n = n
    def speak(self): print("...")
class Dog(Animal):                 # single inheritance
    def __init__(self, n, b):
        super().__init__(n)        # call parent constructor
        self.b = b
    def speak(self): print("Bark") # method overriding
Dog("d", "x").speak()              → Bark
```
- Types: single, multiple (`class C(A, B)`), multilevel, hierarchical, hybrid. Python supports **multiple inheritance**; method lookup follows **MRO** (left-to-right, depth-first with C3 linearisation; see `C.__mro__`).
- `isinstance(obj, cls)`, `issubclass(Dog, Animal)` → True.
- **Polymorphism**: same method name behaves differently (overriding, duck typing, operator overloading `+` on ints/strings/lists).
- **Encapsulation / access**: `name` public, `_name` protected (convention only), `__name` private (name mangling to `_Class__name`, so `obj.__name` → AttributeError but `obj._Class__name` works). There are no true private members.
- `@staticmethod` (no self/cls), `@classmethod` (first param `cls`), `@property` getters.
- Everything in Python is an object (ints, functions, classes). `object` is the root base class.
- `type(obj)` → `<class '__main__.Student'>`; `obj.__dict__` holds attributes; `hasattr`, `getattr`, `setattr`, `delattr`.
- Not specifying `self` in a method definition and calling it → TypeError (takes 0 positional arguments but 1 given).

**⚡ Exam tip:** `__init__` is the constructor, `self` is not a keyword, `super()` calls the parent, `__x` private is name-mangled, Python has no method overloading, and multiple inheritance is allowed.

## 7. NumPy and Pandas Basics

### 7.1 NumPy
- **Numerical Python**: fast N-dimensional array library (`ndarray`); **homogeneous** elements (one dtype), contiguous memory, much faster than lists; supports **vectorised** operations and **broadcasting**. `import numpy as np`.
- Attributes: `a.shape` (rows, cols), `a.ndim`, `a.size` (total elements), `a.dtype`, `a.itemsize`.
```
a = np.array([[1, 2, 3], [4, 5, 6]])
a.shape → (2, 3)     a.ndim → 2     a.size → 6
a * 2   → [[ 2  4  6] [ 8 10 12]]            (element-wise)
a + np.array([10, 20, 30]) → [[11 22 33] [14 25 36]]   (broadcasting)
a.sum() → 21    a.sum(axis=0) → [5 7 9]   (down columns)   a.sum(axis=1) → [ 6 15] (across rows)
a.mean() → 3.5   a.max() → 6   a.T → transpose (3,2)
a.reshape(3, 2)  → [[1 2] [3 4] [5 6]]
a[1, 2] → 6      a[:, 1] → [2 5]      a[0] → [1 2 3]
```
- Creation: `np.zeros((2,2))`, `np.ones(3)`, `np.eye(3)` (identity), `np.arange(0, 10, 3)` → [0 3 6 9], `np.linspace(0, 1, 5)` → [0. 0.25 0.5 0.75 1.], `np.random.rand(2,3)`, `np.full((2,2), 7)`.
- `np.dot(a, b)` / `a @ b` matrix product; `a * b` is **element-wise**, not matrix product.
- Mixed types are up-cast: `np.array([1, 2.5])` → float64; `np.array([1, "a"])` → strings.
- **List vs array trap:** `[1, 2] * 2` → [1, 2, 1, 2] but `np.array([1, 2]) * 2` → [2 4]; `[1,2] + [3]` concatenates but `np.array([1,2]) + 3` → [4 5].
- Boolean mask: `a[a > 3]` → [4 5 6]. Slicing returns a **view** (not a copy).

### 7.2 Pandas
- Library for data analysis (name from "Panel Data"); two main structures: **Series** (1-D labelled array, one dtype) and **DataFrame** (2-D labelled table, columns can have different types). `import pandas as pd`.
- Series: `s = pd.Series([10, 20, 30], index=['a', 'b', 'c'])`; `s['b']` → 20; `s[1]` → 20 (positional); `s * 2` → 20,40,60; `s.values`, `s.index`, `s.sum()`. From dict: keys become index. Default index 0,1,2...
- DataFrame:
```
df = pd.DataFrame({'Name': ['A', 'B', 'C'], 'Age': [20, 25, 30]})
df.shape            → (3, 2)           df.columns → Index(['Name','Age'])
df['Age']           → Series           df['Age'].mean() → 25.0
df[df['Age'] > 20]  → rows B and C     (boolean filtering)
df.loc[0, 'Name']   → 'A'              (label-based; slice end INCLUSIVE)
df.iloc[0:2]        → rows 0 and 1     (position-based; end EXCLUSIVE)
df.loc[0:2]         → rows 0, 1 and 2
df['Pass'] = df['Age'] > 22            (add column)
df.drop('Age', axis=1)                 (drop column; axis=0 for rows)
```
- Useful: `head(n)` (first 5 default), `tail(n)`, `info()`, `describe()` (count, mean, std, min, 25%, 50%, 75%, max), `isnull().sum()`, `dropna()`, `fillna(v)`, `sort_values('Age')`, `groupby('col').mean()`, `value_counts()`, `unique()`.
- I/O: `pd.read_csv("f.csv")`, `df.to_csv("o.csv", index=False)`, `read_excel`, `to_excel`.
- `axis=0` → rows (operation goes down), `axis=1` → columns (across).
- Column access: `df['Age']` or `df.Age`; multiple columns need a list: `df[['Name', 'Age']]`.

**⚡ Exam tip:** NumPy arrays hold one dtype and `*` is element-wise; Series = 1-D, DataFrame = 2-D; `loc` is label-based with an inclusive end while `iloc` is position-based with an exclusive end; `describe()` gives count/mean/std/min/quartiles/max.

## 8. Python Output-Trace Traps (Worked Examples)

```
1)  print(10 / 4, 10 // 4, 10 % 4, 10 ** 2)         → 2.5 2 2 100
2)  print(0.1 + 0.2 == 0.3)                         → False   (binary float error: 0.30000000000000004)
3)  a = [1, 2, 3]; b = a; b += [4]; print(a)         → [1, 2, 3, 4]   (+= extends in place)
4)  a = [1, 2, 3]; b = a; b = b + [4]; print(a)      → [1, 2, 3]      (new list created)
5)  print("abc"[1:10], "abc"[5:])                    → bc  (empty string)
6)  d = {1: 'a', True: 'b'}; print(d, len(d))        → {1: 'b'} 1    (1 == True, same hash)
7)  print(len({1, 2, 2, (1, 2)}))                    → 3
8)  print(5 // 2 * 2.0)                              → 4.0
9)  x = 5; print(x > 3 and x < 10, not x)            → True False
10) print(bool("False"), bool(""), bool(0.0))        → True False False
11) print(type(1/1), type(2//1), type(2**-1))        → float int float
12) print("5" * 3, [0] * 2, (1,) * 2)                → 555 [0, 0] (1, 1)
13) print(sorted("bca"), sorted([3, 1, 2], reverse=True)) → ['a','b','c'] [3, 2, 1]
14) l = [1, 2, 3, 4]; print(l[1:3], l[-2:], l[::2])  → [2, 3] [3, 4] [1, 3]
15) t = (1, 2, [3]); t[2].append(4); print(t)        → (1, 2, [3, 4])
16) s = {1, 2}; s.add([3])                           → TypeError (unhashable list)
17) print(max("apple", "banana"), min([4, 2, 8]))    → banana 2
18) print(list(range(2, 11, 4)))                     → [2, 6, 10]
19) x = 1; def f(): print(x); f()                    → 1   (reads global)
20) print(round(2.5), round(3.5), round(-2.5))       → 2 4 -2
21) print(3 in [1, 2, 3], 'a' in {'a': 1}, 1 in {'a': 1}) → True True False
22) print(1 < 2 < 3, 3 > 2 > 2)                      → True False
23) l = [1, 2, 3]; l2 = l.copy(); l2.append(4); print(len(l)) → 3
24) print("Hello".replace("l", "L", 1))              → HeLlo
25) print(int(True) + int("2") + float("1.5"))       → 4.5
26) for i in range(3): pass; print(i)                → 2    (loop variable persists)
27) print(list(map(str.upper, ["a", "b"])))          → ['A', 'B']
28) x = [i for i in range(3)]; print(i)              → NameError (comprehension variable is local in Py3)
29) def f(a, b=[]): b.append(a); return b; f(1); print(f(2))  → [1, 2]
30) print(print("x"))                                → x  then  None
```
- The value of a statement is not printed in script mode; in interactive mode the value of a bare expression is echoed.
- `print()` with no args outputs a blank line. `print("a" "b")` (adjacent literals) → ab.
- Integer division/modulo by zero → ZeroDivisionError; `1/0.0` also raises ZeroDivisionError in Python (unlike C).
- `a, b = 1, 2; a, b = b, a + b` → right side is evaluated first: a=2, b=3.
- `int` has unlimited size: `2 ** 100` works.

**⚡ Exam tip:** before choosing an option, evaluate step by step - precedence, slice bounds (stop excluded), whether a method returns None, whether the object is mutated in place (`+=`, `append`) or rebuilt (`+`), and whether a TypeError/ValueError/KeyError ends the program.
