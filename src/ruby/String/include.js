module.exports = function include(str, other) {
  //  discuss at: https://locutus.io/ruby/String/include/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Returns true if str contains the given string other.
  //   example 1: include('hello', 'lo')
  //   returns 1: true
  //   example 2: include('hello', 'ol')
  //   returns 2: false

  return (str + '').indexOf(other + '') !== -1
}
