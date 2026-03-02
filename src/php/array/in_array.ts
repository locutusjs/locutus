import type { PhpArrayLike, PhpRuntimeValue } from '../_helpers/_phpTypes.ts'

type InArrayValue = PhpRuntimeValue

export function in_array<TNeedle extends InArrayValue>(
  needle: TNeedle,
  haystack: PhpArrayLike<TNeedle>,
  argStrict: true,
): boolean

export function in_array(needle: InArrayValue, haystack: PhpArrayLike<InArrayValue>, argStrict?: boolean): boolean

export function in_array(needle: InArrayValue, haystack: PhpArrayLike<InArrayValue>, argStrict?: boolean): boolean {
  //  discuss at: https://locutus.io/php/in_array/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // improved by: vlado houba
  // improved by: Jonas Sciangula Street (Joni2Back)
  //    input by: Billy
  // bugfixed by: Brett Zamir (https://brett-zamir.me)
  //   example 1: in_array('van', ['Kevin', 'van', 'Zonneveld'])
  //   returns 1: true
  //   example 2: in_array('vlado', {0: 'Kevin', vlado: 'van', 1: 'Zonneveld'})
  //   returns 2: false
  //   example 3: in_array(1, ['1', '2', '3'])
  //   example 3: in_array(1, ['1', '2', '3'], false)
  //   returns 3: true
  //   returns 3: true
  //   example 4: in_array(1, ['1', '2', '3'], true)
  //   returns 4: false

  const strict = !!argStrict

  // we prevent the double check (strict && arr[key] === ndl) || (!strict && arr[key] === ndl)
  // in just one for, in order to improve the performance
  // deciding wich type of comparation will do before walk array
  if (Array.isArray(haystack)) {
    if (strict) {
      for (const key in haystack) {
        if (haystack[Number(key)] === needle) {
          return true
        }
      }
    } else {
      for (const key in haystack) {
        // biome-ignore lint/suspicious/noDoubleEquals: non-strict comparison intended
        if (haystack[Number(key)] == needle) {
          return true
        }
      }
    }
  } else if (strict) {
    for (const key in haystack) {
      if (haystack[key] === needle) {
        return true
      }
    }
  } else {
    for (const key in haystack) {
      // biome-ignore lint/suspicious/noDoubleEquals: non-strict comparison intended
      if (haystack[key] == needle) {
        return true
      }
    }
  }

  return false
}
