module.exports = function shuffle (inputArr) {
  //  discuss at: http://locutusjs.io/php/shuffle/
  // original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  //  revised by: Kevin van Zonneveld (http://kvz.io)
  //  revised by: Brett Zamir (http://brett-zamir.me)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //   example 1: var $data = {5:'a', 2:'3', 3:'c', 4:5, 'q':5}
  //   example 1: ini_set('locutus.strictForIn', true)
  //   example 1: shuffle($data)
  //   example 1: var $result = $data.q
  //   returns 1: 5

  var valArr = []
  var k = ''
  var i = 0
  var strictForIn = false
  var populateArr = []

  for (k in inputArr) {
    // Get key and value arrays
    if (inputArr.hasOwnProperty(k)) {
      valArr.push(inputArr[k])
      if (strictForIn) {
        delete inputArr[k]
      }
    }
  }
  valArr.sort(function () {
    return 0.5 - Math.random()
  })

  var iniVal = (typeof require !== 'undefined' ? require('../info/ini_get')('locutus.strictForIn') : undefined)
  if (!iniVal) {
    iniVal = 'on'
  }
  strictForIn = iniVal === 'on'
  populateArr = strictForIn ? inputArr : populateArr

  for (i = 0; i < valArr.length; i++) {
    // Repopulate the old array
    populateArr[i] = valArr[i]
  }

  return strictForIn || populateArr
}
