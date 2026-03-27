import { itertoolsZipLongest } from '../_helpers/_itertools.ts'

export function zip_longest(...args: unknown[]): unknown[][] {
  //      discuss at: https://locutus.io/python/itertools/zip_longest/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: zip_longest([1, 2, 3], ['A', 'B'])
  //       returns 1: [[1, 'A'], [2, 'B'], [3, null]]

  return itertoolsZipLongest(args)
}
