import {
  isObjectLike,
  isPhpCallable,
  type NumericLike,
  type PhpCallable,
  type PhpCallableArgs,
  type PhpCallableDescriptor,
} from './_phpTypes.ts'

type CallbackValue = {} | null | undefined

interface CallbackResolverOptions {
  invalidMessage: string
  missingScopeMessage?: (scopeName: string) => string
}

interface ResolvedCallback<TArgs extends PhpCallableArgs = PhpCallableArgs, TResult = CallbackValue> {
  fn: PhpCallable<TArgs, TResult>
  scope: CallbackValue
}

export function resolvePhpCallable<TArgs extends PhpCallableArgs = PhpCallableArgs, TResult = CallbackValue>(
  callback: PhpCallableDescriptor<TArgs, TResult>,
  options: CallbackResolverOptions,
): ResolvedCallback<TArgs, TResult> {
  // discuss at: https://locutus.io/php/_helpers/resolvePhpCallable/
  //     note 1: Resolves PHP-style callbacks: function, global name, or [scope, method].
  //  example 1: typeof resolvePhpCallable('isNaN', { invalidMessage: 'x' }).fn
  //  returns 1: 'function'
  if (isPhpCallable<TArgs, TResult>(callback)) {
    return { fn: callback, scope: null }
  }

  if (typeof callback === 'string') {
    const candidate = Reflect.get(globalThis, callback)
    if (isPhpCallable<TArgs, TResult>(candidate)) {
      return { fn: candidate, scope: null }
    }
    throw new Error(options.invalidMessage)
  }

  if (Array.isArray(callback) && callback.length >= 2) {
    const scopeDescriptor = callback[0]
    const callableDescriptor = callback[1]

    let scope: CallbackValue
    if (typeof scopeDescriptor === 'string') {
      scope = Reflect.get(globalThis, scopeDescriptor)
      if (typeof scope === 'undefined' && options.missingScopeMessage) {
        throw new Error(options.missingScopeMessage(scopeDescriptor))
      }
    } else {
      scope = scopeDescriptor
    }

    if (isPhpCallable<TArgs, TResult>(callableDescriptor)) {
      return { fn: callableDescriptor, scope }
    }

    if (typeof callableDescriptor === 'string' && (isObjectLike(scope) || typeof scope === 'function')) {
      const candidate = Reflect.get(scope, callableDescriptor)
      if (isPhpCallable<TArgs, TResult>(candidate)) {
        return { fn: candidate, scope }
      }
    }
  }

  throw new Error(options.invalidMessage)
}

export function resolveNumericComparator<
  TLeft extends CallbackValue = CallbackValue,
  TRight extends CallbackValue = CallbackValue,
>(
  callback: PhpCallableDescriptor<[TLeft, TRight], NumericLike>,
  invalidMessage: string,
): (left: TLeft, right: TRight) => number {
  const resolved = resolvePhpCallable<[TLeft, TRight], NumericLike>(callback, { invalidMessage })

  return (left: TLeft, right: TRight): number => Number(resolved.fn.apply(resolved.scope, [left, right]))
}
