export function ends_with(suffix: string, str: string): boolean {
  //      discuss at: https://locutus.io/rust/ends_with/
  // parity verified: Rust 1.85
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: ends_with('World', 'Hello World')
  //       returns 1: true
  //       example 2: ends_with('Hello', 'Hello World')
  //       returns 2: false

  return String(str).endsWith(String(suffix))
}
