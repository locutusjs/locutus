module.exports = function array_keys (input, search_value, argStrict) { // eslint-disable-line camelcase
  //  discuss at: http://locutusjs.io/php/array_keys/
  // original by: Kevin van Zonneveld (http://kvz.io)
  //    input by: Brett Zamir (http://brett-zamir.me)
  //    input by: P
  // bugfixed by: Kevin van Zonneveld (http://kvz.io)
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  // improved by: jd
  // improved by: Brett Zamir (http://brett-zamir.me)
  //   example 1: array_keys( {firstname: 'Kevin', surname: 'van Zonneveld'} )
  //   returns 1: [ 'firstname', 'surname' ]

  var search = typeof search_value !== 'undefined',
    tmp_arr = [],
    strict = !!argStrict,
    include = true,
    key = ''

  for (key in input) {
    if (input.hasOwnProperty(key)) {
      include = true
      if (search) {
        if (strict && input[key] !== search_value) {
          include = false
        } else if (input[key] !== search_value) {
          include = false
        }
      }

      if (include) {
        tmp_arr[tmp_arr.length] = key
      }
    }
  }

  return tmp_arr
}
