export function tanh(x: number): number {
  //      discuss at: https://locutus.io/python/tanh/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns the hyperbolic tangent of x
  //       example 1: tanh(0)
  //       returns 1: 0
  //       example 2: tanh(1)
  //       returns 2: 0.7615941559557649
  //       example 3: tanh(-1)
  //       returns 3: -0.7615941559557649

  return Math.tanh(x)
}
