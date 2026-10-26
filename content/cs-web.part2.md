
## CSS

### Basics
- **CSS** = Cascading Style Sheets; separates presentation from content; a style sheet language (W3C). Extension `.css`. Syntax:
```css
selector { property: value; property2: value2; }
h1 { color: red; font-size: 24px; }
/* comment */
```

### Three ways to apply CSS

| Type | Where | Priority |
|---|---|---|
| **Inline** | `style` attribute on the element: `<p style="color:red">` | Highest |
| **Internal (embedded)** | `<style>` in `<head>` | Medium |
| **External** | `.css` file linked with `<link rel="stylesheet" href="s.css">` in `<head>` | Lowest (but best practice: reusable, cached, one change updates all pages) |

- `@import url("x.css");` also imports a sheet. When specificity is equal, the **last** rule wins (cascade order).

### Selectors

| Selector | Example | Selects |
|---|---|---|
| Universal | `*` | Everything |
| Type/element | `p` | All `<p>` |
| Class | `.note` | class="note" (reusable) |
| ID | `#main` | id="main" (unique) |
| Group | `h1, h2` | Both |
| Descendant | `div p` | `<p>` anywhere inside div |
| Child | `div > p` | Direct children only |
| Adjacent sibling | `h1 + p` | `<p>` immediately after h1 |
| General sibling | `h1 ~ p` | All following sibling p |
| Attribute | `input[type="text"]` | By attribute |
| Pseudo-class | `a:hover`, `:first-child`, `:nth-child(2)`, `:focus` | State/position |
| Pseudo-element | `p::first-line`, `::before`, `::after` | Part of element |

- Link order (LoVe HAte): `a:link`, `a:visited`, `a:hover`, `a:active`.

### Specificity
- Order (low to high): element/pseudo-element < class/attribute/pseudo-class < ID < inline < `!important`.
- Scoring (inline, ID, class, element): inline = 1000, id = 100, class = 10, element = 1. Example: `#nav .item a` = 100+10+1 = 111; `div p` = 2; `.a.b` = 20.
- **Inheritance:** text properties (color, font, line-height) pass to children; box properties (margin, border, padding) do not.

### Colours, text and fonts
- Colours: names, hex `#ff0000`, `rgb(255,0,0)`, `rgba(...,0.5)`, `hsl()`.
- `color`, `background-color`, `background-image: url()`, `background-repeat`, `background-size`.
- `font-family`, `font-size` (px, em, rem, %), `font-weight` (bold/700), `font-style`, `text-align`, `text-decoration` (underline/none), `text-transform`, `line-height`, `letter-spacing`.
- Units: **absolute** px, pt, cm, mm, in; **relative** em (parent font size), rem (root font size), %, vw, vh.

### Box model
Every element is a rectangular box, from inside out:
```
+----------- margin (outside, transparent) -----------+
|  +------------- border -------------------------+   |
|  |  +--------- padding (inside, bg shows) ---+  |   |
|  |  |            CONTENT (width x height)    |  |   |
|  |  +----------------------------------------+  |   |
|  +----------------------------------------------+   |
+-----------------------------------------------------+
```
- Total width (default `content-box`) = width + left/right padding + left/right border + left/right margin.
- `box-sizing: border-box` makes `width` include padding and border.
- Shorthand: `margin: 10px 20px 30px 40px;` = top, right, bottom, left (clockwise); two values = vertical, horizontal; `margin: 0 auto;` centres a block.
- Worked example: width 200, padding 10, border 5, margin 20 -> box width = 200+20+10+40 = 270 px (content-box); visible box (excluding margin) = 230 px.
- Margins of adjacent vertical blocks **collapse** (larger one wins).

### Display, positioning and layout

| `position` | Behaviour |
|---|---|
| `static` | Default; normal flow, top/left ignored |
| `relative` | Offset from its own normal position; space kept |
| `absolute` | Removed from flow; positioned relative to nearest positioned ancestor |
| `fixed` | Relative to the viewport; stays on scroll |
| `sticky` | Relative until a scroll threshold, then fixed |

