export function ConstantTimeEq(x: number, y: number): number {
  //      discuss at: https://locutus.io/golang/ConstantTimeEq
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Mirrors Go subtle.ConstantTimeEq bitwise semantics on 32-bit integer values.
  //       example 1: ConstantTimeEq(42, 42)
  //       returns 1: 1
  //       example 2: ConstantTimeEq(42, 7)
  //       returns 2: 0
  //       example 3: ConstantTimeEq(-1, -1)
  //       returns 3: 1

  const left = x | 0
  const right = y | 0
  const diff = left ^ right
  const sign = (diff | -diff) >>> 31
  return sign ^ 1
}
