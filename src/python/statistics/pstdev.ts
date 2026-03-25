import { pvariance } from './pvariance.ts'

type StatisticsNumericInput = number | boolean | bigint

export function pstdev(data: unknown, mu?: StatisticsNumericInput): number {
  //      discuss at: https://locutus.io/python/statistics/pstdev/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns the population standard deviation.
  //       example 1: pstdev([1, 2, 3])
  //       returns 1: 0.816496580927726
  //       example 2: pstdev([1])
  //       returns 2: 0
  //       example 3: pstdev([1, 2, 3], 2)
  //       returns 3: 0.816496580927726

  return Math.sqrt(pvariance(data, mu))
}
