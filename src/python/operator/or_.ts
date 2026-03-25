import { pythonBitOr } from '../_helpers/_operator.ts'

export function or_(a: unknown, b: unknown): boolean | number {
  //      discuss at: https://locutus.io/python/operator/or_/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Performs Python-style bitwise or on integer-like values.
  //       example 1: or_(4, 1)
  //       returns 1: 5
  //       example 2: or_(true, false)
  //       returns 2: true

  return pythonBitOr(a, b, 'or_')
}
