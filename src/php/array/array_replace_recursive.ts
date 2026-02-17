export function array_replace_recursive(arr: unknown, ...replacements: unknown[]): unknown {
  //      discuss at: https://locutus.io/php/array_replace_recursive/
  // parity verified: PHP 8.3
  //     original by: Brett Zamir (https://brett-zamir.me)
  //       example 1: array_replace_recursive({'citrus' : ['orange'], 'berries' : ['blackberry', 'raspberry']}, {'citrus' : ['pineapple'], 'berries' : ['blueberry']})
  //       returns 1: {citrus : ['pineapple'], berries : ['blueberry', 'raspberry']}

  let retObj: unknown[] | { [key: string]: unknown }

  if (replacements.length < 1) {
    throw new Error('There should be at least 2 arguments passed to array_replace_recursive()')
  }

  // Although docs state that the arguments are passed in by reference,
  // it seems they are not altered, but rather the copy that is returned
  // So we make a copy here, instead of acting on arr itself
  if (Array.isArray(arr)) {
    retObj = []
    for (const p in arr) {
      retObj.push(arr[p])
    }
  } else {
    retObj = {}
    if (arr && typeof arr === 'object') {
      for (const p in arr as { [key: string]: unknown }) {
        retObj[p] = (arr as { [key: string]: unknown })[p]
      }
    }
  }

  const retObjLike = retObj as { [key: string]: unknown }
  for (const replacement of replacements) {
    if (!replacement || typeof replacement !== 'object') {
      continue
    }
    for (const p in replacement as { [key: string]: unknown }) {
      const replacementObj = replacement as { [key: string]: unknown }
      if (retObjLike[p] && typeof retObjLike[p] === 'object') {
        retObjLike[p] = array_replace_recursive(retObjLike[p], replacementObj[p])
      } else {
        retObjLike[p] = replacementObj[p]
      }
    }
  }

  return retObj
}
