# Web Technologies

> **What the exam asks:** about 3-6 questions per paper, mostly one-line recall: full forms (HTTP, HTML, CSS, AJAX, URL, DNS), first web browser, HTTP methods and status codes, valid/invalid HTML attributes (`<body>` and `<font>` attributes), default `<ul>` bullet type, `<br>` tag, web server definition, XML vs JSON, SOAP vs REST, DTD/XML Schema, CSS types and selectors, and JavaScript basics. Learn the tables below by heart.

## Internet, WWW and Web History

### Internet vs World Wide Web

| Internet | World Wide Web (WWW) |
|---|---|
| Global network of networks (hardware + protocols, TCP/IP) | A service running on the Internet: collection of linked web pages/documents |
| Born from ARPANET (1969) | Invented 1989-91 by **Tim Berners-Lee** at CERN |
| Carries e-mail, FTP, Telnet, VoIP, WWW | Uses HTTP, HTML, URL |
| Infrastructure | Information system accessed through browsers |

- The Web is **a part of** the Internet, not the same thing.
- **Hypertext** = text containing links to other text; **hypermedia** adds images/audio/video.
- **Web page** = single HTML document; **website** = collection of related pages; **home page** = first/landing page; **portal** = site aggregating services (news, mail, search).
- **Intranet** = private network of an organisation using web technology; **extranet** = intranet partly open to outsiders (partners, customers).

### History / milestones

| Year | Event |
|---|---|
| 1969 | ARPANET |
| 1989 | Tim Berners-Lee proposes the Web at CERN |
| 1990 | First web browser **WorldWideWeb** (later renamed *Nexus*) and first web server (httpd) |
| 1991 | Web made public; first website info.cern.ch |
| 1993 | **Mosaic** (NCSA, Marc Andreessen) - first popular graphical browser (images inline) |
| 1994 | **Netscape Navigator** (Andreessen); W3C founded by Berners-Lee |
| 1995 | Internet Explorer (Microsoft), JavaScript (Brendan Eich, at Netscape, 10 days), PHP |
| 1996 | CSS1 |
| 1998 | XML 1.0; Google founded |
| 2004 | Firefox 1.0 (2002 Phoenix); Web 2.0 term popular |
| 2008 | Google Chrome |
| 2014 | HTML5 W3C recommendation |

- **First web browser:** WorldWideWeb (Berners-Lee, 1990). **First popular/graphical browser:** Mosaic. In MCQs with options IE / Mosaic / Chrome / Firefox the expected answer is **Mosaic**.
- Web 1.0 = read-only static pages; Web 2.0 = interactive, user-generated content (blogs, social media); Web 3.0 = semantic web / decentralised.
- **W3C** (World Wide Web Consortium) sets web standards (HTML, CSS, XML).

**⚡ Exam tip:** "Father of the WWW" = Tim Berners-Lee. If both "WorldWideWeb" and "Mosaic" appear, pick WorldWideWeb as the first; if only Mosaic is present among IE/Chrome/Firefox/Opera, pick Mosaic.

## Client-Server, URL and HTTP

### Client-server model
- **Client** (browser) sends a request; **server** processes it and returns a response. Communication is over HTTP on top of TCP/IP.
- Web is **stateless**: server keeps no memory of previous requests (cookies/sessions add state).
- Tiers: 2-tier (client + server/DB), **3-tier** (presentation - application/logic - database), n-tier.
- **Web server** = software (and the machine) that stores web content and serves it to clients over HTTP. Examples: Apache HTTP Server, Nginx, Microsoft IIS, LiteSpeed, Apache Tomcat (servlets/JSP).
- **Web browser** = client software to request, retrieve and render web pages: Chrome, Firefox, Safari, Edge, Opera. Rendering engines: Blink (Chrome/Edge), Gecko (Firefox), WebKit (Safari).
- **Search engine** = program that crawls, indexes and ranks pages: Google, Bing, DuckDuckGo. Parts: **crawler/spider/bot**, **indexer**, **query processor/ranking** (PageRank for Google). **Meta search engine** queries several engines (Dogpile).
- **Proxy server** sits between client and server (caching, filtering); **firewall** filters traffic.

