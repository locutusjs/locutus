module.exports = function is_long(mixedVar) {
  //  discuss at: https://locutus.io/php/is_long/
  // original by: Paulo Freitas
  //      note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
  //      note 1: it different from the PHP implementation. We can't fix this unfortunately.
  //   example 1: is_long(186.31)
  //   returns 1: true

  const _isFloat = require('../var/is_float')
  return _isFloat(mixedVar)
}
