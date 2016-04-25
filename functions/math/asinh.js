Math.asinh = Math.asinh || function (arg) {
  return Math.log(arg + Math.sqrt(arg * arg + 1))
}

function asinh (arg) {
  //  discuss at: http://phpjs.org/functions/asinh/
  // original by: Onno Marsman
  // improved by: Robert Eisele (http://www.xarg.org/)
  //   example 1: asinh(8723321.4);
  //   returns 1: 16.67465779841863

  return Math.asinh(arg)
}