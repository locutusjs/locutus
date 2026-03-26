import { pythonBitAnd } from '../_helpers/_operator.ts'

export function and_(a: unknown, b: unknown): boolean | number {
  //      discuss at: https://locutus.io/python/operator/and_/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Performs Python-style bitwise and on integer-like values.
  //       example 1: and_(6, 3)
  //       returns 1: 2
  //       example 2: and_(true, false)
  //       returns 2: false

  return pythonBitAnd(a, b, 'and_')
}
