import { pythonIndexOf } from '../_helpers/_operator.ts'

export function indexOf(a: unknown, b: unknown): number {
  //      discuss at: https://locutus.io/python/operator/indexOf/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Finds the first matching element or substring like Python's operator.indexOf.
  //       example 1: indexOf([4, 5, 6], 5)
  //       returns 1: 1
  //       example 2: indexOf('banana', 'n')
  //       returns 2: 2

  return pythonIndexOf(a, b)
}
