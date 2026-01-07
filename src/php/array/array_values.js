module.exports = function array_values(input) {
  //      discuss at: https://locutus.io/php/array_values/
  // parity verified: PHP 8.3
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //     improved by: Brett Zamir (https://brett-zamir.me)
  //       example 1: array_values( {firstname: 'Kevin', surname: 'van Zonneveld'} )
  //       returns 1: [ 'Kevin', 'van Zonneveld' ]

  const tmpArr = []
  let key = ''

  for (key in input) {
    tmpArr[tmpArr.length] = input[key]
  }

  return tmpArr
}
