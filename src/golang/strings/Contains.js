module.exports = function Contains (s, substr) {
  //  discuss at: http://locutusjs.io/golang/strings/Contains
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //   example 1: Contains('Kevin', 'K')
  //   returns 1: true

  return (s + '').indexOf(substr) !== -1
}
