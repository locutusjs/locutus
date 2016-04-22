var $global
var $module
if (typeof window !== 'undefined') { /* web page */
  $global = window
} else if (typeof self !== 'undefined') { /* web worker */
  $global = self
} else if (typeof global !== 'undefined') { /* Node.js */
  $global = global
  $global.require = require
} else { /* others (e.g. Nashorn) */
  $global = this
}

if ($global === undefined || $global.Array === undefined) {
  throw new Error('no global object found')
}
if (typeof module !== 'undefined') {
  $module = module
}
