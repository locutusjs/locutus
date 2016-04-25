module.exports = function array_values (input) { // eslint-disable-line camelcase
  //  discuss at: http://locutusjs.io/php/array_values/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //   example 1: array_values( {firstname: 'Kevin', surname: 'van Zonneveld'} )
  //   returns 1: [ 'Kevin', 'van Zonneveld' ]

  var tmp_arr = [],
    key = ''

  if (input && typeof input === 'object' && input.change_key_case) {
    // Duck-type check for our own array()-created LOCUTUS_Array
    return input.values()
  }

  for (key in input) {
    tmp_arr[tmp_arr.length] = input[key]
  }

  return tmp_arr
}
