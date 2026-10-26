
## 6. Machine Learning

### Definition and types
- **Machine learning (ML):** systems that improve performance on a task with experience (data) without being explicitly programmed (Arthur Samuel; Tom Mitchell: improves at task T, measure P, with experience E).

| Type | Data | Goal | Examples |
|---|---|---|---|
| **Supervised** | labelled (x, y) | learn mapping x→y | regression, classification: k-NN, decision tree, SVM, naive Bayes, linear/logistic regression |
| **Unsupervised** | unlabelled | find structure | clustering (k-means, hierarchical), PCA, association rules |
| **Semi-supervised** | few labels + many unlabelled | | |
| **Reinforcement** | agent, environment, reward | maximise cumulative reward | Q-learning, game playing, robotics |

- **Regression** predicts a continuous value (house price); **classification** predicts a discrete class (spam/not spam). Linear regression: y = mx + c (least squares). **Logistic regression** is a classification algorithm (sigmoid).

### Key algorithms
- **k-NN:** lazy learner; classify by majority vote of the k closest training points (Euclidean distance √Σ(xi−yi)²); no training phase; sensitive to scale and k.
- **Decision tree:** internal node = attribute test, branch = outcome, leaf = class. Splits chosen by **information gain (entropy)** (ID3) or **Gini index** (CART). Entropy H = −Σ p·log₂p; pure node H = 0; 50/50 two-class H = 1. Random forest = ensemble of trees.
- **k-means:** unsupervised partitional clustering. Steps: pick k centroids → assign each point to nearest centroid → recompute centroids as means → repeat until stable. k must be given in advance.
- **SVM:** finds the hyperplane with **maximum margin** between classes; support vectors = points nearest the boundary; **kernel trick** handles non-linear data.
- **Naive Bayes:** Bayes theorem P(A|B) = P(B|A)·P(A)/P(B), assumes feature independence.

### Training concepts
- Dataset split: **training / validation / test**. **Features** = inputs, **label** = output.
- **Overfitting:** model learns noise, high training accuracy but poor test accuracy (high variance). **Underfitting:** too simple, poor on both (high bias). Remedies for overfitting: more data, simpler model, regularisation, pruning, cross-validation, dropout, early stopping.
- **Bias-variance trade-off.** **k-fold cross-validation** for evaluation.

### Confusion matrix and metrics
```
                 Predicted +    Predicted −
Actual +            TP             FN
Actual −            FP             TN

Accuracy  = (TP + TN) / (TP + TN + FP + FN)
Precision = TP / (TP + FP)
Recall (sensitivity, TPR) = TP / (TP + FN)
Specificity = TN / (TN + FP)
F1 = 2·P·R / (P + R)        (harmonic mean)
```
**Worked:** TP=40, FP=10, FN=20, TN=30 → Accuracy = 70/100 = 0.70; Precision = 40/50 = 0.80; Recall = 40/60 = 0.667; F1 = 2(0.8)(0.667)/(1.467) = 0.727.

**⚡ Exam tip:** Supervised = labelled, unsupervised = unlabelled (k-means), reinforcement = reward. Precision uses FP in denominator; recall uses FN. Overfitting = good on train, bad on test.

## 7. NLP, Robotics, AI Languages, Data Mining

### Natural Language Processing (NLP)
- Interaction between computers and human language. Levels: **lexical/morphological → syntactic (parsing) → semantic → discourse → pragmatic**.
- Tasks: tokenisation, stemming/lemmatisation, POS tagging, parsing, named entity recognition, sentiment analysis, machine translation, speech recognition, chatbots, summarisation. Ambiguity (lexical, syntactic, semantic) is the central difficulty.
- NLU = understanding; NLG = generating text.

### Robotics
- Robot = programmable machine that senses, plans, acts. **Isaac Asimov** coined "robotics" and gave the **Three Laws of Robotics**. Term "robot" from Karel Čapek's play R.U.R. (1920).
- Components: sensors, actuators/effectors, controller, manipulator/arm, end-effector, power supply. **Degrees of freedom (DOF)** = independent motions.
- Uses: industrial (welding, assembly), medical, space, military, domestic.

