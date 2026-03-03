export function to_uppercase(str: string): string {
  //      discuss at: https://locutus.io/rust/to_uppercase/
  // parity verified: Rust 1.85
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: to_uppercase('hello world')
  //       returns 1: 'HELLO WORLD'
  //       example 2: to_uppercase('Locutus')
  //       returns 2: 'LOCUTUS'

  return String(str).toUpperCase()
}
