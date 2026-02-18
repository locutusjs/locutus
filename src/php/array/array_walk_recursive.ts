import { isObjectLike, type PhpValue, toPhpArrayObject } from '../_helpers/_phpTypes.ts'

type ArrayWalkRecursiveCallback<TValue, TUserdata> = (
  value: TValue,
  key: string | number,
  userdata?: TUserdata,
) => PhpValue

export function array_walk_recursive<TValue = PhpValue, TUserdata = PhpValue>(
  array: PhpValue,
  funcname: ArrayWalkRecursiveCallback<TValue, TUserdata>,
  userdata?: TUserdata,
): boolean {
  // original by: Hugues Peccatte
  //      note 1: Only works with user-defined functions, not built-in functions like void()
  //   example 1: array_walk_recursive([3, 4], function () {}, 'userdata')
  //   returns 1: true
  //   example 2: array_walk_recursive([3, [4]], function () {}, 'userdata')
  //   returns 2: true
  //   example 3: array_walk_recursive([3, []], function () {}, 'userdata')
  //   returns 3: true

  if (!isObjectLike(array)) {
    return false
  }

  if (typeof funcname !== 'function') {
    return false
  }

  const target = toPhpArrayObject<PhpValue>(array)
  const hasOwn = Object.prototype.hasOwnProperty
  for (const key in target) {
    if (!hasOwn.call(target, key)) {
      continue
    }
    const value = target[key]
    // apply "funcname" recursively only on arrays
    if (Array.isArray(value)) {
      if (array_walk_recursive(value, funcname, userdata) === false) {
        return false
      }
      continue
    }
    try {
      if (typeof userdata !== 'undefined') {
        funcname(value as TValue, key, userdata)
      } else {
        funcname(value as TValue, key)
      }
    } catch (_e) {
      return false
    }
  }

  return true
}
