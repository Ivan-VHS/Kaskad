# K3 Scientific Consolidation Implementation Plan

> **Cascade Edition 1.0.0 · Scientific integrity:** Mathematical claims retain their declared status; presentation and computation do not substitute for proof.

**Goal:** Establish one canonical K3 core, a typed module map, an explicit claim/proof registry and reproducible CI checks without changing K3 mathematics.

**Architecture:** Keep the fundamental theory as the sole source of base semantics. Organize syntax, arithmetic, structural semantics and research extensions as focused modules. Record claims and evidence machine-readably; validate only concrete machine-checkable contracts.

**Tech Stack:** Markdown, JSON, Node.js 22 built-ins, GitHub Actions.

**Spec:** docs/superpowers/specs/2026-11-28-k3-scientific-consolidation-design.md

## Global Constraints

- B=1000=2^3*5^3; canonical coefficients are 0..999.
- k remains a lexical group separator; positional order and explicit zero positions are preserved.
- K3-PAD and K3-RAW remain distinct from the strict canonical language.
- Arithmetic equality, structural equality, expression-tree equality and operation-trace equality remain distinct.
- A finite computation is not a universal proof.
- No claim of independent review or proof-assistant verification without an artifact.

## Review Focus

- A final k denotes exactly one implicit low zero; additional zero positions must remain explicit.
- K3-PAD preserves token width while normalizing numeric coefficients.
- K3-RAW may preserve an explicitly written terminal zero group but is not a canonical standalone word.
- Negative or arbitrary raw coefficients require the Euclidean balance model, not the binary-carry theorem for two canonical nonnegative operands.
- The 4685 catalogue is five groups of parameterized instances, not 4685 independent discoveries.

### Task 1: Establish scientific governance

Create the consolidation map, mathematical design and this implementation plan. Import the scientific documentation standard and epistemic proof framework. The result must clearly state that governance documents are not additional K3 axioms.

### Task 2: Register mathematical claims and reference values

Create K3_CLAIM_REGISTRY.json and synchronize K3_REFERENCE_VECTORS.json. Import the focused composite-radix, K3-M and biprime chapters. Keep written proof, classical specialization, catalogue integrity, open hypothesis and application model as separate statuses. The 4685 entries must remain examples of master schemes, not independent discoveries.

### Task 3: Add reproducible contract validation

Create scripts/validate-k3-contract.mjs and .github/workflows/k3-contract-validation.yml. Validate exact examples with BigInt, registry identifiers and dependency references, K3 notation profiles, section number uniqueness and catalogue record integrity. Workflow output must state that these checks do not prove universal theorems.

### Task 4: Synchronize canonical documents

Update README.md and the canonical theory. Preserve all merged Pytyliki, OPlague and K3-X material. Resolve the duplicated numeric section identifier 67 without changing mathematical content: retain the tensor section as 67, renumber structural semantics to 68–74 and Pytyliki application material to 75. Synchronize the roadmap and expansion program.

### Task 5: Verify and prepare review

Inspect the resulting Git tree, run the validator locally through the available CI workflow, examine the actual workflow result and open a reviewable pull request. Do not merge without review.
