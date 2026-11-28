<div align="center">
  <img src="assets/kaskad-jade-atlas.svg" alt="Kaskad Jade Atlas" width="100%" />
  <p><strong>KASKAD · MATHEMATICAL RESEARCH CORPUS</strong></p>
  <p><sub>VYUNENKO THEORY K3 · CHUMNY VERDICT THEORY CV-1 · FORMAL MATHEMATICS</sub></p>
  <h1>Position is preserved. Structure is distinguished. Claims are proved.</h1>
  <p>A single entry point to two independent theories, their evidence base and compatible research extensions.</p>
</div>

<p align="center">
  <a href="README.md">RU</a> · <strong>EN</strong> · <a href="README.uk.md">UA</a> · <a href="README.zh-CN.md">中文</a>
  <br />
  <a href="docs/INDEX.md">DOCUMENT MAP</a> ·
  <a href="docs/VYUNENKO_THEORY.md">K3 CANON</a> ·
  <a href="docs/CHUMNY_VERDICT_THEORY.md">CV-1</a> ·
  <a href="docs/VYUNENKO_APPLIED_MATHEMATICAL_ATLAS.md">APPLIED ATLAS</a>
</p>

---

## About

**Kaskad** is a mathematical research corpus for the formal study of positional numbers, arithmetic structures, directed relations and mathematical evidence.

The project keeps mathematical theory, computational checks and software implementation distinct. A computation can confirm a specific result or finite set of cases, but it does not replace proof. A research hypothesis is not presented as a theorem, and the presence of a document or code is not treated as proof of implementation.

### At a glance

| | Scope | Primary source |
|---|---|---|
| **K3** | Finite positional system with radix 1000 | [Vyunenko Theory](docs/VYUNENKO_THEORY.md) |
| **CV-1** | Directed relation with one fixed nonzero parameter | [Chumny Verdict Theory](docs/CHUMNY_VERDICT_THEORY.md) |
| **Navigation** | Full catalogue of chapters, extensions and machine-readable materials | [Documentation map](docs/INDEX.md) |

## Two independent research tracks

### 01 · Vyunenko Theory K3

K3 describes finite integer cascades in a positional system with fixed radix

$$
B=1000=10^3=2^3\cdot5^3,
\qquad
D_B=\{0,1,\ldots,999\}.
$$

Each canonical group coefficient belongs to $D_B$. For a vector listed from the least significant position to the most significant,

$$
a=(a_0,a_1,\ldots,a_m),
\qquad
\operatorname{Val}_{K3}(a)=\sum_{i=0}^{m}a_iB^i.
$$

The symbol **k** is a lexical separator between adjacent groups, not a number, radix or multiplier. A group’s index determines its weight. A zero coefficient keeps its position and must not be removed or moved without a proof of equivalence.

**Primary chapters:** [canonical theory](docs/VYUNENKO_THEORY.md) · [syntax](docs/K3_CANONICAL_SYNTAX.md) · [cascade balance](docs/CHAPTER_II_CASCADE_BALANCE.md) · [foundations and algebra](docs/K3_CANONICAL_FOUNDATIONS_AND_ALGEBRA.md).

### 02 · Chumny Verdict Theory CV-1

CV-1 studies a separate directed relation on the standard set of integers. For a parameter fixed in advance, $c\in\mathbb Z\setminus\{0\}$, the primary relation is defined by

$$
x\prec_c y
\iff
(x=_{\mathbb Z}0)\land(y=_{\mathbb Z}c),
\qquad
\prec_c=\{(0,c)\}.
$$

Thus $0\prec_c c$, while $c\not\prec_c0$; the standard numerical inequality $0\ne_{\mathbb Z}c$ remains true.

A separate additive-transition relation is defined by

$$
x\rightsquigarrow_c y
\iff
y=_{\mathbb Z}x+c.
$$

These are two different relations with different roles. CV-1 does not redefine ordinary equality, identify distinct integers or change standard arithmetic operations.

**Primary source:** [Chumny Verdict Theory — CV-1](docs/CHUMNY_VERDICT_THEORY.md).

## K3: position determines value

These examples show why the complete sequence of groups matters, not merely the number of separators.

| Word | Vector, least to most significant | Value |
|---|---:|---:|
| **1k** | $(0,1)$ | $1\,000$ |
| **50k0k7** | $(7,0,50)$ | $50\,000\,007$ |
| **50k0k** | $(0,0,50)$ | $50\,000\,000$ |
| **50k7** | $(7,50)$ | $50\,007$ |

