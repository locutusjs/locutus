module.exports = function ParseInt(s, base, bitSize) {
  //  discuss at: https://locutus.io/golang/strconv/ParseInt
  //    verified: 1.23
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Interprets a string s in the given base (0, 2 to 36).
  //      note 1: Returns [value, null] on success, [0, error] on failure.
  //   example 1: ParseInt('42', 10, 64)[0]
  //   returns 1: 42
  //   example 2: ParseInt('ff', 16, 64)[0]
  //   returns 2: 255
  //   example 3: ParseInt('1010', 2, 64)[0]
  //   returns 3: 10

  s = (s + '').trim()
  base = parseInt(base, 10) || 10

  if (base < 2 || base > 36) {
    return [0, new Error('strconv.ParseInt: invalid base ' + base)]
  }

  const result = parseInt(s, base)
  if (isNaN(result)) {
    return [0, new Error('strconv.ParseInt: parsing "' + s + '": invalid syntax')]
  }

  return [result, null]
}