### AI programming languages

| Language | Facts |
|---|---|
| **LISP** | (LISt Processing) McCarthy 1958; functional; lists as data & code; second-oldest high-level language after FORTRAN; symbolic AI |
| **Prolog** | (PROgramming in LOGic) Colmerauer 1972; declarative logic programming; facts, rules, queries; built-in **backtracking** and **unification**; used for expert systems, NLP |
| Python | Most used for modern ML (NumPy, scikit-learn, TensorFlow, PyTorch) |
- Prolog: fact `parent(tom, bob).` rule `grandparent(X,Z) :- parent(X,Y), parent(Y,Z).` query `?- grandparent(tom, W).` Variables start with an uppercase letter, constants/predicates lowercase; `:-` means "if"; every clause ends with a full stop.

### Data mining basics
- **Data mining:** discovering useful patterns from large data (a step of **KDD**: selection → preprocessing/cleaning → transformation → mining → interpretation).
- Techniques: **classification, clustering, association rule mining** (market-basket; **Apriori**; support & confidence), regression, anomaly detection, summarisation.
- Support(A→B) = P(A∪B); Confidence = support(A∪B)/support(A).
- **Data warehouse** = subject-oriented, integrated, time-variant, non-volatile (Inmon); **OLAP** for analysis, OLTP for transactions.

**⚡ Exam tip:** Prolog = logic/declarative, backtracking; LISP = list processing, McCarthy; Asimov = Laws of Robotics; association rules = market basket (Apriori).

## 8. Digital Image Processing

### Basics
- **Analog image:** continuous in space and brightness (photograph, film, TV signal). **Digital image:** 2-D array f(x,y) of discrete values; each element = **pixel (picture element)**; needs a **scanner / digital camera / ADC** to convert an analog image (a photograph) to digital.
- Digitisation = **sampling** (discretise coordinates x,y → spatial resolution) + **quantisation** (discretise intensity amplitude → gray levels). More samples → higher resolution; more bits → more gray levels.
- Gray levels L = 2^k for k bits per pixel. 1 bit = binary (black/white); 8 bit = 256 gray levels (0 black … 255 white); 24-bit colour = RGB, 8 bits each → 16.7 million colours.
- **Resolution** = pixels per unit/total pixel count (spatial); dpi/ppi. **Aliasing:** due to under-sampling (below Nyquist rate = 2 × max frequency); reduced by **pre-filtering (blurring: removing high-frequency components) before sampling**.
- Types: binary, grayscale, colour (RGB, CMYK, HSV), indexed.

### Image size arithmetic
```
Size (bits) = rows × columns × bits per pixel   (M × N × k)
Bytes = bits / 8 ;  1 KB = 1024 B
```
**Worked:** 1024 × 768 image, 8 bpp → 786,432 bytes = 768 KB. Same at 24 bpp → 2,359,296 B = 2.25 MB. 4 × 4 image with 8 gray levels needs 3 bits/pixel → 48 bits. A 2-megapixel camera ≈ 1600 × 1200.

### Fundamental steps of DIP
1. **Image acquisition** (the **first and foremost** step - capture & digitise; includes preprocessing/scaling)
2. Image enhancement 3. Image restoration 4. Colour image processing 5. Wavelets/multiresolution 6. **Compression** 7. Morphological processing 8. Segmentation 9. Representation & description 10. Object recognition.
- **Enhancement** = subjective improvement (contrast); **restoration** = objective, removes known degradation (noise/blur) using a model. After compression comes morphological processing, then segmentation.
- Related: **morphing** = smooth transformation of one image into another over a sequence of frames.

### Histogram
- Plot of number of pixels vs gray level. Dark image: bars on left; bright: right; low contrast: narrow; high contrast: wide spread.
- **Histogram equalisation:** spreads gray levels to a uniform histogram, improves contrast. s = T(r) = (L−1) Σ pr(rj).

### Point (gray-level) transformations, s = T(r)

