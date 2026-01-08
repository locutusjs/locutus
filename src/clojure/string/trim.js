module.exports = function trim(s) {
  //      discuss at: https://locutus.io/clojure/trim/
  // parity verified: Clojure 1.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: trim('  hello  ')
  //       returns 1: 'hello'
  //       example 2: trim('abc')
  //       returns 2: 'abc'

  return String(s).trim()
}
