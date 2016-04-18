module.exports = function array_product (input) {
  //  discuss at: http://locutusjs.io/php/array_product/
  // original by: Waldo Malqui Silva (http://waldo.malqui.info)
  //   example 1: array_product([ 2, 4, 6, 8 ]);
  //   returns 1: 384

  var idx = 0,
    product = 1,
    il = 0

  if (Object.prototype.toString.call(input) !== '[object Array]') {
    return null
  }

  il = input.length
  while (idx < il) {
    product *= (!isNaN(input[idx]) ? input[idx] : 0)
    idx++
  }
  return product
}
