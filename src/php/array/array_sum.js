module.exports = function array_sum(array) {
  //  discuss at: https://locutus.io/php/array_sum/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // bugfixed by: Nate
  // bugfixed by: Gilbert
  // improved by: David Pilia (https://www.beteck.it/)
  // improved by: Brett Zamir (https://brett-zamir.me)
  //   example 1: array_sum([4, 9, 182.6])
  //   returns 1: 195.6
  //   example 2: var $total = []
  //   example 2: var $index = 0.1
  //   example 2: for (var $y = 0; $y < 12; $y++){ $total[$y] = $y + $index }
  //   example 2: array_sum($total)
  //   returns 2: 67.2

  let key
  let sum = 0

  // input sanitation
  if (typeof array !== 'object') {
    return null
  }

  for (key in array) {
    if (!isNaN(parseFloat(array[key]))) {
      sum += parseFloat(array[key])
    }
  }

  return sum
}
