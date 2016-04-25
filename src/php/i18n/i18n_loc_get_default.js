module.exports = function i18n_loc_get_default () { // eslint-disable-line camelcase
  //  discuss at: http://locutusjs.io/php/i18n_loc_get_default/
  // original by: Brett Zamir (http://brett-zamir.me)
  //        note: Renamed in PHP6 from locale_get_default(). Not listed yet at php.net.
  //        note: List of locales at <http://demo.icu-project.org/icu-bin/locexp>
  //        note: To be usable with sort() if it is passed the `SORT_LOCALE_STRING` sorting flag: http://php.net/manual/en/function.sort.php
  //   example 1: i18n_loc_set_default('pt_PT')
  //   example 1: i18n_loc_get_default()
  //   returns 1: 'pt_PT'
  //        test: skip-1

  var i18lsd = require('../i18n/i18n_loc_set_default')

  var $global = (typeof window !== 'undefined' ? window : GLOBAL)
  $global.$locutus = $global.$locutus || {}
  var $locutus = $global.$locutus
  $locutus.php = $locutus.php || {}
  $locutus.php.locales = $locutus.php.locales || {}

  return $locutus.php.locale_default || (i18lsd('en_US_POSIX'), 'en_US_POSIX')
}
