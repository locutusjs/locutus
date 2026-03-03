export function to_lowercase(str: string): string {
  //      discuss at: https://locutus.io/rust/to_lowercase/
  // parity verified: Rust 1.85
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: to_lowercase('HELLO WORLD')
  //       returns 1: 'hello world'
  //       example 2: to_lowercase('Locutus')
  //       returns 2: 'locutus'

  return String(str).toLowerCase()
}
