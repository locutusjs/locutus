import type { PhpAssoc } from '../_helpers/_phpTypes.ts'

type CountableObject = PhpAssoc<unknown>
type Countable = unknown[] | CountableObject

export function count(mixedVar: Countable | null | undefined, mode: string | number = 0): number {
  //  discuss at: https://locutus.io/php/count/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //    input by: Waldo Malqui Silva (https://waldo.malqui.info)
  //    input by: merabi
  // bugfixed by: Soren Hansen
  // bugfixed by: Olivier Louvignes (https://mg-crea.com/)
  // improved by: Brett Zamir (https://brett-zamir.me)
  //   example 1: count([[0,0],[0,-4]], 'COUNT_RECURSIVE')
  //   returns 1: 6
  //   example 2: count({'one' : [1,2,3,4,5]}, 'COUNT_RECURSIVE')
  //   returns 2: 6

  let cnt = 0

  if (mixedVar === null || typeof mixedVar === 'undefined') {
    return 0
  }
  if (typeof mixedVar !== 'object') {
    return 1
  }
  const ctor = (mixedVar as { constructor?: unknown }).constructor
  if (ctor !== Array && ctor !== Object) {
    return 1
  }

  const recursiveMode = mode === 'COUNT_RECURSIVE' || mode === 1

  const entries = mixedVar as CountableObject
  for (const key in entries) {
    if (Object.prototype.hasOwnProperty.call(entries, key)) {
      cnt++
      const value = entries[key]
      if (!recursiveMode || !value || typeof value !== 'object') {
        continue
      }
      const valueCtor = (value as { constructor?: unknown }).constructor
      if (valueCtor === Array || valueCtor === Object) {
        cnt += count(value as Countable, 1)
      }
    }
  }

  return cnt
}
