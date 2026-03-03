export function last(needle: string, haystack: string, lastIndex?: number): number {
  //  discuss at: https://locutus.io/tcl/last/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //   example 1: last('or', 'Hello World')
  //   returns 1: 7
  //   example 2: last('l', 'Hello World')
  //   returns 2: 9
  //   example 3: last('l', 'Hello World', 3)
  //   returns 3: 3

  const source = String(haystack)
  const search = String(needle)
  if (search === '') {
    if (lastIndex === undefined) {
      return source.length
    }
    return Math.min(Math.max(0, Math.trunc(Number(lastIndex))), source.length)
  }
  if (lastIndex === undefined) {
    return source.lastIndexOf(search)
  }
  return source.lastIndexOf(search, Math.trunc(Number(lastIndex)))
}
