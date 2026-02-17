export function array_change_key_case(
  array: number | unknown[] | { [key: string]: unknown } | null,
  cs?: string | number,
): boolean | unknown[] | { [key: string]: unknown } | false {
  //  discuss at: https://locutus.io/php/array_change_key_case/
  // original by: Ates Goral (https://magnetiq.com)
  // improved by: marrtins
  // improved by: Brett Zamir (https://brett-zamir.me)
  //   example 1: array_change_key_case(42)
  //   returns 1: false
  //   example 2: array_change_key_case([ 3, 5 ])
  //   returns 2: [3, 5]
  //   example 3: array_change_key_case({ FuBaR: 42 })
  //   returns 3: {"fubar": 42}
  //   example 4: array_change_key_case({ FuBaR: 42 }, 'CASE_LOWER')
  //   returns 4: {"fubar": 42}
  //   example 5: array_change_key_case({ FuBaR: 42 }, 'CASE_UPPER')
  //   returns 5: {"FUBAR": 42}
  //   example 6: array_change_key_case({ FuBaR: 42 }, 2)
  //   returns 6: {"FUBAR": 42}

  let caseFnc: 'toLowerCase' | 'toUpperCase'
  const tmpArr: { [key: string]: unknown } = {}
  if (Array.isArray(array)) {
    return array
  }

  if (array && typeof array === 'object') {
    caseFnc = !cs || cs === 'CASE_LOWER' ? 'toLowerCase' : 'toUpperCase'
    const source = array as { [key: string]: unknown }
    for (const key in source) {
      tmpArr[key[caseFnc]()] = source[key]
    }
    return tmpArr
  }

  return false
}
