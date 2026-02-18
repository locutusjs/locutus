import { resolvePhpCallable } from '../_helpers/_callbackResolver.ts'
import type { PhpCallableDescriptor, PhpMixed } from '../_helpers/_phpTypes.ts'

export function array_map<TResult = PhpMixed>(
  callback: PhpCallableDescriptor<PhpMixed[], TResult> | null | undefined,
  ...inputArrays: PhpMixed[][]
): TResult[] | PhpMixed[][] {
  //  discuss at: https://locutus.io/php/array_map/
  // original by: Andrea Giammarchi (https://webreflection.blogspot.com)
  // improved by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Brett Zamir (https://brett-zamir.me)
  //    input by: thekid
  //      note 1: If the callback is a string (or object, if an array is supplied),
  //      note 1: it can only work if the function name is in the global context
  //   example 1: array_map( function (a){return (a * a * a)}, [1, 2, 3, 4, 5] )
  //   returns 1: [ 1, 8, 27, 64, 125 ]

  const argc = inputArrays.length + 1
  const itemCount = inputArrays[0]?.length ?? 0

  const resolved =
    callback === null || typeof callback === 'undefined'
      ? null
      : resolvePhpCallable<PhpMixed[], TResult>(callback, {
          invalidMessage: 'array_map(): Invalid callback',
          missingScopeMessage: (scopeName: string) => 'Object not found: ' + scopeName,
        })

  if (resolved) {
    const mapped: TResult[] = []
    for (let itemIndex = 0; itemIndex < itemCount; itemIndex++) {
      const args: PhpMixed[] = []
      for (let arrayIndex = 0; arrayIndex < argc - 1; arrayIndex++) {
        args.push(inputArrays[arrayIndex]?.[itemIndex])
      }
      mapped[itemIndex] = resolved.fn.apply(resolved.scope, args)
    }
    return mapped
  }

  const mapped: PhpMixed[][] = []
  for (let itemIndex = 0; itemIndex < itemCount; itemIndex++) {
    const args: PhpMixed[] = []
    for (let arrayIndex = 0; arrayIndex < argc - 1; arrayIndex++) {
      args.push(inputArrays[arrayIndex]?.[itemIndex])
    }
    mapped[itemIndex] = args
  }

  return mapped
}
