export function base64_encode(stringToEncode: string | null | undefined): string | null | undefined {
  //      discuss at: https://locutus.io/php/base64_encode/
  // parity verified: PHP 8.3
  //     original by: Tyler Akins (https://rumkin.com)
  //     improved by: Bayron Guevara
  //     improved by: Thunder.m
  //     improved by: Kevin van Zonneveld (https://kvz.io)
  //     improved by: Kevin van Zonneveld (https://kvz.io)
  //     improved by: Rafał Kukawski (https://blog.kukawski.pl)
  //     bugfixed by: Pellentesque Malesuada
  //     improved by: Indigo744
  //       example 1: base64_encode('Kevin van Zonneveld')
  //       returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
  //       example 2: base64_encode('a')
  //       returns 2: 'YQ=='
  //       example 3: base64_encode('✓ à la mode')
  //       returns 3: '4pyTIMOgIGxhIG1vZGU='

  // encodeUTF8string()
  // Internal function to encode properly UTF8 string
  // Adapted from Solution #1 at https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
  const encodeUTF8string = function (str: string): string {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into the base64 encoding algorithm.
    return encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(_match, p1: string) {
      return String.fromCharCode(Number.parseInt(p1, 16))
    })
  }

  const bufferValue = Reflect.get(globalThis, 'Buffer')
  if (typeof bufferValue === 'object' && bufferValue !== null) {
    const bufferFrom = Reflect.get(bufferValue, 'from')
    if (typeof bufferFrom === 'function') {
      const encoded = Reflect.apply(bufferFrom, bufferValue, [String(stringToEncode)])
      if (typeof encoded === 'object' && encoded !== null) {
        const encodedToString = Reflect.get(encoded, 'toString')
        if (typeof encodedToString === 'function') {
          const base64Value = Reflect.apply(encodedToString, encoded, ['base64'])
          if (typeof base64Value === 'string') {
            return base64Value
          }
        }
      }
    }
  }

  const btoaValue = Reflect.get(globalThis, 'btoa')
  if (typeof btoaValue === 'function') {
    const encoded = Reflect.apply(btoaValue, globalThis, [encodeUTF8string(String(stringToEncode))])
    if (typeof encoded === 'string') {
      return encoded
    }
  }

  const b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
  let o1: number
  let o2: number
  let o3: number
  let h1: number
  let h2: number
  let h3: number
  let h4: number
  let bits: number
  let i = 0
  let ac = 0
  let enc = ''
  const tmpArr: string[] = []

  if (!stringToEncode) {
    return stringToEncode
  }

  stringToEncode = encodeUTF8string(stringToEncode)

  do {
    // pack three octets into four hexets
    o1 = stringToEncode.charCodeAt(i++)
    o2 = stringToEncode.charCodeAt(i++)
    o3 = stringToEncode.charCodeAt(i++)

    bits = (o1 << 16) | (o2 << 8) | o3

    h1 = (bits >> 18) & 0x3f
    h2 = (bits >> 12) & 0x3f
    h3 = (bits >> 6) & 0x3f
    h4 = bits & 0x3f

    // use hexets to index into b64, and append result to encoded string
    tmpArr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4)
  } while (i < stringToEncode.length)

  enc = tmpArr.join('')

  const r = stringToEncode.length % 3

  return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3)
}
