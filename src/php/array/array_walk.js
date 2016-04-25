module.exports = function array_walk (array, funcname, userdata) { // eslint-disable-line camelcase
  //  discuss at: http://locutusjs.io/php/array_walk/
  // original by: Johnny Mast (http://www.phpvrouwen.nl)
  // bugfixed by: David
  // improved by: Brett Zamir (http://brett-zamir.me)
  //        note: Using ini_set('locutus.no-eval', true) will only work with
  //        note: user-defined string functions, not built-in functions like void()
  //   example 1: array_walk ([3, 4], function () {}, 'userdata')
  //   returns 1: true

  if (!array || typeof array !== 'object') {
    return false
  }

  try {
    if (typeof funcname === 'function') {
      for (var key in array) {
        if (arguments.length > 2) {
          funcname(array[key], key, userdata)
        } else {
          funcname(array[key], key)
        }
      }
    } else {
      return false
    }
  } catch (e) {
    return false
  }

  return true
}
