export function ConstantTimeSelect(v: number, x: number, y: number): number {
  //      discuss at: https://locutus.io/golang/ConstantTimeSelect
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Mirrors Go subtle.ConstantTimeSelect bitwise semantics (exact for 32-bit integer values).
  //       example 1: ConstantTimeSelect(1, 42, 9)
  //       returns 1: 42
  //       example 2: ConstantTimeSelect(0, 42, 9)
  //       returns 2: 9
  //       example 3: ConstantTimeSelect(2, 42, 9)
  //       returns 3: 43

  const mask = (v - 1) | 0
  return (~mask & (x | 0)) | (mask & (y | 0)) | 0
}
