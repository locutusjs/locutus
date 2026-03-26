import { pythonNot } from '../_helpers/_operator.ts'

export function not_(a: unknown): boolean {
  //      discuss at: https://locutus.io/python/operator/not_/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Uses Python truthiness rules instead of raw JS Boolean coercion.
  //       example 1: not_([])
  //       returns 1: true
  //       example 2: not_(NaN)
  //       returns 2: false

  return pythonNot(a)
}
