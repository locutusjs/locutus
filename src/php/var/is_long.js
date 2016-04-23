module.exports = function is_long (mixed_var) {
  //  discuss at: http://locutusjs.io/php/is_long/
  // original by: Paulo Freitas
  //        note: 1.0 is simplified to 1 before it can be accessed by the function, this makes
  //        note: it different from the PHP implementation. We can't fix this unfortunately.
  //   example 1: is_long(186.31)
  //   returns 1: true

  var is_float = require('../var/is_float')
  return is_float(mixed_var)
}
