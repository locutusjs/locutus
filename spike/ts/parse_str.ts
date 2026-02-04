//       discuss at: https://locutus.io/php/parse_str/
//      original by: Cagri Ekin
//      improved by: Michael White (https://getsprink.com)
//      improved by: Jack
//      improved by: Brett Zamir (https://brett-zamir.me)
//      bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
//      bugfixed by: Brett Zamir (https://brett-zamir.me)
//      bugfixed by: stag019
//      bugfixed by: Brett Zamir (https://brett-zamir.me)
//      bugfixed by: MIO_KODUKI (https://mio-koduki.blogspot.com/)
// reimplemented by: stag019
//         input by: Dreamer
//         input by: Zaide (https://zaidesthings.com/)
//         input by: David Pesta (https://davidpesta.com/)
//         input by: jeicquest
//      bugfixed by: Rafał Kukawski
//           note 1: When no argument is specified, will put variables in global scope.
//           note 1: When a particular argument has been passed, and the
//           note 1: returned value is different parse_str of PHP.
//           note 1: For example, a=b=c&d====c
//        example 1: var $arr = {}
//        example 1: parse_str('first=foo&second=bar', $arr)
//        example 1: var $result = $arr
//        returns 1: { first: 'foo', second: 'bar' }
//        example 2: var $arr = {}
//        example 2: parse_str('str_a=Jack+and+Jill+didn%27t+see+the+well.', $arr)
//        example 2: var $result = $arr
//        returns 2: { str_a: "Jack and Jill didn't see the well." }
//        example 3: var $abc = {3:'a'}
//        example 3: parse_str('a[b]["c"]=def&a[q]=t+5', $abc)
//        example 3: var $result = $abc
//        returns 3: {"3":"a","a":{"b":{"c":"def"},"q":"t 5"}}
//        example 4: var $arr = {}
//        example 4: parse_str('a[][]=value', $arr)
//        example 4: var $result = $arr
//        returns 4: {"a":{"0":{"0":"value"}}}
//        example 5: var $arr = {}
//        example 5: parse_str('a=1&a[]=2', $arr)
//        example 5: var $result = $arr
//        returns 5: {"a":{"0":"2"}}

type ParseStrArray = Record<string, unknown>

declare const window: typeof globalThis | undefined
declare const global: typeof globalThis

export default function parse_str(str: string, array?: ParseStrArray): void {
  const strArr: string[] = String(str).replace(/^&/, '').replace(/&$/, '').split('&')
  const sal: number = strArr.length
  let i: number
  let j: number
  let ct: number
  let p: string
  let lastObj: ParseStrArray
  let obj: ParseStrArray
  let chr: string
  let tmp: string[]
  let key: string | number
  let value: string
  let postLeftBracketPos: number
  let keys: string[]
  let keysLen: number

  const _fixStr = function (str: string): string {
    return decodeURIComponent(str.replace(/\+/g, '%20'))
  }

  const $global: typeof globalThis = typeof window !== 'undefined' ? window : global
  ;($global as Record<string, unknown>).$locutus = ($global as Record<string, unknown>).$locutus || {}
  const $locutus = ($global as Record<string, unknown>).$locutus as Record<string, unknown>
  $locutus.php = $locutus.php || {}

  let targetArray: ParseStrArray = array || ($global as unknown as ParseStrArray)

  for (i = 0; i < sal; i++) {
    tmp = strArr[i].split('=')
    key = _fixStr(tmp[0])
    value = tmp.length < 2 ? '' : _fixStr(tmp[1])

    if (/__proto__|constructor|prototype/.test(key as string)) {
      break
    }

    while ((key as string).charAt(0) === ' ') {
      key = (key as string).slice(1)
    }

    if ((key as string).indexOf('\x00') > -1) {
      key = (key as string).slice(0, (key as string).indexOf('\x00'))
    }

    if (key && (key as string).charAt(0) !== '[') {
      keys = []
      postLeftBracketPos = 0

      for (j = 0; j < (key as string).length; j++) {
        if ((key as string).charAt(j) === '[' && !postLeftBracketPos) {
          postLeftBracketPos = j + 1
        } else if ((key as string).charAt(j) === ']') {
          if (postLeftBracketPos) {
            if (!keys.length) {
              keys.push((key as string).slice(0, postLeftBracketPos - 1))
            }

            keys.push((key as string).substr(postLeftBracketPos, j - postLeftBracketPos))
            postLeftBracketPos = 0

            if ((key as string).charAt(j + 1) !== '[') {
              break
            }
          }
        }
      }

      if (!keys.length) {
        keys = [key as string]
      }

      for (j = 0; j < keys[0].length; j++) {
        chr = keys[0].charAt(j)

        if (chr === ' ' || chr === '.' || chr === '[') {
          keys[0] = keys[0].substr(0, j) + '_' + keys[0].substr(j + 1)
        }

        if (chr === '[') {
          break
        }
      }

      obj = targetArray

      for (j = 0, keysLen = keys.length; j < keysLen; j++) {
        key = keys[j].replace(/^['"]/, '').replace(/['"]$/, '')
        lastObj = obj

        if ((key === '' || key === ' ') && j !== 0) {
          // Insert new dimension
          ct = -1

          for (p in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, p)) {
              if (+p > ct && p.match(/^\d+$/g)) {
                ct = +p
              }
            }
          }

          key = ct + 1
        }

        // if primitive value, replace with object
        if (new Object(obj[key as string]) !== obj[key as string]) {
          obj[key as string] = {}
        }

        obj = obj[key as string] as ParseStrArray
      }

      lastObj[key as string] = value
    }
  }
}
