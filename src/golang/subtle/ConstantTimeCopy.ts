export function ConstantTimeCopy(v: number, x: number[] | unknown, y: number[] | unknown): number[] {
  //      discuss at: https://locutus.io/golang/subtle/ConstantTimeCopy
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Mirrors Go subtle.ConstantTimeCopy semantics and returns the updated destination buffer in locutus.
  //       example 1: ConstantTimeCopy(1, [1, 2, 3], [9, 8, 7])
  //       returns 1: [9, 8, 7]
  //       example 2: ConstantTimeCopy(0, [1, 2, 3], [9, 8, 7])
  //       returns 2: [1, 2, 3]
  //       example 3: ConstantTimeCopy(2, [1, 2, 3], [9, 8, 7])
  //       returns 3: [1, 2, 3]

  if (!Array.isArray(x) || !Array.isArray(y)) {
    return []
  }

  if (x.length !== y.length) {
    throw new RangeError('ConstantTimeCopy(): x and y must have the same length')
  }

  const mask = v === 1 ? 0xff : 0
  const out = x.slice()

  for (let i = 0; i < out.length; i++) {
    const left = Number(out[i]) & 0xff
    const right = Number(y[i]) & 0xff
    out[i] = ((left & (~mask & 0xff)) | (right & mask)) & 0xff
  }

  return out
}
