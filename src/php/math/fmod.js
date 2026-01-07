module.exports = function fmod(x, y) {
  //      discuss at: https://locutus.io/php/fmod/
  // parity verified: PHP 8.3
  //     original by: Onno Marsman (https://twitter.com/onnomarsman)
  //        input by: Brett Zamir (https://brett-zamir.me)
  //     bugfixed by: Kevin van Zonneveld (https://kvz.io)
  //     bugfixed by: Irina (https://github.com/dekairi)
  //       example 1: fmod(5.7, 1.3)
  //       returns 1: 0.5
  //       example 2: fmod(10, 1)
  //       returns 2: 0

  let tmp
  let tmp2
  let p = 0
  let pY = 0
  let l = 0.0
  let l2 = 0.0

  tmp = x.toExponential().match(/^.\.?(.*)e(.+)$/)
  p = parseInt(tmp[2], 10) - (tmp[1] + '').length
  tmp = y.toExponential().match(/^.\.?(.*)e(.+)$/)
  pY = parseInt(tmp[2], 10) - (tmp[1] + '').length

  if (pY > p) {
    p = pY
  }

  tmp2 = x % y

  if (p < -100 || p > 20) {
    // toFixed will give an out of bound error so we fix it like this:
    l = Math.round(Math.log(tmp2) / Math.log(10))
    l2 = Math.pow(10, l)

    return (tmp2 / l2).toFixed(l - p) * l2
  } else {
    return parseFloat(tmp2.toFixed(Math.abs(p)))
  }
}
