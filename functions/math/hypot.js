module.exports = function (x, y) {
  //  discuss at: http://phpjs.org/functions/hypot/
  // original by: Onno Marsman
  // imprived by: Robert Eisele (http://www.xarg.org/)
  //   example 1: hypot(3, 4);
  //   returns 1: 5
  //   example 2: hypot([], 'a');
  //   returns 2: null

 x = Math.abs(x)
  y = Math.abs(y)

  var t = Math.min(x, y)
  x = Math.max(x, y)
  t = t / x

  return x * Math.sqrt(1 + t * t) || null
}
