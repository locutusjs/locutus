export function array_replace(arr: unknown[]): { [key: string]: unknown } {
  //  discuss at: https://locutus.io/php/array_replace/
  // original by: Brett Zamir (https://brett-zamir.me)
  //   example 1: array_replace(["orange", "banana", "apple", "raspberry"], {0 : "pineapple", 4 : "cherry"}, {0:"grape"})
  //   returns 1: {0: 'grape', 1: 'banana', 2: 'apple', 3: 'raspberry', 4: 'cherry'}

  const retObj: { [key: string]: unknown } = {}
  let i = 0
  let p = ''
  const argl = arguments.length

  if (argl < 2) {
    throw new Error('There should be at least 2 arguments passed to array_replace()')
  }

  // Although docs state that the arguments are passed in by reference,
  // it seems they are not altered, but rather the copy that is returned
  // (just guessing), so we make a copy here, instead of acting on arr itself
  for (p in arr) {
    retObj[p] = arr[p]
  }

  for (i = 1; i < argl; i++) {
    const current = arguments[i] as { [key: string]: unknown }
    for (p in current) {
      retObj[p] = current[p]
    }
  }

  return retObj
}
