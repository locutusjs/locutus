module.exports = function print_r(array, returnVal) {
  //      discuss at: https://locutus.io/php/print_r/
  // parity verified: PHP 8.3
  //     original by: Michael White (https://getsprink.com)
  //     improved by: Ben Bryan
  //     improved by: Brett Zamir (https://brett-zamir.me)
  //     improved by: Kevin van Zonneveld (https://kvz.io)
  //        input by: Brett Zamir (https://brett-zamir.me)
  //       example 1: print_r(1, true)
  //       returns 1: '1'

  const echo = require('../strings/echo')

  let output = ''
  const padChar = ' '
  const padVal = 4

  const _repeatChar = function (len, padChar) {
    let str = ''
    for (let i = 0; i < len; i++) {
      str += padChar
    }
    return str
  }
  const _formatArray = function (obj, curDepth, padVal, padChar) {
    if (curDepth > 0) {
      curDepth++
    }

    const basePad = _repeatChar(padVal * curDepth, padChar)
    const thickPad = _repeatChar(padVal * (curDepth + 1), padChar)
    let str = ''

    if (typeof obj === 'object' && obj !== null && obj.constructor) {
      str += 'Array\n' + basePad + '(\n'
      for (const key in obj) {
        if (Object.prototype.toString.call(obj[key]) === '[object Array]') {
          str += thickPad
          str += '['
          str += key
          str += '] => '
          str += _formatArray(obj[key], curDepth + 1, padVal, padChar)
        } else {
          str += thickPad
          str += '['
          str += key
          str += '] => '
          str += obj[key]
          str += '\n'
        }
      }
      str += basePad + ')\n'
    } else if (obj === null || obj === undefined) {
      str = ''
    } else {
      // for our "resource" class
      str = obj.toString()
    }

    return str
  }

  output = _formatArray(array, 0, padVal, padChar)

  if (returnVal !== true) {
    echo(output)
    return true
  }
  return output
}
