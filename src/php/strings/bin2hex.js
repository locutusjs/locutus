module.exports = function bin2hex(s) {
  //  discuss at: https://locutus.io/php/bin2hex/
  //   verified: 8.3
  // original by: Kevin van Zonneveld (https://kvz.io)
  // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  // bugfixed by: Linuxworld
  // improved by: ntoniazzi (https://locutus.io/php/bin2hex:361#comment_177616)
  //   example 1: bin2hex('Kev')
  //   returns 1: '4b6576'
  //   example 2: bin2hex(String.fromCharCode(0x00))
  //   returns 2: '00'
  //   example 3: bin2hex("æ")
  //   returns 3: 'c3a6'

  const encoder = new TextEncoder()
  const bytes = encoder.encode(s)
  let hex = ''
  for (const byte of bytes) {
    hex += byte.toString(16).padStart(2, '0')
  }
  return hex
}
