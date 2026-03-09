export function strip_suffix(suffix: string, str: string): string | null {
  //      discuss at: https://locutus.io/rust/strip_suffix/
  // parity verified: Rust 1.85
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns the remainder before the final matching suffix, or null when the suffix is absent.
  //       example 1: strip_suffix('.rs', 'lib.rs')
  //       returns 1: 'lib'
  //       example 2: strip_suffix('.ts', 'lib.rs')
  //       returns 2: null
  //       example 3: strip_suffix('', 'abc')
  //       returns 3: 'abc'

  const source = String(str)
  const value = String(suffix)
  if (!source.endsWith(value)) {
    return null
  }

  return source.slice(0, source.length - value.length)
}
