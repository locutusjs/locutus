module.exports = function Contains (s, substr) {
  //  discuss at: http://locutus.io/golang/strings/Contains
  // original by: Kevin van Zonneveld (http://kvz.io)
  //   example 1: Contains('Kevin', 'K')
  //   returns 1: true

  return (String(s)).indexOf(substr) !== -1
}
