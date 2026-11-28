# Kaskad

[简体中文](README.zh-CN.md) · [English](README.en.md) · [Русский](README.md) · [Українська](README.uk.md)

A mathematical research corpus for the Vyunenko Theory of K3. The repository
supports precise definitions, mathematical models, proofs, counterexamples,
and the study of connections with established mathematical theories.

## Citation

As of this revision, the repository does not register a separate journal
publication, preprint, DOI, or published set of experimental results. This
README does not claim alignment with an unspecified paper. For reproducible
citation, identify the exact Git commit rather than citing a moving branch.

BibTeX entry for the repository:

~~~bibtex
@misc{vyunenko_kaskad_2026,
  author       = {Vyunenko, Ivan},
  title        = {Kaskad: Mathematical Research Corpus for the Vyunenko Theory of K3},
  year         = {2026},
  howpublished = {GitHub repository},
  url          = {https://github.com/Ivan-VHS/Kaskad},
  note         = {Cite a specific Git revision; no DOI is registered}
}
~~~

## Contents

- [Purpose and scope](#purpose-and-scope)
- [The K3 mathematical model](#the-k3-mathematical-model)
- [Epistemic status of claims](#epistemic-status-of-claims)
- [Research method](#research-method)
- [Documents and repository structure](#documents-and-repository-structure)
- [Reproducible validation](#reproducible-validation)
- [Data and experimental results](#data-and-experimental-results)
- [Metrics and hardware requirements](#metrics-and-hardware-requirements)
- [License and attribution](#license-and-attribution)
- [Contributing and reporting issues](#contributing-and-reporting-issues)

## Purpose and scope

Kaskad is a permanent mathematical research corpus. Its primary subject is the
Vyunenko Theory of K3 and rigorously defined mathematical extensions. The
research cycle is:

**question → classical mathematical context → definition → model → proof or
counterexample → exact or numerical checks of consequences → independent
review → documented result.**

Kaskad is not an operating-system, programming-language, IDE, driver,
application, or general-purpose software-platform project. Relations with
other repositories are permitted only as mathematical relationships:
shared definitions, mappings, models, provable consequences, and analogies
whose limits are stated explicitly.

Code and computational tools may be used as supporting instruments for exact
arithmetic, finite verification, reproducible experiments, document checks,
or formal verification. Computation does not replace mathematical proof and
does not, by itself, turn a conjecture into a theorem.

## The K3 mathematical model

The base system fixes the composite radix

\[
B=1000=10^3=2^3\cdot5^3.
\]

A canonical cascade is a finite coefficient vector

\[
a=(a_m,\ldots,a_1,a_0),\qquad a_i\in\{0,1,\ldots,999\},
\]

with value given by the polynomial evaluation

\[
\operatorname{Val}_{K3}(a)=\sum_{i=0}^{m}a_iB^i.
\]

Index \(i=0\) denotes the least significant group. In the textual notation,
groups are separated by the symbol \(\mathtt{k}\). The symbol \(\mathtt{k}\)
is a lexical group delimiter, not a digit, multiplier, or multiplication
operator. The positional shift operator \(S_B\) is defined separately.

| Parameter | Canonical value |
|---|---|
| System | K3 |
| Radix | \(B=1000=2^3\cdot5^3\) |
| Canonical group range | \(0\ldots999\) |
| Group separator | \(\mathtt{k}\) |
| Non-negative value domain | \(\mathbb N_0\) |
| Signed extension | \(\mathbb Z\) |
| Canonical zero word | \(0\) |
| Empty word | Not a canonical representation |

Canonical non-negative cascades represent \(\mathbb N_0\); the signed
extension is treated separately for \(\mathbb Z\). Since the radix is
composite, properties of prime \(p\)-adic bases must not be transferred to
K3 without proof. At level \(r\), the relevant decomposition is

\[
\mathbb Z/1000^r\mathbb Z
\cong
\mathbb Z/2^{3r}\mathbb Z\times\mathbb Z/5^{3r}\mathbb Z,
\]

and the corresponding completion is described as the topological ring
\(\mathbb Z_2\times\mathbb Z_5\), not as a field.

## Epistemic status of claims

The documents distinguish definitions, postulates, assumptions, lemmas,
theorems, corollaries, conjectures, counterexamples, exhaustive finite
verification, computational and empirical observations, numerical estimates,
heuristics, conditional results, rejected formulations, and research
programmes.

An item in a roadmap is not thereby a proved result. Finite enumeration
supports a claim only over the fully enumerated finite domain. An empirical
pattern or numerical estimate is not a universal proof. Textual proofs must
not be described as machine-formalized unless the corresponding formalization
has been published.

## Research method

~~~mermaid
flowchart TD
    A[Mathematical question] --> B[Classical context and notation]
    B --> C[Precise definition and domain]
    C --> D[Formal model]
    D --> E{Proof available?}
    E -->|Yes| F[Theorem and proof]
    E -->|No| G[Conjecture, counterexample, or open problem]
    F --> H[Exact or numerical checks of consequences]
    G --> H
    H --> I[Independent review and status assignment]
    I --> J[Documentation]
~~~

This diagram describes the research method. It does not prove a theorem and
is not a figure from an unspecified publication.

## Documents and repository structure

### K3 foundations

- [Vyunenko Theory of K3 — foundational specification](docs/VYUNENKO_THEORY.md)
- [Cascade balance, normalization, and invariants](docs/CHAPTER_II_CASCADE_BALANCE.md)
- [Canonical K3 syntax and formal grammar](docs/K3_CANONICAL_SYNTAX.md)
- [Canonical foundations, algebra, and semantics](docs/K3_CANONICAL_FOUNDATIONS_AND_ALGEBRA.md)
- [Composite-radix arithmetic in K3](docs/K3_COMPOSITE_RADIX_ARITHMETIC.md)
- [Classical mathematics and terminology crosswalk](docs/CLASSICAL_MATHEMATICS_CROSSWALK.md)
- [Reference of fundamental mathematical principles](docs/MATHEMATICAL_FOUNDATIONS_REFERENCE.md)

### Methodology and research programme

- [Rules for developing the mathematical theory](docs/THEORY_DEVELOPMENT_RULES.md)
- [Constructive K3 research roadmap](docs/CONSTRUCTIVE_RESEARCH_ROADMAP.md)
- [Computational research foundation](docs/RESEARCH_COMPUTATIONAL_FOUNDATION.md)
- [Map of mathematical disciplines and dependencies](docs/MATHEMATICAL_DOMAIN_ARCHITECTURE.md)
- [Formal, epistemic, and proof methodology](docs/FORMAL_EPISTEMIC_AND_PROOF_FRAMEWORK.md)
- [Computational research architecture](docs/COMPUTATIONAL_RESEARCH_ARCHITECTURE.md)
- [Experimental, empirical, and statistical methodology](docs/EXPERIMENTAL_EMPIRICAL_METHOD.md)
- [Research programme roadmap](docs/RESEARCH_PLATFORM_ROADMAP.md)
- [Reproducible research record template](docs/RESEARCH_RECORD_TEMPLATE.md)
- [Recursive K-suffixes: research programme and formal review](docs/K_SUFFIX_SPECULATIVE_RESEARCH_REVIEW.md)
- [Cooperative formula synthesis: proportions and compatibility](docs/COOPERATIVE_VITRUVIAN_FORMULA_SYNTHESIS.md)

### Quality contracts and validation

- [Project contract](project-contract.json)
- [Mathematical quality contract](quality-mathematics.json)
- [Computational quality contract](quality-computation.json)
- [Project evolution contract](engineering-evolution.v1.json)
- [Research foundation validator](scripts/validate-foundation.mjs)
- [GitHub Actions: foundation validation](.github/workflows/foundation-validation.yml)

## Reproducible validation

The current CI checks consistency of project and mathematical contracts,
canonical K3 semantics, required documents, and relative README links. This is
a documentation-and-contract check, not machine verification of mathematical
proofs and not a test suite for a mathematical computation kernel.

Local validation requires Node.js 22, the major version selected by the
current CI workflow. The script uses Node.js built-in modules; no package
installation is required.

~~~bash
git clone https://github.com/Ivan-VHS/Kaskad.git
cd Kaskad
node --version
node scripts/validate-foundation.mjs
~~~

Expected result when the contracts and local links are valid:

~~~text
Kaskad mathematical scope, K3 notation, algebraic semantics, arithmetic contracts and local links: OK
~~~

The workflow uses a GitHub-hosted runner labelled ubuntu-latest,
actions/checkout v4, and actions/setup-node v4. This documents the current
CI configuration; it is not a fully locked environment for a numerical
research experiment. Research computations should record exact tool
versions, source revision, precision and rounding settings, input data and
SHA-256 checksums, plus the PRNG and seed for stochastic procedures.

## Data and experimental results

The inspected repository tree contains no published dataset, archive of
experimental measurements, benchmark tables, or checksums for such data. The
primary work is mathematical and theoretical. Therefore, this README does
not invent dataset links, training results, run counts, or statistical
intervals.

Any future computational or empirical result should include at least:
experiment identifier, theory version, Git revision, algorithm version,
environment, input checksum, parameters, precision and rounding mode, PRNG
and seed, timestamp, output artifacts, and verification status. Raw data,
derived data, and analysis results should be stored separately.

## Metrics and hardware requirements

For theoretical results, the primary criteria are correctness of definitions,
completeness of assumptions, validity of proofs, and accuracy of classical
correspondences. Units must be stated wherever physical or numerical
quantities are introduced.

This revision reports no hardware measurements, model training, inference
time, algorithm performance, or comparison against SOTA and baseline
methods. Hardware specifications are not applicable to the theoretical
results; future computational experiments must publish hardware details
together with the relevant protocol.

## Integrated mathematical extensions (2026-11-28)

The Kaskad corpus now includes the ordered K3 arithmetic monograph, directed positional composition, the two-channel \(2^3\times5^3\) geometry of radix 1000, and the ten-layer K3-M profile morphology.
Chumny Verdict CV-1 1.2.0 adds the idempotent zero-result map \(P_c\), while retaining the raw integer evaluation and ordinary equality. See [the canonical specification](docs/CHUMNY_VERDICT_THEORY.md).
KTM-1 formalizes the twenty research stages as independent formal, computational, empirical, review, publication and application axes rather than a linear truth ladder. See the [knowledge-transition model](docs/MATHEMATICAL_KNOWLEDGE_TRANSITION_MODEL.md).

Applied mathematical sources are documented separately: [DAK](docs/DAK_SYSTEM_MATHEMATICS.md), [Reaper](docs/REAPER_MATHEMATICAL_FOUNDATIONS.md), and [VentuSample audio mathematics](docs/VYUNENKO_AUDIO_MATHEMATICS.md). These are mathematical models and crosswalks, not claims that their source projects are implemented in Kaskad.

See the [CRT completion and infinite cascades](docs/K3_CRT_IDEMPOTENTS_AND_INFINITE_CASCADES.md), the [scientific documentation standard](docs/SCIENTIFIC_MATHEMATICAL_DOCUMENTATION_STANDARD.md), the [full document register](docs/INDEX.md), and the [language register](docs/LANGUAGE_REGISTER.md). The canonical K3 radix, coefficient domain, separator and positional-zero semantics are unchanged.

## License and attribution

The repository contains the [Apache License 2.0](LICENSE). Separate dataset
or model licences are not declared in the current tree. Rights and terms for
third-party materials must be identified separately.

Use the BibTeX entry above for citation and record the commit hash that
corresponds to the document version used. Do not provide a DOI, SWHID, or
archived-version identifier until one has actually been registered.

## Contributing and reporting issues

For a mathematical issue, include the exact document and section, the
statement under discussion, all assumptions, and either a minimal
counterexample or a checkable derivation. For a computational issue, include
the Git revision, input data or a safe minimal example, parameters, exact
environment, and observed result.

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution and review guidance and [SECURITY.md](SECURITY.md) for vulnerability reporting. Submit mathematical suggestions with explicit assumptions and checkable reasoning; do not promote a conjecture to a theorem without a separate proof.
