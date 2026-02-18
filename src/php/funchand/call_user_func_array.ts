import { resolvePhpCallable } from '../_helpers/_callbackResolver.ts'
import { isObjectLike, type PhpAssoc, type PhpCallable } from '../_helpers/_phpTypes.ts'

type PhpValue = {} | null | undefined
type GlobalCallableContext = typeof globalThis & PhpAssoc<PhpValue>

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

  const globalContext = globalThis as GlobalCallableContext
  let func: PhpCallable | undefined
  let scope: PhpValue = null

  try {
    const resolved = resolvePhpCallable(cb, { invalidMessage: 'invalid' })
    func = resolved.fn
    scope = resolved.scope
  } catch {
    // Fall back to PHP-compatible eval/new Function paths below.
  }

  if (!func && typeof cb === 'string') {
    if (typeof globalContext[cb] === 'function') {
      func = globalContext[cb] as PhpCallable
    } else if (cb.match(validJSFunctionNamePattern)) {
      const dynamicFn = new Function(`return ${cb}`)()
      if (typeof dynamicFn === 'function') {
        func = dynamicFn as PhpCallable
      }
    }
  } else if (!func && Array.isArray(cb)) {
    if (typeof cb[0] === 'string') {
      if (cb[0].match(validJSFunctionNamePattern)) {
        // biome-ignore lint/security/noGlobalEval: needed for PHP port
        const dynamicFn = eval(`${cb[0]}['${cb[1]}']`)
        if (typeof dynamicFn === 'function') {
          func = dynamicFn as PhpCallable
        }
      }
    } else if (isObjectLike(cb[0]) || typeof cb[0] === 'function') {
      const method = Reflect.get(cb[0], String(cb[1]))
      if (typeof method === 'function') {
        func = method as PhpCallable
      }
    }

    if (typeof cb[0] === 'string') {
      if (typeof globalContext[cb[0]] === 'function') {
        scope = globalContext[cb[0]]
      } else if (cb[0].match(validJSFunctionNamePattern)) {
        // biome-ignore lint/security/noGlobalEval: needed for PHP port
        scope = eval(cb[0])
      }
    } else if (isObjectLike(cb[0])) {
      scope = cb[0]
    }
  } else if (!func && typeof cb === 'function') {
    func = cb as PhpCallable
  }

  if (!func) {
    throw new Error(String(cb) + ' is not a valid function')
  }

  return func.apply(scope, parameters) as TResult
}
