export function array_diff_key(arr1: { [key: string]: unknown }): { [key: string]: unknown } {
  //  discuss at: https://locutus.io/php/array_diff_key/
  // original by: Ates Goral (https://magnetiq.com)
  //  revised by: Brett Zamir (https://brett-zamir.me)
  //    input by: Everlasto
  //   example 1: array_diff_key({red: 1, green: 2, blue: 3, white: 4}, {red: 5})
  //   returns 1: {"green":2, "blue":3, "white":4}
  //   example 2: array_diff_key({red: 1, green: 2, blue: 3, white: 4}, {red: 5}, {red: 5})
  //   returns 2: {"green":2, "blue":3, "white":4}

  const argl = arguments.length
  const retArr: { [key: string]: unknown } = {}
  let k1 = ''
  let i = 1
  let k = ''
  let arr: { [key: string]: unknown } = {}
  arr1keys: for (k1 in arr1) {
    for (i = 1; i < argl; i++) {
      arr = arguments[i] as { [key: string]: unknown }
      for (k in arr) {
        if (k === k1) {
          // If it reaches here, it was found in at least one array, so try next value
          continue arr1keys
        }
      }
      retArr[k1] = arr1[k1]
    }
  }

  return retArr
}
