export function rsplit_terminator(delimiter: string, str: string): string[] {
  //      discuss at: https://locutus.io/rust/rsplit_terminator/
  // parity verified: Rust 1.85
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Reverse-order variant of split_terminator.
  //       example 1: rsplit_terminator('.', 'A.B.')
  //       returns 1: ['B', 'A']
  //       example 2: rsplit_terminator('::', 'x::y::z')
  //       returns 2: ['z', 'y', 'x']
  //       example 3: rsplit_terminator('.', 'A..B..')
  //       returns 3: ['', 'B', '', 'A']

  return split_terminator(delimiter, str).reverse()
}

function split_terminator(delimiter: string, str: string): string[] {
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
