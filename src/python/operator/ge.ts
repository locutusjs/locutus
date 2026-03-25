import { pythonCompare } from '../_helpers/_operator.ts'

export function ge(a: unknown, b: unknown): boolean {
  //      discuss at: https://locutus.io/python/operator/ge/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns whether the left value is greater than or equal to the right value.
  //       example 1: ge(3, 2)
  //       returns 1: true
  //       example 2: ge('b', 'c')
  //       returns 2: false

  return pythonCompare(a, b, 'ge') >= 0
}
