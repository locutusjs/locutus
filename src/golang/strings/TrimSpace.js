module.exports = function TrimSpace(s) {
  //      discuss at: https://locutus.io/golang/strings/TrimSpace
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Removes leading and trailing white space (as defined by Unicode)
  //       example 1: TrimSpace(' \t\n Hello, Gophers \n\t\r\n')
  //       returns 1: 'Hello, Gophers'

  return (s + '').trim()
}
