import { pythonCompare } from '../_helpers/_operator.ts'

export function lt(a: unknown, b: unknown): boolean {
  //      discuss at: https://locutus.io/python/operator/lt/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns whether the left value is strictly less than the right value.
  //       example 1: lt(2, 3)
  //       returns 1: true
  //       example 2: lt('z', 'a')
  //       returns 2: false

  return pythonCompare(a, b, 'lt') < 0
}
