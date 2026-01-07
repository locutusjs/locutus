module.exports = function Replace(s, old, newStr, n) {
  //      discuss at: https://locutus.io/golang/strings/Replace
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: n is the number of replacements. If n < 0, no limit on replacements.
  //       example 1: Replace('oink oink oink', 'k', 'ky', 2)
  //       returns 1: 'oinky oinky oink'
  //       example 2: Replace('oink oink oink', 'oink', 'moo', -1)
  //       returns 2: 'moo moo moo'

  s = s + ''
  old = old + ''
  newStr = newStr + ''

  if (old === '') {
    return s
  }

  if (n === 0) {
    return s
  }

  if (n < 0) {
    // Replace all occurrences
    return s.split(old).join(newStr)
  }

  // Replace n occurrences
  let result = s
  let count = 0
  let pos = 0

  while (count < n) {
    const idx = result.indexOf(old, pos)
    if (idx === -1) {
      break
    }
    result = result.slice(0, idx) + newStr + result.slice(idx + old.length)
    pos = idx + newStr.length
    count++
  }

  return result
}
