type PhpArray = { [key: string]: unknown }
type KeyCompareCallback = (left: string, right: string) => number

const toPhpArray = (value: unknown): PhpArray =>
  typeof value === 'object' && value !== null ? (value as PhpArray) : {}

const resolveKeyCompareCallback = (callback: unknown): KeyCompareCallback => {
  const globalContext = globalThis as typeof globalThis & { [key: string]: unknown }

  if (typeof callback === 'function') {
    return callback as KeyCompareCallback
  }

  if (typeof callback === 'string') {
    const candidate = globalContext[callback]
    if (typeof candidate === 'function') {
      return candidate as KeyCompareCallback
    }
  }

  if (Array.isArray(callback) && callback.length >= 2) {
    const target = typeof callback[0] === 'string' ? globalContext[callback[0]] : callback[0]
    if (target && (typeof target === 'object' || typeof target === 'function') && typeof callback[1] === 'string') {
      const candidate = (target as { [key: string]: unknown })[callback[1]]
      if (typeof candidate === 'function') {
        return candidate as KeyCompareCallback
      }
    }
  }

  throw new Error('array_diff_uassoc(): Invalid callback')
}

export function array_diff_uassoc(arr1: PhpArray): PhpArray {
  //  discuss at: https://locutus.io/php/array_diff_uassoc/
  // original by: Brett Zamir (https://brett-zamir.me)
  //   example 1: var $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
  //   example 1: var $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
  //   example 1: array_diff_uassoc($array1, $array2, function (key1, key2) { return (key1 === key2 ? 0 : (key1 > key2 ? 1 : -1)) })
  //   returns 1: {a: 'green', b: 'brown', c: 'blue', 0: 'red'}

  const retArr: PhpArray = {}
  const arglm1 = arguments.length - 1
  const cb = resolveKeyCompareCallback(arguments[arglm1])

  arr1keys: for (const k1 in arr1) {
    for (let i = 1; i < arglm1; i++) {
      const arr = toPhpArray(arguments[i])
      for (const k in arr) {
        if (arr[k] === arr1[k1] && cb(k, k1) === 0) {
          // If it reaches here, it was found in at least one array, so try next value
          continue arr1keys
        }
      }
      retArr[k1] = arr1[k1]
    }
  }

  return retArr
}
