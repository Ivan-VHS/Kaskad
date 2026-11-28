# Formal verification sources

This directory is reserved for machine-checkable proof sources and their reproducible checker configuration.

## Current status

The inspected Kaskad repository tree does not currently declare a Lean, Coq, Agda or other proof-assistant project, proof source files, or a proof-check workflow. Therefore this directory records the boundary only; it does **not** claim that any theorem is machine-verified.

Human-readable statements and arguments belong under `docs/proofs/`. Exact reference computations and finite vectors belong under `src/kaskad_k3/` and `tests/vectors/`. Neither becomes a formal proof merely by being stored here or run in CI.

When a proof assistant is adopted, add the actual source project, pinned toolchain/version, dependency lock, one documented check command, and a CI job that executes that command. Record the checker and revision for each verified theorem. Do not add pseudocode or placeholder theorem files.
