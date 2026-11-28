# Kaskad Development Status

> **Document type:** repository status and verification-boundary record.  
> **Revision date:** 2026-11-28.  
> **Inspected main revision:** `e68fbb1e84041eeb175b5feb63dbbda7adc9c910`.  
> **Status:** finite reference implementation and tests are present; this record does not certify current-main CI.  
> **References:** [scientific documentation standard](SCIENTIFIC_MATHEMATICAL_DOCUMENTATION_STANDARD.md), [reference implementation](REFERENCE_IMPLEMENTATION.md), [project contract](../project-contract.json).

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

The package is a supporting reference instrument, not the definition of K3 and not a proof assistant.

- A theorem requires a complete statement, assumptions and mathematical proof.
- A unit test confirms behavior only for executed inputs.
- Exhaustive enumeration proves a claim only over the finite domain actually exhausted.
- General results about completion, ultrametrics, probability and infinite structures retain their own proof obligations.
- The inverse-limit completion and CRT topological ring are mathematical extensions; their specification must not be confused with package implementation.

## 5. Open engineering work

1. Maintain traceability from functions and vectors to canonical definitions and theorem identifiers.
2. Check parser, PAD/RAW behavior, normalization and serialization against the current specifications.
3. Expand boundary and property coverage where the finite domain and invariant are explicit.
4. Record CI results against the exact head revision; do not reuse historical statuses.
5. Independently review the implementation or compare it with a second implementation before treating it as a release-grade conformance oracle.
6. Keep proofs, computational evidence and application contracts separately versioned.

## 6. Completion rule

The reference-core milestone remains **in progress** until current-revision CI evidence, independent review, complete contract traceability and remaining interface obligations are recorded. The mathematical research programme remains open.
