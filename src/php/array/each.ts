import { getEntryAtCursor, getPointerState } from '../_helpers/_arrayPointers.ts'
import type { PhpArrayLike } from '../_helpers/_phpTypes.ts'

interface EachResultObject<T> {
  0: string | number
  1: T
  key: string | number
  value: T
}

type EachResult<T> = [string | number, T] | EachResultObject<T> | false

export function each<T>(arr: PhpArrayLike<T>): EachResult<T> {
  //  discuss at: https://locutus.io/php/each/
  // original by: Ates Goral (https://magnetiq.com)
  //  revised by: Brett Zamir (https://brett-zamir.me)
  //      note 1: Uses global: locutus to store the array pointer
  //   example 1: each({a: "apple", b: "balloon"})
  //   returns 1: {0: "a", 1: "apple", key: "a", value: "apple"}

  const state = getPointerState(arr, true)
  if (!state) {
    return false
  }

  const entry = getEntryAtCursor(arr, state.cursor)
  if (!entry) {
    return false
  }

  state.setCursor(state.cursor + 1)

  const key = entry[0]
  const value = entry[1]
  const returnArrayOnly = Reflect.get(each, 'returnArrayOnly') === true

  if (returnArrayOnly) {
    return [key, value]
  }

  return {
    1: value,
    value,
    0: key,
    key,
  }
}
