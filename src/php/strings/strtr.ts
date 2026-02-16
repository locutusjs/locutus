import krsort from '../array/krsort.ts'
import iniSet from '../info/ini_set.js'

export default function strtr(
  str: string,
  trFrom: string | Record<string, unknown> | string[],
  trTo?: string | unknown[],
): string {
  //  discuss at: https://locutus.io/php/strtr/
  // original by: Brett Zamir (https://brett-zamir.me)
  //    input by: uestla
  //    input by: Alan C
  //    input by: Taras Bogach
  //    input by: jpfle
  // bugfixed by: Kevin van Zonneveld (https://kvz.io)
  // bugfixed by: Kevin van Zonneveld (https://kvz.io)
  // bugfixed by: Brett Zamir (https://brett-zamir.me)
  // bugfixed by: Brett Zamir (https://brett-zamir.me)
  //   example 1: var $trans = {'hello' : 'hi', 'hi' : 'hello'}
  //   example 1: strtr('hi all, I said hello', $trans)
  //   returns 1: 'hello all, I said hi'
  //   example 2: strtr('äaabaåccasdeöoo', 'äåö','aao')
  //   returns 2: 'aaabaaccasdeooo'
  //   example 3: strtr('ääääääää', 'ä', 'a')
  //   returns 3: 'aaaaaaaa'
  //   example 4: strtr('http', 'pthxyz','xyzpth')
  //   returns 4: 'zyyx'
  //   example 5: strtr('zyyx', 'pthxyz','xyzpth')
  //   returns 5: 'http'
  //   example 6: strtr('aa', {'a':1,'aa':2})
  //   returns 6: '2'

  let fr = ''
  let i = 0
  let j = 0
  let lenStr = 0
  let lenFrom = 0
  let sortByReference: unknown = false
  let fromTypeStr: boolean | string = false
  let toTypeStr: boolean | string = false
  let istr = ''
  const tmpFrom: string[] = []
  const tmpTo: unknown[] = []
  let ret = ''
  let match = false

  // Received replace_pairs?
  // Convert to normal trFrom->trTo chars
  if (typeof trFrom === 'object') {
    // Not thread-safe; temporarily set to true
    // @todo: Don't rely on ini here, use internal krsort instead
    sortByReference = iniSet('locutus.sortByReference', false)
    trFrom = krsort(trFrom as Record<string, unknown>) as Record<string, unknown>
    iniSet('locutus.sortByReference', sortByReference)

    for (fr in trFrom) {
      if (trFrom.hasOwnProperty(fr)) {
        tmpFrom.push(fr)
        tmpTo.push(trFrom[fr])
      }
    }

    trFrom = tmpFrom
    trTo = tmpTo
  }

  // Walk through subject and replace chars when needed
  lenStr = str.length
  lenFrom = (trFrom as string | string[]).length
  fromTypeStr = typeof trFrom === 'string'
  toTypeStr = typeof trTo === 'string'

  for (i = 0; i < lenStr; i++) {
    match = false
    if (fromTypeStr) {
      istr = str.charAt(i)
      for (j = 0; j < lenFrom; j++) {
        if (istr === (trFrom as string).charAt(j)) {
          match = true
          break
        }
      }
    } else {
      for (j = 0; j < lenFrom; j++) {
        if (str.substr(i, (trFrom as unknown as string[])[j].length) === (trFrom as unknown as string[])[j]) {
          match = true
          // Fast forward
          i = i + (trFrom as unknown as string[])[j].length - 1
          break
        }
      }
    }
    if (match) {
      ret += toTypeStr ? (trTo as string).charAt(j) : (trTo as unknown[])[j]
    } else {
      ret += str.charAt(i)
    }
  }

  return ret
}
