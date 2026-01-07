module.exports = function array_walk(array, funcname, userdata) {
  //  discuss at: https://locutus.io/php/array_walk/
  // original by: Johnny Mast (https://www.phpvrouwen.nl)
  // bugfixed by: David
  // improved by: Brett Zamir (https://brett-zamir.me)
  //      note 1: Only works with user-defined functions, not built-in functions like void()
  //   example 1: array_walk ([3, 4], function () {}, 'userdata')
  //   returns 1: true
  //   example 2: array_walk ('mystring', function () {})
  //   returns 2: false
  //   example 3: array_walk ({"title":"my title"}, function () {})
  //   returns 3: true

  if (!array || typeof array !== 'object') {
    return false
  }

  try {
    if (typeof funcname === 'function') {
      for (const key in array) {
        if (arguments.length > 2) {
          funcname(array[key], key, userdata)
        } else {
          funcname(array[key], key)
        }
      }
    } else {
      return false
    }
  } catch (_e) {
    return false
  }

  return true
}
