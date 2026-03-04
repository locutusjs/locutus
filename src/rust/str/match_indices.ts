export function match_indices(pattern: string, str: string): Array<[number, string]> {
  //      discuss at: https://locutus.io/rust/match_indices/
  // parity verified: Rust 1.85
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns [index, match] pairs for all non-overlapping matches.
  //       example 1: match_indices('ab', 'abxxab')
  //       returns 1: [[0, 'ab'], [4, 'ab']]
  //       example 2: match_indices('ana', 'banana')
  //       returns 2: [[1, 'ana']]
  //       example 3: match_indices('z', 'banana')
  //       returns 3: []

  const needle = String(pattern)
  const haystack = String(str)

  if (needle === '') {
    return []
  }

  const out: Array<[number, string]> = []
  let index = 0
  while (index <= haystack.length - needle.length) {
    const found = haystack.indexOf(needle, index)
    if (found < 0) {
      break
    }
    out.push([found, needle])
    index = found + needle.length
  }

  return out
}
