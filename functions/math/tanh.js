Math.tanh = Math.tanh || function (arg) {
  return 1 - 2 / (Math.exp(2 * arg) + 1)
}

function tanh (arg) {
  //  discuss at: http://phpjs.org/functions/tanh/
  // original by: Onno Marsman
  // improved by: Robert Eisele (http://www.xarg.org/)
  //   example 1: tanh(5.4251848798444815);
  //   returns 1: 0.9999612058841574

  return Math.tanh(arg)
}