module.exports = function abs(x) {
  //      discuss at: https://locutus.io/clojure/abs/
  // parity verified: Clojure 1.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: abs(-5)
  //       returns 1: 5
  //       example 2: abs(3.14)
  //       returns 2: 3.14
  //       example 3: abs(0)
  //       returns 3: 0

  return Math.abs(x)
}
