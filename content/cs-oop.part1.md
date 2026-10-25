# Object-Oriented Programming (C++ & Java)

> **What the exam asks:** about 4-6 questions per paper. Expect definitions of the four pillars, constructor/destructor rules, access specifiers in inheritance, virtual functions and "predict the output" snippets (C++ and Java), overloading vs overriding, abstract class vs interface, exceptions, Java basics (JVM, bytecode, String immutability, final/finally/finalize), templates, and UML diagram names. Output-prediction questions are the most scoring and the easiest to get wrong, so trace them line by line.

## 1. OOP Principles and Basic Concepts

### Procedural vs object-oriented

| Point | Procedural (C) | Object-oriented (C++/Java) |
|---|---|---|
| Focus | Functions / steps | Objects (data + functions) |
| Approach | Top-down | Bottom-up |
| Data | Global, freely shared | Hidden inside objects |
| Security | Low | High (access specifiers) |
| Reuse | Copy functions | Inheritance, composition |

### The four pillars (plus information hiding)
- **Encapsulation**: binding data and the functions that operate on it into a single unit (class). Data is protected from outside access.
- **Data / information hiding**: restricting direct access to the internals using `private`/`protected`. Encapsulation is the *mechanism*, hiding is the *goal*. Achieved with access specifiers.
- **Abstraction**: showing only essential features, hiding implementation details. Implemented by abstract classes, interfaces, and by ordinary classes with public methods.
- **Inheritance**: a new class (derived/child/sub) acquires properties of an existing class (base/parent/super). Gives code **reusability** and an "is-a" relationship.
- **Polymorphism**: "many forms", one name, many behaviours.
  - **Compile-time (static / early binding)**: function overloading, operator overloading, templates.
  - **Run-time (dynamic / late binding)**: virtual functions / method overriding.

Quick distinction: encapsulation solves the problem at the *implementation* level, abstraction at the *design* level.

### Class and object
- **Class**: user-defined data type, a blueprint/template. No memory is allocated for the class itself (only when objects are created).
- **Object**: an instance of a class; occupies memory. It has **state** (data members), **behaviour** (member functions) and **identity**.
- **Message passing**: objects communicate by calling each other's methods.
- C++ `struct` vs `class`: default access of `struct` members is **public**, of `class` members is **private**. Default inheritance: struct → public, class → private.
- Java: everything lives inside a class; objects are created with `new` and live on the heap; variables hold *references*.

```
class Student {          // C++
    int roll;            // private by default
public:
    void set(int r) { roll = r; }
    int  get()      { return roll; }
};
Student s1;              // object
s1.set(5);
```

### Other terms
- **Dynamic binding**: the function to be called is decided at run time.
- **Method / member function**: function inside a class. **Data member / field / attribute**: variable inside a class.
- **Object-oriented languages**: pure OO = Smalltalk, Java (almost; has primitives), Eiffel. C++ is hybrid (supports both procedural and OO). 
- **Java is not 100% pure OO** because of primitive types (`int`, `char`...) and static members.

**⚡ Exam tip:** "Wrapping data and functions into a unit" = **encapsulation**. "Showing only essentials" = **abstraction**. "One name, many forms" = **polymorphism**. "Reusability" = **inheritance**. Do not confuse them. Default access: class → private, struct → public.

## 2. Constructors, Destructors, this, static, friend

### Constructors (C++)
A **constructor** is a special member function that is called automatically when an object is created, to initialise it.
- Name = class name; **no return type (not even void)**; usually public.
- Can be **overloaded**; cannot be `virtual`, cannot be `static`, cannot be inherited (but is invoked via initialiser list).
- Types:

  | Type | Description |
  |---|---|
  | Default | No arguments (or all with defaults). Compiler supplies one **only if no constructor is written by the user** |
  | Parameterized | Takes arguments to initialise members |
  | Copy | `ClassName(const ClassName &obj)`: creates object as a copy of another |
  | Dynamic / move (C++11) | Advanced, rarely asked |

