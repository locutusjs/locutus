import { pythonCompare } from '../_helpers/_operator.ts'

export function le(a: unknown, b: unknown): boolean {
  //      discuss at: https://locutus.io/python/operator/le/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns whether the left value is less than or equal to the right value.
  //       example 1: le(2, 2)
  //       returns 1: true
  //       example 2: le('c', 'b')
  //       returns 2: false

  return pythonCompare(a, b, 'le') <= 0
}
