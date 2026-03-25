import { pythonInvert } from '../_helpers/_operator.ts'

export function invert(a: unknown): number {
  //      discuss at: https://locutus.io/python/operator/invert/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Performs Python-style bitwise inversion on integer-like values.
  //       example 1: invert(5)
  //       returns 1: -6
  //       example 2: invert(0)
  //       returns 2: -1

  return pythonInvert(a, 'invert')
}
