import { type PhpAssoc, type PhpRuntimeValue, toPhpArrayObject } from '../_helpers/_phpTypes.ts'

type ReverseValue = PhpRuntimeValue

export function array_reverse<TValue extends ReverseValue>(array: TValue[], preserveKeys?: false | undefined): TValue[]
export function array_reverse<TValue extends ReverseValue>(array: TValue[], preserveKeys: true): PhpAssoc<TValue>
export function array_reverse<TValue extends ReverseValue>(
  array: PhpAssoc<TValue>,
  preserveKeys?: false | undefined,
): PhpAssoc<TValue> | TValue[]
export function array_reverse<TValue extends ReverseValue>(
  array: PhpAssoc<TValue>,
  preserveKeys: true,
): PhpAssoc<TValue>
export function array_reverse(
  array: ReverseValue[] | PhpAssoc<ReverseValue>,
  preserveKeys?: boolean,
): ReverseValue[] | PhpAssoc<ReverseValue> {
  //  discuss at: https://locutus.io/php/array_reverse/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Karol Kowalski
  //   example 1: array_reverse( [ 'php', '4.0', ['green', 'red'] ], true)
  //   returns 1: { 2: ['green', 'red'], 1: '4.0', 0: 'php'}

  const preserve = preserveKeys === true
  let result: ReverseValue[] | PhpAssoc<ReverseValue>

  if (Array.isArray(array) && !preserve) {
    result = array.slice(0).reverse()
  } else {
    const source = toPhpArrayObject(array)

    if (preserve) {
      const keys = Object.keys(source)
      const reversed: PhpAssoc<ReverseValue> = {}

      for (let index = keys.length - 1; index >= 0; index -= 1) {
        const key = keys[index]
        if (typeof key === 'string' && Object.prototype.hasOwnProperty.call(source, key)) {
          reversed[key] = source[key]
        }
      }

      result = reversed
    } else {
      const reversed: ReverseValue[] = []
      for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          reversed.unshift(source[key])
        }
      }

      result = reversed
    }
  }

  return result
}