### URL anatomy
```
https://www.example.com:443/path/page.html?id=5&lang=en#section2
\___/   \_____________/ \_/ \____________/ \__________/ \______/
scheme       host      port     path          query     fragment
```
- **URL** (Uniform Resource Locator) = address of a resource; URI is the broader term (URL + URN).
- Default ports: HTTP 80, HTTPS 443, FTP 21, SSH 22, SMTP 25, DNS 53, POP3 110, IMAP 143, Telnet 23.
- **Absolute URL** has full address; **relative URL** is relative to the current page (`images/a.png`, `../index.html`).
- Domain parts: `www` (subdomain) . `example` (second-level) . `com` (TLD). TLD examples: .com .org .edu .gov .net .in .mil.

### HTTP
- **HTTP** = HyperText Transfer Protocol; application-layer, request-response, text-based, stateless, default port 80. **HTTPS** = HTTP + SSL/TLS encryption, port 443; shows padlock; needs an SSL certificate. HTTPS "creates a secure, private connection to a web server".
- HTTP/1.1 (1997), HTTP/2 (2015, multiplexing), HTTP/3 (over QUIC/UDP).
- Request = request line (method, URL, version) + headers + blank line + optional body. Response = status line + headers + body.

### HTTP methods

| Method | Purpose |
|---|---|
| **GET** | Retrieve data (parameters in URL, cached, bookmarkable, size-limited, idempotent, safe) |
| **POST** | Send data to server in body / create resource (not cached, not bookmarked, no size limit practically) |
| **PUT** | Replace/update a resource (idempotent) |
| **PATCH** | Partial update |
| **DELETE** | Remove a resource |
| **HEAD** | Like GET but headers only, no body |
| **OPTIONS** | Ask which methods are supported |
| **TRACE / CONNECT** | Loop-back diagnostic / tunnel (proxy, SSL) |

- "Which HTTP method is used for retrieving data?" = **GET**. Sending form data securely (not shown in URL) = **POST**.

### HTTP status codes

| Class | Meaning | Common codes |
|---|---|---|
| 1xx | Informational | 100 Continue |
| 2xx | Success | **200 OK**, 201 Created, 204 No Content |
| 3xx | Redirection | 301 Moved Permanently, 302 Found (temporary), 304 Not Modified |
| 4xx | Client error | 400 Bad Request, 401 Unauthorized, 403 Forbidden, **404 Not Found**, 405 Method Not Allowed |
| 5xx | Server error | **500 Internal Server Error**, 502 Bad Gateway, 503 Service Unavailable, 504 Gateway Timeout |

**⚡ Exam tip:** 401 = not authenticated, 403 = authenticated but not allowed. GET shows data in the URL; POST does not. S-HTTP is an older, different protocol from HTTPS.

## DNS, Hosting, E-mail

### Domain name system
- **DNS** converts human-readable domain names to IP addresses (phone-book of the Internet). Port 53, UDP mostly (TCP for zone transfers).
- Resolution: browser cache -> OS -> **resolver (ISP)** -> **root server** -> **TLD server** (.com) -> **authoritative name server** -> IP returned and cached.
- Record types: **A** (name -> IPv4), **AAAA** (IPv6), **CNAME** (alias), **MX** (mail server), **NS** (name server), **TXT**, **PTR** (reverse lookup).
- **IPv4** = 32-bit (e.g. 192.168.1.1); **IPv6** = 128-bit (hex, colon-separated).
- **Domain registrar** (GoDaddy etc.) sells domain names; registry run by ICANN-accredited bodies; **ICANN** manages domain names/IP allocation; **.in** managed by NIXI.

### Web hosting

| Type | Notes |
|---|---|
| Shared | Many sites on one server; cheapest, limited performance |
| VPS | Virtual private server; dedicated slice of resources |
| Dedicated | Whole physical server for one site; costly, full control |
| Cloud | Resources from a cluster of servers; scalable, pay-as-you-use |
| Colocation | Your own server placed in provider's data centre |
| Free hosting | Ads, limited features |

