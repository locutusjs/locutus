import { resolvePhpCallable } from '../_helpers/_callbackResolver.ts'
import type { PhpCallableDescriptor, PhpMixed } from '../_helpers/_phpTypes.ts'

type ArrayMapInputs = [firstArray: PhpMixed[], ...restArrays: PhpMixed[][]]
type ArrayMapCallbackArgs1<TValue extends PhpMixed> = [TValue | undefined]
type ArrayMapCallbackArgs2<TLeft extends PhpMixed, TRight extends PhpMixed> = [TLeft | undefined, TRight | undefined]

export function array_map<TValue extends PhpMixed, TResult>(
  callback: PhpCallableDescriptor<ArrayMapCallbackArgs1<TValue>, TResult>,
  inputArray: TValue[],
): TResult[]

export function array_map<TLeft extends PhpMixed, TRight extends PhpMixed, TResult>(
  callback: PhpCallableDescriptor<ArrayMapCallbackArgs2<TLeft, TRight>, TResult>,
  inputArrayLeft: TLeft[],
  inputArrayRight: TRight[],
): TResult[]

export function array_map<TValue extends PhpMixed>(
  callback: null | undefined,
  inputArray: TValue[],
): ArrayMapCallbackArgs1<TValue>[]

export function array_map<TLeft extends PhpMixed, TRight extends PhpMixed>(
  callback: null | undefined,
  inputArrayLeft: TLeft[],
  inputArrayRight: TRight[],
): ArrayMapCallbackArgs2<TLeft, TRight>[]

export function array_map<TResult = PhpMixed>(
  callback: PhpCallableDescriptor<PhpMixed[], TResult>,
  ...inputArrays: ArrayMapInputs
): TResult[]

export function array_map(callback: null | undefined, ...inputArrays: ArrayMapInputs): PhpMixed[][]

export function array_map<TResult = PhpMixed>(
  callback: PhpCallableDescriptor<PhpMixed[], TResult> | null | undefined,
  ...inputArrays: ArrayMapInputs
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
