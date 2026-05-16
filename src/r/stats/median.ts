import { medianOfSorted, sortedRNumbers } from '../_helpers/_stats.ts'

export function median(x: unknown): number {
  //      discuss at: https://locutus.io/r/median/
  // parity verified: R 4.4
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns R's default numeric median for a plain vector.
  //       example 1: median([1, 3, 5])
  //       returns 1: 3
  //       example 2: median([1, 2, 3, 4])
  //       returns 2: 2.5
  //       example 3: median([4, 1, 3, 2])
  //       returns 3: 2.5

  return medianOfSorted(sortedRNumbers(x, 'median'))
}
