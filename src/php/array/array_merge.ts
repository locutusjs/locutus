import type { PhpArrayLike, PhpAssoc, PhpInput, PhpList } from '../_helpers/_phpTypes.ts'

type AssociativeArray<T = PhpInput> = PhpAssoc<T>

export function array_merge<T>(...args: [first: PhpList<T>, ...rest: Array<PhpList<T>>]): PhpList<T>

export function array_merge<T>(...args: [first: PhpArrayLike<T>, ...rest: Array<PhpArrayLike<T>>]): AssociativeArray<T>

export function array_merge<T>(
  ...args: [first: PhpArrayLike<T>, ...rest: Array<PhpArrayLike<T>>]
): PhpList<T> | AssociativeArray<T> {
  //  discuss at: https://locutus.io/php/array_merge/
  // original by: Brett Zamir (https://brett-zamir.me)
  // bugfixed by: Nate
  // bugfixed by: Brett Zamir (https://brett-zamir.me)
  //    input by: josh
  //   example 1: var $arr1 = {"color": "red", 0: 2, 1: 4}
  //   example 1: var $arr2 = {0: "a", 1: "b", "color": "green", "shape": "trapezoid", 2: 4}
  //   example 1: array_merge($arr1, $arr2)
  //   returns 1: {"color": "green", 0: 2, 1: 4, 2: "a", 3: "b", "shape": "trapezoid", 4: 4}
  //   example 2: var $arr1 = []
  //   example 2: var $arr2 = {1: "data"}
  //   example 2: array_merge($arr1, $arr2)
  //   returns 2: {0: "data"}

  const retObj: AssociativeArray<T> = {}
  let retArr = true

  for (const arg of args) {
    if (!Array.isArray(arg)) {
      retArr = false
      break
    }
  }

  if (retArr) {
    let merged: PhpList<T> = []
    for (const arg of args) {
      if (Array.isArray(arg)) {
        merged = merged.concat(arg)
      }
    }
    return merged
  }

  for (let i = 0, ct = 0; i < args.length; i++) {
    const arg = args[i]
    if (Array.isArray(arg)) {
      for (let j = 0, argil = arg.length; j < argil; j++) {
        const value = arg[j]
        if (typeof value !== 'undefined') {
          retObj[ct++] = value
        }
      }
    } else {
      for (const k in arg) {
        if (Object.hasOwn(arg, k)) {
          const value = arg[k]
          if (typeof value === 'undefined') {
            continue
          }
          if (parseInt(k, 10) + '' === k) {
            retObj[ct++] = value
          } else {
            retObj[k] = value
          }
        }
      }
    }
  }

  return retObj
}
