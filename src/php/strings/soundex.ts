import type { PhpValue } from '../_helpers/_phpTypes.ts'

export function soundex(str: PhpValue): string {
  //      discuss at: https://locutus.io/php/soundex/
  // parity verified: PHP 8.3
  //     original by: Jonas Raoni Soares Silva (https://www.jsfromhell.com)
  //     original by: Arnout Kazemier (https://www.3rd-Eden.com)
  //     improved by: Jack
  //     improved by: Kevin van Zonneveld (https://kvz.io)
  //     bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  //     bugfixed by: Kevin van Zonneveld (https://kvz.io)
  //        input by: Brett Zamir (https://brett-zamir.me)
  //      revised by: Rafał Kukawski (https://blog.kukawski.pl)
  //       example 1: soundex('Kevin')
  //       returns 1: 'K150'
  //       example 2: soundex('Ellery')
  //       returns 2: 'E460'
  //       example 3: soundex('Euler')
  //       returns 3: 'E460'

  const input = String(str).toUpperCase()
  if (!input) {
    return ''
  }

  const sdx: Array<number | string> = [0, 0, 0, 0]
  const m: Record<string, number> = {
    B: 1,
    F: 1,
    P: 1,
    V: 1,
    C: 2,
    G: 2,
    J: 2,
    K: 2,
    Q: 2,
    S: 2,
    X: 2,
    Z: 2,
    D: 3,
    T: 3,
    L: 4,
    M: 5,
    N: 5,
    R: 6,
  }
  let i = 0
  let s = 0
  let p = 0

  let c = input.charAt(i++)
  while (c && s < 4) {
    const j = m[c]
    if (j) {
      if (j !== p) {
        sdx[s++] = p = j
      }
    } else {
      s += Number(i === 1)
      p = 0
    }
    c = input.charAt(i++)
  }

  sdx[0] = input.charAt(0)

  return sdx.join('')
}
