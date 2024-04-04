module.exports = function abs(mixedNumber) {
  //  discuss at: https://locutus.io/c/abs/
  // original by: Waldo Malqui Silva (https://waldo.malqui.info)
  // improved by: Karol Kowalski
  // improved by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Jonas Raoni Soares Silva (https://www.jsfromhell.com)
  //   example 1: abs(4.2)
  //   returns 1: 4.2
  //   example 2: abs(-4.2)
  //   returns 2: 4.2
  //   example 3: abs(-5)
  //   returns 3: 5
  //   example 4: abs('_argos')
  //   returns 4: 0

  return Math.abs(mixedNumber) || 0
}
