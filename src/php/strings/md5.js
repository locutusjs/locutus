module.exports = function md5(str) {
  //  discuss at: https://locutus.io/php/md5/
  // original by: Webtoolkit.info (https://www.webtoolkit.info/)
  // improved by: Michael White (https://getsprink.com)
  // improved by: Jack
  // improved by: Kevin van Zonneveld (https://kvz.io)
  //    input by: Brett Zamir (https://brett-zamir.me)
  // bugfixed by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Keep in mind that in accordance with PHP, the whole string is buffered and then
  //      note 1: hashed. If available, we'd recommend using Node's native crypto modules directly
  //      note 1: in a steaming fashion for faster and more efficient hashing
  //   example 1: md5('Kevin van Zonneveld')
  //   returns 1: '6e658d4bfcb59cc13f96c14450ac40b9'

  let hash
  try {
    const crypto = require('crypto')
    const md5sum = crypto.createHash('md5')
    md5sum.update(str)
    hash = md5sum.digest('hex')
  } catch (_e) {
    hash = undefined
  }

  if (hash !== undefined) {
    return hash
  }

  const utf8Encode = require('../xml/utf8_encode')
  let xl

  const _rotateLeft = function (lValue, iShiftBits) {
    return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits))
  }

  const _addUnsigned = function (lX, lY) {
    let lX4
    let lY4
    let lX8
    let lY8
    let lResult
    lX8 = lX & 0x80000000
    lY8 = lY & 0x80000000
    lX4 = lX & 0x40000000
    lY4 = lY & 0x40000000
    lResult = (lX & 0x3fffffff) + (lY & 0x3fffffff)
    if (lX4 & lY4) {
      return lResult ^ 0x80000000 ^ lX8 ^ lY8
    }
    if (lX4 | lY4) {
      if (lResult & 0x40000000) {
        return lResult ^ 0xc0000000 ^ lX8 ^ lY8
      } else {
        return lResult ^ 0x40000000 ^ lX8 ^ lY8
      }
    } else {
      return lResult ^ lX8 ^ lY8
    }
  }

  const _F = function (x, y, z) {
    return (x & y) | (~x & z)
  }
  const _G = function (x, y, z) {
    return (x & z) | (y & ~z)
  }
  const _H = function (x, y, z) {
    return x ^ y ^ z
  }
  const _I = function (x, y, z) {
    return y ^ (x | ~z)
  }

  const _FF = function (a, b, c, d, x, s, ac) {
    a = _addUnsigned(a, _addUnsigned(_addUnsigned(_F(b, c, d), x), ac))
    return _addUnsigned(_rotateLeft(a, s), b)
  }

  const _GG = function (a, b, c, d, x, s, ac) {
    a = _addUnsigned(a, _addUnsigned(_addUnsigned(_G(b, c, d), x), ac))
    return _addUnsigned(_rotateLeft(a, s), b)
  }

  const _HH = function (a, b, c, d, x, s, ac) {
    a = _addUnsigned(a, _addUnsigned(_addUnsigned(_H(b, c, d), x), ac))
    return _addUnsigned(_rotateLeft(a, s), b)
  }

  const _II = function (a, b, c, d, x, s, ac) {
    a = _addUnsigned(a, _addUnsigned(_addUnsigned(_I(b, c, d), x), ac))
    return _addUnsigned(_rotateLeft(a, s), b)
  }

  const _convertToWordArray = function (str) {
    let lWordCount
    const lMessageLength = str.length
    const lNumberOfWordsTemp1 = lMessageLength + 8
    const lNumberOfWordsTemp2 = (lNumberOfWordsTemp1 - (lNumberOfWordsTemp1 % 64)) / 64
    const lNumberOfWords = (lNumberOfWordsTemp2 + 1) * 16
    const lWordArray = new Array(lNumberOfWords - 1)
    let lBytePosition = 0
    let lByteCount = 0
    while (lByteCount < lMessageLength) {
      lWordCount = (lByteCount - (lByteCount % 4)) / 4
      lBytePosition = (lByteCount % 4) * 8
      lWordArray[lWordCount] = lWordArray[lWordCount] | (str.charCodeAt(lByteCount) << lBytePosition)
      lByteCount++
    }
    lWordCount = (lByteCount - (lByteCount % 4)) / 4
    lBytePosition = (lByteCount % 4) * 8
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition)
    lWordArray[lNumberOfWords - 2] = lMessageLength << 3
    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29
    return lWordArray
  }

  const _wordToHex = function (lValue) {
    let wordToHexValue = ''
    let wordToHexValueTemp = ''
    let lByte
    let lCount

    for (lCount = 0; lCount <= 3; lCount++) {
      lByte = (lValue >>> (lCount * 8)) & 255
      wordToHexValueTemp = '0' + lByte.toString(16)
      wordToHexValue = wordToHexValue + wordToHexValueTemp.substr(wordToHexValueTemp.length - 2, 2)
    }
    return wordToHexValue
  }

  let x = []
  let k
  let AA
  let BB
  let CC
  let DD
  let a
  let b
  let c
  let d
  const S11 = 7
  const S12 = 12
  const S13 = 17
  const S14 = 22
  const S21 = 5
  const S22 = 9
  const S23 = 14
  const S24 = 20
  const S31 = 4
  const S32 = 11
  const S33 = 16
  const S34 = 23
  const S41 = 6
  const S42 = 10
  const S43 = 15
  const S44 = 21

  str = utf8Encode(str)
  x = _convertToWordArray(str)
  a = 0x67452301
  b = 0xefcdab89
  c = 0x98badcfe
  d = 0x10325476

  xl = x.length
  for (k = 0; k < xl; k += 16) {
    AA = a
    BB = b
    CC = c
    DD = d
    a = _FF(a, b, c, d, x[k + 0], S11, 0xd76aa478)
    d = _FF(d, a, b, c, x[k + 1], S12, 0xe8c7b756)
    c = _FF(c, d, a, b, x[k + 2], S13, 0x242070db)
    b = _FF(b, c, d, a, x[k + 3], S14, 0xc1bdceee)
    a = _FF(a, b, c, d, x[k + 4], S11, 0xf57c0faf)
    d = _FF(d, a, b, c, x[k + 5], S12, 0x4787c62a)
    c = _FF(c, d, a, b, x[k + 6], S13, 0xa8304613)
    b = _FF(b, c, d, a, x[k + 7], S14, 0xfd469501)
    a = _FF(a, b, c, d, x[k + 8], S11, 0x698098d8)
    d = _FF(d, a, b, c, x[k + 9], S12, 0x8b44f7af)
    c = _FF(c, d, a, b, x[k + 10], S13, 0xffff5bb1)
    b = _FF(b, c, d, a, x[k + 11], S14, 0x895cd7be)
    a = _FF(a, b, c, d, x[k + 12], S11, 0x6b901122)
    d = _FF(d, a, b, c, x[k + 13], S12, 0xfd987193)
    c = _FF(c, d, a, b, x[k + 14], S13, 0xa679438e)
    b = _FF(b, c, d, a, x[k + 15], S14, 0x49b40821)
    a = _GG(a, b, c, d, x[k + 1], S21, 0xf61e2562)
    d = _GG(d, a, b, c, x[k + 6], S22, 0xc040b340)
    c = _GG(c, d, a, b, x[k + 11], S23, 0x265e5a51)
    b = _GG(b, c, d, a, x[k + 0], S24, 0xe9b6c7aa)
    a = _GG(a, b, c, d, x[k + 5], S21, 0xd62f105d)
    d = _GG(d, a, b, c, x[k + 10], S22, 0x2441453)
    c = _GG(c, d, a, b, x[k + 15], S23, 0xd8a1e681)
    b = _GG(b, c, d, a, x[k + 4], S24, 0xe7d3fbc8)
    a = _GG(a, b, c, d, x[k + 9], S21, 0x21e1cde6)
    d = _GG(d, a, b, c, x[k + 14], S22, 0xc33707d6)
    c = _GG(c, d, a, b, x[k + 3], S23, 0xf4d50d87)
    b = _GG(b, c, d, a, x[k + 8], S24, 0x455a14ed)
    a = _GG(a, b, c, d, x[k + 13], S21, 0xa9e3e905)
    d = _GG(d, a, b, c, x[k + 2], S22, 0xfcefa3f8)
    c = _GG(c, d, a, b, x[k + 7], S23, 0x676f02d9)
    b = _GG(b, c, d, a, x[k + 12], S24, 0x8d2a4c8a)
    a = _HH(a, b, c, d, x[k + 5], S31, 0xfffa3942)
    d = _HH(d, a, b, c, x[k + 8], S32, 0x8771f681)
    c = _HH(c, d, a, b, x[k + 11], S33, 0x6d9d6122)
    b = _HH(b, c, d, a, x[k + 14], S34, 0xfde5380c)
    a = _HH(a, b, c, d, x[k + 1], S31, 0xa4beea44)
    d = _HH(d, a, b, c, x[k + 4], S32, 0x4bdecfa9)
    c = _HH(c, d, a, b, x[k + 7], S33, 0xf6bb4b60)
    b = _HH(b, c, d, a, x[k + 10], S34, 0xbebfbc70)
    a = _HH(a, b, c, d, x[k + 13], S31, 0x289b7ec6)
    d = _HH(d, a, b, c, x[k + 0], S32, 0xeaa127fa)
    c = _HH(c, d, a, b, x[k + 3], S33, 0xd4ef3085)
    b = _HH(b, c, d, a, x[k + 6], S34, 0x4881d05)
    a = _HH(a, b, c, d, x[k + 9], S31, 0xd9d4d039)
    d = _HH(d, a, b, c, x[k + 12], S32, 0xe6db99e5)
    c = _HH(c, d, a, b, x[k + 15], S33, 0x1fa27cf8)
    b = _HH(b, c, d, a, x[k + 2], S34, 0xc4ac5665)
    a = _II(a, b, c, d, x[k + 0], S41, 0xf4292244)
    d = _II(d, a, b, c, x[k + 7], S42, 0x432aff97)
    c = _II(c, d, a, b, x[k + 14], S43, 0xab9423a7)
    b = _II(b, c, d, a, x[k + 5], S44, 0xfc93a039)
    a = _II(a, b, c, d, x[k + 12], S41, 0x655b59c3)
    d = _II(d, a, b, c, x[k + 3], S42, 0x8f0ccc92)
    c = _II(c, d, a, b, x[k + 10], S43, 0xffeff47d)
    b = _II(b, c, d, a, x[k + 1], S44, 0x85845dd1)
    a = _II(a, b, c, d, x[k + 8], S41, 0x6fa87e4f)
    d = _II(d, a, b, c, x[k + 15], S42, 0xfe2ce6e0)
    c = _II(c, d, a, b, x[k + 6], S43, 0xa3014314)
    b = _II(b, c, d, a, x[k + 13], S44, 0x4e0811a1)
    a = _II(a, b, c, d, x[k + 4], S41, 0xf7537e82)
    d = _II(d, a, b, c, x[k + 11], S42, 0xbd3af235)
    c = _II(c, d, a, b, x[k + 2], S43, 0x2ad7d2bb)
    b = _II(b, c, d, a, x[k + 9], S44, 0xeb86d391)
    a = _addUnsigned(a, AA)
    b = _addUnsigned(b, BB)
    c = _addUnsigned(c, CC)
    d = _addUnsigned(d, DD)
  }

  const temp = _wordToHex(a) + _wordToHex(b) + _wordToHex(c) + _wordToHex(d)

  return temp.toLowerCase()
}