| Transform | Formula | Effect |
|---|---|---|
| **Negative** | s = (L−1) − r (= 255 − r) | photographic negative; shows white detail in dark regions |
| **Log** | s = c·log(1 + r) | expands dark, compresses bright (Fourier spectrum display) |
| **Power-law (gamma)** | s = c·r^γ | γ < 1 brightens (like log), γ > 1 darkens; gamma correction for monitors |
| **Contrast stretching** | linear piecewise map of [rmin, rmax] to [0, L−1] | increases dynamic range |
| Thresholding | s = 255 if r > T else 0 | binary image |
- Example: negative of pixel 100 (8 bit) = 155.

### Spatial filtering (neighbourhood operations)
- Mask/kernel convolved over the image. **Smoothing (low-pass):** mean (box) filter 1/9 × [1s], Gaussian - blurs, removes noise; **median filter** (non-linear) best for **salt-and-pepper noise**, preserves edges. **Sharpening (high-pass):** Laplacian, unsharp masking, high-boost.
- Mean 3×3 averaging mask = 1/9 [[1,1,1],[1,1,1],[1,1,1]].

### Edge detection and segmentation
- Edge = sharp intensity discontinuity; found with first-derivative (gradient) or second-derivative (Laplacian) operators.
- **Sobel**: Gx = [[−1,0,1],[−2,0,2],[−1,0,1]], Gy = its transpose. **Prewitt**: same with 1s. **Roberts** 2×2 cross. **Canny**: smoothing → gradient → non-max suppression → hysteresis threshold (most robust).
- Gradient magnitude = √(Gx² + Gy²) ≈ |Gx| + |Gy|. Laplacian is isotropic, noise-sensitive.
- **Segmentation:** thresholding, region growing, split-and-merge, edge-based, clustering.

### Morphological operations (binary images, structuring element)
- **Erosion** shrinks objects (removes small noise); **dilation** expands objects (fills gaps). **Opening** = erosion then dilation (removes small objects, smooths contours); **Closing** = dilation then erosion (fills small holes). Boundary = A − (A ⊖ B).

### Image compression
- Redundancy types: coding, interpixel (spatial), psychovisual. Compression ratio = original size / compressed size.

| Format | Type | Features |
|---|---|---|
| **JPEG** | **Lossy** (DCT based) | photos, 24-bit, 16.7M colours, no transparency; 8×8 blocks → DCT → quantise → Huffman |
| **PNG** | **Lossless** (DEFLATE) | transparency (alpha), 24-bit, web graphics; replaced GIF |
| **GIF** | Lossless (LZW) | max **256 colours** (8-bit palette), animation, 1-bit transparency |
| BMP | uncompressed | large files |
| TIFF | lossless/flexible | printing, scanning |
- Lossless techniques: Huffman, run-length (RLE), LZW, arithmetic coding. Lossy: DCT, wavelet (JPEG 2000), quantisation.

**⚡ Exam tip:** First step of DIP = image acquisition. Photograph = analog; scanner/camera makes it digital. Pixels are the elements of a digital image. Sampling = coordinates, quantisation = amplitude. Median filter for salt-and-pepper noise.

## 9. Computer Graphics

### Raster vs vector

| | Raster (bitmap) | Vector |
|---|---|---|
| Made of | pixels | mathematical objects (lines, curves, polygons) |
| Scaling | loses quality (pixelation) | scales without loss |
| File size | large for high-res | small for simple drawings |
| Formats | BMP, JPEG, PNG, GIF | SVG, EPS, AI, CDR, WMF |
| Best for | photographs | logos, CAD, fonts |
- **Raster scan display:** electron beam sweeps rows, frame buffer holds pixel values. **Random-scan (vector) display:** draws lines directly, display list. Frame buffer size = resolution × bits per pixel (1024×768×8 bit = 768 KB).
- **Aliasing** (jagged "staircase" edges) reduced by **anti-aliasing**. Resolution = number of pixels; aspect ratio = width : height.

### Line drawing
**DDA (Digital Differential Analyzer):** incremental, uses floating point and rounding.
```
dx = x2 − x1, dy = y2 − y1
steps = max(|dx|, |dy|)
xinc = dx/steps, yinc = dy/steps
repeat steps times: x += xinc; y += yinc; plot(round(x), round(y))
```
Worked: (2,2) → (6,5): dx=4, dy=3, steps=4, xinc=1, yinc=0.75 → (2,2), (3,2.75→3), (4,3.5→4), (5,4.25→4), (6,5).

