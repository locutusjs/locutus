module.exports = function uniq(arr) {
  //  discuss at: https://locutus.io/ruby/Array/uniq/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Returns a new array with duplicate values removed.
  //   example 1: uniq([1, 2, 2, 3, 3, 3])
  //   returns 1: [1, 2, 3]
  //   example 2: uniq(['a', 'b', 'a', 'c', 'b'])
  //   returns 2: ['a', 'b', 'c']

  if (!Array.isArray(arr)) {
    return []
  }

  return [...new Set(arr)]
}
