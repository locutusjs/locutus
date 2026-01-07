module.exports = function ord(string) {
  //  discuss at: https://locutus.io/php/ord/
  //    verified: 8.3
  // original by: Kevin van Zonneveld (https://kvz.io)
  // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  // improved by: Brett Zamir (https://brett-zamir.me)
  //    input by: incidence
  //      note 1: Unlike PHP (which returns 0-255), this implementation
  //      note 1: supports Unicode code points via surrogate pairs
  //   example 1: ord('K')
  //   returns 1: 75

  const str = string + ''
  const code = str.charCodeAt(0)

  if (code >= 0xd800 && code <= 0xdbff) {
    // High surrogate (could change last hex to 0xDB7F to treat
    // high private surrogates as single characters)
    const hi = code
    if (str.length === 1) {
      // This is just a high surrogate with no following low surrogate,
      // so we return its value;
      return code
      // we could also throw an error as it is not a complete character,
      // but someone may want to know
    }
    const low = str.charCodeAt(1)
    return (hi - 0xd800) * 0x400 + (low - 0xdc00) + 0x10000
  }
  if (code >= 0xdc00 && code <= 0xdfff) {
    // Low surrogate
    // This is just a low surrogate with no preceding high surrogate,
    // so we return its value;
    return code
    // we could also throw an error as it is not a complete character,
    // but someone may want to know
  }

  return code
}
