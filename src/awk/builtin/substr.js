module.exports = function substr(str, start, len) {
  //      discuss at: https://locutus.io/awk/substr/
  // parity verified: GNU AWK 5.3
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: AWK uses 1-based indexing, so start=1 is the first character
  //       example 1: substr('hello', 2, 3)
  //       returns 1: 'ell'
  //       example 2: substr('hello', 1, 2)
  //       returns 2: 'he'
  //       example 3: substr('hello', 3)
  //       returns 3: 'llo'

  if (str === undefined || str === null) {
    return ''
  }
  const s = String(str)
  // AWK uses 1-based indexing
  const startIdx = Math.max(0, start - 1)
  if (len === undefined) {
    return s.substring(startIdx)
  }
  return s.substring(startIdx, startIdx + len)
}
