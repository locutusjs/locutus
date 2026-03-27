import { itertoolsChain } from '../_helpers/_itertools.ts'

export function chain(...iterables: unknown[]): unknown[] {
  //      discuss at: https://locutus.io/python/itertools/chain/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: chain([1, 2], [3, 4], [5])
  //       returns 1: [1, 2, 3, 4, 5]

  return itertoolsChain(iterables)
}
