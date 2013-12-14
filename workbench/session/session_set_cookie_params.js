function session_set_cookie_params (l, p, d, s, h) {
    // http://kevin.vanzonneveld.net
    // +   original by: Louis Stowasser
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // *     example 1:
    // *     returns 1: undefined

    if (h) {
        throw 'The argument "httponly" cannot be set in a client-side version of session_set_cookie_params().';
    }

    this.php_js = this.php_js || {};
    var params = this.php_js.cookie_params;
    params.lifetime = l;
    params.path = p;
    params.domain = d;
    params.secure = !!s; //make sure bool
}
