interface EachResultObject<T> {
  0: string | number
  1: T
  key: string | number
  value: T
}

type EachResult<T> = [string | number, T] | EachResultObject<T> | false

export function each<T>(arr: T[] | Record<string, T>): EachResult<T> {
  //  discuss at: https://locutus.io/php/each/
  // original by: Ates Goral (https://magnetiq.com)
  //  revised by: Brett Zamir (https://brett-zamir.me)
  //      note 1: Uses global: locutus to store the array pointer
  //   example 1: each({a: "apple", b: "balloon"})
  //   returns 1: {0: "a", 1: "apple", key: "a", value: "apple"}

  const $global = (typeof window !== 'undefined' ? window : global) as typeof globalThis & {
    $locutus?: { php?: { pointers?: unknown[] } }
  }
  $global.$locutus = $global.$locutus || {}
  $global.$locutus.php = $global.$locutus.php || {}
  $global.$locutus.php.pointers = $global.$locutus.php.pointers || []
  const pointers = $global.$locutus.php.pointers

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
        const value = arr[k] as T
        if ((each as { returnArrayOnly?: boolean }).returnArrayOnly) {
          return [k, value]
        } else {
          return {
            1: value,
            value,
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
  const value = arr[pos] as T
  if ((each as { returnArrayOnly?: boolean }).returnArrayOnly) {
    return [pos, value]
  } else {
    return {
      1: value,
      value,
      0: pos,
      key: pos,
    }
  }
}
