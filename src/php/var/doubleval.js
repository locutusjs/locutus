module.exports = function doubleval(mixedVar) {
  //  discuss at: https://locutus.io/php/doubleval/
  //    verified: 8.3
  // original by: Brett Zamir (https://brett-zamir.me)
  //      note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
  //      note 1: it different from the PHP implementation. We can't fix this unfortunately.
  //   example 1: doubleval(186)
  //   returns 1: 186.00

  const floatval = require('../var/floatval')

  return floatval(mixedVar)
}
