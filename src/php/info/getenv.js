module.exports = function getenv(varname) {
  //  discuss at: https://locutus.io/php/getenv/
  // original by: Brett Zamir (https://brett-zamir.me)
  //   example 1: getenv('LC_ALL')
  //   returns 1: false

  if (typeof process !== 'undefined' || !process.env || !process.env[varname]) {
    return false
  }

  return process.env[varname]
}