**Bresenham's line algorithm** (|slope| < 1): integer-only, no rounding, faster and more accurate than DDA.
```
dx = x2−x1, dy = y2−y1
p0 = 2dy − dx
if p < 0: next point (x+1, y);   p = p + 2dy
else    : next point (x+1, y+1); p = p + 2dy − 2dx
```
Worked: (2,3) → (8,6): dx=6, dy=3, p0 = 6−6 = 0, 2dy = 6, 2dy−2dx = −6.
p=0 (≥0) → (3,4), p=−6; p<0 → (4,4), p=0; → (5,5), p=−6; → (6,5), p=0; → (7,6), p=−6; → (8,6).
Points: (2,3),(3,4),(4,4),(5,5),(6,5),(7,6),(8,6).
- **Midpoint circle algorithm:** uses 8-way symmetry, p0 = 1 − r; if p<0: x+1, p += 2x+3; else x+1, y−1, p += 2(x−y)+5. Circle needs only one octant computed.

### 2D transformations (homogeneous coordinates)
Points are written (x, y, 1) so that translation also becomes a matrix multiplication; all 2-D transforms = 3×3 matrices; composition = matrix product (**order matters**, not commutative in general).
```
Translation (tx,ty):   | 1 0 tx |      Scaling (sx,sy):  | sx 0  0 |
                       | 0 1 ty |                        | 0  sy 0 |
                       | 0 0 1  |                        | 0  0  1 |

Rotation θ (anticlockwise about origin):
   | cosθ  −sinθ  0 |
   | sinθ   cosθ  0 |
   |  0      0    1 |

Reflection about x-axis: diag(1, −1, 1);  y-axis: diag(−1, 1, 1);  about origin: diag(−1, −1, 1)
Shear in x: x' = x + shx·y, y' = y
```
- Rotation about arbitrary point (a,b): translate(−a,−b) → rotate → translate(a,b). Scaling about a fixed point similarly.
- Worked: rotate (1,0) by 90° → (cos90, sin90) = (0,1). Translate (3,4) by (2,−1) → (5,3). Scale (2,3) by (2,2) → (4,6).
- Rotation by θ then −θ = identity (inverse = transpose). Uniform scaling: sx = sy.
- 3-D uses 4×4 matrices. Projection: parallel (orthographic) vs perspective.

### Clipping
- Removes parts of objects outside the **clipping window**. **Cohen-Sutherland line clipping:** 4-bit **region code** (TBRL): bit1 = above (top), bit2 = below, bit3 = right, bit4 = left. Window interior = 0000.
- Rules: both codes 0000 → **trivially accept**; **AND of codes ≠ 0000 → trivially reject**; otherwise compute intersection with a window edge and repeat.
- Others: **Liang-Barsky** (parametric line clipping, faster), **Sutherland-Hodgman** (polygon clipping), Weiler-Atherton (general polygon), Cyrus-Beck (convex window).
- **Viewing pipeline:** world coordinates → window-to-viewport transformation → device coordinates.

### Other graphics facts
- Bézier curve defined by control points; B-spline gives local control. **Hidden surface removal:** z-buffer (depth buffer), painter's algorithm, back-face culling. Illumination: ambient, diffuse, specular; shading: flat, **Gouraud** (interpolate intensity), **Phong** (interpolate normals). **Ray tracing** gives realistic reflections/shadows. **OpenGL** = graphics API.

**⚡ Exam tip:** DDA = floating point + rounding; Bresenham = integer only. Homogeneous coordinates let translation be a matrix. Cohen-Sutherland: AND ≠ 0 → reject. Raster images pixelate when zoomed, vector images do not.

## 10. Multimedia

### Basics
- **Multimedia** = integration of text, graphics, images, audio, video, animation (interactive if user controls). Hypermedia = multimedia + hyperlinks. Needs high storage/bandwidth, hence compression.

