module.exports = function IndexAny(s, chars) {
  //      discuss at: https://locutus.io/golang/strings/IndexAny/
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: IndexAny('chicken', 'aeiouy')
  //       returns 1: 2
  //       example 2: IndexAny('crwth', 'aeiouy')
  //       returns 2: -1

  let minIndex = -1
  for (const char of chars) {
    const idx = s.indexOf(char)
    if (idx !== -1 && (minIndex === -1 || idx < minIndex)) {
      minIndex = idx
    }
  }
  return minIndex
}
