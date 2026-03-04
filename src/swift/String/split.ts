export function split(
  str: string,
  separator: string,
  maxSplits: number = Number.MAX_SAFE_INTEGER,
  omittingEmptySubsequences: boolean = true,
): string[] {
  //  discuss at: https://locutus.io/swift/String/split/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Mirrors Swift String.split semantics with configurable max splits and empty-subsequence handling.
  //   example 1: split('a,b,c', ',')
  //   returns 1: ['a', 'b', 'c']
  //   example 2: split('a,,b,', ',', Number.MAX_SAFE_INTEGER, false)
  //   returns 2: ['a', '', 'b', '']
  //   example 3: split('a,b,c,d', ',', 2)
  //   returns 3: ['a', 'b', 'c,d']

  const source = String(str)
  const needle = String(separator)
  const max = Number.isFinite(maxSplits) && maxSplits >= 0 ? Math.floor(maxSplits) : Number.MAX_SAFE_INTEGER

  if (needle === '') {
    const chars = Array.from(source)
    return omittingEmptySubsequences ? chars.filter((part) => part.length > 0) : chars
  }

  const out: string[] = []
  let start = 0
  let splits = 0

  while (splits < max) {
    const next = source.indexOf(needle, start)
    if (next < 0) {
      break
    }
    const part = source.slice(start, next)
    if (!omittingEmptySubsequences || part.length > 0) {
      out.push(part)
    }
    start = next + needle.length
    splits += 1
  }

  const tail = source.slice(start)
  if (!omittingEmptySubsequences || tail.length > 0) {
    out.push(tail)
  }

  return out
}
