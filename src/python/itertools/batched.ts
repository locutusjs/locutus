import { itertoolsBatched } from '../_helpers/_itertools.ts'

export function batched(iterable: unknown, n: unknown): unknown[][] {
  //      discuss at: https://locutus.io/python/itertools/batched/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: batched([1, 2, 3, 4, 5], 2)
  //       returns 1: [[1, 2], [3, 4], [5]]

  return itertoolsBatched(iterable, n)
}
