export function abs(value: number): number {
  //      discuss at: https://locutus.io/perl/abs/
  // parity verified: Perl 5.40
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: abs(-4.2)
  //       returns 1: 4.2
  //       example 2: abs(0)
  //       returns 2: 0
  //       example 3: abs(7.3)
  //       returns 3: 7.3

  return Math.abs(Number(value))
}
