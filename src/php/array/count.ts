import type { PhpAssoc, PhpValue } from '../_helpers/_phpTypes.ts'

type CountableObject = PhpAssoc<PhpValue>
type Countable = PhpValue[] | CountableObject

const isCountable = (value: PhpValue): value is Countable => {
  if (!value || typeof value !== 'object') {
    return false
  }
  const valuePrototype = Object.getPrototypeOf(value)
  return valuePrototype === Array.prototype || valuePrototype === Object.prototype
}

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
  const prototype = Object.getPrototypeOf(mixedVar)
  if (prototype !== Array.prototype && prototype !== Object.prototype) {
    return 1
  }

  const recursiveMode = mode === 'COUNT_RECURSIVE' || mode === 1

  if (Array.isArray(mixedVar)) {
    for (const key of Object.keys(mixedVar)) {
      cnt++
      const value = mixedVar[Number(key)]
      if (recursiveMode && isCountable(value)) {
        cnt += count(value, 1)
      }
    }
    return cnt
  }

  for (const key in mixedVar) {
    if (Object.prototype.hasOwnProperty.call(mixedVar, key)) {
      cnt++
      const value = mixedVar[key]
      if (recursiveMode && isCountable(value)) {
        cnt += count(value, 1)
      }
    }
  }

  return cnt
}
