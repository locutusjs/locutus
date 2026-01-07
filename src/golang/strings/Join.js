module.exports = function Join(elems, sep) {
  //  discuss at: https://locutus.io/golang/strings/Join
  //    verified: 1.23
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Concatenates elements of an array to create a single string
  //   example 1: Join(['foo', 'bar', 'baz'], ', ')
  //   returns 1: 'foo, bar, baz'
  //   example 2: Join(['a', 'b', 'c'], '')
  //   returns 2: 'abc'

  if (!Array.isArray(elems)) {
    return ''
  }

  return elems.join(sep + '')
}
