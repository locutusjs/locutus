export function strtolower(str?: string): string {
  //      discuss at: https://locutus.io/php/strtolower/
  // parity verified: PHP 8.3
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //     improved by: Onno Marsman (https://twitter.com/onnomarsman)
  //       example 1: strtolower('Kevin van Zonneveld')
  //       returns 1: 'kevin van zonneveld'

  if (typeof str === 'undefined') {
    throw new Error('strtolower() expects exactly 1 argument, 0 given')
  }

  return (str + '').toLowerCase()
}
