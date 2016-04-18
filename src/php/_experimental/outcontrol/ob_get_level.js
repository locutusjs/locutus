module.exports = function ob_get_level ()  {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: ob_get_level();
  // *     returns 1: 1

  this.php_js = this.php_js || {};
  var locutus = this.php_js,
      ini = locutus.ini,
      obs = locutus.obs;

  if (!obs || !obs.length) {
    return (ini && ini['output_buffering'] && (typeof ini['output_buffering'].local_value !== 'string' || ini['output_buffering'].local_value.toLowerCase() !== 'off')) ? 1 : 0;
  }
  return obs.length;
}
