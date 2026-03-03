import type { PhpInput } from './_phpTypes.ts'

type CastStringValue = PhpInput

export function _phpCastString(value: CastStringValue): string {
  // original by: Rafał Kukawski

  if (typeof value === 'boolean') {
    return value ? '1' : ''
  }
  if (typeof value === 'string') {
    return value
  }
  if (typeof value === 'number') {
    if (isNaN(value)) {
      return 'NAN'
    }

    if (!isFinite(value)) {
      return (value < 0 ? '-' : '') + 'INF'
    }

    return value + ''
  }
  if (typeof value === 'undefined') {
    return ''
  }
  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      return 'Array'
    }

    if (value !== null) {
      return 'Object'
    }

    return ''
  }

  throw new Error('Unsupported value type')
}
