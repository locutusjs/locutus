export function quotemeta(str: string): string {
  //      discuss at: https://locutus.io/perl/quotemeta/
  // parity verified: Perl 5.40
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: quotemeta('foo.bar')
  //       returns 1: 'foo\\.bar'
  //       example 2: quotemeta('a+b*c')
  //       returns 2: 'a\\+b\\*c'
  //       example 3: quotemeta('[test]')
  //       returns 3: '\\[test\\]'

  return String(str).replace(/([^A-Za-z0-9_])/g, '\\$1')
}
