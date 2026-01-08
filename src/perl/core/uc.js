module.exports = function uc(str) {
  //      discuss at: https://locutus.io/perl/uc/
  // parity verified: Perl 5.40
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: uc('hello')
  //       returns 1: 'HELLO'
  //       example 2: uc('Hello World')
  //       returns 2: 'HELLO WORLD'

  return String(str).toUpperCase()
}
