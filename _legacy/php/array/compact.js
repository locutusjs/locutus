module.exports = function compact () {
  //  discuss at: https://locutus.io/php/compact/
  // original by: Waldo Malqui Silva (https://waldo.malqui.info)
  // improved by: Jack
  //    input by: Brett Zamir (https://brett-zamir.me)
  // bugfixed by: Kevin van Zonneveld (https://kvz.io)
  //   example 1: var $var1 = 'Kevin'
  //   example 1: var $var2 = 'van'
  //   example 1: var $var3 = 'Zonneveld'
  //   example 1: compact('$var1', '$var2', '$var3')
  //   returns 1: {'$var1': 'Kevin', '$var2': 'van', '$var3': 'Zonneveld'}

  var $global = (typeof window !== 'undefined' ? window : global)
  var matrix = {}

  var _process = function (value) {
    var i = 0
    var l = value.length
    var keyVal = ''
    for (i = 0; i < l; i++) {
      keyVal = value[i]
      if (Object.prototype.toString.call(keyVal) === '[object Array]') {
        _process(keyVal)
      } else {
        if (typeof $global[keyVal] !== 'undefined') {
          matrix[keyVal] = $global[keyVal]
        }
      }
    }
    return true
  }

  _process(arguments)
  return matrix
}
