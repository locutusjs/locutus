import type { PhpRuntimeValue } from '../_helpers/_phpTypes.ts'

export function array_reduce<TValue, TCarry>(
  aInput: readonly TValue[],
  callback: (carry: TCarry, value: TValue) => TCarry,
  initial: TCarry,
): TCarry

export function array_reduce<TValue>(
  aInput: readonly TValue[],
  callback: (carry: TValue | null, value: TValue) => TValue,
): TValue | null

export function array_reduce(
  aInput: readonly PhpRuntimeValue[],
  callback: (carry: PhpRuntimeValue | null, value: PhpRuntimeValue) => PhpRuntimeValue,
  initial?: PhpRuntimeValue,
): PhpRuntimeValue | null {
  //  discuss at: https://locutus.io/php/array_reduce/
  // original by: Alfonso Jimenez (https://www.alfonsojimenez.com)
  //      note 1: Takes a function as an argument, not a function's name
  //   example 1: array_reduce([1, 2, 3, 4, 5], function (v, w){v += w;return v;})
  //   returns 1: 15

  let carry: PhpRuntimeValue | null = typeof initial === 'undefined' ? null : initial
  for (const value of aInput) {
    carry = callback(carry, value)
  }
  return carry
}
