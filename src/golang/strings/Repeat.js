module.exports = function Repeat(s, count) {
  //  discuss at: https://locutus.io/golang/strings/Repeat
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Returns a new string consisting of count copies of s
  //   example 1: Repeat('na', 2)
  //   returns 1: 'nana'
  //   example 2: Repeat('ba', 3)
  //   returns 2: 'bababa'

  s = s + ''
  count = parseInt(count, 10)

  if (count < 0 || !isFinite(count)) {
    throw new Error('strings: negative Repeat count')
  }

  return s.repeat(count)
}
