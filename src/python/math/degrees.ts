export function degrees(x: number): number {
  //      discuss at: https://locutus.io/python/degrees/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Converts angle x from radians to degrees
  //       example 1: degrees(3.141592653589793)
  //       returns 1: 180
  //       example 2: degrees(1.5707963267948966)
  //       returns 2: 90
  //       example 3: degrees(0)
  //       returns 3: 0

  return x * (180 / Math.PI)
}
