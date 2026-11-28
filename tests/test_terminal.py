from fractions import Fraction
import unittest

from kaskad_k3 import (
    TerminalIntegralError,
    render_terminal_integral,
    terminal_integral,
    terminal_integral_k3,
)


class K3TerminalIntegralTests(unittest.TestCase):
    def test_counting_measure_is_an_exact_finite_sum(self):
        self.assertEqual(terminal_integral((3, 5, 7)), Fraction(15, 1))

    def test_weighted_atom_encodes_the_central_rest_quantum(self):
        self.assertEqual(
            terminal_integral((0, 1, 0), (1, 8, 1)),
            Fraction(8, 1),
        )

    def test_fractional_integral_is_exact(self):
        self.assertEqual(
            terminal_integral((Fraction(1, 3), Fraction(1, 6))),
            Fraction(1, 2),
        )

    def test_signed_integrands_are_allowed(self):
        self.assertEqual(
            terminal_integral((-2, 5), (3, 1)),
            Fraction(-1, 1),
        )

    def test_empty_finite_measure_has_zero_integral(self):
        self.assertEqual(terminal_integral(()), Fraction(0, 1))

    def test_integer_result_can_be_encoded_in_canonical_k3(self):
        self.assertEqual(terminal_integral_k3((3, 5, 7)), "15")
        self.assertEqual(terminal_integral_k3((0, 1), (1, 1000)), "1k")

    def test_noninteger_result_is_not_rounded_for_k3(self):
        with self.assertRaises(TerminalIntegralError):
            terminal_integral_k3((Fraction(1, 2),))

    def test_negative_result_is_not_encoded_as_natural_k3(self):
        with self.assertRaises(TerminalIntegralError):
            terminal_integral_k3((-1,))

    def test_float_and_boolean_inputs_are_rejected(self):
        with self.assertRaises(TypeError):
            terminal_integral((0.5,))
        with self.assertRaises(TypeError):
            terminal_integral((True,))

    def test_invalid_measure_masses_are_rejected(self):
        with self.assertRaises(TerminalIntegralError):
            terminal_integral((1,), (-1,))
        with self.assertRaises(TerminalIntegralError):
            terminal_integral((1, 2), (1,))

    def test_postfix_renderer_places_integral_after_full_expression(self):
        rendered = render_terminal_integral(r"F(x)+G(x)", r"\Omega", r"d\mu")
        self.assertEqual(
            rendered,
            r"\left[F(x)+G(x)\right]\;\mathop{\int}\limits_{\Omega,d\mu}^{\dashv}",
        )

    def test_postfix_renderer_requires_explicit_scope(self):
        with self.assertRaises(TerminalIntegralError):
            render_terminal_integral("F(x)", "", "dx")


if __name__ == "__main__":
    unittest.main()
