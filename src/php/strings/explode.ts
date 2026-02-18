type KeyedValues = { [key: string]: unknown }

export function explode(
  delimiter: string | boolean | null | undefined,
  string: string | KeyedValues | (() => unknown) | undefined,
  limit?: number,
): string[] | false | { 0: string } | null {
  //      discuss at: https://locutus.io/php/explode/
  // parity verified: PHP 8.3
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: explode(' ', 'Kevin van Zonneveld')
  //       returns 1: [ 'Kevin', 'van', 'Zonneveld' ]

  if (arguments.length < 2 || typeof delimiter === 'undefined' || typeof string === 'undefined') {
    return null
  }
  if (delimiter === '' || delimiter === false || delimiter === null) {
    return false
  }
  if (
    typeof delimiter === 'function' ||
    typeof delimiter === 'object' ||
    typeof string === 'function' ||
    typeof string === 'object'
  ) {
    return {
      0: '',
    }
  }
  if (delimiter === true) {
    delimiter = '1'
  }

  // Here we go...
  const normalizedDelimiter = delimiter + ''
  const normalizedString = string + ''

  const s = normalizedString.split(normalizedDelimiter)

  if (typeof limit === 'undefined') {
    return s
  }

  // Support for limit
  if (limit === 0) {
    limit = 1
  }

  // Positive limit
  if (limit > 0) {
    if (limit >= s.length) {
      return s
    }
    return s.slice(0, limit - 1).concat([s.slice(limit - 1).join(normalizedDelimiter)])
  }

  // Negative limit
  if (-limit >= s.length) {
    return []
  }

  s.splice(s.length + limit)
  return s
}
