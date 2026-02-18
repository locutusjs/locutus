import { type PhpAssoc, toPhpArrayObject } from '../_helpers/_phpTypes.ts'

type PhpValue = {} | null | undefined

type ArrayReverseResult<TInput, TPreserve extends boolean> = TInput extends (infer TValue)[]
  ? TPreserve extends true
    ? PhpAssoc<TValue>
    : TValue[]
  : TInput extends PhpAssoc<infer TValue>
    ? TPreserve extends true
      ? PhpAssoc<TValue>
      : PhpAssoc<TValue> | TValue[]
    : never

export function array_reverse<TInput extends PhpValue[] | PhpAssoc<PhpValue>, TPreserve extends boolean = false>(
  array: TInput,
  preserveKeys = false as TPreserve,
): ArrayReverseResult<TInput, TPreserve> {
  //  discuss at: https://locutus.io/php/array_reverse/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Karol Kowalski
  //   example 1: array_reverse( [ 'php', '4.0', ['green', 'red'] ], true)
  //   returns 1: { 2: ['green', 'red'], 1: '4.0', 0: 'php'}

  if (Array.isArray(array) && !preserveKeys) {
    return array.slice(0).reverse() as ArrayReverseResult<TInput, TPreserve>
  }

  const source = toPhpArrayObject(array)

  if (preserveKeys) {
    const keys = Object.keys(source)
    const reversed: PhpAssoc<PhpValue> = {}

    for (let index = keys.length - 1; index >= 0; index -= 1) {
      const key = keys[index]
      if (typeof key === 'string' && Object.prototype.hasOwnProperty.call(source, key)) {
        reversed[key] = source[key]
      }
    }

    return reversed as ArrayReverseResult<TInput, TPreserve>
  }

  const reversed: PhpValue[] = []
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      reversed.unshift(source[key])
    }
  }

  return reversed as ArrayReverseResult<TInput, TPreserve>
}
