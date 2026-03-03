export function lcfirst(str: string): string {
  //      discuss at: https://locutus.io/perl/lcfirst/
  // parity verified: Perl 5.40
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: lcfirst('HELLO')
  //       returns 1: 'hELLO'
  //       example 2: lcfirst('Hello')
  //       returns 2: 'hello'

  const value = String(str)
  if (!value) {
    return ''
  }

  return value.charAt(0).toLowerCase() + value.slice(1)
}
