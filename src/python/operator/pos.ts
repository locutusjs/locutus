import { pythonPos } from '../_helpers/_operator.ts'

export function pos(a: unknown): number {
  //      discuss at: https://locutus.io/python/operator/pos/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns the Python-style unary positive of a numeric value.
  //       example 1: pos(-4)
  //       returns 1: -4
  //       example 2: pos(true)
  //       returns 2: 1

  return pythonPos(a, 'pos')
}
