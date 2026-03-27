import { itertoolsPermutations } from '../_helpers/_itertools.ts'

export function permutations(iterable: unknown, r?: unknown): unknown[][] {
  //      discuss at: https://locutus.io/python/itertools/permutations/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: permutations(['A', 'B', 'C'], 2)
  //       returns 1: [['A', 'B'], ['A', 'C'], ['B', 'A'], ['B', 'C'], ['C', 'A'], ['C', 'B']]

  return itertoolsPermutations(iterable, r)
}
