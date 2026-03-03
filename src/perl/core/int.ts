export function int(value: number): number {
  //      discuss at: https://locutus.io/perl/int/
  // parity verified: Perl 5.40
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: int(4.7)
  //       returns 1: 4
  //       example 2: int(-4.7)
  //       returns 2: -4
  //       example 3: int(3)
  //       returns 3: 3

  const num = Number(value)
  if (!Number.isFinite(num)) {
    return 0
  }

  return Math.trunc(num)
}
