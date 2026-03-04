export function split_once(delimiter: string, str: string): [string, string] | null {
  //      discuss at: https://locutus.io/rust/split_once/
  // parity verified: Rust 1.85
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Splits string on first delimiter occurrence and returns [left, right] or null.
  //       example 1: split_once('=', 'a=b=c')
  //       returns 1: ['a', 'b=c']
  //       example 2: split_once('::', 'x::y')
  //       returns 2: ['x', 'y']
  //       example 3: split_once(':', 'abc')
  //       returns 3: null

  const haystack = String(str)
  const needle = String(delimiter)

  if (needle === '') {
    return ['', haystack]
  }

  const index = haystack.indexOf(needle)
  if (index < 0) {
    return null
  }

  return [haystack.slice(0, index), haystack.slice(index + needle.length)]
}
