export function decbin(number: string | number): string {
  //      discuss at: https://locutus.io/php/decbin/
  // parity verified: PHP 8.3
  //     original by: Enrique Gonzalez
  //     bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  //     improved by: https://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript
  //        input by: pilus
  //        input by: nord_ua
  //       example 1: decbin(12)
  //       returns 1: '1100'
  //       example 2: decbin(26)
  //       returns 2: '11010'
  //       example 3: decbin('26')
  //       returns 3: '11010'

  let normalized = parseInt(String(number), 10)
  if (normalized < 0) {
    normalized = 0xffffffff + normalized + 1
  }
  return normalized.toString(2)
}
