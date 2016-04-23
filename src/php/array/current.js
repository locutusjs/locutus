module.exports = function current (arr) {
  //  discuss at: http://locutusjs.io/php/current/
  // original by: Brett Zamir (http://brett-zamir.me)
  //        note: Uses global: locutus to store the array pointer
  //   example 1: transport = ['foot', 'bike', 'car', 'plane']
  //   example 1: current(transport)
  //   returns 1: 'foot'

  this.locutus = this.locutus || {}
  this.locutus.pointers = this.locutus.pointers || []
  var indexOf = function (value) {
    for (var i = 0, length = this.length; i < length; i++) {
      if (this[i] === value) {
        return i
      }
    }
    return -1
  }
  // END REDUNDANT
  var pointers = this.locutus.pointers
  if (!pointers.indexOf) {
    pointers.indexOf = indexOf
  }
  if (pointers.indexOf(arr) === -1) {
    pointers.push(arr, 0)
  }
  var arrpos = pointers.indexOf(arr)
  var cursor = pointers[arrpos + 1]
  if (Object.prototype.toString.call(arr) === '[object Array]') {
    return arr[cursor] || false
  }
  var ct = 0
  for (var k in arr) {
    if (ct === cursor) {
      return arr[k]
    }
    ct++
  }
  // Empty
  return false
}
