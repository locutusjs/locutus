import { pythonLShift } from '../_helpers/_operator.ts'

export function lshift(a: unknown, b: unknown): number {
  //      discuss at: https://locutus.io/python/operator/lshift/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Performs Python-style integer left shifts using bigint-backed arithmetic.
  //       example 1: lshift(3, 2)
  //       returns 1: 12
  //       example 2: lshift(true, 3)
  //       returns 2: 8

  return pythonLShift(a, b, 'lshift')
}
