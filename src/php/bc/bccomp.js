module.exports = function bccomp (left_operand, right_operand, scale) {
  //  discuss at: http://locutusjs.io/php/bccomp/
  // original by: lmeyrick (https://sourceforge.net/projects/bcmath-js/)
  //   example 1: bccomp(1, 2)
  //   returns 1: 3
  //        todo: implement these testcases
  //        test: skip-1

  var _locutus_shared_bc = require('../_locutus_shared/_locutus_shared_bc')
  var libbcmath = _locutus_shared_bc()

  // bc_num
  var first, second
  if (typeof scale === 'undefined') {
    scale = libbcmath.scale
  }
  scale = ((scale < 0) ? 0 : scale)

  first = libbcmath.bc_init_num()
  second = libbcmath.bc_init_num()

  // note bc_ not php_str2num
  first = libbcmath.bc_str2num(left_operand.toString(), scale)
  // note bc_ not php_str2num
  second = libbcmath.bc_str2num(right_operand.toString(), scale)
  return libbcmath.bc_compare(first, second, scale)
}
