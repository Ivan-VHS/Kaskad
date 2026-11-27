"""Exact reference operations for the finite K3 positional system."""

from __future__ import annotations

from collections.abc import Iterable
from fractions import Fraction
import json
from math import inf
import re

RADIX = 1000
GROUP_MIN = 0
GROUP_MAX = RADIX - 1

_GROUP_PATTERN = re.compile(r"(?:0|[1-9][0-9]{0,2})\Z")


class K3SyntaxError(ValueError):
    """Raised when text is not a canonical K3 integer."""


def _require_int(value: int, name: str) -> int:
    if isinstance(value, bool) or not isinstance(value, int):
        raise TypeError(f"{name} must be an integer, not {type(value).__name__}")
    return value


def _coerce_coefficients(values: Iterable[int]) -> tuple[int, ...]:
    if isinstance(values, (str, bytes)):
        raise TypeError("coefficients must be an iterable of integers")
    try:
        result = tuple(values)
    except TypeError as exc:
        raise TypeError("coefficients must be an iterable of integers") from exc

    for index, coefficient in enumerate(result):
        _require_int(coefficient, f"coefficients[{index}]")
    return result


def evaluate_coefficients(coefficients: Iterable[int]) -> int:
    """Evaluate a finite coefficient vector in least-significant-first order."""
    values = _coerce_coefficients(coefficients)
    return sum(coefficient * RADIX**index for index, coefficient in enumerate(values))


def to_groups(value: int) -> tuple[int, ...]:
    """Return canonical coefficients of abs(value), least-significant group first."""
    number = abs(_require_int(value, "value"))
    if number == 0:
        return (0,)

    groups: list[int] = []
    while number:
        number, group = divmod(number, RADIX)
        groups.append(group)
    return tuple(groups)


def _format_positive_groups(groups: Iterable[int]) -> str:
    digits = list(groups)
    if not digits:
        return "0"

    for index, digit in enumerate(digits):
        if isinstance(digit, bool) or not isinstance(digit, int):
            raise TypeError(f"groups[{index}] must be an integer")
        if not GROUP_MIN <= digit <= GROUP_MAX:
            raise ValueError(f"groups[{index}] must be between 0 and 999")

    while len(digits) > 1 and digits[-1] == 0:
        digits.pop()

    if all(digit == 0 for digit in digits):
        return "0"

    high_to_low = [str(digit) for digit in reversed(digits)]
    if digits[0] == 0:
        # The final k stands for exactly one omitted zero at position zero.
        high_to_low.pop()
        return "k".join(high_to_low) + "k"
    return "k".join(high_to_low)


def format_k3(value: int) -> str:
    """Encode any integer as its unique canonical K3 word."""
    number = _require_int(value, "value")
    sign = "-" if number < 0 else ""
    return sign + _format_positive_groups(to_groups(number))


def parse_k3(word: str) -> int:
    """Parse a canonical K3 word and return its exact integer value.

    Groups are written most-significant first. A terminal separator contributes
    one additional zero group at the least-significant end.
    """
    if not isinstance(word, str):
        raise TypeError("word must be a string")
    if not word:
        raise K3SyntaxError("an empty string is not a K3 word")

    negative = word.startswith("-")
    body = word[1:] if negative else word
    if not body:
        raise K3SyntaxError("a sign must be followed by a positive K3 word")
    if body == "0":
        if negative:
            raise K3SyntaxError("negative zero is not canonical; use 0")
        return 0

    has_implicit_zero = body.endswith("k")
    explicit = body[:-1] if has_implicit_zero else body
    parts = explicit.split("k")

    if not parts or any(not part for part in parts):
        raise K3SyntaxError("empty groups and repeated separators are forbidden")

    groups_high_to_low: list[int] = []
    for index, part in enumerate(parts):
        if not _GROUP_PATTERN.fullmatch(part):
            raise K3SyntaxError(f"invalid group at position {index}: {part!r}")
        group = int(part)
        if index == 0 and group == 0:
            raise K3SyntaxError("the most-significant group must be nonzero")
        groups_high_to_low.append(group)

    if not has_implicit_zero and groups_high_to_low[-1] == 0:
        raise K3SyntaxError(
            "a zero least-significant group must be represented by a terminal k"
        )

    if has_implicit_zero:
        groups_high_to_low.append(0)

    value = sum(
        group * RADIX**index
        for index, group in enumerate(reversed(groups_high_to_low))
    )
    return -value if negative else value


