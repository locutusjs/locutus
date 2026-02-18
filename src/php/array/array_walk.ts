import { toPhpArrayObject } from '../_helpers/_phpTypes.ts'

type ArrayWalkCallback = (value: unknown, key: string, userdata?: unknown) => void

export function array_walk(
  array: unknown[] | { [key: string]: unknown },
  funcname: ArrayWalkCallback | unknown,
  userdata?: unknown,
): boolean {
  //  discuss at: https://locutus.io/php/array_walk/
  // original by: Johnny Mast (https://www.phpvrouwen.nl)
  // bugfixed by: David
  // improved by: Brett Zamir (https://brett-zamir.me)
  //      note 1: Only works with user-defined functions, not built-in functions like void()
  //   example 1: array_walk ([3, 4], function () {}, 'userdata')
  //   returns 1: true
  //   example 2: array_walk ('mystring', function () {})
  //   returns 2: false
  //   example 3: array_walk ({"title":"my title"}, function () {})
  //   returns 3: true

  if (!array || typeof array !== 'object') {
    return false
  }

  try {
    if (typeof funcname !== 'function') {
      return false
    }

    const target = toPhpArrayObject(array)
    const hasUserdata = typeof userdata !== 'undefined'
    for (const key in target) {
      if (hasUserdata) {
        funcname(target[key], key, userdata)
      } else {
        funcname(target[key], key)
      }
    }
  } catch (_e) {
    return false
  }

  return true
}
