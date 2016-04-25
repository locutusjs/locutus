module.exports = function is_string (mixed_var) { // eslint-disable-line camelcase
  //  discuss at: http://locutusjs.io/php/is_string/
  // original by: Kevin van Zonneveld (http://kvz.io)
  //   example 1: is_string('23')
  //   returns 1: true
  //   example 2: is_string(23.5)
  //   returns 2: false

  return (typeof mixed_var === 'string')
}
