export function expm1(x: number): number {
  //      discuss at: https://locutus.io/python/expm1/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns e raised to x, minus 1
  //       example 1: expm1(0)
  //       returns 1: 0
  //       example 2: expm1(1)
  //       returns 2: 1.718281828459045
  //       example 3: expm1(-1)
  //       returns 3: -0.6321205588285577

  return Math.expm1 ? Math.expm1(x) : Math.exp(x) - 1
}
