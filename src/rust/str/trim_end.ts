export function trim_end(str: string): string {
  //      discuss at: https://locutus.io/rust/trim_end/
  // parity verified: Rust 1.85
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: trim_end('  hello  ')
  //       returns 1: '  hello'
  //       example 2: trim_end('hello\t\n')
  //       returns 2: 'hello'

  return String(str).trimEnd()
}
