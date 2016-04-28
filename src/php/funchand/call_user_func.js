module.exports = function call_user_func (cb, parameters) { // eslint-disable-line camelcase
  //  discuss at: http://locutusjs.io/php/call_user_func/
  // original by: Brett Zamir (http://brett-zamir.me)
  // improved by: Diplom@t (http://difane.com/)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //        note: Depends on call_user_func_array which in turn depends on the `cb` that is passed,
  //        note: this function can use `eval`.
  //        note: The `eval` input is however checked to only allow valid function names,
  //        note: So it should not be unsafer than uses without eval (seeing as you can)
  //        note: already pass any function to be executed here.
  //   example 1: call_user_func('isNaN', 'a')
  //   returns 1: true

  var callUserFuncArray = require('../funchand/call_user_func_array')
  parameters = Array.prototype.slice.call(arguments, 1)
  return callUserFuncArray(cb, parameters)
}
