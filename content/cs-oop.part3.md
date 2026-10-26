
## 7. C++ STL Overview

The **Standard Template Library** is a collection of generic, template-based classes and functions. Three core components (plus function objects/adaptors):

| Component | Meaning | Examples |
|---|---|---|
| **Containers** | Store data | `vector`, `list`, `deque`, `set`, `map`, `stack`, `queue` |
| **Algorithms** | Operate on containers | `sort`, `find`, `reverse`, `count`, `max_element`, `binary_search`, `accumulate` |
| **Iterators** | Pointer-like objects to traverse containers | `begin()`, `end()` |
| Function objects (functors) | Class objects with `operator()` | `less<int>`, `greater<int>` |

### Container categories

| Category | Containers | Notes |
|---|---|---|
| Sequence | `vector`, `deque`, `list`, `array`, `forward_list` | Elements in linear order |
| Associative (ordered) | `set`, `multiset`, `map`, `multimap` | Sorted by key, balanced tree, O(log n) |
| Unordered associative (C++11) | `unordered_set`, `unordered_map` | Hash table, O(1) average |
| Container adaptors | `stack` (LIFO), `queue` (FIFO), `priority_queue` | Built over other containers; no iterators |

- `vector`: dynamic array, random access O(1), insert/erase at end amortised O(1), in middle O(n). `push_back`, `pop_back`, `size`, `at`, `[]`, `front`, `back`, `insert`, `erase`, `clear`, `empty`.
- `list`: doubly linked list; no random access; O(1) insert/erase anywhere given an iterator.
- `deque`: double-ended queue; O(1) at both ends.
- `set`: unique sorted keys; `multiset` allows duplicates.
- `map<K,V>`: sorted unique key-value pairs; `m[key]` inserts a default if absent; elements are `pair`s (`first`, `second`).
- `stack`: `push`, `pop`, `top`, `empty`, `size` (`pop` returns void). `queue`: `push`, `pop`, `front`, `back`.
- `priority_queue`: max-heap by default; `top` returns the largest.

### Iterators
Types: input, output, forward, bidirectional, random access. `vector` has random access; `list` bidirectional.
```
vector<int> v = {3, 1, 2};
sort(v.begin(), v.end());                 // 1 2 3
for (vector<int>::iterator it = v.begin(); it != v.end(); ++it)
    cout << *it << " ";
```
- Header: `#include <vector>`, `<algorithm>`, `<map>`, ...; namespace `std`.
- `cin`/`cout` are objects of `istream`/`ostream`, with `>>` extraction and `<<` insertion operators.

### C++ I/O and strings (quick)
- `endl` flushes the buffer and adds a newline; `'\n'` only newline.
- `fstream`, `ifstream`, `ofstream` for files. `string` class in `<string>`.

**⚡ Exam tip:** STL = containers + algorithms + iterators. `map` = sorted key-value; `unordered_map` = hash. `stack` is LIFO, `queue` FIFO, both are container adaptors. `vector` gives O(1) random access.

## 8. Java Basics: JVM, Strings, final, Threads, Collections

### JDK, JRE, JVM
```
JDK = JRE + development tools (javac, javadoc, jar, jdb)
JRE = JVM + core class libraries
JVM = runs bytecode (abstract machine)
```
- Flow: `Hello.java` --**javac**--> `Hello.class` (**bytecode**) --**JVM**--> machine code.
- **Bytecode** is platform independent; JVM is platform dependent. Hence "**Write Once, Run Anywhere**".
- JVM parts: class loader, bytecode verifier, interpreter, **JIT compiler**, garbage collector, memory areas (heap, stack, method area).
- Java is compiled **and** interpreted. Platform-independent but not platform-dependent. Developed by James Gosling at Sun Microsystems (1995), now Oracle. Original name Oak.
- Entry point: `public static void main(String[] args)`. File name must match the **public class**.
- `javac` compiler, `java` launcher/interpreter; the compiler output file extension is `.class`.
- Features: simple, object-oriented, robust (GC, exception handling), secure, multithreaded, portable, high-performance (JIT), **no pointers**.

