module.exports = function escapeshellarg(arg) {
  //  discuss at: https://locutus.io/php/escapeshellarg/
  //    verified: 8.3
  // Warning: this function emulates escapeshellarg() for php-running-on-linux
  // the function behaves differently when running on Windows, which is not covered by this code.
  //
  // original by: Felix Geisendoerfer (https://www.debuggable.com/felix)
  // improved by: Brett Zamir (https://brett-zamir.me)
  // bugfixed by: divinity76 (https://github.com/divinity76)
  //   example 1: escapeshellarg("kevin's birthday")
  //   returns 1: "'kevin'\\''s birthday'"
  //   example 2: escapeshellarg("/home'; whoami;''")
  //   returns 2: "'/home'\\''; whoami;'\\'''\\'''"

  if (arg.indexOf('\x00') !== -1) {
    throw new Error('escapeshellarg(): Argument #1 ($arg) must not contain any null bytes')
  }

  // Check if the script is running on Windows
  let isWindows = false
  if (typeof process !== 'undefined' && process.platform) {
    isWindows = process.platform === 'win32'
  }
  if (typeof window !== 'undefined' && window.navigator.platform) {
    isWindows = window.navigator.platform.indexOf('Win') !== -1
  }

  if (isWindows) {
    // Windows escaping strategy
    // Double quotes need to be escaped and the whole argument enclosed in double quotes
    return '"' + arg.replace(/(["%])/g, '^$1') + '"'
  } else {
    // Unix-like escaping strategy
    return "'" + arg.replace(/'/g, "'\\''") + "'"
  }
}
