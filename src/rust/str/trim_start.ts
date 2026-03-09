export function trim_start(str: string): string {
  //      discuss at: https://locutus.io/rust/trim_start/
  // parity verified: Rust 1.85
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: trim_start('  hello  ')
  //       returns 1: 'hello  '
  //       example 2: trim_start('\n\t hello')
  //       returns 2: 'hello'

  return String(str).trimStart()
}
