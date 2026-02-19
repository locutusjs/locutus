import { type PhpAssoc, toPhpArrayObject } from '../_helpers/_phpTypes.ts'

type ArrayWalkCallback<TValue, TUserdata> = (value: TValue, key: string, userdata?: TUserdata) => void
type ArrayWalkValue = {} | null | undefined

export function array_walk<
  TValue extends ArrayWalkValue = ArrayWalkValue,
  TUserdata extends ArrayWalkValue = ArrayWalkValue,
>(array: TValue[] | PhpAssoc<TValue>, funcname: ArrayWalkCallback<TValue, TUserdata>, userdata?: TUserdata): boolean {
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
    const target = toPhpArrayObject<TValue>(array)
    const hasUserdata = typeof userdata !== 'undefined'
    for (const [key, value] of Object.entries(target)) {
      if (hasUserdata) {
        funcname(value, key, userdata)
      } else {
        funcname(value, key)
      }
    }
  } catch (_e) {
    return false
  }

  return true
}
