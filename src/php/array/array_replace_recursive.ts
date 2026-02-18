import { isObjectLike, toPhpArrayObject } from '../_helpers/_phpTypes.ts'

type RecursiveReplaceTarget = unknown[] | { [key: string]: unknown }

const cloneReplaceTarget = (value: unknown): RecursiveReplaceTarget => {
  if (Array.isArray(value)) {
    return [...value]
  }

  return isObjectLike(value) ? { ...toPhpArrayObject(value) } : {}
}

export function array_replace_recursive(arr: unknown, ...replacements: unknown[]): RecursiveReplaceTarget {
  //      discuss at: https://locutus.io/php/array_replace_recursive/
  // parity verified: PHP 8.3
  //     original by: Brett Zamir (https://brett-zamir.me)
  //       example 1: array_replace_recursive({'citrus' : ['orange'], 'berries' : ['blackberry', 'raspberry']}, {'citrus' : ['pineapple'], 'berries' : ['blueberry']})
  //       returns 1: {citrus : ['pineapple'], berries : ['blueberry', 'raspberry']}

  if (replacements.length < 1) {
    throw new Error('There should be at least 2 arguments passed to array_replace_recursive()')
  }

  // Although docs state that the arguments are passed in by reference,
  // it seems they are not altered, but rather the copy that is returned
  // So we make a copy here, instead of acting on arr itself
  const retObj = cloneReplaceTarget(arr)
  const retObjLike = toPhpArrayObject(retObj)
  for (const replacement of replacements) {
    if (!isObjectLike(replacement)) {
      continue
    }
    const replacementObj = toPhpArrayObject(replacement)
    for (const p in replacementObj) {
      if (isObjectLike(retObjLike[p])) {
        retObjLike[p] = array_replace_recursive(retObjLike[p], replacementObj[p])
      } else {
        retObjLike[p] = replacementObj[p]
      }
    }
  }

  return retObj
}
