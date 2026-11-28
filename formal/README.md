# Machine-checked formalization

> Cascade Edition 1.0.0 · Status: no proof-assistant project has been adopted.

This directory is reserved for machine-checkable formalizations. At this revision Kaskad has no Lean, Coq, Agda, Isabelle, or SMT proof project. No theorem in the claim registry is marked as proof-assistant verified.

Human-readable proofs remain in the canonical theory and specialized chapters. The index at `docs/03-proofs-and-theorems/README.md` and the claim registry record proof references, assumptions, and dependencies; neither converts a written proof into a machine-checked one.

Exact reference computations and finite vectors belong under `src/kaskad_k3/` and `tests/vectors/`. Their results are bounded computational evidence, not formal proofs.

Before a proof assistant is selected, the project must specify the logic, foundational libraries and imported axioms, toolchain version, mapping from claim IDs to formal theorem names, formalized scope, reproducible local command, CI integration, and review policy. Empty placeholder files are not formalization.
