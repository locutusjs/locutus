import { getEntryAtCursor, getPointerState } from '../_helpers/_arrayPointers.ts'
import type { PhpArrayLike } from '../_helpers/_phpTypes.ts'

export function prev<T>(arr: PhpArrayLike<T>): T | false {
  //      discuss at: https://locutus.io/php/prev/
  // parity verified: PHP 8.3
  //     original by: Brett Zamir (https://brett-zamir.me)
  //          note 1: Uses global: locutus to store the array pointer
  //       example 1: var $transport = ['foot', 'bike', 'car', 'plane']
  //       example 1: prev($transport)
  //       returns 1: false

  const state = getPointerState(arr, false)
  if (!state || state.cursor === 0) {
    return false
  }

  const previousCursor = state.cursor - 1
  const entry = getEntryAtCursor(arr, previousCursor)
  if (!entry) {
    return false
  }

  state.setCursor(previousCursor)
  return entry[1]
}
