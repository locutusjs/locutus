module.exports = function setcookie (name, value, expires, path, domain, secure) {
  //  discuss at: https://locutus.io/php/setcookie/
  // original by: Jonas Raoni Soares Silva (https://www.jsfromhell.com)
  // bugfixed by: Andreas
  // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  // improved by: Kevin van Zonneveld (https://kvz.io)
  //   example 1: setcookie('author_name', 'Kevin van Zonneveld')
  //   returns 1: true

  var setrawcookie = require('../network/setrawcookie')
  return setrawcookie(name, encodeURIComponent(value), expires, path, domain, secure)
}
