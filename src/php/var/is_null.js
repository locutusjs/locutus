module.exports = function is_null (mixed_var) { // eslint-disable-line camelcase
  //  discuss at: http://locutusjs.io/php/is_null/
  // original by: Kevin van Zonneveld (http://kvz.io)
  //   example 1: is_null('23')
  //   returns 1: false
  //   example 2: is_null(null)
  //   returns 2: true

  return (mixed_var === null)
}
