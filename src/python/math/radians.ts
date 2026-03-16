export function radians(x: number): number {
  //      discuss at: https://locutus.io/python/radians/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Converts angle x from degrees to radians
  //       example 1: radians(180)
  //       returns 1: 3.141592653589793
  //       example 2: radians(90)
  //       returns 2: 1.5707963267948966
  //       example 3: radians(0)
  //       returns 3: 0

  return x * (Math.PI / 180)
}
