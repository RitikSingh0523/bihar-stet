
## 4. Polymorphism: Overloading, Overriding, Virtual Functions

### Method signature
- In Java: **method name + parameter list (number, types, order)**. Return type and access modifier are **not** part of the signature. Exceptions are not part of it either.
- In C++ the signature likewise includes name + parameter types (and `const` qualifier for member functions); return type is not included.

### Overloading vs overriding

| Point | Overloading | Overriding |
|---|---|---|
| Meaning | Same name, **different parameters** | Derived class redefines a base method with the **same signature** |
| Where | Same class (or inherited) | Parent-child classes |
| Binding | **Compile time** (static) | **Run time** (dynamic), in C++ only if `virtual` |
| Return type | Can differ (but alone does not distinguish) | Same, or covariant (subtype) |
| Access | Any | Cannot be more restrictive |
| Polymorphism | Compile-time | Run-time |

- Changing **only the return type** is not valid overloading (compile error "already defined").
- Overloading can also be by changing the **order** of parameter types: `f(int, double)` vs `f(double, int)`.
- Ambiguous call: `f(int, double)` and `f(double, int)` with call `f(1, 2)` → ambiguity error.
- Java: `static`, `private`, `final` methods and constructors **cannot be overridden** (static methods are *hidden*). Overriding method can **not throw broader checked exceptions**. Use `@Override` to let the compiler check it.
- Java field access is **by reference type** (fields are not polymorphic); method call is **by object type**.
- **Overloading resolution** (Java): exact match → widening (`int`→`long`→`float`→`double`) → boxing → varargs. `f(char)` with only `f(int)` available chooses `f(int)`. `null` with `f(Object)` and `f(String)` picks the more specific `String`.

### Virtual functions (C++)
- A **virtual function** is a base class member function declared with `virtual`, which can be overridden in derived classes; call through a **base pointer/reference** executes the version of the **actual object** (run-time polymorphism).
- Implemented with **vtable** (per class table of function pointers) and **vptr** (hidden pointer in each object).
- Without `virtual`, the call is bound by the **pointer type** (static / early binding), the base version runs.
- Once virtual in the base, the derived override is automatically virtual (the keyword is optional there; C++11 `override` checks it).
- Rules: cannot be `static`; a constructor **cannot** be virtual; a destructor **can** (and should) be virtual; virtual calls need pointer or reference (a call on an object by value is bound at compile time); virtual function can be `friend` of another class.
- **Virtual destructor**: if `Base *p = new Derived; delete p;` and the destructor is non-virtual, only `~Base()` runs (undefined behaviour / leak).

```
class A { public: virtual void f(){cout<<"A";} void g(){cout<<"a";} };
class B : public A { public: void f(){cout<<"B";} void g(){cout<<"b";} };
int main(){ A *p = new B;  p->f();  p->g(); }
```
Trace: `p` has static type `A*`, dynamic type `B`. `f` is virtual → B::f prints `B`. `g` is not virtual → A::g prints `a`. Output: **Ba**.

### Pure virtual function and abstract class (C++)
- **Pure virtual function**: `virtual void draw() = 0;` has no body (a body can optionally be given outside).
- A class with **at least one** pure virtual function is **abstract**: cannot be instantiated; pointers/references to it are allowed.
- A derived class that does not override all pure virtual functions stays abstract.
- An abstract class **can have constructors**, data members and normal functions.
- A class with all pure virtual functions and no data = an "interface" in C++.

### Run-time vs compile-time polymorphism

| | Compile-time | Run-time |
|---|---|---|
| Also called | Static / early binding | Dynamic / late binding |
| Achieved by | Function overloading, operator overloading, templates | Virtual functions, overriding |
| Speed | Faster | Slightly slower (vtable lookup) |
| Resolved by | Compiler | Object's actual type at run time |

