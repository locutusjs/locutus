module.exports = function str_repeat(input, multiplier) {
  //      discuss at: https://locutus.io/php/str_repeat/
  // parity verified: PHP 8.3
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //     improved by: Jonas Raoni Soares Silva (https://www.jsfromhell.com)
  //     improved by: Ian Carter (https://euona.com/)
  //       example 1: str_repeat('-=', 10)
  //       returns 1: '-=-=-=-=-=-=-=-=-=-='

  let y = ''
  while (true) {
    if (multiplier & 1) {
      y += input
    }
    multiplier >>= 1
    if (multiplier) {
      input += input
    } else {
      break
    }
  }
  return y
}
