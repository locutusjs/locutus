module.exports = function ToUpper(s) {
  //  discuss at: https://locutus.io/golang/strings/ToUpper
  //    verified: 1.23
  // original by: Kevin van Zonneveld (https://kvz.io)
  //   example 1: ToUpper('Gopher')
  //   returns 1: 'GOPHER'

  return (s + '').toUpperCase()
}
