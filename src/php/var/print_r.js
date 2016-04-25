module.exports = function print_r (array, returnVal) { // eslint-disable-line camelcase
  //  discuss at: http://locutusjs.io/php/print_r/
  // original by: Michael White (http://getsprink.com)
  // improved by: Ben Bryan
  // improved by: Brett Zamir (http://brett-zamir.me)
  // improved by: Kevin van Zonneveld (http://kvz.io)
  //    input by: Brett Zamir (http://brett-zamir.me)
  //   example 1: print_r(1, true)
  //   returns 1: '1'

  var echo = require('../strings/echo')

  var output = ''
  var padChar = ' '
  var padVal = 4
  var getFuncName = function (fn) {
    var name = (/\W*function\s+([\w\$]+)\s*\(/)
      .exec(fn)
    if (!name) {
      return '(Anonymous)'
    }
    return name[1]
  }
  var repeatChar = function (len, padChar) {
    var str = ''
    for (var i = 0; i < len; i++) {
      str += padChar
    }
    return str
  }
  var formatArray = function (obj, curDepth, padVal, padChar) {
    if (curDepth > 0) {
      curDepth++
    }

    var basePad = repeatChar(padVal * curDepth, padChar)
    var thickPad = repeatChar(padVal * (curDepth + 1), padChar)
    var str = ''

    if (typeof obj === 'object' && obj !== null && obj.constructor && getFuncName(obj.constructor) !==
      'LOCUTUS_Resource') {
      str += 'Array\n' + basePad + '(\n'
      for (var key in obj) {
        if (Object.prototype.toString.call(obj[key]) === '[object Array]') {
          str += thickPad + '[' + key + '] => ' + formatArray(obj[key], curDepth + 1, padVal, padChar)
        } else {
          str += thickPad + '[' + key + '] => ' + obj[key] + '\n'
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

  output = formatArray(array, 0, padVal, padChar)

  if (returnVal !== true) {
    echo(output)
    return true
  }
  return output
}
