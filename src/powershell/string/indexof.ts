export function indexof(needle: string, haystack: string, startIndex?: number): number {
  //      discuss at: https://locutus.io/powershell/indexof/
  // parity verified: PowerShell 7.4
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: indexof('or', 'Hello World')
  //       returns 1: 7
  //       example 2: indexof('x', 'Hello World')
  //       returns 2: -1
  //       example 3: indexof('o', 'Hello World', 5)
  //       returns 3: 7

  const source = String(haystack)
  const search = String(needle)
  if (startIndex === undefined) {
    return source.indexOf(search)
  }
  return source.indexOf(search, Math.max(0, Math.trunc(Number(startIndex))))
}
