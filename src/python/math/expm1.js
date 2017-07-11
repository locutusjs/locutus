module.exports = function expm1 (float) {
  //  discuss at: 
  // original by: xDenny (http://www.github.com/xZDenny)
  //   example 1: expm1(19)
  //   returns 1: 178482299.96318728

  var value;
  value = Math.exp(float) - 1;
  return value
}
