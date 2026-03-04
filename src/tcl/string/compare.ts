export function compare(str1: string, str2: string): number {
  //      discuss at: https://locutus.io/tcl/compare/
  // parity verified: Tcl 8.6
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: compare('abc', 'abc')
  //       returns 1: 0
  //       example 2: compare('abc', 'abd')
  //       returns 2: -1
  //       example 3: compare('abd', 'abc')
  //       returns 3: 1

  const left = String(str1)
  const right = String(str2)

  if (left === right) {
    return 0
  }

  return left < right ? -1 : 1
}
