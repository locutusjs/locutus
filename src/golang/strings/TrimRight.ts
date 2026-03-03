export function TrimRight(s: string, cutset: string): string {
  //      discuss at: https://locutus.io/golang/strings/TrimRight/
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: TrimRight('¡¡¡Hello, Gophers!!!', '!¡')
  //       returns 1: '¡¡¡Hello, Gophers'
  //       example 2: TrimRight('  hello  ', ' ')
  //       returns 2: '  hello'

  let end = s.length
  while (end > 0 && cutset.includes(s.charAt(end - 1))) {
    end--
  }
  return s.slice(0, end)
}
