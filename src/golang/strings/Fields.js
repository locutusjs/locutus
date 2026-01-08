module.exports = function Fields(s) {
  //      discuss at: https://locutus.io/golang/strings/Fields/
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: Fields('  foo bar  baz   ')
  //       returns 1: ['foo', 'bar', 'baz']
  //       example 2: Fields('')
  //       returns 2: []

  // Split by whitespace and filter empty strings
  return s.split(/\s+/).filter((field) => field !== '')
}
