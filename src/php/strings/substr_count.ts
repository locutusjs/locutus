export function substr_count(haystack: string, needle: string, offset?: number, length?: number): number | false {
  //  discuss at: https://locutus.io/php/substr_count/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  // improved by: Brett Zamir (https://brett-zamir.me)
  // improved by: Thomas
  //   example 1: substr_count('Kevin van Zonneveld', 'e')
  //   returns 1: 3
  //   example 2: substr_count('Kevin van Zonneveld', 'K', 1)
  //   returns 2: 0
  //   example 3: substr_count('Kevin van Zonneveld', 'Z', 0, 10)
  //   returns 3: false

  let cnt = 0

  const normalizedHaystack = String(haystack)
  const normalizedNeedle = String(needle)
  const normalizedOffset = Number.isNaN(Number(offset)) ? 0 : Number(offset)
  const normalizedLength = Number.isNaN(Number(length)) ? 0 : Number(length)
  if (normalizedNeedle.length === 0) {
    return false
  }
  let position = normalizedOffset - 1

  while ((position = normalizedHaystack.indexOf(normalizedNeedle, position + 1)) !== -1) {
    if (normalizedLength > 0 && position + normalizedNeedle.length > normalizedLength) {
      return false
    }
    cnt++
  }

  return cnt
}
