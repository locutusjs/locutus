module.exports = function natsort (inputArr) {
  //  discuss at: http://locutusjs.io/php/natsort/
  // original by: Brett Zamir (http://brett-zamir.me)
  // improved by: Brett Zamir (http://brett-zamir.me)
  // improved by: Theriault (https://github.com/Theriault)
  //        note: This function deviates from PHP in returning a copy of the array instead
  //        note: of acting by reference and returning true; this was necessary because
  //        note: IE does not allow deleting and re-adding of properties without caching
  //        note: of property position; you can set the ini of "locutus.strictForIn" to true to
  //        note: get the PHP behavior, but use this only if you are in an environment
  //        note: such as Firefox extensions where for-in iteration order is fixed and true
  //        note: property deletion is supported. Note that we intend to implement the PHP
  //        note: behavior by default if IE ever does allow it; only gives shallow copy since
  //        note: is by reference in PHP anyways
  //   example 1: $array1 = {a:"img12.png", b:"img10.png", c:"img2.png", d:"img1.png"}
  //   example 1: $array1 = natsort($array1)
  //   returns 1: {d: 'img1.png', c: 'img2.png', b: 'img10.png', a: 'img12.png'}
  //        test: skip-1

  var strnatcmp = require('../strings/strnatcmp')

  var valArr = [],
    k, i, ret, that = this,
    strictForIn = false,
    populateArr = {}

  // BEGIN REDUNDANT
  this.locutus = this.locutus || {}
  this.locutus.ini = this.locutus.ini || {}
  // END REDUNDANT
  strictForIn = this.locutus.ini['locutus.strictForIn'] && this.locutus.ini['locutus.strictForIn'].local_value && this.locutus
    .ini['locutus.strictForIn'].local_value !== 'off'
  populateArr = strictForIn ? inputArr : populateArr

  // Get key and value arrays
  for (k in inputArr) {
    if (inputArr.hasOwnProperty(k)) {
      valArr.push([k, inputArr[k]])
      if (strictForIn) {
        delete inputArr[k]
      }
    }
  }
  valArr.sort(function (a, b) {
    return strnatcmp(a[1], b[1])
  })

  // Repopulate the old array
  for (i = 0; i < valArr.length; i++) {
    populateArr[valArr[i][0]] = valArr[i][1]
  }

  return strictForIn || populateArr
}
