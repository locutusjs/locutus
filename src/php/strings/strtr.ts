import { krsort } from '../array/krsort.ts'
import { ini_set as iniSet } from '../info/ini_set.ts'

export function strtr(
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
  let istr = ''
  const tmpFrom: string[] = []
  const tmpTo: unknown[] = []
  let ret = ''
  let match = false

  // Received replace_pairs?
  // Convert to normal trFrom->trTo chars
  if (typeof trFrom === 'object' && !Array.isArray(trFrom)) {
    // Not thread-safe; temporarily set to true
    // @todo: Don't rely on ini here, use internal krsort instead
    sortByReference = iniSet('locutus.sortByReference', false)
    const sorted = krsort(trFrom)
    iniSet('locutus.sortByReference', sortByReference)

    if (typeof sorted === 'object') {
      for (fr in sorted) {
        if (sorted.hasOwnProperty(fr)) {
          tmpFrom.push(fr)
          tmpTo.push(sorted[fr])
        }
      }
    }

    trFrom = tmpFrom
    trTo = tmpTo
  }

  // Walk through subject and replace chars when needed
  lenStr = str.length
  lenFrom = typeof trFrom === 'string' ? trFrom.length : trFrom.length
  const fromStr = typeof trFrom === 'string' ? trFrom : null
  const fromArr = Array.isArray(trFrom) ? trFrom : null
  const toStr = typeof trTo === 'string' ? trTo : null
  const toArr = Array.isArray(trTo) ? trTo : null

  for (i = 0; i < lenStr; i++) {
    match = false
    if (fromStr) {
      istr = str.charAt(i)
      for (j = 0; j < lenFrom; j++) {
        if (istr === fromStr.charAt(j)) {
          match = true
          break
        }
      }
    } else if (fromArr) {
      for (j = 0; j < lenFrom; j++) {
        const fromVal = fromArr[j]
        if (fromVal === undefined) {
          continue
        }
        if (str.substr(i, fromVal.length) === fromVal) {
          match = true
          // Fast forward
          i = i + fromVal.length - 1
          break
        }
      }
    }
    if (match) {
      ret += toStr ? toStr.charAt(j) : toArr ? toArr[j] : ''
    } else {
      ret += str.charAt(i)
    }
  }

  return ret
}
