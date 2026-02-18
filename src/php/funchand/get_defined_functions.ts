import { toPhpArrayObject } from '../_helpers/_phpTypes.ts'

type GlobalWithLocutus = typeof globalThis & {
  [key: string]: unknown
  $locutus?: { php?: { [key: string]: unknown } }
}

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

  const globalContext = globalThis as GlobalWithLocutus
  globalContext.$locutus = globalContext.$locutus ?? {}
  const locutus = globalContext.$locutus
  locutus.php = locutus.php ?? {}

  const arr: string[] = []
  const already: Record<string, 1> = {}

  for (const i in globalContext) {
    try {
      if (typeof globalContext[i] === 'function') {
        if (!already[i]) {
          already[i] = 1
          arr.push(i)
        }
      } else if (typeof globalContext[i] === 'object' && globalContext[i] !== null) {
        const nestedObject = toPhpArrayObject(globalContext[i])
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
