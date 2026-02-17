type CallbackWithScope = {
  fn: (...args: unknown[]) => unknown
  scope: unknown
}

const resolveArrayMapCallback = (callback: unknown): CallbackWithScope => {
  const globalContext = globalThis as typeof globalThis & { [key: string]: unknown }

  if (typeof callback === 'function') {
    return {
      fn: callback as (...args: unknown[]) => unknown,
      scope: null,
    }
  }

  if (typeof callback === 'string') {
    const candidate = globalContext[callback]
    if (typeof candidate === 'function') {
      return {
        fn: candidate as (...args: unknown[]) => unknown,
        scope: null,
      }
    }
  }

  if (Array.isArray(callback) && callback.length > 0) {
    let scope: unknown
    if (typeof callback[0] === 'string') {
      scope = globalContext[callback[0]]
      if (typeof scope === 'undefined') {
        throw new Error('Object not found: ' + callback[0])
      }
    } else {
      scope = callback[0]
    }

    if (typeof callback[1] === 'string') {
      const candidate =
        scope && (typeof scope === 'object' || typeof scope === 'function')
          ? (scope as { [key: string]: unknown })[callback[1]]
          : undefined
      if (typeof candidate === 'function') {
        return {
          fn: candidate as (...args: unknown[]) => unknown,
          scope,
        }
      }
    } else if (typeof callback[1] === 'function') {
      return {
        fn: callback[1] as (...args: unknown[]) => unknown,
        scope,
      }
    }
  }

  throw new Error('array_map(): Invalid callback')
}

export function array_map(callback: unknown, ...inputArrays: unknown[][]): unknown[] {
  //  discuss at: https://locutus.io/php/array_map/
  // original by: Andrea Giammarchi (https://webreflection.blogspot.com)
  // improved by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Brett Zamir (https://brett-zamir.me)
  //    input by: thekid
  //      note 1: If the callback is a string (or object, if an array is supplied),
  //      note 1: it can only work if the function name is in the global context
  //   example 1: array_map( function (a){return (a * a * a)}, [1, 2, 3, 4, 5] )
  //   returns 1: [ 1, 8, 27, 64, 125 ]

  const argc = inputArrays.length + 1
  const j = inputArrays[0]?.length ?? 0
  let i = 0
  let k = 0
  let m = 0
  let tmp: unknown[] = []
  const tmpArr: unknown[] = []
  const resolved = callback ? resolveArrayMapCallback(callback) : null

  while (i < j) {
    while (k < argc - 1) {
      tmp[m++] = inputArrays[k]?.[i]
      k++
    }

    m = 0
    k = 0

    if (resolved) {
      tmpArr[i++] = resolved.fn.apply(resolved.scope, tmp)
    } else {
      tmpArr[i++] = tmp
    }

    tmp = []
  }

  return tmpArr
}
