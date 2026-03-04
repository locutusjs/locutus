export function split_inclusive(delimiter: string, str: string): string[] {
  //      discuss at: https://locutus.io/rust/split_inclusive/
  // parity verified: Rust 1.85
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Splits by delimiter and keeps delimiter as suffix of each non-final match chunk.
  //       example 1: split_inclusive(',', 'a,b,c')
  //       returns 1: ['a,', 'b,', 'c']
  //       example 2: split_inclusive('::', 'x::y::z')
  //       returns 2: ['x::', 'y::', 'z']
  //       example 3: split_inclusive('', 'ab')
  //       returns 3: ['', 'a', 'b']

  const haystack = String(str)
  const needle = String(delimiter)

  if (needle === '') {
    return ['', ...Array.from(haystack)]
  }

  const out: string[] = []
  let start = 0

  while (start < haystack.length) {
    const found = haystack.indexOf(needle, start)
    if (found < 0) {
      out.push(haystack.slice(start))
      break
    }

    const end = found + needle.length
    out.push(haystack.slice(start, end))
    start = end
  }

  return out
}
