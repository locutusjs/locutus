module.exports = function get_defined_functions() {
  //  discuss at: https://locutus.io/php/get_defined_functions/
  //    verified: 8.3
  // original by: Brett Zamir (https://brett-zamir.me)
  // improved by: Brett Zamir (https://brett-zamir.me)
  //      note 1: Returns an array of global function names. Unlike PHP,
  //      note 1: JavaScript doesn't distinguish between user and internal functions.
  //   example 1: var $funcs = get_defined_functions()
  //   example 1: var $result = Array.isArray($funcs) && $funcs.length > 0
  //   returns 1: true

  const $global = typeof window !== 'undefined' ? window : global
  $global.$locutus = $global.$locutus || {}
  const $locutus = $global.$locutus
  $locutus.php = $locutus.php || {}

  let i = ''
  const arr = []
  const already = {}

  for (i in $global) {
    try {
      if (typeof $global[i] === 'function') {
        if (!already[i]) {
          already[i] = 1
          arr.push(i)
        }
      } else if (typeof $global[i] === 'object') {
        for (const j in $global[i]) {
          if (typeof $global[j] === 'function' && $global[j] && !already[j]) {
            already[j] = 1
            arr.push(j)
          }
        }
      }
    } catch (_e) {
      // Some objects in Firefox throw exceptions when their
      // properties are accessed (e.g., sessionStorage)
    }
  }

  return arr
}
