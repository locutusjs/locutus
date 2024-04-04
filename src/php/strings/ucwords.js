module.exports = function ucwords(str) {
  //  discuss at: https://locutus.io/php/ucwords/
  // original by: Jonas Raoni Soares Silva (https://www.jsfromhell.com)
  // improved by: Waldo Malqui Silva (https://waldo.malqui.info)
  // improved by: Robin
  // improved by: Kevin van Zonneveld (https://kvz.io)
  // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  // bugfixed by: Cetvertacov Alexandr (https://github.com/cetver)
  //    input by: James (https://www.james-bell.co.uk/)
  //   example 1: ucwords('kevin van  zonneveld')
  //   returns 1: 'Kevin Van  Zonneveld'
  //   example 2: ucwords('HELLO WORLD')
  //   returns 2: 'HELLO WORLD'
  //   example 3: ucwords('у мэри был маленький ягненок и она его очень любила')
  //   returns 3: 'У Мэри Был Маленький Ягненок И Она Его Очень Любила'
  //   example 4: ucwords('τάχιστη αλώπηξ βαφής ψημένη γη, δρασκελίζει υπέρ νωθρού κυνός')
  //   returns 4: 'Τάχιστη Αλώπηξ Βαφής Ψημένη Γη, Δρασκελίζει Υπέρ Νωθρού Κυνός'

  return (str + '').replace(/^(.)|\s+(.)/g, function ($1) {
    return $1.toUpperCase()
  })
}
