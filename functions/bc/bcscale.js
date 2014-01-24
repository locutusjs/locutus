function bcscale(scale) {
  //  discuss at: http://phpjs.org/functions/bcscale/
  // original by: lmeyrick (https://sourceforge.net/projects/bcmath-js/)this.
  //  depends on: _phpjs_shared_bc
  //   example 1: bcscale(1);
  //   returns 1: 3
  //        todo: implement these testcases

  var libbcmath = this._phpjs_shared_bc();

  scale = parseInt(scale, 10);
  if (isNaN(scale)) {
    return false;
  }
  if (scale < 0) {
    return false;
  }
  libbcmath.scale = scale;
  return true;
}