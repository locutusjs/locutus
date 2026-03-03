export function rfind(needle: string, haystack: string): number {
  //      discuss at: https://locutus.io/rust/rfind/
  // parity verified: Rust 1.85
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: rfind('l', 'Hello World')
  //       returns 1: 9
  //       example 2: rfind('x', 'Hello World')
  //       returns 2: -1

  return String(haystack).lastIndexOf(String(needle))
}
