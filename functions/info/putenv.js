function putenv (setting) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir
    // %        note 1: We are not using $_ENV as in PHP, you could define
    // %        note 1: "$_ENV = php_js.ENV;" and get/set accordingly
    // %        note 2: Uses global: php_js to store environment info
    // *     example 1: putenv('LC_ALL=en-US');
    // *     results 1: true
    if (!php_js) {
        php_js = {};
    }
    if (!php_js.ENV) {
        php_js.ENV = {};
    }
    var pos = setting.indexOf('=');
    php_js.ENV[setting.slice(0,pos)] = setting.slice(pos+1);
    return true;
}