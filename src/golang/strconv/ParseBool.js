module.exports = function ParseBool(str) {
  //  discuss at: https://locutus.io/golang/strconv/ParseBool
  //    verified: 1.23
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Parses a boolean string value.
  //      note 1: Returns [value, null] on success, [false, error] on failure.
  //      note 1: Accepts: 1, t, T, TRUE, true, True, 0, f, F, FALSE, false, False
  //   example 1: ParseBool('true')[0]
  //   returns 1: true
  //   example 2: ParseBool('FALSE')[0]
  //   returns 2: false
  //   example 3: ParseBool('1')[0]
  //   returns 3: true

  str = (str + '').trim()

  switch (str) {
    case '1':
    case 't':
    case 'T':
    case 'true':
    case 'TRUE':
    case 'True':
      return [true, null]
    case '0':
    case 'f':
    case 'F':
    case 'false':
    case 'FALSE':
    case 'False':
      return [false, null]
    default:
      return [false, new Error('strconv.ParseBool: parsing "' + str + '": invalid syntax')]
  }
}
