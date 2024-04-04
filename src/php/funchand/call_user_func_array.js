module.exports = function call_user_func_array(cb, parameters) {
  // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/call_user_func_array/
  // original by: Thiago Mata (https://thiagomata.blog.com)
  //  revised by: Jon Hohle
  // improved by: Brett Zamir (https://brett-zamir.me)
  // improved by: Diplom@t (https://difane.com/)
  // improved by: Brett Zamir (https://brett-zamir.me)
  //      note 1: Depending on the `cb` that is passed,
  //      note 1: this function can use `eval` and/or `new Function`.
  //      note 1: The `eval` input is however checked to only allow valid function names,
  //      note 1: So it should not be unsafer than uses without eval (seeing as you can)
  //      note 1: already pass any function to be executed here.
  //   example 1: call_user_func_array('isNaN', ['a'])
  //   returns 1: true
  //   example 2: call_user_func_array('isNaN', [1])
  //   returns 2: false

  const $global = typeof window !== 'undefined' ? window : global
  let func
  let scope = null

  const validJSFunctionNamePattern = /^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/

  if (typeof cb === 'string') {
    if (typeof $global[cb] === 'function') {
      func = $global[cb]
    } else if (cb.match(validJSFunctionNamePattern)) {
      func = new Function(null, 'return ' + cb)() // eslint-disable-line no-new-func
    }
  } else if (Object.prototype.toString.call(cb) === '[object Array]') {
    if (typeof cb[0] === 'string') {
      if (cb[0].match(validJSFunctionNamePattern)) {
        func = eval(cb[0] + "['" + cb[1] + "']") // eslint-disable-line no-eval
      }
    } else {
      func = cb[0][cb[1]]
    }

    if (typeof cb[0] === 'string') {
      if (typeof $global[cb[0]] === 'function') {
        scope = $global[cb[0]]
      } else if (cb[0].match(validJSFunctionNamePattern)) {
        scope = eval(cb[0]) // eslint-disable-line no-eval
      }
    } else if (typeof cb[0] === 'object') {
      scope = cb[0]
    }
  } else if (typeof cb === 'function') {
    func = cb
  }

  if (typeof func !== 'function') {
    throw new Error(func + ' is not a valid function')
  }

  return func.apply(scope, parameters)
}
