module.exports = function end_with(str, suffix) {
  // parity verified: Ruby 3.3
  //      discuss at: https://locutus.io/ruby/String/end_with/
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns true if str ends with one of the suffixes given.
  //       example 1: end_with('hello', 'ello')
  //       returns 1: true
  //       example 2: end_with('hello', 'heaven')
  //       returns 2: false

  str = str + ''
  suffix = suffix + ''
  if (suffix.length === 0) {
    return true
  }
  return str.slice(-suffix.length) === suffix
}
