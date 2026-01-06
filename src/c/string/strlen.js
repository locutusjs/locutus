module.exports = function strlen(str) {
  //  discuss at: https://locutus.io/c/string/strlen/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Returns the length of the string.
  //   example 1: strlen('hello')
  //   returns 1: 5
  //   example 2: strlen('')
  //   returns 2: 0

  return (str + '').length
}