### Operator overloading (C++)
- Giving additional meaning to an existing operator for user-defined types. Syntax: `ReturnType operator+(args)`.
- Cannot create new operators; cannot change precedence, associativity or number of operands.
- **Cannot be overloaded**: `::` (scope), `.` (member access), `.*` (pointer-to-member), `?:` (ternary), `sizeof`, `typeid`. (Mnemonic: `:: . .* ?: sizeof`.)
- `=`, `[]`, `()`, `->` must be **member** functions. `<<` and `>>` for streams must be **non-member (usually friend)**.
- **Binary operator** as member: takes **1** argument (left operand = `*this`). As friend/non-member: takes **2**.
- **Unary operator** as member: takes **0** arguments; as friend: **1**. Postfix `++` uses a dummy `int` parameter: `operator++(int)`.
- At least one operand must be a user-defined type (cannot redefine `int + int`).
- Java does **not** support user-defined operator overloading (only built-in `+` for String concatenation).

```
class Cx {
    int re, im;
public:
    Cx(int r=0,int i=0){re=r;im=i;}
    Cx operator+(Cx o){ return Cx(re+o.re, im+o.im); }
    friend ostream& operator<<(ostream &os, const Cx &c){
        return os << c.re << "+" << c.im << "i";
    }
};
Cx a(1,2), b(3,4);
cout << a + b;        // 4+6i
```

### Function overloading details (C++)
- Functions differ by number/type/order of parameters. `int f(int)` and `float f(int)` → error.
- Default arguments can cause ambiguity with overloads.
- Name mangling is what allows overloading (C++ compiler encodes parameter types in the symbol).

**⚡ Exam tip:** Overload = same name, different parameters (compile-time); override = same signature in subclass (run-time, needs `virtual` in C++). Return type alone never overloads. Pure virtual `= 0` makes the class abstract. Operators that can NOT be overloaded: `::  .  .*  ?:  sizeof`.

## 5. Abstract Classes, Interfaces, Templates and Generics

### Abstract class vs interface (Java)

| Feature | Abstract class | Interface |
|---|---|---|
| Keyword | `abstract class` | `interface` |
| Methods | Abstract + concrete | Abstract (implicitly `public abstract`), plus `default`, `static`, `private` (Java 8/9+) |
| Variables | Any kind | Only `public static final` constants |
| Constructors | **Yes** | **No** |
| Inheritance | `extends`, only **one** | `implements`, a class can implement **many**; interface `extends` many interfaces |
| Instantiation | Not directly | Not directly |
| Access modifiers on members | Any | Methods are public by default |
| Use | Partial implementation, "is-a" with shared state | Pure contract / capability, multiple inheritance of type |

- `abstract` method has no body and must be inside an abstract class; a subclass must implement it or be abstract itself.
- `abstract` + `final` is illegal; `abstract` + `static` method is illegal; `abstract` + `private` illegal.
- An abstract class **can** have a `main` method and constructors (called through `super`).
- Anonymous classes and lambdas can implement an interface; a **functional interface** has exactly one abstract method (e.g. `Runnable`, `Comparator`).
- **Marker interface**: empty interface (`Serializable`, `Cloneable`).
- Java interface fields: `int x = 5;` in an interface is automatically `public static final`.
- C++ equivalents: abstract class with pure virtual functions.

### Templates (C++)
- **Generic programming**: write code once that works with any data type; compile-time (static) polymorphism; code instantiated per type used.
```
template <class T>              // or: template <typename T>
T maxi(T a, T b){ return (a > b) ? a : b; }
cout << maxi(3, 7);             // T = int
cout << maxi(2.5, 1.5);         // T = double
cout << maxi<char>('a','z');    // explicit type
```
- **Function template**: generic function. **Class template**: generic class, instantiated as `Stack<int> s;`.
```
template <class T>
class Pair { T a, b; public: Pair(T x, T y){a=x;b=y;} T first(){return a;} };
Pair<int> p(1, 2);
```
- Template can take multiple parameters: `template <class T, class U>` and non-type parameters `template <class T, int N>`.
- **Template specialization**: special version for a particular type.
- `maxi(3, 2.5)` with a single `T` → compile error (deduction conflict).
- Templates are the basis of the **STL**.

### Generics (Java)
- `class Box<T> { T val; }`, `List<String> list = new ArrayList<>();`
- Provide **compile-time type safety** and avoid casts. **Type erasure**: generic type information is removed at compile time (replaced by `Object` or bound).
- **Type parameters can be only reference types** (`List<Integer>`, not `List<int>`).
- Wildcards: `<?>`, `<? extends T>` (upper bound), `<? super T>` (lower bound).
- Generic method: `public static <T> void show(T x)`.
- Cannot instantiate `new T()` or create a generic array `new T[10]`.

