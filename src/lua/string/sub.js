module.exports = function sub(s, i, j) {
  //      discuss at: https://locutus.io/lua/sub/
  // parity verified: Lua 5.4
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Lua uses 1-based indexing, negative indices count from end
  //       example 1: sub('Hello', 1, 3)
  //       returns 1: 'Hel'
  //       example 2: sub('Hello', 2)
  //       returns 2: 'ello'
  //       example 3: sub('Hello', -2)
  //       returns 3: 'lo'

  s = String(s)
  const len = s.length

  // Convert Lua 1-based index to JS 0-based
  // Negative indices count from end in Lua
  let start = i < 0 ? len + i : i - 1
  let end = j === undefined ? len : j < 0 ? len + j + 1 : j

  // Clamp to valid range
  if (start < 0) {
    start = 0
  }
  if (end > len) {
    end = len
  }
  if (start >= end) {
    return ''
  }

  return s.substring(start, end)
}
