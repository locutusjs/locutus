module.exports = function array_fill_keys (keys, value) { // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/array_fill_keys/
  // original by: Brett Zamir (https://brett-zamir.me)
  // bugfixed by: Brett Zamir (https://brett-zamir.me)
  //   example 1: var $keys = {'a': 'foo', 2: 5, 3: 10, 4: 'bar'}
  //   example 1: array_fill_keys($keys, 'banana')
  //   returns 1: {"foo": "banana", 5: "banana", 10: "banana", "bar": "banana"}

  const retObj = {}
  let key = ''

  for (key in keys) {
    retObj[keys[key]] = value
  }

  return retObj
}
