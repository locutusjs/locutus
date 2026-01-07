module.exports = function last(arr, n) {
  // parity verified: Ruby 3.3
  //      discuss at: https://locutus.io/ruby/Array/last/
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns the last element, or the last n elements, of the array.
  //       example 1: last(['a', 'b', 'c'])
  //       returns 1: 'c'
  //       example 2: last(['a', 'b', 'c'], 2)
  //       returns 2: ['b', 'c']
  //       example 3: last([])
  //       returns 3: undefined

  if (!Array.isArray(arr)) {
    return undefined
  }

  if (n === undefined) {
    return arr[arr.length - 1]
  }

  return arr.slice(-n)
}
