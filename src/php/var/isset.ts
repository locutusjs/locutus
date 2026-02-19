import type { PhpInput } from '../_helpers/_phpTypes.ts'

type IssetValue = PhpInput

export function isset(...values: IssetValue[]): boolean {
  //  discuss at: https://locutus.io/php/isset/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // improved by: FremyCompany
  // improved by: Onno Marsman (https://twitter.com/onnomarsman)
  // improved by: Rafał Kukawski (https://blog.kukawski.pl)
  //   example 1: isset( undefined, true)
  //   returns 1: false
  //   example 2: isset( 'Kevin van Zonneveld' )
  //   returns 2: true

  if (values.length === 0) {
    throw new Error('Empty isset')
  }

  for (const value of values) {
    if (typeof value === 'undefined' || value === null) {
      return false
    }
  }

  return true
}
