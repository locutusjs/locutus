import { pythonPow } from '../_helpers/_operator.ts'

export function pow(a: unknown, b: unknown): number {
  //      discuss at: https://locutus.io/python/operator/pow/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Raises the left operand to the power of the right operand.
  //       example 1: pow(2, 5)
  //       returns 1: 32
  //       example 2: pow(9, 0.5)
  //       returns 2: 3

  return pythonPow(a, b, 'pow')
}
