import type { PhpAssoc } from '../_helpers/_phpTypes.ts'
import { is_float as isFloat } from '../var/is_float.ts'

type PhpValue = {} | null | undefined

export function gettype(mixedVar: PhpValue): string {
  //  discuss at: https://locutus.io/php/gettype/
  // original by: Paulo Freitas
  // improved by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Douglas Crockford (https://javascript.crockford.com)
  // improved by: Brett Zamir (https://brett-zamir.me)
  //    input by: KELAN
  //      note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
  //      note 1: it different from the PHP implementation. We can't fix this unfortunately.
  //   example 1: gettype(1)
  //   returns 1: 'integer'
  //   example 2: gettype(undefined)
  //   returns 2: 'undefined'
  //   example 3: gettype({0: 'Kevin van Zonneveld'})
  //   returns 3: 'object'
  //   example 4: gettype('foo')
  //   returns 4: 'string'
  //   example 5: gettype({0: function () {return false;}})
  //   returns 5: 'object'
  //   example 6: gettype({0: 'test', length: 1, splice: function () {}})
  //   returns 6: 'object'
  //   example 7: gettype(['test'])
  //   returns 7: 'array'

  let s: string = typeof mixedVar
  let name = ''
  const _getFuncName = function (fn: PhpValue): string {
    const funcNameMatch = /\W*function\s+([\w$]+)\s*\(/.exec(String(fn))
    if (!funcNameMatch) {
      return '(Anonymous)'
    }
    return funcNameMatch[1] ?? '(Anonymous)'
  }

  if (s === 'object') {
    if (mixedVar !== null) {
      const objectLike = mixedVar as {
        [key: string]: PhpValue
        length?: PhpValue
        splice?: PhpValue
        propertyIsEnumerable: (property: string) => boolean
        constructor?: PhpValue
      } & PhpAssoc<PhpValue>
      // From: https://javascript.crockford.com/remedial.html
      // @todo: Break up this lengthy if statement
      if (
        typeof objectLike.length === 'number' &&
        !objectLike.propertyIsEnumerable('length') &&
        typeof objectLike.splice === 'function'
      ) {
        s = 'array'
      } else if (objectLike.constructor && _getFuncName(objectLike.constructor)) {
        name = _getFuncName(objectLike.constructor)
        if (name === 'Date') {
          // not in PHP
          s = 'date'
        } else if (name === 'RegExp') {
          // not in PHP
          s = 'regexp'
        } else if (name === 'LOCUTUS_Resource') {
          // Check against our own resource constructor
          s = 'resource'
        }
      }
    } else {
      s = 'null'
    }
  } else if (s === 'number') {
    s = isFloat(mixedVar as number) ? 'double' : 'integer'
  }

  return s
}
