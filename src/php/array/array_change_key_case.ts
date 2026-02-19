import { type PhpArrayLike, type PhpAssoc, type PhpValue, toPhpArrayObject } from '../_helpers/_phpTypes.ts'

type ArrayChangeInput = number | PhpArrayLike<PhpValue> | null

export function array_change_key_case(array: number | null, cs?: string | number): false
export function array_change_key_case<TValue>(array: TValue[], cs?: string | number): TValue[]
export function array_change_key_case<TValue>(array: PhpAssoc<TValue>, cs?: string | number): PhpAssoc<TValue>
export function array_change_key_case(array: ArrayChangeInput, cs?: string | number): PhpArrayLike<PhpValue> | false {
  //  discuss at: https://locutus.io/php/array_change_key_case/
  // original by: Ates Goral (https://magnetiq.com)
  // improved by: marrtins
  // improved by: Brett Zamir (https://brett-zamir.me)
  //   example 1: array_change_key_case(42)
  //   returns 1: false
  //   example 2: array_change_key_case([ 3, 5 ])
  //   returns 2: [3, 5]
  //   example 3: array_change_key_case({ FuBaR: 42 })
  //   returns 3: {"fubar": 42}
  //   example 4: array_change_key_case({ FuBaR: 42 }, 'CASE_LOWER')
  //   returns 4: {"fubar": 42}
  //   example 5: array_change_key_case({ FuBaR: 42 }, 'CASE_UPPER')
  //   returns 5: {"FUBAR": 42}
  //   example 6: array_change_key_case({ FuBaR: 42 }, 2)
  //   returns 6: {"FUBAR": 42}

  let result: PhpArrayLike<PhpValue> | false

  if (Array.isArray(array)) {
    result = array
  } else if (!array || typeof array !== 'object') {
    result = false
  } else {
    const caseFunction: 'toLowerCase' | 'toUpperCase' = !cs || cs === 'CASE_LOWER' ? 'toLowerCase' : 'toUpperCase'
    const source = toPhpArrayObject<PhpValue>(array)
    const transformed: PhpAssoc<PhpValue> = {}

    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        transformed[key[caseFunction]()] = source[key]
      }
    }
    result = transformed
  }

  return result
}
