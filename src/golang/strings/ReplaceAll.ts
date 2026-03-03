export function ReplaceAll(s: string, old: string, replacement: string): string {
  //      discuss at: https://locutus.io/golang/strings/ReplaceAll
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: ReplaceAll('oink oink oink', 'k', 'ky')
  //       returns 1: 'oinky oinky oinky'
  //       example 2: ReplaceAll('foo', 'o', '0')
  //       returns 2: 'f00'
  //       example 3: ReplaceAll('abc', '', '-')
  //       returns 3: '-a-b-c-'

  const value = String(s)
  const from = String(old)
  const to = String(replacement)

  if (from === '') {
    return `${to}${Array.from(value).join(to)}${to}`
  }

  return value.split(from).join(to)
}
