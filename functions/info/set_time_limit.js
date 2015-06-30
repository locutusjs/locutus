function set_time_limit(seconds) {
  //  discuss at: http://phpjs.org/functions/set_time_limit/
  // original by: Brett Zamir (http://brett-zamir.me)
  //        test: skip
  //   example 1: set_time_limit(4);
  //   returns 1: undefined

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  // END REDUNDANT

  this.window.setTimeout(function() {
    if (!this.php_js.timeoutStatus) {
      this.php_js.timeoutStatus = true;
    }
    throw 'Maximum execution time exceeded';
  }, seconds * 1000);
}