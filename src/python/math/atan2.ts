export function atan2(y: number, x: number): number {
  //      discuss at: https://locutus.io/python/atan2/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns atan(y / x), in radians, using the signs of both arguments
  //       example 1: atan2(0, 1)
  //       returns 1: 0
  //       example 2: atan2(1, -1)
  //       returns 2: 2.356194490192345
  //       example 3: atan2(-1, -1)
  //       returns 3: -2.356194490192345

  return Math.atan2(y, x)
}
