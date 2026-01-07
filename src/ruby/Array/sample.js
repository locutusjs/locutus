module.exports = function sample(arr, n) {
  //  discuss at: https://locutus.io/ruby/Array/sample/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Returns a random element, or n random elements, from the array.
  //      note 1: Uses Math.random() for randomness.
  //   example 1: [1, 2, 3].indexOf(sample([1, 2, 3])) !== -1
  //   returns 1: true
  //   example 2: sample([1, 2, 3], 2).length
  //   returns 2: 2

  if (!Array.isArray(arr) || arr.length === 0) {
    return n === undefined ? undefined : []
  }

  if (n === undefined) {
    return arr[Math.floor(Math.random() * arr.length)]
  }

  // Fisher-Yates shuffle for selecting n unique elements
  const copy = arr.slice()
  const result = []
  const count = Math.min(n, copy.length)

  for (let i = 0; i < count; i++) {
    const idx = Math.floor(Math.random() * copy.length)
    result.push(copy[idx])
    copy.splice(idx, 1)
  }

  return result
}
