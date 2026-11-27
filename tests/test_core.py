from fractions import Fraction
from itertools import product
import math
import unittest

from kaskad_k3 import (
    K3SyntaxError,
    add,
    congruent_mod_radix_power,
    distance_1000,
    evaluate_coefficients,
    format_k3,
    multiply,
    normalize,
    parse_k3,
    residue,
    subtract,
    to_groups,
    valuation_1000,
)


class K3SyntaxTests(unittest.TestCase):
    def test_canonical_examples(self):
        examples = {
            "0": 0,
            "7": 7,
            "999": 999,
            "1k": 1_000,
            "1k5": 1_005,
            "1k0k": 1_000_000,
            "50k0k1": 50_000_001,
            "50k0k": 50_000_000,
            "999k999": 999_999,
            "-1": -1,
            "-1k": -1_000,
            "-50k0k1": -50_000_001,
        }
        for word, expected in examples.items():
            with self.subTest(word=word):
                self.assertEqual(parse_k3(word), expected)
                self.assertEqual(format_k3(expected), word)

    def test_round_trip_across_dense_integer_range(self):
        for value in range(-20_000, 20_001):
            with self.subTest(value=value):
                self.assertEqual(parse_k3(format_k3(value)), value)

    def test_large_integer_round_trip(self):
        values = [
            10**100,
            -(10**100 + 50_000_001),
            999 * 1000**12 + 7,
        ]
        for value in values:
            self.assertEqual(parse_k3(format_k3(value)), value)

    def test_noncanonical_words_are_rejected(self):
        invalid = [
            "",
            "-",
            "+1",
            "00",
            "000",
            "01k2",
            "1000",
            "k5",
            "1kk2",
            "1k0",
            "1k00k",
            "1 k2",
            "1K2",
            "1k-2",
            "0k",
            "-0",
            "-00",
        ]
        for word in invalid:
            with self.subTest(word=word):
                with self.assertRaises(K3SyntaxError):
                    parse_k3(word)

    def test_type_validation(self):
        with self.assertRaises(TypeError):
            parse_k3(12)  # type: ignore[arg-type]
        with self.assertRaises(TypeError):
            format_k3(True)


class K3NormalizationTests(unittest.TestCase):
    def test_known_normalization_cases(self):
        examples = [
            ((1000,), "1k"),
            ((-1, 1), "999"),
            ((0, -1), "-1k"),
            ((1000, -1), "0"),
            ((0, 0, -1), "-1k0k"),
            ((999, 999), "999k999"),
            ((1, 0, 50), "50k0k1"),
            ((), "0"),
        ]
        for coefficients, expected in examples:
            with self.subTest(coefficients=coefficients):
                self.assertEqual(normalize(coefficients), expected)
                self.assertEqual(
                    parse_k3(expected), evaluate_coefficients(coefficients)
                )

    def test_normalization_preserves_all_small_vectors(self):
        for coefficients in product(range(-2, 3), repeat=4):
            word = normalize(coefficients)
            self.assertEqual(parse_k3(word), evaluate_coefficients(coefficients))
            self.assertEqual(format_k3(parse_k3(word)), word)

    def test_group_order_is_least_significant_first(self):
        self.assertEqual(to_groups(50_000_001), (1, 0, 50))
        self.assertEqual(evaluate_coefficients((1, 0, 50)), 50_000_001)
        self.assertEqual(to_groups(0), (0,))


class K3ArithmeticTests(unittest.TestCase):
    def test_arithmetic_examples(self):
        self.assertEqual(add("999", "1"), "1k")
        self.assertEqual(add("50k0k1", "999"), "50k1k")
        self.assertEqual(subtract("1k", "1"), "999")
        self.assertEqual(subtract("1", "2"), "-1")
        self.assertEqual(multiply("1k", "1k"), "1k0k")
        self.assertEqual(multiply("-2", "500"), "-1k")

    def test_arithmetic_matches_integer_arithmetic(self):
        words = [format_k3(value) for value in range(-30, 31)]
        for left_word, right_word in product(words, repeat=2):
            left = parse_k3(left_word)
            right = parse_k3(right_word)
            self.assertEqual(parse_k3(add(left_word, right_word)), left + right)
            self.assertEqual(
                parse_k3(subtract(left_word, right_word)), left - right
            )
            self.assertEqual(
                parse_k3(multiply(left_word, right_word)), left * right
            )


class K3DivisibilityTests(unittest.TestCase):
    def test_divisibility_depth(self):
        self.assertTrue(math.isinf(valuation_1000(0)))
        self.assertEqual(valuation_1000(1), 0)
        self.assertEqual(valuation_1000(8), 0)
        self.assertEqual(valuation_1000(125), 0)
        self.assertEqual(valuation_1000(1_000), 1)
        self.assertEqual(valuation_1000(1_000_000), 2)
        self.assertEqual(valuation_1000(-1_000_000), 2)
        self.assertEqual(valuation_1000(8 * 125), 1)

    def test_residues_and_congruence(self):
        self.assertEqual(residue(-1, 1), 999)
        self.assertEqual(residue(50_000_001, 2), 1)
        self.assertEqual(residue(123, 0), 0)
        self.assertTrue(congruent_mod_radix_power(50_000_001, 1, 2))
        self.assertFalse(congruent_mod_radix_power(50_000_001, 2, 2))

    def test_ultrametric_is_exact_and_satisfies_strong_triangle(self):
        self.assertEqual(distance_1000(7, 7), Fraction(0, 1))
        self.assertEqual(distance_1000(0, 1_000), Fraction(1, 1_000))
        self.assertEqual(distance_1000(8, 133), Fraction(1, 1))

        values = range(-8, 9)
        for x, y, z in product(values, repeat=3):
            self.assertLessEqual(
                distance_1000(x, z),
                max(distance_1000(x, y), distance_1000(y, z)),
            )

    def test_invalid_depth_is_rejected(self):
        with self.assertRaises(ValueError):
            residue(10, -1)
        with self.assertRaises(TypeError):
            residue(10, True)


if __name__ == "__main__":
    unittest.main()
