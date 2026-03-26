import { pythonBitXor } from '../_helpers/_operator.ts'

export function xor(a: unknown, b: unknown): boolean | number {
  //      discuss at: https://locutus.io/python/operator/xor/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Performs Python-style bitwise xor on integer-like values.
  //       example 1: xor(7, 10)
  //       returns 1: 13
  //       example 2: xor(true, false)
  //       returns 2: true

  return pythonBitXor(a, b, 'xor')
}
