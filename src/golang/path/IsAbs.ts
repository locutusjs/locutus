export function IsAbs(path: string): boolean {
  //      discuss at: https://locutus.io/golang/path/IsAbs
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: IsAbs('/a/b')
  //       returns 1: true
  //       example 2: IsAbs('a/b')
  //       returns 2: false
  //       example 3: IsAbs('')
  //       returns 3: false

  return String(path).startsWith('/')
}
