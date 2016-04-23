module.exports = function bcscale (scale) {
  //  discuss at: http://locutusjs.io/php/bcscale/
  // original by: lmeyrick (https://sourceforge.net/projects/bcmath-js/)
  //   example 1: bcscale(1)
  //   returns 1: 3
  //        todo: implement these testcases
  //        test: skip-1

  var _locutus_shared_bc = require('../_locutus_shared/_locutus_shared_bc')
  var libbcmath = _locutus_shared_bc()

  scale = parseInt(scale, 10)
  if (isNaN(scale)) {
    return false
  }
  if (scale < 0) {
    return false
  }
  libbcmath.scale = scale
  return true
}