### Data types and basics
- 8 primitives: `byte`(8), `short`(16), `int`(32), `long`(64), `float`(32), `double`(64), `char`(**16-bit Unicode**), `boolean`. Sizes are fixed (not platform dependent).
- Default values: numeric 0, `boolean` false, object references `null`. Local variables have no default (must be initialised).
- Wrapper classes: `Integer`, `Double`, `Character` ... with autoboxing/unboxing.
- `==` compares references for objects; `.equals()` compares content.
- `java.lang` is imported automatically. Package: `package com.x;` is the first statement; `import java.util.*;`. Packages avoid name clashes and control access. Common: `java.lang`, `java.util`, `java.io`, `java.net`, `java.awt`, `java.sql`.
- Integer division `7/2 = 3`; `char` + `int` = int.

### Strings
- `String` is **immutable**: once created its content cannot change; operations return a **new** String.
- **String pool**: `String a = "hi"; String b = "hi";` → same object, `a == b` is true. `new String("hi")` creates a new heap object, `a == new String("hi")` is **false**, `.equals` is true.
- `StringBuffer` (mutable, **thread-safe/synchronized**) and `StringBuilder` (mutable, **not synchronized**, faster).
- Methods: `length()`, `charAt(i)`, `substring(b, e)` (e exclusive), `indexOf`, `toUpperCase`, `trim`, `equals`, `equalsIgnoreCase`, `compareTo`, `concat`, `replace`, `split`.

Worked trace:
```
String s = "Java";
s.concat("SE");              // result discarded
s = s.toUpperCase();         // s now "JAVA"
System.out.println(s + s.length() + s.charAt(1) + s.substring(1, 3));
```
`s` = "JAVA"; length 4; `charAt(1)` = 'A'; `substring(1,3)` = "AV". Output: **JAVA4AAV**.

Another: `System.out.println(1 + 2 + "x" + 1 + 2);` → left to right: 1+2=3, then "3x", "3x1", "3x12". Output: **3x12**.

### final, finally, finalize

| Word | Kind | Meaning |
|---|---|---|
| `final` | keyword/modifier | Variable → constant (assigned once); method → cannot be overridden; class → cannot be inherited |
| `finally` | block | Always runs after try/catch (cleanup) |
| `finalize()` | method of `Object` | Called by the garbage collector before reclaiming an object (deprecated, not guaranteed to run) |

- `final` reference: the reference cannot change, but the object's state can.
- `static` : class-level member, `abstract` : incomplete, `super` : parent reference, `this` : current object.
- `System.gc()` only **requests** garbage collection.

### Threads (multithreading)
- A **thread** is a lightweight sub-process; **multithreading** = running multiple threads concurrently inside one process (threads share memory, processes do not).
- Create a thread: (1) **extend `Thread`** and override `run()`; (2) **implement `Runnable`** (preferred; allows extending another class) and pass to `new Thread(r)`.
- **`start()`** creates a new thread and calls `run()`; calling **`run()` directly** just runs it as a normal method in the current thread. Calling `start()` twice → `IllegalThreadStateException`.
- Lifecycle: **New → Runnable → Running → Blocked/Waiting/Timed waiting → Terminated (Dead)**.
- Methods: `sleep(ms)`, `join()`, `yield()`, `interrupt()`, `setPriority(1..10)` (default 5, `MIN`=1, `NORM`=5, `MAX`=10), `isAlive()`, `getName()`.
- **Synchronization**: `synchronized` method/block ensures only one thread at a time holds an object's lock → prevents race conditions. `wait()`, `notify()`, `notifyAll()` are for inter-thread communication (methods of `Object`, used inside synchronized code).
- **Deadlock**: two threads wait forever for locks held by each other.
- `main` is itself a thread.

### Collections framework (`java.util`)
```
Iterable → Collection → List  (ArrayList, LinkedList, Vector, Stack)
                      → Set   (HashSet, LinkedHashSet, TreeSet)
                      → Queue (PriorityQueue, ArrayDeque)
Map (separate, not a Collection): HashMap, LinkedHashMap, TreeMap, Hashtable
```

