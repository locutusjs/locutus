type PhpArray = { [key: string]: unknown }
type ValueCompareCallback = (left: unknown, right: unknown) => number
type KeyCompareCallback = (left: string, right: string) => number

const isPhpArray = (value: unknown): value is PhpArray => typeof value === 'object' && value !== null
const isCallback = (value: unknown): value is (...args: unknown[]) => unknown => typeof value === 'function'

const toPhpArray = (value: unknown): PhpArray => (isPhpArray(value) ? value : {})

const asValueCompareCallback = (callback: (...args: unknown[]) => unknown): ValueCompareCallback => {
  return (left, right) => Number(callback(left, right))
}

const asKeyCompareCallback = (callback: (...args: unknown[]) => unknown): KeyCompareCallback => {
  return (left, right) => Number(callback(left, right))
}

const resolveValueCompareCallback = (callback: unknown): ValueCompareCallback => {
  const globalContext = globalThis as typeof globalThis & { [key: string]: unknown }

  if (isCallback(callback)) {
    return asValueCompareCallback(callback)
  }
  if (typeof callback === 'string') {
    const candidate = globalContext[callback]
    if (isCallback(candidate)) {
      return asValueCompareCallback(candidate)
    }
  }
  if (Array.isArray(callback) && callback.length >= 2) {
    const target = typeof callback[0] === 'string' ? globalContext[callback[0]] : callback[0]
    if (target && (typeof target === 'object' || typeof target === 'function') && typeof callback[1] === 'string') {
      const candidate = Reflect.get(target, callback[1])
      if (isCallback(candidate)) {
        return asValueCompareCallback(candidate)
      }
    }
  }

  throw new Error('array_udiff_uassoc(): Invalid value callback')
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

  throw new Error('array_udiff_uassoc(): Invalid key callback')
}

export function array_udiff_uassoc(arr1: PhpArray): PhpArray {
  //  discuss at: https://locutus.io/php/array_udiff_uassoc/
  // original by: Brett Zamir (https://brett-zamir.me)
  //   example 1: var $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
  //   example 1: var $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
  //   example 1: array_udiff_uassoc($array1, $array2, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 === string2) return 0; return -1;}, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 === string2) return 0; return -1;})
  //   returns 1: {0: 'red', c: 'blue'}

  const retArr: PhpArray = {}
  const arglm1 = arguments.length - 1
  const arglm2 = arglm1 - 1
  const cb = resolveKeyCompareCallback(arguments[arglm1])
  const cb0 = resolveValueCompareCallback(arguments[arglm2])

  arr1keys: for (const k1 in arr1) {
    for (let i = 1; i < arglm2; i++) {
      const arr = toPhpArray(arguments[i])
      for (const k in arr) {
        if (cb0(arr[k], arr1[k1]) === 0 && cb(k, k1) === 0) {
          // If it reaches here, it was found in at least one array, so try next value
          continue arr1keys
        }
      }
      retArr[k1] = arr1[k1]
    }
  }

  return retArr
}
