module.exports = function Itoa(i) {
  //  discuss at: https://locutus.io/golang/strconv/Itoa
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Converts an integer to its decimal string representation.
  //   example 1: Itoa(42)
  //   returns 1: '42'
  //   example 2: Itoa(-123)
  //   returns 2: '-123'
  //   example 3: Itoa(0)
  //   returns 3: '0'

  return String(parseInt(i, 10))
}
