import type { PhpAssoc } from '../_helpers/_phpTypes.ts'
import { is_int as isInt } from '../var/is_int.ts'

type PhpValue = {} | null | undefined

type ArraySliceResult<TInput, TPreserve extends boolean> = TInput extends (infer TValue)[]
  ? TPreserve extends true
    ? TValue[] | PhpAssoc<TValue>
    : TValue[]
  : TInput extends PhpAssoc<infer TValue>
    ? PhpAssoc<TValue>
    : never

export function array_slice<TInput extends PhpValue[] | PhpAssoc<PhpValue>, TPreserve extends boolean = false>(
  arr: TInput,
  offst: number,
  lgth?: number,
  preserveKeys = false as TPreserve,
): ArraySliceResult<TInput, TPreserve> {
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

  if (Array.isArray(arr) && !(preserveKeys && offst !== 0)) {
    if (lgth === undefined) {
      return arr.slice(offst) as ArraySliceResult<TInput, TPreserve>
    }
    if (lgth >= 0) {
      return arr.slice(offst, offst + lgth) as ArraySliceResult<TInput, TPreserve>
    }
    return arr.slice(offst, lgth) as ArraySliceResult<TInput, TPreserve>
  }

  const assocInput = arr as PhpAssoc<PhpValue>
  const sourceAssoc: PhpAssoc<PhpValue> = {}

  let sourceLength = 0
  for (const key in assocInput) {
    sourceLength += 1
    sourceAssoc[key] = assocInput[key]
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

    if (isInt(key) && !preserveKeys) {
      sliced[String(sequentialKey)] = sourceAssoc[key]
      sequentialKey += 1
    } else {
      sliced[key] = sourceAssoc[key]
    }
  }

  return sliced as ArraySliceResult<TInput, TPreserve>
}
