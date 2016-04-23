module.exports = function ctype_alnum (text) {
  //  discuss at: http://locutusjs.io/php/ctype_alnum/
  // original by: Brett Zamir (http://brett-zamir.me)
  //   example 1: ctype_alnum('AbC12')
  //   returns 1: true

  var setlocale = require('../strings/setlocale')
  if (typeof text !== 'string') {
    return false
  }
  // BEGIN REDUNDANT
  // ensure setup of localization variables takes place
  setlocale('LC_ALL', 0)
  // END REDUNDANT
  return text.search(this.locutus.locales[this.locutus.localeCategories.LC_CTYPE].LC_CTYPE.an) !== -1
}
