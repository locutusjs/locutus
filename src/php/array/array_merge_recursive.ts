import { isObjectLike, type PhpAssoc, type PhpRuntimeValue } from '../_helpers/_phpTypes.ts'

interface MergeObject extends PhpAssoc<MergeValue> {}
type MergeValue = PhpRuntimeValue | MergeValue[] | MergeObject

export function array_merge_recursive(arr1: MergeObject, arr2: MergeObject): MergeObject {
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

  const result: MergeObject = {}
  let numericIdx = 0

  // Helper to check if a key is numeric (PHP integer-indexed)
  const isNumericKey = function (key: string): boolean {
    return parseInt(key, 10) + '' === key + ''
  }

  // Helper to check if value is a plain object (not array)
  const isPlainObject = function (val: PhpRuntimeValue): val is MergeObject {
    return isObjectLike(val) && !Array.isArray(val)
  }

  // Process arr1
  for (const [key, value] of Object.entries(arr1)) {
    if (isNumericKey(key)) {
      result[numericIdx++] = value
    } else {
      result[key] = value
    }
  }

  // Process arr2
  for (const [key, arr2Value] of Object.entries(arr2)) {
    if (isNumericKey(key)) {
      // Numeric keys always append
      result[numericIdx++] = arr2Value
    } else if (key in result) {
      // String key exists in both - need to merge
      const resultValue = result[key]
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
      result[key] = arr2Value
    }
  }

  return result
}
