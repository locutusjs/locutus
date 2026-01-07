module.exports = function Atoi(s) {
  //  discuss at: https://locutus.io/golang/strconv/Atoi
  //    verified: 1.23
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Parses a decimal string and returns the integer value.
  //      note 1: Returns [value, null] on success, [0, error] on failure.
  //   example 1: Atoi('42')[0]
  //   returns 1: 42
  //   example 2: Atoi('-123')[0]
  //   returns 2: -123
  //   example 3: Atoi('abc')[0]
  //   returns 3: 0

  s = (s + '').trim()

  if (!/^-?\d+$/.test(s)) {
    return [0, new Error('strconv.Atoi: parsing "' + s + '": invalid syntax')]
  }

  const result = parseInt(s, 10)
  if (isNaN(result)) {
    return [0, new Error('strconv.Atoi: parsing "' + s + '": invalid syntax')]
  }

  return [result, null]
}
