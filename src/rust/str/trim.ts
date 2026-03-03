export function trim(str: string): string {
  //      discuss at: https://locutus.io/rust/trim/
  // parity verified: Rust 1.85
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: trim('  hello  ')
  //       returns 1: 'hello'
  //       example 2: trim('\n\thello\t\n')
  //       returns 2: 'hello'

  return String(str).trim()
}
