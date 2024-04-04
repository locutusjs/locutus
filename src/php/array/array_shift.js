module.exports = function array_shift(inputArr) {
  // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/array_shift/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Martijn Wieringa
  //      note 1: Currently does not handle objects
  //   example 1: array_shift(['Kevin', 'van', 'Zonneveld'])
  //   returns 1: 'Kevin'

  if (inputArr.length === 0) {
    return null
  }
  if (inputArr.length > 0) {
    return inputArr.shift()
  }
}
