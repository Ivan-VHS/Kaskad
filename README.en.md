<a id="top"></a>

# Kaskad — positional numeral system with base 1000

**Kaskad** is a mathematical research project. Its main track, **Vyunenko Theory K3**, studies how integers can be written in groups of three decimal digits and what mathematical properties those representations have.

The goal of K3 is to define this notation precisely, describe operations on it, and examine its properties without treating computation as proof.

**Start here:** [main document — Vyunenko Theory K3](docs/VYUNENKO_THEORY.md) · [complete document map](docs/INDEX.md)

| What to know first | Current state |
|---|---|
| Project status | Research is ongoing. The finite positional core of K3 is defined; extensions have different levels of maturity. |
| Intended readers | Students, teachers, mathematicians, and developers interested in numeral systems, number theory, and exact arithmetic. |
| Original language | Russian. Short README editions are available in [English](README.en.md), [Ukrainian](README.uk.md), and [Chinese](README.zh-CN.md). |
| Theory translation | The main K3 theory document is currently maintained in Russian. See the [language register](docs/LANGUAGE_REGISTER.md) for translation status. |

## K3 in one minute

In ordinary decimal notation, the number 50,000,007 is written as **50 000 007**. K3 can write it in groups of three digits:

**50k0k7**

Here, **k** separates groups. It does not mean multiplication and is not itself a number.

| Notation | Groups, most significant first | Value |
|---|---:|---:|
| **7** | (7) | 7 |
| **1k** | (1, 0) | 1,000 |
| **50k0k7** | (50, 0, 7) | 50,000,007 |
| **50k7** | (50, 7) | 50,007 |
| **50k0k** | (50, 0, 0) | 50,000,000 |

The middle zero in **50k0k7** occupies its own position. Removing it changes the number: **50k7 = 50,007**. Zeros and separators must not be deleted or moved without a precise rule and a proof that the relevant property is preserved.

## Three key definitions

**1. Radix.** K3 uses the fixed radix

\[
B=1000=10^3=2^3\cdot5^3.
\]

The allowed coefficient values for one group are

\[
D_B=\{0,1,\ldots,999\}.
\]

Example: **50** is an allowed coefficient. Counterexample: **1000** cannot be a coefficient of one canonical group.

**2. Cascade vector.** A cascade vector is a finite sequence of coefficients

\[
a=(a_m,\ldots,a_1,a_0),\qquad a_i\in D_B,
\]

where index \(i\) identifies the power of the radix. The notation lists groups from most significant to least significant; the value is evaluated from the least significant position upward.

Example: **50k0k7** corresponds to the vector \((50,0,7)\). Counterexample: \((50,1000,7)\) is not a canonical cascade vector because 1000 is outside the allowed coefficient range.

**3. Numeric evaluation.** The evaluation function maps finite coefficient vectors to nonnegative integers:

\[
\operatorname{Val}_{K3}:
\bigcup_{m\ge0}D_B^{m+1}\to\mathbb N_0,
\qquad
\operatorname{Val}_{K3}(a)=\sum_{i=0}^{m}a_iB^i.
\]

Example:

\[
\operatorname{Val}_{K3}(50,0,7)
=50\cdot1000^2+0\cdot1000+7
=50\,000\,007.
\]

Counterexample to a wrong reading: **50k0k7** is not \(50\cdot7\), and **k** is not a multiplication sign.

**Keep three objects distinct:** the text string **50k0k7**, the vector \((50,0,7)\), and the integer \(50\,000\,007\). They are connected by a parsing rule, but they are not the same kind of object.

### Notation

| Symbol | Meaning | Defined in |
|---|---|---|
| \(B\) | Radix, \(1000\) | [K3 theory](docs/VYUNENKO_THEORY.md) |
| \(D_B\) | Allowed coefficients \(0,\ldots,999\) | [K3 theory](docs/VYUNENKO_THEORY.md) |
| \(k\) | Separator between adjacent groups | [Canonical syntax](docs/K3_CANONICAL_SYNTAX.md) |
| \(a_i\) | Coefficient of \(B^i\) | [K3 theory](docs/VYUNENKO_THEORY.md) |
| \(m\) | Index of the highest position | [K3 theory](docs/VYUNENKO_THEORY.md) |
| \(\operatorname{Val}_{K3}\) | Function evaluating a vector as a number | [K3 theory](docs/VYUNENKO_THEORY.md) |

## What K3 studies

K3 studies finite positional representations, their canonical forms, carries and borrows, arithmetic operations, divisibility, residues, and separate topological extensions.

The numeric arithmetic of K3 agrees with ordinary integer arithmetic: radix 1000 groups decimal digits in threes. The project does not claim to replace the integers or their arithmetic with a new number system. Its work focuses on a precisely defined notation, positional structure, preservation of zero groups, and separately formalized extensions. See the [classical mathematics crosswalk](docs/CLASSICAL_MATHEMATICS_CROSSWALK.md).

