module.exports = function ctype_alpha(text) {
  //  discuss at: https://locutus.io/php/ctype_alpha/
  // original by: Brett Zamir (https://brett-zamir.me)
  //   example 1: ctype_alpha('Az')
  //   returns 1: true

  const setlocale = require('../strings/setlocale')
  if (typeof text !== 'string') {
    return false
  }
  // ensure setup of localization variables takes place
  setlocale('LC_ALL', 0)

  const $global = typeof window !== 'undefined' ? window : global
  $global.$locutus = $global.$locutus || {}
  const $locutus = $global.$locutus
  const p = $locutus.php

  return text.search(p.locales[p.localeCategories.LC_CTYPE].LC_CTYPE.al) !== -1
}
