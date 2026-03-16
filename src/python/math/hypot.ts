export function hypot(...coordinates: number[]): number {
  //      discuss at: https://locutus.io/python/hypot/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns the Euclidean norm of the provided coordinates
  //       example 1: hypot(3, 4)
  //       returns 1: 5
  //       example 2: hypot(3, 4, 12)
  //       returns 2: 13
  //       example 3: hypot()
  //       returns 3: 0

  return Math.hypot(...coordinates)
}
