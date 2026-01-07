module.exports = function pos(arr) {
  //      discuss at: https://locutus.io/php/pos/
  // parity verified: PHP 8.3
  //     original by: Brett Zamir (https://brett-zamir.me)
  //          note 1: Uses global: locutus to store the array pointer
  //       example 1: var $transport = ['foot', 'bike', 'car', 'plane']
  //       example 1: pos($transport)
  //       returns 1: 'foot'

  const current = require('../array/current')
  return current(arr)
}
