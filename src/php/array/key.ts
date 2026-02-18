export function key<T>(arr: T[] | Record<string, T>): string | number | false {
  //      discuss at: https://locutus.io/php/key/
  // parity verified: PHP 8.3
  //     original by: Brett Zamir (https://brett-zamir.me)
  //        input by: Riddler (https://www.frontierwebdev.com/)
  //     bugfixed by: Brett Zamir (https://brett-zamir.me)
  //          note 1: Uses global: locutus to store the array pointer
  //       example 1: var $array = {fruit1: 'apple', 'fruit2': 'orange'}
  //       example 1: key($array)
  //       returns 1: 'fruit1'

  const $global = (typeof window !== 'undefined' ? window : global) as typeof globalThis & {
    $locutus?: {
      php?: {
        pointers?: unknown[]
      }
    }
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
  const cursorValue = pointers[indexOf(pointers, arr) + 1]
  const cursor = typeof cursorValue === 'number' ? cursorValue : 0
  if (!Array.isArray(arr)) {
    let ct = 0
    for (const k in arr) {
      if (ct === cursor) {
        return k
      }
      ct++
    }
    // Empty
    return false
  }
  if (arr.length === 0) {
    return false
  }

  return cursor
}
