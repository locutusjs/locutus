import { sampleCovariance, sampleVariance, toRNumericArray } from '../_helpers/_stats.ts'

export function cor(x: unknown, y: unknown): number {
  //      discuss at: https://locutus.io/r/cor/
  // parity verified: R 4.4
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Implements R's default Pearson correlation for two plain numeric vectors.
  //       example 1: cor([1, 2, 3], [1, 5, 7])
  //       returns 1: 0.9819805060619659
  //       example 2: cor([1, 2, 3], [7, 5, 3])
  //       returns 2: -1
  //       example 3: cor([1, 2, 3], [2, 4, 6])
  //       returns 3: 1

  const left = toRNumericArray(x, 'cor')
  const right = toRNumericArray(y, 'cor')
  const covariance = sampleCovariance(left, right, 'cor')
  const denominator = Math.sqrt(sampleVariance(left) * sampleVariance(right))

  return denominator === 0 ? Number.NaN : covariance / denominator
}