- **Web hosting** = service of storing website files on a server connected to the Internet. Needed: domain name + hosting space + upload via **FTP/SFTP**.
- **Bandwidth** = data transfer allowed; **uptime** = % time site is available (99.9% typical).

### E-mail basics
- E-mail address = `username@domain`. Parts of a message: header (To, Cc, Bcc, Subject, From), body, attachment.
- **Cc** = carbon copy (visible to all); **Bcc** = blind carbon copy (hidden recipients).
- Protocols: **SMTP** (send, port 25/587), **POP3** (download to device, usually deletes from server, port 110), **IMAP** (sync, keeps mail on server, port 143). **MIME** allows attachments/non-text content.
- Webmail: Gmail, Outlook. Clients: Thunderbird, Outlook. Spam = unsolicited bulk mail; phishing = fake mail to steal data.

**⚡ Exam tip:** SMTP = sending, POP3/IMAP = receiving. DNS maps name to IP; DHCP assigns IPs; ARP maps IP to MAC.

## HTML5 Fundamentals

### Basics
- **HTML** = HyperText Markup Language; the standard markup language for web pages; not a programming language; **case-insensitive**. Created by Tim Berners-Lee (1991). Current: **HTML5** (W3C recommendation 2014). `<!DOCTYPE html>` is the HTML5 doctype (short form).
- **Tag** = markup in angle brackets; **element** = start tag + content + end tag; **attribute** = extra information inside start tag as `name="value"`. **Empty (void) elements** have no end tag: `<br>`, `<hr>`, `<img>`, `<input>`, `<meta>`, `<link>`.
- File extension `.html` or `.htm`. Comment: `<!-- comment -->`.

### Document structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Page title</title>
  <link rel="stylesheet" href="style.css">
  <script src="app.js"></script>
</head>
<body>
  visible content
</body>
</html>
```
- `<head>`: title, meta, link, style, script, base (not displayed). `<title>` shows in tab/title bar and is used by search engines/bookmarks.
- `<body>`: all visible content.

### Common tags

| Tag | Use |
|---|---|
| `<h1>`..`<h6>` | Headings (h1 largest) |
| `<p>` | Paragraph |
| `<br>` | **Line break** (empty tag) |
| `<hr>` | Horizontal rule |
| `<b>` / `<strong>` | Bold / important |
| `<i>` / `<em>` | Italic / emphasis |
| `<u>`, `<mark>`, `<small>`, `<del>`, `<ins>` | Underline, highlight, small, deleted, inserted |
| `<sub>`, `<sup>` | Subscript , superscript |
| `<pre>` | Preformatted text (keeps spaces/line breaks) |
| `<div>` / `<span>` | Block container / inline container |
| `<a>` | Anchor (link) |
| `<img>` | Image |
| `<blockquote>`, `<q>`, `<code>`, `<abbr>` | Quote, short quote, code, abbreviation |
| `<marquee>`, `<center>`, `<font>`, `<big>`, `<tt>` | **Deprecated/obsolete in HTML5** |

- **Block elements** start on a new line and take full width (`div, p, h1, ul, table, form`); **inline** elements flow within a line (`span, a, b, img`).
- Global attributes: `id` (unique), `class`, `style`, `title` (tooltip), `lang`, `hidden`, `data-*`, `contenteditable`, `draggable`.

### Links and images
- Link: `<a href="url" target="_blank" title="tip">text</a>`. `target`: `_self` (default, same window), `_blank` (new tab), `_parent`, `_top`. `href="#id"` jumps to element with that id; `mailto:x@y.com` opens mail client; `tel:` for phone; `download` attribute downloads file.
- Image: `<img src="pic.jpg" alt="description" width="200" height="100">`. **src** and **alt** are the required attributes; `alt` shows if the image fails and helps accessibility/SEO. Formats: JPEG, PNG, GIF, SVG, WebP.
- Image as link: `<a href="x.html"><img src="b.png"></a>`. Image map: `<map>` + `<area>` with `usemap`.
- HTML5 media: `<audio controls>`, `<video controls width="320">`, `<source>`, `<track>`; `<canvas>` (drawing via JS), `<svg>`.

### Background and body attributes (mostly obsolete in HTML5, but tested)
- `<body>`: **bgcolor**, **background** (image), **text** (text colour), **link**, **vlink** (visited), **alink** (active), leftmargin, topmargin.
- `<font>`: **face**, **size** (1-7, default 3), **color**.
- **Invalid for `<body>`**: `face`, `size`, `type`, `src`. **Invalid for `<font>`**: `bgcolor`, `background`, `type`.
- Hex colours: `#RRGGBB`; `#FF0000` red, `#00FF00` lime, `#0000FF` blue, `#000000` black, `#FFFFFF` white.

