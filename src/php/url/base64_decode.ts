import { getPhpGlobalCallable, getPhpGlobalEntry, getPhpObjectEntry } from '../_helpers/_phpRuntimeState.ts'
import { isObjectLike, isPhpCallable } from '../_helpers/_phpTypes.ts'

export function base64_decode(encodedData: string | null | undefined): string | null | undefined {
  //  discuss at: https://locutus.io/php/base64_decode/
  // original by: Tyler Akins (https://rumkin.com)
  // improved by: Thunder.m
  // improved by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Kevin van Zonneveld (https://kvz.io)
  //    input by: Aman Gupta
  //    input by: Brett Zamir (https://brett-zamir.me)
  // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  // bugfixed by: Pellentesque Malesuada
  // bugfixed by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Indigo744
  //   example 1: base64_decode('S2V2aW4gdmFuIFpvbm5ldmVsZA==')
  //   returns 1: 'Kevin van Zonneveld'
  //   example 2: base64_decode('YQ==')
  //   returns 2: 'a'
  //   example 3: base64_decode('4pyTIMOgIGxhIG1vZGU=')
  //   returns 3: '✓ à la mode'

  // decodeUTF8string()
  // Internal function to decode properly UTF8 string
  // Adapted from Solution #1 at https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
  const decodeUTF8string = function (str: string): string {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(
      str
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join(''),
    )
  }

  const bufferValue = getPhpGlobalEntry('Buffer')
  if (isObjectLike(bufferValue)) {
    const bufferFrom = getPhpObjectEntry(bufferValue, 'from')
    if (isPhpCallable<[string, string], object>(bufferFrom)) {
      const decoded = bufferFrom.call(bufferValue, String(encodedData), 'base64')
      if (typeof decoded === 'object' && decoded !== null) {
        const decodedToString = getPhpObjectEntry(decoded, 'toString')
        if (isPhpCallable<[string], string>(decodedToString)) {
          const utf8Value = decodedToString.call(decoded, 'utf-8')
          if (typeof utf8Value === 'string') {
            return utf8Value
          }
        }
      }
    }
  }

  const atobValue = getPhpGlobalCallable<[string], string>('atob')
  if (atobValue) {
    const decoded = atobValue(String(encodedData))
    if (typeof decoded === 'string') {
      return decodeUTF8string(decoded)
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
  let dec = ''
  const tmpArr: string[] = []

  if (!encodedData) {
    return encodedData
  }

  encodedData += ''

  do {
    // unpack four hexets into three octets using index points in b64
    h1 = b64.indexOf(encodedData.charAt(i++))
    h2 = b64.indexOf(encodedData.charAt(i++))
    h3 = b64.indexOf(encodedData.charAt(i++))
    h4 = b64.indexOf(encodedData.charAt(i++))

    bits = (h1 << 18) | (h2 << 12) | (h3 << 6) | h4

    o1 = (bits >> 16) & 0xff
    o2 = (bits >> 8) & 0xff
    o3 = bits & 0xff

    if (h3 === 64) {
      tmpArr[ac++] = String.fromCharCode(o1)
    } else if (h4 === 64) {
      tmpArr[ac++] = String.fromCharCode(o1, o2)
    } else {
      tmpArr[ac++] = String.fromCharCode(o1, o2, o3)
    }
  } while (i < encodedData.length)

  dec = tmpArr.join('')

  return decodeUTF8string(dec.replace(/\0+$/, ''))
}
