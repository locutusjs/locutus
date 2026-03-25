import { assertStatisticsArray, sortStatisticsValues } from '../_helpers/_statistics.ts'

export function quantiles(data: unknown, n = 4, method: 'exclusive' | 'inclusive' = 'exclusive'): number[] {
  //      discuss at: https://locutus.io/python/statistics/quantiles/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Divides numeric sample data into equally probable intervals using Python's inclusive or exclusive interpolation.
  //       example 1: quantiles([1, 2, 3, 4, 5])
  //       returns 1: [1.5, 3, 4.5]
  //       example 2: quantiles([1, 2, 3, 4, 5], 4, 'inclusive')
  //       returns 2: [2, 3, 4]
  //       example 3: quantiles([1, 2], 4)
  //       returns 3: [0.75, 1.5, 2.25]

  if (n < 1) {
    throw new Error('n must be at least 1')
  }

  const sorted = sortStatisticsValues(assertStatisticsArray(data, 'quantiles'), 'quantiles')
  if (sorted.length < 2) {
    throw new Error('must have at least two data points')
  }

  const values = sorted.map((value) => {
    if (typeof value === 'string') {
      throw new TypeError("unsupported operand type(s) for /: 'str' and 'int'")
    }
    return typeof value === 'boolean' ? (value ? 1 : 0) : Number(value)
  })

  const result: number[] = []
  if (method === 'inclusive') {
    const m = values.length - 1
    for (let i = 1; i < n; i += 1) {
      const product = i * m
      const j = Math.floor(product / n)
      const delta = product % n
      const interpolated = ((values[j] ?? 0) * (n - delta) + (values[j + 1] ?? 0) * delta) / n
      result.push(interpolated)
    }
    return result
  }

  if (method === 'exclusive') {
    const ld = values.length
    const m = ld + 1
    for (let i = 1; i < n; i += 1) {
      let j = Math.floor((i * m) / n)
      j = j < 1 ? 1 : j > ld - 1 ? ld - 1 : j
      const delta = i * m - j * n
      const interpolated = ((values[j - 1] ?? 0) * (n - delta) + (values[j] ?? 0) * delta) / n
      result.push(interpolated)
    }
    return result
  }

  throw new TypeError(`Unknown method: '${String(method)}'`)
}
