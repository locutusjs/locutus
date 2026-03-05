export type StringRange = {
  start: number
  end: number
}

export function rangeOf(
  str: string,
  search: string,
  caseInsensitive: boolean = false,
  backwards: boolean = false,
): StringRange | null {
  //  discuss at: https://locutus.io/swift/String/rangeOf/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Returns start/end indexes for first matching range, similar to Swift range(of:options:).
  //   example 1: rangeOf('Locutus', 'cut')
  //   returns 1: {start: 2, end: 5}
  //   example 2: rangeOf('Locutus Locutus', 'loc', true, true)
  //   returns 2: {start: 8, end: 11}
  //   example 3: rangeOf('Locutus', 'xyz')
  //   returns 3: null

  const source = String(str)
  const needle = String(search)

  if (needle === '') {
    return { start: 0, end: 0 }
  }

  const haystack = caseInsensitive ? source.toLowerCase() : source
  const pattern = caseInsensitive ? needle.toLowerCase() : needle
  const index = backwards ? haystack.lastIndexOf(pattern) : haystack.indexOf(pattern)

  if (index < 0) {
    return null
  }

  return {
    start: index,
    end: index + pattern.length,
  }
}
