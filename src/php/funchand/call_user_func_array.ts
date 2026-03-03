import { resolvePhpCallable } from '../_helpers/_callbackResolver.ts'
import { getPhpGlobalEntry, getPhpObjectEntry } from '../_helpers/_phpRuntimeState.ts'
import {
  isObjectLike,
  isPhpCallable,
  type PhpCallable,
  type PhpCallableArgs,
  type PhpCallableDescriptor,
  type PhpRuntimeValue,
} from '../_helpers/_phpTypes.ts'

type FunctionValue = PhpRuntimeValue
type FunctionScope = FunctionValue | object

export function call_user_func_array<TResult = FunctionValue, TArgs extends PhpCallableArgs = PhpCallableArgs>(
  cb: PhpCallableDescriptor<TArgs, TResult>,
  parameters: [...TArgs],
): TResult {
  //  discuss at: https://locutus.io/php/call_user_func_array/
  // original by: Thiago Mata (https://thiagomata.blog.com)
  //  revised by: Jon Hohle
  // improved by: Brett Zamir (https://brett-zamir.me)
  // improved by: Diplom@t (https://difane.com/)
  // improved by: Brett Zamir (https://brett-zamir.me)
  //      note 1: Callback resolution intentionally avoids eval/new Function for security.
  //   example 1: call_user_func_array('isNaN', ['a'])
  //   returns 1: true
  //   example 2: call_user_func_array('isNaN', [1])
  //   returns 2: false

  let func: PhpCallable<TArgs, TResult> | undefined
  let scope: FunctionScope = null

  try {
    const resolved = resolvePhpCallable<TArgs, TResult>(cb, { invalidMessage: 'invalid' })
    func = resolved.fn
    scope = resolved.scope
  } catch {
    // Fall back to legacy-compatible callback resolution paths below.
  }

  if (!func && typeof cb === 'string') {
    const globalCandidate = getPhpGlobalEntry(cb)
    if (isPhpCallable<TArgs, TResult>(globalCandidate)) {
      func = globalCandidate
    }
  } else if (!func && Array.isArray(cb)) {
    if (typeof cb[0] === 'string') {
      const globalScope = getPhpGlobalEntry(cb[0])
      if (isObjectLike(globalScope) || typeof globalScope === 'function') {
        const method = getPhpObjectEntry(globalScope, String(cb[1]))
        if (isPhpCallable<TArgs, TResult>(method)) {
          func = method
        }
        scope = globalScope
      }
    } else if (isObjectLike(cb[0]) || typeof cb[0] === 'function') {
      const method = getPhpObjectEntry(cb[0], String(cb[1]))
      if (isPhpCallable<TArgs, TResult>(method)) {
        func = method
      }
      scope = cb[0]
    }
  } else if (!func && isPhpCallable<TArgs, TResult>(cb)) {
    func = cb
  }

  if (!func) {
    throw new Error(String(cb) + ' is not a valid function')
  }

  return func.apply(scope, parameters)
}
