import { pythonEqual } from '../_helpers/_operator.ts'

export function ne(a: unknown, b: unknown): boolean {
  //      discuss at: https://locutus.io/python/operator/ne/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Negates Python-style value equality for plain scalar, array, and object values.
  //       example 1: ne([1, 2], [1, 3])
  //       returns 1: true
  //       example 2: ne(1, true)
  //       returns 2: false

  return !pythonEqual(a, b)
}
