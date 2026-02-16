import { _phpCastString as _php_cast_string } from '../_helpers/_phpCastString.ts'

export function substr(input: string | number, start: number, len?: number): string | false {
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

  const str = _php_cast_string(input)

  const $loc = (globalThis as any).$locutus
  const multibyte = String($loc?.php?.ini?.['unicode.semantics']?.local_value ?? '') === 'on'

  const chars = multibyte ? str.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[\s\S]/g) || [] : null

  const inputLength = chars ? chars.length : str.length
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

  if (chars) {
    return chars.slice(start, end).join('')
  }

  return str.slice(start, end)
}
