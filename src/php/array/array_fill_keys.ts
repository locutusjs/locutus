import type { PhpAssoc } from '../_helpers/_phpTypes.ts'

export function array_fill_keys(keys: PhpAssoc<unknown>, value: string): PhpAssoc<string> {
  //  discuss at: https://locutus.io/php/array_fill_keys/
  // original by: Brett Zamir (https://brett-zamir.me)
  // bugfixed by: Brett Zamir (https://brett-zamir.me)
  //   example 1: var $keys = {'a': 'foo', 2: 5, 3: 10, 4: 'bar'}
  //   example 1: array_fill_keys($keys, 'banana')
  //   returns 1: {"foo": "banana", 5: "banana", 10: "banana", "bar": "banana"}

  const retObj: PhpAssoc<string> = {}

  for (const key in keys) {
    retObj[String(keys[key])] = value
  }

  return retObj
}
