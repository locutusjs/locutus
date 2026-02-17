export function array_fill(startIndex: number, num: number, mixedVal: string): { [key: string]: string } {
  //      discuss at: https://locutus.io/php/array_fill/
  // parity verified: PHP 8.3
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //     improved by: Waldo Malqui Silva (https://waldo.malqui.info)
  //       example 1: array_fill(5, 6, 'banana')
  //       returns 1: { 5: 'banana', 6: 'banana', 7: 'banana', 8: 'banana', 9: 'banana', 10: 'banana' }

  let key
  const tmpArr: { [key: string]: string } = {}
  if (!isNaN(startIndex) && !isNaN(num)) {
    for (key = 0; key < num; key++) {
      tmpArr[key + startIndex] = mixedVal
    }
  }

  return tmpArr
}
