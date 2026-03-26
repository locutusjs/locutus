import { pythonMul } from '../_helpers/_operator.ts'

export function mul(a: unknown, b: unknown): number | string | unknown[] {
  //      discuss at: https://locutus.io/python/operator/mul/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Multiplies numbers and repeats strings or arrays like Python's operator.mul.
  //       example 1: mul(6, 7)
  //       returns 1: 42
  //       example 2: mul('ha', 3)
  //       returns 2: 'hahaha'

  return pythonMul(a, b, 'mul')
}
