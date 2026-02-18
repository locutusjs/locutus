import type { PhpAssoc } from './_phpTypes.ts'

type UnknownValue = unknown
type PhpValue = {} | null | undefined

interface CallbackResolverOptions {
  invalidMessage: string
  missingScopeMessage?: (scopeName: string) => string
}

type GlobalCallableContext = typeof globalThis & PhpAssoc<PhpValue>

interface ResolvedCallback<TArgs extends UnknownValue[] = UnknownValue[], TResult = PhpValue> {
  fn: (...args: TArgs) => TResult
  scope: PhpValue
}

const isCallable = <TArgs extends UnknownValue[] = UnknownValue[], TResult = PhpValue>(
  value: UnknownValue,
): value is (...args: TArgs) => TResult => typeof value === 'function'

export function resolvePhpCallable<TArgs extends UnknownValue[] = UnknownValue[], TResult = PhpValue>(
  callback: UnknownValue,
  options: CallbackResolverOptions,
): ResolvedCallback<TArgs, TResult> {
  // discuss at: https://locutus.io/php/_helpers/resolvePhpCallable/
  //     note 1: Resolves PHP-style callbacks: function, global name, or [scope, method].
  //  example 1: typeof resolvePhpCallable('isNaN', { invalidMessage: 'x' }).fn
  //  returns 1: 'function'
  const globalContext = globalThis as GlobalCallableContext

  if (isCallable<TArgs, TResult>(callback)) {
    return { fn: callback, scope: null }
  }

  if (typeof callback === 'string') {
    const candidate = globalContext[callback]
    if (isCallable<TArgs, TResult>(candidate)) {
      return { fn: candidate, scope: null }
    }
    throw new Error(options.invalidMessage)
  }

  if (Array.isArray(callback) && callback.length >= 2) {
    const scopeDescriptor = callback[0]
    const callableDescriptor = callback[1]

    let scope: PhpValue
    if (typeof scopeDescriptor === 'string') {
      scope = globalContext[scopeDescriptor]
      if (typeof scope === 'undefined' && options.missingScopeMessage) {
        throw new Error(options.missingScopeMessage(scopeDescriptor))
      }
    } else {
      scope = scopeDescriptor
    }

    if (isCallable<TArgs, TResult>(callableDescriptor)) {
      return { fn: callableDescriptor, scope }
    }

    if (
      typeof callableDescriptor === 'string' &&
      ((typeof scope === 'object' && scope !== null) || typeof scope === 'function')
    ) {
      const candidate = Reflect.get(scope, callableDescriptor)
      if (isCallable<TArgs, TResult>(candidate)) {
        return { fn: candidate, scope }
      }
    }
  }

  throw new Error(options.invalidMessage)
}

export function resolveNumericComparator<TLeft = PhpValue, TRight = PhpValue>(
  callback: UnknownValue,
  invalidMessage: string,
): (left: TLeft, right: TRight) => number {
  const resolved = resolvePhpCallable(callback, { invalidMessage })

  return (left: TLeft, right: TRight): number => Number(resolved.fn.apply(resolved.scope, [left, right]))
}
