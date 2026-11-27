# K3 Reference Implementation

**Package:** kaskad-k3  
**Version:** 0.1.0  
**Mathematical system:** Vyunenko Theory, K3  
**Radix:** 1000  
**Runtime dependencies:** Python standard library only

## 1. Purpose and limits

This package is an executable reference for the finite integer semantics of K3.
It provides a strict canonical parser, encoder, coefficient normalizer,
integer arithmetic, residue operations, the 1000-divisibility depth, and the
associated exact ultrametric.

The package is not a proof assistant and does not prove the theory. Its tests
check implementation behavior and finite instances of algebraic properties.
The unrestricted mathematical results remain supported by their written
definitions and proofs in the theory documents.

The package deliberately does not implement real-valued groups, floating-point
K3 arithmetic, an alternative radix, or an infinite cascade as a finite word.

## 2. Canonical representation

The fixed radix is 1000. Every explicit group is an integer in the range
0 through 999, written with one to three decimal digits and no leading zero.
Groups are displayed from most significant to least significant and separated
by k.

The most-significant group of a positive number must be nonzero. The least
significant group must also be nonzero when written explicitly. If that group
is zero, it is omitted and one terminal k records that exactly one zero group
was omitted.

Examples:

| K3 word | Little-endian coefficient vector | Integer |
|---|---:|---:|
| 0 | (0) | 0 |
| 7 | (7) | 7 |
| 1k | (0, 1) | 1,000 |
| 1k5 | (5, 1) | 1,005 |
| 1k0k | (0, 0, 1) | 1,000,000 |
| 50k0k1 | (1, 0, 50) | 50,000,001 |
| 50k0k | (0, 0, 50) | 50,000,000 |
| -1k | (0, 1), with a negative sign | -1,000 |

The terminal separator is not a multiplier or a digit. For example, 1k means
the two-position vector (0, 1), not the integer 1.

## 3. Public API

All functions are exported from the kaskad_k3 package.

| Function | Contract |
|---|---|
| RADIX | Constant 1000 |
| parse_k3(word) | Strictly parse canonical text to an integer |
| format_k3(value) | Encode an integer as canonical K3 text |
| to_groups(value) | Return abs(value)'s coefficients, least-significant first |
| evaluate_coefficients(values) | Evaluate a finite signed coefficient vector |
| normalize(values) | Normalize arbitrary signed coefficients to canonical K3 text |
| add(left, right) | Add two canonical K3 words |
| subtract(left, right) | Subtract two canonical K3 words |
| multiply(left, right) | Multiply two canonical K3 words |
| valuation_1000(value) | Largest r such that 1000**r divides value; infinity for zero |
| residue(value, depth) | Euclidean residue modulo 1000**depth |
| congruent_mod_radix_power(a, b, depth) | Test congruence modulo 1000**depth |
| distance_1000(a, b) | Exact Fraction-valued divisibility ultrametric |

Coefficient vectors passed to evaluate_coefficients and normalize are ordered
from least significant to most significant. This differs from the visual
left-to-right order of groups in a K3 word.

## 4. Normalization algorithm

For coefficients c[0], ..., c[m], the package evaluates their exact integer
value. If the value is negative, it negates the vector and records the sign.
The nonnegative vector is then processed from low to high position.

At each position, with incoming carry t[i], compute:

    s[i]       = c[i] + t[i]
    t[i + 1]   = floor(s[i] / 1000)
    d[i]       = s[i] - 1000 * t[i + 1]

Euclidean division guarantees 0 <= d[i] < 1000, including when s[i] is
negative. The carry is propagated until it vanishes. The result is trimmed
to its unique canonical length and encoded with the terminal-k rule.

The implementation and test suite check value preservation, canonical output,
negative intermediate coefficients, and cross-group carry behavior.

## 5. Divisibility depth and metric

For nonzero n, valuation_1000(n) returns the largest r >= 0 for which
1000**r divides n. It returns positive infinity for zero.

Because 1000 = 2**3 * 5**3 is composite, this function is not additive on
products in general. In particular, its name in the API is a convenient
identifier, not a claim that it is a prime-adic valuation.

For integers x and y, distance_1000 returns:

    0                         when x = y
    1 / 1000**valuation_1000(x - y) otherwise

The result is an exact fractions.Fraction. The strong triangle inequality
follows from the closure of each ideal 1000**r Z under addition. The topology
is the inverse-limit topology of Z / 1000**r Z; by the Chinese remainder
theorem its completion is topologically and as a ring isomorphic to
Z_2 x Z_5. The implementation computes finite integer distances; it does not
represent points of the completion.

## 6. Verification

The tests include:
- canonical examples from the mathematical specification;
- rejection of malformed and noncanonical words;
- round trips across a dense finite integer range and very large integers;
- exhaustive small signed coefficient vectors;
- arithmetic comparison with Python's exact integers;
- divisibility, residues, and the ultrametric strong triangle inequality.

These are executable checks, not a formal proof of all statements in
docs/VYUNENKO_THEORY.md.
