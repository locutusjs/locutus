import { getLocutusPhpContext } from '../_helpers/_locutus.ts'

export function reset(arr: unknown[] | Record<string, unknown>): unknown | false {
  //  discuss at: https://locutus.io/php/reset/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // bugfixed by: Legaev Andrey
  //  revised by: Brett Zamir (https://brett-zamir.me)
  //      note 1: Uses global: locutus to store the array pointer
  //   example 1: reset({0: 'Kevin', 1: 'van', 2: 'Zonneveld'})
  //   returns 1: 'Kevin'

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
    for (const k in arr) {
      if (indexOf(pointers, arr) === -1) {
        pointers.push(arr, 0)
      } else {
        pointers[arrpos + 1] = 0
      }
      return arr[k]
    }
    // Empty
    return false
  }
  if (arr.length === 0) {
    return false
  }
  pointers[arrpos + 1] = 0
  return arr[0]
}
