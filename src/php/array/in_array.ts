export function in_array(needle: unknown, haystack: unknown[] | Record<string, unknown>, argStrict?: boolean): boolean {
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
  const entries = haystack as Record<string, unknown>

  // we prevent the double check (strict && arr[key] === ndl) || (!strict && arr[key] === ndl)
  // in just one for, in order to improve the performance
  // deciding wich type of comparation will do before walk array
  if (strict) {
    for (const key in entries) {
      if (entries[key] === needle) {
        return true
      }
    }
  } else {
    for (const key in entries) {
      // biome-ignore lint/suspicious/noDoubleEquals: non-strict comparison intended
      if (entries[key] == needle) {
        return true
      }
    }
  }

  return false
}
