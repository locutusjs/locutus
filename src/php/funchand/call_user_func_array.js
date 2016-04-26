module.exports = function call_user_func_array (cb, parameters) { // eslint-disable-line camelcase
  //  discuss at: http://locutusjs.io/php/call_user_func_array/
  // original by: Thiago Mata (http://thiagomata.blog.com)
  //  revised by: Jon Hohle
  // improved by: Brett Zamir (http://brett-zamir.me)
  // improved by: Diplom@t (http://difane.com/)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //   example 1: call_user_func_array('isNaN', ['a'])
  //   returns 1: true
  //   example 2: call_user_func_array('isNaN', [1])
  //   returns 2: false

  var $global = (typeof window !== 'undefined' ? window : GLOBAL)
  var func
  var scope = null

  if (typeof cb === 'string') {
    if (typeof $global[cb] === 'function') {
      func = $global[cb]
    } else {
      func = (new Function(null, 'return ' + cb)()) // eslint-disable-line no-new-func
    }
  } else if (Object.prototype.toString.call(cb) === '[object Array]') {
    if (typeof cb[0] === 'string') {
      func = eval(cb[0] + "['" + cb[1] + "']") // eslint-disable-line no-eval
    } else {
      func = cb[0][cb[1]]
    }

    if (typeof cb[0] === 'string') {
      if (typeof $global[cb[0]] === 'function') {
        scope = $global[cb[0]]
      } else {
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
