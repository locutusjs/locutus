import { _php_cast_int as __php_cast_int } from './_php_cast_int.ts'
import type { PhpInput } from './_phpTypes.ts'

type CastFloatValue = PhpInput

export function _php_cast_float(value: CastFloatValue): number {
  // original by: Rafał Kukawski

  if (typeof value === 'number') {
    return value
  }
  if (typeof value === 'string') {
    return parseFloat(value) || 0
  }

  // PHP docs state, that for types other than string
  // conversion is {input type}->int->float
  return __php_cast_int(value)
}