| Class | Order / duplicates | Notes |
|---|---|---|
| `ArrayList` | insertion order, duplicates OK | Dynamic array, fast random access, not synchronized |
| `LinkedList` | insertion order, duplicates OK | Doubly linked; fast insert/delete; also a Deque |
| `Vector` | like ArrayList | **Synchronized**, legacy |
| `HashSet` | **no duplicates**, no order | Backed by HashMap |
| `LinkedHashSet` | no duplicates, insertion order | |
| `TreeSet` | no duplicates, **sorted** | Red-black tree; null not allowed |
| `HashMap` | unique keys, no order | **One null key**, many null values, not synchronized |
| `Hashtable` | unique keys | Synchronized; **no null** key/value |
| `TreeMap` | sorted by key | |

- `Collection` is an **interface**; `Collections` (with s) is a **utility class** (`sort`, `reverse`, `max`...).
- Methods: `add`, `remove`, `size`, `contains`, `isEmpty`, `clear`, `get`, `put`, `iterator()`.
- Arrays are fixed size and hold primitives or objects; collections are dynamic and hold only objects.
- Iteration: for-each, `Iterator` (`hasNext()`, `next()`), `ListIterator` (both directions).
- `Comparable` (`compareTo`, natural order) vs `Comparator` (`compare`, custom order).

**⚡ Exam tip:** JDK ⊃ JRE ⊃ JVM. javac → bytecode (`.class`). Strings are immutable. `final` / `finally` / `finalize` are three different things. `start()` starts a new thread, `run()` does not. `Set` has no duplicates; `Map` is not part of `Collection`.

## 9. OOAD and UML

### OOAD
- **OOA (Analysis)**: identifies *what* the system must do: requirements, objects, classes, relationships. **OOD (Design)**: defines *how*: class structure, interfaces, architecture. **OOP**: implementation.
- Phases (SDLC): requirement analysis → design → implementation → testing → maintenance.
- **UML** (Unified Modeling Language): standard visual language for specifying, visualising, constructing and documenting software systems. Not a programming language. Created by Booch, Rumbaugh and Jacobson ("three amigos"), standardised by OMG.

### UML diagrams

| Category | Diagram | Shows |
|---|---|---|
| **Structural** | **Class diagram** | Classes, attributes, operations, relationships (static view; most common) |
| | Object diagram | Instances at a moment in time |
| | Component, Deployment, Package, Composite structure | Software/hardware organisation |
| **Behavioural** | **Use case diagram** | Actors and system functions (requirements view) |
| | **Sequence diagram** | Object interaction in **time order** (vertical lifelines, messages) |
| | Collaboration/Communication diagram | Interaction organised by objects' links |
| | **Activity diagram** | Workflow / flowchart-like activities, parallel flows |
| | **State (statechart) diagram** | States of an object and transitions |
| | Timing, Interaction overview | |

- UML 2.x has **14** diagram types (7 structural + 7 behavioural).
- Use case diagram elements: **actor** (stick figure), **use case** (oval), system boundary (rectangle), association line, `<<include>>`, `<<extend>>`.
- Class box has 3 compartments: **name / attributes / operations**. Visibility: `+` public, `-` private, `#` protected, `~` package.

### Relationships

| Relationship | Meaning | Notation | Example |
|---|---|---|---|
| **Association** | General link ("uses/knows") | Plain line | Teacher - Student |
| **Aggregation** | Weak **has-a**; part can exist without whole | Hollow diamond ◇ at whole | Department ◇- Professor |
| **Composition** | Strong **has-a**; part dies with whole | **Filled** diamond ◆ | House ◆- Room, Car ◆- Engine |
| **Inheritance / Generalization** | **is-a** | Solid line with **hollow triangle** arrow to parent | Dog → Animal |
| **Realization** | Class implements interface | Dashed line with hollow triangle | Class ⇢ Interface |
| **Dependency** | One uses another temporarily | Dashed arrow | Method parameter |

