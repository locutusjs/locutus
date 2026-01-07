module.exports = function strnatcmp(a, b) {
  //       discuss at: https://locutus.io/php/strnatcmp/
  //   verified: 8.3
  //      original by: Martijn Wieringa
  //      improved by: Michael White (https://getsprink.com)
  //      improved by: Jack
  //      bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  // reimplemented by: Rafał Kukawski
  //        example 1: strnatcmp('abc', 'abc')
  //        returns 1: 0
  //        example 2: strnatcmp('a', 'b')
  //        returns 2: -1
  //        example 3: strnatcmp('10', '1')
  //        returns 3: 1
  //        example 4: strnatcmp('0000abc', '0abc')
  //        returns 4: 0
  //        example 5: strnatcmp('1239', '12345')
  //        returns 5: -1
  //        example 6: strnatcmp('t01239', 't012345')
  //        returns 6: 1
  //        example 7: strnatcmp('0A', '5N')
  //        returns 7: -1

  const _phpCastString = require('../_helpers/_phpCastString')

  const leadingZeros = /^0+(?=\d)/
  const whitespace = /^\s/
  const digit = /^\d/

  if (arguments.length !== 2) {
    return null
  }

  a = _phpCastString(a)
  b = _phpCastString(b)

  if (!a.length || !b.length) {
    return a.length - b.length
  }

  let i = 0
  let j = 0

  a = a.replace(leadingZeros, '')
  b = b.replace(leadingZeros, '')

  while (i < a.length && j < b.length) {
    // skip consecutive whitespace
    while (whitespace.test(a.charAt(i))) {
      i++
    }
    while (whitespace.test(b.charAt(j))) {
      j++
    }

    let ac = a.charAt(i)
    let bc = b.charAt(j)
    let aIsDigit = digit.test(ac)
    let bIsDigit = digit.test(bc)

    if (aIsDigit && bIsDigit) {
      let bias = 0
      const fractional = ac === '0' || bc === '0'

      do {
        if (!aIsDigit) {
          return -1
        } else if (!bIsDigit) {
          return 1
        } else if (ac < bc) {
          if (!bias) {
            bias = -1
          }

          if (fractional) {
            return -1
          }
        } else if (ac > bc) {
          if (!bias) {
            bias = 1
          }

          if (fractional) {
            return 1
          }
        }

        ac = a.charAt(++i)
        bc = b.charAt(++j)

        aIsDigit = digit.test(ac)
        bIsDigit = digit.test(bc)
      } while (aIsDigit || bIsDigit)

      if (!fractional && bias) {
        return bias
      }

      continue
    }

    if (!ac || !bc) {
      continue
    } else if (ac < bc) {
      return -1
    } else if (ac > bc) {
      return 1
    }

    i++
    j++
  }

  const iBeforeStrEnd = i < a.length
  const jBeforeStrEnd = j < b.length

  // Check which string ended first
  // return -1 if a, 1 if b, 0 otherwise
  return (iBeforeStrEnd > jBeforeStrEnd) - (iBeforeStrEnd < jBeforeStrEnd)
}
