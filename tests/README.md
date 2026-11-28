# Test layout

The test suite covers the finite exact-integer reference package. It is computational evidence, not a proof assistant.

- test_core.py covers parsing, formatting, signed normalization, arithmetic, divisibility, shifts, and finite exhaustive ranges.
- test_vectors.py checks theory-level reference vectors and K3-PAD/K3-RAW profiles.
- vectors/k3-vectors.json is the package conformance fixture.
- docs/K3_REFERENCE_VECTORS.json is the theory-level expectation corpus.

Run from the repository root:

~~~sh
PYTHONPATH=src python -m unittest discover -s tests -v
~~~

The CI workflow compiles the package and runs tests for its declared Python matrix. A PASS belongs to the exact commit and workflow run that produced it.

## K3-TI terminal integral tests

The test_terminal.py module checks exact finite atomic integration, weighted masses, rational results, strict K3 conversion rules, and postfix LaTeX rendering. These tests cover the finite reference implementation only; they do not validate continuous integration, the sine-Gordon equation, or infinite dynamical systems.
