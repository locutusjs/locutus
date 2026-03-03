import { getEntryAtCursor, getPointerState } from '../_helpers/_arrayPointers.ts'
import type { PhpArrayLike } from '../_helpers/_phpTypes.ts'

export function reset<T>(arr: PhpArrayLike<T>): T | false {
  //  discuss at: https://locutus.io/php/reset/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // bugfixed by: Legaev Andrey
  //  revised by: Brett Zamir (https://brett-zamir.me)
  //      note 1: Uses global: locutus to store the array pointer
  //   example 1: reset({0: 'Kevin', 1: 'van', 2: 'Zonneveld'})
  //   returns 1: 'Kevin'

  const state = getPointerState(arr, true)
  if (!state) {
    return false
  }

  const entry = getEntryAtCursor(arr, 0)
  if (!entry) {
    return false
  }

  state.setCursor(0)
  return entry[1]
}
