import {
  assertStatisticsArray,
  statisticsMeanFromSequence,
  sumProducts,
  toStatisticNumber,
} from '../_helpers/_statistics.ts'

export function linear_regression(x: unknown, y: unknown, proportional = false): { slope: number; intercept: number } {
  //      discuss at: https://locutus.io/python/statistics/linear_regression/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns ordinary least-squares slope and intercept, mirroring Python's named tuple as a plain object.
  //       example 1: linear_regression([1, 2, 3], [2, 4, 6])
  //       returns 1: {slope: 2, intercept: 0}
  //       example 2: linear_regression([1, 2, 3], [1, 2, 2])
  //       returns 2: {slope: 0.5, intercept: 0.6666666666666667}
  //       example 3: linear_regression([1, 2, 3], [2, 4, 6], true)
  //       returns 3: {slope: 2, intercept: 0}

  const xValues = assertStatisticsArray(x, 'linear_regression').map((value) =>
    toStatisticNumber(value, 'linear_regression'),
  )
  const yValues = assertStatisticsArray(y, 'linear_regression').map((value) =>
    toStatisticNumber(value, 'linear_regression'),
  )

  const n = xValues.length
  if (yValues.length !== n) {
    throw new Error('linear regression requires that both inputs have same number of data points')
  }
  if (n < 2) {
    throw new Error('linear regression requires at least two data points')
  }

  if (proportional) {
    const sxy = sumProducts(xValues, yValues) + 0
    const sxx = sumProducts(xValues, xValues)
    if (sxx === 0) {
      throw new Error('x is constant')
    }
    return { slope: sxy / sxx, intercept: 0 }
  }

  const xbar = statisticsMeanFromSequence({
    values: xValues,
    integral: xValues.every(Number.isInteger),
  })
  const ybar = statisticsMeanFromSequence({
    values: yValues,
    integral: yValues.every(Number.isInteger),
  })

  const centeredX = xValues.map((value) => value - xbar)
  const centeredY = yValues.map((value) => value - ybar)
  const sxy = sumProducts(centeredX, centeredY) + 0
  const sxx = sumProducts(centeredX, centeredX)
  if (sxx === 0) {
    throw new Error('x is constant')
  }

  const slope = sxy / sxx
  return {
    slope,
    intercept: ybar - slope * xbar,
  }
}
