module.exports = function strcoll (str1, str2) {
  //  discuss at: https://locutus.io/php/strcoll/
  // original by: Brett Zamir (https://brett-zamir.me)
  // improved by: Brett Zamir (https://brett-zamir.me)
  //   example 1: strcoll('a', 'b')
  //   returns 1: -1

  var setlocale = require('../strings/setlocale')

  var $global = (typeof window !== 'undefined' ? window : global)
  $global.$locutus = $global.$locutus || {}
  var $locutus = $global.$locutus
  $locutus.php = $locutus.php || {}

  setlocale('LC_ALL', 0) // ensure setup of localization variables takes place

  var cmp = $locutus.php.locales[$locutus.php.localeCategories.LC_COLLATE].LC_COLLATE

  return cmp(str1, str2)
}
