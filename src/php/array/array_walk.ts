export function array_walk(
  array: unknown[] | { [key: string]: unknown },
  funcname: ((value: unknown, key: string, userdata?: unknown) => void) | unknown,
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
    if (typeof funcname === 'function') {
      const target = array as { [key: string]: unknown }
      for (const key in target) {
        if (arguments.length > 2) {
          funcname(target[key], key, userdata)
        } else {
          funcname(target[key], key)
        }
      }
    } else {
      return false
    }
  } catch (_e) {
    return false
  }

  return true
}
