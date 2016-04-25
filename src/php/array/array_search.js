module.exports = function array_search (needle, haystack, argStrict) { // eslint-disable-line camelcase
  //  discuss at: http://locutusjs.io/php/array_search/
  // original by: Kevin van Zonneveld (http://kvz.io)
  //    input by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: Kevin van Zonneveld (http://kvz.io)
  //        test: skip-all
  //   example 1: array_search('zonneveld', {firstname: 'kevin', middle: 'van', surname: 'zonneveld'})
  //   returns 1: 'surname'
  //   example 2: ini_set('locutus.return_locutus_arrays', 'on')
  //   example 2: var ordered_arr = array({3:'value'}, {2:'value'}, {'a':'value'}, {'b':'value'})
  //   example 2: array_search(/val/g, ordered_arr); // or var key = ordered_arr.search(/val/g)
  //   returns 2: '3'
  //        test: skip-2

  var strict = !!argStrict,
    key = ''

  if (haystack && typeof haystack === 'object' && haystack.change_key_case) {
    // Duck-type check for our own array()-created LOCUTUS_Array
    return haystack.search(needle, argStrict)
  }
  if (typeof needle === 'object' && needle.exec) {
    // Duck-type for RegExp
    if (!strict) {
      // Let's consider case sensitive searches as strict
      var flags = 'i' + (needle.global ? 'g' : '') +
        (needle.multiline ? 'm' : '') +
        // sticky is FF only
        (needle.sticky ? 'y' : '')
      needle = new RegExp(needle.source, flags)
    }
    for (key in haystack) {
      if (haystack.hasOwnProperty(key)) {
        if (needle.test(haystack[key])) {
          return key
        }
      }
    }
    return false
  }

  for (key in haystack) {
    if (haystack.hasOwnProperty(key)) {
      if ((strict && haystack[key] === needle) || (!strict && haystack[key] === needle)) {
        return key
      }
    }
  }

  return false
}
