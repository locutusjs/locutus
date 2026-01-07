module.exports = function printable() {
  //  discuss at: https://locutus.io/python/printable/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Combination of digits, ascii_letters, punctuation, and whitespace
  //   example 1: printable().length
  //   returns 1: 100

  const digits = '0123456789'
  const asciiLowercase = 'abcdefghijklmnopqrstuvwxyz'
  const asciiUppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const punctuation = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'
  const whitespace = ' \t\n\r\x0b\x0c'

  return digits + asciiLowercase + asciiUppercase + punctuation + whitespace
}
