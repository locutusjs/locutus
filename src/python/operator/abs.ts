import { pythonAbs } from '../_helpers/_operator.ts'

export function abs(a: unknown): number {
  //      discuss at: https://locutus.io/python/operator/abs/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Applies Python's operator.abs style scalar absolute value coercion.
  //       example 1: abs(-7)
  //       returns 1: 7
  //       example 2: abs(true)
  //       returns 2: 1

  return pythonAbs(a, 'abs')
}