### Lists

| Type | Tag | Items |
|---|---|---|
| Unordered | `<ul>` | `<li>`; default marker **disc** (filled circle); `type` = disc, circle, square. Nested `<ul>` default: circle, then square |
| Ordered | `<ol>` | `<li>`; default numbers `1`; `type` = 1, A, a, I, i; `start="5"`; `reversed` |
| Description | `<dl>` | `<dt>` term, `<dd>` description |

- `<ol type="a">` gives a, b, c; `type="I"` gives I, II, III.
- CSS replaces `type`: `list-style-type: square;`

### Tables
```html
<table border="1">
  <caption>Marks</caption>
  <thead><tr><th>Name</th><th>Marks</th></tr></thead>
  <tbody><tr><td>Ravi</td><td>90</td></tr></tbody>
  <tfoot><tr><td colspan="2">End</td></tr></tfoot>
</table>
```
- `<tr>` row, `<th>` header cell (bold, centred), `<td>` data cell. **colspan** merges columns; **rowspan** merges rows. Other attributes: `border`, `cellpadding` (space inside cell), `cellspacing` (between cells), `width`, `align`, `bgcolor` (obsolete; use CSS).

### Forms
```html
<form action="/submit" method="post">
  <label for="n">Name</label>
  <input type="text" id="n" name="name" placeholder="Your name" required>
  <input type="password" name="pw">
  <input type="radio" name="g" value="M"> <input type="checkbox" name="c">
  <select name="city"><option value="p">Patna</option></select>
  <textarea rows="3" cols="20"></textarea>
  <input type="submit" value="Send"> <input type="reset">
</form>
```
- `<form>` attributes: **action** (URL to handle data), **method** (get/post), enctype (`multipart/form-data` for file upload), target.
- Input types: text, password, email, number, tel, url, date, time, color, range, file, hidden, radio, checkbox, submit, reset, button, search.
- Input attributes: name, value, placeholder, required, readonly, disabled, maxlength, min, max, pattern, autofocus, autocomplete.
- **Radio** buttons with the same `name` allow only one choice; checkbox allows many. `<fieldset>` + `<legend>` group fields; `<datalist>` gives suggestions; `<button>` element.

### Semantic tags (HTML5)
`<header>`, `<nav>` (navigation links), `<main>`, `<section>`, `<article>` (self-contained), `<aside>` (sidebar), `<footer>`, `<figure>` + `<figcaption>`, `<details>` + `<summary>`, `<time>`, `<mark>`. They describe meaning to browsers, search engines and screen readers (better SEO/accessibility) unlike `<div>`/`<span>`.

### HTML5 new features
New semantic elements, audio/video without plugins, canvas/SVG, new input types, **localStorage/sessionStorage** (about 5-10 MB per origin vs 4 KB cookie), geolocation API, web workers, drag-and-drop, offline cache. Removed: `<font>`, `<center>`, `<frame>`, `<acronym>`.

### Other
- **DHTML** = HTML + CSS + JavaScript + DOM (dynamic pages); **XHTML** = HTML rewritten as strict XML (case-sensitive lowercase tags, all tags closed, attributes quoted).
- **Whitespace** collapses in HTML; use `&nbsp;` (non-breaking space), `&lt;` `&gt;` `&amp;` `&copy;`.
- Frames/iframe: `<iframe src="">` embeds another page.

**⚡ Exam tip:** For "not a valid attribute" questions: `face/size/color` belong to `<font>`; `bgcolor/background/text/link` belong to `<body>`. Default `<ul>` marker = disc; `<br>` = line break; `src` and `alt` are the key `<img>` attributes.
