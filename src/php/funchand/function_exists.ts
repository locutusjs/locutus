import type { PhpAssoc, PhpValue } from '../_helpers/_phpTypes.ts'

export function function_exists(funcName: string): boolean {
  //  discuss at: https://locutus.io/php/function_exists/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Steve Clay
  // improved by: Legaev Andrey
  // improved by: Brett Zamir (https://brett-zamir.me)
  //   example 1: function_exists('isFinite')
  //   returns 1: true

  const $global = (typeof window !== 'undefined' ? window : global) as typeof globalThis & PhpAssoc<PhpValue>
  return typeof $global[funcName] === 'function'
}
