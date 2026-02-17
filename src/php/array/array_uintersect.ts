type PhpArray = { [key: string]: unknown }
type ValueCompareCallback = (left: unknown, right: unknown) => number

const toPhpArray = (value: unknown): PhpArray =>
  typeof value === 'object' && value !== null ? (value as PhpArray) : {}

const resolveValueCompareCallback = (callback: unknown): ValueCompareCallback => {
  const globalContext = globalThis as typeof globalThis & { [key: string]: unknown }

  if (typeof callback === 'function') {
    return callback as ValueCompareCallback
  }
  if (typeof callback === 'string') {
    const candidate = globalContext[callback]
    if (typeof candidate === 'function') {
      return candidate as ValueCompareCallback
    }
  }
  if (Array.isArray(callback) && callback.length >= 2) {
    const target = typeof callback[0] === 'string' ? globalContext[callback[0]] : callback[0]
    if (target && (typeof target === 'object' || typeof target === 'function') && typeof callback[1] === 'string') {
      const candidate = (target as { [key: string]: unknown })[callback[1]]
      if (typeof candidate === 'function') {
        return candidate as ValueCompareCallback
      }
    }
  }

  throw new Error('array_uintersect(): Invalid callback')
}

export function array_uintersect(arr1: PhpArray): PhpArray {
  //  discuss at: https://locutus.io/php/array_uintersect/
  // original by: Brett Zamir (https://brett-zamir.me)
  // bugfixed by: Demosthenes Koptsis
  //   example 1: var $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
  //   example 1: var $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
  //   example 1: array_uintersect($array1, $array2, function( f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 === string2) return 0; return -1;})
  //   returns 1: {a: 'green', b: 'brown', 0: 'red'}

  const retArr: PhpArray = {}
  const arglm1 = arguments.length - 1
  const arglm2 = arglm1 - 1
  const cb = resolveValueCompareCallback(arguments[arglm1])

  arr1keys: for (const k1 in arr1) {
    arrs: for (let i = 1; i < arglm1; i++) {
      const arr = toPhpArray(arguments[i])
      for (const k in arr) {
        if (cb(arr[k], arr1[k1]) === 0) {
          if (i === arglm2) {
            retArr[k1] = arr1[k1]
          }
          // If the innermost loop always leads at least once to an equal value,
          // continue the loop until done
          continue arrs
        }
      }
      // If it reaches here, it wasn't found in at least one array, so try next value
      continue arr1keys
    }
  }

  return retArr
}
