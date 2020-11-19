module.exports = function isset () {
  //  discuss at: https://locutus.io/php/isset/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // improved by: FremyCompany
  // improved by: Onno Marsman (https://twitter.com/onnomarsman)
  // improved by: Rafał Kukawski (https://blog.kukawski.pl)
  //   example 1: isset( undefined, true)
  //   returns 1: false
  //   example 2: isset( 'Kevin van Zonneveld' )
  //   returns 2: true

  const a = arguments
  const l = a.length
  let i = 0
  let undef

  if (l === 0) {
    throw new Error('Empty isset')
  }

  while (i !== l) {
    if (a[i] === undef || a[i] === null) {
      return false
    }
    i++
  }

  return true
}
