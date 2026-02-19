import { ensurePhpRuntimeState, getPhpGlobalScope } from '../_helpers/_phpRuntimeState.ts'
import { toPhpArrayObject } from '../_helpers/_phpTypes.ts'

export function get_defined_functions(): string[] {
  //      discuss at: https://locutus.io/php/get_defined_functions/
  // parity verified: PHP 8.3
  //     original by: Brett Zamir (https://brett-zamir.me)
  //     improved by: Brett Zamir (https://brett-zamir.me)
  //          note 1: Returns an array of global function names. Unlike PHP,
  //          note 1: JavaScript doesn't distinguish between user and internal functions.
  //       example 1: var $funcs = get_defined_functions()
  //       example 1: var $result = Array.isArray($funcs) && $funcs.length > 0
  //       returns 1: true

  ensurePhpRuntimeState()

  const arr: string[] = []
  const already: Record<string, 1> = {}
  const globalScope = getPhpGlobalScope()

  for (const i in globalScope) {
    try {
      const topLevelValue = globalScope[i]
      if (typeof topLevelValue === 'function') {
        if (!already[i]) {
          already[i] = 1
          arr.push(i)
        }
      } else if (typeof topLevelValue === 'object' && topLevelValue !== null) {
        const nestedObject = toPhpArrayObject(topLevelValue)
        for (const j in nestedObject) {
          if (typeof nestedObject[j] === 'function' && !already[j]) {
            already[j] = 1
            arr.push(j)
          }
        }
      }
    } catch (_e) {
      // Some objects in Firefox throw exceptions when their
      // properties are accessed (e.g., sessionStorage)
    }
  }

  return arr
}