### C++ templates vs Java generics

| | C++ templates | Java generics |
|---|---|---|
| Resolved | Compile time, separate code per type | Compile time check, erased at runtime |
| Primitive types | Allowed | Not allowed (use wrappers) |
| Mechanism | Code generation | Type erasure |

**⚡ Exam tip:** Interface = no constructors, fields are `public static final`, a class can implement many; abstract class = constructors allowed, one parent only. Template declaration begins `template <class T>` (or `typename`). Java generics cannot use primitives.

## 6. Exception Handling

### Concept
An **exception** is a run-time abnormal condition. **Exception handling** separates error handling from normal code and prevents abrupt termination.

### C++
- Keywords: **try**, **catch**, **throw** (no `finally` in C++).
```
try {
    int d = 0;
    if (d == 0) throw "Divide by zero";   // throw
}
catch (const char *msg) { cout << msg; }  // handler
catch (...) { cout << "any"; }            // catch-all
```
- A handler is chosen by the **type of the thrown object**; first matching `catch` is used (**no implicit conversion** `int`→`double` between throw and catch, except derived→base).
- `catch(...)` handles any type and must be **last**.
- Handlers for **derived** classes must come **before** base class handlers (else base catches all).
- If no handler matches, `terminate()` → `abort()`.
- `throw;` (without operand) **re-throws** the current exception.
- Stack unwinding: local objects are destroyed (destructors run) as control leaves scopes.
- Standard exceptions in `<exception>`: `std::exception`, `bad_alloc`, `bad_cast`, `out_of_range`, `runtime_error`, `invalid_argument`.

Worked trace:
```
try { cout << "A"; throw 5; cout << "B"; }
catch (double d) { cout << "D"; }
catch (int i)    { cout << "I"; }
cout << "E";
```
`A` printed, `throw 5` jumps out (B is skipped); 5 is an int → `catch(int)` prints `I`; execution continues after the handlers → `E`. Output: **AIE**.

### Java
- Keywords: `try`, `catch`, `finally`, `throw`, `throws`.
- Hierarchy: `Object → Throwable → Error` and `Exception → RuntimeException`.

  | Kind | Examples | Rule |
  |---|---|---|
  | **Checked** (compile-time) | `IOException`, `SQLException`, `ClassNotFoundException`, `InterruptedException` | Must be caught or declared with `throws` |
  | **Unchecked** (run-time) | `ArithmeticException`, `NullPointerException`, `ArrayIndexOutOfBoundsException`, `NumberFormatException`, `ClassCastException` | Subclasses of `RuntimeException`; optional |
  | **Error** | `OutOfMemoryError`, `StackOverflowError` | Not meant to be caught |
- `throw` is a statement that throws **one** exception object (`throw new ArithmeticException("x");`); `throws` is in the method signature declaring possible checked exceptions (can list several).
- **finally**: executes **whether or not an exception occurs**, used for cleanup. Does not execute only if the JVM exits (`System.exit()`), or the thread dies/crash.
- `try` needs at least one `catch` or a `finally`. Multiple catch: order **specific → general** (a superclass catch before a subclass catch is a compile error). Multi-catch: `catch (A | B e)`.
- A `return` in `finally` overrides a `return` in `try`.
- **try-with-resources**: `try (FileReader f = new FileReader(...))` auto-closes `AutoCloseable` resources.
- Custom exception: `class MyEx extends Exception { MyEx(String m){ super(m); } }`.
- `ArithmeticException` is for integer `/ 0`; double division by zero gives `Infinity` (no exception).

Worked trace (Java):
```
static int f(){
    try { return 1; }
    finally { System.out.print("F"); }
}
System.out.print(f());
```
The `try` computes return value 1, then `finally` runs (prints `F`), then 1 is returned and printed. Output: **F1**.

Another:
```
try { int a = 5 / 0; System.out.print("X"); }
catch (ArithmeticException e) { System.out.print("C"); }
finally { System.out.print("F"); }
System.out.print("E");
```
Output: **CFE**.

**⚡ Exam tip:** `throw` = do it, `throws` = declare it. `finally` runs even after `return`. C++ has no `finally`; `catch(...)` must be last. Checked exceptions are checked at compile time; `RuntimeException` family is unchecked.
