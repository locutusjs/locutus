module.exports = function chomp(str, separator) {
  // parity verified: Ruby 3.3
  //      discuss at: https://locutus.io/ruby/String/chomp/
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns a new string with the given record separator removed from the end.
  //          note 1: If separator is not specified, removes trailing newlines (\n, \r, or \r\n).
  //       example 1: chomp("hello\n")
  //       returns 1: 'hello'
  //       example 2: chomp("hello\r\n")
  //       returns 2: 'hello'
  //       example 3: chomp('hello', 'llo')
  //       returns 3: 'he'

  str = str + ''

  if (separator === undefined) {
    // Default: remove trailing \r\n, \n, or \r
    return str.replace(/(\r\n|\r|\n)$/, '')
  }

  separator = separator + ''
  if (str.slice(-separator.length) === separator) {
    return str.slice(0, -separator.length)
  }

  return str
}
