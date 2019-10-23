module.exports = function preg_quote (str, delimiter) { // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/preg_quote/
  // original by: booeyOH
  // improved by: Ates Goral (https://magnetiq.com)
  // improved by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Brett Zamir (https://brett-zamir.me)
  // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  //   example 1: preg_quote("$40")
  //   returns 1: '\\$40'
  //   example 2: preg_quote("*RRRING* Hello?")
  //   returns 2: '\\*RRRING\\* Hello\\?'
  //   example 3: preg_quote("\\.+*?[^]$(){}=!<>|:")
  //   returns 3: '\\\\\\.\\+\\*\\?\\[\\^\\]\\$\\(\\)\\{\\}\\=\\!\\<\\>\\|\\:'

  return (str + '')
    .replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&')
}
