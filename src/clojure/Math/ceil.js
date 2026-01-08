module.exports = function ceil(x) {
  //      discuss at: https://locutus.io/clojure/ceil/
  // parity verified: Clojure 1.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns the smallest integer >= x
  //       example 1: ceil(4.2)
  //       returns 1: 5.0
  //       example 2: ceil(-0.5)
  //       returns 2: -0.0
  //       example 3: ceil(3)
  //       returns 3: 3.0

  // Clojure's Math/ceil returns a double, so we preserve that behavior
  return Math.ceil(x)
}
