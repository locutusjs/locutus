import { ensurePhpRuntimeState } from './_phpRuntimeState.ts'
import { entriesOfPhpAssoc, type PhpArrayLike, type PhpList, type PhpValue } from './_phpTypes.ts'

interface PointerState {
  cursor: number
  setCursor: (nextCursor: number) => void
}

const findPointerIndex = (pointers: PhpList<PhpValue>, target: PhpValue): number => {
  for (let index = 0; index < pointers.length; index += 1) {
    if (pointers[index] === target) {
      return index
    }
  }

  return -1
}

export function getPointerState<T>(target: PhpArrayLike<T>, initialize = true): PointerState | null {
  // discuss at: https://locutus.io/php/_helpers/getPointerState/
  //     note 1: Resolves or initializes locutus pointer state for a given array-like target.
  //  example 1: getPointerState(['a'])?.cursor
  //  returns 1: 0
  const runtime = ensurePhpRuntimeState()
  const pointers = runtime.pointers
  const pointerTarget: PhpValue = target

  let index = findPointerIndex(pointers, pointerTarget)
  if (index === -1) {
    if (!initialize) {
      return null
    }
    pointers.push(pointerTarget, 0)
    index = pointers.length - 2
  }

  const cursorValue = pointers[index + 1]
  const cursor = typeof cursorValue === 'number' ? cursorValue : 0

  return {
    cursor,
    setCursor: (nextCursor: number) => {
      pointers[index + 1] = nextCursor
    },
  }
}

export function getArrayLikeLength<T>(target: PhpArrayLike<T>): number {
  if (Array.isArray(target)) {
    return target.length
  }

  let count = 0
  for (const _key in target) {
    count += 1
  }
  return count
}

export function getEntryAtCursor<T>(target: PhpArrayLike<T>, cursor: number): [string | number, T] | null {
  if (cursor < 0) {
    return null
  }

  if (Array.isArray(target)) {
    if (cursor >= target.length) {
      return null
    }

    const value = target[cursor]
    if (typeof value === 'undefined') {
      return null
    }
    return [cursor, value]
  }

  let index = 0
  for (const [key, value] of entriesOfPhpAssoc(target)) {
    if (index === cursor) {
      return [key, value]
    }
    index += 1
  }

  return null
}
