export function chomp(str: string): string {
  //      discuss at: https://locutus.io/perl/chomp/
  // parity verified: Perl 5.40
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: chomp('line\n')
  //       returns 1: 'line'
  //       example 2: chomp('line\r\n')
  //       returns 2: 'line'
  //       example 3: chomp('line')
  //       returns 3: 'line'

  const value = String(str)

  if (value.endsWith('\r\n')) {
    return value.slice(0, -2)
  }
  if (value.endsWith('\n') || value.endsWith('\r')) {
    return value.slice(0, -1)
  }

  return value
}
