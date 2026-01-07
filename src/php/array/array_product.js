module.exports = function array_product(input) {
  //  discuss at: https://locutus.io/php/array_product/
  //    verified: 8.3
  // original by: Waldo Malqui Silva (https://waldo.malqui.info)
  //   example 1: array_product([ 2, 4, 6, 8 ])
  //   returns 1: 384

  let idx = 0
  let product = 1
  let il = 0

  if (Object.prototype.toString.call(input) !== '[object Array]') {
    return null
  }

  il = input.length
  while (idx < il) {
    product *= !isNaN(input[idx]) ? input[idx] : 0
    idx++
  }

  return product
}
