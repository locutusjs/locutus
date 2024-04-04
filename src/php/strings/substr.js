module.exports = function substr(input, start, len) {
  //  discuss at: https://locutus.io/php/substr/
  // original by: Martijn Wieringa
  // bugfixed by: T.Wild
  // improved by: Onno Marsman (https://twitter.com/onnomarsman)
  // improved by: Brett Zamir (https://brett-zamir.me)
  //  revised by: Theriault (https://github.com/Theriault)
  //  revised by: Rafał Kukawski
  //      note 1: Handles rare Unicode characters if 'unicode.semantics' ini (PHP6) is set to 'on'
  //   example 1: substr('abcdef', 0, -1)
  //   returns 1: 'abcde'
  //   example 2: substr(2, 0, -6)
  //   returns 2: false
  //   example 3: ini_set('unicode.semantics', 'on')
  //   example 3: substr('a\uD801\uDC00', 0, -1)
  //   returns 3: 'a'
  //   example 4: ini_set('unicode.semantics', 'on')
  //   example 4: substr('a\uD801\uDC00', 0, 2)
  //   returns 4: 'a\uD801\uDC00'
  //   example 5: ini_set('unicode.semantics', 'on')
  //   example 5: substr('a\uD801\uDC00', -1, 1)
  //   returns 5: '\uD801\uDC00'
  //   example 6: ini_set('unicode.semantics', 'on')
  //   example 6: substr('a\uD801\uDC00z\uD801\uDC00', -3, 2)
  //   returns 6: '\uD801\uDC00z'
  //   example 7: ini_set('unicode.semantics', 'on')
  //   example 7: substr('a\uD801\uDC00z\uD801\uDC00', -3, -1)
  //   returns 7: '\uD801\uDC00z'
  //        test: skip-3 skip-4 skip-5 skip-6 skip-7

  const _php_cast_string = require('../_helpers/_phpCastString') // eslint-disable-line camelcase

  input = _php_cast_string(input)

  const ini_get = require('../info/ini_get') // eslint-disable-line camelcase
  const multibyte = ini_get('unicode.semantics') === 'on'

  if (multibyte) {
    input = input.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[\s\S]/g) || []
  }

  const inputLength = input.length
  let end = inputLength

  if (start < 0) {
    start += end
  }

  if (typeof len !== 'undefined') {
    if (len < 0) {
      end = len + end
    } else {
      end = len + start
    }
  }

  if (start > inputLength || start < 0 || start > end) {
    return false
  }

  if (multibyte) {
    return input.slice(start, end).join('')
  }

  return input.slice(start, end)
}
