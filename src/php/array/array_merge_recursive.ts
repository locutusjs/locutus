import { isObjectLike, type PhpAssoc } from '../_helpers/_phpTypes.ts'

export function array_merge_recursive(arr1: PhpAssoc<unknown>, arr2: PhpAssoc<unknown>): PhpAssoc<unknown> {
  //       discuss at: https://locutus.io/php/array_merge_recursive/
  //      original by: Subhasis Deb
  //         input by: Brett Zamir (https://brett-zamir.me)
  //      bugfixed by: Kevin van Zonneveld (https://kvz.io)
  // reimplemented by: Kevin van Zonneveld (https://kvz.io)
  //           note 1: Numeric keys are renumbered starting from 0, string keys are preserved
  //        example 1: var $arr1 = {'color': {'favorite': 'red'}, 0: 5}
  //        example 1: var $arr2 = {0: 10, 'color': {'favorite': 'green', 0: 'blue'}}
  //        example 1: array_merge_recursive($arr1, $arr2)
  //        returns 1: {'color': {'favorite': ['red', 'green'], 0: 'blue'}, 0: 5, 1: 10}

  const result: PhpAssoc<unknown> = {}
  let numericIdx = 0

  // Helper to check if a key is numeric (PHP integer-indexed)
  const isNumericKey = function (key: string): boolean {
    return parseInt(key, 10) + '' === key + ''
  }

  // Helper to check if value is a plain object (not array)
  const isPlainObject = function (val: unknown): val is PhpAssoc<unknown> {
    return isObjectLike(val) && !Array.isArray(val)
  }

  // Process arr1
  for (const key in arr1) {
    if (Object.prototype.hasOwnProperty.call(arr1, key)) {
      if (isNumericKey(key)) {
        result[numericIdx++] = arr1[key]
      } else {
        result[key] = arr1[key]
      }
    }
  }

  // Process arr2
  for (const key in arr2) {
    if (Object.prototype.hasOwnProperty.call(arr2, key)) {
      if (isNumericKey(key)) {
        // Numeric keys always append
        result[numericIdx++] = arr2[key]
      } else if (key in result) {
        // String key exists in both - need to merge
        const resultValue = result[key]
        const arr2Value = arr2[key]
        if (isPlainObject(resultValue) && isPlainObject(arr2Value)) {
          // Both are objects - recurse
          result[key] = array_merge_recursive(resultValue, arr2Value)
        } else if (Array.isArray(resultValue)) {
          // Result is already an array, push new value
          resultValue.push(arr2Value)
        } else {
          // Create array with both values
          result[key] = [resultValue, arr2Value]
        }
      } else {
        result[key] = arr2[key]
      }
    }
  }

  return result
}
