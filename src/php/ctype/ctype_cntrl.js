module.exports = function ctype_cntrl (text) { // eslint-disable-line camelcase
  //  discuss at: http://locutusjs.io/php/ctype_cntrl/
  // original by: Brett Zamir (http://brett-zamir.me)
  //   example 1: ctype_cntrl('\u0020')
  //   returns 1: false
  //   example 2: ctype_cntrl('\u001F')
  //   returns 2: true

  var setlocale = require('../strings/setlocale')
  if (typeof text !== 'string') {
    return false
  }
  // ensure setup of localization variables takes place
  setlocale('LC_ALL', 0)

  var $global = (typeof window !== 'undefined' ? window : GLOBAL)
  $global.$locutus = $global.$locutus || {}
  var $locutus = $global.$locutus

  return text.search($locutus.php.locales[$locutus.php.localeCategories.LC_CTYPE].LC_CTYPE.ct) !== -1
}
