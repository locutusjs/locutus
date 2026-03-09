export function lines(str: string): string[] {
  //      discuss at: https://locutus.io/rust/lines/
  // parity verified: Rust 1.85
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Splits on \n or \r\n, but does not treat a lone \r as a line ending.
  //       example 1: lines('foo\nbar\n')
  //       returns 1: ['foo', 'bar']
  //       example 2: lines('foo\r\nbar\n\nbaz\r')
  //       returns 2: ['foo', 'bar', '', 'baz\r']
  //       example 3: lines('')
  //       returns 3: []

  const source = String(str)
  if (source === '') {
    return []
  }

  const out: string[] = []
  let start = 0

  for (let i = 0; i < source.length; i += 1) {
    if (source[i] !== '\n') {
      continue
    }

    const end = i > start && source[i - 1] === '\r' ? i - 1 : i
    out.push(source.slice(start, end))
    start = i + 1
  }

  if (start < source.length) {
    out.push(source.slice(start))
  }

  return out
}
