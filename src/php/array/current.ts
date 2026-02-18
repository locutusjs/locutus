export function current<T>(arr: T[] | Record<string, T>): T | false {
  //      discuss at: https://locutus.io/php/current/
  // parity verified: PHP 8.3
  //     original by: Brett Zamir (https://brett-zamir.me)
  //          note 1: Uses global: locutus to store the array pointer
  //       example 1: var $transport = ['foot', 'bike', 'car', 'plane']
  //       example 1: current($transport)
  //       returns 1: 'foot'

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
  const arrpos = indexOf(pointers, arr)
  const cursorValue = pointers[arrpos + 1]
  const cursor = typeof cursorValue === 'number' ? cursorValue : 0
  if (Array.isArray(arr)) {
    return (arr[cursor] as T) || false
  }
  let ct = 0
  for (const k in arr) {
    if (ct === cursor) {
      return arr[k] as T
    }
    ct++
  }
  // Empty
  return false
}
