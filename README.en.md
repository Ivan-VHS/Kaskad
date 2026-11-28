# Kaskad — Vyunenko Theory K3

[Русский](README.md) · [Українська](README.uk.md) · [简体中文](README.zh-CN.md)

> **Kaskad** is a mathematical research corpus for the Vyunenko Theory K3. Its core is a finite positional system with radix 1000; extensions study arithmetic, representation structure, divisibility and related mathematical spaces. Mathematical theory, computational checks and software implementation are kept distinct.

## 1. Mathematical core

Fix
[
B=1000=10^3=2^3cdot5^3,qquad D_B={0,1,ldots,999}.
]

A canonical cascade is a finite vector
[
a=(a_m,ldots,a_1,a_0),qquad a_iin D_B,
]
where (a_0) is the least significant position. Its value is
[
operatorname{Val}_{K3}(a)=sum_{i=0}^{m}a_iB^i.
]

A positive value has a nonzero leading coefficient; zero has the unique form ((0)). Signed values are a separate extension.

## 2. Position is semantic

The symbol `k` separates adjacent groups. It is not a digit, radix, multiplier or multiplication operator. Only a `k` boundary advances to the next power of 1000; the number of decimal digits inside a group does not create another position.

| Word | Coefficients, most to least significant | Value |
|---|---:|---:|
| `1k` | ((1,0)) | (1,000) |
| `50k0k7` | ((50,0,7)) | (50,000,007) |
| `50k0k` | ((50,0,0)) | (50,000,000) |

A terminal `k` denotes exactly one omitted zero least-significant group. Explicit zero groups also retain their positions. Do not delete, move or merge zeros or separators without a proof of equivalence: equal depth does not imply equal value.

## 3. Input modes and equality

- **Canonical mode** accepts only words admitted by the strict K3 grammar.
- **K3-PAD** is an explicitly selected import and normalization mode for non-canonical groups; it does not alter strict parsing.
- **K3-RAW** preserves original operand structure and order for structural analysis.

Text, coefficient structure, numeric value, expression trees and operation traces have distinct equality relations. Equal results do not make source words or computation histories identical. The positional shift operator (S_B) is defined separately from `k`.

## 4. Arithmetic and extensions

Carry and borrow follow one balance law:
[
c_i+t_i=1000t_{i+1}+r_i,qquad 0le r_ile999.
]
Admissible normalization preserves the weighted value; proofs and conditions are in the specialized chapters.

For the composite radix, the classical Chinese remainder theorem gives, for (rge1),
[
mathbb Z/1000^rmathbb Zcong
mathbb Z/2^{3r}mathbb Z	imesmathbb Z/5^{3r}mathbb Z.
]
The corresponding completion is the ring (mathbb Z_2	imesmathbb Z_5), not a field. CRT and infinite cascades are a separate topological extension; finite K3 semantics remain unchanged.

## 5. Scope and context

K3 defines an exact representation of integers and studies its positional, algebraic, divisibility, combinatorial and topological properties. Measurements, physical units, statistical data, graphs and software entities require their own types, units and explicit mappings; they do not automatically become K3 numbers.

Arithmetic on K3 values agrees with classical integer arithmetic. The distinct contribution lies in the positional construction, canonical language and investigated structural extensions.

## 6. Claim status

Definitions introduce objects; postulates fix conventions; theorems require proofs; classical results retain sources and conditions. A test supports only the inputs actually checked, not a general theorem. A specification or conjecture is not an implementation fact or an established result.

## 7. Documentation and checks

- [Documentation map](docs/INDEX.md) · [Documentation guide](docs/DOCUMENTATION_GUIDE.md)
- [Canonical theory](docs/VYUNENKO_THEORY.md) · [Foundations and algebra](docs/K3_CANONICAL_FOUNDATIONS_AND_ALGEBRA.md)
- [Syntax](docs/K3_CANONICAL_SYNTAX.md) · [Cascade balance](docs/CHAPTER_II_CASCADE_BALANCE.md)
- [CRT and infinite cascades](docs/K3_CRT_IDEMPOTENTS_AND_INFINITE_CASCADES.md) · [Classical crosswalk](docs/CLASSICAL_MATHEMATICS_CROSSWALK.md)
- [Development status](docs/DEVELOPMENT_STATUS.md) · [Scientific documentation standard](docs/SCIENTIFIC_MATHEMATICAL_DOCUMENTATION_STANDARD.md)

Run the reference checks locally:
```bash
PYTHONPATH=src python -m unittest discover -s tests -v
```
CI is configured for Python 3.11–3.14. A check result applies only to its specific Actions run and Git revision.

## Citation and license

Cite a specific Git revision. Metadata: [CITATION.cff](CITATION.cff) and [CITATION.bib](CITATION.bib). License: [Apache-2.0](LICENSE).

## Authorship

Primary author of the Kaskad research corpus and Vyunenko Theory K3: **Ivan-VHS**. Canonical record: [AUTHORS.md](AUTHORS.md); citation metadata: [CITATION.cff](CITATION.cff) and [CITATION.bib](CITATION.bib). Third-party authorship and provenance are governed by [docs/ATTRIBUTION_AND_RIGHTS.md](docs/ATTRIBUTION_AND_RIGHTS.md).
