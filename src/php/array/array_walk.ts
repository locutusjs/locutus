import { type PhpAssoc, type PhpRuntimeValue, toPhpArrayObject } from '../_helpers/_phpTypes.ts'

type ArrayWalkCallback<TKey extends number | string, TValue, TUserdata> = (
  value: TValue,
  key: TKey,
  userdata?: TUserdata,
) => void
type ArrayWalkInput = PhpRuntimeValue

export function array_walk<
  TValue extends ArrayWalkInput = ArrayWalkInput,
  TUserdata extends ArrayWalkInput = ArrayWalkInput,
>(array: TValue[], funcname: ArrayWalkCallback<number, TValue, TUserdata>, userdata?: TUserdata): boolean

export function array_walk<
  TValue extends ArrayWalkInput = ArrayWalkInput,
  TUserdata extends ArrayWalkInput = ArrayWalkInput,
>(array: PhpAssoc<TValue>, funcname: ArrayWalkCallback<string, TValue, TUserdata>, userdata?: TUserdata): boolean

export function array_walk<
  TValue extends ArrayWalkInput = ArrayWalkInput,
  TUserdata extends ArrayWalkInput = ArrayWalkInput,
>(
  array: TValue[] | PhpAssoc<TValue>,
  funcname: ArrayWalkCallback<number, TValue, TUserdata> | ArrayWalkCallback<string, TValue, TUserdata>,
  userdata?: TUserdata,
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
    const hasUserdata = typeof userdata !== 'undefined'
    const callback = funcname
    if (Array.isArray(array)) {
      for (const [index, value] of array.entries()) {
        if (hasUserdata) {
          Reflect.apply(callback, undefined, [value, index, userdata])
        } else {
          Reflect.apply(callback, undefined, [value, index])
        }
      }
      return true
    }

    const target = toPhpArrayObject<TValue>(array)
    for (const [key, value] of Object.entries(target)) {
      if (hasUserdata) {
        Reflect.apply(callback, undefined, [value, key, userdata])
      } else {
        Reflect.apply(callback, undefined, [value, key])
      }
    }
  } catch (_e) {
    return false
  }

  return true
}
