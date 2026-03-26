import { pythonSub } from '../_helpers/_operator.ts'

export function sub(a: unknown, b: unknown): number {
  //      discuss at: https://locutus.io/python/operator/sub/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Subtracts the right numeric operand from the left one.
  //       example 1: sub(10, 3)
  //       returns 1: 7
  //       example 2: sub(true, 2)
  //       returns 2: -1

  return pythonSub(a, b, 'sub')
}
