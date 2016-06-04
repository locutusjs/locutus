module.exports = function array_walk_recursive (array, funcname, userdata) { // eslint-disable-line camelcase
  // original by: Hugues Peccatte
  //      note 1: Only works with user-defined functions, not built-in functions like void()
  //   example 1: array_walk_recursive([3, 4], function () {}, 'userdata')
  //   returns 1: true
  //   example 2: array_walk_recursive([3, [4]], function () {}, 'userdata')
  //   returns 2: true
  //   example 3: array_walk_recursive([3, []], function () {}, 'userdata')
  //   returns 3: true

  if (!array || typeof array !== 'object') {
    return false
  }

  try {
    if (typeof funcname === 'function') {
      for (var key in array) {
        //apply "funcname" recursively only on arrays
        if (Object.prototype.toString.call(array[key]) === '[object Array]') {
          var funcArgs = [array[key], funcname];
          if (arguments.length > 2) {
            funcArgs.push(userdata);
          }
          if (false === array_walk_recursive.apply(null, funcArgs)) {
            return false;
          }
          continue;
        }
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
