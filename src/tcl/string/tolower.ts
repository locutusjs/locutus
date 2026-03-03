export function tolower(str: string): string {
  //      discuss at: https://locutus.io/tcl/tolower/
  // parity verified: Tcl 8.6
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: tolower('HELLO')
  //       returns 1: 'hello'
  //       example 2: tolower('Hello World')
  //       returns 2: 'hello world'

  return String(str).toLowerCase()
}
