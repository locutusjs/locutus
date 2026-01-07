module.exports = function FormatInt(i, base) {
  //      discuss at: https://locutus.io/golang/strconv/FormatInt
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns the string representation of i in the given base (2 to 36).
  //       example 1: FormatInt(42, 10)
  //       returns 1: '42'
  //       example 2: FormatInt(255, 16)
  //       returns 2: 'ff'
  //       example 3: FormatInt(10, 2)
  //       returns 3: '1010'

  i = parseInt(i, 10)
  base = parseInt(base, 10) || 10

  if (base < 2 || base > 36) {
    throw new Error('strconv: illegal base ' + base)
  }

  return i.toString(base)
}
