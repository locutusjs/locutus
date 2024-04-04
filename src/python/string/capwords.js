module.exports = function capwords(str) {
  //  discuss at: https://locutus.io/python/capwords/
  // original by: Jonas Raoni Soares Silva (https://www.jsfromhell.com)
  // improved by: Waldo Malqui Silva (https://waldo.malqui.info)
  // improved by: Robin
  // improved by: Kevin van Zonneveld (https://kvz.io)
  // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  //    input by: James (https://www.james-bell.co.uk/)
  //   example 1: capwords('kevin van  zonneveld')
  //   returns 1: 'Kevin Van  Zonneveld'
  //   example 2: capwords('HELLO WORLD')
  //   returns 2: 'HELLO WORLD'

  const pattern = /^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g
  return (str + '').replace(pattern, function ($1) {
    return $1.toUpperCase()
  })
}