### Audio
- Digital audio: sampling rate × bit depth × channels. **CD audio:** 44.1 kHz, 16 bit, stereo → 44100×16×2 = 1,411,200 bps ≈ 1.41 Mbps. Nyquist: sample at ≥ 2 × highest frequency (human hearing 20 Hz-20 kHz).
- File size (bytes) = sampling rate × (bits/8) × channels × seconds. Example: 1 minute CD audio = 44100 × 2 × 2 × 60 = 10,584,000 B ≈ 10.1 MB.

| Format | Type |
|---|---|
| **WAV** | uncompressed (PCM), Microsoft |
| **MP3** (MPEG-1 Layer 3) | lossy, ~10:1 |
| AAC | lossy, successor of MP3 |
| **FLAC** | lossless |
| MIDI | not sampled audio - instructions (notes) to synthesiser; tiny files |
| OGG | lossy (open) |
- Video formats: **MP4/MPEG-4, AVI, MKV, MOV, WMV, FLV**. Codecs: **H.264**, H.265 (HEVC), MPEG-2 (DVD). **Frame rate** 24/25/30 fps; resolution HD 1280×720, Full HD 1920×1080, 4K 3840×2160. Video compression exploits **spatial** (within a frame, intra) and **temporal** (between frames) redundancy; MPEG frames: **I (intra), P (predicted), B (bidirectional)**.
- Uncompressed video size = width × height × bits/pixel × fps × seconds.

### Lossy vs lossless

| | Lossless | Lossy |
|---|---|---|
| Original recoverable exactly | Yes | No |
| Ratio | low (2:1-3:1) | high |
| Techniques | Huffman, RLE, LZW | DCT, quantisation, perceptual coding |
| Formats | PNG, GIF, FLAC, ZIP, TIFF | JPEG, MP3, MPEG/H.264, AAC |
- Use lossless for text, programs, medical images; lossy for photos/audio/video where small loss is acceptable.
- Animation: **tweening**, morphing (image A → B), keyframes. **Streaming** = play while downloading.

**⚡ Exam tip:** JPEG/MP3/MPEG = lossy; PNG/GIF/FLAC/ZIP = lossless; GIF = 256 colours + animation; MIDI stores notes, not sound; CD audio = 44.1 kHz, 16 bit.

## 11. Inference, Bayesian Networks, Planning and Rule-Based Systems

### Inference: forward and backward chaining
- **Forward chaining (data-driven):** start with known facts, fire every rule whose conditions are satisfied, add the conclusions to the facts, repeat until the goal appears or nothing new fires. Good when many facts are known and the goal is open (monitoring, configuration - XCON).
- **Backward chaining (goal-driven):** start with the goal, find a rule whose conclusion matches it, then make that rule's conditions new sub-goals; stop when sub-goals are known facts. Good for diagnosis with one clear hypothesis (MYCIN; Prolog uses backward chaining with depth-first search and backtracking).

Worked example. Facts: A, B. Rules: R1: A AND B → C; R2: C → D; R3: D AND E → F.
```
Forward : A,B known -> R1 fires -> C ; R2 fires -> D ; R3 needs E (unknown) -> stop. Facts = {A,B,C,D}
Backward: goal D <- R2 needs C <- R1 needs A and B -> both are facts -> D proved.
```

| | Forward chaining | Backward chaining |
|---|---|---|
| Direction | facts → goal | goal → facts |
| Driven by | data | goal/hypothesis |
| Rules examined | all that match current facts | only those that conclude the goal |
| Typical use | monitoring, planning, configuration | diagnosis, query answering, Prolog |

- **Resolution** + **unification** is the complete inference method for first-order logic; the Prolog rule "grandparent(X,Z) :- parent(X,Y), parent(Y,Z)." is a Horn clause (one conclusion, several conditions).
- **Production system** = working memory (facts) + rule base (IF-THEN) + inference engine running the **recognise-act cycle**: match → conflict set → **conflict resolution** (choose one rule: priority, specificity, recency) → act.
- **Frames:** a frame "Bird" has slots (covering = feathers, can_fly = yes as a default); the child frame "Penguin" is-a Bird and overrides can_fly = no. Slots may hold default values, ranges, or **if-needed / if-added procedures (demons)**.
- **Certainty factor (MYCIN):** a number from −1 (certainly false) to +1 (certainly true) attached to a rule's conclusion; lets rule-based systems reason with uncertainty.