- `z-index` = stacking order (works on positioned elements). `float: left/right` + `clear: both`. `overflow: visible/hidden/scroll/auto`.
- `display`: block, inline, inline-block, none (removed, takes no space) vs `visibility: hidden` (invisible but occupies space).
- **Flexbox** (`display:flex`, one-dimensional: justify-content, align-items, flex-direction, flex-wrap) and **Grid** (`display:grid`, two-dimensional: grid-template-columns, gap).
- **CSS3** adds rounded corners (`border-radius`), shadows (`box-shadow`, `text-shadow`), gradients, transitions, animations (`@keyframes`), media queries, flexbox, grid, multi-column.

**⚡ Exam tip:** Priority: inline > ID > class > element; external is the one recommended for multi-page sites. In the box model margin is outside the border, padding is inside.

## Responsive Design

- **Responsive web design** (RWD) = pages adapt to any screen size (mobile, tablet, desktop). Three pillars: **fluid grids** (percent widths), **flexible images** (`max-width:100%`), **media queries**.
- Viewport meta tag (essential): `<meta name="viewport" content="width=device-width, initial-scale=1">`.
- Media query:
```css
@media (max-width: 600px) { .col { width: 100%; } }
```
- **Mobile-first** = write base styles for small screens, add `min-width` queries for larger. Common breakpoints: 576, 768, 992, 1200 px.
- Frameworks: **Bootstrap** (12-column grid, mobile-first, classes `container`, `row`, `col-md-6`), Foundation, Tailwind.
- Related: adaptive design (fixed layouts per device), `<picture>`/`srcset` for responsive images, `rem`/`vw` units.

**⚡ Exam tip:** Media queries are CSS3; the viewport meta tag lives in `<head>`; Bootstrap grid has 12 columns.

## JavaScript Basics

### Overview
- **JavaScript** = lightweight, interpreted, **client-side** scripting language, created by **Brendan Eich** (Netscape, 1995; first called Mocha, then LiveScript). Standardised as **ECMAScript** (ES6/ES2015 major update). Not related to Java. Case-sensitive, dynamically typed. Also runs on servers via **Node.js**.
- Add to HTML: inline event `onclick="..."`, `<script>...</script>` in head/body, external `<script src="app.js"></script>`. Output: `alert()`, `console.log()`, `document.write()`, `innerHTML`. Input: `prompt()`, `confirm()`.
- Comments: `//` single line, `/* */` multi-line. Statements end with `;` (optional).

### Variables and data types

| Keyword | Scope | Re-declare | Re-assign | Hoisting |
|---|---|---|---|---|
| `var` | Function (or global) | Yes | Yes | Hoisted, initialised `undefined` |
| `let` | Block `{}` | No | Yes | Hoisted but in **temporal dead zone** (ReferenceError before declaration) |
| `const` | Block | No | No (object contents can change) | Same as let; must be initialised |

- **Hoisting** = declarations moved to top of scope before execution. `console.log(a); var a = 5;` prints `undefined`; with `let` it throws ReferenceError. Function declarations are fully hoisted; function expressions are not. Only declarations are hoisted, not initialisations.
- Primitive types: Number, String, Boolean, Undefined, Null, BigInt, Symbol. Non-primitive: Object (Array, Function, Date). `typeof null` = "object" (famous quirk); `typeof undefined` = "undefined"; `typeof NaN` = "number".
- Arrays: `let a = [1,2,3]; a.length; a.push(4); a.pop();` indexing starts at 0. Objects: `{name:"Ravi", age:20}`; access `obj.name`.
- Functions: `function add(a,b){ return a+b; }`; arrow `(a,b) => a+b`.

### Operators

| Kind | Operators |
|---|---|
| Arithmetic | `+ - * / % **` `++ --` |
| Assignment | `= += -= *= /=` |
| Comparison | `== != === !== < > <= >=` |
| Logical | `&& || !` |
| Others | `typeof`, ternary `c ? a : b`, `??` |

- `==` compares value after type conversion (`5 == "5"` true); `===` strict (value and type; `5 === "5"` false).
- `+` with a string concatenates: `"5" + 2` = "52"; `"5" - 2` = 3; `1 + 2 + "3"` = "33"; `"1" + 2 + 3` = "123".
- `NaN` (Not a Number) is not equal to itself; use `isNaN()`. `10 % 3` = 1. `**` is exponent (2**3 = 8).
- Control: `if/else`, `switch`, `for`, `while`, `do-while`, `break`, `continue`.
- **Falsy values:** `false, 0, "", null, undefined, NaN`.

