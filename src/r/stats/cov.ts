import { sampleCovariance, toRNumericArray } from '../_helpers/_stats.ts'

export function cov(x: unknown, y: unknown): number {
  //      discuss at: https://locutus.io/r/cov/
  // parity verified: R 4.4
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Implements R's vector sample covariance; matrix/data-frame forms are out of scope.
  //       example 1: cov([1, 2, 3], [1, 5, 7])
  //       returns 1: 3
  //       example 2: cov([1, 2, 3], [7, 5, 3])
  //       returns 2: -2
  //       example 3: cov([true, false, true], [1, 2, 3])
  //       returns 3: 0

  return sampleCovariance(toRNumericArray(x, 'cov'), toRNumericArray(y, 'cov'), 'cov')
}
