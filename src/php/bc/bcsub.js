module.exports = function bcsub (leftOperand, rightOperand, scale) {
  //  discuss at: http://locutusjs.io/php/bcsub/
  // original by: lmeyrick (https://sourceforge.net/projects/bcmath-js/)
  //   example 1: bcsub(1, 2)
  //   returns 1: '-1'

  var _bc = require('../_helpers/_bc')
  var libbcmath = _bc()

  var first, second, result

  if (typeof scale === 'undefined') {
    scale = libbcmath.scale
  }
  scale = ((scale < 0) ? 0 : scale)

  // create objects
  first = libbcmath.bc_init_num()
  second = libbcmath.bc_init_num()
  result = libbcmath.bc_init_num()

  first = libbcmath.php_str2num(leftOperand.toString())
  second = libbcmath.php_str2num(rightOperand.toString())

  result = libbcmath.bc_sub(first, second, scale)

  if (result.n_scale > scale) {
    result.n_scale = scale
  }

  return result.toString()
}
