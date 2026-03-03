export function chop(str: string): string {
  //      discuss at: https://locutus.io/perl/chop/
  // parity verified: Perl 5.40
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: chop('Perl')
  //       returns 1: 'Per'
  //       example 2: chop('A')
  //       returns 2: ''
  //       example 3: chop('')
  //       returns 3: ''

  const value = String(str)
  if (!value) {
    return ''
  }

  return value.slice(0, -1)
}
