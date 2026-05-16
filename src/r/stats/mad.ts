import { medianOfSorted, sortedRNumbers, toRNumber } from '../_helpers/_stats.ts'

export function mad(x: unknown, center?: number, constant = 1.4826, low = false, high = false): number {
  //      discuss at: https://locutus.io/r/mad/
  // parity verified: R 4.4
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns R's median absolute deviation for a plain numeric vector.
  //       example 1: mad([1, 2, 3, 4])
  //       returns 1: 1.4826
  //       example 2: mad([1, 2, 4, 8], 3, 1)
  //       returns 2: 1.5
  //       example 3: mad([1, 2, 4, 8], 3, 2)
  //       returns 3: 3

  if (low && high) {
    throw new Error("mad() 'low' and 'high' cannot both be true")
  }

  const values = sortedRNumbers(x, 'mad')
  const centerValue = center === undefined ? medianOfSorted(values) : toRNumber(center, 'mad')
  const deviations = values.map((value) => Math.abs(value - centerValue)).sort((left, right) => left - right)

  return toRNumber(constant, 'mad') * medianOfSorted(deviations, low, high)
}
