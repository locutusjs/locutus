module.exports = function substr_compare(mainStr, str, offset, length, caseInsensitivity) {
  //      discuss at: https://locutus.io/php/substr_compare/
  // parity verified: PHP 8.3
  //     original by: Brett Zamir (https://brett-zamir.me)
  //     original by: strcasecmp, strcmp
  //       example 1: substr_compare("abcde", "bc", 1, 2)
  //       returns 1: 0

  if (!offset && offset !== 0) {
    throw new Error('Missing offset for substr_compare()')
  }

  if (offset < 0) {
    offset = mainStr.length + offset
  }

  if (length && length > mainStr.length - offset) {
    return false
  }
  length = length || mainStr.length - offset

  mainStr = mainStr.substr(offset, length)
  // Should only compare up to the desired length
  str = str.substr(0, length)
  if (caseInsensitivity) {
    // Works as strcasecmp
    mainStr = (mainStr + '').toLowerCase()
    str = (str + '').toLowerCase()
    if (mainStr === str) {
      return 0
    }
    return mainStr > str ? 1 : -1
  }
  // Works as strcmp
  return mainStr === str ? 0 : mainStr > str ? 1 : -1
}
