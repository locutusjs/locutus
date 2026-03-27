import { itertoolsIslice } from '../_helpers/_itertools.ts'

export function islice(iterable: unknown, ...args: unknown[]): unknown[] {
  //      discuss at: https://locutus.io/python/itertools/islice/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: islice([0, 1, 2, 3, 4, 5], 1, 6, 2)
  //       returns 1: [1, 3, 5]
  //       example 2: islice([0, 1, 2, 3, 4, 5], 4)
  //       returns 2: [0, 1, 2, 3]

  return itertoolsIslice(iterable, args)
}
