module.exports = function ToLower(s) {
  //      discuss at: https://locutus.io/golang/strings/ToLower
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: ToLower('Gopher')
  //       returns 1: 'gopher'

  return (s + '').toLowerCase()
}
