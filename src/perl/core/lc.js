module.exports = function lc(str) {
  //      discuss at: https://locutus.io/perl/lc/
  // parity verified: Perl 5.40
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: lc('HELLO')
  //       returns 1: 'hello'
  //       example 2: lc('Hello World')
  //       returns 2: 'hello world'

  return String(str).toLowerCase()
}
