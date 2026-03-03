export function replace(str: string, search: string, replacement: string): string {
  //      discuss at: https://locutus.io/rust/replace/
  // parity verified: Rust 1.85
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: replace('Hello World World', 'World', 'Locutus')
  //       returns 1: 'Hello Locutus Locutus'
  //       example 2: replace('a+b+c', '+', '-')
  //       returns 2: 'a-b-c'

  return String(str).replaceAll(String(search), String(replacement))
}
