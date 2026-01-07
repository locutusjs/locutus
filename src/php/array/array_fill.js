module.exports = function array_fill(startIndex, num, mixedVal) {
  //      discuss at: https://locutus.io/php/array_fill/
  // parity verified: PHP 8.3
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //     improved by: Waldo Malqui Silva (https://waldo.malqui.info)
  //       example 1: array_fill(5, 6, 'banana')
  //       returns 1: { 5: 'banana', 6: 'banana', 7: 'banana', 8: 'banana', 9: 'banana', 10: 'banana' }

  let key
  const tmpArr = {}

  if (!isNaN(startIndex) && !isNaN(num)) {
    for (key = 0; key < num; key++) {
      tmpArr[key + startIndex] = mixedVal
    }
  }

  return tmpArr
}
