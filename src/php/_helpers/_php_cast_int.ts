import type { PhpInput } from './_phpTypes.ts'

type CastIntValue = PhpInput

export function _php_cast_int(value: CastIntValue): number {
  // original by: Rafał Kukawski

  if (typeof value === 'number') {
    if (isNaN(value) || !isFinite(value)) {
      // from PHP 7, NaN and Infinity are casted to 0
      return 0
    }

    return value < 0 ? Math.ceil(value) : Math.floor(value)
  }
  if (typeof value === 'string') {
    return parseInt(value, 10) || 0
  }

  // Behaviour for types other than float, string, boolean
  // is undefined and can change any time.
  // To not invent complex logic
  // that mimics PHP 7.0 behaviour
  // casting value->bool->number is used
  return +!!value
}
