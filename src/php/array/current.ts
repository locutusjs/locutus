import { getEntryAtCursor, getPointerState } from '../_helpers/_arrayPointers.ts'
import type { PhpArrayLike } from '../_helpers/_phpTypes.ts'

export function current<T>(arr: PhpArrayLike<T>): T | false {
  //      discuss at: https://locutus.io/php/current/
  // parity verified: PHP 8.3
  //     original by: Brett Zamir (https://brett-zamir.me)
  //          note 1: Uses global: locutus to store the array pointer
  //       example 1: var $transport = ['foot', 'bike', 'car', 'plane']
  //       example 1: current($transport)
  //       returns 1: 'foot'

  const state = getPointerState(arr, true)
  if (!state) {
    return false
  }

  const entry = getEntryAtCursor(arr, state.cursor)
  return entry ? entry[1] : false
}
