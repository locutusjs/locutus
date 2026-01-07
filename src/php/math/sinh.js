module.exports = function sinh(arg) {
  //      discuss at: https://locutus.io/php/sinh/
  // parity verified: PHP 8.3
  //     original by: Onno Marsman (https://twitter.com/onnomarsman)
  //       example 1: sinh(-0.9834330348825909)
  //       returns 1: -1.1497971402636502

  return (Math.exp(arg) - Math.exp(-arg)) / 2
}
