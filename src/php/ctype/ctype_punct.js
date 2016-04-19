module.exports = function ctype_punct (text) {
  //  discuss at: http://locutusjs.io/php/ctype_punct/
  // original by: Brett Zamir (http://brett-zamir.me)
  //  depends on: setlocale
  //   example 1: ctype_punct('!?');
  //   returns 1: true

  if (typeof text !== 'string') {
    return false
  }
  // BEGIN REDUNDANT
  // ensure setup of localization variables takes place
  this.setlocale('LC_ALL', 0)
  // END REDUNDANT
  return text.search(this.locutus.locales[this.locutus.localeCategories.LC_CTYPE].LC_CTYPE.pu) !== -1
}
