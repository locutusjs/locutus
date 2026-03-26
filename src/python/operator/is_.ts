import { pythonIdentity } from '../_helpers/_operator.ts'

export function is_(a: unknown, b: unknown): boolean {
  //      discuss at: https://locutus.io/python/operator/is_/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Exposes JS identity semantics as the closest plain-value analogue to Python operator.is_.
  //       example 1: is_(1, 1)
  //       returns 1: true
  //       example 2: is_([], [])
  //       returns 2: false

  return pythonIdentity(a, b)
}
