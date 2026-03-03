export function starts_with(prefix: string, str: string): boolean {
  //      discuss at: https://locutus.io/rust/starts_with/
  // parity verified: Rust 1.85
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: starts_with('Hello', 'Hello World')
  //       returns 1: true
  //       example 2: starts_with('World', 'Hello World')
  //       returns 2: false

  return String(str).startsWith(String(prefix))
}
