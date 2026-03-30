import { noInitializer, pythonReduce } from '../_helpers/_functools.ts'

export function reduce(
  func: (accumulator: unknown, value: unknown) => unknown,
  iterable: unknown,
  initializer?: unknown,
): unknown {
  //      discuss at: https://locutus.io/python/functools/reduce/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Reduces Python iterables to one plain value using a caller-provided combining function.
  //       example 1: reduce((a, b) => a + b, [1, 2, 3, 4])
  //       returns 1: 10
  //       example 2: reduce((a, b) => a + b, 'abc')
  //       returns 2: 'abc'

  return arguments.length >= 3 ? pythonReduce(func, iterable, initializer) : pythonReduce(func, iterable, noInitializer)
}
