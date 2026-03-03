export function printable(): '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~ \t\n\r\x0b\x0c' {
  //  discuss at: https://locutus.io/python/printable/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Combination of digits, ascii_letters, punctuation, and whitespace
  //   example 1: printable().length
  //   returns 1: 100

  return '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~ \t\n\r\x0b\x0c'
}
