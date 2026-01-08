module.exports = function TrimLeft(s, cutset) {
  //      discuss at: https://locutus.io/golang/strings/TrimLeft/
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: TrimLeft('¡¡¡Hello, Gophers!!!', '!¡')
  //       returns 1: 'Hello, Gophers!!!'
  //       example 2: TrimLeft('  hello  ', ' ')
  //       returns 2: 'hello  '

  let start = 0
  while (start < s.length && cutset.includes(s[start])) {
    start++
  }
  return s.slice(start)
}
