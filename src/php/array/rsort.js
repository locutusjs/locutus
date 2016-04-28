module.exports = function rsort (inputArr, sortFlags) {
  //  discuss at: http://locutusjs.io/php/rsort/
  // original by: Kevin van Zonneveld (http://kvz.io)
  //  revised by: Brett Zamir (http://brett-zamir.me)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //        note: SORT_STRING (as well as natsort and natcasesort) might also be
  //        note: integrated into all of these functions by adapting the code at
  //        note: http://sourcefrog.net/projects/natsort/natcompare.js
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
  //   example 1: var $arr = ['Kevin', 'van', 'Zonneveld']
  //   example 1: rsort($arr)
  //   example 1: var $result = $arr
  //   returns 1: ['van', 'Zonneveld', 'Kevin']
  //   example 2: ini_set('locutus.strictForIn', true)
  //   example 2: var $fruits = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'}
  //   example 2: rsort($fruits)
  //   example 2: var $result = $fruits
  //   returns 2: {0: 'orange', 1: 'lemon', 2: 'banana', 3: 'apple'}
  //        test: skip-1

  var i18nlgd = require('../i18n/i18n_loc_get_default')
  var strnatcmp = require('../strings/strnatcmp')

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
    default:
      // compare items normally (don't change types)
      sorter = function (b, a) {
        var aFloat = parseFloat(a)
        var bFloat = parseFloat(b)
        var aNumeric = aFloat + '' === a
        var bNumeric = bFloat + '' === b
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

  var iniVal = (typeof require !== 'undefined' ? require('../info/ini_get')('locutus.strictForIn') : undefined)
  strictForIn = iniVal !== 'off'
  populateArr = strictForIn ? inputArr : populateArr
  var valArr = []

  for (k in inputArr) {
    // Get key and value arrays
    if (inputArr.hasOwnProperty(k)) {
      valArr.push(inputArr[k])
      if (strictForIn) {
        delete inputArr[k]
      }
    }
  }

  valArr.sort(sorter)

  for (i = 0; i < valArr.length; i++) {
    // Repopulate the old array
    populateArr[i] = valArr[i]
  }

  return strictForIn || populateArr
}
