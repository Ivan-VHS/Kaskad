import json
from pathlib import Path
import unittest

from kaskad_k3 import (
    K3SyntaxError, add, evaluate_coefficients, format_k3, multiply, normalize,
    parse_k3, subtract, valuation_1000
)

VECTORS_PATH = Path(__file__).parent / "vectors" / "k3-vectors.json"


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
                self.assertEqual(evaluate_coefficients(vector["groups_le"]), value)

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

    def test_divisibility_depth(self):
        for vector in self.vectors["divisibility"]:
            with self.subTest(value=vector["value"]):
                actual = valuation_1000(int(vector["value"]))
                if vector["depth"] == "infinity":
                    self.assertEqual(str(actual), "inf")
                else:
                    self.assertEqual(actual, vector["depth"])


if __name__ == "__main__":
    unittest.main()
