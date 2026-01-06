module.exports = function FormatBool(b) {
  //  discuss at: https://locutus.io/golang/strconv/FormatBool
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Returns "true" or "false" according to the value of b.
  //   example 1: FormatBool(true)
  //   returns 1: 'true'
  //   example 2: FormatBool(false)
  //   returns 2: 'false'

  return b ? 'true' : 'false'
}
