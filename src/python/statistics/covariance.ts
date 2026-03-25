import { assertStatisticsArray, sumProducts, toStatisticNumber } from '../_helpers/_statistics.ts'

export function covariance(x: unknown, y: unknown): number {
  //      discuss at: https://locutus.io/python/statistics/covariance/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns the sample covariance between two equally-sized numeric datasets.
  //       example 1: covariance([1, 2, 3], [1, 5, 7])
  //       returns 1: 3
  //       example 2: covariance([1, 2, 3], [7, 5, 3])
  //       returns 2: -2
  //       example 3: covariance([true, false, true], [1, 2, 3])
  //       returns 3: 0

  const left = assertStatisticsArray(x, 'covariance').map((value) => toStatisticNumber(value, 'covariance'))
  const right = assertStatisticsArray(y, 'covariance').map((value) => toStatisticNumber(value, 'covariance'))

  if (right.length !== left.length) {
    throw new Error('covariance requires that both inputs have same number of data points')
  }
  if (left.length < 2) {
    throw new Error('covariance requires at least two data points')
  }

  const n = left.length
  const xbar = left.reduce((sum, value) => sum + value, 0) / n
  const ybar = right.reduce((sum, value) => sum + value, 0) / n
  const centeredX = left.map((value) => value - xbar)
  const centeredY = right.map((value) => value - ybar)
  return sumProducts(centeredX, centeredY) / (n - 1)
}
