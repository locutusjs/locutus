module.exports = function strnatcasecmp (a, b) {
  //       discuss at: http://locutus.io/php/strnatcasecmp/
  //      original by: Martin Pool
  // reimplemented by: Pierre-Luc Paour
  // reimplemented by: Kristof Coomans (SCK-CEN (Belgian Nucleair Research Centre))
  // reimplemented by: Brett Zamir (http://brett-zamir.me)
  //      bugfixed by: Kevin van Zonneveld (http://kvz.io)
  //         input by: Devan Penner-Woelk
  //      improved by: Kevin van Zonneveld (http://kvz.io)
  // reimplemented by: Rafał Kukawski
  //        example 1: strnatcasecmp(10, 1)
  //        returns 1: 1
  //        example 2: strnatcasecmp('1', '10')
  //        returns 2: -1


  var strnatcmp = require('../strings/strnatcmp')
  var _php_cast_string = require('../_helpers/_php_cast_string')

  if (arguments.length !== 2) {
    return null;
  }

  return strnatcmp(_php_cast_string(a).toLowerCase(), _php_cast_string(b).toLowerCase())
}
