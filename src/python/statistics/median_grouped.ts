import { assertStatisticsArray, sortStatisticsValues, toFloatStatisticNumber } from '../_helpers/_statistics.ts'

export function median_grouped(data: unknown, interval = 1): number {
  //      discuss at: https://locutus.io/python/statistics/median_grouped/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Estimates the median for data binned around interval midpoints using grouped interpolation.
  //       example 1: median_grouped([52, 52, 53, 54])
  //       returns 1: 52.5
  //       example 2: median_grouped([52, 52, 53, 54], 2)
  //       returns 2: 52
  //       example 3: median_grouped([true, false, true])
  //       returns 3: 0.75

  const values = sortStatisticsValues(assertStatisticsArray(data, 'median_grouped'), 'median_grouped')
  const n = values.length
  if (n === 0) {
    throw new Error('no median for empty data')
  }

  const x = values[Math.floor(n / 2)]
  let i = 0
  while (i < values.length && values[i] !== x) {
    i += 1
  }

  let j = i
  while (j < values.length && values[j] === x) {
    j += 1
  }

  const numericInterval = toFloatStatisticNumber(interval, 'median_grouped')
  const numericX = toFloatStatisticNumber(x, 'median_grouped')
  const lowerLimit = numericX - numericInterval / 2
  const cumulativeFrequency = i
  const frequency = j - i

  return lowerLimit + (numericInterval * (n / 2 - cumulativeFrequency)) / frequency
}
