module.exports = function _php_cast_string (value) {
  // original by: Rafał Kukawski
  //   example 1: _php_cast_string(true)
  //   returns 1: '1'
  //   example 2: _php_cast_string(false)
  //   returns 2: ''
  //   example 3: _php_cast_string('foo')
  //   returns 3: 'foo'
  //   example 4: _php_cast_string(0/0)
  //   returns 4: 'NAN'
  //   example 5: _php_cast_string(1/0)
  //   returns 5: 'INF'
  //   example 6: _php_cast_string(-1/0)
  //   returns 6: '-INF'
  //   example 7: _php_cast_string(null)
  //   returns 7: ''
  //   example 8: _php_cast_string(undefined)
  //   returns 8: ''
  //   example 9: _php_cast_string([])
  //   returns 9: 'Array'
  //   example 10: _php_cast_string({})
  //   returns 10: 'Object'
  //   example 11: _php_cast_string(0)
  //   returns 11: '0'
  //   example 12: _php_cast_string(1)
  //   returns 12: '1'
  //   example 13: _php_cast_string(3.14)
  //   returns 13: '3.14'

  var type = typeof value;

  switch (type) {
  case 'boolean':
    return value ? '1' : ''
  case 'string':
    return value
  case 'number':
    if (isNaN(value)) {
      return 'NAN'
    }

    if (!isFinite(value)) {
      return (value < 0 ? '-' : '') + 'INF'
    }

    return value + ''
  case 'undefined':
    return ''
  case 'object':
    if (Array.isArray(value)) {
      return 'Array'
    }

    if (value !== null) {
      return 'Object'
    }

    return ''
  case 'function':
    // fall through
  default:
    throw new Error('Unsupported value type')
  }
}
