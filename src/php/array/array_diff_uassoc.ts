type PhpArray = { [key: string]: unknown }
type KeyCompareCallback = (left: string, right: string) => number

const isPhpArray = (value: unknown): value is PhpArray => typeof value === 'object' && value !== null
const isCallback = (value: unknown): value is (...args: unknown[]) => unknown => typeof value === 'function'

const toPhpArray = (value: unknown): PhpArray => (isPhpArray(value) ? value : {})

const asKeyCompareCallback = (callback: (...args: unknown[]) => unknown): KeyCompareCallback => {
  return (left, right) => Number(callback(left, right))
}

const resolveKeyCompareCallback = (callback: unknown): KeyCompareCallback => {
  const globalContext = globalThis as typeof globalThis & { [key: string]: unknown }

  if (isCallback(callback)) {
    return asKeyCompareCallback(callback)
  }

  if (typeof callback === 'string') {
    const candidate = globalContext[callback]
    if (isCallback(candidate)) {
      return asKeyCompareCallback(candidate)
    }
  }

  if (Array.isArray(callback) && callback.length >= 2) {
    const target = typeof callback[0] === 'string' ? globalContext[callback[0]] : callback[0]
    if (target && (typeof target === 'object' || typeof target === 'function') && typeof callback[1] === 'string') {
      const candidate = Reflect.get(target, callback[1])
      if (isCallback(candidate)) {
        return asKeyCompareCallback(candidate)
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
