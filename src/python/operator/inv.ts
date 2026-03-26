import { pythonInvert } from '../_helpers/_operator.ts'

export function inv(a: unknown): number {
  //      discuss at: https://locutus.io/python/operator/inv/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Alias for Python-style bitwise inversion.
  //       example 1: inv(2)
  //       returns 1: -3
  //       example 2: inv(0)
  //       returns 2: -1

  return pythonInvert(a, 'inv')
}
