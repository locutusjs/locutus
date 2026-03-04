import {
  type PhpArrayLike,
  type PhpAssoc,
  type PhpKey,
  type StringLike,
  toPhpArrayObject,
} from '../_helpers/_phpTypes.ts'

export function array_fill_keys<TKey extends PhpKey | StringLike, TValue>(
  keys: PhpArrayLike<TKey>,
  value: TValue,
): PhpAssoc<TValue> {
  //  discuss at: https://locutus.io/php/array_fill_keys/
  // original by: Brett Zamir (https://brett-zamir.me)
  // bugfixed by: Brett Zamir (https://brett-zamir.me)
  //   example 1: var $keys = {'a': 'foo', 2: 5, 3: 10, 4: 'bar'}
  //   example 1: array_fill_keys($keys, 'banana')
  //   returns 1: {"foo": "banana", 5: "banana", 10: "banana", "bar": "banana"}

  const retObj: PhpAssoc<TValue> = {}
  const keyedValues = toPhpArrayObject<TKey>(keys)

  for (const keyedValue of Object.values(keyedValues)) {
    retObj[String(keyedValue)] = value
  }

  return retObj
}
