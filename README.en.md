<div align="center">
  <img src="assets/kaskad-jade-atlas.svg" alt="Kaskad — Vyunenko Theory K3" width="100%" />
  <p><strong>JADE ATLAS · CASCADE MATHEMATICS</strong></p>
  <p><sub>VYUNENKO THEORY K3 · TCHV · POSITION · STRUCTURE · PROOF</sub></p>
</div>

<p align="center">
  <a href="README.md">RU</a> · <a href="README.uk.md">UK</a> · <a href="README.zh-CN.md">中文</a> ·
  <a href="docs/INDEX.md">DOCUMENT MAP</a> · <a href="docs/VYUNENKO_THEORY.md">CANONICAL THEORY</a>
</p>

# Kaskad — Vyunenko Theory K3

**Mathematics where position matters.** Kaskad is a research corpus for cascade-thousand integers, their arithmetic, structure, divisibility and mathematical extensions. The model is distinct from software; computation is not presented as proof.

> **K3 principle:** coefficients and their positions determine value; the separator marks a positional transition, and zero keeps its place.

## ◈ Visual language

An original blend of three moods, not a reproduction of characters, frames or logos.

| Mood reference | Palette | Design role |
|---|---|---|
| *Kung Fu Panda 3* | jade, gold, lacquer red, blossom | craft, clarity and harmony |
| Horseman of Pestilence | charcoal, ash, plum, wine | contrast, uncertainty and edge cases |
| Ging Freecss (*Hunter × Hunter*) | blue-gray, sand, earth, muted teal | wayfinding and exploration |

**Palette:** jade \#247A60 / \#8BC8A6; gold \#D8AD58; lacquer red \#B83A45; plum \#63394F; obsidian \#10131A; ash \#A9ADB4; sand \#DEBCA1; trail teal \#769194. Color is navigation, not evidence.

## 1. Mathematical core

Vyunenko Theory K3 fixes the composite radix

\[
B=1000=10^3=2^3\cdot5^3,\qquad D_B=\{0,1,\ldots,999\}.
\]

A finite cascade is a vector

\[
a=(a_m,\ldots,a_1,a_0),\qquad a_i\in D_B,
\]

where $a_0$ is the least significant group. Its value is

\[
\boxed{\operatorname{Val}_{K3}(a)=\sum_{i=0}^{m}a_i\,1000^i.}
\]

A positive canonical cascade has a nonzero leading coefficient; zero has the unique form $(0)$. Signed values are separate.

### Reading a cascade

The symbol **k** separates groups. It is **only a separator**, not a digit, multiplier, radix or multiplication operator. Each separator advances to the next power of 1000. Decimal digit count inside a group creates no extra position.

| Word | Coefficients, high to low | Value |
|---|---:|---:|
| **7** | $(7)$ | $7$ |
| **1k** | $(1,0)$ | $1,000$ |
| **1k0k1** | $(1,0,1)$ | $1,000,001$ |
| **50k0k7** | $(50,0,7)$ | $50,000,007$ |
| **50k0k** | $(50,0,0)$ | $50,000,000$ |
| **12k34k56** | $(12,34,56)$ | $12,034,056$ |

A terminal **k** denotes exactly one omitted zero least-significant group. An explicit zero also occupies a position. Do not delete, move or merge zeros and separators without proving equivalence: depth and value are different characteristics.

## 2. Canonical form and modes

| Mode | Purpose |
|---|---|
| **Canonical** | Strict parsing of words admitted by the K3 grammar |
| **K3-PAD** | Explicit import and normalization of non-canonical tokens |
| **K3-RAW** | Structural input preserving groups, order and operand form |

Normalization is never silent. Text, coefficient vectors, numeric values, ordered expression trees and operation traces have distinct equality relations. Equal numbers do not make source words or computation histories identical. The shift operator $S_B$ is defined separately from the separator.

## 3. Cascade balance

Carry and borrow are two cases of one law:

\[
\boxed{c_i+t_i=1000t_{i+1}+r_i,\qquad 0\le r_i\le999.}
\]

Thus

