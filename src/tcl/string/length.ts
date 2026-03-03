export function length(str: string): number {
  //      discuss at: https://locutus.io/tcl/length/
  // parity verified: Tcl 8.6
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: length('hello')
  //       returns 1: 5
  //       example 2: length('')
  //       returns 2: 0

  return String(str).length
}
