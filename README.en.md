<div align="center">
  <img src="assets/kaskad-jade-atlas.svg" alt="Kaskad mathematical research atlas" width="100%" />
  <p><strong>KASKAD · MATHEMATICAL RESEARCH CORPUS</strong></p>
  <p><sub>VYUNENKO THEORY K3 · CHUMNY VERDICT THEORY CV-1 · FORMAL MATHEMATICS</sub></p>
  <h1>Precise definitions. Clear structure. Justified conclusions.</h1>
  <p>A clear starting point for the Kaskad mathematical corpus: its ideas, theories, research directions and ways to verify results.</p>
</div>

<p align="center">
  <a href="README.md">RU</a> · <strong>EN</strong> · <a href="README.uk.md">UA</a> · <a href="README.zh-CN.md">中文</a>
  <br />
  <a href="docs/INDEX.md">DOCUMENT MAP</a> ·
  <a href="docs/VYUNENKO_THEORY.md">K3 THEORY</a> ·
  <a href="docs/CHUMNY_VERDICT_THEORY.md">CV-1 THEORY</a> ·
  <a href="CONTRIBUTING.md">HOW TO CONTRIBUTE</a>
</p>

---

## 01 · Introduction

Welcome to **Kaskad**.

This is a place for mathematical research. Ideas are turned into precise definitions, definitions into models, and mathematical claims into proofs, counterexamples or clearly marked open questions.

The guiding rule is simple: **first understand what is being studied, then describe it precisely, and only then draw conclusions**.

## 02 · About the project

**Kaskad** is not one formula or one theory. It is an organized research corpus containing independent mathematical topics, their primary documents, results, computational evidence and open research questions.

The project aims to:
- describe mathematical objects and the relations between them;
- build precise definitions and testable models;
- study numbers, structures and transformations;
- distinguish proved results from hypotheses and experiments;
- preserve the research process so that others can check and continue it.

The corpus has two central, independent theories: **K3** and **CV-1**. They have different subjects and definitions. They do not become one axiom system simply because they are stored in the same repository.

| Track | What it studies | Primary document |
|---|---|---|
| **K3** | Positional representation of numbers with radix 1000 | [Vyunenko Theory](docs/VYUNENKO_THEORY.md) |
| **CV-1** | A special directed relation on the integers | [Chumny Verdict Theory](docs/CHUMNY_VERDICT_THEORY.md) |
| **The corpus** | Document links, research status and supporting material | [Documentation map](docs/INDEX.md) |

## 03 · Mathematical foundations of the corpus

Mathematics starts with clear rules. Every Kaskad study should make four things clear:

1. **Object:** what is being studied — a number, sequence, relation, function, graph or another structure.
2. **Domain:** which values and cases are allowed.
3. **Rules:** how operations and relations between objects are defined.
4. **Justification:** why a conclusion is true and under which assumptions.

Kaskad does not have one shared axiom system that replaces the definitions of its separate theories. For example, radix 1000 belongs to K3, while the parameter of the directed relation belongs to CV-1. These concepts must not be mixed.

The main K3 notation is:

| Symbol | Meaning |
|---|---|
| $B$ | Radix: $1000=10^3=2^3\cdot5^3$ |
| $D_B$ | Allowed canonical coefficients: $\{0,1,\ldots,999\}$ |
| $a_i$ | Coefficient of the group at position $i$ |
| $k$ | Separator between adjacent groups; not a number or multiplier |
| $\mathrm{Val}_{K3}$ | Function that evaluates a cascade as an integer |

See the [canonical K3 theory](docs/VYUNENKO_THEORY.md) and the [scientific documentation standard](docs/SCIENTIFIC_MATHEMATICAL_DOCUMENTATION_STANDARD.md) for the full conventions.

## 04 · Vyunenko Theory K3

**K3** is a positional system for writing integers in groups using radix 1000.

Its radix is fixed:

$$
B=1000=10^3=2^3\cdot5^3,
\qquad
D_B=\{0,1,\ldots,999\}.
$$

A cascade can be represented by a finite coefficient vector. When the coefficients are listed from the least significant position to the most significant position,

