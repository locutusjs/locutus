module.exports = function var_export (mixedExpression, boolReturn) { // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/var_export/
  // original by: Philip Peterson
  // improved by: johnrembo
  // improved by: Brett Zamir (https://brett-zamir.me)
  //    input by: Brian Tafoya (https://www.premasolutions.com/)
  //    input by: Hans Henrik (https://hanshenrik.tk/)
  // bugfixed by: Brett Zamir (https://brett-zamir.me)
  // bugfixed by: Brett Zamir (https://brett-zamir.me)
  // bugfixed by: simivar (https://github.com/simivar)
  // bugfixed by: simivar (https://github.com/simivar)
  // bugfixed by: simivar (https://github.com/simivar)
  //   example 1: var_export(null)
  //   returns 1: null
  //   example 2: var_export({0: 'Kevin', 1: 'van', 2: 'Zonneveld'}, true)
  //   returns 2: "array (\n  0 => 'Kevin',\n  1 => 'van',\n  2 => 'Zonneveld'\n)"
  //   example 3: var data = 'Kevin'
  //   example 3: var_export(data, true)
  //   returns 3: "'Kevin'"
  //   example 4: var_export({0: 'Kevin', 1: 'van', 'lastName': 'Zonneveld'}, true)
  //   returns 4: "array (\n  0 => 'Kevin',\n  1 => 'van',\n  'lastName' => 'Zonneveld'\n)"
  //   example 5: var_export([], true)
  //   returns 5: "array (\n)"
  //   example 6: var_export({ test: [ 'a', 'b' ] }, true)
  //   returns 6: "array (\n  'test' =>\n  array (\n    0 => 'a',\n    1 => 'b'\n  )\n)"

  var echo = require('../strings/echo')
  var retstr = ''
  var iret = ''
  var value
  var cnt = 0
  var x = []
  var i = 0
  var funcParts = []
  // We use the last argument (not part of PHP) to pass in
  // our indentation level
  var idtLevel = arguments[2] || 2
  var innerIndent = ''
  var outerIndent = ''
  var getFuncName = function (fn) {
    var name = (/\W*function\s+([\w$]+)\s*\(/).exec(fn)
    if (!name) {
      return '(Anonymous)'
    }
    return name[1]
  }

  var _isNormalInteger = function (string) {
    var number = Math.floor(Number(string))
    return number !== Infinity && String(number) === string && number >= 0
  }

  var _makeIndent = function (idtLevel) {
    return (new Array(idtLevel + 1))
      .join(' ')
  }
  var __getType = function (inp) {
    var i = 0
    var match
    var types
    var cons
    var type = typeof inp
    if (type === 'object' && (inp && inp.constructor) &&
      getFuncName(inp.constructor) === 'LOCUTUS_Resource') {
      return 'resource'
    }
    if (type === 'function') {
      return 'function'
    }
    if (type === 'object' && !inp) {
      // Should this be just null?
      return 'null'
    }
    if (type === 'object') {
      if (!inp.constructor) {
        return 'object'
      }
      cons = inp.constructor.toString()
      match = cons.match(/(\w+)\(/)
      if (match) {
        cons = match[1].toLowerCase()
      }
      types = ['boolean', 'number', 'string', 'array']
      for (i = 0; i < types.length; i++) {
        if (cons === types[i]) {
          type = types[i]
          break
        }
      }
    }
    return type
  }
  var type = __getType(mixedExpression)

  if (type === null) {
    retstr = 'NULL'
  } else if (type === 'array' || type === 'object') {
    outerIndent = _makeIndent(idtLevel - 2)
    innerIndent = _makeIndent(idtLevel)
    for (i in mixedExpression) {
      value = ''
      if (__getType(mixedExpression[i]) === 'array') {
          value = '\n'
      }
      value += var_export(mixedExpression[i], 1, idtLevel + 2)
      value = typeof value === 'string' ? value.replace(/</g, '&lt;')
        .replace(/>/g, '&gt;') : value
      i = _isNormalInteger(i) ? i : `'${i}'`
      x[cnt++] = innerIndent + i + ' => ' + value
    }
    if (x.length > 0) {
      iret = x.join(',\n') + '\n'
    }
    retstr = outerIndent + 'array (\n' + iret + outerIndent + ')'
  } else if (type === 'function') {
    funcParts = mixedExpression.toString().match(/function .*?\((.*?)\) \{([\s\S]*)\}/)

    // For lambda functions, var_export() outputs such as the following:
    // '\000lambda_1'. Since it will probably not be a common use to
    // expect this (unhelpful) form, we'll use another PHP-exportable
    // construct, create_function() (though dollar signs must be on the
    // variables in JavaScript); if using instead in JavaScript and you
    // are using the namespaced version, note that create_function() will
    // not be available as a global
    retstr = "create_function ('" + funcParts[1] + "', '" +
      funcParts[2].replace(new RegExp("'", 'g'), "\\'") + "')"
  } else if (type === 'resource') {
    // Resources treated as null for var_export
    retstr = 'NULL'
  } else {
    retstr = typeof mixedExpression !== 'string' ? mixedExpression
      : "'" + mixedExpression.replace(/(["'])/g, '\\$1').replace(/\0/g, '\\0') + "'"
  }

  if (!boolReturn) {
    echo(retstr)
    return null
  }

  return retstr
}
