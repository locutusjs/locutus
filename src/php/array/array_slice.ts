import type { PhpAssoc, PhpValue } from '../_helpers/_phpTypes.ts'
import { is_int as isInt } from '../var/is_int.ts'

export function array_slice<TValue>(
  arr: TValue[],
  offst: number,
  lgth?: number,
  preserveKeys?: false | undefined,
): TValue[]
export function array_slice<TValue>(
  arr: TValue[],
  offst: number,
  lgth: number | undefined,
  preserveKeys: true,
): TValue[] | PhpAssoc<TValue>
export function array_slice<TValue>(
  arr: PhpAssoc<TValue>,
  offst: number,
  lgth?: number,
  preserveKeys?: boolean,
): PhpAssoc<TValue>
export function array_slice(
  arr: PhpValue[] | PhpAssoc<PhpValue>,
  offst: number,
  lgth?: number,
  preserveKeys?: boolean,
): PhpValue[] | PhpAssoc<PhpValue> {
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

  const preserve = preserveKeys === true
  let result: PhpValue[] | PhpAssoc<PhpValue>

  if (Array.isArray(arr) && !(preserve && offst !== 0)) {
    if (lgth === undefined) {
      result = arr.slice(offst)
    } else if (lgth >= 0) {
      result = arr.slice(offst, offst + lgth)
    } else {
      result = arr.slice(offst, lgth)
    }
  } else {
    const sourceAssoc: PhpAssoc<PhpValue> = {}
    let sourceLength = 0

    if (Array.isArray(arr)) {
      for (let index = 0; index < arr.length; index += 1) {
        sourceLength += 1
        sourceAssoc[String(index)] = arr[index]
      }
    } else {
      for (const key in arr) {
        sourceLength += 1
        sourceAssoc[key] = arr[key]
      }
    }

    const normalizedOffset = offst < 0 ? sourceLength + offst : offst
    const resolvedLength = lgth === undefined ? sourceLength : lgth < 0 ? sourceLength + lgth - normalizedOffset : lgth

    const sliced: PhpAssoc<PhpValue> = {}
    let started = false
    let sourceIndex = -1
    let collected = 0
    let sequentialKey = 0

    for (const key in sourceAssoc) {
      sourceIndex += 1

      if (collected >= resolvedLength) {
        break
      }

      if (sourceIndex === normalizedOffset) {
        started = true
      }

      if (!started) {
        continue
      }

      collected += 1

      if (isInt(key) && !preserve) {
        sliced[String(sequentialKey)] = sourceAssoc[key]
        sequentialKey += 1
      } else {
        sliced[key] = sourceAssoc[key]
      }
    }

    result = sliced
  }

  return result
}
