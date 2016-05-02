module.exports = function intval (mixedVar, base) {
  //  discuss at: http://locutusjs.io/php/intval/
  // original by: Kevin van Zonneveld (http://kvz.io)
  // improved by: stensi
  // bugfixed by: Kevin van Zonneveld (http://kvz.io)
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: Rafał Kukawski (http://blog.kukawski.pl)
  //    input by: Matteo
  //   example 1: intval('Kevin van Zonneveld')
  //   returns 1: 0
  //   example 2: intval(4.2)
  //   returns 2: 4
  //   example 3: intval(42, 8)
  //   returns 3: 42
  //   example 4: intval('09')
  //   returns 4: 9
  //   example 5: intval('1e', 16)
  //   returns 5: 30

  var tmp

  var type = typeof mixedVar

  if (type === 'boolean') {
    return +mixedVar
  } else if (type === 'string') {
    tmp = parseInt(mixedVar, base || 10)
    return (isNaN(tmp) || !isFinite(tmp)) ? 0 : tmp
  } else if (type === 'number' && isFinite(mixedVar)) {
    return mixedVar | 0
  } else {
    return 0
  }
}
