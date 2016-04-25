module.exports = function ini_set (varname, newvalue) { // eslint-disable-line camelcase
  //  discuss at: http://locutusjs.io/php/ini_set/
  // original by: Brett Zamir (http://brett-zamir.me)
  //        note: This will not set a global_value or access level for the ini item
  //   example 1: ini_set('date.timezone', 'Asia/Hong_Kong')
  //   example 1: ini_set('date.timezone', 'America/Chicago')
  //   returns 1: 'Asia/Hong_Kong'

  var oldval = ''
  var self = this

  try {
    this.locutus = this.locutus || {}
  } catch (e) {
    this.locutus = {}
  }

  this.locutus.ini = this.locutus.ini || {}
  this.locutus.ini[varname] = this.locutus.ini[varname] || {}

  oldval = this.locutus.ini[varname].local_value

  var _setArr = function (oldval) {
    // Although these are set individually, they are all accumulated
    if (typeof oldval === 'undefined') {
      self.locutus.ini[varname].local_value = []
    }
    self.locutus.ini[varname].local_value.push(newvalue)
  }

  switch (varname) {
    case 'extension':
      if (typeof this.dl === 'function') {
      // This function is only experimental in Locutus
        this.dl(newvalue)
      }
      _setArr(oldval, newvalue)
      break
    default:
      this.locutus.ini[varname].local_value = newvalue
      break
  }

  return oldval
}
