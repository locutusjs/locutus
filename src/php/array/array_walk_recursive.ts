export function array_walk_recursive(
  array: unknown,
  funcname: (...args: unknown[]) => unknown,
  userdata?: unknown,
): boolean {
  // original by: Hugues Peccatte
  //      note 1: Only works with user-defined functions, not built-in functions like void()
  //   example 1: array_walk_recursive([3, 4], function () {}, 'userdata')
  //   returns 1: true
  //   example 2: array_walk_recursive([3, [4]], function () {}, 'userdata')
  //   returns 2: true
  //   example 3: array_walk_recursive([3, []], function () {}, 'userdata')
  //   returns 3: true

  if (!array || typeof array !== 'object') {
    return false
  }

  if (typeof funcname !== 'function') {
    return false
  }

  for (const key in array as { [key: string]: unknown }) {
    const value = (array as { [key: string]: unknown })[key]
    // apply "funcname" recursively only on arrays
    if (Array.isArray(value)) {
      if (array_walk_recursive(value, funcname, userdata) === false) {
        return false
      }
      continue
    }
    try {
      if (typeof userdata !== 'undefined') {
        funcname(value, key, userdata)
      } else {
        funcname(value, key)
      }
    } catch (_e) {
      return false
    }
  }

  return true
}
