module.exports = function RuneCountInString (s, sep) {
  //  discuss at: http://locutusjs.io/golang/unicode/utf8/RuneCountInString
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //   example 1: unicode.utf8.RuneCountInString('Kevin', 'K')
  //   returns 1: 0
  //   example 2: unicode.utf8.RuneCountInString('Kevin', 'Z')
  //   returns 2: -1

  return (s + '').indexOf(sep)
}
