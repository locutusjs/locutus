export function ucfirst(str: string): string {
  //      discuss at: https://locutus.io/perl/ucfirst/
  // parity verified: Perl 5.40
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: ucfirst('hello')
  //       returns 1: 'Hello'
  //       example 2: ucfirst('hELLO')
  //       returns 2: 'HELLO'

  const value = String(str)
  if (!value) {
    return ''
  }

  return value.charAt(0).toUpperCase() + value.slice(1)
}
