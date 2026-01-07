module.exports = function Contains(s, substr) {
  //      discuss at: https://locutus.io/golang/strings/Contains
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: Contains('Kevin', 'K')
  //       returns 1: true

  return (s + '').indexOf(substr) !== -1
}
