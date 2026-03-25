import { assertStatisticsArray, sumProducts, toStatisticNumber } from '../_helpers/_statistics.ts'

export function correlation(x: unknown, y: unknown, method: 'linear' | 'ranked' = 'linear'): number {
  //      discuss at: https://locutus.io/python/statistics/correlation/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns Pearson correlation by default and supports Python's ranked mode for Spearman correlation.
  //       example 1: correlation([1, 2, 3], [1, 5, 7])
  //       returns 1: 0.9819805060619659
  //       example 2: correlation([1, 2, 3], [7, 5, 3])
  //       returns 2: -1
  //       example 3: correlation([1, 2, 3], [3, 2, 1], 'ranked')
  //       returns 3: -1

  const left = assertStatisticsArray(x, 'correlation').map((value) => toStatisticNumber(value, 'correlation'))
  const right = assertStatisticsArray(y, 'correlation').map((value) => toStatisticNumber(value, 'correlation'))

  const n = left.length
  if (right.length !== n) {
    throw new Error('correlation requires that both inputs have same number of data points')
  }
  if (n < 2) {
    throw new Error('correlation requires at least two data points')
  }
  if (method !== 'linear' && method !== 'ranked') {
    throw new TypeError(`Unknown method: '${String(method)}'`)
  }

  const xValues = method === 'ranked' ? rankValues(left) : centerValues(left)
  const yValues = method === 'ranked' ? rankValues(right) : centerValues(right)

  const sxy = sumProducts(xValues, yValues)
  const sxx = sumProducts(xValues, xValues)
  const syy = sumProducts(yValues, yValues)
  const denominator = Math.sqrt(sxx * syy)
  if (denominator === 0) {
    throw new Error('at least one of the inputs is constant')
  }

  return sxy / denominator
}

function centerValues(values: number[]): number[] {
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length
  return values.map((value) => value - mean)
}

function rankValues(values: number[]): number[] {
  const n = values.length
  const start = (n - 1) / -2
  const indexed = values.map((value, index) => ({ value, index })).sort((a, b) => a.value - b.value)
  const ranks = new Array<number>(n)

  let position = 0
  while (position < indexed.length) {
    let end = position + 1
    while (end < indexed.length && indexed[end]?.value === indexed[position]?.value) {
      end += 1
    }
    const averageRank = start + (position + end - 1) / 2
    for (let cursor = position; cursor < end; cursor += 1) {
      const entry = indexed[cursor]
      if (entry) {
        ranks[entry.index] = averageRank
      }
    }
    position = end
  }

  return ranks
}
