module.exports = function getenv (varname) {
  //  discuss at: http://locutusjs.io/php/getenv/
  // original by: Brett Zamir (http://brett-zamir.me)
  //        note: We are not using $_ENV as in PHP, you could define
  //        note: "$_ENV = this.locutus.ENV;" and get/set accordingly
  //        note: Returns e.g. 'en-US' when set global this.locutus.ENV is set
  //        note: Uses global: locutus to store environment info
  //   example 1: getenv('LC_ALL')
  //   returns 1: false

  if (!this.locutus || !this.locutus.ENV || !this.locutus.ENV[varname]) {
    return false
  }

  return this.locutus.ENV[varname]
}
