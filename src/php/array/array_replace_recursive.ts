import { isObjectLike, type PhpAssoc, type PhpRuntimeValue, toPhpArrayObject } from '../_helpers/_phpTypes.ts'

interface RecursiveReplaceObject extends PhpAssoc<RecursiveReplaceValue> {}
type RecursiveReplaceValue = PhpRuntimeValue | RecursiveReplaceValue[] | RecursiveReplaceObject
type RecursiveReplaceTarget = RecursiveReplaceValue[] | RecursiveReplaceObject

const cloneReplaceTarget = (value: RecursiveReplaceTarget): RecursiveReplaceTarget => {
  if (Array.isArray(value)) {
    return [...value]
  }

  return { ...value }
}

export function array_replace_recursive(
  arr: RecursiveReplaceTarget,
  ...replacements: [replacement: RecursiveReplaceTarget, ...additionalReplacements: RecursiveReplaceTarget[]]
): RecursiveReplaceTarget {
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
  const retObjLike = toPhpArrayObject<RecursiveReplaceValue>(retObj)
  for (const replacement of replacements) {
    const replacementObj = toPhpArrayObject<RecursiveReplaceValue>(replacement)
    for (const p in replacementObj) {
      if (isObjectLike(retObjLike[p]) && isObjectLike(replacementObj[p])) {
        retObjLike[p] = array_replace_recursive(
          toPhpArrayObject<RecursiveReplaceValue>(retObjLike[p]),
          toPhpArrayObject<RecursiveReplaceValue>(replacementObj[p]),
        )
      } else {
        retObjLike[p] = replacementObj[p]
      }
    }
  }

  return retObj
}
