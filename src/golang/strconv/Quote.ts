export function Quote(s: string): string {
  //      discuss at: https://locutus.io/golang/strconv/Quote
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns a double-quoted Go-like string literal.
  //       example 1: Quote('hello')
  //       returns 1: '"hello"'
  //       example 2: Quote('a\tb')
  //       returns 2: '"a\\tb"'
  //       example 3: Quote('go/lang')
  //       returns 3: '"go/lang"'

  return JSON.stringify(String(s))
}
