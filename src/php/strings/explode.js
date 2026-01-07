module.exports = function explode(delimiter, string, limit) {
  //  discuss at: https://locutus.io/php/explode/
  //    verified: 8.3
  // original by: Kevin van Zonneveld (https://kvz.io)
  //   example 1: explode(' ', 'Kevin van Zonneveld')
  //   returns 1: [ 'Kevin', 'van', 'Zonneveld' ]

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
  delimiter += ''
  string += ''

  const s = string.split(delimiter)

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
    return s.slice(0, limit - 1).concat([s.slice(limit - 1).join(delimiter)])
  }

  // Negative limit
  if (-limit >= s.length) {
    return []
  }

  s.splice(s.length + limit)
  return s
}
