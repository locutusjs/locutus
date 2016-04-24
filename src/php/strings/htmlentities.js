module.exports = function htmlentities (string, quote_style, charset, double_encode) {
  //  discuss at: http://locutusjs.io/php/htmlentities/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //  revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //  revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: nobbler
  // improved by: Jack
  // improved by: Rafał Kukawski (http://blog.kukawski.pl)
  // improved by: Dj (http://locutusjs.io/php/htmlentities:425#comment_134018)
  // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  //    input by: Ratheous
  //        note: function is compatible with PHP 5.2 and older
  //   example 1: htmlentities('Kevin & van Zonneveld')
  //   returns 1: 'Kevin &amp; van Zonneveld'
  //   example 2: htmlentities("foo'bar","ENT_QUOTES")
  //   returns 2: 'foo&#039;bar'

  var get_html_translation_table = require('../strings/get_html_translation_table')
  var hash_map = get_html_translation_table('HTML_ENTITIES', quote_style)

  string = string === null ? '' : string + ''

  if (!hash_map) {
    return false
  }

  if (quote_style && quote_style === 'ENT_QUOTES') {
    hash_map["'"] = '&#039;'
  }

  double_encode = double_encode === null || !!double_encode

  var regex = new RegExp('&(?:#\\d+|#x[\\da-f]+|[a-zA-Z][\\da-z]*);|[' +
    Object.keys(hash_map)
    .join('')
    // replace regexp special chars
    .replace(/([()[\]{}\-.*+?^$|\/\\])/g, '\\$1') + ']',
    'g')

  return string.replace(regex, function (ent) {
    if (ent.length > 1) {
      return double_encode ? hash_map['&'] + ent.substr(1) : ent
    }

    return hash_map[ent]
  })
}