### DOM and events
- **DOM** (Document Object Model) = tree representation of an HTML document; each tag is a node; JavaScript can read/change content, structure and style. Root = `document`; then `html` -> `head`, `body` -> children. API-neutral and used for XML too (DOM parser vs SAX parser).
- Selecting: `document.getElementById("id")`, `getElementsByClassName`, `getElementsByTagName`, `querySelector("css")`, `querySelectorAll`.
- Changing: `el.innerHTML`, `el.textContent`, `el.style.color = "red"`, `el.setAttribute("src","a.png")`, `createElement`, `appendChild`, `removeChild`.
- **Events** = user/browser actions: `onclick`, `ondblclick`, `onmouseover`, `onmouseout`, `onkeydown`, `onkeyup`, `onchange`, `onsubmit`, `onfocus`, `onblur`, `onload`.
```html
<button onclick="document.getElementById('d').innerHTML='Hi'">Go</button>
<p id="d"></p>
```
- `addEventListener("click", fn)` attaches handlers; event **bubbling** goes child -> parent.
- **Form validation** is commonly done with JS before submission (client-side); server-side validation is still required for security.
- Browser objects (BOM): `window`, `navigator`, `screen`, `location`, `history`. Timers: `setTimeout`, `setInterval`. Popups: alert, confirm, prompt.
- JSON helpers: `JSON.parse(str)` text -> object; `JSON.stringify(obj)` object -> text.

**⚡ Exam tip:** `var` = function scope + hoisted (undefined); `let/const` = block scope; `===` checks type too; `getElementById` is the most-asked DOM method.

## Data Formats: XML vs JSON

### XML
- **XML** = eXtensible Markup Language (W3C, 1998); designed to **store and transport data**, self-descriptive, user-defined tags, case-sensitive; HTML displays data, XML describes it.
```xml
<?xml version="1.0" encoding="UTF-8"?>
<student id="1">
  <name>Ravi</name>
  <marks>90</marks>
</student>
```
- Rules for **well-formed** XML: one root element; every start tag has an end tag; tags properly nested; case-sensitive; attribute values quoted; special characters escaped (`&lt; &gt; &amp; &quot; &apos;`).
- **Valid** XML = well-formed + conforms to a **DTD** (Document Type Definition) or **XML Schema (XSD)**. DTD defines structure/legal elements; XSD is XML-based, supports data types and namespaces (more powerful).
- Processors/parsers: **DOM** (loads whole tree in memory, random access) and **SAX** (event-driven, sequential, low memory). **XSLT** transforms XML; **XPath** selects nodes; **CDATA** holds unparsed text; **namespaces** avoid name clashes.

### JSON
- **JSON** = JavaScript Object Notation; lightweight text data-interchange format; keys in double quotes; types: string, number, object `{}`, array `[]`, boolean, null.
```json
{ "name": "Ravi", "marks": [90, 85], "passed": true }
```

### Comparison

| XML | JSON |
|---|---|
| Markup language with tags | Key-value, JavaScript-like syntax |
| Verbose, larger | Compact, faster to parse |
| Supports comments, attributes, namespaces, schemas | No comments |
| Needs XML parser | `JSON.parse()` natively |
| Used by SOAP, RSS, SVG, config files | Used by REST APIs, AJAX, NoSQL (MongoDB) |
| Document-centric | Data-centric, supports arrays |

**⚡ Exam tip:** DTD = structure/legal elements of an XML document (asked directly); XML processors = DOM and SAX; JSON is lighter than XML and the usual format for REST.

## Web Services

- **Web service** = software service delivered over the network using standard protocols so different applications (any platform/language) can communicate; data in XML or JSON.
- Components of classic web services: **SOAP** (messaging), **WSDL** (description), **UDDI** (discovery/registry). Roles: service provider, service requester, service registry.

### SOAP vs REST

| SOAP | REST |
|---|---|
| **S**imple **O**bject **A**ccess **P**rotocol | **RE**presentational **S**tate **T**ransfer |
| A protocol with strict standards | An architectural style |
| XML only | XML, JSON, HTML, plain text |
| Envelope (Header + Body, optional Fault) | Uses HTTP verbs on resource URLs |
| Mostly POST; WSDL contract | GET/POST/PUT/DELETE; no WSDL needed |
| Heavier, built-in security (WS-Security), ACID, retries | Light, fast, cacheable, stateless |
| Works over HTTP, SMTP, TCP | HTTP only |

