module.exports = function sql_regcase (str) { // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/sql_regcase/
  // original by: Brett Zamir (https://brett-zamir.me)
  //   example 1: sql_regcase('Foo - bar.')
  //   returns 1: '[Ff][Oo][Oo] - [Bb][Aa][Rr].'

  const setlocale = require('../strings/setlocale')
  let i = 0
  let upper = ''
  let lower = ''
  let pos = 0
  let retStr = ''

  setlocale('LC_ALL', 0)

  const $global = (typeof window !== 'undefined' ? window : global)
  $global.$locutus = $global.$locutus || {}
  const $locutus = $global.$locutus
  $locutus.php = $locutus.php || {}

  upper = $locutus.php.locales[$locutus.php.localeCategories.LC_CTYPE].LC_CTYPE.upper
  lower = $locutus.php.locales[$locutus.php.localeCategories.LC_CTYPE].LC_CTYPE.lower

  // @todo: Make this more readable
  for (i = 0; i < str.length; i++) {
    if (((pos = upper.indexOf(str.charAt(i))) !== -1) ||
      ((pos = lower.indexOf(str.charAt(i))) !== -1)) {
      retStr += '[' + upper.charAt(pos) + lower.charAt(pos) + ']'
    } else {
      retStr += str.charAt(i)
    }
  }

  return retStr
}
