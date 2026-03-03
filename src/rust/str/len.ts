export function len(str: string): number {
  //      discuss at: https://locutus.io/rust/len/
  // parity verified: Rust 1.85
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: len('Hello')
  //       returns 1: 5
  //       example 2: len('')
  //       returns 2: 0

  return String(str).length
}