### Probability and Bayesian networks
- **Bayes' theorem:** P(H|E) = P(E|H) × P(H) / P(E). Prior P(H), likelihood P(E|H), posterior P(H|E).
- Example: disease prevalence 1%, test sensitivity 90%, false-positive rate 10%. P(+) = 0.9×0.01 + 0.1×0.99 = 0.108; P(D|+) = 0.009/0.108 = 0.083 (about 8.3%), small because the disease is rare.
- **Bayesian (belief) network:** a **directed acyclic graph** in which each node is a random variable and each edge shows direct influence (parent → child). Each node stores a **conditional probability table (CPT)** P(node | parents); a root node stores just its prior.
- The joint probability factorises: P(X1,...,Xn) = product of P(Xi | parents(Xi)).
- Example (chain Rain → WetGrass → Slip): P(R, W, S) = P(R) × P(W|R) × P(S|W). Given W, S is independent of R (conditional independence).
- A network of n boolean variables with at most k parents each needs only about n × 2^k numbers instead of 2^n − 1 for the full joint table.
- Uses: medical diagnosis, spam filtering, fault diagnosis; inference by enumeration, variable elimination, or approximation (sampling).
- **Naive Bayes classifier:** applies Bayes' theorem assuming features are conditionally independent given the class; choose the class with the largest P(C) × product of P(xi | C). Simple, fast, popular for text/spam classification.

### Planning
- **Planning** = finding a sequence of actions that takes the agent from an initial state to a goal state.
- **STRIPS** representation: each action has **preconditions**, an **add list** (new facts) and a **delete list** (facts that become false). Example: Move(X from Y to Z): pre = clear(X), clear(Z), on(X,Y); add = on(X,Z), clear(Y); delete = on(X,Y), clear(Z).
- Approaches: **forward (progression) state-space** planning, **backward (regression)** from the goal, **goal-stack planning** (stack of goals/subgoals), **means-ends analysis** (General Problem Solver - reduce the difference between current state and goal), **partial-order planning** (leave action ordering open until needed), **hierarchical task network (HTN)** planning.
- **PDDL** is the standard language to describe planning problems. Classic domains: blocks world, robot navigation. The **frame problem** = stating what does NOT change when an action is performed.
- Planning differs from plain search by using a structured (logical) description of states and actions, which allows heuristics and subgoal decomposition.

### Machine learning and expert systems: syllabus recap
- ML types and metrics are in chapter 6; expert-system parts and shells are in chapter 4. Expert systems use knowledge base + inference engine (forward/backward chaining) + explanation facility; learning systems improve from data, classic expert systems do not.

**⚡ Exam tip:** Forward = data-driven, backward = goal-driven (Prolog, MYCIN). Bayesian network = DAG + CPTs, joint = product of P(node | parents). STRIPS action = precondition + add list + delete list. Certainty factor range −1 to +1. DFS stack, BFS queue.

## 12. Multimedia: Hardware, Software, Applications and Project Design

### Multimedia system components
- **Hardware:** input - keyboard, mouse, scanner, digital camera, microphone, graphics tablet, video capture card; processing - fast CPU, large RAM, **sound card** (ADC/DAC), **graphics card (GPU)**; storage - hard disk/SSD, CD-ROM, DVD, Blu-ray, pen drive; output - high-resolution monitor, speakers/headphones, projector, printer; networking - broadband for streaming.
- **Software:**
  - Image editing: Adobe Photoshop, GIMP, CorelDRAW (vector), Illustrator.
  - Audio editing: Audacity, Sound Forge, Adobe Audition.
  - Video editing: Adobe Premiere, Final Cut Pro, DaVinci Resolve.
  - Animation: Adobe Flash/Animate, Maya, 3ds Max, Blender.
  - **Authoring tools:** Adobe Director, Authorware, Flash, ToolBook, PowerPoint - combine media into one interactive product.
