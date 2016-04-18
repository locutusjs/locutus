module.exports = function Index (s, sep) {
  //  discuss at: http://locutusjs.io/golang/strings/Index
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //   example 1: strings.Index('Kevin', 'K')
  //   returns 1: 0
  //   example 2: strings.Index('Kevin', 'Z')
  //   returns 2: -1

  return (s + '').indexOf(sep)
}
