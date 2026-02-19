import { resolvePhpCallable } from '../_helpers/_callbackResolver.ts'
import type { PhpCallableDescriptor, PhpList, PhpValue } from '../_helpers/_phpTypes.ts'

type ArrayMapInputs = [firstArray: PhpList<PhpValue>, ...restArrays: Array<PhpList<PhpValue>>]
type ArrayMapCallbackArgs1<TValue extends PhpValue> = [TValue | undefined]
type ArrayMapCallbackArgs2<TLeft extends PhpValue, TRight extends PhpValue> = [TLeft | undefined, TRight | undefined]
type ArrayMapCallbackArgsVariadic = Array<PhpValue | undefined>

export function array_map<TValue extends PhpValue, TResult>(
  callback: PhpCallableDescriptor<ArrayMapCallbackArgs1<TValue>, TResult>,
  inputArray: PhpList<TValue>,
): PhpList<TResult>

export function array_map<TLeft extends PhpValue, TRight extends PhpValue, TResult>(
  callback: PhpCallableDescriptor<ArrayMapCallbackArgs2<TLeft, TRight>, TResult>,
  inputArrayLeft: PhpList<TLeft>,
  inputArrayRight: PhpList<TRight>,
): PhpList<TResult>

export function array_map<TValue extends PhpValue>(
  callback: null | undefined,
  inputArray: PhpList<TValue>,
): PhpList<ArrayMapCallbackArgs1<TValue>>

export function array_map<TLeft extends PhpValue, TRight extends PhpValue>(
  callback: null | undefined,
  inputArrayLeft: PhpList<TLeft>,
  inputArrayRight: PhpList<TRight>,
): PhpList<ArrayMapCallbackArgs2<TLeft, TRight>>

export function array_map<TResult = PhpValue>(
  callback: PhpCallableDescriptor<ArrayMapCallbackArgsVariadic, TResult>,
  ...inputArrays: ArrayMapInputs
): PhpList<TResult>

export function array_map(
  callback: null | undefined,
  ...inputArrays: ArrayMapInputs
): PhpList<ArrayMapCallbackArgsVariadic>

export function array_map<TResult = PhpValue>(
  callback: PhpCallableDescriptor<ArrayMapCallbackArgsVariadic, TResult> | null | undefined,
  ...inputArrays: ArrayMapInputs
): PhpList<TResult> | PhpList<ArrayMapCallbackArgsVariadic> {
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
      : resolvePhpCallable<ArrayMapCallbackArgsVariadic, TResult>(callback, {
          invalidMessage: 'array_map(): Invalid callback',
          missingScopeMessage: (scopeName: string) => 'Object not found: ' + scopeName,
        })

  if (resolved) {
    const mapped: PhpList<TResult> = []
    for (let itemIndex = 0; itemIndex < itemCount; itemIndex++) {
      const args: ArrayMapCallbackArgsVariadic = []
      for (let arrayIndex = 0; arrayIndex < argc - 1; arrayIndex++) {
        args.push(inputArrays[arrayIndex]?.[itemIndex])
      }
      mapped[itemIndex] = resolved.fn.apply(resolved.scope, args)
    }
    return mapped
  }

  const mapped: PhpList<ArrayMapCallbackArgsVariadic> = []
  for (let itemIndex = 0; itemIndex < itemCount; itemIndex++) {
    const args: ArrayMapCallbackArgsVariadic = []
    for (let arrayIndex = 0; arrayIndex < argc - 1; arrayIndex++) {
      args.push(inputArrays[arrayIndex]?.[itemIndex])
    }
    mapped[itemIndex] = args
  }

  return mapped
}
