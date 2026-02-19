import {
  type PhpArrayLike,
  type PhpAssoc,
  type PhpKey,
  type StringLike,
  toPhpArrayObject,
} from '../_helpers/_phpTypes.ts'

export function array_flip<TValue extends PhpKey | StringLike>(trans: PhpArrayLike<TValue>): PhpAssoc<string> {
  //      discuss at: https://locutus.io/php/array_flip/
  // parity verified: PHP 8.3
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //     improved by: Pier Paolo Ramon (https://www.mastersoup.com/)
  //     improved by: Brett Zamir (https://brett-zamir.me)
  //       example 1: array_flip( {a: 1, b: 1, c: 2} )
  //       returns 1: {1: 'b', 2: 'c'}

  const tmpArr: PhpAssoc<string> = {}
  const values = toPhpArrayObject<TValue>(trans)
  const hasOwn = Object.prototype.hasOwnProperty
  for (const key in values) {
    if (!hasOwn.call(values, key)) {
      continue
    }
    tmpArr[String(values[key])] = key
  }

  return tmpArr
}
