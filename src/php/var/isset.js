module.exports = function isset () {
  //  discuss at: http://locutus.io/php/isset/
  // original by: Kevin van Zonneveld (http://kvz.io)
  // improved by: FremyCompany
  // improved by: Onno Marsman (https://twitter.com/onnomarsman)
  // improved by: Rafał Kukawski (http://blog.kukawski.pl)
  // improved by: Fred Trotter (http://fredtrotter.com)
  //   example 1: isset( undefined, true)
  //   returns 1: false
  //   example 2: isset( 'Kevin van Zonneveld' )
  //   returns 2: true
  //   example 3: isset( '' )
  //   returns 3: false

  var a = arguments
  var l = a.length
  var i = 0
  var undef

  if (l === 0) {
    throw new Error('Empty isset')
  }

  while (i !== l) {
    if (a[i] === undef || a[i] === null || a[i] === '') {
      return false
    }
    i++
  }

  return true
}