$$
a=(a_0,a_1,\ldots,a_m),
\qquad
\mathrm{Val}_{K3}(a)=\sum_{i=0}^{m}a_iB^i.
$$

In simple terms, every group has a position, and that position determines its contribution to the number.

| Word | Vector, least to most significant | Value |
|---|---:|---:|
| **1k** | $(0,1)$ | $1\,000$ |
| **50k0k7** | $(7,0,50)$ | $50\,000\,007$ |
| **50k0k** | $(0,0,50)$ | $50\,000\,000$ |
| **50k7** | $(7,50)$ | $50\,007$ |

In the canonical grammar, a trailing **k** denotes exactly one additional implicit least-significant zero group. The canonical zero word is **0**.

**Why do zero groups matter?** In **50k0k7**, the middle group is zero, but it still occupies a position. Removing it gives **50k7**, which is a different number. Zeros and separators must not be removed, moved or combined without a precise rule and a proof that the required property is preserved.

K3 also separates three ways of handling structure:

- **Canonical** — strict parsing of valid canonical words;
- **K3-PAD** — an explicitly selected import and normalization mode;
- **K3-RAW** — preservation of the original input and its structure.

These modes must not silently replace one another.

**Read more:** [full theory](docs/VYUNENKO_THEORY.md) · [syntax](docs/K3_CANONICAL_SYNTAX.md) · [carry and borrow](docs/CHAPTER_II_CASCADE_BALANCE.md) · [foundations and algebra](docs/K3_CANONICAL_FOUNDATIONS_AND_ALGEBRA.md).

## 05 · Chumny Verdict Theory CV-1

**CV-1** is an independent mathematical model of a directed relation on the integers.

First, one fixed nonzero integer is selected:

$$
c\in\mathbb Z\setminus\{0\}.
$$

The relation is then defined as

$$
x\prec_c y
\iff
(x=_{\mathbb Z}0)\land(y=_{\mathbb Z}c),
\qquad
\prec_c=\{(0,c)\}.
$$

This means that the relation contains exactly one pair in the given model: $(0,c)$. It is directed: $0\prec_c c$ does not imply $c\prec_c0$.

A separate relation describes a transition by the fixed amount:

$$
x\rightsquigarrow_c y
\iff
y=_{\mathbb Z}x+c.
$$

These are different mathematical relations. **CV-1 does not change ordinary integer equality**, identify different integers or replace the usual rules of arithmetic.

**Read more:** [Chumny Verdict Theory](docs/CHUMNY_VERDICT_THEORY.md).

## 06 · Research directions and extensions

The corpus studies more than its basic definitions. Separate documents explore additional properties, models and research questions.

Main directions include:
- **Arithmetic and algebra:** cascade operations, divisibility, remainders and properties of the composite radix.
- **Residue systems and CRT:** links between modular systems and the prime factors of the radix.
- **Topology and infinite cascades:** limiting constructions and properties of infinite sequences.
- **Structure and combinatorics:** group sequences, expression trees, graphs, permutations and invariants.
- **Geometric and dynamic models:** other ways to describe profiles, transitions and change.
- **Open problems:** questions that still need proof or further study.

Useful starting points include the [classical mathematics crosswalk](docs/CLASSICAL_MATHEMATICS_CROSSWALK.md), [CRT and infinite cascades](docs/K3_CRT_IDEMPOTENTS_AND_INFINITE_CASCADES.md), [Vyunenko Graph Theory (operational states, monadic effects, and termination)](docs/VYUNENKO_GRAPH_THEORY.md) and [K3-M morphology](docs/K3_STRATIFIED_MATHEMATICS.md).

These directions do not all have the same level of maturity. Each document states what has been defined or proved and what remains a research proposal.

## 07 · Applied mathematical models and integrations

Kaskad also describes mathematical aspects of other technical projects. This does not make their source code part of K3. Each project has its own types, rules, limits and mappings to mathematical objects.

The applied atlas includes:

| Project | Mathematical topics represented |
|---|---|
| **DAK** | Processes, memory, permissions, graphs, networking and system states |
| **Reaper** | Types, intermediate representations, bytecode, memory and ABI |
| **Pytyliki** | Numerical accuracy, finite structures and verifiable invariants |
| **VentuSample** | Digital signals, timing and audio processing |
| **OPlague** | Devices, identifiers, matching graphs and evidence |

