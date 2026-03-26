import { pythonCompare } from '../_helpers/_operator.ts'

export function gt(a: unknown, b: unknown): boolean {
  //      discuss at: https://locutus.io/python/operator/gt/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns whether the left value is strictly greater than the right value.
  //       example 1: gt(3, 2)
  //       returns 1: true
  //       example 2: gt('a', 'b')
  //       returns 2: false

  return pythonCompare(a, b, 'gt') > 0
}
