module.exports = function ctype_cntrl (text) {
  //  discuss at: http://locutusjs.io/php/ctype_cntrl/
  // original by: Brett Zamir (http://brett-zamir.me)
  //  depends on: setlocale
  //   example 1: ctype_cntrl('\u0020');
  //   returns 1: false
  //   example 2: ctype_cntrl('\u001F');
  //   returns 2: true

  if (typeof text !== 'string') {
    return false
  }
  // BEGIN REDUNDANT
  // ensure setup of localization variables takes place
  this.setlocale('LC_ALL', 0)
  // END REDUNDANT
  return text.search(this.locutus.locales[this.locutus.localeCategories.LC_CTYPE].LC_CTYPE.ct) !== -1
}
