import type { PhpAssoc, PhpInput, PhpList } from '../_helpers/_phpTypes.ts'

type FilterPredicateResult = PhpInput

export function array_filter<T, S extends T>(arr: PhpList<T>, func: (value: T) => value is S): PhpList<S>

export function array_filter<T, S extends T>(arr: PhpAssoc<T>, func: (value: T) => value is S): PhpAssoc<S>

export function array_filter<T>(arr: PhpList<T>, func?: (value: T) => FilterPredicateResult): PhpList<T>

export function array_filter<T>(arr: PhpAssoc<T>, func?: (value: T) => FilterPredicateResult): PhpAssoc<T>

export function array_filter<T>(
  arr: PhpAssoc<T> | PhpList<T>,
  func?: (value: T) => FilterPredicateResult,
): PhpAssoc<T> | PhpList<T> {
  //  discuss at: https://locutus.io/php/array_filter/
  // original by: Brett Zamir (https://brett-zamir.me)
  //    input by: max4ever
  // improved by: Brett Zamir (https://brett-zamir.me)
  //      note 1: Takes a function as an argument, not a function's name
  //   example 1: var odd = function (num) {return (num & 1);}
  //   example 1: array_filter({"a": 1, "b": 2, "c": 3, "d": 4, "e": 5}, odd)
  //   returns 1: {"a": 1, "c": 3, "e": 5}
  //   example 2: var even = function (num) {return (!(num & 1));}
  //   example 2: array_filter([6, 7, 8, 9, 10, 11, 12], even)
  //   returns 2: [ 6, , 8, , 10, , 12 ]
  //   example 3: array_filter({"a": 1, "b": false, "c": -1, "d": 0, "e": null, "f":'', "g":undefined})
  //   returns 3: {"a":1, "c":-1}

  const callback =
    func ||
    function (v: T) {
      return v
    }

  if (Array.isArray(arr)) {
    // @todo: Issue #73
    const filtered: PhpList<T> = []
    for (const [key, value] of Object.entries(arr)) {
      if (callback(value)) {
        filtered[Number(key)] = value
      }
    }
    return filtered
  }

  const filtered: PhpAssoc<T> = {}
  for (const [key, value] of Object.entries(arr)) {
    if (callback(value)) {
      filtered[key] = value
    }
  }

  return filtered
}
