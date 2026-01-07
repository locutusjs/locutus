function roundToInt(value, mode) {
  let tmp = Math.floor(Math.abs(value) + 0.5)

  if (
    (mode === 'PHP_ROUND_HALF_DOWN' && value === tmp - 0.5) ||
    (mode === 'PHP_ROUND_HALF_EVEN' && value === 0.5 + 2 * Math.floor(tmp / 2)) ||
    (mode === 'PHP_ROUND_HALF_ODD' && value === 0.5 + 2 * Math.floor(tmp / 2) - 1)
  ) {
    tmp -= 1
  }

  return value < 0 ? -tmp : tmp
}

module.exports = function round(value, precision = 0, mode = 'PHP_ROUND_HALF_UP') {
  //      discuss at: https://locutus.io/php/round/
  // parity verified: PHP 8.3
  //     original by: Philip Peterson
  //      revised by: Onno Marsman (https://twitter.com/onnomarsman)
  //      revised by: T.Wild
  //      revised by: Rafał Kukawski (https://blog.kukawski.pl)
  //        input by: Greenseed
  //        input by: meo
  //        input by: William
  //        input by: Josep Sanz (https://www.ws3.es/)
  //     bugfixed by: Brett Zamir (https://brett-zamir.me)
  //      revised by: Rafał Kukawski
  //       example 1: round(1241757, -3)
  //       returns 1: 1242000
  //       example 2: round(3.6)
  //       returns 2: 4
  //       example 3: round(2.835, 2)
  //       returns 3: 2.84
  //       example 4: round(1.1749999999999, 2)
  //       returns 4: 1.17
  //       example 5: round(58551.799999999996, 2)
  //       returns 5: 58551.8
  //       example 6: round(4096.485, 2)
  //       returns 6: 4096.49

  const floatCast = require('../_helpers/_php_cast_float')
  const intCast = require('../_helpers/_php_cast_int')
  let p

  // the code is heavily based on the native PHP implementation
  // https://github.com/php/php-src/blob/PHP-7.4/ext/standard/math.c#L355

  value = floatCast(value)
  precision = intCast(precision)
  p = Math.pow(10, precision)

  if (isNaN(value) || !isFinite(value)) {
    return value
  }

  // if value already integer and positive precision
  // then nothing to do, return early
  if (Math.trunc(value) === value && precision >= 0) {
    return value
  }

  // PHP does a pre-rounding before rounding to desired precision
  // https://wiki.php.net/rfc/rounding#pre-rounding_to_the_value_s_precision_if_possible
  const preRoundPrecision = 14 - Math.floor(Math.log10(Math.abs(value)))

  if (preRoundPrecision > precision && preRoundPrecision - 15 < precision) {
    value = roundToInt(value * Math.pow(10, preRoundPrecision), mode)
    value /= Math.pow(10, Math.abs(precision - preRoundPrecision))
  } else {
    value *= p
  }

  value = roundToInt(value, mode)

  return value / p
}
