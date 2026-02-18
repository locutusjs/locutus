import type { PhpAssoc, PhpValue } from '../_helpers/_phpTypes.ts'
import { is_int as isInt } from '../var/is_int.ts'

type AssocArray<T = PhpValue> = PhpAssoc<T | undefined>
type ReplacementValue<T = PhpValue> = T[] | AssocArray<T> | T

const isAssocArray = <T>(value: PhpValue): value is AssocArray<T> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const toReplacementItems = <T>(replacement: ReplacementValue<T> | undefined): Array<T | undefined> | undefined => {
  if (typeof replacement === 'undefined') {
    return undefined
  }

  if (Array.isArray(replacement)) {
    return replacement.slice()
  }

  if (isAssocArray(replacement)) {
    const values: Array<T | undefined> = []
    for (const key in replacement) {
      values.push(replacement[key] as T | undefined)
    }
    return values
  }

  return [replacement as T | undefined]
}

const checkToUpIndices = <T>(assoc: AssocArray<T>, cursor: number, key: string): number => {
  // Deal with situation, e.g., if encounter index 4 and try
  // to set it to 0, but 0 exists later in loop (need to
  // increment all subsequent (skipping current key,
  // since we need its value below) until find unused)
  if (assoc[String(cursor)] !== undefined) {
    const tmp = cursor
    cursor += 1
    if (cursor === Number.parseInt(key, 10)) {
      cursor += 1
    }
    cursor = checkToUpIndices(assoc, cursor, key)
    assoc[String(cursor)] = assoc[String(tmp)]
    delete assoc[String(tmp)]
  }
  return cursor
}

export function array_splice(
  arr: PhpValue[] | AssocArray<PhpValue>,
  offst: number,
  lgth?: number,
  replacement?: ReplacementValue<PhpValue>,
): PhpValue[] | AssocArray<PhpValue> {
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

  const replacementItems = toReplacementItems(replacement)

  const sourceLength = Array.isArray(arr) ? arr.length : ((arr as { length?: number }).length ?? 0)

  const lengthToRemove =
    typeof lgth === 'undefined'
      ? offst >= 0
        ? sourceLength - offst
        : -offst
      : lgth < 0
        ? (offst >= 0 ? sourceLength - offst : -offst) + lgth
        : lgth

  if (Array.isArray(arr)) {
    const arrayInput = arr
    if (replacementItems) {
      return arrayInput.splice(offst, lengthToRemove, ...replacementItems)
    }
    return arrayInput.splice(offst, lengthToRemove)
  }

  let totalLength = 0
  let indexCursor = -1
  let replacementCursor = 0
  let numericCursor = -1
  let returnsArray = true
  let removedNumericCursor = 0

  const removedItems: PhpValue[] = []
  const removedAssoc: AssocArray<PhpValue> = {}
  const assoc = arr

  for (const _key in assoc) {
    totalLength += 1
  }

  const normalizedOffset = offst >= 0 ? offst : totalLength + offst

  for (const key in assoc) {
    indexCursor += 1

    if (indexCursor < normalizedOffset) {
      if (isInt(key)) {
        numericCursor += 1
        if (Number.parseInt(key, 10) !== numericCursor) {
          checkToUpIndices(assoc, numericCursor, key)
          assoc[String(numericCursor)] = assoc[key]
          delete assoc[key]
        }
      }
      continue
    }

    if (returnsArray && isInt(key)) {
      removedItems.push(assoc[key])
      removedAssoc[String(removedNumericCursor)] = assoc[key]
      removedNumericCursor += 1
    } else {
      removedAssoc[key] = assoc[key]
      returnsArray = false
    }

    if (replacementItems && replacementCursor < replacementItems.length) {
      assoc[key] = replacementItems[replacementCursor]
      replacementCursor += 1
    } else {
      delete assoc[key]
    }
  }

  return returnsArray ? removedItems : removedAssoc
}
