import { pythonConcat } from '../_helpers/_operator.ts'

export function concat(a: unknown, b: unknown): string | unknown[] {
  //      discuss at: https://locutus.io/python/operator/concat/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Concatenates strings or arrays like Python's operator.concat.
  //       example 1: concat('py', 'thon')
  //       returns 1: 'python'
  //       example 2: concat([1, 2], [3])
  //       returns 2: [1, 2, 3]

  return pythonConcat(a, b)
}
