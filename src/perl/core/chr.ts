export function chr(code: number): string {
  //      discuss at: https://locutus.io/perl/chr/
  // parity verified: Perl 5.40
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: chr(65)
  //       returns 1: 'A'
  //       example 2: chr(97)
  //       returns 2: 'a'
  //       example 3: chr(9731)
  //       returns 3: '☃'

  const normalized = Math.trunc(Number(code))
  if (!Number.isFinite(normalized) || normalized < 0 || normalized > 0x10ffff) {
    return ''
  }

  return String.fromCodePoint(normalized)
}
