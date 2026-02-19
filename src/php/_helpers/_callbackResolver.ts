import {
  isObjectLike,
  isPhpCallable,
  type PhpCallable,
  type PhpCallableDescriptor,
  type PhpValue,
} from './_phpTypes.ts'

interface CallbackResolverOptions {
  invalidMessage: string
  missingScopeMessage?: (scopeName: string) => string
}

interface ResolvedCallback<TArgs extends PhpValue[] = PhpValue[], TResult = PhpValue> {
  fn: PhpCallable<TArgs, TResult>
  scope: PhpValue
}

export function resolvePhpCallable<TArgs extends PhpValue[] = PhpValue[], TResult = PhpValue>(
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

    let scope: PhpValue
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

export function resolveNumericComparator<TLeft extends PhpValue = PhpValue, TRight extends PhpValue = PhpValue>(
  callback: PhpCallableDescriptor<[TLeft, TRight], PhpValue>,
  invalidMessage: string,
): (left: TLeft, right: TRight) => number {
  const resolved = resolvePhpCallable<[TLeft, TRight], PhpValue>(callback, { invalidMessage })

  return (left: TLeft, right: TRight): number => Number(resolved.fn.apply(resolved.scope, [left, right]))
}
