module.exports = function fmod (x, y) {
  //  discuss at: https://locutus.io/php/fmod/
  // original by: Onno Marsman (https://twitter.com/onnomarsman)
  //    input by: Brett Zamir (https://brett-zamir.me)
  // bugfixed by: Kevin van Zonneveld (https://kvz.io)
  // reimplemented by: Ollie Chick (https://olliechick.co.nz)
  //   example 1: fmod(5.7, 1.3)
  //   returns 1: 0.5

  return x % y
}
