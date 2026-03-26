import { pythonTrueDiv } from '../_helpers/_operator.ts'

export function truediv(a: unknown, b: unknown): number {
  //      discuss at: https://locutus.io/python/operator/truediv/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Performs Python-style true division.
  //       example 1: truediv(7, 2)
  //       returns 1: 3.5
  //       example 2: truediv(true, 4)
  //       returns 2: 0.25

  return pythonTrueDiv(a, b, 'truediv')
}
