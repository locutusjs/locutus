import { pythonCountOf } from '../_helpers/_operator.ts'

export function countOf(a: unknown, b: unknown): number {
  //      discuss at: https://locutus.io/python/operator/countOf/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Counts occurrences in strings and arrays like Python's operator.countOf.
  //       example 1: countOf([1, 2, 1, 1], 1)
  //       returns 1: 3
  //       example 2: countOf('banana', 'a')
  //       returns 2: 3

  return pythonCountOf(a, b)
}