```
class P {
    int x, y;
public:
    P()            { x = y = 0; }          // default
    P(int a, int b){ x = a; y = b; }       // parameterized
    P(const P &o)  { x = o.x; y = o.y; }   // copy
};
P a;            // default
P b(3, 4);      // parameterized
P c = b;        // copy constructor
P d(b);         // copy constructor
```
- Copy constructor **must take a reference** (`P(P o)` would recurse infinitely).
- Copy constructor is called: (1) initialising from another object, (2) passing an object **by value**, (3) returning an object by value (may be elided).
- `c = b;` for an **already declared** `c` calls the **assignment operator**, not the copy constructor.
- Default copy = **shallow copy** (member-wise). Pointer members need a user-written **deep copy**.
- If the user declares *any* constructor, the compiler no longer generates the default one; `P p;` then errors unless a default is written.
- **Initialiser list**: `P(int a) : x(a), y(0) {}`. Mandatory for `const` members, reference members, and base-class constructors with arguments. Members are initialised in the order of **declaration**, not list order.
- A constructor can be `private` (singleton pattern).

### Destructors (C++)
- Name `~ClassName()`; **no arguments, no return type, cannot be overloaded** → exactly one per class.
- Called automatically when the object goes out of scope or `delete` is applied. Used to free resources.
- Objects are destroyed in the **reverse order** of construction.
- A base class destructor should be **virtual** if you delete a derived object via a base pointer.
- Constructors are called in order of declaration; destructors in reverse.

### Constructors in Java
- Same name as class, no return type, called by `new`. Overloadable, **not inherited**.
- If none is written, the compiler adds a **default constructor** (no-arg).
- `this(...)` calls another constructor of the same class; `super(...)` calls the parent constructor. Either must be the **first statement** (and only one of them).
- Java has **no destructor** and **no copy constructor by default** (you write one, or use `clone()`). Garbage collector reclaims memory; `finalize()` is called (deprecated) before collection.
- Parameter passing: Java is always **pass-by-value** (for objects, the reference is copied).

### Order of constructor/destructor calls in inheritance
```
class A { public: A(){cout<<"A ";}  ~A(){cout<<"~A ";} };
class B : public A { public: B(){cout<<"B ";} ~B(){cout<<"~B ";} };
int main(){ B b; }
```
Output: `A B ~B ~A`. Base constructor first, derived destructor first. (Java: super constructor runs first as well.)

### The `this` pointer
- Implicit pointer to the **current object**, available in every **non-static** member function.
- Uses: resolve name clash `this->x = x;`, return the object (`return *this;` for chaining), pass the current object.
- Not available in static member functions. Type is `ClassName * const`.
- In Java `this` is a reference to the current object; also `this(...)` for constructor chaining.

### Static members

| | C++ | Java |
|---|---|---|
| Static data member | One copy shared by all objects; must be **defined outside** the class (`int A::count = 0;`) | One copy per class; initialised in-place or in `static {}` block |
| Static member function | Can access **only static** members; no `this` | Can access only static members directly; cannot use `this`/`super`; cannot be overridden (can be hidden) |
| Call | `A::f();` or via object | `A.f();` |

- A static member exists even if **no object** is created.
- Typical use: counting the objects created (increment in constructor, decrement in destructor).

```
class C { public: static int n; C(){ n++; } };
int C::n = 0;
int main(){ C a, b, c; cout << C::n; }   // 3
```

### friend (C++)
- A **friend function** is a non-member function given access to private and protected members. Declared with `friend` inside the class; defined outside without the keyword, and without `A::`.
- A **friend class** gives all its member functions access.
- Friendship is **not inherited**, **not transitive**, and **not mutual** (A friend of B does not make B a friend of A).
- Friend function has **no `this`** pointer; it is not called with the dot operator; it is not affected by access specifier placement.
- It *violates* encapsulation slightly but is needed e.g. for operator overloading of `<<`, `>>` (stream operators).
- Java has no `friend`; the nearest is package-private (default) access.

