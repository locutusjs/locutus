import { isObjectLike, toPhpArrayObject } from '../_helpers/_phpTypes.ts'

export function array_replace(
  arr: unknown[] | { [key: string]: unknown },
  ...replacements: unknown[]
): {
  [key: string]: unknown
} {
  //  discuss at: https://locutus.io/php/array_replace/
  // original by: Brett Zamir (https://brett-zamir.me)
  //   example 1: array_replace(["orange", "banana", "apple", "raspberry"], {0 : "pineapple", 4 : "cherry"}, {0:"grape"})
  //   returns 1: {0: 'grape', 1: 'banana', 2: 'apple', 3: 'raspberry', 4: 'cherry'}

  const retObj: { [key: string]: unknown } = {}

  if (replacements.length < 1) {
    throw new Error('There should be at least 2 arguments passed to array_replace()')
  }

  // Although docs state that the arguments are passed in by reference,
  // it seems they are not altered, but rather the copy that is returned
  // (just guessing), so we make a copy here, instead of acting on arr itself
  const arrObject = toPhpArrayObject(arr)
  for (const p in arrObject) {
    retObj[p] = arrObject[p]
  }

  for (const replacement of replacements) {
    if (!isObjectLike(replacement)) {
      continue
    }
    const current = toPhpArrayObject(replacement)
    for (const p in current) {
      retObj[p] = current[p]
    }
  }

  return retObj
}