\[
t_{i+1}=\left\lfloor\frac{c_i+t_i}{1000}\right\rfloor,
\qquad r_i=c_i+t_i-1000t_{i+1}.
\]

Admissible normalization preserves the weighted sum:

\[
\sum_i c_i1000^i=\sum_i r_i1000^i.
\]

## 4. Composite radix and extensions

Since $1000=2^3\cdot5^3$, the Chinese remainder theorem gives, for $r\ge1$,

\[
\mathbb Z/1000^r\mathbb Z\cong
\mathbb Z/2^{3r}\mathbb Z\times\mathbb Z/5^{3r}\mathbb Z.
\]

The corresponding completion is the topological ring

\[
\widehat{\mathbb Z}_{1000}\cong\mathbb Z_2\times\mathbb Z_5,
\]

not a field. Further layers cover divisibility, ultrametrics, infinite cascades, structural semantics, combinatorics, statistics and tensor invariants. Each has its own domain and status and does not alter the core without a separate version and justification.

## 5. Vyunenko Theory and TCHV

**Vyunenko Theory K3** is Kaskad's formal core: finite cascades, canonical positional representation, polynomial evaluation and compatible extensions.

**TCHV** is mentioned as a neighboring research context and remains a separate theoretical line. This does not identify TCHV with K3 or import one system's claims into the other's axioms. Any relationship requires explicit objects, mappings, assumptions and verifiable statements.

## 6. Claim status

| Marker | Status | Meaning |
|---|---|---|
| **DEF** | Definition | Object introduced with explicit domain |
| **AX** | Postulate | Starting convention fixed |
| **THM** | Theorem | Complete proof supplied |
| **CLASSIC** | Classical result | Source and conditions stated |
| **CHECK** | Computational check | Specific inputs or finite domain checked |
| **SPEC** | Specification | Requirement or model described |
| **HYP** | Hypothesis | Claim remains open |
| **IMPL** | Implementation fact | Code, artifact and reproducible check exist |

A test does not replace proof. Finite enumeration supports a claim only over the domain actually enumerated. Missing verification is not PASS; implementation does not define mathematical meaning.

## 7. Research map

- [Vyunenko Theory K3](docs/VYUNENKO_THEORY.md)
- [Canonical syntax](docs/K3_CANONICAL_SYNTAX.md) · [Foundations and algebra](docs/K3_CANONICAL_FOUNDATIONS_AND_ALGEBRA.md)
- [Cascade balance](docs/CHAPTER_II_CASCADE_BALANCE.md) · [Structural semantics](docs/K3_STRUCTURAL_SEMANTICS_AND_ORDERED_SUMS.md)
- [CRT and infinite cascades](docs/K3_CRT_IDEMPOTENTS_AND_INFINITE_CASCADES.md)
- [Classical crosswalk](docs/CLASSICAL_MATHEMATICS_CROSSWALK.md) · [Proof framework](docs/FORMAL_EPISTEMIC_AND_PROOF_FRAMEWORK.md)
- [Implementation status](docs/DEVELOPMENT_STATUS.md) · [Complete documentation map](docs/INDEX.md)

## 8. Reproducibility and license

The auxiliary implementation is in **src/kaskad_k3/**, tests in **tests/** and vectors in **tests/vectors/**. They are computational instruments, not substitutes for the mathematical core.

    PYTHONPATH=src python -m unittest discover -s tests -v

CI is configured for Python 3.11–3.14. A result applies to its exact commit and GitHub Actions run.

- [Contributing](CONTRIBUTING.md) · [Scientific standard](docs/SCIENTIFIC_MATHEMATICAL_DOCUMENTATION_STANDARD.md)
- [Attribution and rights](docs/ATTRIBUTION_AND_RIGHTS.md) · [Citation](CITATION.cff) · [Apache-2.0](LICENSE)

---

<p align="center"><strong>POSITION IS STRUCTURE.</strong><br/><sub>ZERO KEEPS ITS PLACE · THE FORMULA KEEPS VALUE · PROOF KEEPS MEANING</sub></p>