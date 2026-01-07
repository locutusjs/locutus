module.exports = function downcase(str) {
  //  discuss at: https://locutus.io/ruby/String/downcase/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Returns a copy of str with all uppercase letters replaced with lowercase.
  //   example 1: downcase('hELLo')
  //   returns 1: 'hello'

  return (str + '').toLowerCase()
}
