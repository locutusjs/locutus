import { pythonNeg } from '../_helpers/_operator.ts'

export function neg(a: unknown): number {
  //      discuss at: https://locutus.io/python/operator/neg/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns the Python-style unary negative of a numeric value.
  //       example 1: neg(4)
  //       returns 1: -4
  //       example 2: neg(true)
  //       returns 2: -1

  return pythonNeg(a, 'neg')
}
