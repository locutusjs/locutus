import { pythonRShift } from '../_helpers/_operator.ts'

export function rshift(a: unknown, b: unknown): number {
  //      discuss at: https://locutus.io/python/operator/rshift/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Performs Python-style integer right shifts using bigint-backed arithmetic.
  //       example 1: rshift(16, 2)
  //       returns 1: 4
  //       example 2: rshift(-8, 1)
  //       returns 2: -4

  return pythonRShift(a, b, 'rshift')
}
