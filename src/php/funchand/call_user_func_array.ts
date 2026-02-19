import { resolvePhpCallable } from '../_helpers/_callbackResolver.ts'
import { isObjectLike, isPhpCallable, type PhpCallable, type PhpValue } from '../_helpers/_phpTypes.ts'

const validJSFunctionNamePattern = /^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/

export function call_user_func_array<TResult = PhpValue, TArgs extends PhpValue[] = PhpValue[]>(
  cb: PhpValue,
  parameters: [...TArgs],
): TResult {
  //  discuss at: https://locutus.io/php/call_user_func_array/
  // original by: Thiago Mata (https://thiagomata.blog.com)
  //  revised by: Jon Hohle
  // improved by: Brett Zamir (https://brett-zamir.me)
  // improved by: Diplom@t (https://difane.com/)
  // improved by: Brett Zamir (https://brett-zamir.me)
  //      note 1: Depending on the `cb` that is passed,
  //      note 1: this function can use `eval` and/or `new Function`.
  //      note 1: The `eval` input is however checked to only allow valid function names,
  //      note 1: So it should not be unsafer than uses without eval (seeing as you can)
  //      note 1: already pass any function to be executed here.
  //   example 1: call_user_func_array('isNaN', ['a'])
  //   returns 1: true
  //   example 2: call_user_func_array('isNaN', [1])
  //   returns 2: false

  let func: PhpCallable<TArgs, TResult> | undefined
  let scope: PhpValue = null

  try {
    const resolved = resolvePhpCallable<TArgs, TResult>(cb, { invalidMessage: 'invalid' })
    func = resolved.fn
    scope = resolved.scope
  } catch {
    // Fall back to PHP-compatible eval/new Function paths below.
  }

  if (!func && typeof cb === 'string') {
    const globalCandidate = Reflect.get(globalThis, cb)
    if (isPhpCallable<TArgs, TResult>(globalCandidate)) {
      func = globalCandidate
    } else if (cb.match(validJSFunctionNamePattern)) {
      const dynamicFn = new Function(`return ${cb}`)()
      if (isPhpCallable<TArgs, TResult>(dynamicFn)) {
        func = dynamicFn
      }
    }
  } else if (!func && Array.isArray(cb)) {
    if (typeof cb[0] === 'string') {
      if (cb[0].match(validJSFunctionNamePattern)) {
        // biome-ignore lint/security/noGlobalEval: needed for PHP port
        const dynamicFn = eval(`${cb[0]}['${cb[1]}']`)
        if (isPhpCallable<TArgs, TResult>(dynamicFn)) {
          func = dynamicFn
        }
      }
    } else if (isObjectLike(cb[0]) || typeof cb[0] === 'function') {
      const method = Reflect.get(cb[0], String(cb[1]))
      if (isPhpCallable<TArgs, TResult>(method)) {
        func = method
      }
    }

    if (typeof cb[0] === 'string') {
      const globalScope = Reflect.get(globalThis, cb[0])
      if (typeof globalScope === 'function') {
        scope = globalScope
      } else if (cb[0].match(validJSFunctionNamePattern)) {
        // biome-ignore lint/security/noGlobalEval: needed for PHP port
        scope = eval(cb[0])
      }
    } else if (isObjectLike(cb[0])) {
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
