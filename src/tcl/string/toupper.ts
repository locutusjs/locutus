export function toupper(str: string): string {
  //  discuss at: https://locutus.io/tcl/toupper/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //   example 1: toupper('hello')
  //   returns 1: 'HELLO'
  //   example 2: toupper('Hello World')
  //   returns 2: 'HELLO WORLD'

  return String(str).toUpperCase()
}
