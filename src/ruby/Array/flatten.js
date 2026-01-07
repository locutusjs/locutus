module.exports = function flatten(arr, depth) {
  // parity verified: Ruby 3.3
  //      discuss at: https://locutus.io/ruby/Array/flatten/
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns a new array that is a one-dimensional flattening of the array.
  //       example 1: flatten([1, [2, 3, [4, 5]]])
  //       returns 1: [1, 2, 3, 4, 5]
  //       example 2: flatten([1, [2, [3, [4]]]], 1)
  //       returns 2: [1, 2, [3, [4]]]
  //       example 3: flatten([[1, 2], [3, 4]])
  //       returns 3: [1, 2, 3, 4]

  if (!Array.isArray(arr)) {
    return []
  }

  if (depth === undefined) {
    depth = Infinity
  }

  return arr.flat(depth)
}