- **Authoring metaphors:** **timeline-based** (Flash, Director - frames along a time axis), **card/page-based** (HyperCard, ToolBook - pages linked by buttons), **icon/flow-based** (Authorware - icons on a flowline), **scripting-based**.
- **Applications:** education and e-learning, entertainment and games, **video conferencing**, **video on demand**, digital libraries, advertising and kiosks, medical imaging and simulation, virtual reality, training/simulation, web multimedia.

### Text
- Static text and **hypertext** (nodes joined by links; HTML is a hypertext markup language). Character sets: ASCII (7-bit), **Unicode** (all languages; UTF-8, UTF-16). Fonts: **bitmap** fonts (fixed size) and **outline** fonts (TrueType, PostScript - scalable). Typeface = design family, font = size/style instance; serif vs sans-serif.

### Audio in detail
- **Sampling theorem (Nyquist):** sampling rate ≥ 2 × highest frequency. A 4 kHz signal needs at least 8000 samples/s. Telephone speech: 8 kHz, 8-bit, mono = 64 kbps.
- Audio file size = rate × bits/8 × channels × seconds. Example: 8 kHz, 8-bit, mono, 10 s = 8000 × 1 × 1 × 10 = 80,000 bytes.
- **MP3 (MPEG-1 Audio Layer III):** lossy; uses **psychoacoustic (perceptual) coding** - removes sounds the human ear cannot hear (masked frequencies) - then Huffman coding; typical bit rates 128-320 kbps, about 10:1 over CD audio.
- **MIDI (Musical Instrument Digital Interface):** a protocol and file format carrying **event messages** (note on/off, pitch, velocity, instrument/patch, controller) instead of sampled sound; extremely small files, easy to edit, sound depends on the synthesiser/sound bank; 16 channels per cable; file extension .mid. Cannot store a human voice recording.
- Other: WAV (uncompressed PCM), AIFF (Apple), AAC, OGG, FLAC, WMA, RealAudio (streaming).

### Graphics, animation and video
- **Graphics:** raster/bitmap (BMP, JPEG, GIF, PNG, TIFF - pixel based) vs vector (SVG, CDR, AI, EPS - mathematical objects, scalable). Colour models: RGB (screens, additive), CMYK (print, subtractive), HSB.
- **Animation:** illusion of motion produced by showing frames faster than about 12-15 fps (**persistence of vision**); smooth animation 24-30 fps. Types: **cel animation**, **path/keyframe animation**, **tweening** (software generates the in-between frames), **morphing**, 2D vs 3D, stop-motion; techniques: **onion skinning**, rendering and **rigging** for 3D. Formats: animated GIF, SWF, FLV.
- **Video:** broadcast standards **NTSC** (USA/Japan, 29.97 ≈ 30 fps, 525 lines), **PAL** (India/Europe, **25 fps**, 625 lines), SECAM (France). Digital standards: **MPEG-1** (VCD), **MPEG-2** (DVD, digital TV), **MPEG-4** (internet, H.264); MP4/AVI/MOV/MKV are container formats. Uncompressed size = width × height × bytes/pixel × fps × seconds, hence compression with codecs (I, P, B frames).
- **Streaming** media: played while downloading, needs buffering; protocols RTP, RTSP; **progressive download** is not true streaming.

### Multimedia project design
- Phases: **analysis** (needs and audience) → **design** (concept, structure/navigation map, **storyboard** = sequence of sketches showing screens, media, interactions) → **content collection/production** (create or acquire text, images, audio, video; check copyright) → **authoring and integration** (build in an authoring tool, add interactivity) → **testing** (functionality, usability, compatibility) → **delivery/distribution** (CD/DVD, web, app) → **maintenance and evaluation**.
- Documents: **script**, **storyboard**, **flowchart/navigation structure**, asset list. Navigation structures: linear, hierarchical, non-linear (hypermedia), composite.
- Design principles: consistency, clear navigation, readable text with good contrast, balanced media (avoid overload), small file sizes, accessibility, testing on target hardware.

