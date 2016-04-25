Math.atanh = Math.atanh || function (arg) {
  return 0.5 * Math.log((1 + arg) / (1 - arg))
}

function atanh (arg) {
  //  discuss at: http://phpjs.org/functions/atanh/
  // original by: Onno Marsman
  // improved by: Robert Eisele (http://www.xarg.org/)
  //   example 1: atanh(0.3);
  //   returns 1: 0.3095196042031118

  return Math.atanh(arg)
}