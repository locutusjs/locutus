import { itertoolsPairwise } from '../_helpers/_itertools.ts'

export function pairwise(iterable: unknown): unknown[][] {
  //      discuss at: https://locutus.io/python/itertools/pairwise/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: pairwise([1, 2, 3, 4])
  //       returns 1: [[1, 2], [2, 3], [3, 4]]

  return itertoolsPairwise(iterable)
}