### Future trends
- **Virtual reality (VR)** - fully immersive 3D environment (head-mounted display); **augmented reality (AR)** - overlays digital objects on the real view (Pokemon Go); **mixed reality**; **3D and holographic displays**; 360-degree video; **HD/4K/8K** and HEVC (H.265)/AV1 codecs; cloud and **streaming** services (OTT); 5G; AI-generated and AI-edited media; interactive TV; **multimedia on mobile** and wearables; the Metaverse; haptic (touch feedback) interfaces.

**⚡ Exam tip:** Nyquist = 2 × fmax; MP3 = lossy perceptual coding; MIDI = note instructions, not sound; PAL = 25 fps (India), NTSC = 30 fps; tweening = in-between frames; storyboard = design-phase tool; timeline tool = Flash/Director; AR overlays, VR immerses.

## Quick Revision Sheet

- AI term coined by **John McCarthy, 1956**; LISP by McCarthy (1958); Prolog by Colmerauer (1972).
- **Turing Test** (Alan Turing, 1950): machine indistinguishable from human in conversation.
- Agent = sensors + actuators; PEAS = Performance, Environment, Actuators, Sensors.
- BFS uses queue, DFS uses stack; UCS expands lowest g(n); IDDFS = O(b·d) memory and complete.
- **A\***: f = g + h; optimal if h admissible (never overestimates); greedy: f = h.
- Hill climbing gets stuck at local maxima, plateau, ridge.
- Alpha-beta prunes when α ≥ β; best case O(b^(m/2)); same result as minimax.
- Propositional logic has no quantifiers; FOL has ∀, ∃; unification + resolution.
- Semantic net = graph of is-a relations; frame = slots; production rule = IF-THEN.
- Expert system = knowledge base + inference engine + user interface (+ explanation, acquisition).
- First expert systems: DENDRAL; MYCIN (medical); shells: EMYCIN, CLIPS.
- Fuzzy logic (Zadeh, 1965): membership in [0,1]; AND = min, OR = max, NOT = 1−μ.
- Perceptron: linear classifier, cannot solve XOR; backprop = gradient descent on error.
- CNN → images; RNN/LSTM → sequences; ReLU = max(0,x); sigmoid range (0,1).
- Supervised = labelled; unsupervised = unlabelled (k-means, clustering); RL = rewards.
- Precision = TP/(TP+FP); Recall = TP/(TP+FN); F1 = 2PR/(P+R); Accuracy = (TP+TN)/total.
- Overfitting = low training error, high test error.
- **First step of DIP = image acquisition**; photo = analog; scanner/camera digitises.
- Sampling = x,y discretisation; quantisation = intensity discretisation; image size = M×N×k bits.
- Negative: s = 255 − r; log expands dark; gamma<1 brightens; median filter for salt-and-pepper.
- Erosion shrinks, dilation grows; opening = erosion→dilation; closing = dilation→erosion.
- JPEG lossy (DCT); PNG lossless + transparency; GIF 256 colours + animation, LZW.
- Raster = pixels (loses quality on zoom); vector = equations (scalable).
- DDA floating point; Bresenham integer: p0 = 2dy − dx; p<0 → p+2dy, else p+2dy−2dx.
- Homogeneous 3×3 matrices make translation a multiplication; transformations not commutative.
- Cohen-Sutherland: code 0000 accept, AND ≠ 0 reject. CD audio 44.1 kHz/16 bit; MIDI = notes; MP3 lossy.
- Forward chaining = data-driven; backward chaining = goal-driven (Prolog, MYCIN). Conflict resolution picks one rule from the conflict set.
- Bayesian network = DAG with CPTs; joint = product of P(Xi | parents); Naive Bayes assumes conditionally independent features.
- STRIPS action: preconditions + add list + delete list; means-ends analysis (GPS); PDDL describes planning problems; certainty factor in [-1, +1].
- BFS order on tree S(A(C,D),B(E)) = S A B C D E; DFS = S A C D B E.
- Multimedia: Nyquist rate = 2 x fmax; MP3 = psychoacoustic lossy coding; MIDI = events (note on/off), tiny, 16 channels; PAL 25 fps, NTSC about 30 fps.
- Authoring tools: Flash/Director (timeline), ToolBook (card/page), Authorware (icon); storyboard = design phase; VR immerses, AR overlays; future: 4K/8K, 360 video, 5G, AI media.
