const signBuffer = new ArrayBuffer(8)
const signView = new DataView(signBuffer)

function hasNegativeSign(value: number): boolean {
  signView.setFloat64(0, value)
  return (signView.getUint8(0) & 0x80) !== 0
}

export function copysign(x: number, y: number): number {
  //      discuss at: https://locutus.io/python/copysign/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns x with the sign of y
  //       example 1: copysign(1, -2)
  //       returns 1: -1
  //       example 2: copysign(-3, 4)
  //       returns 2: 3
  //       example 3: copysign(5, -0.0)
  //       returns 3: -5

  const magnitude = Math.abs(x)
  return hasNegativeSign(y) ? -magnitude : magnitude
}
