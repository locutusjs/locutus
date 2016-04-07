Math.acosh = Math.acosh || function (arg) {
  return Math.log(arg + Math.sqrt(arg * arg - 1))
}

function acosh (arg) {
  //  discuss at: http://phpjs.org/functions/acosh/
  // original by: Onno Marsman
  // improved by: Robert Eisele (http://www.xarg.org/)
  //   example 1: acosh(8723321.4);
  //   returns 1: 16.674657798418625

  return Math.acosh(arg)
}