import { itertoolsAccumulate } from '../_helpers/_itertools.ts'

export function accumulate(iterable: unknown, func?: (accumulator: unknown, value: unknown) => unknown): unknown[] {
  //      discuss at: https://locutus.io/python/itertools/accumulate/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Materializes Python's lazy iterator into a plain array of intermediate values.
  //       example 1: accumulate([1, 2, 3, 4])
  //       returns 1: [1, 3, 6, 10]
  //       example 2: accumulate(['a', 'b', 'c'])
  //       returns 2: ['a', 'ab', 'abc']

  return itertoolsAccumulate(iterable, func)
}
