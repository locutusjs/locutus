export function rsplit_once(delimiter: string, str: string): [string, string] | null {
  //      discuss at: https://locutus.io/rust/rsplit_once/
  // parity verified: Rust 1.85
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Splits string on the last delimiter occurrence and returns [left, right] or null.
  //       example 1: rsplit_once('=', 'a=b=c')
  //       returns 1: ['a=b', 'c']
  //       example 2: rsplit_once('::', 'x::y::z')
  //       returns 2: ['x::y', 'z']
  //       example 3: rsplit_once(':', 'abc')
  //       returns 3: null

  const source = String(str)
  const value = String(delimiter)

  if (value === '') {
    return [source, '']
  }

  const index = source.lastIndexOf(value)
  if (index < 0) {
    return null
  }

  return [source.slice(0, index), source.slice(index + value.length)]
}
