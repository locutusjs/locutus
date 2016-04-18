module.exports = function acosh (arg) {
  //  discuss at: http://locutusjs.io/php/acosh/
  // original by: Onno Marsman
  //   example 1: acosh(8723321.4);
  //   returns 1: 16.674657798418625

  return Math.log(arg + Math.sqrt(arg * arg - 1))
}
