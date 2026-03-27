import { itertoolsProduct } from '../_helpers/_itertools.ts'

export function product(...args: unknown[]): unknown[][] {
  //      discuss at: https://locutus.io/python/itertools/product/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: product([1, 2], ['A', 'B'])
  //       returns 1: [[1, 'A'], [1, 'B'], [2, 'A'], [2, 'B']]

  return itertoolsProduct(args)
}
