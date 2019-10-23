module.exports = function pow (base, exp) {
  //  discuss at: https://locutus.io/php/pow/
  // original by: Onno Marsman (https://twitter.com/onnomarsman)
  // improved by: Waldo Malqui Silva (https://fayr.us/waldo/)
  //   example 1: pow(8723321.4, 7)
  //   returns 1: 3.8439091680779e+48

  return Number(Math.pow(base, exp).toPrecision(15))
}
