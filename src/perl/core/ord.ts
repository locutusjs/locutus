export function ord(str: string): number {
  //      discuss at: https://locutus.io/perl/ord/
  // parity verified: Perl 5.40
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: ord('A')
  //       returns 1: 65
  //       example 2: ord('a')
  //       returns 2: 97
  //       example 3: ord('☃')
  //       returns 3: 9731

  const value = String(str)
  return value.codePointAt(0) ?? 0
}
