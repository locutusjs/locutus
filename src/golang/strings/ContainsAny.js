module.exports = function ContainsAny(s, chars) {
  //      discuss at: https://locutus.io/golang/strings/ContainsAny/
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: ContainsAny('team', 'i')
  //       returns 1: false
  //       example 2: ContainsAny('fail', 'ui')
  //       returns 2: true
  //       example 3: ContainsAny('ure', 'ui')
  //       returns 3: true

  for (const char of chars) {
    if (s.includes(char)) {
      return true
    }
  }
  return false
}