def _normalize_nonnegative(coefficients: tuple[int, ...]) -> tuple[int, ...]:
    """Run the Euclidean carry recurrence for a nonnegative total value."""
    digits: list[int] = []
    carry = 0

    for coefficient in coefficients:
        carry, digit = divmod(coefficient + carry, RADIX)
        digits.append(digit)

    while carry > 0:
        carry, digit = divmod(carry, RADIX)
        digits.append(digit)

    if carry < 0:
        raise ArithmeticError("normalization ended with a negative carry")

    if not digits:
        digits.append(0)
    while len(digits) > 1 and digits[-1] == 0:
        digits.pop()
    return tuple(digits)


def normalize(coefficients: Iterable[int]) -> str:
    """Normalize an arbitrary finite signed coefficient vector to K3 text.

    Input coefficients are ordered from the least-significant position up.
    The resulting word represents their exact weighted sum.
    """
    values = _coerce_coefficients(coefficients)
    total = evaluate_coefficients(values)
    sign = "-" if total < 0 else ""
    magnitude_coefficients = tuple(-item for item in values) if total < 0 else values
    normalized = _normalize_nonnegative(magnitude_coefficients)
    return sign + _format_positive_groups(normalized)


def add(left: str, right: str) -> str:
    """Add two canonical K3 integers and return canonical K3 text."""
    return format_k3(parse_k3(left) + parse_k3(right))


def subtract(left: str, right: str) -> str:
    """Subtract two canonical K3 integers and return canonical K3 text."""
    return format_k3(parse_k3(left) - parse_k3(right))


def multiply(left: str, right: str) -> str:
    """Multiply two canonical K3 integers and return canonical K3 text."""
    return format_k3(parse_k3(left) * parse_k3(right))


def valuation_1000(value: int) -> int | float:
    """Return the largest r with 1000**r dividing value; infinity for zero.

    This is a divisibility depth, not a multiplicative p-adic valuation:
    1000 is composite and the function is not additive on products.
    """
    number = abs(_require_int(value, "value"))
    if number == 0:
        return inf

    depth = 0
    while number % RADIX == 0:
        number //= RADIX
        depth += 1
    return depth


def residue(value: int, depth: int) -> int:
    """Return the Euclidean residue modulo 1000**depth."""
    number = _require_int(value, "value")
    depth = _require_int(depth, "depth")
    if depth < 0:
        raise ValueError("depth must be nonnegative")
    return number % (RADIX**depth)


def congruent_mod_radix_power(left: int, right: int, depth: int) -> bool:
    """Return whether left and right agree modulo 1000**depth."""
    left_value = _require_int(left, "left")
    right_value = _require_int(right, "right")
    return residue(left_value - right_value, depth) == 0


def distance_1000(left: int, right: int) -> Fraction:
    """Return the exact K3 divisibility ultrametric distance.

    The result is 0 when the inputs agree and 1000**(-r) otherwise, where r
    is the number of common low-order zero groups in their difference.
    """
    difference = _require_int(left, "left") - _require_int(right, "right")
    if difference == 0:
        return Fraction(0, 1)
    depth = valuation_1000(difference)
    return Fraction(1, RADIX**int(depth))


