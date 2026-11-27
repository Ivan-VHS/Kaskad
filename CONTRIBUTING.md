# Contributing to Kaskad

Kaskad develops the Vyunenko Theory of K3 cascade numbers. Contributions must
preserve the fixed base, canonical syntax, exact integer semantics, and the
distinction between definitions, proved results, conjectures, and research plans.

## Mathematical contract

The base system is fixed at:

- radix: 1000;
- coefficient range: 0 through 999;
- group separator: k;
- finite positional value: sum of coefficient[i] times 1000 raised to i;
- coefficient vectors are indexed from the least-significant group in code;
- a terminal k in canonical text denotes exactly one omitted zero group.

Do not silently introduce another radix, mixed-radix behavior, fractional groups,
or a new meaning for k. Any change to the mathematical semantics requires an
explicit versioned specification change and updates across the theory, syntax,
crosswalk, reference implementation, and tests.

## Status discipline

Every mathematical statement added to the repository must be identified as one
of the following where relevant:

1. definition or convention;
2. postulate;
3. theorem with a complete proof;
4. corollary with its dependency;
5. conjecture or open problem;
6. computational observation or finite test result.

Passing tests is evidence about the reference implementation, not a proof of
an unrestricted mathematical theorem. Avoid claims of novelty or superiority
that are not supported by precise definitions and comparison.

## Working on the reference implementation

The implementation uses only the Python standard library.

Run the test suite from the repository root:

~~~~sh
PYTHONPATH=src python -m unittest discover -s tests -v
~~~~

On Windows PowerShell:

~~~~powershell
$env:PYTHONPATH = "src"
python -m unittest discover -s tests -v
~~~~

Compile-check the package and tests:

~~~~sh
PYTHONPATH=src python -m compileall -q src tests
~~~~

Every behavior change must include tests for:
- canonical and noncanonical inputs;
- zero, one-group and multi-group values;
- negative values and signed intermediate coefficients;
- carry and borrow across group boundaries;
- exact preservation of the weighted value;
- divisibility and residue edge cases when affected.

## Documentation changes

Keep the canonical semantics synchronized across:

- docs/VYUNENKO_THEORY.md;
- docs/CHAPTER_II_CASCADE_BALANCE.md;
- docs/K3_CANONICAL_SYNTAX.md;
- docs/CLASSICAL_MATHEMATICS_CROSSWALK.md;
- docs/CONSTRUCTIVE_RESEARCH_ROADMAP.md;
- docs/REFERENCE_IMPLEMENTATION.md.

Use the established mathematical notation and define every new symbol before use.
State the domain and quantifiers in every theorem. Do not call a statement a
theorem until its proof is present and its assumptions are explicit.

## Pull requests

Use a focused branch and a Conventional Commit title, for example:

- docs: clarify the K3 completion construction
- feat: add a K3 residue operation
- test: cover negative carry normalization
- fix: reject a noncanonical terminal zero group

A pull request should explain the mathematical rule, implementation change,
tests added, and any remaining proof obligation. Avoid bundling unrelated
changes.
