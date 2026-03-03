import type { PhpAssoc } from '../_helpers/_phpTypes.ts'

export function array_fill<TValue>(startIndex: number, num: number, mixedVal: TValue): PhpAssoc<TValue> {
  //      discuss at: https://locutus.io/php/array_fill/
  // parity verified: PHP 8.3
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //     improved by: Waldo Malqui Silva (https://waldo.malqui.info)
  //       example 1: array_fill(5, 6, 'banana')
  //       returns 1: { 5: 'banana', 6: 'banana', 7: 'banana', 8: 'banana', 9: 'banana', 10: 'banana' }

  const tmpArr: PhpAssoc<TValue> = {}
  if (!isNaN(startIndex) && !isNaN(num)) {
    for (let key = 0; key < num; key++) {
      tmpArr[String(key + startIndex)] = mixedVal
    }
  }

  return tmpArr
}
