import { getEntryAtCursor, getPointerState } from '../_helpers/_arrayPointers.ts'
import type { PhpArrayLike } from '../_helpers/_phpTypes.ts'

export function next<T>(arr: PhpArrayLike<T>): T | false {
  //      discuss at: https://locutus.io/php/next/
  // parity verified: PHP 8.3
  //     original by: Brett Zamir (https://brett-zamir.me)
  //          note 1: Uses global: locutus to store the array pointer
  //       example 1: var $transport = ['foot', 'bike', 'car', 'plane']
  //       example 1: next($transport)
  //       example 1: next($transport)
  //       returns 1: 'car'

  const state = getPointerState(arr, true)
  if (!state) {
    return false
  }

  const nextCursor = state.cursor + 1
  const entry = getEntryAtCursor(arr, nextCursor)
  if (!entry) {
    return false
  }

  state.setCursor(nextCursor)
  return entry[1]
}
