module.exports = function first(arr, n) {
  // parity verified: Ruby 3.3
  //      discuss at: https://locutus.io/ruby/Array/first/
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns the first element, or the first n elements, of the array.
  //       example 1: first(['a', 'b', 'c'])
  //       returns 1: 'a'
  //       example 2: first(['a', 'b', 'c'], 2)
  //       returns 2: ['a', 'b']
  //       example 3: first([])
  //       returns 3: undefined

  if (!Array.isArray(arr)) {
    return undefined
  }

  if (n === undefined) {
    return arr[0]
  }

  return arr.slice(0, n)
}
