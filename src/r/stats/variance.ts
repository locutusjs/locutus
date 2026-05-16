import { sampleVariance, toRNumericArray } from '../_helpers/_stats.ts'

export function variance(x: unknown): number {
  //      discuss at: https://locutus.io/r/variance/
  // parity verified: R 4.4
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: JS-safe equivalent of R's var() for a plain vector; matrix/data-frame forms are out of scope.
  //       example 1: variance([1, 2, 3])
  //       returns 1: 1
  //       example 2: variance([1, 2, 3, 4])
  //       returns 2: 1.6666666666666667
  //       example 3: variance([2, 4, 6])
  //       returns 3: 4

  return sampleVariance(toRNumericArray(x, 'variance'))
}
