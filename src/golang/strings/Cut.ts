export function Cut(s: string, sep: string): [string, string, boolean] {
  //      discuss at: https://locutus.io/golang/strings/Cut
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: Cut('a/b/c', '/')
  //       returns 1: ['a', 'b/c', true]
  //       example 2: Cut('abc', ':')
  //       returns 2: ['abc', '', false]
  //       example 3: Cut('abc', '')
  //       returns 3: ['', 'abc', true]

  const value = String(s)
  const separator = String(sep)
  const index = value.indexOf(separator)

  if (index < 0) {
    return [value, '', false]
  }

  return [value.slice(0, index), value.slice(index + separator.length), true]
}