- **Multiplicity**: 1, 0..1, 0..*, 1..*.
- Remember: **is-a = inheritance; has-a = aggregation/composition; uses-a = dependency/association**.
- Class diagram = static structure; sequence/activity/state/use case = dynamic behaviour (use case: functional view).
- **Abstract class** name is shown in *italics* (or `<<abstract>>`); interface is `<<interface>>`.
- Design principles: **SOLID** (Single responsibility, Open/closed, Liskov substitution, Interface segregation, Dependency inversion); **coupling should be low, cohesion high**.
- **Design patterns** (GoF): creational (Singleton, Factory), structural (Adapter, Decorator), behavioural (Observer, Strategy).

**⚡ Exam tip:** Sequence diagram = time-ordered interaction; class diagram = static structure; use case = actors and requirements; state diagram = object life cycle; activity diagram = workflow. Composition (filled diamond) vs aggregation (hollow diamond).

## 10. Code-Output Patterns with Worked Traces

### Pattern 1: static counter
```
class T { public: static int c; T(){ c++; } ~T(){ c--; } };
int T::c = 0;
int main(){
    T a;
    { T b, d; cout << T::c; }   // inside block
    cout << T::c;
}
```
Trace: after `a`, c=1; `b`,`d` → c=3, prints `3`; block ends, `d` and `b` destroyed → c=1; prints `1`. Output: **31**.

### Pattern 2: constructor/destructor order with members
```
class X { public: X(){cout<<"x";} ~X(){cout<<"X";} };
class Y { X m; public: Y(){cout<<"y";} ~Y(){cout<<"Y";} };
int main(){ Y obj; }
```
Member objects are constructed **before** the body of the owner's constructor: `x` then `y`. Destruction reverse: `Y` then `X`. Output: **xyYX**.

### Pattern 3: virtual vs non-virtual via pointer
```
class A { public: void show(){cout<<"A";} virtual void who(){cout<<"1";} };
class B : public A { public: void show(){cout<<"B";} void who(){cout<<"2";} };
A *p = new B;  p->show();  p->who();
B b; A &r = b; r.show(); r.who();
```
`show` non-virtual → static type A → `A`; `who` virtual → `2`. Same for the reference: `A`, `2`. Output: **A2A2**.

### Pattern 4: object slicing
```
class A { public: virtual void f(){cout<<"A";} };
class B : public A { public: void f(){cout<<"B";} };
B b;  A a = b;  a.f();
```
Copying a derived object into a base **object** (not pointer) slices it; `a` is a pure A, so `A` is printed. Output: **A**.

### Pattern 5: copy constructor calls
```
class K { public: K(){cout<<"d";} K(const K&){cout<<"c";} };
void f(K x){}
int main(){ K a; f(a); K b = a; }
```
`K a` → `d`; `f(a)` pass by value → `c`; `K b = a` → `c`. Output: **dcc**.

### Pattern 6: Java overloading with widening
```
static void m(int x){ System.out.print("int"); }
static void m(long x){ System.out.print("long"); }
static void m(Integer x){ System.out.print("Integer"); }
m(5);  m(5L);  m('a');
```
`m(5)` exact int; `m(5L)` long; `m('a')`: char widens to int (widening is preferred over boxing). Output: **intlongint**.

### Pattern 7: Java polymorphism (method vs field)
```
class P { int v = 1; void show(){ System.out.print("P" + v); } }
class C extends P { int v = 2; void show(){ System.out.print("C" + v); } }
P o = new C();
o.show();
System.out.print(o.v);
```
Method call dispatched on the actual object (C) → `C2`; field access uses the **reference type** P → `1`. Output: **C21**.

### Pattern 8: Java static and initialisation order
```
class Q {
    static { System.out.print("S"); }
    { System.out.print("I"); }
    Q() { System.out.print("C"); }
}
new Q(); new Q();
```
Order: static block once at class load; then for each object: instance initialiser block, then constructor. Output: **SICIC**.

