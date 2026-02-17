export function ToUpper(s: string): string {
  //      discuss at: https://locutus.io/golang/strings/ToUpper
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: ToUpper('Gopher')
  //       returns 1: 'GOPHER'

  return (s + '').toUpperCase()
}
