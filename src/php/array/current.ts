import { getLocutusPhpContext } from '../_helpers/_locutus.ts'

export function current(arr: unknown[] | Record<string, unknown>): unknown | false {
  //      discuss at: https://locutus.io/php/current/
  // parity verified: PHP 8.3
  //     original by: Brett Zamir (https://brett-zamir.me)
  //          note 1: Uses global: locutus to store the array pointer
  //       example 1: var $transport = ['foot', 'bike', 'car', 'plane']
  //       example 1: current($transport)
  //       returns 1: 'foot'

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
  const cursorValue = pointers[arrpos + 1]
  const cursor = typeof cursorValue === 'number' ? cursorValue : 0
  if (Array.isArray(arr)) {
    return arr[cursor] || false
  }
  let ct = 0
  for (const k in arr) {
    if (ct === cursor) {
      return arr[k]
    }
    ct++
  }
  // Empty
  return false
}