### Pattern 9: Java String identity
```
String a = "hi", b = "hi", c = new String("hi");
System.out.print((a == b) + " " + (a == c) + " " + a.equals(c));
```
Output: **true false true**.

### Pattern 10: operator/post-increment and loops (shared with C)
`int i = 5; cout << i++ + ++i;` → undefined/unspecified in C++; do not rely on it. In Java: `i++` gives 5 (i=6), `++i` gives 7 → 12.

### Pattern 11: private/protected access errors (compile errors)
- Accessing `private` data from `main()` through the object → **error**.
- Calling a non-static member from a static function → **error**.
- Instantiating an abstract class or an interface → **error**.
- Overriding a `final` method / extending a `final` class → **error**.
- Missing `throws` for a checked exception → **error**.
- Catching a subclass exception after its superclass in Java → **error** (unreachable catch).

**⚡ Exam tip:** For output questions: (1) find static vs dynamic type, (2) check whether the method is virtual / overridden, (3) list constructor order base → member → derived body, (4) remember destructors run in reverse, (5) in Java, methods are polymorphic but fields and static methods are not.

## 11. C++ and Java Fundamentals: Control Flow, Arrays, Pointers, Structures, File Handling

The syllabus asks for fundamentals of C, C++, Java and Python. C and Python are in the Programming notes; this chapter gives the C++ and Java equivalents and the common comparison points.

### 11.1 Control flow (C++ and Java)
- Same constructs as C: `if / else if / else`, `switch`, `for`, `while`, `do-while`, `break`, `continue`.
- `switch` **falls through** to the next case until a `break` (or the end). Java `switch` works on `int`, `char`, `byte`, `short`, enum and `String` (not `long`, `float`, `double`, `boolean`); case labels must be constants.
- `break` leaves only the **innermost** loop (or the switch); `continue` skips to the next iteration. Java adds **labelled break/continue**: `outer: for(...) { for(...) { break outer; } }`.
- Java condition must be a **boolean** expression (`if (x = 5)` is a compile error; in C/C++ it is legal and always true). Java has no `goto` (reserved word).
- Enhanced for: Java `for (int x : arr)`, C++11 `for (int x : v)`; read-only copy of each element.

```
for (int i = 1; i <= 5; i++) { if (i == 3) continue; if (i == 5) break; cout << i; }   → 124
for (int i=1;i<=3;i++) for (int j=1;j<=3;j++) { if (j==2) break; print(i*j); }          → 123
```

### 11.2 Arrays

| | C++ | Java |
|---|---|---|
| Declare | `int a[5];` `int a[] = {1,2,3};` | `int[] a = new int[5];` `int[] a = {1,2,3};` |
| Default values | **garbage** for local arrays | **0** / false / null (arrays are objects on the heap) |
| Length | `sizeof(a)/sizeof(a[0])` (only in the declaring scope) | `a.length` (a field, no brackets); `s.length()` for String |
| Bounds check | **none** (undefined behaviour) | `ArrayIndexOutOfBoundsException` |
| 2-D | `int m[2][3];` contiguous, row-major | `int[][] m = new int[2][3];` array of arrays; rows may differ (jagged) |
| Passing | decays to a pointer | reference to the array object |

- `int[][] a = new int[3][4];` → `a.length` = 3 (rows), `a[0].length` = 4 (columns).
- `int[] b = a;` copies the **reference**; `b[0] = 9` changes `a[0]` too. Use `clone()` or `Arrays.copyOf` for a real copy. `Arrays.sort`, `Arrays.toString`, `Arrays.fill` are in `java.util.Arrays`.
- C++ `vector<int>` is the resizable array (`push_back`, `size`, `at()` with bounds check).

