export function sign(x: number): number {
  //      discuss at: https://locutus.io/r/sign/
  // parity verified: R 4.4
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: sign(-5)
  //       returns 1: -1
  //       example 2: sign(0)
  //       returns 2: 0
  //       example 3: sign(3.14)
  //       returns 3: 1

  if (Object.is(x, -0)) {
    return 0
  }

  return Math.sign(x)
}
