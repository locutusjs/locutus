module.exports = function getlastmod () {
  //  discuss at: http://locutusjs.io/php/getlastmod/
  // original by: Brett Zamir (http://brett-zamir.me)
  //        note: Will not work on browsers which don't support document.lastModified
  //   example 1: getlastmod()
  //   returns 1: 1237610043

  if (typeof window === 'undefined') {
    var fs = require('fs')
    var obj = fs.statSync(__filename)
    return obj.mtime
  }

  return new Date(this.window.document.lastModified).getTime() / 1000
}
