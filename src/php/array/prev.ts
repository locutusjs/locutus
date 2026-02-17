import { getLocutusPhpContext } from '../_helpers/_locutus.ts'

export function prev(arr: unknown[] | Record<string, unknown>): unknown | false {
  //      discuss at: https://locutus.io/php/prev/
  // parity verified: PHP 8.3
  //     original by: Brett Zamir (https://brett-zamir.me)
  //          note 1: Uses global: locutus to store the array pointer
  //       example 1: var $transport = ['foot', 'bike', 'car', 'plane']
  //       example 1: prev($transport)
  //       returns 1: false

  const { pointers } = getLocutusPhpContext()

  const indexOf = (list: unknown[], value: unknown): number => {
    for (let i = 0, length = list.length; i < length; i++) {
      if (list[i] === value) {
        return i
      }
    }
    return -1
  }

  const arrpos = indexOf(pointers, arr)
  const cursorValue = arrpos >= 0 ? pointers[arrpos + 1] : 0
  const cursor = typeof cursorValue === 'number' ? cursorValue : 0
  if (arrpos === -1 || cursor === 0) {
    return false
  }
  if (!Array.isArray(arr)) {
    let ct = 0
    for (const k in arr) {
      if (ct === cursor - 1) {
        pointers[arrpos + 1] = cursor - 1
        return arr[k]
      }
      ct++
    }
    // Shouldn't reach here
    return false
  }
  if (arr.length === 0) {
    return false
  }
  pointers[arrpos + 1] = cursor - 1
  return arr[cursor - 1]
}
