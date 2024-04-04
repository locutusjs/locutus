module.exports = function tanh(arg) {
  //  discuss at: https://locutus.io/php/tanh/
  // original by: Onno Marsman (https://twitter.com/onnomarsman)
  // imprived by: Robert Eisele (https://www.xarg.org/)
  //   example 1: tanh(5.4251848798444815)
  //   returns 1: 0.9999612058841574

  return 1 - 2 / (Math.exp(2 * arg) + 1)
}
