module.exports = function sql_regcase (str) {
  //  discuss at: http://locutusjs.io/php/sql_regcase/
  // original by: Brett Zamir (http://brett-zamir.me)
  //   example 1: sql_regcase('Foo - bar.')
  //   returns 1: '[Ff][Oo][Oo] - [Bb][Aa][Rr].'

  var setlocale = require('../strings/setlocale')

  setlocale('LC_ALL', 0)
  var i = 0,
    upper = '',
    lower = '',
    pos = 0,
    retStr = ''

  upper = this.locutus.locales[this.locutus.localeCategories.LC_CTYPE].LC_CTYPE.upper
  lower = this.locutus.locales[this.locutus.localeCategories.LC_CTYPE].LC_CTYPE.lower

  for (i = 0; i < str.length; i++) {
    if (((pos = upper.indexOf(str.charAt(i))) !== -1) || ((pos = lower.indexOf(str.charAt(i))) !== -1)) {
      retStr += '[' + upper.charAt(pos) + lower.charAt(pos) + ']'
    } else {
      retStr += str.charAt(i)
    }
  }
  return retStr
}
