module.exports = function upper_case(s) {
  //      discuss at: https://locutus.io/clojure/upper_case/
  // parity verified: Clojure 1.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Clojure uses upper-case, JS uses upper_case
  //       example 1: upper_case('hello')
  //       returns 1: 'HELLO'
  //       example 2: upper_case('Hello World')
  //       returns 2: 'HELLO WORLD'

  return String(s).toUpperCase()
}