### 11.3 Pointers and references in C++ (Java has none)
- Same pointer rules as C: `*p`, `&x`, pointer arithmetic scaled by type size, `a[i] == *(a+i)`, `NULL`/`nullptr`.
- `int a[] = {10,20,30,40}; cout << *(a+1) + sizeof(a)/sizeof(a[0]);` → 20 + 4 = **24**.
- **Reference** `int &r = x;` is an alias: must be initialised, cannot be reseated, no null reference. Pass by reference avoids the copy: `void swap(int &a, int &b)`.
- Dynamic memory: `int *p = new int(5);` ... `delete p;` and `int *q = new int[10];` ... `delete[] q;` (mismatch → undefined behaviour). `new` calls the constructor, `delete` calls the destructor; `malloc/free` do not.
- Object pointers use `->`: `Student *s = new Student; s->show();`.
- Java: no pointers; objects are accessed through **references**, all on the heap, freed by the garbage collector. `null` reference → `NullPointerException`. Arguments are passed **by value** (a copy of the reference).

### 11.4 Structures in C++ and Java
- C++ `struct` is a class whose members (and inheritance) are **public by default**; it can have member functions, constructors and inheritance. `class` defaults to **private**. Otherwise they are the same.
- Structures are copied member-wise on assignment and when passed by value: `void f(P p){ p.x = 9; }` does not change the caller's object. A `union` shares memory between members, exactly as in C.
- Java has **no struct and no union**; a class (usually with public fields or getters/setters) plays that role. Objects are always handled through references, so `f(Point p){ p.x = 9; }` **does** change the caller's object (but reassigning `p` inside `f` does not).

### 11.5 File handling in C++ (`<fstream>`)
- Classes: `ifstream` (input), `ofstream` (output), `fstream` (both). `#include <fstream>`.
```
ofstream out("a.txt");        // creates, ERASES old content by default
out << "Hello " << 10 << endl;
out.close();
ifstream in("a.txt");
string w; int n;
in >> w >> n;                 // reads whitespace-separated tokens: Hello 10
getline(in, line);            // reads a whole line
while (in >> x) { ... }       // loop until extraction fails (end of file)
```

| Mode flag | Meaning |
|---|---|
| `ios::in` | open for reading (default for `ifstream`) |
| `ios::out` | open for writing, truncates (default for `ofstream`) |
| `ios::app` | append: every write goes to the end, old content kept |
| `ios::ate` | go to end on open, but writes may be repositioned |
| `ios::trunc` | erase existing content |
| `ios::binary` | binary mode (use `read()` / `write()`) |

- Combine flags with `|`: `fstream f("a.dat", ios::in | ios::out | ios::binary);`.
- Test: `if (!in)` or `in.is_open()`; `in.eof()` is true only **after** a read hits the end; `fail()`, `good()`, `bad()` give the stream state.
- Positioning: `seekg(pos)` / `tellg()` for the get (read) pointer, `seekp(pos)` / `tellp()` for the put (write) pointer.

### 11.6 File handling in Java (`java.io`)
- **Byte streams**: `FileInputStream`, `FileOutputStream` (abstract parents `InputStream`, `OutputStream`). **Character streams**: `FileReader`, `FileWriter` (parents `Reader`, `Writer`). Buffered wrappers: `BufferedReader` (`readLine()`), `BufferedWriter`, `PrintWriter`. `Scanner(new File("a.txt"))` reads tokens/lines. `File` class represents a path: `exists()`, `length()`, `delete()`, `isDirectory()`, `mkdir()`.
- `new FileWriter("a.txt")` truncates; `new FileWriter("a.txt", true)` **appends**. `FileReader` on a missing file throws **FileNotFoundException** (a checked subclass of `IOException`).
- Object serialisation: class implements the marker interface `Serializable`; `ObjectOutputStream.writeObject()` / `ObjectInputStream.readObject()`; `transient` fields are skipped.
```
try (BufferedReader br = new BufferedReader(new FileReader("a.txt"))) {
    String line;
    while ((line = br.readLine()) != null) System.out.println(line);   // null at end of file
} catch (IOException e) { System.out.println("error"); }
```
- try-with-resources closes the resource automatically **before** the catch block runs: the resource's `close()` output comes before the catch output, and `finally` last.