### Other class features
- **Inline function**: request to substitute the body at the call site; saves call overhead. Member functions defined inside the class are implicitly inline.
- **Default arguments**: assigned right-to-left; `void f(int a, int b = 5);` is valid, `void f(int a = 1, int b);` is invalid.
- **const member function**: `int get() const;` cannot modify data members. **const object** can call only const member functions.
- **Nested class**, **local class**, **anonymous object** (`A();`).
- **Reference variable** `int &r = x;` must be initialised at declaration; cannot be reseated.
- **Dynamic memory**: `new` / `delete` (C++), `new[]` / `delete[]`; Java uses `new` only.
- **Scope resolution operator** `::` defines a member outside the class, accesses a global with the same name as a local.

**⚡ Exam tip:** Constructor: no return type, same name, can be overloaded; destructor: `~`, no arguments, **cannot** be overloaded. Static function has no `this`. Friend is not inherited. "`B c = b;` copy constructor, `c = b;` assignment."

## 3. Access Specifiers and Inheritance

### Access specifiers

| Specifier | Same class | Derived class | Outside (object) |
|---|---|---|---|
| `private` | Yes | No | No |
| `protected` | Yes | Yes | No |
| `public` | Yes | Yes | Yes |

**Java** has four levels:

| Modifier | Class | Package | Subclass (other pkg) | World |
|---|---|---|---|---|
| `private` | Yes | No | No | No |
| default (none) | Yes | Yes | No | No |
| `protected` | Yes | Yes | Yes | No |
| `public` | Yes | Yes | Yes | Yes |

(Java has no `friend`; no private/protected inheritance modes; `private`/`protected` cannot be applied to top-level classes.)

### Mode of inheritance (C++)
How base members appear in the derived class:

| Base member | public inheritance | protected inheritance | private inheritance |
|---|---|---|---|
| public | public | protected | private |
| protected | protected | protected | private |
| private | not accessible | not accessible | not accessible |

- Private members of the base are **always inherited (exist in memory)** but **never directly accessible** in the derived class.
- Rule of thumb: the effective access = the *more restrictive* of (member access, mode).
- Default mode: `class D : B` is **private**; `struct D : B` is **public**.
- Public inheritance models "is-a".

### Types of inheritance

| Type | Structure |
|---|---|
| Single | A → B |
| Multilevel | A → B → C |
| Multiple | A, B → C (C++ yes; Java **classes** no, via interfaces yes) |
| Hierarchical | A → B, A → C |
| Hybrid | Combination (e.g. multiple + hierarchical); can create the diamond problem |

### Ambiguity and the diamond problem
```
class A { public: int x; };
class B : public A {};
class C : public A {};
class D : public B, public C {};   // D has TWO copies of A::x
D d;  d.x = 1;           // ERROR: ambiguous
d.B::x = 1;              // resolved with scope resolution
```
- Solution: **virtual inheritance**: `class B : virtual public A`, `class C : virtual public A` → only one shared copy of A in D.
- Also ambiguous: two bases with the same member function name; resolve with `d.B::show()` or by overriding it in the derived class.
- With virtual base, the **most derived class constructor** initialises the virtual base first.
- **Java** avoids the diamond by not allowing multiple class inheritance. With interfaces having the same `default` method, the implementing class must override it (can call `Iface.super.m()`).

### Constructor order with multiple inheritance
Base constructors run in the order they are **listed in the derived class declaration** (`class D : public B, public C` → B then C), not in the order of the initialiser list. Virtual bases are constructed first. Destructors reverse.

### Java inheritance
- `class B extends A`; single inheritance only for classes; every class implicitly extends `Object`.
- `super` refers to the parent (call parent constructor, parent method, parent field).
- `final` class cannot be extended; `final` method cannot be overridden.
- Constructors are not inherited; the first line of a constructor is an implicit `super();`.
- A superclass reference can refer to a subclass object (upcasting).

**⚡ Exam tip:** Private inheritance: public members of the base become **private** in the derived class. Protected inheritance: public → protected. Base private members are never accessible. Diamond problem → virtual base class (C++), no multiple class inheritance (Java).
