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

Distinguish definitions, postulates, assumptions, lemmas, theorems,
corollaries, conjectures, counterexamples, finite exhaustive verification,
computational observations, and empirical results. A test run is not a proof.
A finite enumeration proves a statement only when the domain is finite,
fully exhausted, and matches the exact claim.

Every theorem needs explicit domains, quantifiers, assumptions, dependencies,
and a complete proof. Every new construction needs a signature, semantics,
examples, edge cases, and a classical mathematical crosswalk.

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
