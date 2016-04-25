module.exports = function ini_get (varname) { // eslint-disable-line camelcase
  //  discuss at: http://locutusjs.io/php/ini_get/
  // original by: Brett Zamir (http://brett-zamir.me)
  //        note: The ini values must be set by ini_set or manually within an ini file
  //   example 1: ini_set('date.timezone', 'Asia/Hong_Kong')
  //   example 1: ini_get('date.timezone')
  //   returns 1: 'Asia/Hong_Kong'

  if (this.locutus && this.locutus.ini && this.locutus.ini[varname] && this.locutus.ini[varname].local_value !==
    undefined) {
    if (this.locutus.ini[varname].local_value === null) {
      return ''
    }
    return this.locutus.ini[varname].local_value
  }

  return ''
}
