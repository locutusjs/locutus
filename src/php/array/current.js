module.exports = function current(arr) {
  //  discuss at: https://locutus.io/php/current/
  //   verified: 8.3
  // original by: Brett Zamir (https://brett-zamir.me)
  //      note 1: Uses global: locutus to store the array pointer
  //   example 1: var $transport = ['foot', 'bike', 'car', 'plane']
  //   example 1: current($transport)
  //   returns 1: 'foot'

  const $global = typeof window !== 'undefined' ? window : global
  $global.$locutus = $global.$locutus || {}
  const $locutus = $global.$locutus
  $locutus.php = $locutus.php || {}
  $locutus.php.pointers = $locutus.php.pointers || []
  const pointers = $locutus.php.pointers

  const indexOf = function (value) {
    for (let i = 0, length = this.length; i < length; i++) {
      if (this[i] === value) {
        return i
      }
    }
    return -1
  }
  if (!pointers.indexOf) {
    pointers.indexOf = indexOf
  }
  if (pointers.indexOf(arr) === -1) {
    pointers.push(arr, 0)
  }
  const arrpos = pointers.indexOf(arr)
  const cursor = pointers[arrpos + 1]
  if (Object.prototype.toString.call(arr) === '[object Array]') {
    return arr[cursor] || false
  }
  let ct = 0
  for (const k in arr) {
    if (ct === cursor) {
      return arr[k]
    }
    ct++
  }
  // Empty
  return false
}
