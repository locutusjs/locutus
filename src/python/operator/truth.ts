import { pythonTruth } from '../_helpers/_operator.ts'

export function truth(a: unknown): boolean {
  //      discuss at: https://locutus.io/python/operator/truth/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Uses Python truthiness rules for plain values, including empty containers and NaN.
  //       example 1: truth({})
  //       returns 1: false
  //       example 2: truth(NaN)
  //       returns 2: true

  return pythonTruth(a)
}
