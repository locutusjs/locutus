import { isObjectLike, type PhpAssoc, type PhpInput, toPhpArrayObject } from '../_helpers/_phpTypes.ts'

type RecursiveWalkNode<TValue> = TValue | RecursiveWalkList<TValue>
type RecursiveWalkList<TValue> = RecursiveWalkNode<TValue>[]
type RecursiveWalkAssoc<TValue> = PhpAssoc<RecursiveWalkNode<TValue>>
type RecursiveWalkCollection<TValue> = RecursiveWalkList<TValue> | RecursiveWalkAssoc<TValue>
type RecursiveWalkInput = PhpInput | never
type ArrayWalkRecursiveCallback<TKey extends number | string, TValue, TUserdata> = (
  value: TValue,
  key: TKey,
  userdata?: TUserdata,
) => void

export function array_walk_recursive<
  TValue extends RecursiveWalkInput = RecursiveWalkInput,
  TUserdata extends RecursiveWalkInput = RecursiveWalkInput,
>(
  array: RecursiveWalkList<TValue>,
  funcname: ArrayWalkRecursiveCallback<number, TValue, TUserdata>,
  userdata?: TUserdata,
): boolean

export function array_walk_recursive<
  TValue extends RecursiveWalkInput = RecursiveWalkInput,
  TUserdata extends RecursiveWalkInput = RecursiveWalkInput,
>(
  array: RecursiveWalkAssoc<TValue>,
  funcname: ArrayWalkRecursiveCallback<string, TValue, TUserdata>,
  userdata?: TUserdata,
): boolean

export function array_walk_recursive<
  TValue extends RecursiveWalkInput = RecursiveWalkInput,
  TUserdata extends RecursiveWalkInput = RecursiveWalkInput,
>(
  array: RecursiveWalkCollection<TValue>,
  funcname:
    | ArrayWalkRecursiveCallback<number, TValue, TUserdata>
    | ArrayWalkRecursiveCallback<string, TValue, TUserdata>,
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

  const hasUserdata = typeof userdata !== 'undefined'

  const callCallback = (value: TValue, key: number | string): boolean => {
    try {
      if (hasUserdata) {
        Reflect.apply(funcname, undefined, [value, key, userdata])
      } else {
        Reflect.apply(funcname, undefined, [value, key])
      }
      return true
    } catch (_e) {
      return false
    }
  }

  const walkList = (list: RecursiveWalkList<TValue>): boolean => {
    for (const [index, value] of list.entries()) {
      if (Array.isArray(value)) {
        if (!walkList(value)) {
          return false
        }
        continue
      }
      if (!callCallback(value, index)) {
        return false
      }
    }
    return true
  }

  const walkAssoc = (assoc: RecursiveWalkAssoc<TValue>): boolean => {
    for (const [key, value] of Object.entries(assoc)) {
      if (Array.isArray(value)) {
        if (!walkList(value)) {
          return false
        }
        continue
      }
      if (!callCallback(value, key)) {
        return false
      }
    }
    return true
  }

  if (Array.isArray(array)) {
    return walkList(array)
  }

  return walkAssoc(toPhpArrayObject<RecursiveWalkNode<TValue>>(array))
}
