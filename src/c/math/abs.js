module.exports = function abs(mixedNumber) {
  //      discuss at: https://locutus.io/c/abs/
  // parity verified: C 23
  //     original by: Waldo Malqui Silva (https://waldo.malqui.info)
  //     improved by: Karol Kowalski
  //     improved by: Kevin van Zonneveld (https://kvz.io)
  //     improved by: Jonas Raoni Soares Silva (https://www.jsfromhell.com)
  //       example 1: abs(-5)
  //       returns 1: 5
  //       example 2: abs(-42)
  //       returns 2: 42
  //       example 3: abs(0)
  //       returns 3: 0

  return Math.abs(mixedNumber) || 0
}
