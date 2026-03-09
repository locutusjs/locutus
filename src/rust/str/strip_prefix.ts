export function strip_prefix(prefix: string, str: string): string | null {
  //      discuss at: https://locutus.io/rust/strip_prefix/
  // parity verified: Rust 1.85
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns the remainder after the first matching prefix, or null when the prefix is absent.
  //       example 1: strip_prefix('foo:', 'foo:bar')
  //       returns 1: 'bar'
  //       example 2: strip_prefix('bar', 'foo:bar')
  //       returns 2: null
  //       example 3: strip_prefix('', 'abc')
  //       returns 3: 'abc'

  const source = String(str)
  const value = String(prefix)
  if (!source.startsWith(value)) {
    return null
  }

  return source.slice(value.length)
}
