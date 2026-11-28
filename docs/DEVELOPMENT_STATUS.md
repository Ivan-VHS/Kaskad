# Kaskad Development Status

> **Cascade Edition 1.0.0 · Status record.** This document reports bounded repository evidence and does not certify the whole mathematical corpus.

> **Document type:** repository status and verification-boundary record.  
> **Revision date:** 2026-11-28.  
> **Initial inspected main revision:** `e68fbb1e84041eeb175b5feb63dbbda7adc9c910`.  
> **Status:** finite reference implementation and tests are present; this record does not certify current-main CI.  
> **References:** [scientific documentation standard](SCIENTIFIC_MATHEMATICAL_DOCUMENTATION_STANDARD.md), [reference implementation](REFERENCE_IMPLEMENTATION.md), [project contract](../project-contract.json), [60-point scientific review gate](SCIENTIFIC_REVIEW_GATE.md).

This document reports repository evidence, not mathematical proof. Its statements are tied to the inspected tree and must be refreshed when source, tests or workflows change.

## 1. Repository evidence

The inspected revision contains:

- the auxiliary package in `src/kaskad_k3/`;
- unit and conformance tests in `tests/`;
- shared vectors in `tests/vectors/k3-vectors.json`;
- the K3 reference workflow in `.github/workflows/ci.yml`;
- the foundation-validation workflow in `.github/workflows/foundation-validation.yml`.

The reference workflow compiles the package and tests, then runs unittest discovery on Python 3.11, 3.12, 3.13 and 3.14. A configured workflow is not evidence of a passing run for every revision.

## 2. Reference-core surface

| Area | Present in source | Verification boundary |
|---|---|---|
| Canonical codec | Strict parser and formatter for signed finite K3 integers | Canonical examples, malformed words and round trips |
| Coefficients | Exact evaluation and group extraction | Integer comparisons and shared vectors |
| Normalization | Carry/borrow for finite integer coefficient vectors | Finite test domains and value-preservation assertions |
| Arithmetic | Addition, subtraction, multiplication and comparison | Differential checks on tested inputs |
| Radix operations | Division by 1000, residues and low-group access | Boundary and conformance cases |
| Divisibility and metric | Divisibility depth, congruence and exact rational distance | Finite tests, not proof of every general theorem |
| Serialization | Versioned JSON round trip and shape validation | Tested valid and invalid payloads |
| Structural APIs | Explicit PAD/RAW parsing and positional shift | Documented cases, not every external integration |

The source and tests are inspectable artifacts. Their presence does not prove conformance with every statement in the mathematical corpus.

## 3. Current verification status

The combined GitHub commit-status query for inspected revision `e68fbb1e84041eeb175b5feb63dbbda7adc9c910` returned no status entries. This record therefore reports current-main CI as **not verified**, not passed or failed.

Older run identifiers recorded for revision `2fc0468572926a672167edd219092174e15fccd2` are historical evidence for that exact revision only. They must not be transferred to another commit or treated as certification of the unrestricted theory.

To verify a revision, inspect its Actions runs and record the exact commit, workflow, matrix and result. Locally:
```bash
PYTHONPATH=src python -m unittest discover -s tests -v
```

## 4. Mathematical status

### 4.1. Status of the whole corpus

Kaskad is a mathematical research corpus with several independent theories and extensions at different stages of maturity. There is no single mathematical status that can be assigned to the repository as a whole. The status belongs to a specific claim, in a specific theory, under explicitly stated assumptions and on an identifiable document revision.

The repository-native Institute of Self-Developing Mathematics Kaskad is an organizational model for research, review, provenance and continuous correction. It is not a legal entity or accredited academic institution, and this record does not claim external scientific recognition. See the [Institute Charter](KASKAD_INSTITUTE_CHARTER.md).

The unity of the institute does not merge the axiomatics of K3, CV-1 or other research tracks. Each theory retains its own objects, language, assumptions and proof obligations. Applied mathematical models remain distinct from claims about the correctness of their source implementations.

### 4.2. Independent status axes

Every substantial result is assessed on independent axes. A value on one axis cannot be used as evidence for another.

| Axis | What is recorded | What it does not establish |
|---|---|---|
| Mathematical | Idea, definition, open hypothesis, proof written, independent proof review, formal proof checking | Test success, implementation completeness or external recognition |
| Computational | Not run, procedure specified, tests defined, passed on an exact commit, exhaustive verification on a finite domain, independent reproduction | A universal theorem outside the exhausted finite domain |
| Implementation | Not implemented, specified only, partial, implemented, conformance checked in a stated scope | Mathematical truth of the abstract specification |
| Empirical | Not applicable, not executed, pilot evidence, reproducible experiment, independent replication | A universal mathematical theorem without proof |
| External scientific reception | Not submitted, public preprint, submitted for review, peer-reviewed publication, independent use or citation, documented external assessment | Automatic correctness of every claim in a publication |
| Legal / institutional | Not claimed, externally documented legal status, externally documented accreditation | Any status inferred from the repository name or its own charter |

