export function lastindexof(needle: string, haystack: string, startIndex?: number): number {
  //      discuss at: https://locutus.io/powershell/lastindexof/
  // parity verified: PowerShell 7.4
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: lastindexof('o', 'Hello World')
  //       returns 1: 7
  //       example 2: lastindexof('x', 'Hello World')
  //       returns 2: -1
  //       example 3: lastindexof('o', 'Hello World', 6)
  //       returns 3: 4

  const source = String(haystack)
  const search = String(needle)
  if (startIndex === undefined) {
    return source.lastIndexOf(search)
  }
  return source.lastIndexOf(search, Math.trunc(Number(startIndex)))
}
