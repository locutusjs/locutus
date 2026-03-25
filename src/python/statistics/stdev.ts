import { variance } from './variance.ts'

type StatisticsNumericInput = number | boolean | bigint

export function stdev(data: unknown, xbar?: StatisticsNumericInput): number {
  //      discuss at: https://locutus.io/python/statistics/stdev/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns the sample standard deviation.
  //       example 1: stdev([1, 2, 3])
  //       returns 1: 1
  //       example 2: stdev([1, 2, 3], 2)
  //       returns 2: 1
  //       example 3: stdev([1.0, 2.0, 3.0])
  //       returns 3: 1

  return Math.sqrt(variance(data, xbar))
}
