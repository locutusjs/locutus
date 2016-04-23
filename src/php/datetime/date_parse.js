module.exports = function date_parse (date) {
  //  discuss at: http://locutusjs.io/php/date_parse/
  // original by: Brett Zamir (http://brett-zamir.me)
  //   example 1: date_parse('2006-12-12 10:00:00.5');
  //   returns 1: {year : 2006, month: 12, day: 12, hour: 10, minute: 0, second: 0, fraction: 0.5, warning_count: 0, warnings: [], error_count: 0, errors: [], is_localtime: false}
  //        test: skip-1

  var strtotime = require('../datetime/strtotime')

  // BEGIN REDUNDANT
  this.locutus = this.locutus || {}
  // END REDUNDANT

  var ts,
    warningsOffset = this.locutus.warnings ? this.locutus.warnings.length : null,
    errorsOffset = this.locutus.errors ? this.locutus.errors.length : null

  try {
    // Allow strtotime to return a decimal (which it normally does not)
    this.locutus.date_parse_state = true
    ts = strtotime(date)
    this.locutus.date_parse_state = false
  } finally {
    if (!ts) {
      return false
    }
  }

  var dt = new Date(ts * 1000)

  var retObj = {
    // Grab any new warnings or errors added (not implemented yet in strtotime()); throwing warnings, notices, or errors could also be easily monitored by using 'watch' on this.locutus.latestWarning, etc. and/or calling any defined error handlers
    warning_count: warningsOffset !== null ? this.locutus.warnings.slice(warningsOffset)
      .length : 0,
    warnings: warningsOffset !== null ? this.locutus.warnings.slice(warningsOffset) : [],
    error_count: errorsOffset !== null ? this.locutus.errors.slice(errorsOffset)
      .length : 0,
    errors: errorsOffset !== null ? this.locutus.errors.slice(errorsOffset) : []
  }
  retObj.year = dt.getFullYear()
  retObj.month = dt.getMonth() + 1
  retObj.day = dt.getDate()
  retObj.hour = dt.getHours()
  retObj.minute = dt.getMinutes()
  retObj.second = dt.getSeconds()
  retObj.fraction = parseFloat('0.' + dt.getMilliseconds())
  retObj.is_localtime = dt.getTimezoneOffset() !== 0

  return retObj
}
