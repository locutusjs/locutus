module.exports = function reverse(str) {
  //      discuss at: https://locutus.io/perl/reverse/
  // parity verified: Perl 5.40
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: In scalar context, reverses string characters
  //       example 1: reverse('hello')
  //       returns 1: 'olleh'
  //       example 2: reverse('abc')
  //       returns 2: 'cba'

  return String(str).split('').reverse().join('')
}
