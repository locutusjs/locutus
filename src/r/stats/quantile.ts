import { sortedRNumbers, toRNumber } from '../_helpers/_stats.ts'

export function quantile(x: unknown, probs: number | number[] = [0, 0.25, 0.5, 0.75, 1]): number[] {
  //      discuss at: https://locutus.io/r/quantile/
  // parity verified: R 4.4
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Uses R's default type 7 interpolation and returns the plain numeric values without names.
  //       example 1: quantile([1, 2, 3, 4])
  //       returns 1: [1, 1.75, 2.5, 3.25, 4]
  //       example 2: quantile([1, 2, 3], [0.1, 0.9])
  //       returns 2: [1.2, 2.8]
  //       example 3: quantile([4, 1, 3, 2], [0.25, 0.5, 0.75])
  //       returns 3: [1.75, 2.5, 3.25]

  const values = sortedRNumbers(x, 'quantile')
  const probabilityValues = Array.isArray(probs) ? probs : [probs]

  if (values.length === 0) {
    return probabilityValues.map(() => Number.NaN)
  }

  return probabilityValues.map((probability) => {
    const p = toRNumber(probability, 'quantile')
    if (Number.isNaN(p) || p < 0 || p > 1) {
      throw new RangeError('quantile() probabilities must be between 0 and 1')
    }

    if (values.length === 1) {
      return values[0] ?? Number.NaN
    }

    const index = 1 + (values.length - 1) * p
    const lowerIndex = Math.floor(index)
    const fraction = index - lowerIndex
    const lower = values[lowerIndex - 1] ?? Number.NaN
    const upper = values[Math.min(lowerIndex, values.length - 1)] ?? Number.NaN
    return lower + fraction * (upper - lower)
  })
}
