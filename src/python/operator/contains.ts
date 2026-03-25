import { pythonContains } from '../_helpers/_operator.ts'

export function contains(a: unknown, b: unknown): boolean {
  //      discuss at: https://locutus.io/python/operator/contains/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Checks membership with Python-style sequence and dict-key semantics.
  //       example 1: contains([1, 2, 3], 2)
  //       returns 1: true
  //       example 2: contains('banana', 'an')
  //       returns 2: true

  return pythonContains(a, b)
}
