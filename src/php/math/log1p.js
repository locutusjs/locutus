module.exports = function log1p(x) {
  //  discuss at: https://locutus.io/php/log1p/
  // original by: Brett Zamir (https://brett-zamir.me)
  // improved by: Robert Eisele (https://www.xarg.org/)
  //      note 1: Precision 'n' can be adjusted as desired
  //   example 1: log1p(1e-15)
  //   returns 1: 9.999999999999995e-16

  let ret = 0
  // degree of precision
  const n = 50

  if (x <= -1) {
    // JavaScript style would be to return Number.NEGATIVE_INFINITY
    return '-INF'
  }
  if (x < 0 || x > 1) {
    return Math.log(1 + x)
  }
  for (let i = 1; i < n; i++) {
    ret += Math.pow(-x, i) / i
  }

  return -ret
}
