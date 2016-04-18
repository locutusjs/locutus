module.exports = function asin (arg) {
  //  discuss at: http://locutusjs.org/php/asin/
  // original by: Onno Marsman
  //        note: Sorry about the crippled test. Needed because precision differs accross platforms.
  //   example 1: (asin(0.3) + '').substr(0, 17);
  //   returns 1: "0.304692654015397"

  return Math.asin(arg)
}
