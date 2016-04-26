module.exports = function is_callable (mixedVar, syntaxOnly, callableName) { // eslint-disable-line camelcase
  //  discuss at: http://locutusjs.io/php/is_callable/
  // original by: Brett Zamir (http://brett-zamir.me)
  //    input by: François
  // improved by: Brett Zamir (http://brett-zamir.me)
  //        note: The variable callableName cannot work as a string variable passed by reference as in PHP (since JavaScript does not support passing strings by reference), but instead will take the name of a global variable and set that instead
  //        note: When used on an object, depends on a constructor property being kept on the object prototype
  //   example 1: is_callable('is_callable')
  //   returns 1: true
  //   example 2: is_callable('bogusFunction', true)
  //   returns 2: true // gives true because does not do strict checking
  //   example 3: function SomeClass () {}
  //   example 3: SomeClass.prototype.someMethod = function (){}
  //   example 3: var testObj = new SomeClass()
  //   example 3: is_callable([testObj, 'someMethod'], true, 'myVar')
  //   example 3: var $result = myVar
  //   returns 3: 'SomeClass::someMethod'
  //   example 4: is_callable(function () {})
  //   returns 4: true

  var $global = (typeof window !== 'undefined' ? window : GLOBAL)

  var validJSFunctionNamePattern = /^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/

  var name = ''
  var obj = {}
  var method = ''
  var validFunctionName = false

  var getFuncName = function (fn) {
    var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn)
    if (!name) {
      return '(Anonymous)'
    }
    return name[1]
  }

  if (typeof mixedVar === 'string') {
    obj = $global
    method = mixedVar
    name = mixedVar
    validFunctionName = !!name.match(validJSFunctionNamePattern)
  } else if (typeof mixedVar === 'function') {
    return true
  } else if (Object.prototype.toString.call(mixedVar) === '[object Array]' && mixedVar.length === 2 && typeof mixedVar[0] === 'object' && typeof mixedVar[1] === 'string') {
    obj = mixedVar[0]
    method = mixedVar[1]
    name = (obj.constructor && getFuncName(obj.constructor)) + '::' + method
  } else {
    return false
  }

  if (syntaxOnly || typeof obj[method] === 'function') {
    if (callableName) {
      $global[callableName] = name
    }
    return true
  }

  // validFunctionName avoids exploits
  if (validFunctionName && typeof eval(method) === 'function') { // eslint-disable-line no-eval
    if (callableName) {
      $global[callableName] = name
    }
    return true
  }

  return false
}
