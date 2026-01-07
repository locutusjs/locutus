module.exports = function implode(glue, pieces) {
  //      discuss at: https://locutus.io/php/implode/
  // parity verified: PHP 8.3
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //     improved by: Waldo Malqui Silva (https://waldo.malqui.info)
  //     improved by: Itsacon (https://www.itsacon.net/)
  //     bugfixed by: Brett Zamir (https://brett-zamir.me)
  //       example 1: implode(' ', ['Kevin', 'van', 'Zonneveld'])
  //       returns 1: 'Kevin van Zonneveld'
  //       example 2: implode(' ', {first:'Kevin', last: 'van Zonneveld'})
  //       returns 2: 'Kevin van Zonneveld'

  let i = ''
  let retVal = ''
  let tGlue = ''

  if (arguments.length === 1) {
    pieces = glue
    glue = ''
  }

  if (typeof pieces === 'object') {
    if (Object.prototype.toString.call(pieces) === '[object Array]') {
      return pieces.join(glue)
    }
    for (i in pieces) {
      retVal += tGlue + pieces[i]
      tGlue = glue
    }
    return retVal
  }

  return pieces
}
