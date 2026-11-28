"""Exact finite-measure semantics for the K3-TI postfix integral."""

from __future__ import annotations

from collections.abc import Iterable
from fractions import Fraction

from .core import format_k3

ExactScalar = int | Fraction


class TerminalIntegralError(ValueError):
    """Raised when a finite K3-TI integral is not well-formed."""


def _exact_fraction(value: ExactScalar, name: str) -> Fraction:
    if isinstance(value, bool):
        raise TypeError(f"{name} must be an int or Fraction, not bool")
    if isinstance(value, int):
        return Fraction(value, 1)
    if isinstance(value, Fraction):
        return value
    raise TypeError(f"{name} must be an int or Fraction, not {type(value).__name__}")


def _values(items: Iterable[ExactScalar], name: str) -> tuple[Fraction, ...]:
    if isinstance(items, (str, bytes)):
        raise TypeError(f"{name} must be an iterable of exact scalars")
    try:
        source = tuple(items)
    except TypeError as exc:
        raise TypeError(f"{name} must be an iterable of exact scalars") from exc
    return tuple(
        _exact_fraction(item, f"{name}[{index}]")
        for index, item in enumerate(source)
    )


def terminal_integral(
    values: Iterable[ExactScalar],
    masses: Iterable[ExactScalar] | None = None,
) -> Fraction:
    """Evaluate a finite atomic measure integral exactly.

    values[j] is the integrand at atom j. masses[j] is the nonnegative
    measure of that atom. If masses are omitted, counting measure is used.

    Only integers and Fractions are accepted. Continuous integrals and
    floating-point approximations are outside this exact reference API.
    """
    exact_values = _values(values, "values")
    if masses is None:
        exact_masses = (Fraction(1, 1),) * len(exact_values)
    else:
        exact_masses = _values(masses, "masses")

    if len(exact_values) != len(exact_masses):
        raise TerminalIntegralError(
            "values and masses must have the same number of atoms"
        )

    for index, mass in enumerate(exact_masses):
        if mass < 0:
            raise TerminalIntegralError(f"masses[{index}] must be nonnegative")

    return sum(
        (value * mass for value, mass in zip(exact_values, exact_masses)),
        Fraction(0, 1),
    )


def terminal_integral_k3(
    values: Iterable[ExactScalar],
    masses: Iterable[ExactScalar] | None = None,
) -> str:
    """Encode a finite integral as K3 only when its value is in N0."""
    result = terminal_integral(values, masses)
    if result.denominator != 1:
        raise TerminalIntegralError(
            "the integral is not an integer and cannot be encoded as a K3 integer"
        )
    if result < 0:
        raise TerminalIntegralError(
            "the integral is negative and cannot be encoded as a K3 natural number"
        )
    return format_k3(result.numerator)


def render_terminal_integral(expression: str, domain: str, measure: str) -> str:
    """Render an explicitly scoped K3-TI expression in LaTeX postfix form."""
    for value, name in (
        (expression, "expression"),
        (domain, "domain"),
        (measure, "measure"),
    ):
        if not isinstance(value, str):
            raise TypeError(f"{name} must be a string")
        if not value.strip():
            raise TerminalIntegralError(f"{name} must not be empty")

    return (
        rf"\left[{expression}\right]"
        rf"\;\mathop{{\int}}\limits_{{{domain},{measure}}}^{{\dashv}}"
    )


__all__ = [
    "TerminalIntegralError",
    "render_terminal_integral",
    "terminal_integral",
    "terminal_integral_k3",
]
