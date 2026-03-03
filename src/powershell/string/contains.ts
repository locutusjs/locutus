export function contains(needle: string, haystack: string): boolean {
  //      discuss at: https://locutus.io/powershell/contains/
  // parity verified: PowerShell 7.4
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: contains('World', 'Hello World')
  //       returns 1: true
  //       example 2: contains('z', 'Hello World')
  //       returns 2: false

  return String(haystack).includes(String(needle))
}
