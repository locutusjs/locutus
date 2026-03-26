import { pythonMod } from '../_helpers/_operator.ts'

export function mod(a: unknown, b: unknown): number {
  //      discuss at: https://locutus.io/python/operator/mod/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Uses Python's modulo semantics, where the remainder follows the divisor sign.
  //       example 1: mod(7, 3)
  //       returns 1: 1
  //       example 2: mod(-7, 3)
  //       returns 2: 2

  return pythonMod(a, b, 'mod')
}
