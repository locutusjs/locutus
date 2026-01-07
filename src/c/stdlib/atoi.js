module.exports = function atoi(str) {
  //      discuss at: https://locutus.io/c/stdlib/atoi/
  // parity verified: C 23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Converts a string to an integer.
  //          note 1: Parses until first non-numeric character.
  //       example 1: atoi('42')
  //       returns 1: 42
  //       example 2: atoi('  -123abc')
  //       returns 2: -123
  //       example 3: atoi('abc')
  //       returns 3: 0

  str = (str + '').replace(/^\s+/, '')
  const result = parseInt(str, 10)
  return isNaN(result) ? 0 : result
}
