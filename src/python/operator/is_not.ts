import { pythonIdentity } from '../_helpers/_operator.ts'

export function is_not(a: unknown, b: unknown): boolean {
  //      discuss at: https://locutus.io/python/operator/is_not/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Negates the closest plain-value analogue to Python operator.is_.
  //       example 1: is_not([], [])
  //       returns 1: true
  //       example 2: is_not(1, 1)
  //       returns 2: false

  return !pythonIdentity(a, b)
}
