module.exports = function Index(s, substr) {
  //      discuss at: https://locutus.io/golang/strings/Index/
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: Index('chicken', 'ken')
  //       returns 1: 4
  //       example 2: Index('chicken', 'dmr')
  //       returns 2: -1

  return s.indexOf(substr)
}
