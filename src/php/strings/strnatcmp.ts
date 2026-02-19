import { _phpCastString } from '../_helpers/_phpCastString.ts'

type NatCmpValue = {} | null | undefined

export function strnatcmp(left: NatCmpValue, right: NatCmpValue): number {
  //       discuss at: https://locutus.io/php/strnatcmp/
  //  parity verified: PHP 8.3
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

  const leadingZeros = /^0+(?=\d)/
  const whitespace = /^\s/
  const digit = /^\d/

  let leftValue = _phpCastString(left)
  let rightValue = _phpCastString(right)

  if (!leftValue.length || !rightValue.length) {
    return leftValue.length - rightValue.length
  }

  let i = 0
  let j = 0

  leftValue = leftValue.replace(leadingZeros, '')
  rightValue = rightValue.replace(leadingZeros, '')

  while (i < leftValue.length && j < rightValue.length) {
    // skip consecutive whitespace
    while (whitespace.test(leftValue.charAt(i))) {
      i++
    }
    while (whitespace.test(rightValue.charAt(j))) {
      j++
    }

    let ac = leftValue.charAt(i)
    let bc = rightValue.charAt(j)
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

        ac = leftValue.charAt(++i)
        bc = rightValue.charAt(++j)

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

  const iBeforeStrEnd = i < leftValue.length
  const jBeforeStrEnd = j < rightValue.length

  // Check which string ended first
  // return -1 if a, 1 if b, 0 otherwise
  if (iBeforeStrEnd && !jBeforeStrEnd) {
    return 1
  }
  if (!iBeforeStrEnd && jBeforeStrEnd) {
    return -1
  }
  return 0
}
