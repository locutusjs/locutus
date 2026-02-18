type PhpArray = { [key: string]: unknown }
type CompareCallback = (left: unknown, right: unknown) => number

const isPhpArray = (value: unknown): value is PhpArray => typeof value === 'object' && value !== null
const isCallback = (value: unknown): value is (...args: unknown[]) => unknown => typeof value === 'function'

const toPhpArray = (value: unknown): PhpArray => (isPhpArray(value) ? value : {})

const asCompareCallback = (callback: (...args: unknown[]) => unknown): CompareCallback => {
  return (left, right) => Number(callback(left, right))
}

const resolveCompareCallback = (callback: unknown): CompareCallback => {
  const globalContext = globalThis as typeof globalThis & { [key: string]: unknown }

  if (isCallback(callback)) {
    return asCompareCallback(callback)
  }

  if (typeof callback === 'string') {
    const candidate = globalContext[callback]
    if (isCallback(candidate)) {
      return asCompareCallback(candidate)
    }
  }

  if (Array.isArray(callback) && callback.length >= 2) {
    const target = typeof callback[0] === 'string' ? globalContext[callback[0]] : callback[0]
    if (target && (typeof target === 'object' || typeof target === 'function') && typeof callback[1] === 'string') {
      const candidate = Reflect.get(target, callback[1])
      if (isCallback(candidate)) {
        return asCompareCallback(candidate)
      }
    }
  }

  throw new Error('array_udiff_assoc(): Invalid callback')
}

export function array_udiff_assoc(arr1: PhpArray): PhpArray {
  //  discuss at: https://locutus.io/php/array_udiff_assoc/
  // original by: Brett Zamir (https://brett-zamir.me)
  //   example 1: array_udiff_assoc({0: 'kevin', 1: 'van', 2: 'Zonneveld'}, {0: 'Kevin', 4: 'van', 5: 'Zonneveld'}, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 === string2) return 0; return -1;})
  //   returns 1: {1: 'van', 2: 'Zonneveld'}

  const retArr: PhpArray = {}
  const arglm1 = arguments.length - 1
  const cb = resolveCompareCallback(arguments[arglm1])

  arr1keys: for (const k1 in arr1) {
    for (let i = 1; i < arglm1; i++) {
      const arr = toPhpArray(arguments[i])
      for (const k in arr) {
        if (cb(arr[k], arr1[k1]) === 0 && k === k1) {
          // If it reaches here, it was found in at least one array, so try next value
          continue arr1keys
        }
      }
      retArr[k1] = arr1[k1]
    }
  }

  return retArr
}
