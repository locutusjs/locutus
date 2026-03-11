import type { PhpAssoc } from '../_helpers/_phpTypes.ts'

type ArrayValuesInput = object | string | number | boolean | bigint | null | undefined

const isBoxedScalar = (value: ArrayValuesInput): value is String | Number | Boolean => {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const objectTag = Object.prototype.toString.call(value)
  return objectTag === '[object String]' || objectTag === '[object Number]' || objectTag === '[object Boolean]'
}

const describeArrayValuesArgument = (value: ArrayValuesInput): string => {
  if (typeof value === 'string') {
    return 'string'
  }

  if (typeof value === 'boolean') {
    return 'bool'
  }

  if (typeof value === 'number') {
    return Number.isInteger(value) ? 'int' : 'float'
  }

  if (typeof value === 'bigint') {
    return 'int'
  }

  if (typeof value === 'undefined' || value === null) {
    return 'null'
  }

  if (typeof value === 'object') {
    const objectTag = Object.prototype.toString.call(value)

    if (objectTag === '[object String]') {
      return 'string'
    }

    if (objectTag === '[object Number]') {
      return Number.isInteger(Number(value.valueOf())) ? 'int' : 'float'
    }

    if (objectTag === '[object Boolean]') {
      return 'bool'
    }

    return 'object'
  }

  return typeof value
}

export function array_values<T>(input: T[] | PhpAssoc<T>): T[] {
  //      discuss at: https://locutus.io/php/array_values/
  // parity verified: PHP 8.3
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //     improved by: Brett Zamir (https://brett-zamir.me)
  //       example 1: array_values( {firstname: 'Kevin', surname: 'van Zonneveld'} )
  //       returns 1: [ 'Kevin', 'van Zonneveld' ]

  if (typeof input !== 'object' || input === null || isBoxedScalar(input)) {
    throw new TypeError(
      `array_values(): Argument #1 ($array) must be of type array, ${describeArrayValuesArgument(input)} given`,
    )
  }

  return Object.values(input)
}
