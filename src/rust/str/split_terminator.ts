export function split_terminator(delimiter: string, str: string): string[] {
  //      discuss at: https://locutus.io/rust/split_terminator/
  // parity verified: Rust 1.85
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Splits like split, but drops the trailing empty field when the input ends with the delimiter.
  //       example 1: split_terminator('.', 'A.B.')
  //       returns 1: ['A', 'B']
  //       example 2: split_terminator('::', 'x::y::z')
  //       returns 2: ['x', 'y', 'z']
  //       example 3: split_terminator('.', 'A..B..')
  //       returns 3: ['A', '', 'B', '']

  const source = String(str)
  const value = String(delimiter)
  if (value === '') {
    return ['', ...Array.from(source)]
  }

  const parts = source.split(value)
  if (source.endsWith(value)) {
    parts.pop()
  }

  return parts
}