- **WSDL** (Web Services Description Language): XML document describing what a service does, its location, operations, parameters and message formats. **UDDI** (Universal Description, Discovery and Integration): directory/registry where services are published and found.
- **API** = interface for software-to-software interaction. REST principles: client-server, stateless, cacheable, uniform interface, layered system. A **RESTful API** exposes resources, e.g. `GET /students/5`, `DELETE /students/5`.
- **Microservices**, **webhooks**, **GraphQL** are modern alternatives (low priority).

**⚡ Exam tip:** SOAP = XML protocol + WSDL; REST = architecture, usually JSON over HTTP; UDDI = registry (find), WSDL = description (what/how), SOAP = message (talk).

## Server-Side Technologies and AJAX

### Client-side vs server-side

| Client-side | Server-side |
|---|---|
| Runs in browser | Runs on web server; output (HTML) sent to browser |
| HTML, CSS, JavaScript | PHP, ASP/ASP.NET, JSP, Servlets, Python (Django/Flask), Node.js, Ruby |
| User can see the code | Source code hidden from user |
| Used for UI, validation | Database access, authentication, business logic |

### Technologies
- **PHP** (Hypertext Preprocessor; Rasmus Lerdorf, 1994-95): open-source, server-side, embeds in HTML between `<?php ... ?>`, files `.php`, variables start with `$`, strong MySQL integration; runs on Apache. Superglobals `$_GET`, `$_POST`, `$_SESSION`, `$_COOKIE`.
- **ASP** (Active Server Pages): Microsoft; VBScript/JScript, `.asp`, runs on IIS; **ASP.NET** is the successor (C#/VB.NET, `.aspx`, compiled).
- **JSP** (JavaServer Pages): Java-based, HTML with embedded Java `<% ... %>`, `.jsp`; compiled into a **servlet** on first request; runs in a container such as Tomcat.
- **Servlet**: Java class running on server that handles HTTP requests (`doGet()`, `doPost()`); extends `HttpServlet`; lifecycle `init()` -> `service()` -> `destroy()`. Servlets are Java code with HTML inside; JSP is HTML with Java inside (easier for presentation).
- **CGI** (Common Gateway Interface): older, spawns a new process per request (slow) - servlets use threads (faster).
- **Node.js**: JavaScript runtime for servers (V8 engine, event-driven, non-blocking).

### AJAX
- **AJAX** = **A**synchronous **J**avaScript **a**nd **X**ML: technique to exchange data with the server **in the background** and update part of a page **without reloading** the whole page. Not a language or a new technology; uses JSON as well as XML in practice.
- Built from: HTML/CSS, DOM, **XMLHttpRequest** object (or `fetch()` API), JavaScript, XML/JSON.
- Steps: event occurs -> JS creates XMLHttpRequest -> request sent to server -> server processes -> response returned -> JS updates the DOM.
```javascript
var x = new XMLHttpRequest();
x.onreadystatechange = function(){
  if (x.readyState == 4 && x.status == 200) { document.getElementById("d").innerHTML = x.responseText; }
};
x.open("GET", "data.txt", true);   // true = asynchronous
x.send();
```
- `readyState`: 0 unsent, 1 opened, 2 headers received, 3 loading, **4 done**. Examples: Google Suggest, Gmail, live search, Google Maps.
- Benefits: faster, less bandwidth, better UX. Drawbacks: back button/bookmark problems, needs JS enabled, SEO issues.

**⚡ Exam tip:** AJAX = Asynchronous JavaScript and XML; it updates part of a page without reload using XMLHttpRequest. JSP gets translated into a servlet; PHP variables begin with `$`.

## Cookies, Sessions and CMS

### Cookies and sessions
- HTTP is stateless, so **cookies** and **sessions** maintain state.

| Cookie | Session |
|---|---|
| Small text file stored on the **client** browser | Data stored on the **server**, client holds only a session ID |
| Max ~4 KB, ~20-50 per domain | Larger capacity |
| Less secure (user can edit) | More secure |
| Persists until expiry date (persistent) or browser close (session cookie) | Ends on logout, timeout or browser close |
| Set by `Set-Cookie` header, sent back with `Cookie` header | Tracked via ID (cookie `PHPSESSID`/`JSESSIONID` or URL rewriting) |

- Uses: login state, shopping cart, preferences, personalisation, tracking/ads. **Third-party cookies** are set by other domains (tracking). Flags: `Secure`, `HttpOnly`, `SameSite`, `Expires`/`Max-Age`.
- Other storage: `localStorage` (persistent), `sessionStorage` (per tab), hidden form fields, URL rewriting.
- **Cache** stores copies of pages/files to load faster; **history** = visited pages.

### Content Management System (CMS)
- **CMS** = software to create, manage and modify website content without needing programming knowledge; separates content from design (themes/templates, plugins).
- Examples: **WordPress** (PHP + MySQL, most popular), **Joomla**, **Drupal**, Wix and Shopify (hosted); Moodle (LMS).
- Features: WYSIWYG editor, user roles, templates/themes, plugins, SEO tools, versioning, media library.
- **WYSIWYG** = What You See Is What You Get editors (Dreamweaver, Wix editor).

### Web security and misc
- **SSL/TLS** encrypts traffic; certificate issued by a **Certificate Authority**. **Firewall**, **SQL injection**, **XSS** (cross-site scripting - injecting script into pages), **CSRF**, **DoS/DDoS**, **phishing**.
- **SEO** = Search Engine Optimization (improve ranking: keywords, meta tags, backlinks, fast loading, mobile-friendly). **Web crawler** = bot that follows links to index pages. **robots.txt** controls crawlers.
- **Web 2.0** tools: blogs, wikis, social networking, RSS feeds (XML). **E-commerce** (B2B, B2C, C2C) and **plug-ins/extensions** extend browsers.
- **Static website** = fixed HTML pages; **dynamic website** = content generated per request from a database.

**⚡ Exam tip:** Cookie = client side, ~4 KB; session = server side. WordPress = CMS built in PHP/MySQL. Search engine order: crawl -> index -> rank.

## jQuery

- **jQuery** = fast, small, cross-browser **JavaScript library** (John Resig, 2006) -- "write less, do more". It simplifies DOM selection/manipulation, event handling, animation and AJAX. It is a library, not a new language; all jQuery is JavaScript. Loaded from a local file or a CDN with `<script src="jquery.min.js"></script>`.
- Syntax: **`$(selector).action()`**. `$` is an alias of the `jQuery` function; the selector uses CSS syntax.
- Run code only after the DOM is ready: `$(document).ready(function(){ ... });` or the short form `$(function(){ ... });`.

```javascript
$(document).ready(function(){
  $("p").hide();                 // element selector
  $("#box").css("color","red");  // id selector
  $(".note").addClass("big");    // class selector
  $("button").click(function(){ $("#msg").text("Hi").fadeIn(); });
});
```

| Category | Common methods |
|---|---|
| Selectors | `$("p")`, `$("#id")`, `$(".cls")`, `$("ul li:first")`, `$("[href]")` |
| Content | `.text()` (plain text), `.html()` (markup), `.val()` (form value), `.attr()` |
| Style/DOM | `.css()`, `.addClass()`, `.removeClass()`, `.append()`, `.prepend()`, `.before()`, `.after()`, `.remove()`, `.empty()` |
| Events | `.click()`, `.dblclick()`, `.hover()`, `.on("event", fn)`, `.off()`, `.submit()`, `.keyup()` |
| Effects | `.hide()`, `.show()`, `.toggle()`, `.fadeIn()`, `.fadeOut()`, `.slideUp()`, `.slideDown()`, `.animate()` |
| AJAX | `$.ajax()`, `$.get()`, `$.post()`, `.load()`, `$.getJSON()` |

- **Method chaining:** each method returns the jQuery object, so `$("#a").css("color","red").slideUp(2000).slideDown(2000);` works.
- Getters return the value of the first matched element; setters apply to all matched elements.
- `.text()` treats content as plain text; `.html()` parses markup. `.append()` inserts at the **end inside** the element; `.after()` inserts **outside, after** it.

**⚡ Exam tip:** jQuery syntax = `$(selector).action()`; `$(document).ready()` waits for the DOM; jQuery is a JavaScript library (not a separate language); `.text()` vs `.html()` vs `.val()` is a frequent distinction.

## Node.js and npm

- **Node.js** = open-source, cross-platform **JavaScript runtime** built on Chrome's **V8 engine** (Ryan Dahl, 2009). Lets JavaScript run on the **server** (outside the browser). Not a language and not a framework.
- **Event-driven, non-blocking (asynchronous) I/O** with a **single-threaded event loop**: good for I/O-heavy apps (APIs, chat, streaming); weak for CPU-heavy tasks.
- **npm** (Node Package Manager) installs libraries: `npm install express`; project metadata and dependencies live in **package.json**; installed code in `node_modules`. Run a script with `node app.js`.
- Core modules: `http` (create server), `fs` (file system), `path`, `os`, `events`, `url`. Load a module with `require()` (CommonJS) or `import` (ES modules).
- **Express.js** = minimal web framework on top of Node.js (routing, middleware). MEAN/MERN stack = MongoDB + Express + Angular/React + Node.

```javascript
const http = require("http");
http.createServer(function(req, res){
  res.writeHead(200, {"Content-Type": "text/html"});
  res.end("Hello World");
}).listen(8080);          // browse http://localhost:8080
```

| Node.js | PHP (traditional) |
|---|---|
| JavaScript on server; one language on client and server | Server-side scripting embedded in HTML |
| Non-blocking, event loop | Blocking, one process/thread per request (Apache) |
| Runs its own HTTP server | Usually runs under Apache/Nginx |

**⚡ Exam tip:** Node.js = JavaScript runtime on V8, event-driven non-blocking, single-threaded; npm = package manager; `package.json` lists dependencies; `http.createServer()` builds a server.

## Git and Version Control

- **Version control system (VCS)** records changes to files over time so you can recall versions, compare, branch and collaborate. **Git** (Linus Torvalds, 2005) is a **distributed** VCS: every clone holds the complete history. **GitHub / GitLab / Bitbucket** are hosting services for Git repositories (Git is the tool, GitHub is a service).
- Areas: **working directory** -> (`git add`) -> **staging area (index)** -> (`git commit`) -> **local repository** -> (`git push`) -> **remote repository**.

| Command | Purpose |
|---|---|
| `git init` | create a new repository |
| `git clone <url>` | copy a remote repository (with history) |
| `git status` | show changed/staged files |
| `git add <file>` / `git add .` | stage changes |
| `git commit -m "msg"` | save staged snapshot to local repo |
| `git log` | view commit history |
| `git branch` / `git checkout -b <b>` (or `git switch -c <b>`) | list / create-and-switch branch |
| `git merge <b>` | merge a branch into the current one |
| `git pull` | fetch + merge from remote |
| `git push` | upload local commits to remote |
| `git fetch` | download remote changes without merging |
| `git diff` | show unstaged differences |
| `git revert` / `git reset` | undo a commit safely / move HEAD back |

- **Branch** = independent line of development (default `main`/`master`); **HEAD** = pointer to current commit/branch; **merge conflict** = same lines changed in two branches, must be resolved manually then committed; **pull request** = request to merge a branch (GitHub workflow); **fork** = personal copy of someone's repository; `.gitignore` lists files Git should not track.
- Commits are identified by a 40-hex-digit **SHA-1 hash**. Centralised VCS (SVN, CVS) keep history only on the server; Git is distributed.

**⚡ Exam tip:** add -> commit -> push is the flow; `git clone` copies a repo, `git init` makes a new one; `git pull` = fetch + merge; Git is distributed and different from GitHub.

## PHP with MySQL and Sessions

### PHP essentials
- Code between `<?php ... ?>`; statements end with `;`; variables start with `$` and are loosely typed; `echo`/`print` output; `.` concatenates strings (`"5" . "3"` = "53"); arrays: `$a = array(1,2)` or `[1,2]`, `count($a)`; `include` (warning on failure, script continues) vs `require` (fatal error, script stops); `_once` variants include a file only once.
- Superglobals: `$_GET` (query string, visible in URL), `$_POST` (form body), `$_REQUEST`, `$_SESSION`, `$_COOKIE`, `$_SERVER`, `$_FILES`.
- Form handling: `<form action="process.php" method="post">`; read with `$_POST["name"]`. Always validate/escape input (`htmlspecialchars()`) to stop XSS.

### MySQL integration
- **MySQL** = open-source relational DBMS (SQL); with **Apache + PHP** it forms the **LAMP/XAMPP/WAMP** stack (Linux/Windows + Apache + MySQL + PHP). **phpMyAdmin** = web GUI to manage MySQL.
- PHP connects through **MySQLi** (`mysqli_*`, MySQL only) or **PDO** (PHP Data Objects, works with many databases). The old `mysql_*` functions were removed in PHP 7.
- Steps: connect -> select database -> run query -> process result -> close.

```php
<?php
$conn = mysqli_connect("localhost", "root", "", "school");  // host, user, password, database
if (!$conn) { die("Connection failed: " . mysqli_connect_error()); }
$res = mysqli_query($conn, "SELECT id, name FROM student");
while ($row = mysqli_fetch_assoc($res)) {      // one row as associative array
    echo $row["id"] . " - " . $row["name"] . "<br>";
}
mysqli_close($conn);
?>
```

- Useful calls: `mysqli_num_rows()`, `mysqli_fetch_array()`, `mysqli_error()`, `mysqli_real_escape_string()`.
- **Prepared statements** (`$stmt = $conn->prepare("SELECT * FROM t WHERE id = ?"); $stmt->bind_param("i", $id);`) separate SQL from data and are the standard defence against **SQL injection** (input like `' OR '1'='1`).

### Sessions in PHP
- Call **`session_start()`** before any output (it sends a header, so it must precede HTML). PHP creates a unique session ID, sends it to the browser in the cookie **PHPSESSID**, and stores the data on the server in `$_SESSION`.
- Set: `$_SESSION["user"] = "ravi";` Read on any other page after `session_start()`. End: `session_unset()` (clear variables) then `session_destroy()` (delete session).
- Cookies: `setcookie("name", "value", time()+3600);` must also be called before output; read with `$_COOKIE`.
- Session fixation/hijacking defences: regenerate the ID after login (`session_regenerate_id()`), HTTPS, HttpOnly cookie.

### HTTP forms: GET vs POST

| GET | POST |
|---|---|
| Data appended to URL (`?a=1&b=2`) | Data in the request body |
| Visible, bookmarkable, limited length | Hidden from URL, no practical size limit, can upload files |
| Should be idempotent (search) | Used for passwords, changes, uploads |
| `$_GET` | `$_POST` |

- Upload forms need `enctype="multipart/form-data"` with `method="post"`; default encoding is `application/x-www-form-urlencoded`.

**⚡ Exam tip:** `mysqli_connect(host, user, pass, db)`; `session_start()` first, data in `$_SESSION`, ID in cookie `PHPSESSID`; prepared statements prevent SQL injection; `require` is fatal, `include` only warns.

## Web Application Structures: Client-Server, 2-Tier, 3-Tier, MVC

| Architecture | Layers / split | Notes |
|---|---|---|
| **Client-server** | Clients request, server provides | Basis of the web; HTTP request-response; stateless |
| **1-tier** | UI, logic and data on one machine | Standalone desktop app |
| **2-tier** | Client (UI + business logic) <-> database server | Fast, simple; "fat client", hard to scale/maintain; client talks directly to the DB (e.g. JDBC/ODBC desktop apps) |
| **3-tier** | Presentation (browser/UI) <-> Application/business logic (web/app server) <-> Data (DBMS) | Thin client, scalable, secure (DB hidden behind app server), easy maintenance; typical web app: browser - Apache/Tomcat/Node - MySQL |
| **n-tier** | 3-tier plus extra layers (cache, load balancer, API gateway, microservices) | Highest scalability |

- **Browser = presentation tier; web/application server running PHP/JSP/Node code = logic tier; database server = data tier.**
- Thin client (browser, little logic) vs fat client (much logic on the client).
- **Static** site = ready-made HTML files; **dynamic** site = pages generated by server-side code from a database.

### MVC (Model-View-Controller)
- Design pattern separating an application into three parts (Trygve Reenskaug, Smalltalk, 1979):
  - **Model** = data and business rules (database access, validation); independent of UI.
  - **View** = presentation/UI (HTML templates) that displays model data.
  - **Controller** = receives user input/request, calls the model, selects the view; the intermediary.
- Request flow in web MVC: browser request -> **Controller** -> **Model** (query data) -> data returned -> **Controller** picks **View** -> HTML response.
- Benefits: separation of concerns, parallel work (designers on views, developers on models), reuse, easy testing. Frameworks: Laravel, CodeIgniter (PHP), Spring MVC, ASP.NET MVC, Django (MTV), Ruby on Rails.
- MVC is a code-organisation pattern inside the application tier; 3-tier is a deployment/logical structure -- they are not the same.

**⚡ Exam tip:** The browser belongs to the presentation tier in 3-tier; the client never accesses the DB directly in 3-tier; Controller handles input, Model handles data, View handles display.

## Quick Revision Sheet

- Internet = network of networks; WWW = service on it, invented by Tim Berners-Lee (CERN, 1989-91).
- First web browser: WorldWideWeb (1990); first popular graphical browser: Mosaic; Netscape Navigator 1994; IE 1995.
- JavaScript: Brendan Eich, 1995, Netscape. CSS1: 1996. XML 1.0: 1998. HTML5: 2014.
- URL = scheme://host:port/path?query#fragment. Ports: HTTP 80, HTTPS 443, FTP 21, SMTP 25, POP3 110, IMAP 143, DNS 53.
- HTTP = stateless request-response protocol; HTTPS = HTTP + SSL/TLS (secure, port 443).
- Methods: GET retrieve, POST submit, PUT update/replace, DELETE remove, HEAD headers only.
- Status: 200 OK, 301 moved permanently, 304 not modified, 400 bad request, 401 unauthorized, 403 forbidden, 404 not found, 500 server error, 503 unavailable.
- DNS maps domain names to IP addresses; A = IPv4, AAAA = IPv6, MX = mail, CNAME = alias.
- Web server (Apache, Nginx, IIS) stores and serves pages; browser requests and renders; search engine = crawler + indexer + ranker.
- HTML5 doctype: `<!DOCTYPE html>`; `<br>` = line break; `<hr>` = rule; h1 largest, h6 smallest.
- Default `<ul>` marker = disc; `<ol>` default = 1; `<dl>` uses dt/dd.
- `<img>` needs `src` and `alt`; `<a>` uses `href`; `target="_blank"` opens a new tab.
- `<body>` attributes: bgcolor, background, text, link, vlink, alink; `<font>`: face, size, color.
- `colspan` merges columns, `rowspan` merges rows; `th` header cell, `td` data cell.
- Form: `action` and `method` (get/post); radio = single choice (same name), checkbox = multiple.
- Semantic tags: header, nav, main, section, article, aside, footer.
- CSS types: inline > internal > external in priority; selector priority: inline > ID > class > element.
- Box model: content -> padding -> border -> margin; `border-box` includes padding and border in width.
- Position values: static (default), relative, absolute, fixed, sticky.
- JS: `var` function scope + hoisted; `let/const` block scope; `===` strict equality; `"5"+2` = "52".
- DOM = tree of the document; `getElementById` most common; events: onclick, onload, onsubmit.
- XML: user-defined tags, well-formed (one root, closed tags, case-sensitive); DTD/XSD validate; DOM and SAX parse.
- JSON lighter than XML, used with REST/AJAX. SOAP = XML protocol (WSDL describes, UDDI registers); REST = architecture over HTTP.
- PHP (`$var`, `.php`), ASP (Microsoft, IIS), JSP/Servlets (Java, Tomcat; JSP compiles to servlet).
- AJAX = Asynchronous JavaScript and XML; XMLHttpRequest; updates page without reload; readyState 4 = done.
- Cookie = client-side (~4 KB); session = server-side with session ID.
- CMS examples: WordPress, Joomla, Drupal; SMTP sends, POP3/IMAP receive; Bcc hides recipients.
- Responsive design: viewport meta tag + media queries + fluid grids; Bootstrap has 12 columns.
- jQuery: $(selector).action(); $(document).ready(); it is a JavaScript library. Node.js: JavaScript runtime on V8, event-driven non-blocking; npm + package.json.
- Git: distributed VCS; init/clone, add -> commit -> push, pull = fetch + merge, branch/merge; GitHub is a hosting service.
- PHP + MySQL: mysqli_connect(host,user,pass,db), mysqli_query, mysqli_fetch_assoc; prepared statements stop SQL injection; session_start() first, data in $_SESSION, cookie PHPSESSID.
- GET = data in URL (visible); POST = in body. 2-tier = client + DB; 3-tier = presentation (browser) - logic (web/app server) - data (DB); MVC = Model (data), View (UI), Controller (input).
