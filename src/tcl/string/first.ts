export function first(needle: string, haystack: string, startIndex?: number): number {
  //  discuss at: https://locutus.io/tcl/first/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //   example 1: first('or', 'Hello World')
  //   returns 1: 7
  //   example 2: first('x', 'Hello World')
  //   returns 2: -1
  //   example 3: first('', 'abc', 2)
  //   returns 3: 2

  const source = String(haystack)
  const search = String(needle)
  const offset = startIndex === undefined ? 0 : Math.max(0, Math.trunc(Number(startIndex)))
  if (search === '') {
    return Math.min(offset, source.length)
  }
  return source.indexOf(search, offset)
}
