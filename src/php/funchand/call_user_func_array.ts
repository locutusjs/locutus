export function call_user_func_array(cb: unknown, parameters: unknown[]): unknown {
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

  const globalContext = globalThis as typeof globalThis & { [key: string]: unknown }
  let func: unknown
  let scope: unknown = null

  const validJSFunctionNamePattern = /^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/

  if (typeof cb === 'string') {
    if (typeof globalContext[cb] === 'function') {
      func = globalContext[cb]
    } else if (cb.match(validJSFunctionNamePattern)) {
      func = new Function(`return ${cb}`)()
    }
  } else if (Array.isArray(cb)) {
    if (typeof cb[0] === 'string') {
      if (cb[0].match(validJSFunctionNamePattern)) {
        // biome-ignore lint/security/noGlobalEval: needed for PHP port
        func = eval(`${cb[0]}['${cb[1]}']`)
      }
    } else if ((typeof cb[0] === 'object' && cb[0] !== null) || typeof cb[0] === 'function') {
      func = (cb[0] as { [key: string]: unknown })[String(cb[1])]
    }

    if (typeof cb[0] === 'string') {
      if (typeof globalContext[cb[0]] === 'function') {
        scope = globalContext[cb[0]]
      } else if (cb[0].match(validJSFunctionNamePattern)) {
        // biome-ignore lint/security/noGlobalEval: needed for PHP port
        scope = eval(cb[0])
      }
    } else if (typeof cb[0] === 'object') {
      scope = cb[0]
    }
  } else if (typeof cb === 'function') {
    func = cb
  }

  if (typeof func !== 'function') {
    throw new Error(String(func) + ' is not a valid function')
  }

  return (func as (...args: unknown[]) => unknown).apply(scope, parameters)
}
