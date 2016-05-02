module.exports = function bcdiv (leftOperand, rightOperand, scale) {
  //  discuss at: http://locutusjs.io/php/bcdiv/
  // original by: lmeyrick (https://sourceforge.net/projects/bcmath-js/)
  //   example 1: bcdiv(1, 2)
  //   returns 1: '0'
  // @todo: implement these testcases

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

  result = libbcmath.bc_divide(first, second, scale)
  if (result === -1) {
    // error
    throw new Error(11, '(BC) Division by zero')
  }
  if (result.n_scale > scale) {
    result.n_scale = scale
  }

  return result.toString()
}
