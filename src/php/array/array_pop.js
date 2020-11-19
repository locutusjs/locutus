module.exports = function array_pop (inputArr) { // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/array_pop/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Kevin van Zonneveld (https://kvz.io)
  //    input by: Brett Zamir (https://brett-zamir.me)
  //    input by: Theriault (https://github.com/Theriault)
  // bugfixed by: Kevin van Zonneveld (https://kvz.io)
  // bugfixed by: Brett Zamir (https://brett-zamir.me)
  //      note 1: While IE (and other browsers) support iterating an object's
  //      note 1: own properties in order, if one attempts to add back properties
  //      note 1: in IE, they may end up in their former position due to their position
  //      note 1: being retained. So use of this function with "associative arrays"
  //      note 1: (objects) may lead to unexpected behavior in an IE environment if
  //      note 1: you add back properties with the same keys that you removed
  //   example 1: array_pop([0,1,2])
  //   returns 1: 2
  //   example 2: var $data = {firstName: 'Kevin', surName: 'van Zonneveld'}
  //   example 2: var $lastElem = array_pop($data)
  //   example 2: var $result = $data
  //   returns 2: {firstName: 'Kevin'}

  let key = ''
  let lastKey = ''

  if (inputArr.hasOwnProperty('length')) {
    // Indexed
    if (!inputArr.length) {
      // Done popping, are we?
      return null
    }
    return inputArr.pop()
  } else {
    // Associative
    for (key in inputArr) {
      if (inputArr.hasOwnProperty(key)) {
        lastKey = key
      }
    }
    if (lastKey) {
      const tmp = inputArr[lastKey]
      delete (inputArr[lastKey])
      return tmp
    } else {
      return null
    }
  }
}
