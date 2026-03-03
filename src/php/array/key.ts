import { getEntryAtCursor, getPointerState } from '../_helpers/_arrayPointers.ts'
import type { PhpArrayLike } from '../_helpers/_phpTypes.ts'

export function key<T>(arr: PhpArrayLike<T>): string | number | false {
  //      discuss at: https://locutus.io/php/key/
  // parity verified: PHP 8.3
  //     original by: Brett Zamir (https://brett-zamir.me)
  //        input by: Riddler (https://www.frontierwebdev.com/)
  //     bugfixed by: Brett Zamir (https://brett-zamir.me)
  //          note 1: Uses global: locutus to store the array pointer
  //       example 1: var $array = {fruit1: 'apple', 'fruit2': 'orange'}
  //       example 1: key($array)
  //       returns 1: 'fruit1'

  const state = getPointerState(arr, true)
  if (!state) {
    return false
  }

  const entry = getEntryAtCursor(arr, state.cursor)
  return entry ? entry[0] : false
}
