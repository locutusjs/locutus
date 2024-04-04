module.exports = function function_exists(funcName) {
  //  discuss at: https://locutus.io/php/function_exists/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Steve Clay
  // improved by: Legaev Andrey
  // improved by: Brett Zamir (https://brett-zamir.me)
  //   example 1: function_exists('isFinite')
  //   returns 1: true
  //        test: skip-1

  const $global = typeof window !== 'undefined' ? window : global

  if (typeof funcName === 'string') {
    funcName = $global[funcName]
  }

  return typeof funcName === 'function'
}
