module.exports = function escapeshellarg (arg) {
  //  discuss at: https://locutus.io/php/escapeshellarg/
  // original by: Felix Geisendoerfer (https://www.debuggable.com/felix)
  // improved by: Brett Zamir (https://brett-zamir.me)
  //   example 1: escapeshellarg("kevin's birthday")
  //   returns 1: "'kevin\\'s birthday'"
  
  if(arg.indexOf("\x00") !== -1) {
    throw new Error('escapeshellarg(): Argument #1 ($arg) must not contain any null bytes');
  }

  var ret = ''

  ret = arg.replace(/[^\\]'/g, function (m, i, s) {
    return m.slice(0, 1) + '\\\''
  })

  return "'" + ret + "'"
}
