import { getLocutusPhpContext } from '../_helpers/_locutus.ts'

export function end(arr: unknown[] | Record<string, unknown>): unknown | false {
  //  discuss at: https://locutus.io/php/end/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // bugfixed by: Legaev Andrey
  //  revised by: J A R
  //  revised by: Brett Zamir (https://brett-zamir.me)
  // improved by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Uses global: locutus to store the array pointer
  //   example 1: end({0: 'Kevin', 1: 'van', 2: 'Zonneveld'})
  //   returns 1: 'Zonneveld'
  //   example 2: end(['Kevin', 'van', 'Zonneveld'])
  //   returns 2: 'Zonneveld'

  const { pointers } = getLocutusPhpContext()

  const indexOf = (list: unknown[], value: unknown): number => {
    for (let i = 0, length = list.length; i < length; i++) {
      if (list[i] === value) {
        return i
      }
    }
    return -1
  }

  if (indexOf(pointers, arr) === -1) {
    pointers.push(arr, 0)
  }
  const arrpos = indexOf(pointers, arr)
  if (!Array.isArray(arr)) {
    let ct = 0
    let val: unknown
    for (const k in arr) {
      ct++
      val = arr[k]
    }
    if (ct === 0) {
      // Empty
      return false
    }
    pointers[arrpos + 1] = ct - 1
    return val
  }
  if (arr.length === 0) {
    return false
  }
  pointers[arrpos + 1] = arr.length - 1
  return arr[arr.length - 1]
}
