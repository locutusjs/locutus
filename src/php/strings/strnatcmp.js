module.exports = function strnatcmp (fString1, fString2, fVersion) {
  //  discuss at: http://locutusjs.io/php/strnatcmp/
  // original by: Martijn Wieringa
  // improved by: Michael White (http://getsprink.com)
  // improved by: Jack
  // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  //      note 1: Added fVersion argument against code guidelines, because it's so neat
  //   example 1: strnatcmp('Price 12.9', 'Price 12.15')
  //   returns 1: 1
  //   example 2: strnatcmp('Price 12.09', 'Price 12.15')
  //   returns 2: -1
  //   example 3: strnatcmp('Price 12.90', 'Price 12.15')
  //   returns 3: 1
  //   example 4: strnatcmp('Version 12.9', 'Version 12.15', true)
  //   returns 4: -6
  //   example 5: strnatcmp('Version 12.15', 'Version 12.9', true)
  //   returns 5: 6
  //        test: skip-2

  var strcmp = require('../strings/strcmp')
  var i = 0

  if (fVersion === undefined) {
    fVersion = false
  }

  var _strnatcmpSplit = function (fString) {
    var result = []
    var buffer = ''
    var chr = ''
    var i = 0
    var fStringl = 0

    var text = true

    fStringl = fString.length
    for (i = 0; i < fStringl; i++) {
      chr = fString.substring(i, i + 1)
      if (chr.match(/\d/)) {
        if (text) {
          if (buffer.length > 0) {
            result[result.length] = buffer
            buffer = ''
          }

          text = false
        }
        buffer += chr
      } else if ((text === false) && (chr === '.') && (i < (fString.length - 1)) && (fString.substring(i + 1, i +
            2)
          .match(/\d/))) {
        result[result.length] = buffer
        buffer = ''
      } else {
        if (text === false) {
          if (buffer.length > 0) {
            result[result.length] = parseInt(buffer, 10)
            buffer = ''
          }
          text = true
        }
        buffer += chr
      }
    }

    if (buffer.length > 0) {
      if (text) {
        result[result.length] = buffer
      } else {
        result[result.length] = parseInt(buffer, 10)
      }
    }

    return result
  }

  var array1 = _strnatcmpSplit(fString1 + '')
  var array2 = _strnatcmpSplit(fString2 + '')

  var len = array1.length
  var text = true

  var result = -1
  var r = 0

  if (len > array2.length) {
    len = array2.length
    result = 1
  }

  for (i = 0; i < len; i++) {
    if (isNaN(array1[i])) {
      if (isNaN(array2[i])) {
        text = true

        if ((r = strcmp(array1[i], array2[i])) !== 0) {
          return r
        }
      } else if (text) {
        return 1
      } else {
        return -1
      }
    } else if (isNaN(array2[i])) {
      if (text) {
        return -1
      } else {
        return 1
      }
    } else {
      if (text || fVersion) {
        if ((r = (array1[i] - array2[i])) !== 0) {
          return r
        }
      } else {
        if ((r = strcmp(array1[i].toString(), array2[i].toString())) !== 0) {
          return r
        }
      }

      text = false
    }
  }

  return result
}
