module.exports = function LastIndexAny(s, chars) {
  //      discuss at: https://locutus.io/golang/strings/LastIndexAny/
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: LastIndexAny('go gopher', 'go')
  //       returns 1: 4
  //       example 2: LastIndexAny('go gopher', 'rodent')
  //       returns 2: 8

  let maxIndex = -1
  for (const char of chars) {
    const idx = s.lastIndexOf(char)
    if (idx > maxIndex) {
      maxIndex = idx
    }
  }
  return maxIndex
}
