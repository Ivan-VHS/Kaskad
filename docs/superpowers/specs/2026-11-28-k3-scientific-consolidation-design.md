# K3 Scientific Consolidation — Design

> **Cascade Edition 1.0.0 · Scientific integrity:** Mathematical claims retain their declared status; presentation and computation do not substitute for proof.

**Date:** 2026-11-28  
**Decision:** canonical core plus typed mathematical modules  
**Status:** approved direction; implementation is performed on an isolated review branch

## Intent

Consolidate Ivan-VHS/Kaskad into one coherent, auditable mathematical corpus. Preserve the fixed K3 semantics, retain the mathematical content already merged into main (including Pytyliki, OPlague and K3-X), and integrate the independently developed formula and two-channel modules without allowing them to silently redefine the core.

## Goals

- One canonical location for each base definition and semantic rule.
- Explicit types, domains, quantifiers, assumptions, proof dependencies and epistemic status for every registered claim.
- Distinguish mathematical proof, classical specialization, finite computational evidence, source-code provenance, empirical observation and open hypothesis.
- Keep K3-M, biprime geometry, K3-X, Pytyliki and OPlague as typed extensions or applications, not as extra axioms of base K3.
- Verify reference arithmetic, canonical notation, section identifiers, claim dependencies and catalogue integrity in CI.
- Preserve provenance and avoid destructive deletion in the first consolidation pass.

## Non-goals

- Do not change B=1000, D_B={0,...,999}, the meaning of k, canonical syntax, positional ordering or integer arithmetic.
- Do not claim global mathematical priority for a formula without a literature review.
- Do not upgrade a finite test, repository scan, source-code presence or CI result into a theorem.
- Do not claim proof-assistant verification when no proof-assistant artifact is supplied.
- Do not claim application code is implemented merely because a mathematical model describes it.

## Approaches

1. **Single monograph:** move every topic into one huge file. Rejected because it increases coupling and makes independent review difficult.
2. **Canonical core plus typed modules:** one theory, normative syntax/semantics, focused theorem chapters, application models, and a machine-readable claim registry. Selected because it keeps one source of truth while preserving independently reviewable results.
3. **Minimal link cleanup:** preserve all existing document roles without a claim registry or executable checks. Rejected because it cannot prevent status drift or duplicate section identifiers.

## Canonical architecture

- docs/VYUNENKO_THEORY.md: canonical base theory.
- docs/K3_CANONICAL_SYNTAX.md, docs/CHAPTER_II_CASCADE_BALANCE.md, docs/K3_STRUCTURAL_SEMANTICS_AND_ORDERED_SUMS.md: syntax, arithmetic normalization and structural semantics.
- docs/K3_COMPOSITE_RADIX_ARITHMETIC.md, docs/K3_ORIGINAL_CASCADE_FORMULAS.md, docs/K3_BIPRIME_GEOMETRY_AND_CARRY_LAW.md: focused mathematical results.
- docs/K3_MATHEMATICAL_FOUNDATIONS_AND_4685_INSTANCES.md, docs/K3_STRATIFIED_MATHEMATICS.md, docs/CROSS_REPOSITORY_MATHEMATICAL_SYNTHESIS_K3X.md: parameterized catalogue and research extensions with explicit status.
- docs/PYTYLIKI_TO_K3_MATHEMATICAL_FOUNDATION.md, docs/OPLAGUE_MATHEMATICAL_FOUNDATIONS.md: application models with provenance and type boundaries.
- docs/FORMAL_EPISTEMIC_AND_PROOF_FRAMEWORK.md, docs/SCIENTIFIC_MATHEMATICAL_DOCUMENTATION_STANDARD.md, docs/K3_CLAIM_REGISTRY.json, docs/K3_REFERENCE_VECTORS.json: governance and verification.

## Acceptance criteria

- The base K3 parameters are unchanged.
- Every numeric section identifier in the fundamental theory is unique.
- The claim registry has unique IDs, valid sources, valid dependency IDs and a proof reference for every theorem claim.
- All expected reference vectors are recomputed exactly with BigInt.
- The 4685-record catalogue has 937 unique sequential IDs per family; all 937 CRT records reconstruct their specified residues exactly.
- CI validates the listed machine contracts and states clearly that these checks do not prove universal theorems.
- README, roadmap, expansion program and canonical theory point to the same module map.
- No pre-existing mathematical result is deleted in this pass.

## Known limitation

The documents include written proofs, but this branch does not create machine-checked Lean/Coq/Isabelle proofs or an independent external mathematical review. The registry records that status instead of implying it.
