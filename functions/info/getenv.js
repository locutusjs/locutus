function getenv(varname) {
  //  discuss at: http://phpjs.org/functions/getenv/
  // original by: Brett Zamir (http://brett-zamir.me)
  //        note: We are not using $_ENV as in PHP, you could define
  //        note: "$_ENV = this.php_js.ENV;" and get/set accordingly
  //        note: Returns e.g. 'en-US' when set global this.php_js.ENV is set
  //        note: Uses global: php_js to store environment info
  //   example 1: getenv('LC_ALL');
  //   returns 1: false

  if (!this.php_js || !this.php_js.ENV || !this.php_js.ENV[varname]) {
    return false;
  }

  return this.php_js.ENV[varname];
}