module.exports = function TrimPrefix(s, prefix) {
  //      discuss at: https://locutus.io/golang/strings/TrimPrefix/
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: TrimPrefix('Hello, World!', 'Hello, ')
  //       returns 1: 'World!'
  //       example 2: TrimPrefix('Hello, World!', 'Goodbye, ')
  //       returns 2: 'Hello, World!'

  if (s.startsWith(prefix)) {
    return s.slice(prefix.length)
  }
  return s
}
