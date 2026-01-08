module.exports = function EqualFold(s, t) {
  //      discuss at: https://locutus.io/golang/strings/EqualFold/
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: EqualFold('Go', 'go')
  //       returns 1: true
  //       example 2: EqualFold('Hello', 'HELLO')
  //       returns 2: true
  //       example 3: EqualFold('Σ', 'σ')
  //       returns 3: true

  return s.toLowerCase() === t.toLowerCase()
}
