import json
from pathlib import Path
import unittest

from kaskad_k3 import (
    K3SyntaxError, add, evaluate_coefficients, format_k3, multiply, normalize,
    parse_k3, parse_k3_pad, parse_k3_raw, subtract, valuation_1000, shift_coefficients, is_unit_mod_radix
)

VECTORS_PATH = Path(__file__).parent / "vectors" / "k3-vectors.json"
THEORY_VECTORS_PATH = Path(__file__).parents[1] / "docs" / "K3_REFERENCE_VECTORS.json"


class SharedConformanceVectors(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.vectors = json.loads(VECTORS_PATH.read_text(encoding="utf-8"))
        if cls.vectors["format"] != "K3-CONFORMANCE":
            raise AssertionError("unexpected conformance corpus format")
        if cls.vectors["version"] != 1 or cls.vectors["radix"] != 1000:
            raise AssertionError("conformance corpus is not for K3 version 1")

    def test_canonical_words(self):
        for vector in self.vectors["canonical"]:
            with self.subTest(word=vector["word"]):
                value = int(vector["value"])
                self.assertEqual(parse_k3(vector["word"]), value)
                self.assertEqual(format_k3(value), vector["word"])
                sign = vector.get("sign", 1)
                self.assertEqual(sign * evaluate_coefficients(vector["groups_le"]), value)

    def test_invalid_words(self):
        for word in self.vectors["invalid_words"]:
            with self.subTest(word=word):
                with self.assertRaises(K3SyntaxError):
                    parse_k3(word)

    def test_normalization(self):
        for vector in self.vectors["normalization"]:
            with self.subTest(coefficients=vector["coefficients_le"]):
                result = normalize(vector["coefficients_le"])
                self.assertEqual(result, vector["word"])
                self.assertEqual(
                    parse_k3(result),
                    evaluate_coefficients(vector["coefficients_le"]),
                )

    def test_arithmetic(self):
        operations = {"add": add, "subtract": subtract, "multiply": multiply}
        for vector in self.vectors["arithmetic"]:
            with self.subTest(vector=vector):
                self.assertEqual(
                    operations[vector["operation"]](
                        vector["left"], vector["right"]
                    ),
                    vector["expected"],
                )


    def test_positional_shift_vectors(self):
        for vector in self.vectors["shift"]:
            with self.subTest(vector=vector):
                actual = shift_coefficients(
                    vector["coefficients_le"], vector["positions"]
                )
                self.assertEqual(list(actual), vector["expected_le"])
                self.assertEqual(
                    str(evaluate_coefficients(actual)), vector["value"]
                )

    def test_unit_vectors(self):
        for vector in self.vectors["units"]:
            with self.subTest(value=vector["value"]):
                self.assertEqual(
                    is_unit_mod_radix(int(vector["value"])),
                    vector["is_unit"],
                )

    def test_divisibility_depth(self):
        for vector in self.vectors["divisibility"]:
            with self.subTest(value=vector["value"]):
                actual = valuation_1000(int(vector["value"]))
                if vector["depth"] == "infinity":
                    self.assertEqual(str(actual), "inf")
                else:
                    self.assertEqual(actual, vector["depth"])



    def test_theory_reference_vectors(self):
        corpus = json.loads(
            THEORY_VECTORS_PATH.read_text(encoding="utf-8")
        )
        self.assertEqual(corpus["schema_version"], "1.2.0")
        self.assertEqual(corpus["theory"], "K3")
        self.assertEqual(corpus["radix"], 1000)
        self.assertEqual(
            corpus["coefficient_order"],
            "least_significant_to_most_significant",
        )
        self.assertEqual(corpus["canonical_coefficient_range"], [0, 999])

        def decode_operand(operand):
            mode = operand.get("input_mode", "canonical")
            if mode == "canonical":
                return parse_k3(operand["word"])
            if mode == "K3-PAD":
                return parse_k3_pad(operand["word"])
            if mode == "K3-RAW":
                groups_high_to_low = parse_k3_raw(operand["word"])
                return evaluate_coefficients(reversed(groups_high_to_low))
            raise AssertionError(f"unsupported input mode: {mode}")

        seen_ids = set()
        for vector in corpus["vectors"]:
            with self.subTest(vector=vector["id"]):
                self.assertNotIn(vector["id"], seen_ids)
                seen_ids.add(vector["id"])
                decoded = {}
                for key in ("left", "right", "expected"):
                    if key not in vector:
                        continue
                    operand = vector[key]
                    value = int(operand["decimal"])
                    if key == "expected":
                        actual_value = parse_k3(operand["word"])
                        self.assertEqual(format_k3(value), operand["word"])
                    else:
                        actual_value = decode_operand(operand)
                        canonical_word = operand.get("canonical_word")
                        if canonical_word is not None:
                            self.assertEqual(format_k3(value), canonical_word)
                        elif operand.get("input_mode", "canonical") == "canonical":
                            self.assertEqual(format_k3(value), operand["word"])
                    self.assertEqual(actual_value, value)
                    self.assertEqual(
                        evaluate_coefficients(operand["coefficients"]),
                        value,
                    )
                    decoded[key] = actual_value

                if vector["operation"] == "add":
                    actual_value = decoded["left"] + decoded["right"]
                    self.assertEqual(
                        format_k3(actual_value),
                        vector["expected"]["word"],
                    )
                elif vector["operation"] == "multiply":
                    actual_value = decoded["left"] * decoded["right"]
                    self.assertEqual(
                        format_k3(actual_value),
                        vector["expected"]["word"],
                    )
                elif vector["operation"] == "identity":
                    self.assertEqual(decoded["left"], decoded["expected"])
                else:
                    self.fail(
                        f"unsupported reference operation: {vector['operation']}"
                    )

    def test_explicit_pad_and_raw_modes(self):
        with self.assertRaises(K3SyntaxError):
            parse_k3("5k00k")
        self.assertEqual(parse_k3_pad("5k00k"), 5_000_000)
        with self.assertRaises(K3SyntaxError):
            parse_k3_pad("5k0")
        with self.assertRaises(K3SyntaxError):
            parse_k3("5k0")
        self.assertEqual(parse_k3_raw("5k0"), (5, 0))
        with self.assertRaises(K3SyntaxError):
            parse_k3_raw("5k0k")

if __name__ == "__main__":
    unittest.main()
