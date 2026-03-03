export function hex2bin(s: string | number): string | false {
  //      discuss at: https://locutus.io/php/hex2bin/
  // parity verified: PHP 8.3
  //     original by: Dumitru Uzun (https://duzun.me)
  //       example 1: hex2bin('44696d61')
  //       returns 1: 'Dima'
  //       example 2: hex2bin('00')
  //       returns 2: '\x00'
  //       example 3: hex2bin('2f1q')
  //       returns 3: false

  const ret: number[] = []

  const input = String(s)

  for (let i = 0; i < input.length; i += 2) {
    const c = Number.parseInt(input.substring(i, i + 1), 16)
    const k = Number.parseInt(input.substring(i + 1, i + 2), 16)
    if (Number.isNaN(c) || Number.isNaN(k)) {
      return false
    }
    ret.push((c << 4) | k)
  }

  return String.fromCharCode.apply(String, ret)
}
