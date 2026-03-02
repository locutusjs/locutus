import type { PhpRuntimeValue } from '../_helpers/_phpTypes.ts'

type EmptyValue = PhpRuntimeValue

export function empty(mixedVar: EmptyValue): boolean {
  //  discuss at: https://locutus.io/php/empty/
  // original by: Philippe Baumann
  //    input by: Onno Marsman (https://twitter.com/onnomarsman)
  //    input by: LH
  //    input by: Stoyan Kyosev (https://www.svest.org/)
  // bugfixed by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Onno Marsman (https://twitter.com/onnomarsman)
  // improved by: Francesco
  // improved by: Marc Jansen
  // improved by: Rafał Kukawski (https://blog.kukawski.pl)
  //   example 1: empty(null)
  //   returns 1: true
  //   example 2: empty(undefined)
  //   returns 2: true
  //   example 3: empty([])
  //   returns 3: true
  //   example 4: empty({})
  //   returns 4: true
  //   example 5: empty({'aFunc' : function () { alert('humpty'); } })
  //   returns 5: false

  const emptyValues: EmptyValue[] = [undefined, null, false, 0, '', '0']

  for (const emptyValue of emptyValues) {
    if (mixedVar === emptyValue) {
      return true
    }
  }

  if (typeof mixedVar === 'object' && mixedVar !== null) {
    for (const key in mixedVar) {
      if (Object.prototype.hasOwnProperty.call(mixedVar, key)) {
        return false
      }
    }
    return true
  }

  return false
}
