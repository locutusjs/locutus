import { type PhpArrayLike, toPhpArrayObject } from '../_helpers/_phpTypes.ts'

export function array_push<TValue>(inputArr: PhpArrayLike<TValue>, ...values: TValue[]): number {
  //  discuss at: https://locutus.io/php/array_push/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Brett Zamir (https://brett-zamir.me)
  //      note 1: Note also that IE retains information about property position even
  //      note 1: after being supposedly deleted, so if you delete properties and then
  //      note 1: add back properties with the same keys (including numeric) that had
  //      note 1: been deleted, the order will be as before; thus, this function is not
  //      note 1: really recommended with associative arrays (objects) in IE environments
  //   example 1: array_push(['kevin','van'], 'zonneveld')
  //   returns 1: 3

  const allDigits = /^\d+$/
  let size = 0
  let highestIdx = 0
  let len = 0

  if (Array.isArray(inputArr)) {
    for (const value of values) {
      inputArr[inputArr.length] = value
    }
    return inputArr.length
  }

  // Associative (object)
  const target = toPhpArrayObject<TValue>(inputArr)
  const hasOwn = Object.prototype.hasOwnProperty
  for (const pr in target) {
    if (hasOwn.call(target, pr)) {
      ++len
      if (pr.search(allDigits) !== -1) {
        size = parseInt(pr, 10)
        highestIdx = size > highestIdx ? size : highestIdx
      }
    }
  }
  for (const value of values) {
    target[++highestIdx] = value
  }

  return len + values.length
}
