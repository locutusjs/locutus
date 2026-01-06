module.exports = function strcat(dest, src) {
  //  discuss at: https://locutus.io/c/string/strcat/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Appends src string to dest string.
  //      note 1: In C this modifies dest, but JS strings are immutable so we return a new string.
  //   example 1: strcat('Hello, ', 'World!')
  //   returns 1: 'Hello, World!'
  //   example 2: strcat('abc', 'def')
  //   returns 2: 'abcdef'

  return (dest + '') + (src + '')
}
