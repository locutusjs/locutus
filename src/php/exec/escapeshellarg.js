module.exports = function escapeshellarg (arg) {
  //  discuss at: https://locutus.io/php/escapeshellarg/
  // Warning: this function emulates escapeshellarg() for php-running-on-linux
  // the function behaves differently when running on Windows, which is not covered by this code.
  //
  // original by: Felix Geisendoerfer (https://www.debuggable.com/felix)
  // improved by: Brett Zamir (https://brett-zamir.me)
  // bugfixed by: divinity76 (https://github.com/divinity76)
  //   example 1: escapeshellarg("kevin's birthday")
  //   returns 1: "'Kevin'\''s birthday'"
  //   example 2: escapeshellarg("/home'; whoami;''")
  //   returns 2: "'/home'\''; whoami;'\'''\'''"

  if (arg.indexOf('\x00') !== -1) {
    throw new Error('escapeshellarg(): Argument #1 ($arg) must not contain any null bytes')
  }

  var ret = ''

  ret = arg.replace(/\'/g, '\'\\\'\'')

  return "'" + ret + "'"
}
