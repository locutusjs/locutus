export function atanh(x: number): number {
  //      discuss at: https://locutus.io/python/atanh/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns the inverse hyperbolic tangent of x
  //       example 1: atanh(0)
  //       returns 1: 0
  //       example 2: atanh(0.5)
  //       returns 2: 0.5493061443340548
  //       example 3: atanh(-0.5)
  //       returns 3: -0.5493061443340548

  return Math.atanh(x)
}