In the canonical grammar, a trailing **k** denotes exactly one additional implicit least-significant zero group. Explicit zero groups also retain their positions. For example, removing the middle group from **50k0k7** changes its value from 50,000,007 to 50,007.

K3 treats the following as distinct:

- **Canonical** — strict parsing of canonical words;
- **K3-PAD** — an explicitly selected import and normalization mode;
- **K3-RAW** — preservation of the original structure;
- equality of text, coefficient structures, numerical values, expression trees and operation traces.

Normalization must never happen silently: the transformation mode and preserved invariant must be stated explicitly.

## Scientific integrity and verification

Every claim needs a declared scope, assumptions, evidence type and status.

| Material | What it establishes |
|---|---|
| Definition | Meaning of an introduced object or term |
| Proof | A universal claim under its stated assumptions |
| Counterexample | A boundary or refutation of a particular general claim |
| Computational check | Only executed inputs, a finite domain or a numerical experiment |
| Hypothesis / open problem | A question that still requires research |
| Implementation status | Only the inspected state of a specific revision |

The central Kaskad rule is: **computational verification does not replace mathematical proof**. A specification, plan, test and implementation fact have different statuses.

Normative references: [Cascade Edition 1.0.0](docs/SCIENTIFIC_MATHEMATICAL_DOCUMENTATION_STANDARD.md) · [formal epistemics and proof framework](docs/FORMAL_EPISTEMIC_AND_PROOF_FRAMEWORK.md) · [research maturity path](docs/RESEARCH_MATURITY_AND_RECOGNITION_PATH.md).

## Reading routes

| Goal | Suggested route |
|---|---|
| Understand the project structure | [Documentation map](docs/INDEX.md) → this README |
| Study K3 | [Vyunenko Theory](docs/VYUNENKO_THEORY.md) → [syntax](docs/K3_CANONICAL_SYNTAX.md) → [cascade balance](docs/CHAPTER_II_CASCADE_BALANCE.md) |
| Study CV-1 | [Chumny Verdict Theory](docs/CHUMNY_VERDICT_THEORY.md) |
| Check formulas and claim statuses | [Reference vectors](docs/K3_REFERENCE_VECTORS.json) · [claim registry](docs/K3_CLAIM_REGISTRY.json) |
| Explore applied correspondences | [Unified Applied Mathematical Atlas](docs/VYUNENKO_APPLIED_MATHEMATICAL_ATLAS.md) |
| Review repository state | [Development status](docs/DEVELOPMENT_STATUS.md) · [language register](docs/LANGUAGE_REGISTER.md) |

## Applied mathematical models

The corpus includes typed mathematical correspondences for **DAK, Reaper, Pytyliki, VentuSample and OPlague**. These describe separate subject domains; they do not automatically become axioms of the finite K3 core. Each correspondence needs its own types, assumptions, mappings and proof obligations.

Start with the [Unified Applied Mathematical Atlas](docs/VYUNENKO_APPLIED_MATHEMATICAL_ATLAS.md). Primary chapters and crosswalks are listed in the [documentation map](docs/INDEX.md).

## Computational checks

The repository includes an auxiliary reference implementation and tests. Run locally: <code>PYTHONPATH=src python -m unittest discover -s tests -v</code>.

A result applies only to the revision and cases actually executed. It does not prove every K3 or CV-1 theorem and does not certify another revision. Check [Development Status](docs/DEVELOPMENT_STATUS.md) and the Actions tab before making claims about current CI.

## Languages, attribution and license

- **Language editions:** [Русский](README.md) · [English](README.en.md) · [Українська](README.uk.md) · [简体中文](README.zh-CN.md). The translation coverage of long-form research chapters is recorded separately in the [Language Register](docs/LANGUAGE_REGISTER.md).
- **Citation:** use [CITATION.cff](CITATION.cff) and cite a specific Git revision. A DOI or arXiv ID is not claimed unless a real identifier has been assigned.
- **Rights and provenance:** [attribution rules](docs/ATTRIBUTION_AND_RIGHTS.md).
- **Repository license:** [Apache-2.0](LICENSE).

---

<p align="center">
  <strong>KASKAD</strong><br />
  <sub>Definitions establish the subject. Proofs justify conclusions. Navigation connects documents without merging their statuses.</sub>
</p>
