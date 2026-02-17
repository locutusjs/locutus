import { is_int as isInt } from '../var/is_int.ts'

type AssocArray = { [key: string]: unknown }

export function array_splice(
  arr: unknown[] | AssocArray,
  offst: number,
  lgth?: number,
  replacement?: unknown,
): unknown[] | AssocArray {
  //      discuss at: https://locutus.io/php/array_splice/
  // parity verified: PHP 8.3
  //     original by: Brett Zamir (https://brett-zamir.me)
  //        input by: Theriault (https://github.com/Theriault)
  //          note 1: Order does get shifted in associative array input with numeric indices,
  //          note 1: since PHP behavior doesn't preserve keys, but I understand order is
  //          note 1: not reliable anyways
  //          note 1: Note also that IE retains information about property position even
  //          note 1: after being supposedly deleted, so use of this function may produce
  //          note 1: unexpected results in IE if you later attempt to add back properties
  //          note 1: with the same keys that had been deleted
  //       example 1: var $input = ["red", "green", "blue", "yellow"]
  //       example 1: array_splice($input, 2)
  //       returns 1: ["blue", "yellow"]
  //       example 2: var $input = ["red", "green", "blue", "yellow"]
  //       example 2: array_splice($input, 3, 0, "purple")
  //       returns 2: []
  //       example 3: var $input = ["red", "green", "blue", "yellow"]
  //       example 3: array_splice($input, -1, 1, ["black", "maroon"])
  //       returns 3: ["yellow"]

  const _checkToUpIndices = function (assoc: AssocArray, ct: number, key: string): number {
    // Deal with situation, e.g., if encounter index 4 and try
    // to set it to 0, but 0 exists later in loop (need to
    // increment all subsequent (skipping current key,
    // since we need its value below) until find unused)
    if (assoc[String(ct)] !== undefined) {
      const tmp = ct
      ct += 1
      if (ct === Number.parseInt(key, 10)) {
        ct += 1
      }
      ct = _checkToUpIndices(assoc, ct, key)
      assoc[String(ct)] = assoc[String(tmp)]
      delete assoc[String(tmp)]
    }
    return ct
  }

  let replacementValue: unknown = replacement
  if (replacementValue && typeof replacementValue !== 'object') {
    replacementValue = [replacementValue]
  }
  const sourceLength = Array.isArray(arr) ? arr.length : (arr as { length?: number }).length
  let lengthToRemove: number
  if (lgth === undefined) {
    lengthToRemove = offst >= 0 ? (sourceLength ?? 0) - offst : -offst
  } else if (lgth < 0) {
    lengthToRemove = (offst >= 0 ? (sourceLength ?? 0) - offst : -offst) + lgth
  } else {
    lengthToRemove = lgth
  }

  if (!Array.isArray(arr)) {
    /* if (arr.length !== undefined) {
     // Deal with array-like objects as input
    delete arr.length;
    } */
    let lgt = 0
    let ct = -1
    const rmvd: unknown[] = []
    const rmvdObj: AssocArray = {}
    let replCt = -1
    let intCt = -1
    let returnArr = true
    let rmvdCt = 0
    // var rmvdLngth = 0
    let key = ''
    const assoc = arr
    const replacementEntries =
      replacementValue && typeof replacementValue === 'object'
        ? (replacementValue as { [index: number]: unknown })
        : undefined
    // rmvdObj.length = 0;
    for (key in assoc) {
      // Can do arr.__count__ in some browsers
      lgt += 1
    }
    offst = offst >= 0 ? offst : lgt + offst
    for (key in assoc) {
      ct += 1
      if (ct < offst) {
        if (isInt(key)) {
          intCt += 1
          if (parseInt(key, 10) === intCt) {
            // Key is already numbered ok, so don't need to change key for value
            continue
          }
          // Deal with situation, e.g.,
          _checkToUpIndices(assoc, intCt, key)
          // if encounter index 4 and try to set it to 0, but 0 exists later in loop
          assoc[String(intCt)] = assoc[key]
          delete assoc[key]
        }
        continue
      }
      if (returnArr && isInt(key)) {
        rmvd.push(assoc[key])
        // PHP starts over here too
        rmvdObj[String(rmvdCt++)] = assoc[key]
      } else {
        rmvdObj[key] = assoc[key]
        returnArr = false
      }
      // rmvdLngth += 1
      // rmvdObj.length += 1;
      if (replacementEntries && replacementEntries[++replCt]) {
        assoc[key] = replacementEntries[replCt]
      } else {
        delete assoc[key]
      }
    }
    // Make (back) into an array-like object
    // arr.length = lgt - rmvdLngth + (replacement ? replacement.length : 0);
    return returnArr ? rmvd : rmvdObj
  }

  const arrayInput = arr
  if (replacementValue) {
    const replacementArray = replacementValue as unknown[] & { unshift: (...items: unknown[]) => number }
    replacementArray.unshift(offst, lengthToRemove)
    return Array.prototype.splice.call(arrayInput, ...(replacementArray as [number, number, ...unknown[]]))
  }

  return arrayInput.splice(offst, lengthToRemove)
}
