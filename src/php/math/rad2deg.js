module.exports = function rad2deg(angle) {
  //      discuss at: https://locutus.io/php/rad2deg/
  // parity verified: PHP 8.3
  //     original by: Enrique Gonzalez
  //     improved by: Brett Zamir (https://brett-zamir.me)
  //       example 1: rad2deg(3.141592653589793)
  //       returns 1: 180

  return angle * 57.29577951308232 // angle / Math.PI * 180
}
