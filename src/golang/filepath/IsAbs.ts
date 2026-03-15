export function IsAbs(path: string): boolean {
  //      discuss at: https://locutus.io/golang/filepath/IsAbs
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Mirrors path/filepath.IsAbs for slash-separated paths on the Go parity target.
  //       example 1: IsAbs('/a/b')
  //       returns 1: true
  //       example 2: IsAbs('a/b')
  //       returns 2: false
  //       example 3: IsAbs('')
  //       returns 3: false

  return String(path).startsWith('/')
}
