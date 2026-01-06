module.exports = function start_with(str, prefix) {
  //  discuss at: https://locutus.io/ruby/String/start_with/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Returns true if str starts with one of the prefixes given.
  //   example 1: start_with('hello', 'hell')
  //   returns 1: true
  //   example 2: start_with('hello', 'heaven')
  //   returns 2: false

  str = str + ''
  prefix = prefix + ''
  return str.slice(0, prefix.length) === prefix
}