def compare(left: str, right: str) -> int:
    """Compare canonical K3 integers; return -1, 0, or 1."""
    left_value = parse_k3(left)
    right_value = parse_k3(right)
    return (left_value > right_value) - (left_value < right_value)


def divmod_radix(value: int) -> tuple[int, int]:
    """Return Euclidean quotient and remainder when dividing by 1000."""
    number = _require_int(value, "value")
    return divmod(number, RADIX)


def low_groups(value: int, count: int) -> tuple[int, ...]:
    """Return count least-significant magnitude groups, zero-padded."""
    number = abs(_require_int(value, "value"))
    length = _require_int(count, "count")
    if length < 0:
        raise ValueError("count must be nonnegative")
    groups: list[int] = []
    for _ in range(length):
        number, group = divmod(number, RADIX)
        groups.append(group)
    return tuple(groups)


def _unique_json_object(pairs):
    result = {}
    for key, value in pairs:
        if key in result:
            raise ValueError(f"duplicate JSON field: {key}")
        result[key] = value
    return result


def serialize_k3(value: int) -> str:
    """Serialize an integer as deterministic, versioned K3 JSON."""
    number = _require_int(value, "value")
    payload = {
        "format": "K3",
        "version": 1,
        "sign": 0 if number == 0 else (1 if number > 0 else -1),
        "groups": list(to_groups(number)),
    }
    return json.dumps(payload, ensure_ascii=True, separators=(",", ":"))


def deserialize_k3(payload: str) -> int:
    """Decode the strict version-1 canonical K3 JSON representation."""
    if not isinstance(payload, str):
        raise TypeError("payload must be a string")
    try:
        data = json.loads(payload, object_pairs_hook=_unique_json_object)
    except json.JSONDecodeError as exc:
        raise ValueError(f"invalid K3 JSON: {exc.msg}") from exc

    if not isinstance(data, dict):
        raise ValueError("K3 serialization must be a JSON object")
    if set(data) != {"format", "version", "sign", "groups"}:
        raise ValueError("K3 serialization has missing or unknown fields")
    if data["format"] != "K3":
        raise ValueError("unsupported serialization format")
    version = data["version"]
    if isinstance(version, bool) or not isinstance(version, int) or version != 1:
        raise ValueError("unsupported K3 serialization version")

    sign = data["sign"]
    if isinstance(sign, bool) or not isinstance(sign, int) or sign not in (-1, 0, 1):
        raise ValueError("sign must be -1, 0, or 1")
    groups = data["groups"]
    if not isinstance(groups, list) or not groups:
        raise ValueError("groups must be a nonempty JSON array")
    for index, group in enumerate(groups):
        if isinstance(group, bool) or not isinstance(group, int):
            raise ValueError(f"groups[{index}] must be an integer")
        if not GROUP_MIN <= group <= GROUP_MAX:
            raise ValueError(f"groups[{index}] must be between 0 and 999")

    if sign == 0:
        if groups != [0]:
            raise ValueError("zero must use sign 0 and the single group [0]")
        return 0
    if groups[-1] == 0:
        raise ValueError("a nonzero canonical vector must have a nonzero high group")
    magnitude = sum(group * RADIX**index for index, group in enumerate(groups))
    if magnitude == 0:
        raise ValueError("nonzero sign cannot encode zero")
    return sign * magnitude


def equal(left: str, right: str) -> bool:
    """Return whether two canonical K3 words encode the same integer."""
    return compare(left, right) == 0


__all__ = [
    "GROUP_MAX",
    "GROUP_MIN",
    "K3SyntaxError",
    "RADIX",
    "add",
    "compare",
    "deserialize_k3",
    "divmod_radix",
    "equal",
    "low_groups",
    "congruent_mod_radix_power",
    "distance_1000",
    "evaluate_coefficients",
    "format_k3",
    "multiply",
    "normalize",
    "parse_k3",
    "residue",
    "serialize_k3",
    "subtract",
    "to_groups",
    "valuation_1000",
]
