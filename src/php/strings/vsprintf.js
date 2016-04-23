module.exports = function vsprintf (format, args) {
  //  discuss at: http://locutusjs.io/php/vsprintf/
  // original by: ejsanders
  //   example 1: vsprintf('%04d-%02d-%02d', [1988, 8, 1])
  //   returns 1: '1988-08-01'

  var sprintf = require('../strings/sprintf')

  return sprintf.apply(this, [format].concat(args))
}
