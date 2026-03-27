import { itertoolsCombinations } from '../_helpers/_itertools.ts'

export function combinations(iterable: unknown, r: unknown): unknown[][] {
  //      discuss at: https://locutus.io/python/itertools/combinations/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: combinations(['A', 'B', 'C'], 2)
  //       returns 1: [['A', 'B'], ['A', 'C'], ['B', 'C']]

  return itertoolsCombinations(iterable, r)
}
