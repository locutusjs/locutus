import { itertoolsCompress } from '../_helpers/_itertools.ts'

export function compress(data: unknown, selectors: unknown): unknown[] {
  //      discuss at: https://locutus.io/python/itertools/compress/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: compress(['A', 'B', 'C', 'D'], [1, 0, 1, 0])
  //       returns 1: ['A', 'C']

  return itertoolsCompress(data, selectors)
}
