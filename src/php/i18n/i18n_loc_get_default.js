module.exports = function i18n_loc_get_default () {
  //  discuss at: http://locutusjs.io/php/i18n_loc_get_default/
  // original by: Brett Zamir (http://brett-zamir.me)
  //        note: Renamed in PHP6 from locale_get_default(). Not listed yet at php.net.
  //        note: List of locales at <http://demo.icu-project.org/icu-bin/locexp>
  //        note: To be usable with sort() if it is passed the `SORT_LOCALE_STRING` sorting flag: http://php.net/manual/en/function.sort.php
  //   example 1: i18n_loc_set_default('pt_PT');
  //   example 1: i18n_loc_get_default();
  //   returns 1: 'pt_PT'

  var i18n_loc_set_default = require('../i18n/i18n_loc_set_default')
  try {
    this.locutus = this.locutus || {}
  } catch (e) {
    this.locutus = {}
  }

  // Ensure defaults are set up
  return this.locutus.i18nLocale || (i18n_loc_set_default('en_US_POSIX'), 'en_US_POSIX')
}