### 11.7 Abstract methods, destructor order and exception design (quick additions)
- **Abstract method** (Java): signature only, ends with `;`, declared `abstract`, can never be `private`, `final` or `static`; the first concrete subclass must implement it. An abstract **class** can still have constructors (run via `super()`), fields and concrete methods.
- **Destructor order** (C++): local objects are destroyed in **reverse** order of construction; with inheritance, the derived destructor runs first, then the base destructor. `delete p` on a base pointer needs a **virtual destructor** to run the derived part.
- **Catch order**: Java requires specific before general (`catch (ArithmeticException)` before `catch (Exception)`), otherwise a compile-time error. A checked exception thrown without `try-catch` or a `throws` clause is a compile-time error. In C++ `throw;` inside a handler re-throws the current exception to the outer handler.

**⚡ Exam tip:** `ofstream` truncates unless `ios::app`; Java `FileWriter(name, true)` appends; Java arrays default to 0/null and have `.length`, C++ locals are garbage and unchecked; C++ struct = public by default, class = private; Java has no pointers, struct or union; `FileNotFoundException` is checked; try-with-resources closes before catch.

## Quick Revision Sheet

- Four pillars: encapsulation, abstraction, inheritance, polymorphism; information hiding via access specifiers.
- Encapsulation = binding data + functions in a class; abstraction = hiding implementation, showing essentials.
- Class is a blueprint (no memory); object is an instance (has memory).
- C++ `class` default private; `struct` default public.
- Constructor: class name, no return type, overloadable, cannot be virtual; destructor: `~Name()`, no args, one only.
- Copy constructor takes a **reference**: `A(const A&)`; `B c = b;` copy ctor, `c = b;` assignment.
- Order: constructors base → derived; destructors derived → base (reverse).
- `this` is available only in non-static member functions; static functions touch only static members.
- Friend function: not a member, no `this`, not inherited, not mutual.
- Private inheritance makes base public/protected members private in derived; private base members never accessible.
- Diamond problem solved by `virtual` base class in C++; Java has no multiple class inheritance.
- Overloading = same name, different parameters (compile-time); overriding = same signature in child (run-time).
- Return type alone cannot overload a function.
- Virtual function + base pointer → derived version runs (vtable/vptr); constructors cannot be virtual.
- Pure virtual `= 0` → abstract class, cannot instantiate.
- Cannot overload: `::  .  .*  ?:  sizeof`; binary member operator takes 1 argument; Java has no operator overloading.
- Abstract class: constructors, one parent; interface: no constructors, constants only, many allowed.
- Template: `template <class T>`; Java generics erase types and reject primitives.
- C++ exceptions: try/catch/throw (no finally); `catch(...)` last; Java: `throw` vs `throws`; `finally` always runs.
- STL: containers, algorithms, iterators; `stack` LIFO, `queue` FIFO, `map` sorted key-value.
- Java: `.java` → javac → bytecode `.class` → JVM; JDK ⊃ JRE ⊃ JVM.
- String is immutable (pool); `StringBuffer` synchronized, `StringBuilder` not.
- `final` (constant/no override/no inherit), `finally` (always block), `finalize()` (GC hook).
- Thread: `start()` creates a new thread, `run()` doesn't; Runnable preferred; `synchronized` prevents races.
- `Set` no duplicates, `List` ordered with duplicates, `HashMap` allows one null key, `Hashtable` none.
- UML: class = static structure, sequence = time order, use case = actors, composition = filled diamond, aggregation = hollow diamond.
- C++/Java fundamentals: `switch` falls through without `break`; Java arrays default to 0/null with `.length`, C++ locals are garbage and unchecked; Java has no pointers, struct or union; C++ struct members public by default, class private.
- Files: C++ `ofstream` truncates unless `ios::app`; `ifstream`/`ofstream`/`fstream`; Java `FileReader`/`FileWriter(name, true)` appends, `BufferedReader.readLine()` returns null at EOF, `FileNotFoundException` is checked (extends IOException); try-with-resources closes before catch.
- Destructors run in reverse order of construction (derived before base); Java catch order specific to general; abstract methods have no body and need a concrete subclass; abstract classes may have constructors.