The repository also contains other research tracks. **CV-1**, for example, is a separate mathematical model with its own objects and definitions. It is not part of K3's axiom system merely because both are stored in this repository.

## Result status and limitations

Status belongs to each claim, not to the repository as a whole. The [K3 claim registry](docs/K3_CLAIM_REGISTRY.json) currently contains 52 entries:

| Registry entries | Count | Meaning |
|---|---:|---|
| Definitions | 13 | Objects and terms have been specified |
| Proofs awaiting independent review | 14 | A proof text is recorded; independent review is not recorded |
| Classical specializations awaiting independent review | 7 | Known mathematical results are used; review of the formulation and conditions is not recorded |
| Open hypotheses | 10 | They still need a proof or counterexample |
| Counterexamples | 5 | Concrete cases reject overly broad statements |
| Application models, not theorems | 2 | They describe applications and do not prove software correctness |
| Catalogue-integrity check awaiting CI | 1 | The check is not yet recorded as complete |

The registry currently records no independent reviews for these 52 entries. This does not mean every claim is false; it means independent review has not been documented.

**The project does not claim:**

- that every K3 extension has been proved;
- that computational tests prove statements about all integers;
- that all results have passed independent review;
- that the project has external academic accreditation or recognition;
- that application models are completed or verified software integrations.

Known limits, failed generalizations, and open questions are collected in the [counterexamples and boundaries catalogue](docs/K3_COUNTEREXAMPLES_AND_BOUNDARIES.md). The current limits of the computational work are described in the [development status](docs/DEVELOPMENT_STATUS.md).

## Where to go next

| To… | Read |
|---|---|
| Understand the full K3 theory | [Vyunenko Theory K3](docs/VYUNENKO_THEORY.md) |
| Learn the notation and parsing rules | [K3 canonical syntax](docs/K3_CANONICAL_SYNTAX.md) |
| Understand carry and borrow | [Cascade balance](docs/CHAPTER_II_CASCADE_BALANCE.md) |
| Compare K3 with classical mathematics | [Classical mathematics crosswalk](docs/CLASSICAL_MATHEMATICS_CROSSWALK.md) |
| Find a claim and its status | [Claim registry](docs/K3_CLAIM_REGISTRY.json) |
| See implementation and test boundaries | [Development status](docs/DEVELOPMENT_STATUS.md) |
| Browse the rest of the repository | [Complete document map](docs/INDEX.md) |

Document relationships:

~~~mermaid
flowchart TD
    A["README · introduction"] --> B["Document map"]
    B --> C["Vyunenko Theory K3"]
    C --> D["Canonical syntax"]
    C --> E["Arithmetic and proofs"]
    E --> F["Claim registry and counterexamples"]
    C --> G["Research extensions"]
    B --> H["Separate tracks, including CV-1"]
~~~

## Checking the reference implementation

The repository contains an auxiliary package in **src/kaskad_k3/**, tests in **tests/**, and reference data in **tests/vectors/**. The package uses the Python standard library and has no additional runtime dependencies. The CI configuration covers Python 3.11–3.14.

Run from the repository root:

~~~bash
PYTHONPATH=src python -m unittest discover -s tests -v
~~~

On Windows PowerShell:

~~~powershell
$env:PYTHONPATH = "src"
python -m unittest discover -s tests -v
~~~

The tests check specific cases for parsing and formatting, coefficient evaluation, normalization, arithmetic, division, divisibility, serialization, and reference vectors. They do not prove general theorems or verify every mathematical extension.

Check CI for the exact commit in [GitHub Actions](https://github.com/Ivan-VHS/Kaskad/actions). For the source main revision **eac38c147001ea554b3afdad2e659000ef1404e6**, GitHub returned no status-check records when this edition was prepared. This README therefore does not claim that the current main has passed CI.

## Authorship, citation, and participation

- **Author of the corpus and Vyunenko Theory K3:** [Ivan-VHS](https://github.com/Ivan-VHS). Roles, provenance, and authorship limits are described in [AUTHORS.md](AUTHORS.md) and the [attribution document](docs/ATTRIBUTION_AND_RIGHTS.md).
- **How to cite:** [CITATION.cff](CITATION.cff) and [CITATION.bib](CITATION.bib). No DOI or arXiv identifier has been assigned.
- **License:** the repository root declares Apache-2.0. No separate README-only text license is declared; third-party materials retain their own terms.
- **How to suggest a correction:** [CONTRIBUTING.md](CONTRIBUTING.md) or [GitHub Issues](https://github.com/Ivan-VHS/Kaskad/issues).
- **Record of confirmed errors:** [ERRATA](docs/ERRATA.md).

**Preparation transparency:** this README edition was prepared with AI assistance from repository documents. No independent review of this editorial edition is recorded. Mathematical definitions and statuses link to their primary sources. This is a documentation update, not a new mathematical result.

---

[Back to the top](#top)