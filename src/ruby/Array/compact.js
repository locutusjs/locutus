module.exports = function compact(arr) {
  //  discuss at: https://locutus.io/ruby/Array/compact/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Returns a new array with all nil (null/undefined) values removed.
  //   example 1: compact(['a', null, 'b', undefined, 'c'])
  //   returns 1: ['a', 'b', 'c']
  //   example 2: compact([1, 2, 3])
  //   returns 2: [1, 2, 3]

  if (!Array.isArray(arr)) {
    return []
  }

  return arr.filter(function (item) {
    return item != null
  })
}
