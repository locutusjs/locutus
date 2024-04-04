module.exports = function is_string(mixedVar) {
  // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/is_string/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //   example 1: is_string('23')
  //   returns 1: true
  //   example 2: is_string(23.5)
  //   returns 2: false

  return typeof mixedVar === 'string'
}
