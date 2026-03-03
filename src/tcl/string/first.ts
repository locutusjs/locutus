export function first(needle: string, haystack: string, startIndex?: number): number {
  //      discuss at: https://locutus.io/tcl/first/
  // parity verified: Tcl 8.6
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: first('or', 'Hello World')
  //       returns 1: 7
  //       example 2: first('x', 'Hello World')
  //       returns 2: -1
  //       example 3: first('', 'abc', 2)
  //       returns 3: -1

  const source = String(haystack)
  const search = String(needle)
  const offset = startIndex === undefined ? 0 : Math.max(0, Math.trunc(Number(startIndex)))
  if (search === '') {
    return -1
  }
  return source.indexOf(search, offset)
}
