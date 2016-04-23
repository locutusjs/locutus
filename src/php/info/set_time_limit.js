module.exports = function set_time_limit (seconds) {
  //  discuss at: http://locutusjs.io/php/set_time_limit/
  // original by: Brett Zamir (http://brett-zamir.me)
  //        test: skip-all
  //   example 1: set_time_limit(4);
  //   returns 1: undefined

  // BEGIN REDUNDANT
  this.locutus = this.locutus || {}
  // END REDUNDANT

  this.window.setTimeout(function () {
    if (!this.locutus.timeoutStatus) {
      this.locutus.timeoutStatus = true
    }
    throw new Error('Maximum execution time exceeded')
  }, seconds * 1000)
}
