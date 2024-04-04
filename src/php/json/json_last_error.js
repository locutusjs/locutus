module.exports = function json_last_error() {
  //  discuss at: https://phpjs.org/functions/json_last_error/
  // original by: Brett Zamir (https://brett-zamir.me)
  //   example 1: json_last_error()
  //   returns 1: 0

  // JSON_ERROR_NONE = 0
  // max depth limit to be removed per PHP comments in json.c (not possible in JS?):
  // JSON_ERROR_DEPTH = 1
  // internal use? also not documented:
  // JSON_ERROR_STATE_MISMATCH = 2
  // [\u0000-\u0008\u000B-\u000C\u000E-\u001F] if used directly within json_decode():
  // JSON_ERROR_CTRL_CHAR = 3
  // but JSON functions auto-escape these, so error not possible in JavaScript
  // JSON_ERROR_SYNTAX = 4

  const $global = typeof window !== 'undefined' ? window : global
  $global.$locutus = $global.$locutus || {}
  const $locutus = $global.$locutus
  $locutus.php = $locutus.php || {}

  return $locutus.php && $locutus.php.last_error_json ? $locutus.php.last_error_json : 0
}
