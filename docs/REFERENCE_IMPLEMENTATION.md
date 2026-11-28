# K3 Reference Implementation

> **Document standard:** [Cascade Edition 1.0.0](SCIENTIFIC_MATHEMATICAL_DOCUMENTATION_STANDARD.md).
> **Epistemic status:** an implementation contract and finite verification record; it is not a mathematical proof.
> **K3 notation:** B = 1000 is the numeric radix; k is only the lexical group separator; S_B is the positional shift.
> **Citation and reproducibility:** repository citation metadata is in CITATION.cff and CITATION.bib; execution commands and version constraints are stated below.

**Document type:** reference-implementation/API specification  
**Authorship provenance:** maintained in the Kaskad repository; individual document authorship is not separately assigned.  
**Version:** 0.1.0  
**Revision date:** 2026-11-28  
**Primary language:** English  
**Translation status:** Russian, Ukrainian and Chinese translations are pending; see LANGUAGE_REGISTER.md.  
**Subject and scope:** finite exact-integer implementation of canonical K3 semantics only.  
**Dependencies:** canonical theory, K3 syntax, cascade-balance chapter and K3 reference vectors.  
**Computational protocol:** Python 3.11 or newer; standard library only; run the test and compile commands in section 8.  
**Revision history:** 2026-11-28 — initial reference-core contract.

Package: kaskad-k3  
Version: 0.1.0  
Status: auxiliary reference implementation; stage 1 in progress  
Radix: 1000  
Runtime dependencies: Python standard library only

## 1. Scope

The package implements the finite exact-integer semantics of canonical K3 as
an executable reference. It is a supporting research instrument, not the
mission of Kaskad, not a proof assistant, and not a full mathematical engine.

It deliberately does not implement the inverse-limit completion, real-valued
groups, floating-point K3 arithmetic, alternative radices, or the exploratory
recursive K-suffix track.

## 2. Canonical contract

The radix is fixed at B = 1000. Every explicit group is an integer from 0
through 999, written with one to three decimal digits and no leading zero.
Groups are displayed most-significant first, separated by lowercase k.

The leading group of a positive number is nonzero. The least-significant
explicit group is nonzero. If the least-significant coefficient is zero, that
one final zero is omitted and represented by the terminal separator.

| K3 word | Coefficients, low to high | Integer |
|---|---:|---:|
| 0 | (0) | 0 |
| 7 | (7) | 7 |
| 1k | (0, 1) | 1,000 |
| 1k5 | (5, 1) | 1,005 |
| 1k0k | (0, 0, 1) | 1,000,000 |
| 50k0k1 | (1, 0, 50) | 50,000,001 |
| 50k0k | (0, 0, 50) | 50,000,000 |
| -1k | (0, 1), negative sign | -1,000 |

A terminal k denotes exactly one additional low-order zero. It is not a
multiplier, a digit, or a free-form suffix.

## 3. Raw vectors and polynomial evaluation

A raw coefficient vector is any finite tuple of integers
(c[0], ..., c[m]), indexed from low to high. Its value is

    Val_B(c) = sum(c[i] * B**i).

Raw vectors need not be canonical. Their coefficients may be negative or
outside 0..999. The canonical representation is obtained only after
normalization. An empty coefficient vector evaluates to the empty sum, zero,
but the empty text word is not a canonical K3 numeral.

The positional shift operation S_B prepends one zero coefficient:

    S_B(c[0], ..., c[m]) = (0, c[0], ..., c[m]).

For r nonnegative, the API generalizes this to r leading zero coefficients.
The invariant is Val_B(S_B^r(c)) = B**r * Val_B(c).

The symbol k remains only a lexical group delimiter. It is not the numeric
base, a coefficient, or a multiplier.

## 4. Public API

| Function | Contract |
|---|---|
| RADIX | Constant 1000 |
| parse_k3(word) | Strictly parse canonical text to an integer |
| format_k3(value) | Encode an integer as canonical K3 text |
| to_groups(value) | Return magnitude groups, least-significant first |
| evaluate_coefficients(values) | Evaluate a finite signed coefficient vector |
| normalize(values) | Normalize arbitrary finite signed coefficients |
| shift_coefficients(values, positions) | Apply S_B by prepending zero coefficients |
| add/subtract/multiply(left, right) | Exact arithmetic with canonical result |
| compare/equal(left, right) | Compare canonical values |
| divmod_radix(value) | Euclidean quotient/remainder on division by 1000 |
| low_groups(value, count) | Read low-order magnitude groups, zero-padded |
| residue(value, depth) | Euclidean residue modulo 1000**depth |
| congruent_mod_radix_power(a, b, depth) | Test congruence modulo 1000**depth |
| is_unit_mod_radix(value) | Test gcd(value,1000) = 1 |
| valuation_1000(value) | Divisibility depth; infinity for zero |
| distance_1000(a, b) | Exact Fraction-valued divisibility ultrametric |
| serialize_k3(value) | Deterministic version-1 JSON serialization |
| deserialize_k3(payload) | Validate and decode version-1 JSON |

