import { isObjectLike, type PhpAssoc, type PhpRuntimeValue } from '../_helpers/_phpTypes.ts'

interface MergeObject extends PhpAssoc<MergeValue> {}
type MergeValue = PhpRuntimeValue | MergeValue[] | MergeObject

function mergeInto(result: MergeObject, source: MergeObject): void {
  let numericIdx = Object.keys(result).filter((key) => parseInt(key, 10) + '' === key + '').length

  // Helper to check if a key is numeric (PHP integer-indexed)
  const isNumericKey = function (key: string): boolean {
    return parseInt(key, 10) + '' === key + ''
  }

  // Helper to check if value is a plain object (not array)
  const isPlainObject = function (val: PhpRuntimeValue): val is MergeObject {
    return isObjectLike(val) && !Array.isArray(val)
  }

  for (const [key, sourceValue] of Object.entries(source)) {
    if (isNumericKey(key)) {
      result[numericIdx++] = sourceValue
    } else if (key in result) {
      const resultValue = result[key]
      if (isPlainObject(resultValue) && isPlainObject(sourceValue)) {
        result[key] = array_merge_recursive(resultValue, sourceValue)
      } else if (Array.isArray(resultValue)) {
        resultValue.push(sourceValue)
      } else {
        result[key] = [resultValue, sourceValue]
      }
    } else {
      result[key] = sourceValue
    }
  }
}

export function array_merge_recursive(...arrays: MergeObject[]): MergeObject {
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

  if (arrays.length === 0) {
    return {}
  }

  const result: MergeObject = {}
  for (const array of arrays) {
    mergeInto(result, array)
  }

  return result
}
