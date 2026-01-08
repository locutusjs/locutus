module.exports = function length(str) {
  //      discuss at: https://locutus.io/perl/length/
  // parity verified: Perl 5.40
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: length('hello')
  //       returns 1: 5
  //       example 2: length('')
  //       returns 2: 0
  //       example 3: length('hello world')
  //       returns 3: 11

  if (str === undefined || str === null) {
    return undefined
  }
  return String(str).length
}
