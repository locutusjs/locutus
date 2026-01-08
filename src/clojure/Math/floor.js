module.exports = function floor(x) {
  //      discuss at: https://locutus.io/clojure/floor/
  // parity verified: Clojure 1.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns the largest integer <= x
  //       example 1: floor(4.7)
  //       returns 1: 4.0
  //       example 2: floor(-0.5)
  //       returns 2: -1.0
  //       example 3: floor(3)
  //       returns 3: 3.0

  return Math.floor(x)
}
