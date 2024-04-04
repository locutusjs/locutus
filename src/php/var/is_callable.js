module.exports = function is_callable(mixedVar, syntaxOnly, callableName) {
  //  discuss at: https://locutus.io/php/is_callable/
  // original by: Brett Zamir (https://brett-zamir.me)
  //    input by: François
  // improved by: Brett Zamir (https://brett-zamir.me)
  // improved by: KnightYoshi
  // improved by: Waldo Malqui Silva (https://fayr.us/waldo/)
  //      note 1: The variable callableName cannot work as a string variable passed by
  //      note 1: reference as in PHP (since JavaScript does not support passing
  //      note 1: strings by reference), but instead will take the name of
  //      note 1: a global variable and set that instead.
  //      note 1: When used on an object, depends on a constructor property
  //      note 1: being kept on the object prototype
  //      note 2: Depending on the `callableName` that is passed, this function can use eval.
  //      note 2: The eval input is however checked to only allow valid function names,
  //      note 2: So it should not be unsafer than uses without eval (seeing as you can)
  //      note 2: already pass any function to be executed here.
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
  //   example 5: is_callable(class MyClass {})
  //   returns 5: false

  const $global = typeof window !== 'undefined' ? window : global

  const validJSFunctionNamePattern = /^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/

  let name = ''
  let obj = {}
  let method = ''
  let validFunctionName = false

  const getFuncName = function (fn) {
    const name = /\W*function\s+([\w$]+)\s*\(/.exec(fn)
    if (!name) {
      return '(Anonymous)'
    }
    return name[1]
  }

  // eslint-disable-next-line no-useless-escape
  if (/(^class|\(this\,)/.test(mixedVar.toString())) {
    return false
  }

  if (typeof mixedVar === 'string') {
    obj = $global
    method = mixedVar
    name = mixedVar
    validFunctionName = !!name.match(validJSFunctionNamePattern)
  } else if (typeof mixedVar === 'function') {
    return true
  } else if (
    Object.prototype.toString.call(mixedVar) === '[object Array]' &&
    mixedVar.length === 2 &&
    typeof mixedVar[0] === 'object' &&
    typeof mixedVar[1] === 'string'
  ) {
    obj = mixedVar[0]
    method = mixedVar[1]
    name = (obj.constructor && getFuncName(obj.constructor)) + '::' + method
  }

  if (syntaxOnly || typeof obj[method] === 'function') {
    if (callableName) {
      $global[callableName] = name
    }
    return true
  }

  // validFunctionName avoids exploits
  // eslint-disable-next-line no-eval
  if (validFunctionName && typeof eval(method) === 'function') {
    if (callableName) {
      $global[callableName] = name
    }
    return true
  }

  return false
}
