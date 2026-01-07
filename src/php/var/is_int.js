module.exports = function is_int(mixedVar) {
  //  discuss at: https://locutus.io/php/is_int/
  //    verified: 8.3
  // original by: Alex
  // improved by: Kevin van Zonneveld (https://kvz.io)
  // improved by: WebDevHobo (https://webdevhobo.blogspot.com/)
  // improved by: Rafał Kukawski (https://blog.kukawski.pl)
  //  revised by: Matt Bradley
  // bugfixed by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
  //      note 1: it different from the PHP implementation. We can't fix this unfortunately.
  //   example 1: is_int(23)
  //   returns 1: true
  //   example 2: is_int('23')
  //   returns 2: false
  //   example 3: is_int(23.5)
  //   returns 3: false
  //   example 4: is_int(true)
  //   returns 4: false

  return mixedVar === +mixedVar && isFinite(mixedVar) && !(mixedVar % 1)
}
