import {
  isObjectLike,
  type PhpArrayLike,
  type PhpAssoc,
  type PhpRuntimeValue,
  toPhpArrayObject,
} from '../_helpers/_phpTypes.ts'

type CountValue = PhpRuntimeValue

export function array_count_values(array: PhpArrayLike<CountValue>): PhpAssoc<number> {
  //      discuss at: https://locutus.io/php/array_count_values/
  // parity verified: PHP 8.3
  //     original by: Ates Goral (https://magnetiq.com)
  //     improved by: Michael White (https://getsprink.com)
  //     improved by: Kevin van Zonneveld (https://kvz.io)
  //        input by: sankai
  //        input by: Shingo
  //     bugfixed by: Brett Zamir (https://brett-zamir.me)
  //       example 1: array_count_values([ 3, 5, 3, "foo", "bar", "foo" ])
  //       returns 1: {3:2, 5:1, "foo":2, "bar":1}
  //       example 2: array_count_values({ p1: 3, p2: 5, p3: 3, p4: "foo", p5: "bar", p6: "foo" })
  //       returns 2: {3:2, 5:1, "foo":2, "bar":1}
  //       example 3: array_count_values([ true, 4.2, 42, "fubar" ])
  //       returns 3: {42:1, "fubar":1}

  const tmpArr: PhpAssoc<number> = {}

  const _countValue = function (target: PhpAssoc<number>, value: CountValue): void {
    let normalized = ''
    if (typeof value === 'number') {
      if (Math.floor(value) !== value) {
        return
      }
      normalized = String(value)
    } else if (typeof value !== 'string') {
      return
    } else {
      normalized = value
    }

    if (normalized in target && Object.prototype.hasOwnProperty.call(target, normalized)) {
      target[normalized] = (target[normalized] ?? 0) + 1
    } else {
      target[normalized] = 1
    }
  }

  if (!isObjectLike(array)) {
    return tmpArr
  }

  const source = toPhpArrayObject<CountValue>(array)
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      _countValue(tmpArr, source[key])
    }
  }

  return tmpArr
}
