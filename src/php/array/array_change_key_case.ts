import { type PhpArrayLike, type PhpAssoc, type PhpInput, toPhpArrayObject } from '../_helpers/_phpTypes.ts'

type ChangeValue = PhpInput
type ArrayChangeInput<TValue extends ChangeValue> = number | PhpArrayLike<TValue> | null
type ChangeKeyCaseMode = 0 | 1 | 2 | 'CASE_LOWER' | 'CASE_UPPER'

export function array_change_key_case(array: number | null, cs?: ChangeKeyCaseMode): false
export function array_change_key_case<TValue extends ChangeValue>(array: TValue[], cs?: ChangeKeyCaseMode): TValue[]
export function array_change_key_case<TValue extends ChangeValue>(
  array: PhpAssoc<TValue>,
  cs?: ChangeKeyCaseMode,
): PhpAssoc<TValue>
export function array_change_key_case<TValue extends ChangeValue>(
  array: ArrayChangeInput<TValue>,
  cs?: ChangeKeyCaseMode,
): PhpArrayLike<TValue> | false {
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

  let result: PhpArrayLike<TValue> | false

  if (Array.isArray(array)) {
    result = array
  } else if (!array || typeof array !== 'object') {
    result = false
  } else {
    const caseFunction: 'toLowerCase' | 'toUpperCase' =
      cs === undefined || cs === 0 || cs === 'CASE_LOWER' ? 'toLowerCase' : 'toUpperCase'
    const source = toPhpArrayObject<TValue>(array)
    const transformed: PhpAssoc<TValue> = {}

    for (const [key, value] of Object.entries(source)) {
      transformed[key[caseFunction]()] = value
    }
    result = transformed
  }

  return result
}
