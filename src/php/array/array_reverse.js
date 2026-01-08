module.exports = function array_reverse(array, preserveKeys) {
  //  discuss at: https://locutus.io/php/array_reverse/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Karol Kowalski
  //   example 1: array_reverse( [ 'php', '4.0', ['green', 'red'] ], true)
  //   returns 1: { 2: ['green', 'red'], 1: '4.0', 0: 'php'}

  const isArray = Array.isArray(array)
  const tmpArr = preserveKeys ? {} : []
  let key

  if (isArray && !preserveKeys) {
    return array.slice(0).reverse()
  }

  if (preserveKeys) {
    const keys = []
    for (key in array) {
      keys.push(key)
    }

    let i = keys.length
    while (i--) {
      key = keys[i]
      // @todo: don't rely on browsers keeping keys in insertion order
      // it's implementation specific
      // eg. the result will differ from expected in Google Chrome
      tmpArr[key] = array[key]
    }
  } else {
    for (key in array) {
      tmpArr.unshift(array[key])
    }
  }

  return tmpArr
}
