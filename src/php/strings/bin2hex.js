module.exports = function bin2hex (s) {
  //  discuss at: https://locutus.io/php/bin2hex/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  // bugfixed by: Linuxworld
  // improved by: ntoniazzi (https://locutus.io/php/bin2hex:361#comment_177616)
  //   example 1: bin2hex('Kev')
  //   returns 1: '4b6576'
  //   example 2: bin2hex(String.fromCharCode(0x00))
  //   returns 2: '00'

  let i
  let l
  let o = ''
  let n

  s += ''

  for (i = 0, l = s.length; i < l; i++) {
    n = s.charCodeAt(i)
      .toString(16)
    o += n.length < 2 ? '0' + n : n
  }

  return o
}
