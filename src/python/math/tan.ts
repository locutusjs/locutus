export function tan(x: number): number {
  //      discuss at: https://locutus.io/python/tan/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns the tangent of x, where x is in radians
  //       example 1: tan(0)
  //       returns 1: 0
  //       example 2: tan(0.7853981633974483)
  //       returns 2: 0.9999999999999999
  //       example 3: tan(-0.7853981633974483)
  //       returns 3: -0.9999999999999999

  return Math.tan(x)
}
