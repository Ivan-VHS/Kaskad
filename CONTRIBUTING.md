# Contributing to Kaskad

Kaskad is a permanent mathematical research repository. Its primary output is
precise mathematical work: definitions, structures, proofs, conjectures,
counterexamples, and rigorously delimited connections between disciplines.
Executable tools are auxiliary instruments only.

## Canonical K3 contract

- Radix: exactly 1000.
- Factorization: 1000 = 2^3 * 5^3.
- Canonical coefficient range: 0 through 999.
- Group separator: lowercase k.
- Numeric radix symbol: B; k is only a lexical group delimiter.
- Value: sum(a[i] * B^i).
- Raw coefficient vectors may contain arbitrary integers.
- Text groups are shown most-significant first.
- In-memory coefficient vectors are least-significant first.
- A terminal k denotes exactly one omitted least-significant zero group.
- The signed extension uses a leading minus and has one representation of zero.

Do not introduce another radix, mixed-radix behavior, fractional groups, or a
new meaning for k without a reviewed, versioned change to the theory.

## Mathematical status

Use the [Kaskad Institute Charter](docs/KASKAD_INSTITUTE_CHARTER.md) and the [current mathematical status record](docs/DEVELOPMENT_STATUS.md#4-mathematical-status).

Keep these axes separate:

- Mathematical: definition, conjecture, proof written, independent proof review, formal proof checking.
- Computational: procedure specified, executed on an exact commit, finite exhaustive verification, independent reproduction.
- Implementation: not implemented, specified only, partial, implemented, conformance checked in a stated scope.
- External reception: preprint, submitted work, peer-reviewed publication, independent use or citation.
- Institutional/legal: only externally documented registration or accreditation; repository naming does not create it.

A test run is not a proof. A finite enumeration proves a universal claim only when its entire finite domain is exhausted and the checked predicate matches the claim. CI validates only the checks actually executed on the identified commit. An application model does not inherit theorem status from the theory to which it is mapped.

Every theorem needs explicit domains, quantifiers, assumptions, dependencies and a complete proof. Every new construction needs a signature, semantics, examples, edge cases and a classical mathematical crosswalk. Missing independent review must remain visible; an author cannot certify their own work as independently reviewed.

## Institute research workflow

Kaskad is organized as a repository-native virtual research institute. The charter is an internal governance model, not a claim of legal incorporation, academic accreditation or external scientific recognition.

Before proposing a substantial research change:

1. Identify the primary theory and its canonical source. Do not merge independent axiomatics.
2. State the exact question, domain, assumptions, expected result and possible counterexample.
3. Search for classical definitions and results before making a novelty or priority claim.
4. Add or update stable claim IDs, dependencies and proof obligations.
5. Separate mathematical proof from computational, implementation and empirical evidence.
6. Request independent review for any status that claims independent verification.
7. Update the primary document, claim registry, schemas, index, language register and dependent material in the same coordinated change where applicable.

A GitHub pull request review is useful project review, but it is not automatically academic peer review. Preserve the reviewer, date, scope, exact revision and report for every independent assessment. Use the [main consolidation protocol](docs/KASKAD_CENTRAL_CONSOLIDATION.md) when a change affects multiple documents or research tracks.


## Supporting reference package

The kaskad_k3 package is a small, local, exact-integer reference instrument.
It has no runtime dependencies outside the Python standard library. The
machine-readable conformance corpus is stored in tests/vectors/.

Run checks from the repository root:

    PYTHONPATH=src python -m unittest discover -s tests -v
    PYTHONPATH=src python -m compileall -q src tests

On Windows PowerShell:

    $env:PYTHONPATH = "src"
    python -m unittest discover -s tests -v

Behavior changes must preserve value invariants and include canonical,
noncanonical, boundary, signed, carry/borrow, serialization and arithmetic
tests as applicable. Update the mathematical specification before treating a
changed behavior as canonical.

## Pull requests

Use focused branches and Conventional Commit titles, for example:

- docs: formalize the completion construction
- feat: add a K3 residue operation
- test: add canonical K3 conformance vectors
- fix: reject a malformed terminal group

Describe the mathematical rule, implementation change (if any), evidence,
tests, and remaining proof obligations. Do not present a software milestone as
a mathematical theorem or as completion of the overall research programme.
