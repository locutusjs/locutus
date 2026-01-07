module.exports = function ini_set(varname, newvalue) {
  //      discuss at: https://locutus.io/php/ini_set/
  // parity verified: PHP 8.3
  //     original by: Brett Zamir (https://brett-zamir.me)
  //          note 1: This will not set a global_value or access level for the ini item
  //       example 1: ini_set('date.timezone', 'Asia/Hong_Kong')
  //       example 1: ini_set('date.timezone', 'America/Chicago')
  //       returns 1: 'Asia/Hong_Kong'

  const $global = typeof window !== 'undefined' ? window : global
  $global.$locutus = $global.$locutus || {}
  const $locutus = $global.$locutus
  $locutus.php = $locutus.php || {}
  $locutus.php.ini = $locutus.php.ini || {}

  $locutus.php.ini = $locutus.php.ini || {}
  $locutus.php.ini[varname] = $locutus.php.ini[varname] || {}

  const oldval = $locutus.php.ini[varname].local_value

  const lowerStr = (newvalue + '').toLowerCase().trim()
  if (newvalue === true || lowerStr === 'on' || lowerStr === '1') {
    newvalue = 'on'
  }
  if (newvalue === false || lowerStr === 'off' || lowerStr === '0') {
    newvalue = 'off'
  }

  const _setArr = function (oldval) {
    // Although these are set individually, they are all accumulated
    if (typeof oldval === 'undefined') {
      $locutus.ini[varname].local_value = []
    }
    $locutus.ini[varname].local_value.push(newvalue)
  }

  switch (varname) {
    case 'extension':
      _setArr(oldval, newvalue)
      break
    default:
      $locutus.php.ini[varname].local_value = newvalue
      break
  }

  return oldval
}
