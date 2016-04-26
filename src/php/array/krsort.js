module.exports = function krsort (inputArr, sortFlags) {
  //  discuss at: http://locutusjs.io/php/krsort/
  // original by: GeekFG (http://geekfg.blogspot.com)
  // improved by: Kevin van Zonneveld (http://kvz.io)
  // improved by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: pseudaria (https://github.com/pseudaria)
  //        note: The examples are correct, this is a new way
  //        note: This function deviates from PHP in returning a copy of the array instead
  //        note: of acting by reference and returning true; this was necessary because
  //        note: IE does not allow deleting and re-adding of properties without caching
  //        note: of property position; you can set the ini of "locutus.strictForIn" to true to
  //        note: get the PHP behavior, but use this only if you are in an environment
  //        note: such as Firefox extensions where for-in iteration order is fixed and true
  //        note: property deletion is supported. Note that we intend to implement the PHP
  //        note: behavior by default if IE ever does allow it; only gives shallow copy since
  //        note: is by reference in PHP anyways
  //        note: Since JS objects' keys are always strings, and (the
  //        note: default) SORT_REGULAR flag distinguishes by key type,
  //        note: if the content is a numeric string, we treat the
  //        note: "original type" as numeric.
  //   example 1: data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'}
  //   example 1: data = krsort(data)
  //   example 1: var $result = data
  //   returns 1: {d: 'lemon', c: 'apple', b: 'banana', a: 'orange'}
  //   example 2: ini_set('locutus.strictForIn', true)
  //   example 2: data = {2: 'van', 3: 'Zonneveld', 1: 'Kevin'}
  //   example 2: krsort(data)
  //   example 2: var $result = data
  //   returns 2: {3: 'Kevin', 2: 'van', 1: 'Zonneveld'}
  //        test: skip-all

  var i18nlgd = require('../i18n/i18n_loc_get_default')
  var strnatcmp = require('../strings/strnatcmp')

  var tmpArr = {}
  var keys = []
  var sorter
  var i
  var k
  var strictForIn = false
  var populateArr = {}

  var $global = (typeof window !== 'undefined' ? window : GLOBAL)
  $global.$locutus = $global.$locutus || {}
  var $locutus = $global.$locutus
  $locutus.php = $locutus.php || {}
  $locutus.php.locales = $locutus.php.locales || {}

  switch (sortFlags) {
    case 'SORT_STRING':
    // compare items as strings
      sorter = function (a, b) {
        return strnatcmp(b, a)
      }
      break
    case 'SORT_LOCALE_STRING':
    // compare items as strings, based on the current locale (set with  i18n_loc_set_default() as of PHP6)
      var loc = i18nlgd()
      sorter = $locutus.locales[loc].sorting
      break
    case 'SORT_NUMERIC':
    // compare items numerically
      sorter = function (a, b) {
        return (b - a)
      }
      break
    case 'SORT_REGULAR':
    // compare items normally (don't change types)
    default:
      sorter = function (b, a) {
        var aFloat = parseFloat(a),
          bFloat = parseFloat(b),
          aNumeric = aFloat + '' === a,
          bNumeric = bFloat + '' === b
        if (aNumeric && bNumeric) {
          return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0
        } else if (aNumeric && !bNumeric) {
          return 1
        } else if (!aNumeric && bNumeric) {
          return -1
        }
        return a > b ? 1 : a < b ? -1 : 0
      }
      break
  }

  // Make a list of key names
  for (k in inputArr) {
    if (inputArr.hasOwnProperty(k)) {
      keys.push(k)
    }
  }
  keys.sort(sorter)

  var iniVal = (typeof require !== 'undefined' ? require('../info/ini_get')('locutus.strictForIn') : undefined)
  strictForIn = iniVal !== 'off'
  populateArr = strictForIn ? inputArr : populateArr

  // Rebuild array with sorted key names
  for (i = 0; i < keys.length; i++) {
    k = keys[i]
    tmpArr[k] = inputArr[k]
    if (strictForIn) {
      delete inputArr[k]
    }
  }
  for (i in tmpArr) {
    if (tmpArr.hasOwnProperty(i)) {
      populateArr[i] = tmpArr[i]
    }
  }

  return strictForIn || populateArr
}
