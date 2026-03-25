import { pythonFloorDiv } from '../_helpers/_operator.ts'

export function floordiv(a: unknown, b: unknown): number {
  //      discuss at: https://locutus.io/python/operator/floordiv/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Uses Python's floor-division semantics, including for negative operands.
  //       example 1: floordiv(7, 3)
  //       returns 1: 2
  //       example 2: floordiv(-7, 3)
  //       returns 2: -3

  return pythonFloorDiv(a, b, 'floordiv')
}
