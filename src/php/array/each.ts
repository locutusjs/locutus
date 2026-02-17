import { getLocutusPhpContext } from '../_helpers/_locutus.ts'

interface EachResultObject {
  0: string | number
  1: unknown
  key: string | number
  value: unknown
}

type EachResult = [string | number, unknown] | EachResultObject | false

export function each(arr: unknown[] | Record<string, unknown>): EachResult {
  //  discuss at: https://locutus.io/php/each/
  // original by: Ates Goral (https://magnetiq.com)
  //  revised by: Brett Zamir (https://brett-zamir.me)
  //      note 1: Uses global: locutus to store the array pointer
  //   example 1: each({a: "apple", b: "balloon"})
  //   returns 1: {0: "a", 1: "apple", key: "a", value: "apple"}

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
  let pos = 0

  if (!Array.isArray(arr)) {
    let ct = 0
    for (const k in arr) {
      if (ct === cursor) {
        pointers[arrpos + 1] = cursor + 1
        if ((each as { returnArrayOnly?: boolean }).returnArrayOnly) {
          return [k, arr[k]]
        } else {
          return {
            1: arr[k],
            value: arr[k],
            0: k,
            key: k,
          }
        }
      }
      ct++
    }
    // Empty
    return false
  }
  if (arr.length === 0 || cursor === arr.length) {
    return false
  }
  pos = cursor
  pointers[arrpos + 1] = cursor + 1
  if ((each as { returnArrayOnly?: boolean }).returnArrayOnly) {
    return [pos, arr[pos]]
  } else {
    return {
      1: arr[pos],
      value: arr[pos],
      0: pos,
      key: pos,
    }
  }
}
