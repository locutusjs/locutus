export function strcspn(str: string, mask: string, start?: number, length?: number): number {
  //      discuss at: https://locutus.io/php/strcspn/
  // parity verified: PHP 8.3
  //     original by: Brett Zamir (https://brett-zamir.me)
  //      revised by: Theriault
  //       example 1: strcspn('abcdefg123', '1234567890')
  //       returns 1: 7
  //       example 2: strcspn('123abc', '1234567890')
  //       returns 2: 0
  //       example 3: strcspn('abcdefg123', '1234567890', 1)
  //       returns 3: 6
  //       example 4: strcspn('abcdefg123', '1234567890', -6, -5)
  //       returns 4: 1

  start = start || 0
  length = typeof length === 'undefined' ? str.length : length || 0
  if (start < 0) {
    start = str.length + start
  }
  if (length < 0) {
    length = str.length - start + length
  }
  const e = Math.min(str.length, start + length)
  if (start < 0 || start >= str.length || length <= 0) {
    return 0
  }
  let lgth = 0
  for (let i = start; i < e; i++) {
    if (mask.includes(str.charAt(i))) {
      break
    }
    ++lgth
  }
  return lgth
}
