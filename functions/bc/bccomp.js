function bccomp(left_operand, right_operand, scale) {
  //  discuss at: http://phpjs.org/functions/bccomp/
  // original by: lmeyrick (https://sourceforge.net/projects/bcmath-js/)
  //  depends on: _phpjs_shared_bc
  //   example 1: bccomp(1, 2);
  //   returns 1: 3
  //        todo: implement these testcases

  var libbcmath = this._phpjs_shared_bc();

  var first, second; //bc_num
  if (typeof scale === 'undefined') {
    scale = libbcmath.scale;
  }
  scale = ((scale < 0) ? 0 : scale);

  first = libbcmath.bc_init_num();
  second = libbcmath.bc_init_num();

  first = libbcmath.bc_str2num(left_operand.toString(), scale); // note bc_ not php_str2num
  second = libbcmath.bc_str2num(right_operand.toString(), scale); // note bc_ not php_str2num
  return libbcmath.bc_compare(first, second, scale);
}