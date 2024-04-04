module.exports = function strval(str) {
  //  discuss at: https://locutus.io/php/strval/
  // original by: Brett Zamir (https://brett-zamir.me)
  // improved by: Kevin van Zonneveld (https://kvz.io)
  // bugfixed by: Brett Zamir (https://brett-zamir.me)
  //   example 1: strval({red: 1, green: 2, blue: 3, white: 4})
  //   returns 1: 'Object'

  const gettype = require('../var/gettype')
  let type = ''

  if (str === null) {
    return ''
  }

  type = gettype(str)

  // Comment out the entire switch if you want JS-like
  // behavior instead of PHP behavior
  switch (type) {
    case 'boolean':
      if (str === true) {
        return '1'
      }
      return ''
    case 'array':
      return 'Array'
    case 'object':
      return 'Object'
  }

  return str
}
