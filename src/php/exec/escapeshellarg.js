module.exports = function escapeshellarg (arg) {
  //  discuss at: https://locutus.io/php/escapeshellarg/
  // original by: Felix Geisendoerfer (https://www.debuggable.com/felix)
  // improved by: Brett Zamir (https://brett-zamir.me)
  //   example 1: escapeshellarg("kevin's birthday")
  //   returns 1: "'kevin\\'s birthday'"

  var ret = ''

  ret = arg.replace(/\'/g, '\'\\\'\'')

  return "'" + ret + "'"
}
