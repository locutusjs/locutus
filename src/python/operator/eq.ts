import { pythonEqual } from '../_helpers/_operator.ts'

export function eq(a: unknown, b: unknown): boolean {
  //      discuss at: https://locutus.io/python/operator/eq/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Performs Python-style value equality for plain scalar, array, and object values.
  //       example 1: eq([1, 2], [1, 2])
  //       returns 1: true
  //       example 2: eq(1, true)
  //       returns 2: true

  return pythonEqual(a, b)
}
