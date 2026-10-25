
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
