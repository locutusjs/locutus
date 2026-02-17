import { is_int as isInt } from '../var/is_int.ts'

export function array_slice(
  arr: unknown[] | { [key: string]: unknown },
  offst: number,
  lgth?: number,
  preserveKeys?: boolean,
): unknown[] | { [key: string]: unknown } {
  //      discuss at: https://locutus.io/php/array_slice/
  // parity verified: PHP 8.3
  //     original by: Brett Zamir (https://brett-zamir.me)
  //        input by: Brett Zamir (https://brett-zamir.me)
  //     bugfixed by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Relies on is_int because !isNaN accepts floats
  //       example 1: array_slice(["a", "b", "c", "d", "e"], 2, -1)
  //       returns 1: [ 'c', 'd' ]
  //       example 2: array_slice(["a", "b", "c", "d", "e"], 2, -1, true)
  //       returns 2: {2: 'c', 3: 'd'}

  /*
    if ('callee' in arr && 'length' in arr) {
      arr = Array.prototype.slice.call(arr);
    }
  */

  if (!Array.isArray(arr) || (preserveKeys && offst !== 0)) {
    // Assoc. array as input or if required as output
    let lgt = 0
    const sourceAssoc: { [key: string]: unknown } = {}
    const assocInput = arr as { [key: string]: unknown }
    for (const key in arr) {
      lgt += 1
      sourceAssoc[key] = assocInput[key]
    }

    offst = offst < 0 ? lgt + offst : offst
    const resolvedLength = lgth === undefined ? lgt : lgth < 0 ? lgt + lgth - offst : lgth

    const assoc: { [key: string]: unknown } = {}
    let start = false
    let it = -1
    let arrlgth = 0
    let noPkIdx = 0

    for (const key in sourceAssoc) {
      ++it
      if (arrlgth >= resolvedLength) {
        break
      }
      if (it === offst) {
        start = true
      }
      if (!start) {
        continue
      }
      ++arrlgth
      if (isInt(key) && !preserveKeys) {
        assoc[String(noPkIdx++)] = sourceAssoc[key]
      } else {
        assoc[key] = sourceAssoc[key]
      }
    }
    // Make as array-like object (though length will not be dynamic)
    // assoc.length = arrlgth;
    return assoc
  }

  if (lgth === undefined) {
    return arr.slice(offst)
  } else if (lgth >= 0) {
    return arr.slice(offst, offst + lgth)
  } else {
    return arr.slice(offst, lgth)
  }
}
