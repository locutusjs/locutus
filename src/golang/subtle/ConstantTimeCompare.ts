const textEncoder = new TextEncoder()

export function ConstantTimeCompare(x: string, y: string): number {
  //      discuss at: https://locutus.io/golang/subtle/ConstantTimeCompare
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Compares UTF-8 byte sequences in constant time.
  //       example 1: ConstantTimeCompare('hunter2', 'hunter2')
  //       returns 1: 1
  //       example 2: ConstantTimeCompare('hunter2', 'hunter3')
  //       returns 2: 0
  //       example 3: ConstantTimeCompare('hunter2', 'hunt')
  //       returns 3: 0

  const left = textEncoder.encode(String(x))
  const right = textEncoder.encode(String(y))

  if (left.length !== right.length) {
    return 0
  }

  let diff = 0
  for (let i = 0; i < left.length; i += 1) {
    diff |= (left[i] ?? 0) ^ (right[i] ?? 0)
  }

  return diff === 0 ? 1 : 0
}
