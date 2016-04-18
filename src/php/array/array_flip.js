module.exports = function array_flip (trans) {
  //  discuss at: http://locutusjs.org/php/array_flip/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Pier Paolo Ramon (http://www.mastersoup.com/)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //  depends on: array
  //        test: skip
  //   example 1: array_flip( {a: 1, b: 1, c: 2} );
  //   returns 1: {1: 'b', 2: 'c'}
  //   example 2: ini_set('locutus.return_locutus_arrays', 'on');
  //   example 2: array_flip(array({a: 0}, {b: 1}, {c: 2}))[1];
  //   returns 2: 'b'

  var key, tmp_ar = {}

  // Duck-type check for our own array()-created LOCUTUS_Array
  if (trans && typeof trans === 'object' && trans.change_key_case) {
    return trans.flip()
  }

  for (key in trans) {
    if (!trans.hasOwnProperty(key)) {
      continue
    }
    tmp_ar[trans[key]] = key
  }

  return tmp_ar
}
