import { medianOfSorted, sortedRNumbers } from '../_helpers/_stats.ts'

export function fivenum(x: unknown): number[] {
  //      discuss at: https://locutus.io/r/fivenum/
  // parity verified: R 4.4
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns Tukey's five-number summary as [min, lower hinge, median, upper hinge, max].
  //       example 1: fivenum([1, 2, 3, 4])
  //       returns 1: [1, 1.5, 2.5, 3.5, 4]
  //       example 2: fivenum([1, 2, 3, 4, 5])
  //       returns 2: [1, 2, 3, 4, 5]
  //       example 3: fivenum([1, 2, 3, 4, 5, 6])
  //       returns 3: [1, 2, 3.5, 5, 6]

  const values = sortedRNumbers(x, 'fivenum')
  if (values.length === 0) {
    return [Number.NaN, Number.NaN, Number.NaN, Number.NaN, Number.NaN]
  }

  const middle = Math.floor(values.length / 2)
  const lowerHalf = values.length % 2 === 0 ? values.slice(0, middle) : values.slice(0, middle + 1)
  const upperHalf = values.length % 2 === 0 ? values.slice(middle) : values.slice(middle)

  return [
    values[0] ?? Number.NaN,
    medianOfSorted(lowerHalf),
    medianOfSorted(values),
    medianOfSorted(upperHalf),
    values[values.length - 1] ?? Number.NaN,
  ]
}
