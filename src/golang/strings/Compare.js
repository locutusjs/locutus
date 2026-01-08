module.exports = function Compare(a, b) {
  //      discuss at: https://locutus.io/golang/strings/Compare/
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: Compare('a', 'b')
  //       returns 1: -1
  //       example 2: Compare('a', 'a')
  //       returns 2: 0
  //       example 3: Compare('b', 'a')
  //       returns 3: 1

  if (a < b) {
    return -1
  }
  if (a > b) {
    return 1
  }
  return 0
}
