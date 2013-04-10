function session_get_cookie_params (l, p, d, s) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1:
    // *     returns 1:

    var t = this;
    t.php_js = t.php_js || {}, pj = t.php_js;
    pj.cookie_params = pj.cookie_params || {};
    var params = pj.cookie_params;

    return {
        lifetime: params.lifetime,
        path: params.path,
        domain: params.domain,
        secure: params.secure,
        httponly: null // Not gettable or settable in client-side JavaScript
    };
}
