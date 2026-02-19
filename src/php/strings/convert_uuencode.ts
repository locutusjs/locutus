import type { PhpInput } from '../_helpers/_phpTypes.ts'
import { is_scalar as isScalar } from '../var/is_scalar.ts'

type UUEncodeInput = PhpInput

export function convert_uuencode(str: UUEncodeInput): string | false {
  //       discuss at: https://locutus.io/php/convert_uuencode/
  //      original by: Ole Vrijenhoek
  //      bugfixed by: Kevin van Zonneveld (https://kvz.io)
  //      bugfixed by: Brett Zamir (https://brett-zamir.me)
  // reimplemented by: Ole Vrijenhoek
  //        example 1: convert_uuencode("test\ntext text\r\n")
  //        returns 1: "0=&5S=`IT97AT('1E>'0-\"@\n`\n"

  const chr = function (c: number): string {
    return String.fromCharCode(c)
  }

  if (!str || str === '') {
    return chr(0)
  } else if (!isScalar(str)) {
    return false
  }
  const source = String(str)

  let c = 0
  let u = 0
  let a = 0
  let encoded = ''
  let tmp1 = ''
  let tmp2 = ''
  let bytes: number[] = []

  // divide string into chunks of 45 characters
  const chunk = function () {
    bytes = source
      .substr(u, 45)
      .split('')
      .map((char) => char.charCodeAt(0))
    return bytes.length || 0
  }

  while ((c = chunk()) !== 0) {
    u += 45

    // New line encoded data starts with number of bytes encoded.
    encoded += chr(c + 32)

    // Convert each char in bytes[] to a byte
    for (const byte of bytes) {
      tmp1 = byte.toString(2)
      while (tmp1.length < 8) {
        tmp1 = '0' + tmp1
      }
      tmp2 += tmp1
    }

    while (tmp2.length % 6) {
      tmp2 = tmp2 + '0'
    }

    for (let i = 0; i <= tmp2.length / 6 - 1; i++) {
      tmp1 = tmp2.substr(a, 6)
      if (tmp1 === '000000') {
        encoded += chr(96)
      } else {
        encoded += chr(parseInt(tmp1, 2) + 32)
      }
      a += 6
    }
    a = 0
    tmp2 = ''
    encoded += '\n'
  }

  // Add termination characters
  encoded += chr(96) + '\n'

  return encoded
}
