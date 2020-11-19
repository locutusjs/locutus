module.exports = function lcfirst (str) {
  //  discuss at: https://locutus.io/php/lcfirst/
  // original by: Brett Zamir (https://brett-zamir.me)
  //   example 1: lcfirst('Kevin Van Zonneveld')
  //   returns 1: 'kevin Van Zonneveld'

  str += ''
  const f = str.charAt(0)
    .toLowerCase()
  return f + str.substr(1)
}
