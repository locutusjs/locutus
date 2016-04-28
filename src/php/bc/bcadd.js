module.exports = function bcadd (leftOperand, rightOperand, scale) {
  //  discuss at: http://locutusjs.io/php/bcadd/
  // original by: lmeyrick (https://sourceforge.net/projects/bcmath-js/)
  //   example 1: bcadd(1, 2)
  //   returns 1: '3'
  // @todo: implement these testcases

  var bc = require('../_locutus_shared/_locutus_shared_bc')
  var libbcmath = bc()

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

  result = libbcmath.bc_add(first, second, scale)

  if (result.n_scale > scale) {
    result.n_scale = scale
  }

  return result.toString()
}
