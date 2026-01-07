module.exports = function strcmp(str1, str2) {
  //  discuss at: https://locutus.io/c/string/strcmp/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Compares two strings lexicographically.
  //      note 1: Returns < 0 if str1 < str2, 0 if equal, > 0 if str1 > str2.
  //   example 1: strcmp('abc', 'abc')
  //   returns 1: 0
  //   example 2: strcmp('abc', 'abd')
  //   returns 2: -1
  //   example 3: strcmp('abd', 'abc')
  //   returns 3: 1

  str1 = str1 + ''
  str2 = str2 + ''

  if (str1 === str2) {
    return 0
  }
  return str1 < str2 ? -1 : 1
}
