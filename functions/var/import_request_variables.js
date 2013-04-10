function import_request_variables (types, prefix) {
  // http://kevin.vanzonneveld.net
  // +      original by: Jalal Berrami
  // + reimplemented by: Brett Zamir (http://brett-zamir.me)
  // + improved by: Brett Zamir (http://brett-zamir.me)
  // %          note 1: IMPORTANT: You must sanitize user variables passed in via URL in JavaScript as in PHP,
  // %          note 1: especially if you want to use any of these variables in an eval()-like function (not recommended)!
  // *        example 1: document.cookie = 'snack=yummy';
  // *        example 1: import_request_variables('gc', 'pr_');
  // *        results 1: pr_snack == 'yummy'
  // *        example 2: ini_set('phpjs.getVarsObj', $_GET = {}); // Only works in PHP.JS, not PHP (!), though by using ini_set(), it does work as though PHP.JS were an extension to PHP
  // *        example 2: import_request_variables('g'); // Allows $_GET['myRequestVar'] access to query string variables

  var i = 0,
    current = '',
    url = '',
    vars = '',
    arrayBracketPos = -1,
    arrName = '',
    win = this.window,
    requestObj = this.window,
    getObj = false,
    cookieObj = false;
  prefix = prefix || '';

  var that = this;
  var _ini_get = function (ini) {
    if (that.php_js && that.php_js.ini && that.php_js.ini[ini] && that.php_js.ini[ini].local_value) { // Allow designated object to be used instead of window
      return that.php_js.ini[ini].local_value;
    }
    return false;
  };

  requestObj = _ini_get('phpjs.requestVarsObj') || requestObj;
  if (/g/i.test(types)) { // GET
    getObj = _ini_get('phpjs.getVarsObj') || getObj;
    for (i = 0, url = win.location.href, vars = url.substring(url.lastIndexOf('?') + 1, url.length).split('&'); i < vars.length; i++) {
      current = vars[i].split('=');
      current[1] = decodeURIComponent(current[1]);
      arrayBracketPos = current[0].indexOf('[');
      if (arrayBracketPos !== -1) {
        arrName = current[0].substring(0, arrayBracketPos);
        arrName = decodeURIComponent(arrName);
        if (!requestObj[prefix + arrName]) {
          requestObj[prefix + arrName] = [];
        }
        requestObj[prefix + arrName].push(current[1] || null);
        if (getObj) {
          if (!getObj[prefix + arrName]) {
            getObj[prefix + arrName] = [];
          }
          getObj[prefix + arrName].push(current[1] || null);
        }
      } else {
        current[0] = decodeURIComponent(current[0]);
        requestObj[prefix + current[0]] = current[1] || null;
        if (getObj) {
          getObj[prefix + current[0]] = current[1] || null;
        }
      }
    }
  }
  if (/c/i.test(types)) { // COOKIE
    cookieObj = _ini_get('phpjs.cookieVarsObj') || cookieObj;
    for (i = 0, vars = win.document.cookie.split("&"); i < vars.length; i++) {
      current = vars[i].split("=");
      requestObj[prefix + current[0]] = current[1].split(";")[0] || null;
      if (cookieObj) {
        cookieObj[prefix + current[0]] = current[1].split(";")[0] || null;
      }
    }
  }
}
