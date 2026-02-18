import { getArrayLikeLength, getEntryAtCursor, getPointerState } from '../_helpers/_arrayPointers.ts'
import type { PhpArrayLike } from '../_helpers/_phpTypes.ts'

export function end<T>(arr: PhpArrayLike<T>): T | false {
  //  discuss at: https://locutus.io/php/end/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // bugfixed by: Legaev Andrey
  //  revised by: J A R
  //  revised by: Brett Zamir (https://brett-zamir.me)
  // improved by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Uses global: locutus to store the array pointer
  //   example 1: end({0: 'Kevin', 1: 'van', 2: 'Zonneveld'})
  //   returns 1: 'Zonneveld'
  //   example 2: end(['Kevin', 'van', 'Zonneveld'])
  //   returns 2: 'Zonneveld'

  const state = getPointerState(arr, true)
  if (!state) {
    return false
  }

  const lastIndex = getArrayLikeLength(arr) - 1
  if (lastIndex < 0) {
    return false
  }

  const entry = getEntryAtCursor(arr, lastIndex)
  if (!entry) {
    return false
  }

  state.setCursor(lastIndex)
  return entry[1]
}