For every r >= 1, a residue class is invertible modulo 1000**r exactly when
gcd(n,1000)=1. The helper tests this common criterion; it deliberately does
not infer invertibility from valuation_1000(n)=0. For example, 8 and 125 both
have divisibility depth zero but are not units, whereas 1001 is a unit.

## 5. Normalization

For signed coefficients c[0], ..., c[m], the exact total is
S = sum(c[i] * 1000**i). The sign is separated from the magnitude. The
magnitude is normalized from low to high positions using Euclidean division:

    s[i]     = c[i] + t[i]
    t[i + 1] = floor(s[i] / 1000)
    d[i]     = s[i] - 1000 * t[i + 1]

The remainder always satisfies 0 <= d[i] < 1000, even when the effective
coefficient is negative. The final carry is propagated until it vanishes.
This is the same local balance rule documented in
CHAPTER_II_CASCADE_BALANCE.md. The implementation first separates the sign
using the exact total, then applies the recurrence to the magnitude vector;
it does not rely on floating-point arithmetic.

## 6. Composite-base divisibility and metric

For nonzero n, valuation_1000(n) returns the largest r such that 1000**r
divides n. It returns positive infinity for zero.

Since 1000 = 2**3 * 5**3 is composite, this depth is not a multiplicative
prime-adic valuation. For example, the depth of 8 and 125 is zero, while
the depth of their product 1000 is one.

The metric returned by distance_1000(x, y) is exactly zero for equal values
and 1 / 1000**r otherwise, where r = valuation_1000(x-y). A finite test grid
checks the strong triangle inequality; the general theorem remains a
mathematical statement in the theory, not a claim made true by the test suite.

The inverse-limit completion and its ring isomorphism to Z_2 x Z_5 remain
mathematical constructions and are not implemented as runtime types.

## 7. Versioned JSON format

Version 1 has exactly four fields:

    {"format":"K3","version":1,"sign":1,"groups":[1,0,50]}

Groups are integer coefficients, least-significant first. Sign is -1, 0,
or 1. Zero must be represented only by sign 0 and groups [0]. Nonzero values
require a nonzero highest group. Unknown fields, wrong versions, duplicate
fields, booleans masquerading as integers, invalid groups, floating-point
integers and noncanonical zero vectors are rejected.

## 8. Conformance and verification

The normative mathematical examples are stored in docs/K3_REFERENCE_VECTORS.json;
tests/test_vectors.py loads that file directly and checks every operand, result,
and supported operation. The extended implementation corpus in
tests/vectors/k3-vectors.json adds malformed words, signed normalization,
carry and borrow, positional shifts, unit classifications and divisibility
boundaries.

Run from the repository root:

    PYTHONPATH=src python -m unittest discover -s tests -v

The tests also cover finite round trips, large integers, exhaustive small
signed coefficient vectors, arithmetic compared with exact host integer
semantics, versioned serialization, and a finite-grid ultrametric inequality
check.

These tests verify executable conformance over specified and exhaustively
enumerated finite domains. They do not prove unrestricted theorems, the
completion result, probabilistic claims, or the correctness of every possible
future extension.


## 9. Algorithmic complexity and performance boundary

Let g be the number of canonical groups, m the number of raw coefficients, and
r the divisibility depth. At the group-operation level:

- Parsing and encoding visit O(g) groups. Each conversion also performs
  arbitrary-precision integer operations whose bit cost depends on operand
  length and the host runtime.
- Coefficient evaluation and normalization make O(m + g) group-level passes.
  Each Euclidean carry/borrow step operates on an exact integer; this is not a
  claim of O(m) bit complexity.
- Addition and subtraction use one exact integer operation after parsing;
  multiplication uses the host's arbitrary-precision multiplication algorithm.
  The package does not specify or benchmark that algorithm.
- Divisibility depth uses r repeated divisions by 1000. Residue and distance
  also depend on arbitrary-precision exponentiation and integer operations.
- Serialization visits the finite group vector and emits deterministic JSON.

These are structural operation counts, not a formal bit-complexity theorem.
No benchmark, speedup, asymptotic bit-cost result, or hardware-performance
claim is published for this package. A future complexity analysis must state
the input-size measure and account for the host's big-integer arithmetic.
