module.exports = function strtr (str, from, to) {
  //  discuss at: http://locutusjs.io/php/strtr/
  // original by: Brett Zamir (http://brett-zamir.me)
  //    input by: uestla
  //    input by: Alan C
  //    input by: Taras Bogach
  //    input by: jpfle
  // bugfixed by: Kevin van Zonneveld (http://kvz.io)
  // bugfixed by: Kevin van Zonneveld (http://kvz.io)
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  //   example 1: var $trans = {'hello' : 'hi', 'hi' : 'hello'}
  //   example 1: strtr('hi all, I said hello', $trans)
  //   returns 1: 'hello all, I said hi'
  //   example 2: strtr('äaabaåccasdeöoo', 'äåö','aao')
  //   returns 2: 'aaabaaccasdeooo'
  //   example 3: strtr('ääääääää', 'ä', 'a')
  //   returns 3: 'aaaaaaaa'
  //   example 4: strtr('http', 'pthxyz','xyzpth')
  //   returns 4: 'zyyx'
  //   example 5: strtr('zyyx', 'pthxyz','xyzpth')
  //   returns 5: 'http'
  //   example 6: strtr('aa', {'a':1,'aa':2})
  //   returns 6: '2'

  var krsort = require('../array/krsort')
  var iniSet = require('../info/ini_set')

  var fr = ''
  var i = 0
  var j = 0
  var lenStr = 0
  var lenFrom = 0
  var tmpStrictForIn = false
  var fromTypeStr = ''
  var toTypeStr = ''
  var istr = ''
  var tmpFrom = []
  var tmpTo = []
  var ret = ''
  var match = false

  // Received replace_pairs?
  // Convert to normal from->to chars
  if (typeof from === 'object') {
    // Not thread-safe; temporarily set to true
    // @todo: Don't rely on ini here, use internal krsort instead
    tmpStrictForIn = iniSet('locutus.strictForIn', false)
    from = krsort(from)
    iniSet('locutus.strictForIn', tmpStrictForIn)

    for (fr in from) {
      if (from.hasOwnProperty(fr)) {
        tmpFrom.push(fr)
        tmpTo.push(from[fr])
      }
    }

    from = tmpFrom
    to = tmpTo
  }

  // Walk through subject and replace chars when needed
  lenStr = str.length
  lenFrom = from.length
  fromTypeStr = typeof from === 'string'
  toTypeStr = typeof to === 'string'

  for (i = 0; i < lenStr; i++) {
    match = false
    if (fromTypeStr) {
      istr = str.charAt(i)
      for (j = 0; j < lenFrom; j++) {
        if (istr === from.charAt(j)) {
          match = true
          break
        }
      }
    } else {
      for (j = 0; j < lenFrom; j++) {
        if (str.substr(i, from[j].length) === from[j]) {
          match = true
          // Fast forward
          i = (i + from[j].length) - 1
          break
        }
      }
    }
    if (match) {
      ret += toTypeStr ? to.charAt(j) : to[j]
    } else {
      ret += str.charAt(i)
    }
  }

  return ret
}
