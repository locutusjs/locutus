module.exports = function call_user_func (cb, parameters) { // eslint-disable-line camelcase
  //  discuss at: http://locutusjs.io/php/call_user_func/
  // original by: Brett Zamir (http://brett-zamir.me)
  // improved by: Diplom@t (http://difane.com/)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //   example 1: call_user_func('isNaN', 'a')
  //   returns 1: true

  var callUserFuncArray = require('../funchand/call_user_func_array')
  parameters = Array.prototype.slice.call(arguments, 1)
  return callUserFuncArray(cb, parameters)
}
