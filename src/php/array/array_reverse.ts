export function array_reverse(
  array: unknown[] | { [key: string]: unknown },
  preserveKeys?: boolean,
): unknown[] | { [key: string]: unknown } {
  //  discuss at: https://locutus.io/php/array_reverse/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Karol Kowalski
  //   example 1: array_reverse( [ 'php', '4.0', ['green', 'red'] ], true)
  //   returns 1: { 2: ['green', 'red'], 1: '4.0', 0: 'php'}

  if (Array.isArray(array) && !preserveKeys) {
    return array.slice(0).reverse()
  }

  if (preserveKeys) {
    const keys: string[] = []
    const source = array as { [key: string]: unknown }
    const tmpArr: { [key: string]: unknown } = {}
    for (const key in source) {
      keys.push(key)
    }

    let i = keys.length
    while (i--) {
      const key = keys[i]
      if (key === undefined) {
        continue
      }
      // @todo: don't rely on browsers keeping keys in insertion order
      // it's implementation specific
      // eg. the result will differ from expected in Google Chrome
      tmpArr[key] = source[key]
    }
    return tmpArr
  } else {
    const source = array as { [key: string]: unknown }
    const tmpArr: unknown[] = []
    for (const key in source) {
      tmpArr.unshift(source[key])
    }
    return tmpArr
  }
}
