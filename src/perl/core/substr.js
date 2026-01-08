module.exports = function substr(str, offset, length) {
  //      discuss at: https://locutus.io/perl/substr/
  // parity verified: Perl 5.40
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Perl's offset is 0-based, negative counts from end
  //       example 1: substr('hello', 0, 3)
  //       returns 1: 'hel'
  //       example 2: substr('hello', 1)
  //       returns 2: 'ello'
  //       example 3: substr('hello', -2)
  //       returns 3: 'lo'

  str = String(str)
  const len = str.length

  // Handle negative offset (count from end)
  let start = offset < 0 ? len + offset : offset

  // Clamp start to valid range
  if (start < 0) {
    start = 0
  }
  if (start > len) {
    return ''
  }

  // If length is undefined, return rest of string
  if (length === undefined) {
    return str.substring(start)
  }

  // Handle negative length (leave that many chars at end)
  let end
  if (length < 0) {
    end = len + length
    if (end < start) {
      return ''
    }
  } else {
    end = start + length
  }

  return str.substring(start, end)
}
