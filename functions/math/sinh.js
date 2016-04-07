Math.sinh = Math.sinh || function (arg) {
  return (Math.exp(arg) - Math.exp(-arg)) / 2
}

function sinh (arg) {
  //  discuss at: http://phpjs.org/functions/sinh/
  // original by: Onno Marsman
  // improved by: Robert Eisele (http://www.xarg.org/)
  //   example 1: sinh(-0.9834330348825909);
  //   returns 1: -1.1497971402636502

  return Math.sinh(arg)
}