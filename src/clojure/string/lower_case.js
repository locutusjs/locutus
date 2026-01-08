module.exports = function lower_case(s) {
  //      discuss at: https://locutus.io/clojure/lower_case/
  // parity verified: Clojure 1.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Clojure uses lower-case, JS uses lower_case
  //       example 1: lower_case('HELLO')
  //       returns 1: 'hello'
  //       example 2: lower_case('Hello World')
  //       returns 2: 'hello world'

  return String(s).toLowerCase()
}
