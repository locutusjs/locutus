module.exports = function stripslashes (str) {
  //       discuss at: https://locutus.io/php/stripslashes/
  //      original by: Kevin van Zonneveld (https://kvz.io)
  //      improved by: Ates Goral (https://magnetiq.com)
  //      improved by: marrtins
  //      improved by: rezna
  //         fixed by: Mick@el
  //      bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  //      bugfixed by: Brett Zamir (https://brett-zamir.me)
  //         input by: Rick Waldron
  //         input by: Brant Messenger (https://www.brantmessenger.com/)
  // reimplemented by: Brett Zamir (https://brett-zamir.me)
  //        example 1: stripslashes('Kevin\'s code')
  //        returns 1: "Kevin's code"
  //        example 2: stripslashes('Kevin\\\'s code')
  //        returns 2: "Kevin\'s code"

  return (str + '')
    .replace(/\\(.?)/g, function (s, n1) {
      switch (n1) {
        case '\\':
          return '\\'
        case '0':
          return '\u0000'
        case '':
          return ''
        default:
          return n1
      }
    })
}
