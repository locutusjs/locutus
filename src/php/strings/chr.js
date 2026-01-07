module.exports = function chr(codePt) {
  //  discuss at: https://locutus.io/php/chr/
  //    verified: 8.3
  // original by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Brett Zamir (https://brett-zamir.me)
  //      note 1: Unlike PHP (which wraps at 256), this implementation
  //      note 1: supports Unicode code points beyond 255 using surrogates
  //   example 1: chr(75) === 'K'
  //   returns 1: true

  if (codePt > 0xffff) {
    // Create a four-byte string (length 2) since this code point is high
    //   enough for the UTF-16 encoding (JavaScript internal use), to
    //   require representation with two surrogates (reserved non-characters
    //   used for building other characters; the first is "high" and the next "low")
    codePt -= 0x10000
    return String.fromCharCode(0xd800 + (codePt >> 10), 0xdc00 + (codePt & 0x3ff))
  }
  return String.fromCharCode(codePt)
}
