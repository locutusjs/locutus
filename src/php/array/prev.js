module.exports = function prev (arr) {
  //  discuss at: https://locutus.io/php/prev/
  // original by: Brett Zamir (https://brett-zamir.me)
  //      note 1: Uses global: locutus to store the array pointer
  //   example 1: var $transport = ['foot', 'bike', 'car', 'plane']
  //   example 1: prev($transport)
  //   returns 1: false

  const $global = (typeof window !== 'undefined' ? window : global)
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
  const arrpos = pointers.indexOf(arr)
  const cursor = pointers[arrpos + 1]
  if (pointers.indexOf(arr) === -1 || cursor === 0) {
    return false
  }
  if (Object.prototype.toString.call(arr) !== '[object Array]') {
    let ct = 0
    for (const k in arr) {
      if (ct === cursor - 1) {
        pointers[arrpos + 1] -= 1
        return arr[k]
      }
      ct++
    }
    // Shouldn't reach here
  }
  if (arr.length === 0) {
    return false
  }
  pointers[arrpos + 1] -= 1
  return arr[pointers[arrpos + 1]]
}
