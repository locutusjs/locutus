module.exports = function TrimSuffix(s, suffix) {
  //      discuss at: https://locutus.io/golang/strings/TrimSuffix/
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: TrimSuffix('Hello, World!', ', World!')
  //       returns 1: 'Hello'
  //       example 2: TrimSuffix('Hello, World!', 'Goodbye')
  //       returns 2: 'Hello, World!'

  if (s.endsWith(suffix)) {
    return s.slice(0, s.length - suffix.length)
  }
  return s
}
