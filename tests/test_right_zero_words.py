import unittest

from kaskad_k3 import right_zero_word


class RightZeroWordTests(unittest.TestCase):
    def test_returns_right_word_unchanged(self):
        left = ("left", "payload")
        right = ("right", "word")
        result = right_zero_word(left, right)
        self.assertEqual(result, right)
        self.assertIs(result, right)

    def test_empty_words_are_in_the_universe(self):
        empty = ()
        word = ("a", "b")
        self.assertEqual(right_zero_word(empty, word), word)
        self.assertEqual(right_zero_word(word, empty), empty)
        self.assertEqual(right_zero_word(empty, empty), empty)

    def test_word_tokens_are_not_restricted_to_strings(self):
        right = (1, None, ("nested",))
        self.assertIs(right_zero_word(("left",), right), right)

    def test_operation_is_associative(self):
        words = [(), ("a",), ("b",), ("a", "b")]
        for x in words:
            for y in words:
                for z in words:
                    self.assertEqual(
                        right_zero_word(right_zero_word(x, y), z),
                        right_zero_word(x, right_zero_word(y, z)),
                    )

    def test_operation_is_idempotent(self):
        words = [(), ("a",), ("b", "a")]
        for word in words:
            self.assertEqual(right_zero_word(word, word), word)

    def test_every_finite_product_returns_its_last_word(self):
        words = [(), ("a",), ("b", "a"), ("c", "c", "a")]
        for first in words:
            for second in words:
                for third in words:
                    self.assertEqual(
                        right_zero_word(right_zero_word(first, second), third),
                        third,
                    )

    def test_left_translation_is_identity(self):
        fixed_left = ("prefix",)
        for word in [(), ("a",), ("b", "c")]:
            self.assertEqual(right_zero_word(fixed_left, word), word)

    def test_right_translation_is_constant(self):
        fixed_right = ("suffix", "suffix")
        for word in [(), ("a",), ("b", "c")]:
            self.assertIs(right_zero_word(word, fixed_right), fixed_right)

    def test_non_tuple_operands_are_rejected(self):
        with self.assertRaises(TypeError):
            right_zero_word(["a"], ("b",))  # type: ignore[arg-type]
        with self.assertRaises(TypeError):
            right_zero_word(("a",), ["b"])  # type: ignore[arg-type]


if __name__ == "__main__":
    unittest.main()
