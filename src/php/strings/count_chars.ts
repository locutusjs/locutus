export function count_chars(
  str: string | number | boolean | null | undefined,
  mode = 0,
): { [key: string]: number } | string {
  //      discuss at: https://locutus.io/php/count_chars/
  // parity verified: PHP 8.3
  //     original by: Ates Goral (https://magnetiq.com)
  //     improved by: Jack
  //     bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  //     bugfixed by: Kevin van Zonneveld (https://kvz.io)
  //        input by: Brett Zamir (https://brett-zamir.me)
  //      revised by: Theriault (https://github.com/Theriault)
  //       example 1: count_chars("Hello World!", 3)
  //       returns 1: " !HWdelor"
  //       example 2: count_chars("Hello World!", 1)
  //       returns 2: {32:1,33:1,72:1,87:1,100:1,101:1,108:3,111:2,114:1}

  const result: { [key: string]: number | string } = {}
  const resultArr: string[] = []
  let i = 0
  let key = ''

  const groupedChars =
    ('' + str)
      .split('')
      .sort()
      .join('')
      .match(/(.)\1*/g) || []

  if ((mode & 1) === 0) {
    for (i = 0; i !== 256; i++) {
      result[i] = 0
    }
  }

  if (mode === 2 || mode === 4) {
    for (i = 0; i !== groupedChars.length; i += 1) {
      const grouped = groupedChars[i]
      if (grouped === undefined) {
        continue
      }
      delete result[grouped.charCodeAt(0)]
    }
    for (key in result) {
      result[key] = mode === 4 ? String.fromCharCode(Number(key)) : 0
    }
  } else if (mode === 3) {
    for (i = 0; i !== groupedChars.length; i += 1) {
      const grouped = groupedChars[i]
      if (grouped === undefined) {
        continue
      }
      result[i] = grouped.slice(0, 1)
    }
  } else {
    for (i = 0; i !== groupedChars.length; i += 1) {
      const grouped = groupedChars[i]
      if (grouped === undefined) {
        continue
      }
      result[grouped.charCodeAt(0)] = grouped.length
    }
  }
  if (mode < 3) {
    return result as { [key: string]: number }
  }

  for (key in result) {
    resultArr.push(String(result[key]))
  }

  return resultArr.join('')
}
