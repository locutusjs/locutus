export function array_fill(startIndex: number, num: number, mixedVal: string): Record<string, any> {
  //      discuss at: https://locutus.io/php/array_fill/
  // parity verified: PHP 8.3
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //     improved by: Waldo Malqui Silva (https://waldo.malqui.info)
  //       example 1: array_fill(5, 6, 'banana')
  //       returns 1: { 5: 'banana', 6: 'banana', 7: 'banana', 8: 'banana', 9: 'banana', 10: 'banana' }

  let key
  const tmpArr: Record<string, any> = {}
  if (!isNaN(startIndex) && !isNaN(num)) {
    for (key = 0; key < num; key++) {
      tmpArr[key + startIndex] = mixedVal
    }
  }

  return tmpArr
}
