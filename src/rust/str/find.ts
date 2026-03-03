export function find(needle: string, haystack: string): number {
  //      discuss at: https://locutus.io/rust/find/
  // parity verified: Rust 1.85
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: find('or', 'Hello World')
  //       returns 1: 7
  //       example 2: find('x', 'Hello World')
  //       returns 2: -1

  return String(haystack).indexOf(String(needle))
}
