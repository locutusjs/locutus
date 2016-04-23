module.exports = function pos (arr) {
  //  discuss at: http://locutusjs.io/php/pos/
  // original by: Brett Zamir (http://brett-zamir.me)
  //        note: Uses global: locutus to store the array pointer
  //   example 1: transport = ['foot', 'bike', 'car', 'plane'];
  //   example 1: pos(transport);
  //   returns 1: 'foot'

  var current = require('../array/current')
  return current(arr)
}
