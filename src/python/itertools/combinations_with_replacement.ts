import { itertoolsCombinationsWithReplacement } from '../_helpers/_itertools.ts'

export function combinations_with_replacement(iterable: unknown, r: unknown): unknown[][] {
  //      discuss at: https://locutus.io/python/itertools/combinations_with_replacement/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: combinations_with_replacement(['A', 'B', 'C'], 2)
  //       returns 1: [['A', 'A'], ['A', 'B'], ['A', 'C'], ['B', 'B'], ['B', 'C'], ['C', 'C']]

  return itertoolsCombinationsWithReplacement(iterable, r)
}
