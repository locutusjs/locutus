function putenv (setting) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir
    // %        note 1: We are not using $_ENV as in PHP, you could define
    // %        note 1: "$_ENV = window.php_js.ENV;" and get/set accordingly
    // *     example 1: putenv('LC_ALL=en-US');
    // *     results 1: true
    if (!window.php_js) {
        window.php_js = {};
    }
    if (!window.php_js.ENV) {
        window.php_js.ENV = {};
    }
    var pos = setting.indexOf('=');
    window.php_js.ENV[setting.slice(0,pos)] = setting.slice(pos+1);
    return true;
}