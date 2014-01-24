function ctype_cntrl(text) {
  //  discuss at: http://phpjs.org/functions/ctype_cntrl/
  // original by: Brett Zamir (http://brett-zamir.me)
  //  depends on: setlocale
  //   example 1: ctype_cntrl('\u0020');
  //   returns 1: false
  //   example 2: ctype_cntrl('\u001F');
  //   returns 2: true

  if (typeof text !== 'string') {
    return false;
  }
  // BEGIN REDUNDANT
  this.setlocale('LC_ALL', 0); // ensure setup of localization variables takes place
  // END REDUNDANT
  return text.search(this.php_js.locales[this.php_js.localeCategories.LC_CTYPE].LC_CTYPE.ct) !== -1;
}