export function equal(str1: string, str2: string): boolean {
  //      discuss at: https://locutus.io/tcl/equal/
  // parity verified: Tcl 8.6
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: equal('abc', 'abc')
  //       returns 1: true
  //       example 2: equal('abc', 'abd')
  //       returns 2: false
  //       example 3: equal('', '')
  //       returns 3: true

  return String(str1) === String(str2)
}