Start with the [Unified Applied Mathematical Atlas](docs/VYUNENKO_APPLIED_MATHEMATICAL_ATLAS.md). It connects the specialist documents but does not replace them or claim that every described implementation is complete.

## 08 · Scientific method and proofs

Scientific work must distinguish an idea from evidence for a result.

| Type of material | Plain-language meaning |
|---|---|
| **Definition** | States exactly what a term or object means |
| **Assumption** | A condition accepted for a particular argument |
| **Theorem** | A mathematical claim accompanied by a proof |
| **Hypothesis** | A proposed result that still needs proof |
| **Counterexample** | A concrete case showing that a general claim is false |
| **Computational result** | An outcome obtained by running code or checking a finite set of cases |
| **Implementation fact** | A fact confirmed by inspecting a specific source or test revision |

One type does not automatically establish another. For example, a successful test confirms the cases that were tested; it does not prove a claim for every integer.

Kaskad records the scope, assumptions, sources, notation and limits of each result. The research process follows [Cascade Edition 1.0.0](docs/SCIENTIFIC_MATHEMATICAL_DOCUMENTATION_STANDARD.md), the [formal epistemic and proof framework](docs/FORMAL_EPISTEMIC_AND_PROOF_FRAMEWORK.md) and the [theory development rules](docs/THEORY_DEVELOPMENT_RULES.md).

## 09 · Computational infrastructure and verification

Computing helps find mistakes, check examples and repeat experiments. The repository contains a K3 reference implementation, tests, reference examples and machine-readable schemas.

Useful resources:
- [Reference implementation](docs/REFERENCE_IMPLEMENTATION.md);
- [K3 reference vectors](docs/K3_REFERENCE_VECTORS.json);
- [Mathematical claim registry](docs/K3_CLAIM_REGISTRY.json);
- [Data schemas](schemas/README.md);
- [Development and verification status](docs/DEVELOPMENT_STATUS.md).

Run the tests locally:

~~~bash
PYTHONPATH=src python -m unittest discover -s tests -v
~~~

A result applies only to the revision and cases that were actually checked. The presence of a configured CI workflow does not mean that the current revision has passed it. To make that claim, inspect the specific GitHub Actions run and its result.

## 10 · Documentation, development and participation

This README is a short introduction to Kaskad, not a replacement for the full mathematical corpus. Use these resources to go deeper:

| Need | Where to go |
|---|---|
| All documents and their relationships | [Documentation map](docs/INDEX.md) |
| Rules for reading and changing documents | [Documentation guide](docs/DOCUMENTATION_GUIDE.md) |
| Research work plan | [Constructive research roadmap](docs/CONSTRUCTIVE_RESEARCH_ROADMAP.md) |
| Current development status | [Development Status](docs/DEVELOPMENT_STATUS.md) |
| Translation coverage | [Language Register](docs/LANGUAGE_REGISTER.md) |
| How to contribute | [CONTRIBUTING.md](CONTRIBUTING.md) |
| Attribution and material provenance | [Attribution and Rights](docs/ATTRIBUTION_AND_RIGHTS.md) |
| Citation metadata | [CITATION.cff](CITATION.cff) |
| License | [Apache-2.0](LICENSE) |

### Reading path

~~~mermaid
flowchart TD
    A["README · introduction"] --> B["Documentation map"]
    B --> C["Vyunenko Theory K3"]
    B --> D["Chumny Verdict Theory CV-1"]
    C --> E["Definitions · formulas · proofs"]
    D --> E
    E --> F["Research extensions"]
    F --> G["Applied mathematical models"]
    G --> H["Verification and reproducibility"]
~~~

### Language editions

[Русский](README.md) · [English](README.en.md) · [Українська](README.uk.md) · [简体中文](README.zh-CN.md).

Full translations of long research chapters are tracked separately. Their actual status is listed in the [Language Register](docs/LANGUAGE_REGISTER.md).

---

<p align="center">
  <strong>KASKAD</strong><br />
  <sub>Clear explanations. Precise definitions. Mathematical conclusions that can be checked.</sub>
</p>