“Not applicable” and “not verified” are different states. Missing evidence is not positive evidence. A single percentage or ranking of “scientificity” is not used.

### 4.3. Existing K3 claim registry

The K3 registry already distinguishes definitions, extension postulates, proofs awaiting independent review, classical specializations awaiting review, hypotheses, application models, counterexamples and catalogue-integrity checks. Its vocabulary remains authoritative for the records already stored there.

In particular:

- **proof_written_pending_independent_review** means that a proof is recorded but its independent review is not registered.
- **classical_specialization_pending_independent_review** does not assert historical priority or independent validation.
- **catalogue_integrity_verified_by_ci** certifies only the declared catalogue-integrity checks, not the truth of every mathematical claim in that catalogue.
- **open_hypothesis** remains open until an adequate proof or counterexample changes its status.
- **application_model_not_theorem** prevents an application model from inheriting theorem status from the source domain.
- **counterexample** preserves a concrete witness against a precisely identified rejected claim.

New status values require a coordinated update of the registry schema, documentation, validation and migration rules. Existing identifiers and history must not be silently rewritten.

### 4.4. Mathematical status of the K3 core

The canonical finite positional construction is specified by radix \(B=1000\), canonical coefficients in \(0,\ldots,999\), explicit group positions and the polynomial evaluation map. The primary source is [Vyunenko Theory K3](VYUNENKO_THEORY.md), supported by the canonical syntax, arithmetic, classical crosswalk and claim registry.

The theory document contains proof texts and a growing set of extensions. That fact does not mean every extension has been independently reviewed, formally verified by a proof assistant or accepted as a novel result by the external mathematical community. Each theorem must be assessed through its own claim record, assumptions, dependencies and evidence.

CV-1 and applied mathematical models have separate mathematical objects and separate maturity records. Their presence in the same repository does not raise or lower the status of K3.

### 4.5. Computational and implementation boundary

The reference package is a supporting exact-integer instrument, not the definition of K3 and not a proof assistant.

- A theorem requires a complete mathematical statement, stated assumptions and a valid proof.
- A unit test confirms only the cases actually executed.
- Exhaustive enumeration supports a universal finite-domain claim only when the entire stated domain is exhausted and the checked predicate is exactly the theorem's predicate.
- A successful CI run validates the checks included in that workflow on that exact commit; it does not prove arbitrary mathematics.
- A source implementation can be called conformant only against a defined specification and a bounded verification scope.
- The inverse-limit completion, CRT topological ring, probability results and infinite structures retain their own mathematical proof obligations independently of package features.

### 4.6. Historical baseline verification snapshot

At the beginning of this governance change, the inspected baseline commit was 5ded82cd197e866aecfe93b7bec58f4c90032186. The combined commit-status lookup returned no status entries, and the pull-request workflow lookup for that historical commit returned no runs. This is a historical baseline observation only; it is **not** a statement about the current main branch or the current pull request. An empty result is not evidence of either a successful or a failed run.

Any later CI statement must name the exact commit SHA, workflow, job or matrix, execution time and actual conclusion. Historical results must remain attached to the commit on which they ran.

### 4.7. Conditions for claims of scientific recognition

A public repository, a preprint, a configured workflow, an extensive theory document or an internal pull request does not establish peer-reviewed publication or recognition by a mathematical community.

A claim of external review must identify the independent reviewer or venue, date, exact work reviewed, scope of assessment and available report or publication record. A claim of peer-reviewed publication requires a verifiable publication and its actual review status. A claim of independent reproduction requires evidence produced outside the original authoring process.

The appropriate current description is: **an active mathematical research corpus with a formally specified K3 core, independent research tracks, proof texts and open obligations at mixed levels of maturity**. No blanket claim that the entire corpus is externally recognized or fully verified is made.


## 5. Open engineering work

1. Maintain traceability from functions and vectors to canonical definitions and theorem identifiers.
2. Check parser, PAD/RAW behavior, normalization and serialization against the current specifications.
3. Expand boundary and property coverage where the finite domain and invariant are explicit.
4. Record CI results against the exact head revision; do not reuse historical statuses.
5. Independently review the implementation or compare it with a second implementation before treating it as a release-grade conformance oracle.
6. Keep proofs, computational evidence and application contracts separately versioned.

## 6. Completion rule

The reference-core milestone remains **in progress** until current-revision CI evidence, independent review, complete contract traceability and remaining interface obligations are recorded. The mathematical research programme remains open.
