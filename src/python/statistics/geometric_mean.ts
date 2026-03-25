import { assertStatisticsArray, toStatisticNumber } from '../_helpers/_statistics.ts'

export function geometric_mean(data: unknown): number {
  //      discuss at: https://locutus.io/python/statistics/geometric_mean/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns the geometric mean for a non-empty dataset of positive numbers.
  //       example 1: geometric_mean([54, 24, 36])
  //       returns 1: 36.000000000000014
  //       example 2: geometric_mean([1, 3, 9])
  //       returns 2: 3
  //       example 3: geometric_mean([2.5, 6.25])
  //       returns 3: 3.9528470752104745

  const values = assertStatisticsArray(data, 'geometric_mean').map((value) =>
    toStatisticNumber(value, 'geometric_mean'),
  )
  if (values.length === 0 || values.some((value) => value <= 0)) {
    throw new Error('geometric mean requires a non-empty dataset containing positive numbers')
  }

  const logSum = values.reduce((sum, value) => sum + Math.log(value), 0)
  return Math.exp(logSum / values.length)
}
