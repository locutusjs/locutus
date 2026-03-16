export function acosh(x: number): number {
  //      discuss at: https://locutus.io/python/acosh/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns the inverse hyperbolic cosine of x
  //       example 1: acosh(1)
  //       returns 1: 0
  //       example 2: acosh(2)
  //       returns 2: 1.3169578969248166
  //       example 3: acosh(10)
  //       returns 3: 2.993222846126381

  return Math.acosh(x)
}
