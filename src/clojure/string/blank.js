module.exports = function blank(s) {
  //      discuss at: https://locutus.io/clojure/blank/
  // parity verified: Clojure 1.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Clojure uses blank?, JS uses blank
  //       example 1: blank('')
  //       returns 1: true
  //       example 2: blank('  ')
  //       returns 2: true
  //       example 3: blank('hello')
  //       returns 3: false

  if (s === null || s === undefined) {
    return true
  }
  return String(s).trim().length === 0
}
