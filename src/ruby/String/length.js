module.exports = function length(str) {
  //  discuss at: https://locutus.io/ruby/String/length/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Returns the character length of str.
  //   example 1: length('hello')
  //   returns 1: 5
  //   example 2: length('')
  //   returns 2: 0

  return (str + '').length
}
