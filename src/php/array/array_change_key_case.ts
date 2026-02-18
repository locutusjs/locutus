import type { PhpArrayLike, PhpAssoc } from '../_helpers/_phpTypes.ts'

type PhpValue = {} | null | undefined
type ArrayChangeInput = number | PhpArrayLike<PhpValue> | null

type ArrayChangeKeyCaseResult<TInput> = TInput extends (infer TValue)[]
  ? TValue[]
  : TInput extends PhpAssoc<infer TValue>
    ? PhpAssoc<TValue>
    : false

const castArrayChangeResult = <TInput>(value: PhpArrayLike<PhpValue> | false): ArrayChangeKeyCaseResult<TInput> =>
  value as ArrayChangeKeyCaseResult<TInput>

export function array_change_key_case<TInput extends ArrayChangeInput>(
  array: TInput,
  cs?: string | number,
): ArrayChangeKeyCaseResult<TInput> {
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

  if (Array.isArray(array)) {
    return castArrayChangeResult<TInput>(array)
  }

  if (!array || typeof array !== 'object') {
    return castArrayChangeResult<TInput>(false)
  }

  const caseFunction: 'toLowerCase' | 'toUpperCase' = !cs || cs === 'CASE_LOWER' ? 'toLowerCase' : 'toUpperCase'
  const source = array as PhpAssoc<PhpValue>
  const transformed: PhpAssoc<PhpValue> = {}

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      transformed[key[caseFunction]()] = source[key]
    }
  }

  return castArrayChangeResult<TInput>(transformed)
}
