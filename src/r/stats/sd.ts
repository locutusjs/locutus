import { variance } from './variance.ts'

export function sd(x: unknown): number {
  //      discuss at: https://locutus.io/r/sd/
  // parity verified: R 4.4
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns the sample standard deviation for a plain numeric vector.
  //       example 1: sd([1, 2, 3])
  //       returns 1: 1
  //       example 2: sd([1, 2, 3, 4])
  //       returns 2: 1.2909944487358056
  //       example 3: sd([2, 4, 6])
  //       returns 3: 2

  return Math.sqrt(variance(x))
}
