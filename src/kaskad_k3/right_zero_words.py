"""Right-zero operation on immutable finite words."""

from __future__ import annotations

from typing import TypeVar, TypeAlias

Token = TypeVar("Token")
Word: TypeAlias = tuple[Token, ...]


def right_zero_word(left: Word[Token], right: Word[Token]) -> Word[Token]:
    """Return the right word unchanged for every pair of finite words.

    Words are immutable tuples of tokens. The empty tuple is the empty word.
    The operation is the right projection u ▼ v = v; it does not concatenate,
    normalize, reverse, or inspect the token sequence of the left operand.
    """
    if not isinstance(left, tuple):
        raise TypeError("left must be a tuple representing a finite word")
    if not isinstance(right, tuple):
        raise TypeError("right must be a tuple representing a finite word")
    return right


__all__ = ["Word", "right_zero_word"]
